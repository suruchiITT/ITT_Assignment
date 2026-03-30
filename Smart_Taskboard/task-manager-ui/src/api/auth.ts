import { apiClient } from './client'
import type {
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  MessageResponse,
  RegisterRequest,
  ResetPasswordRequest,
  User,
} from '@/types'

export const authApi = {
  register: async (body: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post<{ data: AuthResponse }>('/api/auth/register', body)
    return data.data!
  },

  login: async (body: LoginRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post<{ data: AuthResponse }>('/api/auth/login', body)
    return data.data!
  },

  forgotPassword: async (body: ForgotPasswordRequest): Promise<MessageResponse> => {
    const { data } = await apiClient.post<{ data: MessageResponse }>('/api/auth/forgot-password', body)
    return data.data!
  },

  resetPassword: async (body: ResetPasswordRequest): Promise<MessageResponse> => {
    const { data } = await apiClient.post<{ data: MessageResponse }>('/api/auth/reset-password', body)
    return data.data!
  },

  me: async (): Promise<User> => {
    const { data } = await apiClient.get<{ data: User }>('/api/auth/me')
    return data.data!
  },
}
