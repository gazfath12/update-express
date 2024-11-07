// Mengimpor pustaka Express untuk membuat server web dan menangani permintaan HTTP
const express = require("express");

// Membuat aplikasi Express dan menentukan port sebagai 3000
const app = express();
const PORT = 3000;

// Inisialisasi data pesanan kosong dan variabel untuk ID pesanan unik
let orders = [];
let orderId = 1;

// Middleware untuk mengurai JSON dari permintaan yang masuk
app.use(express.json());

// Endpoint POST untuk menambahkan pesanan baru
app.post("/api/orders", (req, res) => {
  const order = req.body; // Mengambil data pesanan dari request body
  order.order_id = orderId++; // Menambahkan ID unik ke pesanan dan menaikkan orderId untuk pesanan berikutnya
  order.created_at = new Date().toISOString(); // Menyimpan waktu saat pesanan dibuat
  order.updated_at = order.created_at; // Waktu update awalnya sama dengan waktu dibuat
  orders.push(order); // Menambahkan pesanan ke array orders

  // Mengirim tanggapan berhasil dengan data pesanan  yang baru dibuat
  res.status(201).json({
    message: "Pesanan berhasil ditambahkan",
    order_id: order.order_id,
    created_at: order.created_at,
    updated_at: order.updated_at,
  });
});

// Endpoint GET untuk mendapatkan semua pesanan
app.get("/api/orders", (req, res) => {
  res.status(200).json(orders); // Mengirim semua pesanan yang ada dalam format JSON
});

// Endpoint GET untuk mendapatkan pesanan berdasarkan ID
app.get("/api/orders/:order_id", (req, res) => {
  const id = parseInt(req.params.order_id); // Mengambil ID dari parameter URL
  const order = orders.find((o) => o.order_id === id); // Mencari pesanan dengan ID yang sesuai

  if (order) {
    res.status(200).json(order); // Jika ditemukan, mengirim data pesanan
  } else {
    res.status(404).json({ message: "Pesanan tidak ditemukan" }); // Jika tidak ditemukan, kirim pesan error
  }
});

// Endpoint PUT untuk memperbarui pesanan berdasarkan ID
app.put("/api/orders/:order_id", (req, res) => {
  const id = parseInt(req.params.order_id); // Mengambil ID dari parameter URL
  const orderIndex = orders.findIndex((o) => o.order_id === id); // Mencari indeks pesanan dengan ID yang sesuai

  if (orderIndex !== -1) {
    // Jika pesanan ditemukan, perbarui data dengan yang baru dari request body
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...req.body,
      updated_at: new Date().toISOString(), // Update waktu ketika data diperbarui
    };
    res.status(200).json({
      message: "Pesanan berhasil diperbarui",
      updated_at: orders[orderIndex].updated_at,
    });
  } else {
    res.status(404).json({ message: "Pesanan tidak ditemukan" }); // Jika tidak ditemukan, kirim pesan error
  }
});

// Endpoint DELETE untuk menghapus pesanan berdasarkan ID
app.delete("/api/orders/:order_id", (req, res) => {
  const id = parseInt(req.params.order_id); // Mengambil ID dari parameter URL
  const orderIndex = orders.findIndex((o) => o.order_id === id); // Mencari indeks pesanan dengan ID yang sesuai

  if (orderIndex !== -1) {
    orders.splice(orderIndex, 1); // Hapus pesanan dari array orders
    res.status(200).json({ message: "Pesanan berhasil dihapus" }); // Kirim tanggapan berhasil dihapus
  } else {
    res.status(404).json({ message: "Pesanan tidak ditemukan" }); // Jika tidak ditemukan, kirim pesan error
  }
});

// Menjalankan server Express pada port yang ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
