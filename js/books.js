const books = [
  {
    title: "Ái Tình Nơi Đầu Lưỡi",
    image: "sach1.jpg",
    description: "Một tác phẩm của Jo Kyung Ran đầy chất thơ và chiều sâu tâm lý.",
    extra: "Cuốn sách là hành trình khám phá cảm xúc và nội tâm, nơi tình yêu không chỉ nằm trong lời nói mà còn hiện hữu nơi sâu thẳm tâm hồn mỗi người."
  },
  {
    title: "Dưới Trời Xanh Không Có Anh Vẫn Mỉm Cười",
    image: "sach6.jpg",
    description: "Một câu chuyện cảm động về hy vọng và tình yêu đã mất.",
    extra: "Tác phẩm khắc họa một mối tình nhẹ nhàng nhưng sâu lắng, nơi sự chia ly không thể ngăn cản ký ức và nụ cười của người ở lại."
  },
  {
    title: "Phấn Hoa Lầu Xanh",
    image: "sach3.jpg",
    description: "Hành trình một người phụ nữ đi tìm sự giải thoát và bản sắc.",
    extra: "Phấn Hoa Lầu Xanh là bộ truyện thuần cổ đại, những tư tưởng phong kiến được miêu tả rõ nét, khiến người đọc cảm nhận được sự bất công với phận con gái..."
  },
  {
    title: "Mẹ Ruột Nam Chính Niên Đại",
    image: "sach4.jpg",
    description: "Câu chuyện xuyên không kỳ lạ và đầy hài hước.",
    extra: "Một góc nhìn mới mẻ về các nhân vật phụ, nơi mẹ ruột của nam chính bất ngờ trở thành trung tâm của mọi chuyện dở khóc dở cười."
  },
  {
    title: "Lắng Nghe Từng Hơi Thở Của Anh",
    image: "sach 7.jpg",
    description: "Một bản tình ca dịu dàng giữa thành phố ồn ào.",
    extra: "Tình yêu đến từ những điều nhỏ bé nhất – một ánh nhìn, một hơi thở – đủ để chữa lành những tâm hồn lạc lối giữa dòng đời hối hả."
  },
  {
    title: "Bậc Thầy Trà Xanh Đến Huấn Luyện Quân Sự",
    image: "sach 8.jpg",
    description: "Kịch bản hài hước với bối cảnh quân đội và nhân vật khó lường.",
    extra: "Trà xanh không chỉ là trà – mà còn là chiêu trò! Hành trình huấn luyện không tưởng với sự góp mặt của một nữ nhân vật 'trà xanh' bá đạo."
  }
];

function showBookDetail(index) {
  const book = books[index];
  const bookList = document.getElementById("book-list");
  const detailPanel = document.getElementById("book-detail-panel");
  const bookInfo = document.getElementById("book-info");

  // Ẩn danh sách và hiển thị chi tiết
  bookList.style.display = "none";
  detailPanel.style.display = "block";

  bookInfo.innerHTML = `
    <img src="${book.image}" alt="${book.title}">
    <div class="book-text">
      <h3>${book.title}</h3>
      <p>${book.description}</p>
      <div class="extra-content">
        <h4>Nội dung</h4>
        <p>${book.extra}</p>
      </div>
    </div>
  `;
}

function backToList() {
  document.getElementById("book-detail-panel").style.display = "none";
  document.getElementById("book-list").style.display = "grid";
}

window.onload = function () {
  const list = document.getElementById("book-list");
  books.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.onclick = () => showBookDetail(index);
    bookDiv.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
    `;
    list.appendChild(bookDiv);
  });

  document.getElementById("close-detail").addEventListener("click", backToList);
};
