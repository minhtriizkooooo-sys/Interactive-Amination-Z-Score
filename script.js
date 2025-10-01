document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('intro-canvas');
    const ctx = canvas.getContext('2d');
    const logoContainer = document.getElementById('logo-container');
    const ctaButton = document.getElementById('cta-button');
    const creditInfo = document.getElementById('credit');
    const backgroundAudio = document.getElementById('background-audio');
    const toggleAudioBtn = document.getElementById('toggle-audio-btn');
    const body = document.body;

    let mouse = { x: null, y: null };
    let particles = [];
    const particleCount = 200;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Lắng nghe sự kiện di chuyển chuột
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    // Cập nhật kích thước canvas khi thay đổi kích thước cửa sổ
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.height;
    });

    // Tạo một hạt sáng
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = 'rgba(255, 255, 255, 0.8)';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                this.x -= dx / distance;
                this.y -= dy / distance;
                this.size = Math.min(this.size + 0.1, 5);
            } else {
                this.size = Math.max(this.size - 0.05, 1);
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Khởi tạo các hạt
    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Vòng lặp chính của animation
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

    // Hiển thị logo, nút và thông tin người thực hiện sau 5 giây
    setTimeout(() => {
        logoContainer.classList.add('fade-in');
        ctaButton.style.display = 'block';
        creditInfo.style.display = 'block';
        setTimeout(() => {
            ctaButton.classList.add('fade-in');
            creditInfo.style.opacity = '1';
        }, 500);
    }, 5000);

    // Xử lý sự kiện click nút Khám Phá
    ctaButton.addEventListener('click', () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play().then(() => {
                // Thêm lớp is-playing vào body khi nhạc bắt đầu
                body.classList.add('is-playing');
            }).catch(e => {
                console.error("Lỗi khi phát nhạc:", e);
                window.location.href = "https://mt-z-score.onrender.com/";
            });
        }
    });

    // Xử lý sự kiện khi nhạc kết thúc để tự động chuyển hướng
    backgroundAudio.addEventListener('ended', () => {
        window.location.href = "https://mt-z-score.onrender.com/";
    });

    // Xử lý nút tạm dừng và chuyển trang
    toggleAudioBtn.addEventListener('click', () => {
        backgroundAudio.pause();
        window.location.href = "https://mt-z-score.onrender.com/";
    });
});