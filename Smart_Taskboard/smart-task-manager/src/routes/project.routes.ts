import { Router } from 'express'
import { list, create, getOne, destroy } from '../controllers/project.controller'
import authenticate from '../middleware/authenticate'
import requireRole from '../middleware/requireRole'
import validate from '../middleware/validate'
import { createProjectValidators } from '../validators/project.validators'

const router = Router()

router.get('/', authenticate, list)
router.post('/', authenticate, validate(createProjectValidators), create)
router.get('/:projectId', authenticate, requireRole('ADMIN', 'REPORTER', 'REPORTEE'), getOne)
router.delete('/:projectId', authenticate, requireRole('ADMIN'), destroy)

export default router