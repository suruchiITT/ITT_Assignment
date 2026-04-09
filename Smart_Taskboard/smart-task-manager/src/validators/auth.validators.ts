import { body, ValidationChain } from 'express-validator';

const passwordRule = /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9\s])\S{6,10}$/;
const passwordMessage = 'Password must be 6-10 characters and include at least 1 letter and 1 special character';

export const registerValidators: ValidationChain[] = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').matches(passwordRule).withMessage(passwordMessage),
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
];

export const loginValidators: ValidationChain[] = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const forgotPasswordValidators: ValidationChain[] = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
];

export const resetPasswordValidators: ValidationChain[] = [
  body('token').trim().notEmpty().withMessage('Reset token is required'),
  body('password').matches(passwordRule).withMessage(passwordMessage),
];
