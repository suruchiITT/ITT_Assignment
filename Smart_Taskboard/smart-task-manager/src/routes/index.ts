import { Router, Request, Response, NextFunction } from 'express'
import { accept } from '../controllers/invitation.controller'
import { badRequest } from '../utils/AppError'

import authRoutes from './auth.routes'
import projectRoutes from './project.routes'
import taskRoutes from './task.routes'
import memberRoutes from './member.routes'
import invitationRoutes from './invitation.routes'
import activityRoutes from './activity.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/projects', projectRoutes)
router.use('/projects/:projectId/tasks', taskRoutes)
router.use('/projects/:projectId/members', memberRoutes)
router.use('/projects/:projectId/invitations', invitationRoutes)
router.use('/projects/:projectId/activity', activityRoutes)

router.get(
  '/invitations/accept',
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.query.token) {
      return next(badRequest('token query param is required'))
    }
    next()
  },
  accept
)

export default router