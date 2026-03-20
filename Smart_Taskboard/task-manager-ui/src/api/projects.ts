import { apiClient } from './client'
import type { Project, CreateProjectRequest } from '@/types'

export const projectsApi = {
  list: async (): Promise<Project[]> => {
    const { data } = await apiClient.get<{ data: Project[] }>('/api/projects')
    return data.data!
  },

  get: async (projectId: string): Promise<Project> => {
    const { data } = await apiClient.get<{ data: Project }>(`/api/projects/${projectId}`)
    return data.data!
  },

  create: async (body: CreateProjectRequest): Promise<Project> => {
    const { data } = await apiClient.post<{ data: Project }>('/api/projects', body)
    return data.data!
  },

  delete: async (projectId: string): Promise<void> => {
    await apiClient.delete(`/api/projects/${projectId}`)
  },
}
