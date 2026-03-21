import { Router } from 'express';
import * as ctrl from '../controllers/invitation.controller';
import authenticate from '../middleware/authenticate';
import requireRole from '../middleware/requireRole';
import validate from '../middleware/validate';
import { sendInvitationValidators } from '../validators/invitation.validators';

const router = Router({ mergeParams: true });

router.post('/', authenticate, requireRole('ADMIN'), validate(sendInvitationValidators), ctrl.send);
router.get('/', authenticate, requireRole('ADMIN'), ctrl.list);
router.delete('/:invitationId', authenticate, requireRole('ADMIN'), ctrl.revoke);

export default router;
