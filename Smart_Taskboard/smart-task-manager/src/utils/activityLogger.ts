import ActivityLog from '../models/ActivityLog';

export function logActivity(
  projectId: string,
  actorId: string,
  action: string,
  entityType: string,
  entityId: string,
  metadata: Record<string, any> = {}
): void {
  setImmediate(async () => {
    try {
      await ActivityLog.create({ projectId, actorId, action, entityType, entityId, metadata });
    } catch (err) {
      console.error('[ActivityLog] Failed to write:', action, (err as Error).message);
    }
  });
}

export default logActivity;
