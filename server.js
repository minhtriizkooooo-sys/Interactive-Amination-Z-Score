const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Sử dụng Express để phục vụ các file tĩnh từ thư mục hiện tại
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});