
import productActions from '../../actions/product/product'

exports.getAllProducts = (ctx) => {
    // Por defecto asume ctx.status = 200
    ctx.body = productActions.getProducts()
    return ctx
}

exports.createProduct = (ctx) => {
    // Chequeo de variables previamente a crear un producto, en caso de que estas no existan enviar mensaje de error con su codigo de estado
    if (ctx.request.body.nombre === undefined || ctx.request.body.precio === undefined || ctx.request.body.cantidad === undefined || ctx.request.body.categorias === undefined){
        ctx.status = 400
        ctx.body = {message: 'Peticion mal realizada'}
        return ctx
    }
    // Action que crea el producto dentro del arreglo de JSONs
    let product = productActions.addProduct(ctx.request.body)
    ctx.body = { message: 'El producto ha sido creado', product }
    return ctx
}

exports.getProductsForCategory = (ctx) => {
    // Action que busca por categorias, retorna un arreglo de JSONs, en caso de no existir retornara -1
    const result = productActions.getProductsForCategory(ctx.params.category)
    if (result == -1){
        ctx.status = 404
        ctx.body = {message: 'La categoria no existe'}
    }else {
        ctx.status = 200
        ctx.body = result
    }
    return ctx
}

exports.getProductsForCategoryAndOrder = (ctx) => {
    // Se chequea que el params por url :ord sea asc o desc, en caso de no ser ninguno de los 2, mostrara mensaje de error junto a su codigo de estado
    if (ctx.params.ord != 'asc' && ctx.params.ord != 'desc') {
        ctx.status = 400
        ctx.body = {message: 'Peticion mal realizada'}
        return ctx
    }

    //Action que busca productos por categorias y ordena segun el parametro ord, en caso de no encontrar ninguna categoria retornara -1 indicando que no existe ningun producto
    const result = productActions.getProductsForCategoryAndOrder(ctx.params.category,ctx.params.ord)
    if (result == -1){
        ctx.status  = 404
        ctx.body = {message: `La categoria ${ctx.params.category} no existe`}
    }else {
        ctx.status = 200
        ctx.body = result
    }
    return ctx
}


exports.updateProduct = (ctx) => {
    // Action para actualizar un producto a partir de su id, en caso de no encontrar el id retornara un arreglo vacio []
    let products_update = productActions.updateProduct(ctx.params.id,ctx.request.body)
    if (products_update.length == 0 ){
        ctx.status = 400
        ctx.body = {message: `El producto con id ${ctx.params.id} no existe`}
    }else{
        let product = products_update[0]
        ctx.body = {message: `El producto con id ${ctx.params.id} actualizado con exito`, product}
    }
    
    return ctx
}

exports.removeProduct = (ctx) => {
    //Action la cual remueve un producto en caso de ser encontrado, en caso contrario devolvera un -1 indicando que no existe
    let product_delete = productActions.removeProduct(ctx.params.id)
    if (product_delete == -1) {
        ctx.status = 400
        ctx.body = {message: `El producto con id ${ctx.params.id} no existe`}
    }else{
        ctx.body = { message: `Producto id: ${ctx.params.id} ha sido removido` }
    }
    return ctx
}