import { Response } from 'express'
import {
  listMyProjects,
  createProject,
  getProject,
  deleteProject
} from '../services/project.service'
import asyncHandler from '../utils/asyncHandler'
import { sendOk, sendCreated } from '../utils/response'
import { AuthRequest } from '../middleware/authenticate'

interface CreateProjectBody {
  name: string
}

export const list = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await listMyProjects(req.user!.id))
})

export const create = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendCreated(res, await createProject(req.user!.id, req.body as CreateProjectBody))
})

export const getOne = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await getProject(req.params.projectId, req.user!.id))
})

export const destroy = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  await deleteProject(req.params.projectId, req.user!.id)
  sendOk(res, null)
})