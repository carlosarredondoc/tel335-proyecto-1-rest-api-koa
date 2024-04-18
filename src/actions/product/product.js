import Products from '../../data/products.json'
let products = Products

exports.getProducts = () => {
    return products
}

// Cuidado: esta funcion agrega un nuevo producto a la lista de productos, pero el data/products.json no se modifica. 
// Asi que si se reinicia el servidor, el nuevo producto desaparece.
exports.addProduct = (productData) => {
    if ( productData === undefined || productData.nombre === undefined || productData.precio === undefined || productData.cantidad === undefined || productData.categorias === undefined) {
        throw new Error('Missing product data')
    }
    const nextId = products.length+1
    const product = {
        id: nextId,// asignar id de manera incremental e irrepetible
        nombre: productData.nombre,
        precio: productData.precio,
        cantidad: productData.cantidad,
        categorias: productData.categorias

    }
    products.push(product)
    return product
}


