
import productsJSON from './../../data/products.json'
let products = [] //Sustituir [] por la carga del archivo ubicado en data/products.js
products = productsJSON

exports.getProducts = () => {
    // Solo se retorna todos los productos directamente del archivo
    return products
}

exports.addProduct = (productData) => {
  //Se crea un nuevo objecto de producto con sus respectivos datos, pero id es 1 en caso de que no exista ningun producto dentro del arreglo y en caso de que exista un producto, tomara el ultimo producto obtendra su id y le sumara 1
    const product = {
        id: products.length == 0 ? 1: products[products.length -1].id + 1,
        nombre: productData.nombre,
        precio: productData.precio,
        cantidad: productData.cantidad,
        categorias: productData.categorias

    }
    // Se agrega el producto creado al arreglo
    products.push(product)
    return product
}


exports.getProductsForCategory = (category) => {
  // Se revisa si algun producto tiene la categoria
  let products_filter = products.filter((product) => product.categorias.includes(category))

  // En caso de no existir ningun producto retorna -1 (equivalente a que no fue encontrado) (Para captar el error 404)
  if (products_filter == 0 ) return -1

  // Se retornan los productos
  return products_filter
}

exports.getProductsForCategoryAndOrder = (category,order) => {
  // Se realiza el filtrado por categoria
  const products_filter =  products.filter(product => product.categorias.includes(category) )
  // Se retorna -1 en caso de que no exista la categoria en algun producto
  if (products_filter.length == 0) return -1

  // Se realiza el ordenamiento de menor a mayor a partir del precio de los productos
  const productsOrder = products_filter.sort((product_1, product_2) => (product_1.precio >= product_2.precio) ? 1 : (product_1.precio < product_2.precio) ? -1:0); // Referencia: https://www.scaler.com/topics/javascript-sort-an-array-of-objects/
  //Condicional ascendente o de menor a mayor
  if (order == 'asc'){
    return productsOrder
  //Condicional descendente o de mayor a menor
  }else if (order=='desc'){
    //Se realiza un cambio de orden inverso a partir del ascendente ejemplo sencillo [1,2,3] - reverse() -> [3,2,1]
    return productsOrder.reverse()
  }
}

exports.updateProduct = (productId,productData) => {
  // Se itera producto por producto
  for (const product of products){
    // Se busca mendiante una condicional el id del producto que deseamos
    if (product.id == productId ){
      // Se editan los datos del producto
      product.nombre = productData.nombre
      product.precio = productData.precio
      product.cantidad = productData.cantidad
      product.categorias = productData.categorias
      // Cerramos el ciclo for ya que serian iteraciones de mas
      break
    }
  }
  // Filtramos por el id del producto para solo obtener un arreglo con nuestro producto editado 
  return products.filter(product => product.id == productId)
}

exports.removeProduct = (productId) => {
    // Buscamos en los productos si existe el id
    let find_product_id = products.filter((product) => { return product.id == productId})
    // Condicional en caso de que el id del producto no exista, asi se puede capturar en el router
    if (find_product_id == 0 ) return -1

    // Se procede a filtrar ignorando al id que quiero eliminar
    products = products.filter((product) => {  
        return product.id != productId
    })
}
