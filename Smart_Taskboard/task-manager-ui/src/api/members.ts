import { apiClient } from './client'
import type { ProjectMember, ChangeRoleRequest } from '@/types'

export const membersApi = {
  list: async (projectId: string): Promise<ProjectMember[]> => {
    const { data } = await apiClient.get<{ data: ProjectMember[] }>(
      `/api/projects/${projectId}/members`
    )
    return data.data!
  },

  changeRole: async (
    projectId: string,
    userId: string,
    body: ChangeRoleRequest
  ): Promise<ProjectMember> => {
    const { data } = await apiClient.patch<{ data: ProjectMember }>(
      `/api/projects/${projectId}/members/${userId}/role`,
      body
    )
    return data.data!
  },

  remove: async (projectId: string, userId: string): Promise<void> => {
    await apiClient.delete(`/api/projects/${projectId}/members/${userId}`)
  },
}
