//Api de ejemplo para control API REST en Koa


import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-body'

import router from './router/index'

const app = new Koa()

const port = 3001

app.use(cors({
    origin(ctx) {
      return ctx.get('Origin') || '*';
    },
}));

app.use(bodyParser({ multipart: true, urlencoded: true }))

app.use(router.routes())

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
