import { Router } from 'express';
import * as ctrl from '../controllers/task.controller';
import authenticate from '../middleware/authenticate';
import requireRole from '../middleware/requireRole';
import validate from '../middleware/validate';
import {
  createTaskValidators,
  updateTaskValidators,
  changeStatusValidators,
  assignUsersValidators,
} from '../validators/task.validators';

const router = Router({ mergeParams: true });

const ALL = requireRole('ADMIN', 'REPORTER', 'REPORTEE');
const MGMT = requireRole('ADMIN', 'REPORTER');

router.post('/', authenticate, MGMT, validate(createTaskValidators), ctrl.create);
router.get('/', authenticate, ALL, ctrl.list);
router.get('/:taskId', authenticate, ALL, ctrl.getOne);
router.patch('/:taskId', authenticate, MGMT, validate(updateTaskValidators), ctrl.update);
router.delete('/:taskId', authenticate, MGMT, ctrl.destroy);
router.patch('/:taskId/status', authenticate, ALL, validate(changeStatusValidators), ctrl.changeStatus);
router.post('/:taskId/assignees', authenticate, MGMT, validate(assignUsersValidators), ctrl.assignUsers);
router.delete('/:taskId/assignees/:assigneeId', authenticate, MGMT, ctrl.unassignUser);

export default router;
