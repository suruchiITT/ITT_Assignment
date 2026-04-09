# Architecture — MERN Backend

---

## High-Level Request Flow

```
┌────────────────────────────────────────────────────────┐
│                   HTTP Clients                         │
│      React UI (port 5173) / Postman / curl             │
└────────────────────────┬───────────────────────────────┘
                         │ HTTP REST
                         ▼
┌────────────────────────────────────────────────────────┐
│              Express App  (src/app.js)                  │
│  • helmet  — security headers                          │
│  • cors    — allow localhost:5173                      │
│  • morgan  — request logger                            │
│  • express.json() — body parser                        │
└────────────────────────┬───────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────┐
│              Route Layer  (src/routes/)                 │
│  /api/auth                  → auth.routes.js           │
│  /api/projects              → project.routes.js        │
│  /api/projects/:id/tasks    → task.routes.js           │
│  /api/projects/:id/members  → member.routes.js         │
│  /api/projects/:id/invitations → invitation.routes.js  │
│  /api/projects/:id/activity → activity.routes.js       │
│  /api/invitations/accept    → inline in index.js       │
└────────────────────────┬───────────────────────────────┘
                         │
                    ┌────┴────┐
                    ▼         ▼
         ┌──────────────┐  ┌──────────────────┐
         │  Middleware  │  │   Controllers     │
         │  authenticate│  │  (thin layer)     │
         │  requireRole │  │  validate → call  │
         │  validate    │  │  service → send   │
         └──────────────┘  └────────┬─────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Service Layer      │
                         │  (all business logic) │
                         │  task.service.js      │
                         │  project.service.js   │
                         │  auth.service.js      │
                         │  invitation.service.js│
                         │  member.service.js    │
                         │  activity.service.js  │
                         └────┬────────┬─────────┘
                              │        │
               ┌──────────────┘        └─────────────────┐
               ▼                                          ▼
  ┌────────────────────────┐              ┌───────────────────────┐
  │  Mongoose Models       │              │  Side Effects         │
  │  User, Project, Task,  │              │  activityLogger.js    │
  │  ProjectMember,        │              │  eventPublisher.js    │
  │  Invitation,           │              │  emailService.js      │
  │  ActivityLog           │              └──────────┬────────────┘
  └──────────┬─────────────┘                         │
             │                          ┌────────────▼────────────┐
             ▼                          │  Socket.IO              │
  ┌──────────────────────┐              │  (real-time to clients) │
  │   MongoDB            │              └─────────────────────────┘
  │   (port 27017)       │
  └──────────────────────┘
```

---

## Layer Responsibilities

### 1. Entry Point (`src/server.js`)
- Connects to MongoDB via `config/db.js`
- Creates `http.Server` wrapping the Express app
- Initialises Socket.IO via `config/socket.js`
- Starts listening on `env.port` (default 8080)

### 2. Express App (`src/app.js`)
- Registers global middleware: helmet, cors, morgan, json parser
- Mounts all route groups under `/api`
- Provides `/actuator/health` endpoint (mirrors Spring Actuator)
- Registers the global error handler as last middleware

### 3. Routes (`src/routes/`)
- Thin wiring: `router.METHOD(path, [...middleware], controller.handler)`
- No business logic here
- `authenticate` middleware is applied per-route (not globally)
- `requireRole(...)` applied where role enforcement is needed

### 4. Middleware (`src/middleware/`)

| File | Purpose |
|---|---|
| `authenticate.js` | Extracts Bearer JWT, verifies it, loads `User` from DB, sets `req.user` |
| `requireRole.js` | Looks up `ProjectMember` for `req.user + req.params.projectId`, checks `role` |
| `validate.js` | Runs `express-validator` result check, returns 422 if invalid |
| `errorHandler.js` | 4-arg Express error handler — maps `AppError` to JSON, 500 for unknowns |

