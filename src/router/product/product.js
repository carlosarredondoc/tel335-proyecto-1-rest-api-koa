
import productsActions from '../../actions/product/product'

exports.getAllProducts = (ctx) => {
    const prods = productsActions.getProducts()
    if (prods === undefined) {
        ctx.status = 500
    } else {
        ctx.body = prods
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
        ctx.body = { message: `Error creating user: ${error}`}
        ctx.status = 400
    }
    return ctx
}

