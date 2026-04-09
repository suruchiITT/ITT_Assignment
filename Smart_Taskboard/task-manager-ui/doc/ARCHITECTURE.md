# Architecture — React Frontend

---

## High-Level Data Flow

```
┌───────────────────────────────────────────────────────────────┐
│                        Browser                                │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              React Router (BrowserRouter)             │    │
│  │  /login  /register  /  /projects/:id  /invitations/  │    │
│  └──────────────────┬───────────────────────────────────┘    │
│                     │                                         │
│         ┌───────────┴───────────┐                            │
│         ▼                       ▼                            │
│  ┌─────────────┐    ┌─────────────────────────────────┐     │
│  │ Public Pages│    │    Protected Pages              │     │
│  │ LoginPage   │    │  DashboardPage (/)              │     │
│  │ RegisterPage│    │  ProjectPage (/projects/:id)    │     │
│  │ AcceptInvite│    └───────────────┬─────────────────┘     │
│  └─────────────┘                   │                         │
│                                    ▼                         │
│                    ┌───────────────────────────────────┐     │
│                    │  TanStack React Query              │     │
│                    │  (server state cache & sync)      │     │
│                    │  queryKey: ['projects']           │     │
│                    │  queryKey: ['tasks', projectId]   │     │
│                    │  queryKey: ['members', projectId] │     │
│                    └───────────────┬───────────────────┘     │
│                                    │                         │
│                    ┌───────────────▼───────────────────┐     │
│                    │  Axios API Client (src/api/)       │     │
│                    │  Interceptors: attach JWT, handle  │     │
│                    │  401 → redirect to /login          │     │
│                    └───────────────┬───────────────────┘     │
│                                    │                         │
└────────────────────────────────────┼─────────────────────────┘
                                     │ HTTP REST
                        ┌────────────▼─────────────┐
                        │   Backend API (:8080)     │
                        │   Spring or MERN          │
                        └──────────────────────────┘
```

---

## State Management

SmartTask uses **two state layers** with a clear separation of concerns:

### 1. Server State — TanStack React Query
Everything that comes from the API:
```
projects        → queryKey: ['projects']
tasks           → queryKey: ['tasks', projectId]
members         → queryKey: ['members', projectId]
invitations     → queryKey: ['invitations', projectId]
activity        → queryKey: ['activity', projectId]
```

React Query handles:
- Caching (30s stale time)
- Background refetches
- Loading / error states
- Cache invalidation after mutations (`qc.invalidateQueries(...)`)

**Pattern for mutations:**
```tsx
const mutation = useMutation({
  mutationFn: (data) => tasksApi.create(projectId, data),
  onSuccess: () => {
    toast.success('Task created')
    qc.invalidateQueries({ queryKey: ['tasks', projectId] })
  },
})
```

### 2. Client State — Zustand (`src/store/authStore.ts`)
Only authentication state — persisted to `localStorage`:
```ts
{ user, token, isAuthenticated, setAuth, clearAuth }
```

Zustand's `persist` middleware rehydrates from localStorage on page reload.
The JWT is also stored in `localStorage.token` for the Axios interceptor.

---

## Routing Structure

```
App.tsx
├── PublicRoute (bounces authenticated users to /)
│   ├── /login          → LoginPage
│   └── /register       → RegisterPage
│
├── (always public)
│   └── /invitations/accept  → AcceptInvitationPage
│
└── ProtectedRoute (redirects unauthenticated to /login)
    ├── /               → DashboardPage
    └── /projects/:id   → ProjectPage
```

**`ProtectedRoute`** reads `isAuthenticated` from Zustand. If false → redirect.
**`PublicRoute`** reads `isAuthenticated` from Zustand. If true → redirect to `/`.

---

## API Layer Structure (`src/api/`)

```
client.ts          ← Axios instance with interceptors
auth.ts            ← register(), login()
projects.ts        ← list(), create(), getById(), delete()
tasks.ts           ← list(), create(), update(), changeStatus(), assign(), delete()
members.ts         ← list(), changeRole(), remove()
invitations.ts     ← list(), send(), revoke(), accept()
activity.ts        ← list()
```

All API functions return the `data` field from the response envelope `{ success, data }`.

The Axios interceptor:
1. Attaches `Authorization: Bearer <token>` from localStorage on every request
2. On 401 → clears localStorage + redirects to `/login`
3. Suppresses toast for 404s and invitation-accept errors (handled locally)

---

## Component Tree for ProjectPage

```
ProjectPage
├── Layout
│   ├── Sidebar (collapsible, navigation)
│   └── main content slot
│
├── Header (gradient background, project name, stats)
│
├── MemberList
│   ├── Avatar per member
│   └── InvitationPanel
│       └── sends invitation by email
│
├── TaskBoard (kanban)
│   ├── DndContext (drag-and-drop root)
│   │
│   ├── DroppableColumn × 3 (TODO / IN_PROGRESS / DONE)
│   │   └── DraggableCard × N
│   │       └── TaskCard
│   │           ├── Priority badge
│   │           ├── Assignee avatars
│   │           ├── Due date (red if overdue)
│   │           └── Dropdown: Edit / Delete
│   │
│   ├── DragOverlay (floating card while dragging)
│   │
│   ├── TaskModal (create/edit)
│   └── TaskModal (view/read-only for REPORTEE)
│
└── ActivityFeed
    └── ActivityEvent × N (grouped by date)
```

---

## Role-Aware UI Logic

The UI adapts based on `myRole` returned by the project API:

| Feature | ADMIN | REPORTER | REPORTEE |
|---|---|---|---|
| Create task | ✅ | ✅ | ❌ |
| Edit task | ✅ | ✅ | ❌ (read-only modal) |
| Delete task | ✅ | ✅ | ❌ |
| Change task status | ✅ | ✅ | ✅ (own tasks only) |
| Drag task | ✅ | ✅ | ✅ (own tasks only) |
| Assign users | ✅ | ✅ | ❌ |
| Invite members | ✅ | ❌ | ❌ |
| Change member role | ✅ | ❌ | ❌ |
| Remove member | ✅ | ❌ | ❌ |

`myRole` is read from `useQuery(['project', id])` result and passed down as props or read from `useAuthStore`.

---

## Drag-and-Drop (@dnd-kit)

```
DndContext
  onDragStart → set activeDragId + hoveredColumnId
  onDragOver  → highlight target column
  onDragEnd   → call changeStatus mutation if column changed

DroppableColumn (useDroppable)
  id = column status string ("TODO" / "IN_PROGRESS" / "DONE")

DraggableCard (useDraggable)
  id = task.id
  disabled = REPORTEE && task not assigned to them

DragOverlay
  renders a TaskCard clone while dragging (avoids layout shift)
```

`PointerSensor` with `activationConstraint: { distance: 8 }` prevents accidental drags on click.

---

## Form Handling

React Hook Form + Zod for type-safe validation:
```tsx
const schema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
})
const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
})
```

---

## Real-Time Updates (WebSocket)

The backend pushes task events over WebSocket. The frontend:
1. Connects to `ws://localhost:8080/ws` (STOMP over SockJS for Spring / Socket.IO for MERN)
2. Subscribes to `/topic/projects/{projectId}`
3. On event → calls `qc.invalidateQueries({ queryKey: ['tasks', projectId] })` to refetch

This means task changes from other users appear without page refresh.
