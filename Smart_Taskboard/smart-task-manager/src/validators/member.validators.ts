import { body, ValidationChain } from 'express-validator';

export const changeRoleValidators: ValidationChain[] = [
  body('role').isIn(['ADMIN', 'REPORTER', 'REPORTEE']).withMessage('Role must be ADMIN, REPORTER, or REPORTEE'),
];
