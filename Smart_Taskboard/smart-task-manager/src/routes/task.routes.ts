import { Router } from 'express'
import {
  create,
  list,
  getOne,
  update,
  destroy,
  changeStatus,
  assignUsers,
  unassignUser
} from '../controllers/task.controller'
import authenticate from '../middleware/authenticate'
import requireRole from '../middleware/requireRole'
import validate from '../middleware/validate'
import {
  createTaskValidators,
  updateTaskValidators,
  changeStatusValidators,
  assignUsersValidators
} from '../validators/task.validators'

const router = Router({ mergeParams: true })

const ALL = requireRole('ADMIN', 'REPORTER', 'REPORTEE')
const MGMT = requireRole('ADMIN', 'REPORTER')

router.post('/', authenticate, MGMT, validate(createTaskValidators), create)
router.get('/', authenticate, ALL, list)
router.get('/:taskId', authenticate, ALL, getOne)
router.patch('/:taskId', authenticate, MGMT, validate(updateTaskValidators), update)
router.delete('/:taskId', authenticate, MGMT, destroy)
router.patch('/:taskId/status', authenticate, ALL, validate(changeStatusValidators), changeStatus)
router.post('/:taskId/assignees', authenticate, MGMT, validate(assignUsersValidators), assignUsers)
router.delete('/:taskId/assignees/:assigneeId', authenticate, MGMT, unassignUser)

export default router