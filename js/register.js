const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = registerForm.username.value.trim();
  const email = registerForm.email.value.trim();
  const password = registerForm.password.value.trim();
  const passwordConfirm = registerForm.passwordConfirm.value.trim();

  if (password !== passwordConfirm) {
    alert('Mật khẩu xác nhận không khớp!');
    return;
  }

  if (username && email && password) {
    alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
    window.location.href = 'login.html';
  } else {
    alert('Vui lòng điền đầy đủ thông tin.');
  }
});
