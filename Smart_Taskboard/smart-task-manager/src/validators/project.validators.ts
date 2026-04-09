import { body, ValidationChain } from 'express-validator';

export const createProjectValidators: ValidationChain[] = [
  body('name').trim().isLength({ min: 3, max: 100 }).withMessage('Project name must be 3-100 characters'),
];