### 5. Controllers (`src/controllers/`)
- Receive `(req, res, next)`
- Extract validated fields from `req.body`, `req.params`, `req.query`
- Call **one** service method
- Send JSON response or pass error to `next()`
- **Zero business logic** — a controller only knows about HTTP

### 6. Services (`src/services/`)
- Own all business rules: validation of ownership, status transitions, uniqueness checks
- Call Mongoose models directly (no repository abstraction layer — Mongoose is simple enough)
- Call `logActivity(...)` for audit trail
- Call `publishTaskEvent(...)` for real-time push
- Call `emailService.*` for invitation emails
- Throw `AppError` instances for expected error conditions

### 7. Models (`src/models/`)
- Mongoose schemas with validators, indexes, and `toJSON` transforms
- `toJSON` normalises `_id → id`, removes `__v` and `passwordHash`
- Compound indexes for common query patterns (see `DATA_MODELS.md`)

### 8. Utils (`src/utils/`)

| File | Purpose |
|---|---|
| `AppError.js` | Custom error class with `statusCode`; static factories: `.badRequest()`, `.unauthorized()`, `.forbidden()`, `.notFound()` |
| `asyncHandler.js` | Wraps async route handlers — forwards thrown errors to `next()` |
| `response.js` | `sendSuccess(res, data, statusCode)` and `sendError(res, message, statusCode)` helpers |
| `activityLogger.js` | Fire-and-forget: creates `ActivityLog` document, never throws |
| `eventPublisher.js` | Wraps Socket.IO `emit` to a project room; defines `WS_EVENTS` constants |
| `emailService.js` | Nodemailer transporter; `sendInvitationEmail(to, inviteUrl)` |

---

## RBAC (Role-Based Access Control)

Three roles exist per project:

| Role | Can do |
|---|---|
| `ADMIN` | Full access: manage members, change roles, create/edit/delete tasks |
| `REPORTER` | Create tasks, assign users, update any task in the project |
| `REPORTEE` | View & change status of **assigned tasks only** |

Enforcement happens in two places:
1. `requireRole(...roles)` middleware — checks `ProjectMember.role`
2. Service layer — `REPORTEE` task list filtered by `assignees.userId`

---

## Real-Time (Socket.IO)

- On connect, client joins room `project:{projectId}` by calling `socket.join()`
- Task events broadcast to that room: `TASK_CREATED`, `TASK_UPDATED`, `TASK_STATUS_CHANGED`, `TASK_ASSIGNED`, `TASK_DELETED`
- Payload shape matches the REST `TaskResponse` — frontend can update cache directly
- Config in `src/config/socket.js`; publisher in `src/utils/eventPublisher.js`

---

## Authentication Flow

```
POST /api/auth/login
  → authenticate? No (public endpoint)
  → AuthController.login
  → AuthService.login(email, password)
       → User.findOne({email}).select('+passwordHash')
       → bcrypt.compare(password, hash)
       → jwt.sign({ sub: userId }, secret, { expiresIn })
  → response: { accessToken, tokenType, expiresIn, user }

Subsequent requests:
  Authorization: Bearer <token>
  → authenticate middleware
       → jwt.verify(token, secret) → payload
       → User.findById(payload.sub) → req.user
  → route proceeds
```

---

## Invitation Flow

```
ADMIN sends invitation
  POST /api/projects/:id/invitations
  → InvitationService.send(projectId, adminId, email, role)
       → generate UUID token
       → create Invitation document (status=PENDING, expiresAt=+7days)
       → emailService.sendInvitationEmail(email, `${frontendUrl}/invitations/accept?token=${token}`)

Recipient clicks link in email
  GET /api/invitations/accept?token=<uuid>
  → InvitationService.accept(token)
       → find Invitation by token, check status=PENDING & not expired
       → find/register User by email
       → create ProjectMember (role from invitation, status=ACTIVE)
       → mark Invitation as ACCEPTED
  → redirect to frontend dashboard
```
