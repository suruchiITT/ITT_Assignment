import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

/**
 * Runs express-validator checks and short-circuits with 400 on first error.
 */
export const validate = (validators: ValidationChain[]) => [
  ...validators,
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, message: errors.array()[0].msg });
      return;
    }
    next();
  },
];

export default validate;
