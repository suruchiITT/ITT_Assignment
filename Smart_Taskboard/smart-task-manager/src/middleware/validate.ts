import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';


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
