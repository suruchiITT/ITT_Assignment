import { Router } from 'express';
import * as ctrl from '../controllers/activity.controller';
import authenticate from '../middleware/authenticate';
import requireRole from '../middleware/requireRole';

const router = Router({ mergeParams: true });

router.get('/', authenticate, requireRole('ADMIN', 'REPORTER', 'REPORTEE'), ctrl.getActivity);

export default router;
