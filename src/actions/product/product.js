import Products from '../../data/products.json'
let products = Products

exports.clearProducts = () => {
    products = []
}

exports.getProducts = () => {
    return products
}

// Cuidado: esta funcion agrega un nuevo producto a la lista de productos, pero el data/products.json no se modifica. 
// Asi que si se reinicia el servidor, el nuevo producto desaparece.
exports.createProduct = (productData) => {
    if ( productData === undefined 
        || productData.nombre === undefined 
        || productData.precio === undefined 
        || productData.cantidad === undefined 
        || productData.categorias === undefined
        || (productData.nombre != undefined && productData.nombre == '')
        || (productData.categorias != undefined && productData.categorias.length == 0)
    ) {
        throw new Error('Datos del product no proporcionados')
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
        throw new Error('Categoria no proporcionada')
    }
    if (!checkExistingCategory(category)) {
        throw new Error('No product encontrado con este categoria')
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
    throw new Error('Orden no valido')
}


function checkExistingId(id) {
    return products.some(product => product.id == id)
}

// Cuidado: esta funcion modifica unos productos de la lista de productos, pero el data/products.json no se modifica. 
// Asi que si se reinicia el servidor, los cambios desaparecen.
exports.updateProduct = (id, productData) => {
    if (id === undefined) { // No deberia ser posible llegar a este punto, ya que este caso corresponde a la creacion de un nuevo producto
        throw new Error('Id del product no proporcionado')
    }
    if (!checkExistingId(id)) {
        throw new Error('No product encontrado con este id')
    }
    if (productData === undefined
        || (productData.nombre === undefined && productData.precio === undefined && productData.cantidad === undefined && productData.categorias === undefined)
        || (productData.nombre != undefined && productData.nombre == '')
        || (productData.categorias != undefined && productData.categorias.length == 0)
    ) {
        throw new Error('Datos del nuevo product no proporcionados')
    }
    const product = products.find(product => product.id == id)
    const newProduct = {
        id: product.id,
        nombre: productData.nombre || product.nombre,
        precio: productData.precio || product.precio,
        cantidad: productData.cantidad || product.cantidad,
        categorias: productData.categorias || product.categorias
    }
    products = products.map(product => product.id == id ? newProduct : product)
    return newProduct
}


// Cuidado: esta funcion borra unos productos de la lista de productos, pero el data/products.json no se modifica. 
// Asi que si se reinicia el servidor, los cambios desaparecen.
exports.deleteProduct = (id) => {
    if (id === undefined) { // No deberia ser posible llegar a este punto, ya que este caso no sube un servicio del servidor
        throw new Error('Id del product no proporcionado')
    }
    if (!checkExistingId(id)) {
        throw new Error('No product encontrado con este id')
    }
    const initialLength = products.length
    products = products.filter(product => product.id != id)
    return initialLength - products.length
}