import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { connectDB } from './DB/db.js'
import product from './router/product.js'
import addproduct from './router/addproduct.js'
import auth from './router/auth.js'
import payment from './router/payment.js'
import promotion from './router/promotion.js'
const app = new Hono()

await connectDB()

app.use('/*', cors({
  origin: 'http://localhost:3000',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

app.route('/product', product)
app.route('/addproduct', addproduct)
app.route('/auth', auth)
app.route('/payment', payment)
app.route('/promotion', promotion)

const port = Number(process.env.PORT || 8000)

console.log(`Server is running on http://localhost:${port}`)
serve({ fetch: app.fetch, port })
