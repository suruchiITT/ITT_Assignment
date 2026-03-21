import { body, ValidationChain } from 'express-validator';

export const sendInvitationValidators: ValidationChain[] = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('role').isIn(['REPORTER', 'REPORTEE']).withMessage('Role must be REPORTER or REPORTEE (Admins cannot be invited)'),
];
