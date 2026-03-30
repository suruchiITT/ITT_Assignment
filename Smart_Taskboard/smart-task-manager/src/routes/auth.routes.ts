import { Router } from 'express'
import { register, login, forgotPassword, resetPassword, me } from '../controllers/auth.controller'
import authenticate from '../middleware/authenticate'
import validate from '../middleware/validate'
import { registerValidators, loginValidators, forgotPasswordValidators, resetPasswordValidators } from '../validators/auth.validators'

const router = Router()

router.post('/register', validate(registerValidators), register)
router.post('/login', validate(loginValidators), login)
router.post('/forgot-password', validate(forgotPasswordValidators), forgotPassword)
router.post('/reset-password', validate(resetPasswordValidators), resetPassword)
router.get('/me', authenticate, me)

export default router
