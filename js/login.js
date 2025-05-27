const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  if (email && password) {
    alert(`Đăng nhập thành công! Chào mừng ${email}`);
    // Thực tế ở đây sẽ gọi API hoặc xử lý đăng nhập
    // Ví dụ redirect trang chủ:
    window.location.href = 'index.html';
  } else {
    alert('Vui lòng điền đầy đủ thông tin đăng nhập.');
  }
});
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Lấy tên đăng nhập từ ô input
  const emailInput = document.getElementById("email").value.trim();

  // Giả sử xác thực thành công, lưu tên người dùng vào localStorage
  localStorage.setItem("loggedInUser", emailInput);

  // Chuyển hướng về trang chủ
  window.location.href = "index.html";
});
