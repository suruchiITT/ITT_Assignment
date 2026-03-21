import Task, { ITask, TaskStatus, TaskPriority } from '../models/Task';
import User from '../models/User';
import AppError from '../utils/AppError';
import logActivity from '../utils/activityLogger';
import { publishTaskEvent, WS_EVENTS } from '../utils/eventPublisher';
import { MemberRole } from '../models/ProjectMember';

export interface AssigneeResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}

export interface TaskResponse {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  createdBy: string;
  assignees: AssigneeResponse[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Hydrate assignee sub-docs into flat User[] matching frontend Task type
 */
async function buildAssigneeResponses(assignees: any[]): Promise<AssigneeResponse[]> {
  if (!assignees || assignees.length === 0) {
    return [];
  }
  const userIds = [...new Set(assignees.map((a) => a.userId.toString()))];
  const users = await User.find({ _id: { $in: userIds } });
  const userMap = new Map(users.map((u) => [u._id.toString(), u]));
  return assignees
    .map((a) => {
      const u = userMap.get(a.userId.toString());
      return u
        ? { id: u._id.toString(), name: u.name, email: u.email, avatarUrl: u.avatarUrl || null }
        : null;
    })
    .filter(Boolean) as AssigneeResponse[];
}

async function toTaskResponse(task: ITask): Promise<TaskResponse> {
  const assignees = await buildAssigneeResponses(task.assignees);
  return {
    id: task._id.toString(),
    projectId: task.projectId.toString(),
    title: task.title,
    description: task.description || null,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate || null,
    createdBy: task.createdBy.toString(),
    assignees,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

interface CreateTaskInput {
  title: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date | null;
}

export async function createTask(
  projectId: string,
  userId: string,
  body: CreateTaskInput
): Promise<TaskResponse> {
  const task = await Task.create({
    projectId,
    createdBy: userId,
    title: body.title,
    description: body.description || null,
    status: body.status || 'TODO',
    priority: body.priority || 'MEDIUM',
    dueDate: body.dueDate || null,
  });

  const response = await toTaskResponse(task);
  publishTaskEvent(projectId, WS_EVENTS.TASK_CREATED, response);
  logActivity(projectId, userId, 'TASK_CREATED', 'TASK', task._id.toString(), {
    title: task.title,
    status: task.status,
  });

  return response;
}

export async function listTasks(projectId: string, userId: string, role: MemberRole): Promise<TaskResponse[]> {
  const filter: any = { projectId, deletedAt: null };
  if (role === 'REPORTEE') {
    filter['assignees.userId'] = userId;
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  return Promise.all(tasks.map(toTaskResponse));
}

export async function getTask(
  projectId: string,
  taskId: string,
  userId: string,
  role: MemberRole
): Promise<TaskResponse> {
  const task = await Task.findOne({ _id: taskId, projectId, deletedAt: null });
  if (!task) {
    throw AppError.notFound('Task not found');
  }

  if (role === 'REPORTEE') {
    const assigned = task.assignees.some((a) => a.userId.toString() === userId);
    if (!assigned) {
      throw AppError.forbidden('Reportees may only view their own assigned tasks');
    }
  }

  return toTaskResponse(task);
}

interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: Date;
  clearDueDate?: boolean;
}

export async function updateTask(
  projectId: string,
  taskId: string,
  userId: string,
  body: UpdateTaskInput
): Promise<TaskResponse> {
  const task = await Task.findOne({ _id: taskId, projectId, deletedAt: null });
  if (!task) {
    throw AppError.notFound('Task not found');
  }

  if (body.title !== undefined) {
    task.title = body.title;
  }
  if (body.description !== undefined) {
    task.description = body.description;
  }
  if (body.priority !== undefined) {
    task.priority = body.priority;
  }
  if (body.clearDueDate === true) {
    task.dueDate = null;
  } else if (body.dueDate !== undefined) {
    task.dueDate = body.dueDate;
  }

  await task.save();
  const response = await toTaskResponse(task);
  publishTaskEvent(projectId, WS_EVENTS.TASK_UPDATED, response);
  logActivity(projectId, userId, 'TASK_UPDATED', 'TASK', task._id.toString(), { title: task.title });

  return response;
}

export async function deleteTask(projectId: string, taskId: string, userId: string): Promise<void> {
  const task = await Task.findOne({ _id: taskId, projectId, deletedAt: null });
  if (!task) {
    throw AppError.notFound('Task not found');
  }

  await Task.updateOne({ _id: taskId }, { deletedAt: new Date() });
  publishTaskEvent(projectId, WS_EVENTS.TASK_DELETED, { taskId });
  logActivity(projectId, userId, 'TASK_DELETED', 'TASK', taskId, { title: task.title });
}

interface ChangeStatusInput {
  status: TaskStatus;
}

export async function changeStatus(
  projectId: string,
  taskId: string,
  userId: string,
  role: MemberRole,
  data: ChangeStatusInput
): Promise<TaskResponse> {
  const task = await Task.findOne({ _id: taskId, projectId, deletedAt: null });
  if (!task) {
    throw AppError.notFound('Task not found');
  }

  if (role === 'REPORTEE') {
    const assigned = task.assignees.some((a) => a.userId.toString() === userId);
    if (!assigned) {
      throw AppError.forbidden('Reportees may only change status of their own tasks');
    }
  }

  const oldStatus = task.status;
  task.status = data.status;
  await task.save();

  const response = await toTaskResponse(task);
  publishTaskEvent(projectId, WS_EVENTS.TASK_STATUS_CHANGED, { taskId, oldStatus, newStatus: data.status });
  logActivity(projectId, userId, 'TASK_STATUS_CHANGED', 'TASK', task._id.toString(), {
    title: task.title,
    from: oldStatus,
    to: data.status,
  });

  return response;
}

interface AssignUsersInput {
  userIds: string[];
}

export async function assignUsers(
  projectId: string,
  taskId: string,
  userId: string,
  data: AssignUsersInput
): Promise<TaskResponse> {
  const task = await Task.findOne({ _id: taskId, projectId, deletedAt: null });
  if (!task) {
    throw AppError.notFound('Task not found');
  }

  for (const uid of data.userIds) {
    const already = task.assignees.some((a) => a.userId.toString() === uid);
    if (!already) {
      task.assignees.push({ userId: uid as any, assignedBy: userId as any, assignedAt: new Date() });
    }
  }
  await task.save();

  const response = await toTaskResponse(task);
  publishTaskEvent(projectId, WS_EVENTS.TASK_ASSIGNED, response);
  logActivity(projectId, userId, 'TASK_ASSIGNED', 'TASK', task._id.toString(), {
    title: task.title,
    assignedUserIds: data.userIds,
  });

  return response;
}

export async function unassignUser(
  projectId: string,
  taskId: string,
  userId: string,
  assigneeId: string
): Promise<TaskResponse> {
  const task = await Task.findOne({ _id: taskId, projectId, deletedAt: null });
  if (!task) {
    throw AppError.notFound('Task not found');
  }

  const before = task.assignees.length;
  task.assignees = task.assignees.filter((a) => a.userId.toString() !== assigneeId);
  if (task.assignees.length === before) {
    throw AppError.notFound('Assignee not found on task');
  }

  await task.save();

  const response = await toTaskResponse(task);
  publishTaskEvent(projectId, WS_EVENTS.TASK_UNASSIGNED, { taskId, removedUserId: assigneeId });
  logActivity(projectId, userId, 'TASK_UNASSIGNED', 'TASK', task._id.toString(), {
    title: task.title,
    removedUserId: assigneeId,
  });

  return response;
}
