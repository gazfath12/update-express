// Mengimpor pustaka Express untuk membuat server web dan menangani permintaan HTTP
const express = require("express");

// Membuat aplikasi Express dan menentukan port sebagai 3000
const app = express();
const PORT = 3000;

// Inisialisasi data produk kosong dan variabel untuk ID produk unik
let products = [];
let productId = 1;

// Middleware untuk mengurai JSON dari permintaan yang masuk
app.use(express.json());

// Endpoint POST untuk menambahkan produk baru
app.post("/api/products", (req, res) => {
  const product = req.body; // Mengambil data produk dari request body
  product.product_id = productId++; // Menambahkan I D unik ke produk dan menaikkan productId untuk produk berikutnya
  products.push(product); // Menambahkan produk ke array products

  // Mengirim tanggapan berhasil dengan data produk yang baru dibuat
  res.status(201).json({
    message: "Produk berhasil ditambahkan",
    product_id: product.product_id,
  });
});

// Endpoint GET untuk mendapatkan semua produk
app.get("/api/products", (req, res) => {
  res.status(200).json(products); // Mengirim semua produk yang ada dalam format JSON
});

// Endpoint GET untuk mendapatkan produk berdasarkan ID
app.get("/api/products/:product_id", (req, res) => {
  const id = parseInt(req.params.product_id); // Mengambil ID dari parameter URL
  const product = products.find((p) => p.product_id === id); // Mencari produk dengan ID yang sesuai
if (product) {
    res.status(200).json(product); // Jika ditemukan, mengirim data produk
  } else {
    res.status(404).json({ message: "Produk tidak ditemukan" }); // Jika tidak ditemukan, kirim pesan error
  }
});

// Endpoint PUT untuk memperbarui produk berdasarkan ID
app.put("/api/products/:product_id", (req, res) => {
  const id = parseInt(req.params.product_id); // Mengambil ID dari parameter URL
  const productIndex = products.findIndex((p) => p.product_id === id); // Mencari indeks produk dengan ID yang sesuai

  if (productIndex !== -1) {
    // Jika produk ditemukan, perbarui data dengan yang baru dari request body
    products[productIndex] = {
      ...products[productIndex],
      ...req.body,
    };
    res.status(200).json({ message: "Produk berhasil diperbarui" });
  } else {
    res.status(404).json({ message: "Produk tidak ditemukan" }); // Jika tidak ditemukan, kirim pesan error
  }
});

// Endpoint DELETE untuk menghapus produk berdasarkan ID
app.delete("/api/products/:product_id", (req, res) => {
  const id = parseInt(req.params.product_id); // Mengambil ID dari parameter URL
  const productIndex = products.findIndex((p) => p.product_id === id); // Mencari indeks produk dengan ID yang sesuai

  if (productIndex !== -1) {
    products.splice(productIndex, 1); // Hapus produk dari array products
    res.status(200).json({ message: "Produk berhasil dihapus" }); // Kirim tanggapan berhasil dihapus
  } else {
    res.status(404).json({ message: "Produk tidak ditemukan" }); // Jika tidak ditemukan, kirim pesan error
  }
});

// Menjalankan server Express pada port yang ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
