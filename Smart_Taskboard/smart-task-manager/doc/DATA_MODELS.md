# Data Models — MERN Backend (MongoDB / Mongoose)

---

## Overview

All collections live in the same MongoDB database (`smarttask_dev` locally, `smarttask_prod` in production).

```
Database: smarttask_dev
├── users
├── projects
├── projectmembers
├── tasks
├── invitations
└── activitylogs
```

---

## User

**Collection:** `users`
**File:** `src/models/User.js`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated |
| `email` | String | Unique, lowercase, trimmed |
| `passwordHash` | String | `select: false` — never returned in queries |
| `name` | String | Trimmed |
| `avatarUrl` | String | Nullable, URL to avatar image |
| `createdAt` | Date | Auto via `timestamps` |

**Indexes:**
- `email` — unique index

**toJSON transform:** `_id → id`, removes `__v` and `passwordHash`

---

## Project

**Collection:** `projects`
**File:** `src/models/Project.js`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `name` | String | Trimmed, max 200 chars |
| `createdBy` | ObjectId | Ref: User |
| `createdAt` | Date | Auto |
| `updatedAt` | Date | Auto |

**Note:** Project membership is stored separately in `projectmembers`, not embedded here.

---

## ProjectMember

**Collection:** `projectmembers`
**File:** `src/models/ProjectMember.js`

Join table between User and Project.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `projectId` | ObjectId | Ref: Project |
| `userId` | ObjectId | Ref: User |
| `role` | String | `ADMIN \| REPORTER \| REPORTEE` |
| `status` | String | `ACTIVE \| PENDING \| REMOVED \| REVOKED \| EXPIRED` |
| `invitedBy` | ObjectId | Ref: User, nullable |
| `invitedAt` | Date | Nullable |
| `joinedAt` | Date | Set when invitation accepted |
| `createdAt` | Date | Auto |

**Indexes:**
- `{ projectId, userId }` — unique compound index
- `{ projectId, status }` — for listing active members
- `{ userId, status }` — for listing user's projects

---

## Task

**Collection:** `tasks`
**File:** `src/models/Task.js`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `projectId` | ObjectId | Ref: Project |
| `title` | String | Max 255 chars |
| `description` | String | Nullable, max 5000 chars |
| `status` | String | `TODO \| IN_PROGRESS \| DONE`, default `TODO` |
| `priority` | String | `LOW \| MEDIUM \| HIGH \| URGENT`, default `MEDIUM` |
| `dueDate` | Date | Nullable |
| `createdBy` | ObjectId | Ref: User |
| `assignees` | Array | See Assignee sub-schema below |
| `deletedAt` | Date | Nullable — soft delete |
| `createdAt` | Date | Auto |
| `updatedAt` | Date | Auto |

**Assignee Sub-schema** (stored inside Task, not a separate collection):

| Field | Type | Notes |
|---|---|---|
| `userId` | ObjectId | Ref: User |
| `assignedBy` | ObjectId | Ref: User |
| `assignedAt` | Date | Default: now |

> **Important:** Assignees are stored as ObjectId sub-documents. The service layer (`buildAssigneeResponses`) hydrates them into full User objects for API responses.

**Indexes:**
- `{ projectId, status, deletedAt }` — compound (kanban board queries)
- `{ projectId, 'assignees.userId', deletedAt }` — for REPORTEE-scoped task lists

---

## Invitation

**Collection:** `invitations`
**File:** `src/models/Invitation.js`

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `projectId` | ObjectId | Ref: Project |
| `email` | String | Recipient email (lowercase) |
| `role` | String | `REPORTER \| REPORTEE` |
| `token` | String | UUID v4, unique — used in invitation URL |
| `status` | String | `PENDING \| ACCEPTED \| REVOKED \| EXPIRED` |
| `invitedBy` | ObjectId | Ref: User |
| `expiresAt` | Date | Set to now + `INVITATION_EXPIRY_DAYS` days |
| `createdAt` | Date | Auto |

**Indexes:**
- `token` — unique index (lookup by token on accept)
- `{ projectId, email }` — prevents duplicate pending invitations

---

## ActivityLog

**Collection:** `activitylogs`
**File:** `src/models/ActivityLog.js`

Append-only audit log. Never updated after insertion.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `projectId` | ObjectId | Ref: Project |
| `actorId` | ObjectId | Ref: User |
| `action` | String | See action list below |
| `entityType` | String | `TASK \| PROJECT \| MEMBER \| INVITATION` |
| `entityId` | String | ID of the affected entity |
| `metadata` | Map(String) | Arbitrary key-value context (e.g., `{ title, status }`) |
| `createdAt` | Date | Auto |

**Indexes:**
- `{ projectId, createdAt: -1 }` — for paginated activity feed (most recent first)

**Known Action Values:**

| Action | Description |
|---|---|
| `TASK_CREATED` | New task created |
| `TASK_UPDATED` | Task fields edited |
| `TASK_STATUS_CHANGED` | Status changed (e.g. TODO → IN_PROGRESS) |
| `TASK_ASSIGNED` | Users assigned to task |
| `TASK_DELETED` | Task soft-deleted |
| `PROJECT_CREATED` | New project created |
| `MEMBER_ROLE_CHANGED` | Member's role updated |
| `MEMBER_REMOVED` | Member removed from project |
| `INVITATION_SENT` | Invitation email dispatched |
| `INVITATION_ACCEPTED` | Recipient accepted invitation |
| `INVITATION_REVOKED` | Admin revoked pending invitation |

---

## Entity Relationship Diagram

```
User ──────────── ProjectMember ──────── Project
 │                   (role, status)          │
 │                                           │
 └── creates ──────────────────── Task ──────┘
                                   │
                            assignees[] (userId refs)

User ── invites ── Invitation ─── belongs to ─── Project

ActivityLog ─── references ─── Project + User (actor)
```

---

## Tips for Querying in MongoDB Shell

```js
// Find all tasks for a project (not deleted)
db.tasks.find({ projectId: ObjectId("..."), deletedAt: null })

// Find tasks assigned to a specific user
db.tasks.find({ "assignees.userId": ObjectId("..."), deletedAt: null })

// Find active members of a project
db.projectmembers.find({ projectId: ObjectId("..."), status: "ACTIVE" })

// Get pending invitations
db.invitations.find({ projectId: ObjectId("..."), status: "PENDING" })

// Recent activity for a project
db.activitylogs.find({ projectId: ObjectId("...") }).sort({ createdAt: -1 }).limit(20)
```
