import { Response } from 'express';
import * as authService from '../services/auth.service';
import asyncHandler from '../utils/asyncHandler';
import { sendOk, sendCreated } from '../utils/response';
import { AuthRequest } from '../middleware/authenticate';

interface RegisterBody {
  email: string;
  password: string;
  name: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface ForgotPasswordBody {
  email: string;
}

interface ResetPasswordBody {
  token: string;
  password: string;
}

export const register = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const data = await authService.register(req.body as RegisterBody);
  sendCreated(res, data);
});

export const login = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const data = await authService.login(req.body as LoginBody);
  sendOk(res, data);
});

export const forgotPassword = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const data = await authService.forgotPassword(req.body as ForgotPasswordBody);
  sendOk(res, data);
});

export const resetPassword = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const data = await authService.resetPassword(req.body as ResetPasswordBody);
  sendOk(res, data);
});

export const me = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const data = await authService.getProfile(req.user!.id);
  sendOk(res, data);
});
