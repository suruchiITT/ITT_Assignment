import { Router } from 'express'
import { send, list, revoke } from '../controllers/invitation.controller'
import authenticate from '../middleware/authenticate'
import requireRole from '../middleware/requireRole'
import validate from '../middleware/validate'
import { sendInvitationValidators } from '../validators/invitation.validators'

const router = Router({ mergeParams: true })

router.post('/', authenticate, requireRole('ADMIN'), validate(sendInvitationValidators), send)
router.get('/', authenticate, requireRole('ADMIN'), list)
router.delete('/:invitationId', authenticate, requireRole('ADMIN'), revoke)

export default router