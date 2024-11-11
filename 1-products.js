// Mengimpor pustaka Express untuk membuat server web dan menangani permintaan HTTP
const express = require("express");
const  {addProductAction, getAllProductAction,getProductByIdAction, updateProductAction, deleteProductAction} = require("./product-action")
// Membuat aplikasi Express dan menentukan port sebagai 3000
const app = express();
const PORT = 3000;

// Inisialisasi data produk kosong dan variabel untuk ID produk unik
let products = [];
let productId = 1;

// Middleware untuk mengurai JSON dari permintaan yang masuk
app.use(express.json());

// Endpoint POST untuk menambahkan produk baru
app.post("/api/products",addProductAction);

// Endpoint GET untuk mendapatkan semua produk
app.get("/api/products",getAllProductAction);

// Endpoint GET untuk mendapatkan produk berdasarkan ID
app.get("/api/products/:product_id",getProductByIdAction);

// Endpoint PUT untuk memperbarui produk berdasarkan ID
app.put("/api/products/:product_id",updateProductAction);

// Endpoint DELETE untuk menghapus produk berdasarkan ID
app.delete("/api/products/:product_id", deleteProductAction);

// Menjalankan server Express pada port yang ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
