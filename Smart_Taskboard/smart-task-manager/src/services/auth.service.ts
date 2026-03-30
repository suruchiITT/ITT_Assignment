import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import PasswordResetToken from '../models/PasswordResetToken';
import AppError from '../utils/AppError';
import env from '../config/env';
import { sendPasswordResetEmail } from '../utils/emailService';

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    name: string;
    avatarUrl: string | null;
    createdAt: Date;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  createdAt: Date;
}

interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface ForgotPasswordInput {
  email: string;
}

interface ResetPasswordInput {
  token: string;
  password: string;
}

export interface MessageResponse {
  message: string;
}

function generateToken(user: IUser): string {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, name: user.name },
    env.jwtSecret,
    { expiresIn: Math.floor(env.jwtExpirationMs / 1000) }
  );
}

function buildAuthResponse(user: IUser, token: string): AuthResponse {
  return {
    accessToken: token,
    tokenType: 'Bearer',
    expiresIn: env.jwtExpirationMs,
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl || null,
      createdAt: user.createdAt,
    },
  };
}

export async function register(data: RegisterInput): Promise<AuthResponse> {
  const exists = await User.findOne({ email: data.email.toLowerCase() });
  if (exists) {
    throw AppError.conflict('Email already registered');
  }

  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await User.create({ email: data.email, passwordHash, name: data.name });
  const token = generateToken(user);
  return buildAuthResponse(user, token);
}

export async function login(data: LoginInput): Promise<AuthResponse> {
  const user = await User.findOne({ email: data.email.toLowerCase() }).select('+passwordHash');
  if (!user) {
    throw AppError.unauthorized('Invalid credentials');
  }

  const valid = await bcrypt.compare(data.password, user.passwordHash);
  if (!valid) {
    throw AppError.unauthorized('Invalid credentials');
  }

  const token = generateToken(user);
  return buildAuthResponse(user, token);
}

export async function forgotPassword(data: ForgotPasswordInput): Promise<MessageResponse> {
  const user = await User.findOne({ email: data.email.toLowerCase() });

  if (!user) {
    return { message: 'If an account exists for this email, a reset link has been sent.' };
  }

  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  const expiresAt = new Date(Date.now() + env.passwordResetExpiryMinutes * 60 * 1000);

  await PasswordResetToken.deleteMany({ userId: user._id });
  await PasswordResetToken.create({
    userId: user._id,
    tokenHash,
    expiresAt,
  });

  sendPasswordResetEmail(user.email, rawToken);

  return { message: 'If an account exists for this email, a reset link has been sent.' };
}

export async function resetPassword(data: ResetPasswordInput): Promise<MessageResponse> {
  const tokenHash = crypto.createHash('sha256').update(data.token).digest('hex');
  const resetRecord = await PasswordResetToken.findOne({ tokenHash });

  if (!resetRecord) {
    throw AppError.badRequest('Invalid or expired reset link');
  }

  if (resetRecord.expiresAt.getTime() < Date.now()) {
    await PasswordResetToken.deleteOne({ _id: resetRecord._id });
    throw AppError.badRequest('Invalid or expired reset link');
  }

  const user = await User.findById(resetRecord.userId).select('+passwordHash');
  if (!user) {
    await PasswordResetToken.deleteOne({ _id: resetRecord._id });
    throw AppError.notFound('User not found');
  }

  user.passwordHash = await bcrypt.hash(data.password, 12);
  await user.save();
  await PasswordResetToken.deleteMany({ userId: user._id });

  return { message: 'Password reset successful. Please sign in with your new password.' };
}

export async function getProfile(userId: string): Promise<UserProfile> {
  const user = await User.findById(userId);
  if (!user) {
    throw AppError.notFound('User not found');
  }
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl || null,
    createdAt: user.createdAt,
  };
}
