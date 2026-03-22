import { Response } from 'express'
import * as memberService from '../services/member.service'
import asyncHandler from '../utils/asyncHandler'
import { sendOk } from '../utils/response'
import { AuthRequest } from '../middleware/authenticate'
import { MemberRole } from '../models/ProjectMember'

interface ChangeMemberRoleBody {
  role: MemberRole
}

export const list = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  sendOk(res, await memberService.listMembers(req.params.projectId))
})

export const changeRole = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { role } = req.body as ChangeMemberRoleBody

  sendOk(
    res,
    await memberService.changeMemberRole(
      req.params.projectId,
      req.params.userId,
      req.user!.id,
      { role }
    )
  )
})

export const remove = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  await memberService.removeMember(req.params.projectId, req.params.userId, req.user!.id)
  sendOk(res, null)
})