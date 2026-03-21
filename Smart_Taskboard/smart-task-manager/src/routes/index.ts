import { Router, Request, Response, NextFunction } from 'express';
import * as invitationCtrl from '../controllers/invitation.controller';
import AppError from '../utils/AppError';

const router = Router();

router.use('/auth', require('./auth.routes').default);
router.use('/projects', require('./project.routes').default);
router.use('/projects/:projectId/tasks', require('./task.routes').default);
router.use('/projects/:projectId/members', require('./member.routes').default);
router.use('/projects/:projectId/invitations', require('./invitation.routes').default);
router.use('/projects/:projectId/activity', require('./activity.routes').default);

// Public invitation accept — no project scope, no auth
router.get('/invitations/accept', (req: Request, res: Response, next: NextFunction): void => {
  if (!req.query.token) {
    return next(AppError.badRequest('token query param is required'));
  }
  next();
}, invitationCtrl.accept);

export default router;
