import Router from 'koa-router'
import getHealth from './health/health'
import products from './product/product'

const router = new Router()

router.get('/health', getHealth)

// Endpoint 1 
router.get('/api/products', products.getAllProducts)

// Endpoint 2
router.post('/api/product', products.createProduct)

// Endpoint 3 
router.get('/api/products/:category',products.getProductsForCategory)

// Endpoint 4 
router.get('/api/products/:category/:ord',products.getProductsForCategoryAndOrder)

// Endpoint 5
router.put('/api/product/:id',products.updateProduct)

// Endpoint 6
router.delete('/api/product/:id', products.removeProduct)

export default router