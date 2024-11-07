const express = require("express");
const app = express();
const PORT = 3000;

let books = [];
let bookId = 1;

app.use(express.json());

app.post("/api/books", (req, res) => {
  const book = req.body;
  book.book_id = bookId++;
  books.push(book);
  res.status(201).json({ message: "Buku berhasil ditambahkan", book_id: book.book_id });
});

app.get("/api/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/api/books/:book_id", (req, res) => {
  const id = parseInt(req.params.book_id);
  const book = books.find((b) => b.book_id === id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Buku tidak ditemukan" });
  }
});

app.put("/api/books/:book_id", (req, res) => {
  const id = parseInt(req.params.book_id);
  const bookIndex = books.findIndex((b) => b.book_id === id);
  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...req.body };
    res.status(200).json({ message: "Buku berhasil diperbarui" });
  } else {
    res.status(404).json({ message: "Buku tidak ditemukan" });
  }
});

app.delete("/api/books/:book_id", (req, res) => {
  const id = parseInt(req.params.book_id);
  const bookIndex = books.findIndex((b) => b.book_id === id);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(200).json({ message: "Buku berhasil dihapus" });
  } else {
    res.status(404).json({ message: "Buku tidak ditemukan" });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
