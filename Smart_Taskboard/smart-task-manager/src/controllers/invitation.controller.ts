import { Response } from 'express';
import * as invitationService from '../services/invitation.service';
import asyncHandler from '../utils/asyncHandler';
import { sendOk, sendCreated } from '../utils/response';
import { AuthRequest } from '../middleware/authenticate';
import { InvitationRole } from '../models/Invitation';

interface SendInvitationBody {
  email: string;
  role: InvitationRole;
}

export const send = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendCreated(res, await invitationService.sendInvitation(req.params.projectId, req.user!.id, req.body as SendInvitationBody));
});

export const list = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await invitationService.listPendingInvitations(req.params.projectId));
});

export const accept = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await invitationService.acceptInvitation(req.query.token as string));
});

export const revoke = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  await invitationService.revokeInvitation(req.params.projectId, req.params.invitationId, req.user!.id);
  sendOk(res, null);
});
