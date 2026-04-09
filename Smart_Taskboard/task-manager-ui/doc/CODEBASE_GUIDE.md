# Codebase Guide — React Frontend

File-by-file walkthrough for a developer new to this project.
Read in order — takes about 30 minutes.

---

## Directory Tree

```
task-manager-ui/
├── src/
│   ├── main.tsx                   ← React root mount
│   ├── App.tsx                    ← Router + QueryClient setup
│   ├── index.css                  ← Tailwind base + custom animations
│   ├── vite-env.d.ts              ← Vite env type declarations
│   │
│   ├── types/
│   │   └── index.ts               ← ALL shared TypeScript types/interfaces
│   │
│   ├── api/                       ← Axios API functions
│   │   ├── client.ts              ← Axios instance + interceptors
│   │   ├── auth.ts
│   │   ├── projects.ts
│   │   ├── tasks.ts
│   │   ├── members.ts
│   │   ├── invitations.ts
│   │   └── activity.ts
│   │
│   ├── store/
│   │   └── authStore.ts           ← Zustand auth state (persisted)
│   │
│   ├── lib/
│   │   └── utils.ts               ← cn() Tailwind class merger utility
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── ProjectPage.tsx
│   │   └── AcceptInvitationPage.tsx
│   │
│   └── components/
│       ├── auth/
│       │   └── ProtectedRoute.tsx  ← Route guards
│       │
│       ├── layout/
│       │   ├── Layout.tsx          ← Page shell with sidebar
│       │   └── Sidebar.tsx         ← Collapsible nav sidebar
│       │
│       ├── tasks/
│       │   ├── TaskBoard.tsx       ← Kanban board with DnD
│       │   ├── TaskCard.tsx        ← Individual task card
│       │   └── TaskModal.tsx       ← Create/edit/view modal
│       │
│       ├── members/
│       │   └── MemberList.tsx      ← Member list + role management
│       │
│       ├── invitations/
│       │   └── InvitationPanel.tsx ← Send invitations + list
│       │
│       ├── activity/
│       │   └── ActivityFeed.tsx    ← Project activity log
│       │
│       └── ui/                    ← Primitive UI components
│           ├── Avatar.tsx
│           ├── Badge.tsx
│           ├── Button.tsx
│           ├── Input.tsx
│           ├── Modal.tsx
│           └── Spinner.tsx
│
├── index.html                     ← Vite HTML shell
├── vite.config.ts                 ← Vite config + /api proxy
├── tailwind.config.js             ← Tailwind theme
├── tsconfig.json                  ← TypeScript config
└── package.json
```

---

## Phase 1: Foundation Files

### `src/types/index.ts`
**Read this first.** Defines every TypeScript interface used across the app:
- `User`, `AuthResponse` — auth shapes
- `Project`, `ProjectMember` — project/membership shapes
- `Task`, `TaskStatus`, `TaskPriority` — task shapes
- `Invitation`, `InvitationStatus` — invitation shapes
- `ActivityEvent` — activity log shape
- `ApiResponse<T>` — backend response envelope

When you add a new feature, start by adding its types here.

### `src/api/client.ts`
The single Axios instance. Two interceptors:

**Request:** attaches `Authorization: Bearer <token>` from `localStorage.getItem('token')`.

**Response (error path):**
- `401` → clears localStorage, redirects to `/login`
- Other errors → shows toast (except 404 and invitation-accept errors)

All API modules use this `apiClient` instance.

### `src/store/authStore.ts`
Zustand store, persisted to localStorage via `persist` middleware.
```ts
const { user, token, isAuthenticated, setAuth, clearAuth } = useAuthStore()
```
`setAuth(user, token)` — called after successful login/register.
`clearAuth()` — called on logout, clears localStorage.

The `onRehydrateStorage` callback sets `isAuthenticated = true` when rehydrating a valid token from localStorage.

### `src/lib/utils.ts`
```ts
import { cn } from '@/lib/utils'
// Merges Tailwind classes, resolves conflicts (e.g. 'p-4 p-2' → 'p-2')
```
Uses `clsx` + `tailwind-merge` under the hood.

---

## Phase 2: App Entry

### `src/main.tsx`
Mounts `<App />` into `#root`. Nothing interesting here.

### `src/App.tsx`
Sets up:
1. `QueryClientProvider` with `defaultOptions` (1 retry, 30s stale time, no refetch on focus)
2. `BrowserRouter` with all routes
3. `<Toaster />` for notifications

Route structure:
```
/login, /register     → inside PublicRoute (redirect to / if authenticated)
/invitations/accept   → always public
/, /projects/:id      → inside ProtectedRoute (redirect to /login if not authenticated)
*                     → redirect to /
```

### `src/index.css`
TailwindCSS `@tailwind` directives + custom animation utilities:
```css
.animate-fade-in   → fadeIn 0.2s ease-out
.animate-slide-up  → slideUp 0.25s ease-out (from Y+10 to Y+0)
.animate-scale-in  → scaleIn 0.15s ease-out (from scale 0.96)
```
Apply these to elements for entrance animations.

---

## Phase 3: Pages

### `LoginPage.tsx` / `RegisterPage.tsx`
- React Hook Form + Zod validation
- On success: `setAuth(user, token)` → Zustand
- React Query mutation to call `authApi.login()` / `authApi.register()`
- Redirect to `/` on success

### `DashboardPage.tsx`
- `useQuery(['projects'])` → `projectsApi.list()`
- Renders project cards with gradient accent bars, stats, stagger animations
- "Create Project" button opens a modal with React Hook Form
- `useMutation` → `projectsApi.create()` → invalidate `['projects']`

