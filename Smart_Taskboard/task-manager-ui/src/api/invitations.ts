import { apiClient } from './client'
import type { Invitation, SendInvitationRequest } from '@/types'

export const invitationsApi = {
  list: async (projectId: string): Promise<Invitation[]> => {
    const { data } = await apiClient.get<{ data: Invitation[] }>(
      `/api/projects/${projectId}/invitations`
    )
    return data.data!
  },

  send: async (projectId: string, body: SendInvitationRequest): Promise<Invitation> => {
    const { data } = await apiClient.post<{ data: Invitation }>(
      `/api/projects/${projectId}/invitations`,
      body
    )
    return data.data!
  },

  revoke: async (projectId: string, invitationId: string): Promise<void> => {
    await apiClient.delete(`/api/projects/${projectId}/invitations/${invitationId}`)
  },

  accept: async (token: string): Promise<string> => {
    const { data } = await apiClient.get<{ data: string }>(
      `/api/invitations/accept?token=${token}`
    )
    return data.data!
  },
}
