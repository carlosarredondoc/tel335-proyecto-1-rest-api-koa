
let products = [] //Sustituir [] por la carga del archivo ubicado en data/products.js (importar el archivo y asignar)


exports.getProducts = () => {
    return products
}

exports.addProduct = (productData) => {
  const product = {
        id: 0,// asignar id de manera incremental e irrepetible
        nombre: productData.nombre,
        precio: productData.precio,
        cantidad: productData.cantidad,
        categorias: productData.categorias

    }
    products.push(product)
    return product
}


