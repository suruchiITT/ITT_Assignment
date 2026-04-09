# Codebase Guide — MERN Backend

A file-by-file walkthrough for a developer new to this project.
Read this **top to bottom** on your first day — it takes ~30 minutes and gives you a complete mental map.

---

## Directory Tree

```
smart-task-manager/
├── src/
│   ├── server.js              ← Entry point (start here)
│   ├── app.js                 ← Express app setup
│   │
│   ├── config/
│   │   ├── env.js             ← All env vars, validated at startup
│   │   ├── db.js              ← Mongoose connect
│   │   └── socket.js          ← Socket.IO init & room management
│   │
│   ├── models/                ← Mongoose schemas (data shapes)
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── ProjectMember.js
│   │   ├── Task.js
│   │   ├── Invitation.js
│   │   └── ActivityLog.js
│   │
│   ├── middleware/            ← Express middleware
│   │   ├── authenticate.js    ← JWT → req.user
│   │   ├── requireRole.js     ← RBAC → req.membership
│   │   ├── validate.js        ← express-validator result check
│   │   └── errorHandler.js    ← Global error → JSON response
│   │
│   ├── controllers/           ← HTTP layer only (thin)
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   ├── task.controller.js
│   │   ├── member.controller.js
│   │   ├── invitation.controller.js
│   │   └── activity.controller.js
│   │
│   ├── services/              ← Business logic (thick)
│   │   ├── auth.service.js
│   │   ├── project.service.js
│   │   ├── task.service.js
│   │   ├── member.service.js
│   │   ├── invitation.service.js
│   │   └── activity.service.js
│   │
│   ├── routes/                ← Route wiring
│   │   ├── index.js           ← Aggregates all route groups
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   ├── task.routes.js
│   │   ├── member.routes.js
│   │   ├── invitation.routes.js
│   │   └── activity.routes.js
│   │
│   ├── validators/            ← express-validator rule sets
│   │   ├── auth.validators.js
│   │   ├── project.validators.js
│   │   ├── task.validators.js
│   │   ├── member.validators.js
│   │   └── invitation.validators.js
│   │
│   └── utils/
│       ├── AppError.js        ← Custom error class
│       ├── asyncHandler.js    ← Async try/catch wrapper
│       ├── response.js        ← sendSuccess / sendError helpers
│       ├── activityLogger.js  ← Fire-and-forget audit trail
│       ├── eventPublisher.js  ← Socket.IO task event broadcast
│       └── emailService.js    ← Nodemailer invitation emails
│
├── package.json
├── nodemon.json
└── doc/                       ← You are here
```

---

## Phase 1: Entry Points (start here)

### `src/server.js`
The very first file Node executes. It:
1. Calls `connectDb()` to establish a Mongoose connection
2. Wraps the Express `app` in a native `http.Server`
3. Initialises Socket.IO on that server
4. Listens on `env.port` (default `8080`)

If MongoDB is unreachable, this throws at step 1 and the process exits — no silent failures.

### `src/app.js`
Creates and configures the Express instance. Registers:
- `helmet()` — sets secure HTTP headers
- `cors({ origin: env.corsOrigin })` — allows the frontend origin
- `morgan('dev')` — request logging in development
- `express.json()` — parses JSON request bodies
- `/actuator/health` — returns `{ status: 'UP' }` (matches Spring Actuator shape)
- `routes` under `/api`
- `errorHandler` as the final middleware (must be 4 params)

### `src/config/env.js`
Calls `dotenv.config()` and **validates** that required vars exist before the app starts.
If `MONGODB_URI` or `JWT_SECRET` are missing, the process throws immediately — you cannot accidentally run with defaults that would silently corrupt data.

---

## Phase 2: Models

### `User.js`
Fields: `email` (unique, lowercase), `passwordHash` (select: false — not returned by default), `name`, `avatarUrl`.

The `toJSON` transform converts `_id → id` and strips `__v` and `passwordHash`. This means `User.findById(id)` returns a safe object you can send to the client directly.

### `Project.js`
Fields: `name`, `createdBy` (ObjectId ref User), timestamps.

### `ProjectMember.js`
The join table between users and projects. Fields:
- `projectId`, `userId` — compound unique index
- `role` — `ADMIN | REPORTER | REPORTEE`
- `status` — `ACTIVE | PENDING | REMOVED | REVOKED | EXPIRED`
- `invitedBy`, `invitedAt`, `joinedAt`

When checking permissions, `requireRole` middleware always queries this model.

### `Task.js`
Fields: `projectId`, `title`, `description`, `status`, `priority`, `dueDate`, `createdBy`, `assignees` (array of sub-docs), `deletedAt` (soft delete).

The `assignees` sub-schema: `{ userId, assignedBy, assignedAt }`. Note: this stores ObjectIds only — for API responses, `task.service.js` hydrates them into full `User` objects.

### `Invitation.js`
Fields: `projectId`, `email`, `role`, `token` (UUID), `status`, `invitedBy`, `expiresAt`.

The `token` field is indexed and unique — used as the URL-safe identifier in invitation links.

### `ActivityLog.js`
Immutable append-only log. Fields: `projectId`, `actorId`, `action`, `entityType`, `entityId`, `metadata` (arbitrary key-value map). Never updated after creation.

---

## Phase 3: Middleware

