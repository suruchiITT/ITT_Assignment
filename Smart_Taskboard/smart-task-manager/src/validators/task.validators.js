const { body } = require('express-validator');

const createTaskValidators = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 255 }).withMessage('Title max 255 chars'),
  body('description').optional({ nullable: true }).isLength({ max: 5000 }).withMessage('Description max 5000 chars'),
  body('status').optional().isIn(['TODO', 'IN_PROGRESS', 'DONE']).withMessage('Invalid status'),
  body('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).withMessage('Invalid priority'),
  body('dueDate').optional({ nullable: true }).isISO8601().withMessage('dueDate must be ISO 8601'),
];

const updateTaskValidators = [
  body('title').optional().trim().isLength({ min: 1, max: 255 }).withMessage('Title max 255 chars'),
  body('description').optional({ nullable: true }).isLength({ max: 5000 }),
  body('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).withMessage('Invalid priority'),
  body('dueDate').optional({ nullable: true }).isISO8601().withMessage('dueDate must be ISO 8601'),
  body('clearDueDate').optional().isBoolean().withMessage('clearDueDate must be boolean'),
];

const changeStatusValidators = [
  body('status').isIn(['TODO', 'IN_PROGRESS', 'DONE']).withMessage('Invalid status value'),
];

const assignUsersValidators = [
  body('userIds').isArray({ min: 1 }).withMessage('userIds must be a non-empty array'),
  body('userIds.*').isMongoId().withMessage('Each userId must be a valid ID'),
];

module.exports = { createTaskValidators, updateTaskValidators, changeStatusValidators, assignUsersValidators };
