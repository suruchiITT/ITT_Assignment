# Quick Reference: TypeScript Conversion

## 🚀 Quick Start

```bash
# 1. Install
npm install

# 2. Develop
npm run dev

# 3. Build
npm run build

# 4. Run
npm start
```

## 📁 File Mapping (JS → TS)

| Old | New | Type |
|-----|-----|------|
| `src/models/User.js` | `src/models/User.ts` | Model with `IUser` interface |
| `src/models/Project.js` | `src/models/Project.ts` | Model with `IProject` interface |
| `src/models/Task.js` | `src/models/Task.ts` | Model with `ITask`, `IAssignee` interfaces |
| `src/models/ProjectMember.js` | `src/models/ProjectMember.ts` | Model with role types |
| `src/models/ActivityLog.js` | `src/models/ActivityLog.ts` | Model with `IActivityLog` interface |
| `src/models/Invitation.js` | `src/models/Invitation.ts` | Model with `IInvitation` interface |
| `src/services/*.js` | `src/services/*.ts` | All services with typed responses |
| `src/controllers/*.js` | `src/controllers/*.ts` | All controllers with typed handlers |
| `src/routes/*.js` | `src/routes/*.ts` | All routes with typed middleware |
| `src/middleware/*.js` | `src/middleware/*.ts` | Typed middleware |
| `src/utils/*.js` | `src/utils/*.ts` | Typed utilities |
| `src/validators/*.js` | `src/validators/*.ts` | Validators with `ValidationChain[]` |
| `src/config/*.js` | `src/config/*.ts` | Typed config |
| `src/app.js` | `src/app.ts` | Express app with types |
| `src/server.js` | `src/server.ts` | Server entry with types |

## 🏗️ Architecture

```
User Request
    ↓
Routes (typed middleware chain)
    ↓
Authenticate Middleware (validates JWT)
    ↓
RoleCheck Middleware (validates permissions)
    ↓
Validate Middleware (express-validator rules)
    ↓
Controller (request/response typed)
    ↓
Service (business logic with typed responses)
    ↓
Models (Mongoose with TypeScript interfaces)
    ↓
MongoDB
```

## 🔑 Key Type Definitions

### Status/Priority Types
```typescript
type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
type MemberRole = 'ADMIN' | 'REPORTER' | 'REPORTEE';
```

### Request with User
```typescript
interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    avatarUrl: string | null;
  };
}
```

### API Response
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
```

## 📝 Validation Rules

### Auth
- Email: valid email format
- Password: 8-72 characters
- Name: 2-60 characters

### Project
- Name: 3-100 characters

### Task
- Title: required, max 255 chars
- Status: TODO | IN_PROGRESS | DONE
- Priority: LOW | MEDIUM | HIGH | URGENT
- DueDate: ISO 8601 format

### Member
- Role: ADMIN | REPORTER | REPORTEE

### Invitation
- Email: valid format
- Role: REPORTER | REPORTEE (no ADMIN)

## 📋 Validation Example

```typescript
import { body } from 'express-validator';
import { validate } from '../middleware/validate';

const rules = [
  body('name').trim().isLength({ min: 3, max: 100 })
    .withMessage('Name must be 3-100 characters'),
];

router.post('/', authenticate, validate(rules), controller.create);
```

## 🔒 Role-Based Access

```typescript
// ADMIN - full access to project
router.delete('/:projectId', 
  authenticate, 
  requireRole('ADMIN'), 
  controller.destroy
);

// ADMIN & REPORTER - can manage tasks
router.post('/', 
  authenticate, 
  requireRole('ADMIN', 'REPORTER'), 
  controller.create
);

// All roles - can view tasks
router.get('/', 
  authenticate, 
  requireRole('ADMIN', 'REPORTER', 'REPORTEE'), 
  controller.list
);
```

## 🌐 WebSocket Events

```typescript
export const WS_EVENTS = {
  TASK_CREATED: 'task.created',
  TASK_UPDATED: 'task.updated',
  TASK_DELETED: 'task.deleted',
  TASK_STATUS_CHANGED: 'task.status_changed',
  TASK_ASSIGNED: 'task.assigned',
  TASK_UNASSIGNED: 'task.unassigned',
  MEMBER_JOINED: 'member.joined',
  MEMBER_REMOVED: 'member.removed',
  MEMBER_ROLE_CHANGED: 'member.role_changed',
};
```

## 🔌 Database Connection

```typescript
// Validates required env vars
const env = {
  mongoUri: process.env.MONGODB_URI,  // Required
  jwtSecret: process.env.JWT_SECRET,  // Required, min 32 chars
  jwtExpirationMs: parseInt(process.env.JWT_EXPIRATION_MS),
  // ... other config
};

// Connect
await mongoose.connect(env.mongoUri);
```

## ✉️ Email Notifications

Automatically sent on:
- **Invitation**: When user is invited to project
- **Removal**: When user is removed from project

## 📊 Response Examples

### Create Project
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "My Project",
    "createdBy": "507f1f77bcf86cd799439012",
    "createdAt": "2024-03-21T10:00:00Z",
    "updatedAt": "2024-03-21T10:00:00Z",
    "myRole": "ADMIN",
    "taskCount": 0
  }
}
```

### Create Task
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "projectId": "507f1f77bcf86cd799439011",
    "title": "Fix login bug",
    "status": "TODO",
    "priority": "HIGH",
    "dueDate": "2024-03-28T00:00:00Z",
    "assignees": [],
    "createdAt": "2024-03-21T10:00:00Z",
    "updatedAt": "2024-03-21T10:00:00Z"
  }
}
```

## 🐛 Error Responses

```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP Status Codes:
- 400 - Bad Request (validation error)
- 401 - Unauthorized (no/invalid token)
- 403 - Forbidden (insufficient permissions)
- 404 - Not Found
- 409 - Conflict (duplicate, business logic violation)
- 410 - Gone (expired)
- 500 - Internal Server Error

## 🧪 Testing Commands

```bash
# Health check
curl http://localhost:8080/actuator/health

# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"test1234","name":"User"}'

# Get projects
curl -X GET http://localhost:8080/api/projects \
  -H "Authorization: Bearer <token>"

# Type check without building
npm run typecheck
```

## 📚 Documentation

- `README_TYPESCRIPT.md` - Full guide
- `TYPESCRIPT_MIGRATION.md` - Conversion details
- `SETUP_AFTER_CONVERSION.md` - Installation guide
- `API_REFERENCE.md` - Original API docs (still valid)
- `ARCHITECTURE.md` - System design

## 🚨 Common Issues

**Module not found?**
```bash
npm install
```

**Type errors?**
```bash
npm run typecheck
```

**Port in use?**
```bash
PORT=3001 npm run dev
```

**Build fails?**
```bash
npm run build  # Shows specific errors
```

## 🎯 Next Steps

1. `npm install` - Get dependencies
2. `npm run build` - Compile TypeScript
3. `npm run dev` - Start development
4. Test each API endpoint
5. Deploy compiled `dist/` folder

---

**Everything is typed. Everything is validated. Everything just works.** ✨
