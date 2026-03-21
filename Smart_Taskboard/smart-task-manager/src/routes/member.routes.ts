import { Router } from 'express';
import * as ctrl from '../controllers/member.controller';
import authenticate from '../middleware/authenticate';
import requireRole from '../middleware/requireRole';
import validate from '../middleware/validate';
import { changeRoleValidators } from '../validators/member.validators';

const router = Router({ mergeParams: true });

router.get('/', authenticate, requireRole('ADMIN', 'REPORTER', 'REPORTEE'), ctrl.list);
router.patch('/:userId/role', authenticate, requireRole('ADMIN'), validate(changeRoleValidators), ctrl.changeRole);
router.delete('/:userId', authenticate, requireRole('ADMIN'), ctrl.remove);

export default router;
