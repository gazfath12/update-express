let products = [];
let productId = 1;

module.exports.addProductGateway = (product) => {
    product.product_id = productId++; // Menambahkan I D unik ke produk dan menaikkan productId untuk produk berikutnya
    products.push(product); // Menambahkan produk ke array products
}
module.exports.getProductByIdGateway = (id) => {
    const product = products.find((p) => p.product_id === id); // Mencari produk dengan ID yang sesuai
    return product
}
module.exports.getAllProductGateway = () => {
   return products
   
}
module.exports.updateProductByIdGateway = (id,data) => {
const productIndex = products.findIndex((p) => p.product_id === id); // Mencari indeks produk dengan ID yang sesuai
if(productIndex !== -1){
    products[productIndex] = {
        ...products[productIndex],
        ...data,
      };
      return true
} else{
   return false 
} 
}
module.exports.deleteProductByIdGateway = (id) => {
const productIndex = products.findIndex((p) => p.product_id === id); // Mencari indeks produk dengan ID yang sesuai
if (productIndex !== -1) {
    products.splice(productIndex, 1); // Hapus produk dari array products
    return true
}else{
    return false
}
}