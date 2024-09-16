
import productsActions from '../../actions/product/product'

exports.getAllProducts = (ctx) => {
    const products = productsActions.getProducts()
    if (products === undefined) {
        ctx.status = 500
    } else {
        ctx.body = products
        ctx.status = 200
    }
    return ctx
}

exports.addNewProduct = (ctx) => {
    const productData = ctx.request.body
    try {
        const product = productsActions.addProduct(productData)
        ctx.body = { message: "Product created", product: product }
        ctx.status = 200
    } catch (error) {
        ctx.body = { Error: error.message }
        ctx.status = 400
    }
    return ctx
}


exports.getProductsByCategory = (ctx) => {
    const category = ctx.params.category
    const ord = ctx.params.ord
    try {
        const products = productsActions.getProductsByCategory(category,ord)
        ctx.body = products
        ctx.status = 200
    } catch (error) {
        ctx.body = { Error: error.message }
        ctx.status = (error.message === 'Category not found') ? 404 : 400
    }
    return ctx
}

exports.updateProduct = (ctx) => {
    const id = ctx.params.id
    const productData = ctx.request.body
    try {
        const product = productsActions.updateProduct(id, productData)
        ctx.body = { message: "Product updated", product: product }
        ctx.status = 200
    } catch (error) {
        ctx.body = { Error: error.message }
        ctx.status = (error.message === 'Id not found') ? 404 : 400
    }
    return ctx
}

exports.deleteProduct = (ctx) => {
    const id = ctx.params.id
    try {
        const numDeleted = productsActions.deleteProduct(id)
        ctx.body = { message: `${numDeleted} product${ (numDeleted > 1)? 's' : ''} deleted successfully` }
        ctx.status = 200
    } catch (error) {
        ctx.body = { Error: error.message }
        ctx.status = (error.message === 'Id not found') ? 404 : 400
    }
    return ctx
}