# Component Guide — React Frontend

Reference for every component: what it does, its props, and usage notes.

---

## UI Primitives (`src/components/ui/`)

These are the building blocks used everywhere in the app. Always prefer these over raw HTML elements.

---

### `Button`

```tsx
import { Button } from '@/components/ui/Button'

<Button variant="primary" size="md" onClick={handleClick}>
  Save Changes
</Button>

<Button variant="danger" isLoading={mutation.isPending}>
  Delete Task
</Button>
```

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding + font size |
| `isLoading` | `boolean` | `false` | Shows spinner, disables click |
| `disabled` | `boolean` | `false` | Greyed out, no click |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `className` | `string` | — | Extra Tailwind classes |
| `children` | `ReactNode` | — | Button label |

---

### `Input`

```tsx
import { Input } from '@/components/ui/Input'

<Input
  label="Task Title"
  placeholder="Enter task title"
  error={errors.title?.message}
  {...register('title')}
/>
```

**Props:**

| Prop | Type | Description |
|---|---|---|
| `label` | `string` | Label text rendered above the input |
| `error` | `string` | Red error message below the input |
| `className` | `string` | Extra classes on the input element |
| `...rest` | HTML input props | Spread to native `<input>` |

Designed to work directly with React Hook Form's `register()`.

---

### `Modal`

```tsx
import { Modal } from '@/components/ui/Modal'

<Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Task">
  <form onSubmit={handleSubmit(onSubmit)}>
    {/* form contents */}
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <Button type="submit">Save</Button>
    </div>
  </form>
</Modal>
```

**Props:**

| Prop | Type | Description |
|---|---|---|
| `isOpen` | `boolean` | Whether modal is visible |
| `onClose` | `() => void` | Called on backdrop click or ESC key |
| `title` | `string` | Modal header title |
| `children` | `ReactNode` | Modal body content |

Uses a portal to render outside the component tree. Traps focus while open.

---

### `Avatar`

```tsx
import { Avatar } from '@/components/ui/Avatar'

<Avatar name="Alice Smith" avatarUrl={user.avatarUrl} size="md" />
```

Shows `avatarUrl` if provided, otherwise falls back to initials extracted from `name`.

**Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | Used for initials fallback and `alt` text |
| `avatarUrl` | `string \| null` | `null` | Image URL |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | `24px / 32px / 40px` |
| `className` | `string` | — | Extra classes |

---

### `Badge`

```tsx
import { Badge } from '@/components/ui/Badge'

<Badge variant="success">DONE</Badge>
<Badge variant="warning">IN_PROGRESS</Badge>
<Badge variant="error">URGENT</Badge>
<Badge variant="default">TODO</Badge>
```

**Props:**

| Prop | Type | Description |
|---|---|---|
| `variant` | `'success' \| 'warning' \| 'error' \| 'default'` | Color scheme |
| `children` | `ReactNode` | Badge text |
| `className` | `string` | Extra classes |

Used for task status, priority labels, member role indicators.

---

### `Spinner`

```tsx
import { Spinner } from '@/components/ui/Spinner'

<Spinner size="sm" />
<Spinner size="lg" />
```

**Props:** `size: 'sm' | 'md' | 'lg'`

Used inside `Button` when `isLoading=true` and as full-page loading states.

---

## Layout Components (`src/components/layout/`)

---

### `Layout`

Wraps all authenticated pages. Manages sidebar collapse state.

```tsx
// Used in App.tsx as a route wrapper — you don't instantiate it directly
<Route element={<ProtectedRoute />}>
  <Route path="/" element={<Layout><DashboardPage /></Layout>} />
</Route>
```

Actually, `Layout` renders `<Outlet />` inside. It manages:
- `collapsed` state (boolean)
- Passes `collapsed` + `onToggle` to `Sidebar`
- Transitions main content margin: `ml-64` ↔ `ml-16`

---

### `Sidebar`

```tsx
<Sidebar
  collapsed={collapsed}
  onToggle={() => setCollapsed(c => !c)}
/>
```

**Props:**

| Prop | Type | Description |
|---|---|---|
| `collapsed` | `boolean` | Collapsed state |
| `onToggle` | `() => void` | Callback when logo is clicked |

Shows:
- SmartTask logo button (triggers toggle)
- Navigation links: Dashboard, Projects
- Logout button at bottom

When `collapsed=true`: only icons, no text. Transitions take 300ms.

---

## Auth Components (`src/components/auth/`)

---

### `ProtectedRoute` / `PublicRoute`

Invisible wrappers — render `<Outlet />` or redirect.

```tsx
// Protected: redirect to /login if not authenticated
<Route element={<ProtectedRoute />}>
  <Route path="/" element={<DashboardPage />} />
</Route>

// Public: redirect to / if already authenticated
<Route element={<PublicRoute />}>
  <Route path="/login" element={<LoginPage />} />
</Route>
```

Both read `isAuthenticated` from `useAuthStore`.

---