### `authenticate.js`
Called before any protected route. Pattern:
1. Read `Authorization: Bearer <token>` header
2. `jwt.verify(token, env.jwtSecret)` → `{ sub: userId }`
3. `User.findById(payload.sub)` → if not found, reject
4. Set `req.user = { id, email, name, avatarUrl }`

On failure, calls `next(AppError.unauthorized(...))` — the error handler sends `401`.

### `requireRole(...allowedRoles)`
A **factory** (returns middleware). Called with the allowed roles:
```js
router.patch('/:id/role', authenticate, requireRole('ADMIN'), changeRole)
```
1. Reads `req.params.projectId` and `req.user.id`
2. Queries `ProjectMember.findOne({ projectId, userId, status: 'ACTIVE' })`
3. Checks `allowedRoles.includes(member.role)`
4. Sets `req.membership = member` for downstream use

### `validate.js`
Used after `express-validator` chains. Collects `validationResult(req)` and returns `422` with the error array if invalid.

### `errorHandler.js`
Express's special 4-arg `(err, req, res, next)` handler. Maps:
- `AppError` instances → `err.statusCode` + `err.message`
- Unknown errors → `500 Internal Server Error`
- Always returns `{ success: false, message, ... }`

---

## Phase 4: Services (most of your day-to-day code lives here)

### `auth.service.js`
- `register(body)` — hashes password, creates User, signs JWT
- `login(email, password)` — finds user `.select('+passwordHash')`, bcrypt compare, signs JWT

### `project.service.js`
- `createProject(userId, name)` — creates Project + creates ADMIN ProjectMember for creator
- `listProjects(userId)` — finds all ProjectMembers for userId, populates project data
- `getProject(projectId, userId)` — verifies membership, returns project with `myRole`
- `deleteProject(projectId, adminId)` — cascades to tasks, members, invitations

### `task.service.js`
Key helper `buildAssigneeResponses(assignees)`:
- Takes `assignees` array from MongoDB (ObjectId sub-docs)
- Batches a single `User.find({ _id: { $in: userIds } })` query
- Returns flat `[{ id, name, email, avatarUrl }]` — shape expected by the frontend

`listTasks(projectId, userId, role)`:
- REPORTEE: filter `{ 'assignees.userId': userId }` — only sees assigned tasks
- Others: see all non-deleted tasks

### `invitation.service.js`
- `send(...)` — creates Invitation doc, sends email
- `accept(token)` — validates token, creates user if new, creates ProjectMember
- `revoke(...)` — marks Invitation REVOKED
- `list(...)` — returns project invitations

### `member.service.js`
- `list(projectId)` — returns ACTIVE members with user data
- `changeRole(projectId, targetUserId, newRole)` — cannot demote self
- `remove(projectId, targetUserId)` — soft-removes member

### `activity.service.js`
- `list(projectId, page, limit)` — returns paginated ActivityLog with actor user joined

---

## Phase 5: Controllers

All controllers follow this template:
```js
exports.create = asyncHandler(async (req, res) => {
  const result = await someService.doSomething(req.params.id, req.user.id, req.body)
  sendSuccess(res, result, 201)
})
```
They never contain `if/else` business logic — that lives in the service.

---

## Phase 6: Validators

Each validator file exports arrays of `express-validator` chains to be spread into route definitions:
```js
// task.validators.js
exports.createTaskRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 255 }),
  body('priority').optional().isIn(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  ...
]

// task.routes.js
router.post('/', authenticate, requireRole('ADMIN','REPORTER'), createTaskRules, validate, taskCtrl.create)
```

---

## Phase 7: Utils

### `AppError.js`
```js
throw AppError.notFound('Task not found')
throw AppError.forbidden('Cannot modify another user\'s task')
throw AppError.badRequest('Invalid status transition')
```
The error handler reads `err.statusCode` and `err.message`.

### `asyncHandler.js`
```js
// Without asyncHandler:
router.post('/', async (req, res, next) => {
  try { ... } catch(e) { next(e) }
})

// With asyncHandler:
router.post('/', asyncHandler(async (req, res) => { ... }))
```

### `eventPublisher.js`
```js
publishTaskEvent(projectId, WS_EVENTS.TASK_CREATED, taskPayload)
// → socket.to(`project:${projectId}`).emit('TASK_CREATED', payload)
```
Frontend subscribes to the same room and event names.

---

## Where to Add New Code

| Task | What to create/edit |
|---|---|
| New endpoint | validators → controller method → service method → route wire |
| New model field | Edit model schema; update `toJSON` if needed; update service response builder |
| New role check | Edit `requireRole(...)` call in the route; add service-level check if needed |
| New WebSocket event | Add constant to `WS_EVENTS` in `eventPublisher.js`; call `publishTaskEvent` from service |
| New email | Add method to `emailService.js`; call from service |
| New activity action | Call `logActivity(...)` from service after the main operation |

---

## Common Patterns to Know

### Soft Delete
Tasks use `deletedAt` instead of hard delete:
```js
task.deletedAt = new Date()
await task.save()
// All queries include: { deletedAt: null }
```

### Role-Filtered Queries
```js
const filter = { projectId, deletedAt: null }
if (role === 'REPORTEE') filter['assignees.userId'] = userId
const tasks = await Task.find(filter)
```

### Response Shape (consistent across all endpoints)
```json
{ "success": true, "data": { ... } }
{ "success": false, "message": "Reason for failure" }
```
