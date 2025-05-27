const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  if (!email || !password) {
    alert('Vui lòng điền đầy đủ thông tin đăng nhập.');
    return;
  }

  // Giả sử xác thực thành công
  alert(`Đăng nhập thành công! Chào mừng ${email}`);

  // Lưu thông tin đăng nhập
  localStorage.setItem("loggedInUser", email);

  // Chuyển về trang chủ
  window.location.href = "index.html";
});
