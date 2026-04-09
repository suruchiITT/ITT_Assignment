import { Request, Response, NextFunction } from 'express';
import { AppErrorType } from '../utils/AppError';

interface MongooseError extends Error {
  code?: number;
  keyValue?: Record<string, any>;
  name: string;
  errors?: Record<string, any>;
  message: string;
}


export const errorHandler = (
  err: MongooseError | AppErrorType | Error,
  req: Request,
  res: Response,
 
  next: NextFunction
): void => {
  
  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue || {})[0] || 'field';
    res.status(409).json({ success: false, message: `${field} already exists` });
    return;
  }

  
  if ((err as any).name === 'CastError') {
    res.status(400).json({ success: false, message: 'Invalid ID format' });
    return;
  }

 
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