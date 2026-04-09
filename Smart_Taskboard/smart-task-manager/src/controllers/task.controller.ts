import { Response } from 'express';
import * as taskService from '../services/task.service';
import asyncHandler from '../utils/asyncHandler';
import { sendOk, sendCreated } from '../utils/response';
import { AuthRequest } from '../middleware/authenticate';

export const create = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendCreated(res, await taskService.createTask(req.params.projectId, req.user!.id, req.body));
});

export const list = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await taskService.listTasks(req.params.projectId, req.user!.id, (req as any).membership.role));
});

export const getOne = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await taskService.getTask(req.params.projectId, req.params.taskId, req.user!.id, (req as any).membership.role));
});

export const update = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await taskService.updateTask(req.params.projectId, req.params.taskId, req.user!.id, req.body));
});

export const destroy = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  await taskService.deleteTask(req.params.projectId, req.params.taskId, req.user!.id);
  sendOk(res, null);
});

export const changeStatus = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await taskService.changeStatus(req.params.projectId, req.params.taskId, req.user!.id, (req as any).membership.role, req.body));
});

export const assignUsers = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await taskService.assignUsers(req.params.projectId, req.params.taskId, req.user!.id, req.body));
});

export const unassignUser = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await taskService.unassignUser(req.params.projectId, req.params.taskId, req.user!.id, req.params.assigneeId));
});