### `ProjectPage.tsx`
- `useParams()` to get `projectId`
- Multiple parallel queries: project, tasks, members, invitations, activity
- Computes `myRole` from member list (`member.userId === user.id`)
- Renders: gradient header → TaskBoard + ActivityFeed + MemberList side panel

### `AcceptInvitationPage.tsx`
- Reads `?token=` from URL
- `useQuery` calls `invitationsApi.accept(token)` on mount
- Shows loading / success / error states
- "Go to Dashboard" button after success

---

## Phase 4: Core Components

### `TaskBoard.tsx` — most complex component

Key state:
```ts
const [activeDragId, setActiveDragId] = useState<string | null>(null)
const [editTask, setEditTask] = useState<Task | null>(null)
const [viewTask, setViewTask] = useState<Task | null>(null)
```

`useEffect` syncs `editTask`/`viewTask` with fresh `tasks` prop:
```ts
useEffect(() => {
  if (editTask) setEditTask(tasks.find(t => t.id === editTask.id) ?? null)
  if (viewTask) setViewTask(tasks.find(t => t.id === viewTask.id) ?? null)
}, [tasks])
```
This prevents stale modal data after an assign/update.

DnD flow:
1. `onDragStart` → set `activeDragId`
2. `onDragEnd` → if target column ≠ task.status → call `changeStatus` mutation
3. Role check: REPORTEE can only drag tasks where `task.assignees.some(a => a.id === user.id)`

Columns are `flex flex-1 min-w-0` — equal width, fill available space.

### `TaskCard.tsx`
Displays a task with:
- `border-l-4` color by status: `border-l-slate-300` / `border-l-blue-400` / `border-l-emerald-400`
- Priority `Badge`
- Assignee `Avatar` stack
- Due date — red background if `dueDate < now && status !== 'DONE'`
- Kebab menu (Edit / Delete) — only visible for ADMIN/REPORTER

### `TaskModal.tsx`
Two modes controlled by `readOnly` prop:
- `readOnly=false` (ADMIN/REPORTER): full edit form with title, description, priority, due date, assignees
- `readOnly=true` (REPORTEE): displays task info + a `Select` for status change only

Assignee selection: fetches `members` list, renders checkboxes. On "Save Assignees" calls `tasksApi.assign()`.

### `MemberList.tsx` + `InvitationPanel.tsx`
- `MemberList` shows ACTIVE members with their role badge; ADMIN can change role or remove
- `InvitationPanel` (inside MemberList) shows pending invitations; ADMIN can send new ones or revoke

### `ActivityFeed.tsx`
- Fetches paginated activity from `activityApi.list(projectId)`
- Groups events by date (Today / Yesterday / formatted date)
- Shows actor avatar, action text, entity name, timestamp

### `Sidebar.tsx`
Accepts `collapsed: boolean` and `onToggle: () => void` from Layout.
- `w-64` expanded ↔ `w-16` collapsed, `transition-all duration-300`
- SmartTask logo button triggers toggle
- Shows only icons when collapsed; full labels + icons when expanded

### `Layout.tsx`
Manages `collapsed` state. Passes it to Sidebar.
Main content left margin transitions: `ml-64` ↔ `ml-16`.

---

## Phase 5: UI Primitives (`src/components/ui/`)

| Component | Props | Usage |
|---|---|---|
| `Button` | `variant`, `size`, `isLoading`, `disabled` | All buttons in the app |
| `Input` | Standard HTML input props | Form fields |
| `Modal` | `isOpen`, `onClose`, `title`, `children` | All modals (TaskModal, confirm dialogs) |
| `Avatar` | `name`, `avatarUrl`, `size` | User avatars everywhere |
| `Badge` | `variant` (`success`/`warning`/`error`/`default`) | Status and priority labels |
| `Spinner` | `size` | Loading states |

These are intentionally simple — no third-party component library. Styled with Tailwind.

---

## Phase 6: API Modules

All follow the same pattern:
```ts
// tasks.ts
export const tasksApi = {
  list:         (projectId) => apiClient.get(`/api/projects/${projectId}/tasks`).then(r => r.data.data),
  create:       (projectId, data) => apiClient.post(...).then(r => r.data.data),
  changeStatus: (projectId, taskId, data) => apiClient.patch(...).then(r => r.data.data),
  assign:       (projectId, taskId, data) => apiClient.put(...).then(r => r.data.data),
  delete:       (projectId, taskId) => apiClient.delete(...).then(r => r.data),
}
```

Note: `.then(r => r.data.data)` unwraps the `{ success, data }` envelope automatically.

---

## Where to Add New Code

| Task | What to do |
|---|---|
| New API call | Add function to relevant `src/api/*.ts` file |
| New type/interface | Add to `src/types/index.ts` |
| New page | Create in `src/pages/`, add route to `App.tsx` |
| New reusable UI component | Add to `src/components/ui/` |
| New feature component | Add to appropriate `src/components/<feature>/` folder |
| New animation | Add keyframes + utility class to `src/index.css` |
| New Tailwind color/style | Add to `tailwind.config.js` under `theme.extend` |

---

## Common Patterns

### React Query + mutation invalidation
```tsx
const qc = useQueryClient()
const mutation = useMutation({
  mutationFn: (data) => tasksApi.create(projectId, data),
  onSuccess: () => {
    toast.success('Task created!')
    qc.invalidateQueries({ queryKey: ['tasks', projectId] })
  },
  onError: () => toast.error('Failed to create task'),
})
```

### Conditional rendering by role
```tsx
{(myRole === 'ADMIN' || myRole === 'REPORTER') && (
  <Button onClick={() => setShowCreateModal(true)}>New Task</Button>
)}
```

### Tailwind class merging
```tsx
<div className={cn('base-classes', isActive && 'active-classes', className)}>
```
