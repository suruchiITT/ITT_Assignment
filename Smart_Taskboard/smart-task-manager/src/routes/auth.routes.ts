import { Router } from 'express';
import * as ctrl from '../controllers/auth.controller';
import authenticate from '../middleware/authenticate';
import validate from '../middleware/validate';
import { registerValidators, loginValidators } from '../validators/auth.validators';

const router = Router();

router.post('/register', validate(registerValidators), ctrl.register);
router.post('/login', validate(loginValidators), ctrl.login);
router.get('/me', authenticate, ctrl.me);

export default router;
