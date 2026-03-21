import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

interface MongooseError extends Error {
  code?: number;
  keyValue?: Record<string, any>;
  name: string;
  errors?: Record<string, any>;
  message: string;
}

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: MongooseError | AppError | Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
): void => {
  // Mongoose duplicate key → 409
  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue || {})[0] || 'field';
    res.status(409).json({ success: false, message: `${field} already exists` });
    return;
  }

  // Mongoose CastError (invalid ObjectId) → 400
  if ((err as any).name === 'CastError') {
    res.status(400).json({ success: false, message: 'Invalid ID format' });
    return;
  }

  // Mongoose validation error → 400
  if ((err as any).name === 'ValidationError') {
    const msg = (Object.values((err as any).errors)[0] as any)?.message || 'Validation error';
    res.status(400).json({ success: false, message: msg });
    return;
  }

  const status = (err as any).statusCode || 500;
  const message = err.message || 'Internal server error';

  if (status === 500) {
    console.error('[ERROR]', err);
  }

  res.status(status).json({ success: false, message });
};

export default errorHandler;
