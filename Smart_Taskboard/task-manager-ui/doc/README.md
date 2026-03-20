# SmartTask UI — React Frontend

> React 18 + TypeScript + Vite + TailwindCSS single-page application.
> Works against **either** the Spring Boot or MERN backend — same REST contract.

---

## What is this?

The frontend for SmartTask Manager. Features:
- JWT-based authentication (login / register)
- Dashboard showing all your projects
- Per-project kanban board (To Do / In Progress / Done)
- Drag-and-drop task status changes
- Role-aware UI (ADMIN / REPORTER / REPORTEE have different capabilities)
- Invitation acceptance flow
- Real-time task updates via WebSocket
- Activity feed per project
- Member management

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5 |
| Build tool | Vite 5 |
| Styling | TailwindCSS 3 |
| Server state | TanStack React Query 5 |
| Client state | Zustand 5 |
| HTTP client | Axios |
| Forms | React Hook Form + Zod |
| Drag-and-drop | @dnd-kit/core + @dnd-kit/sortable |
| Routing | React Router 6 |
| Notifications | react-hot-toast |
| Icons | lucide-react |
| Date utilities | date-fns |

---

## Quick Start

### Prerequisites
- Node.js ≥ 20
- Backend API running on port 8080 (Spring or MERN)

### 1. Install dependencies
```bash
cd task-manager-ui
npm install
```

### 2. Environment (optional)
Create `.env.local` to override the API base URL:
```env
VITE_API_BASE_URL=http://localhost:8080
```
Default is `http://localhost:8080` — no `.env` file needed for local dev.

### 3. Start dev server
```bash
npm run dev
```
Opens at **http://localhost:5173**

The Vite dev server proxies `/api/*` → `http://localhost:8080` automatically (see `vite.config.ts`).

### 4. Build for production
```bash
npm run build
# Output: dist/
```

---

## Port Reference

| Service | Port | Notes |
|---|---|---|
| React Dev Server | **5173** | Vite HMR |
| Preview (built) | **4173** | `npm run preview` |
| API proxy target | 8080 | Vite proxies `/api` here |

---

## Docs in This Folder

| File | Contents |
|---|---|
| `ARCHITECTURE.md` | Data flow, state management, routing tree |
| `CODEBASE_GUIDE.md` | File-by-file walkthrough, where to add code |
| `COMPONENT_GUIDE.md` | Every component explained with props and usage |
| `LOCAL_SETUP.md` | Setup, environment variables, build, troubleshooting |
