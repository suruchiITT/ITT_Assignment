import { Router } from 'express'
import { register, login, me } from '../controllers/auth.controller'
import authenticate from '../middleware/authenticate'
import validate from '../middleware/validate'
import { registerValidators, loginValidators } from '../validators/auth.validators'

const router = Router()

router.post('/register', validate(registerValidators), register)
router.post('/login', validate(loginValidators), login)
router.get('/me', authenticate, me)

export default router