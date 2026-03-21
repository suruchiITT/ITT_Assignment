import { Response } from 'express';
import * as activityService from '../services/activity.service';
import asyncHandler from '../utils/asyncHandler';
import { sendOk } from '../utils/response';
import { AuthRequest } from '../middleware/authenticate';

export const getActivity = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { page, size } = req.query;
  const data = await activityService.getActivity(
    req.params.projectId,
    req.user!.id,
    (req as any).membership.role,
    page as string | number,
    size as string | number
  );
  sendOk(res, data);
});
