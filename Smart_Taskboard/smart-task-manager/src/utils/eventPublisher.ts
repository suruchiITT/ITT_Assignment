import { getIo } from '../config/socket';

export const WS_EVENTS = {
  TASK_CREATED: 'task.created',
  TASK_UPDATED: 'task.updated',
  TASK_DELETED: 'task.deleted',
  TASK_STATUS_CHANGED: 'task.status_changed',
  TASK_ASSIGNED: 'task.assigned',
  TASK_UNASSIGNED: 'task.unassigned',
  MEMBER_JOINED: 'member.joined',
  MEMBER_REMOVED: 'member.removed',
  MEMBER_ROLE_CHANGED: 'member.role_changed',
} as const;

export type WSEventType = typeof WS_EVENTS[keyof typeof WS_EVENTS];

export function publishTaskEvent(projectId: string, eventType: string, payload: any): void {
  try {
    getIo().to(`project:${projectId}:task`).emit('message', {
      event: eventType,
      payload,
      ts: new Date().toISOString(),
    });
  } catch {
  }
}

export function publishMemberEvent(projectId: string, eventType: string, payload: any): void {
  try {
    getIo().to(`project:${projectId}:member`).emit('message', {
      event: eventType,
      payload,
      ts: new Date().toISOString(),
    });
  } catch {
   
  }
}
