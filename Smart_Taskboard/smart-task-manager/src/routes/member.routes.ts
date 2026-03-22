import { Router } from 'express'
import { list, changeRole, remove } from '../controllers/member.controller'
import authenticate from '../middleware/authenticate'
import requireRole from '../middleware/requireRole'
import validate from '../middleware/validate'
import { changeRoleValidators } from '../validators/member.validators'

const router = Router({ mergeParams: true })

router.get('/', authenticate, requireRole('ADMIN', 'REPORTER', 'REPORTEE'), list)
router.patch('/:userId/role', authenticate, requireRole('ADMIN'), validate(changeRoleValidators), changeRole)
router.delete('/:userId', authenticate, requireRole('ADMIN'), remove)

export default router