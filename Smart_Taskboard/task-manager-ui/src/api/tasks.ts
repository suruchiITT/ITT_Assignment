import { apiClient } from './client'
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  ChangeTaskStatusRequest,
  AssignUsersRequest,
  PagedResponse,
} from '@/types'

export const tasksApi = {
  list: async (projectId: string): Promise<Task[]> => {
    const { data } = await apiClient.get<{ data: PagedResponse<Task> | Task[] }>(
      `/api/projects/${projectId}/tasks`
    )
    const payload = data.data!
    return Array.isArray(payload) ? payload : payload.content
  },

  get: async (projectId: string, taskId: string): Promise<Task> => {
    const { data } = await apiClient.get<{ data: Task }>(
      `/api/projects/${projectId}/tasks/${taskId}`
    )
    return data.data!
  },

  create: async (projectId: string, body: CreateTaskRequest): Promise<Task> => {
    const { data } = await apiClient.post<{ data: Task }>(
      `/api/projects/${projectId}/tasks`,
      body
    )
    return data.data!
  },

  update: async (projectId: string, taskId: string, body: UpdateTaskRequest): Promise<Task> => {
    const { data } = await apiClient.patch<{ data: Task }>(
      `/api/projects/${projectId}/tasks/${taskId}`,
      body
    )
    return data.data!
  },

  changeStatus: async (
    projectId: string,
    taskId: string,
    body: ChangeTaskStatusRequest
  ): Promise<Task> => {
    const { data } = await apiClient.patch<{ data: Task }>(
      `/api/projects/${projectId}/tasks/${taskId}/status`,
      body
    )
    return data.data!
  },

  assign: async (
    projectId: string,
    taskId: string,
    body: AssignUsersRequest
  ): Promise<Task> => {
    const { data } = await apiClient.post<{ data: Task }>(
      `/api/projects/${projectId}/tasks/${taskId}/assignees`,
      body
    )
    return data.data!
  },

  unassign: async (projectId: string, taskId: string, userId: string): Promise<Task> => {
    const { data } = await apiClient.delete<{ data: Task }>(
      `/api/projects/${projectId}/tasks/${taskId}/assignees/${userId}`
    )
    return data.data!
  },

  delete: async (projectId: string, taskId: string): Promise<void> => {
    await apiClient.delete(`/api/projects/${projectId}/tasks/${taskId}`)
  },
}
