import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import AppError from '../utils/AppError';
import env from '../config/env';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    avatarUrl: string | null;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return next(AppError.unauthorized('No token provided'));
    }

    const token = header.slice(7);
    let payload: any;
    try {
      payload = jwt.verify(token, env.jwtSecret);
    } catch {
      return next(AppError.unauthorized('Invalid or expired token'));
    }

    const user = await User.findById(payload.sub);
    if (!user) {
      return next(AppError.unauthorized('User not found'));
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
    };
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
