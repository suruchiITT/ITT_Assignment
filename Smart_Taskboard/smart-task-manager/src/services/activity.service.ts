import ActivityLog from '../models/ActivityLog';
import Task from '../models/Task';
import User from '../models/User';
import { MemberRole } from '../models/ProjectMember';

export interface ActorResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}

export interface ActivityLogResponse {
  id: string;
  projectId: string;
  actor: ActorResponse | null;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Record<string, any>;
  createdAt: Date;
}

export async function getActivity(
  projectId: string,
  userId: string,
  role: MemberRole,
  page: string | number,
  size: string | number
): Promise<ActivityLogResponse[]> {
  const safePage = Math.max(0, parseInt(String(page)) || 0);
  const safeSize = Math.min(100, Math.max(1, parseInt(String(size)) || 20));
  const skip = safePage * safeSize;

  let filter: any = { projectId };

  if (role === 'REPORTEE') {
    const myTasks = await Task.find({
      projectId,
      'assignees.userId': userId,
      deletedAt: null,
    }).select('_id');
    const myTaskIds = myTasks.map((t) => t._id.toString());
    filter = { projectId, entityId: { $in: myTaskIds } };
  }

  const logs = await ActivityLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(safeSize);

  // Batch-load actors
  const actorIds = [...new Set(logs.map((l) => l.actorId.toString()))];
  const actors = await User.find({ _id: { $in: actorIds } });
  const actorMap = new Map(actors.map((u) => [u._id.toString(), u]));

  return logs.map((log) => {
    const actor = actorMap.get(log.actorId.toString());
    return {
      id: log._id.toString(),
      projectId: log.projectId.toString(),
      actor: actor
        ? {
            id: actor._id.toString(),
            name: actor.name,
            email: actor.email,
            avatarUrl: actor.avatarUrl || null,
          }
        : null,
      action: log.action,
      entityType: log.entityType,
      entityId: log.entityId,
      metadata: log.metadata || {},
      createdAt: log.createdAt,
    };
  });
}
