import { Hono } from 'hono'
import { loginUser, registerUser } from '../controllers/auth.js'

const auth = new Hono()

auth.post('/register', registerUser)
auth.post('/login', loginUser)

export default auth
