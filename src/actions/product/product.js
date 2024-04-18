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
    const nextId = (products.length == 0)? 1 : products[products.length - 1].id + 1
    const product = {
        id: nextId,
        nombre: productData.nombre,
        precio: productData.precio,
        cantidad: productData.cantidad,
        categorias: productData.categorias

    }
    products.push(product)
    return product
}


function checkExistingCategory(category) {
    return products.some(product => product.categorias.includes(category))
}

exports.getProductsByCategory = (category, ord) => {
    if (category === undefined) {
        throw new Error('Missing category')
    }
    if (!checkExistingCategory(category)) {
        throw new Error('Category not found')
    }
    const filteredProducts = products.filter(product => product.categorias.includes(category))
    if (ord === undefined) {
        return filteredProducts
    }
    if (ord === 'asc') {
        return filteredProducts.sort((a, b) => a.precio - b.precio)
    }
    if (ord === 'desc') {
        return filteredProducts.sort((a, b) => b.precio - a.precio)
    }
    throw new Error('Invalid ord value')
}