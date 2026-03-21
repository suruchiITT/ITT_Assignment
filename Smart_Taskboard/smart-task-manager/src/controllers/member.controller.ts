import { Response } from 'express';
import * as memberService from '../services/member.service';
import asyncHandler from '../utils/asyncHandler';
import { sendOk } from '../utils/response';
import { AuthRequest } from '../middleware/authenticate';

interface ChangeMemberRoleBody {
  role: string;
}

export const list = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await memberService.listMembers(req.params.projectId));
});

export const changeRole = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await memberService.changeMemberRole(req.params.projectId, req.params.userId, req.user!.id, req.body as ChangeMemberRoleBody));
});

export const remove = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  await memberService.removeMember(req.params.projectId, req.params.userId, req.user!.id);
  sendOk(res, null);
});
