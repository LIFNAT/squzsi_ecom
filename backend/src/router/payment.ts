import { Hono } from 'hono'
import { changestate, checkout, getorders, getordersbyuser } from '../controllers/payment.js'

const payment = new Hono()

payment.post('/checkout', checkout)
payment.get('/getorders' , getorders)
payment.put('/changestate',changestate)
payment.get("/orders/user/:id", getordersbyuser);

export default payment