## Task Components (`src/components/tasks/`)

---

### `TaskBoard`

The kanban board. Manages all task interactions.

```tsx
<TaskBoard
  projectId={projectId}
  tasks={tasks}
  members={members}
  myRole={myRole}
  currentUserId={user.id}
/>
```

**Props:**

| Prop | Type | Description |
|---|---|---|
| `projectId` | `string` | Used for API calls |
| `tasks` | `Task[]` | Full task list |
| `members` | `ProjectMember[]` | Used for assignee selects |
| `myRole` | `Role` | Controls which actions are visible |
| `currentUserId` | `string` | Used to check REPORTEE assignment |

Internally manages:
- `editTask` — task being edited in modal (null = modal closed)
- `viewTask` — task being viewed read-only (null = closed)
- `activeDragId` — task being dragged
- `showCreateModal` — create task modal visibility

---

### `TaskCard`

Individual task card rendered inside a kanban column.

```tsx
<TaskCard
  task={task}
  myRole={myRole}
  currentUserId={user.id}
  onEdit={() => setEditTask(task)}
  onDelete={() => deleteTask(task.id)}
/>
```

**Props:**

| Prop | Type | Description |
|---|---|---|
| `task` | `Task` | Task data |
| `myRole` | `Role` | Hides edit/delete for REPORTEE |
| `currentUserId` | `string` | For REPORTEE drag permission check |
| `onEdit` | `() => void` | Opens edit modal |
| `onDelete` | `() => void` | Triggers delete mutation |

Visual features:
- Left border color by status
- Due date highlights red when overdue + not done
- Assignee avatar stack (max 3 shown, +N indicator for more)

---

### `TaskModal`

Create / edit / view modal.

```tsx
// Create mode
<TaskModal
  isOpen={showCreate}
  onClose={() => setShowCreate(false)}
  projectId={projectId}
  members={members}
  myRole={myRole}
/>

// Edit mode
<TaskModal
  isOpen={!!editTask}
  onClose={() => setEditTask(null)}
  task={editTask}
  projectId={projectId}
  members={members}
  myRole={myRole}
/>

// Read-only (REPORTEE view)
<TaskModal
  isOpen={!!viewTask}
  onClose={() => setViewTask(null)}
  task={viewTask}
  projectId={projectId}
  members={members}
  myRole="REPORTEE"
  readOnly
/>
```

**Props:**

| Prop | Type | Description |
|---|---|---|
| `isOpen` | `boolean` | Modal visibility |
| `onClose` | `() => void` | Close callback |
| `task` | `Task \| null` | If null → create mode; if set → edit/view mode |
| `projectId` | `string` | For API calls |
| `members` | `ProjectMember[]` | For assignee selection list |
| `myRole` | `Role` | Determines capabilities |
| `readOnly` | `boolean` | If true → view-only with status-change select |

---

## Member Components (`src/components/members/`)

---

### `MemberList`

```tsx
<MemberList
  projectId={projectId}
  members={members}
  invitations={invitations}
  myRole={myRole}
  currentUserId={user.id}
/>
```

**Props:**

| Prop | Type | Description |
|---|---|---|
| `projectId` | `string` | For API calls |
| `members` | `ProjectMember[]` | Active members to display |
| `invitations` | `Invitation[]` | Pending invitations (shown in panel) |
| `myRole` | `Role` | ADMIN sees role change + remove buttons |
| `currentUserId` | `string` | Prevents removing yourself |

Renders each member with Avatar, name, role badge. ADMIN gets a dropdown with "Change Role" and "Remove" options. Renders `InvitationPanel` below.

---

### `InvitationPanel`

```tsx
// Rendered inside MemberList automatically
```

Shows pending invitations list + "Invite Member" form (email + role select).
Only visible to ADMIN (`myRole === 'ADMIN'`).

---

## Activity Component (`src/components/activity/`)

---

### `ActivityFeed`

```tsx
<ActivityFeed projectId={projectId} />
```

Fetches and displays the activity log for a project.

| Prop | Type | Description |
|---|---|---|
| `projectId` | `string` | Used to fetch activity events |

Shows events grouped by date (Today / Yesterday / full date).
Each event shows: actor avatar, action description, entity name, time.

---

## Quick Reference: Component → File

| Component | File |
|---|---|
| `Button`, `Input`, `Modal`, `Avatar`, `Badge`, `Spinner` | `src/components/ui/*.tsx` |
| `Layout`, `Sidebar` | `src/components/layout/*.tsx` |
| `ProtectedRoute`, `PublicRoute` | `src/components/auth/ProtectedRoute.tsx` |
| `TaskBoard`, `TaskCard`, `TaskModal` | `src/components/tasks/*.tsx` |
| `MemberList` | `src/components/members/MemberList.tsx` |
| `InvitationPanel` | `src/components/invitations/InvitationPanel.tsx` |
| `ActivityFeed` | `src/components/activity/ActivityFeed.tsx` |
