
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
