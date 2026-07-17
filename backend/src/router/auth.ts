import { Hono } from 'hono'
import { accountuserprofile, loginUser, registerUser, updateUserProfile } from '../controllers/auth.js'

const auth = new Hono()

auth.post('/register', registerUser)
auth.post('/login', loginUser)
auth.get('/accountuserprofile', accountuserprofile)
auth.put('/updateUserProfile/:id', updateUserProfile)

export default auth
