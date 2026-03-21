import { Router } from 'express';
import * as ctrl from '../controllers/project.controller';
import authenticate from '../middleware/authenticate';
import requireRole from '../middleware/requireRole';
import validate from '../middleware/validate';
import { createProjectValidators } from '../validators/project.validators';

const router = Router();

router.get('/', authenticate, ctrl.list);
router.post('/', authenticate, validate(createProjectValidators), ctrl.create);
router.get('/:projectId', authenticate, requireRole('ADMIN', 'REPORTER', 'REPORTEE'), ctrl.getOne);
router.delete('/:projectId', authenticate, requireRole('ADMIN'), ctrl.destroy);

export default router;
