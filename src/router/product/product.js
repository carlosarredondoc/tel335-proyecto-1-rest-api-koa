
import productActions from '../../actions/product/product'

exports.getAllProducts = (ctx) => {
    ctx.body = productActions.getProducts()
    return ctx
}
