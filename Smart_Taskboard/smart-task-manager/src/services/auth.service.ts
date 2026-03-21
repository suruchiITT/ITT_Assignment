import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import AppError from '../utils/AppError';
import env from '../config/env';

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
