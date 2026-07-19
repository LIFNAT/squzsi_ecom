import { Hono } from 'hono'
import { changestate, checkout, getorders } from '../controllers/payment.js'

const payment = new Hono()

payment.post('/checkout', checkout)
payment.get('/getorders' , getorders)
payment.put('/changestate',changestate)

export default payment
