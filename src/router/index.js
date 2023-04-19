import Router from 'koa-router'
import getHealth from './health/health'
import products from './product/product'

const router = new Router()

router.get('/health', getHealth)

// Endpoint 1 
router.get('/api/products', products...)

// Endpoint 2


// Endpoint 3 


// Endpoint 4 


// Endpoint 5


// Endpoint 6


export default router