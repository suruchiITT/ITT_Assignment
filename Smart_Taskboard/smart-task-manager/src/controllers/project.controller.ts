import { Response } from 'express';
import * as projectService from '../services/project.service';
import asyncHandler from '../utils/asyncHandler';
import { sendOk, sendCreated } from '../utils/response';
import { AuthRequest } from '../middleware/authenticate';

interface CreateProjectBody {
  name: string;
}

export const list = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await projectService.listMyProjects(req.user!.id));
});

export const create = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendCreated(res, await projectService.createProject(req.user!.id, req.body as CreateProjectBody));
});

export const getOne = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await projectService.getProject(req.params.projectId, req.user!.id));
});

export const destroy = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  await projectService.deleteProject(req.params.projectId, req.user!.id);
  sendOk(res, null);
});
