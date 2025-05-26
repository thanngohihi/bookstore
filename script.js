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

    // Gắn sự kiện xóa
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

  // Gắn sự kiện cho tất cả nút "Thêm vào giỏ"
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

  // Nếu đang ở trang cart.html thì render giỏ hàng
  const cartList = document.getElementById("cart-list");
  if (cartList) {
    cart.renderCartList();
  }
});
