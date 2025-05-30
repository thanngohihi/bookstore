// --- Toast UI ---
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("visible"), 10);
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2500);
}

// --- Cart Manager ---
class CartManager {
  constructor() {
    this.cartKey = "cart";
    this.cart = this.getCart();
    this.renderCartCount();
  }

  getCart() {
    return JSON.parse(localStorage.getItem(this.cartKey)) || [];
  }

  saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  addItem(book) {
    this.cart.push(book);
    this.saveCart();
    this.renderCartCount();
    showToast(`✅ Đã thêm "${book.title}" vào giỏ hàng.`);
  }

  removeItem(index) {
    this.cart.splice(index, 1);
    this.saveCart();
    this.renderCartList();
    this.renderCartCount();
    showToast("🗑️ Đã xóa sách khỏi giỏ.");
  }

  renderCartCount() {
    const count = this.cart.length;
    document.querySelectorAll("#cart-count").forEach(el => {
      el.textContent = count;
    });
  }

  renderCartList() {
    const list = document.getElementById("cart-list");
    if (!list) return;

    if (this.cart.length === 0) {
      list.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
      return;
    }

    list.innerHTML = "";
    this.cart.forEach((book, index) => {
      const item = document.createElement("div");
      item.className = "cart-item";
      item.innerHTML = `
        <img src="${book.img}" alt="${book.title}">
        <div>
          <h4>${book.title}</h4>
          <p>Tác giả: ${book.author}</p>
          <p>Giá: ${book.price}</p>
          <button class="remove-btn" data-index="${index}">Xóa</button>
        </div>
      `;
      list.appendChild(item);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        this.removeItem(index);
      });
    });
  }
}

// --- DOM Ready ---
document.addEventListener("DOMContentLoaded", () => {
  const cart = new CartManager();

  // Thêm vào giỏ hàng
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const book = {
        id: button.dataset.id,
        title: button.dataset.title,
        author: button.dataset.author,
        price: button.dataset.price,
        img: button.dataset.img
      };
      cart.addItem(book);
    });
  });

  // Hiển thị giỏ hàng nếu đang ở trang cart.html
  if (document.getElementById("cart-list")) {
    cart.renderCartList();
  }

  // Cập nhật trạng thái menu
  const currentPath = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Hiển thị thông tin người dùng và xử lý logout
  const username = localStorage.getItem("loggedInUser");
  const userInfo = document.getElementById("user-info");
  const usernameSpan = document.getElementById("username");
  const logoutBtn = document.getElementById("logout-btn");
  const loginLink = document.getElementById("login-link");

  if (username && userInfo && usernameSpan) {
    usernameSpan.textContent = username;
    userInfo.style.display = "inline-flex";
    if (loginLink) loginLink.style.display = "none";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("loggedInUser");
      location.reload();
    });
  }
});

// --- Mua hàng / Thanh toán ---
function checkout() {
  const cart = new CartManager();

  if (cart.cart.length === 0) {
    showToast("❌ Giỏ hàng đang trống.", "error");
    return;
  }

  // Xóa giỏ hàng
  localStorage.removeItem("cart");
  cart.cart = [];
  cart.renderCartCount();
  cart.renderCartList();

  showToast("🎉 Cảm ơn bạn đã mua hàng!");
}
// Gắn sự kiện cho nút "Mua hàng"
const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", checkout);
}
