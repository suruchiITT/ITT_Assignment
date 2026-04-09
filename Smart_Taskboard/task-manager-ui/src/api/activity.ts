import { apiClient } from './client'
import type { ActivityEvent, PagedResponse } from '@/types'

export const activityApi = {
  list: async (projectId: string): Promise<ActivityEvent[]> => {
    const { data } = await apiClient.get<{ data: PagedResponse<ActivityEvent> | ActivityEvent[] }>(
      `/api/projects/${projectId}/activity`
    )
    const payload = data.data!
    return Array.isArray(payload) ? payload : payload.content
  },
}
