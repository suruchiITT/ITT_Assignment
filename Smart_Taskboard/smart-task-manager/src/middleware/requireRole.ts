import { Response, NextFunction } from 'express';
import ProjectMember from '../models/ProjectMember';
import AppError from '../utils/AppError';
import { AuthRequest } from './authenticate';
import { MemberRole, IProjectMember } from '../models/ProjectMember';

declare global {
  namespace Express {
    interface Request {
      membership?: IProjectMember;
    }
  }
}

/**
 * Factory that returns an Express middleware enforcing per-project RBAC.
 * Mirrors Spring's ProjectRoleAspect / @RequireRole annotation.
 *
 * After this runs: req.membership = ProjectMember document
 */
export const requireRole = (...allowedRoles: MemberRole[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projectId = req.params.projectId;
      if (!projectId) {
        return next(AppError.badRequest('projectId param missing'));
      }

      const member = await ProjectMember.findOne({
        projectId,
        userId: req.user?.id,
        status: 'ACTIVE',
      });

      if (!member) {
        return next(AppError.forbidden('You are not an active member of this project'));
      }

      if (!allowedRoles.includes(member.role)) {
        return next(AppError.forbidden(
          `This action requires one of the following roles: ${allowedRoles.join(', ')}`
        ));
      }

      req.membership = member;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default requireRole;
