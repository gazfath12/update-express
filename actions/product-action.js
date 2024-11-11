
const {addProductGateway,  getProductByIdGateway, updateProductByIdGateway, deleteProductByIdGateway, getAllProductGateway} = require("../gateways/product-gateway")
module.exports.addProductAction = (req, res) => {
    const product = req.body; // Mengambil data produk dari request body
    addProductGateway(product)
    // Mengirim tanggapan berhasil dengan data produk yang baru dibuat
    res.status(201).json({
      message: "Produk berhasil ditambahkan",
      product_id: product.product_id,
    });
  }
  module.exports.getAllProductAction = (req, res) => {
    res.status(200).json(getAllProductGateway()); // Mengirim semua produk yang ada dalam format JSON
  }
  module.exports.getProductByIdAction =  (req, res) => {
    const id = parseInt(req.params.product_id); // Mengambil ID dari parameter URL
    const product = getProductByIdGateway(id)
  if (product) {
      res.status(200).json(product); // Jika ditemukan, mengirim data produk
    } else {
      res.status(404).json({ message: "Produk tidak ditemukan" }); // Jika tidak ditemukan, kirim pesan error
    }
  }
  module.exports.updateProductAction =  (req, res) => {
    const id = parseInt(req.params.product_id); // Mengambil ID dari parameter URL
    const result = updateProductByIdGateway(id,req.body)
    if (result) {
      // Jika produk ditemukan, perbarui data dengan yang baru dari request body
      res.status(200).json({ message: "Produk berhasil diperbarui" });
    } else {
      res.status(404).json({ message: "Produk tidak ditemukan" }); // Jika tidak ditemukan, kirim pesan error
    }
  }
  module.exports.deleteProductAction = (req, res) => {
    const id = parseInt(req.params.product_id); // Mengambil ID dari parameter URL
    const resultdelete = deleteProductByIdGateway(id)
    if (resultdelete) {
      res.status(200).json({ message: "Produk berhasil dihapus" }); // Kirim tanggapan berhasil dihapus
    } else {
      res.status(404).json({ message: "Produk tidak ditemukan" }); // Jika tidak ditemukan, kirim pesan error
    }
  }