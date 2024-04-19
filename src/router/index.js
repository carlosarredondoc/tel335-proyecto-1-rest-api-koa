import Router from 'koa-router'
import getHealth from './health/health'
import products from './product/product'

const router = new Router()

router.get('/health', getHealth)

// Endpoint 1 
router.get('/api/products', products.getAllProducts)

// Endpoint 2
router.post('/api/products', products.addNewProduct)
router.put('/api/products', products.addNewProduct)

// Endpoint 3 
router.get('/api/products/:category', products.getProductsByCategory)

// Endpoint 4 
router.get('/api/products/:category/:ord', products.getProductsByCategory)

// Endpoint 5
router.put('/api/products/:id', products.updateProduct)

// Endpoint 6
router.delete('/api/products/:id', products.deleteProduct)

export default router