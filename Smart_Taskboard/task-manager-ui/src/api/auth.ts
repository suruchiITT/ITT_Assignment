import { apiClient } from './client'
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '@/types'

export const authApi = {
  register: async (body: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post<{ data: AuthResponse }>('/api/auth/register', body)
    return data.data!
  },

  login: async (body: LoginRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post<{ data: AuthResponse }>('/api/auth/login', body)
    return data.data!
  },

  me: async (): Promise<User> => {
    const { data } = await apiClient.get<{ data: User }>('/api/auth/me')
    return data.data!
  },
}
