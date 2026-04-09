# API Reference — MERN Backend

Base URL: `http://localhost:8080/api`

All authenticated requests require:
```
Authorization: Bearer <JWT>
```

All responses follow:
```json
{ "success": true,  "data": { ... } }
{ "success": false, "message": "Reason" }
```

---

## Auth

### Register
```
POST /auth/register
```
**Body**
```json
{ "name": "Alice", "email": "alice@example.com", "password": "password123" }
```
**Response 201**
```json
{
  "accessToken": "eyJ...",
  "tokenType": "Bearer",
  "expiresIn": 86400000,
  "user": { "id": "...", "name": "Alice", "email": "alice@example.com", "avatarUrl": null }
}
```

### Login
```
POST /auth/login
```
**Body**
```json
{ "email": "alice@example.com", "password": "password123" }
```
**Response 200** — same shape as register.

---

## Projects

### List my projects
```
GET /projects
Auth: required
```
Returns all projects where the current user is an ACTIVE member, including `myRole`.

### Create project
```
POST /projects
Auth: required
```
**Body**
```json
{ "name": "Project Alpha" }
```
Creator becomes ADMIN automatically.

### Get project
```
GET /projects/:projectId
Auth: required, must be ACTIVE member
```

### Delete project
```
DELETE /projects/:projectId
Auth: required, ADMIN only
```
Cascades: removes all tasks, members, invitations.

---

## Tasks

All task endpoints are scoped to a project: `/projects/:projectId/tasks`

### List tasks
```
GET /projects/:projectId/tasks
Auth: required, ACTIVE member
```
REPORTEE: returns only tasks where they are an assignee.
Others: returns all non-deleted tasks.

### Create task
```
POST /projects/:projectId/tasks
Auth: required, ADMIN or REPORTER
```
**Body**
```json
{
  "title": "Fix login bug",
  "description": "Optional description",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2024-12-31T00:00:00.000Z"
}
```
`status` defaults to `TODO`. `priority` defaults to `MEDIUM`.

### Get task
```
GET /projects/:projectId/tasks/:taskId
Auth: required, ACTIVE member
```

### Update task
```
PATCH /projects/:projectId/tasks/:taskId
Auth: required, ADMIN or REPORTER
```
**Body** (all optional)
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "URGENT",
  "dueDate": "2025-01-15T00:00:00.000Z",
  "clearDueDate": true
}
```
Use `clearDueDate: true` to remove a due date.

### Change task status
```
PATCH /projects/:projectId/tasks/:taskId/status
Auth: required, ADMIN, REPORTER, or REPORTEE (if assigned)
```
**Body**
```json
{ "status": "IN_PROGRESS" }
```
Valid values: `TODO`, `IN_PROGRESS`, `DONE`

### Assign users to task
```
PUT /projects/:projectId/tasks/:taskId/assignees
Auth: required, ADMIN or REPORTER
```
**Body** — replaces the full assignee list
```json
{ "userIds": ["userId1", "userId2"] }
```
Pass empty array to clear all assignees.

### Delete task
```
DELETE /projects/:projectId/tasks/:taskId
Auth: required, ADMIN or REPORTER
```
Soft delete (sets `deletedAt`).

---

## Members

### List members
```
GET /projects/:projectId/members
Auth: required, ACTIVE member
```
Returns all ACTIVE members with user data.

### Change member role
```
PATCH /projects/:projectId/members/:userId/role
Auth: required, ADMIN only
```
**Body**
```json
{ "role": "REPORTER" }
```
Valid roles: `REPORTER`, `REPORTEE` (cannot set to ADMIN via this endpoint).

### Remove member
```
DELETE /projects/:projectId/members/:userId
Auth: required, ADMIN only
```
Cannot remove yourself if you are the only ADMIN.

---

## Invitations

### Send invitation
```
POST /projects/:projectId/invitations
Auth: required, ADMIN only
```
**Body**
```json
{ "email": "bob@example.com", "role": "REPORTER" }
```
Sends an invitation email with a signed token link.
Valid roles: `REPORTER`, `REPORTEE`.

### List invitations
```
GET /projects/:projectId/invitations
Auth: required, ADMIN only
```
Returns all invitations (PENDING, ACCEPTED, REVOKED, EXPIRED).

### Revoke invitation
```
DELETE /projects/:projectId/invitations/:invitationId
Auth: required, ADMIN only
```

### Accept invitation (public)
```
GET /invitations/accept?token=<uuid>
Auth: not required
```
Accepts the invitation, creates or activates the user account, adds them as a project member.
Redirects to `${FRONTEND_URL}/invitations/accept?token=<uuid>` on success.

---

## Activity

### List activity
```
GET /projects/:projectId/activity?page=0&limit=20
Auth: required, ACTIVE member
```
Returns paginated activity log with actor user data.

**Response**
```json
{
  "content": [
    {
      "id": "...",
      "projectId": "...",
      "actorId": "...",
      "actor": { "id": "...", "name": "Alice", "email": "..." },
      "action": "TASK_CREATED",
      "entityType": "TASK",
      "entityId": "...",
      "metadata": { "title": "Fix login bug", "status": "TODO" },
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  ],
  "totalElements": 42,
  "totalPages": 3,
  "page": 0,
  "limit": 20
}
```

---

## Health Check

```
GET /actuator/health
Auth: not required
```
**Response 200**
```json
{ "status": "UP" }
```

---

## Error Responses

| HTTP Status | When |
|---|---|
| 400 Bad Request | Missing/invalid input fields |
| 401 Unauthorized | Missing, expired, or invalid JWT |
| 403 Forbidden | JWT valid but insufficient role or not a project member |
| 404 Not Found | Resource (project, task, user) not found |
| 409 Conflict | Duplicate (e.g., email already registered, user already a member) |
| 422 Unprocessable | Input validation failed (express-validator) |
| 500 Internal | Unexpected server error |

All error responses:
```json
{ "success": false, "message": "Human-readable error message" }
```
