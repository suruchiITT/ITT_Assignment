# Local Setup Guide — React Frontend

---

## Prerequisites

| Tool | Minimum | Install |
|---|---|---|
| Node.js | 20+ | `brew install node` or [nodejs.org](https://nodejs.org) |
| npm | 9+ | Bundled with Node |
| Backend API | running | Spring (:8080) or MERN (:8080) |

---

## Step-by-Step Setup

### 1. Install dependencies

```bash
cd task-manager-ui
npm install
```

### 2. Environment configuration (optional)

The app defaults to `http://localhost:8080` for the API. If your backend runs on a different port or host, create `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

For local development you typically **do not need this file** — the default works.

> **Note:** The Vite dev server also proxies `/api/*` to `http://localhost:8080` (see `vite.config.ts`). This means requests to `/api/...` work whether you use `VITE_API_BASE_URL` or not.

### 3. Start the dev server

```bash
npm run dev
```

Output:
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open **http://localhost:5173** in your browser.

---

## Port Reference

| Service | Port | Notes |
|---|---|---|
| Vite Dev Server | **5173** | Auto-reloads on file save |
| Preview (built) | **4173** | `npm run preview` |
| API Proxy target | 8080 | `/api` requests forwarded here |

---

## Full Local Stack (UI + Backend + DB)

### Using Spring Boot backend

```bash
# Terminal 1: Start MongoDB + MailDev
cd task-manager
docker compose up mongo maildev -d

# Terminal 2: Start Spring Boot
cd task-manager
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# Terminal 3: Start React UI
cd task-manager-ui
npm run dev
```

### Using MERN backend

```bash
# Terminal 1: Start MongoDB (+ MailDev optional)
docker start smarttask-mongo smarttask-maildev

# Terminal 2: Start MERN API
cd smart-task-manager
npm run dev

# Terminal 3: Start React UI
cd task-manager-ui
npm run dev
```

Both backends serve on port 8080 — you cannot run both at the same time.

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Serve it with any static file server:

```bash
# Using Vite preview
npm run preview
# Opens at http://localhost:4173

# Using serve (npm i -g serve)
serve dist -p 3000

# Using nginx (Docker)
docker run -d -p 80:80 \
  -v $(pwd)/dist:/usr/share/nginx/html \
  nginx:alpine
```

---

## TypeScript Compilation Check

```bash
npx tsc --noEmit
```

Run this before committing to catch type errors without building.

---

## ESLint

```bash
npm run lint
```

Configured in `eslint.config.js`. Strict rules — `--max-warnings 0` means any warning is treated as an error.

---

## Environment Variables Reference

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8080` | Backend API base URL |

> All Vite env vars must start with `VITE_` to be accessible in the browser.

Access in code:
```ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
```

---

## Vite Proxy Configuration

`vite.config.ts` proxies `/api` requests in dev:
```ts
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
},
```

This means in dev you can call `/api/auth/login` directly without specifying the full backend URL.
In production builds, configure your web server (nginx, etc.) to proxy `/api` to the backend.

---

## Common Issues

| Problem | Solution |
|---|---|
| Blank page / white screen | Check browser console (F12) for errors |
| "Failed to fetch" / API errors | Ensure backend is running on port 8080 |
| Login redirects back to login | Backend returning 401; check JWT_SECRET on backend |
| `CORS error` in console | Backend CORS must allow `http://localhost:5173` |
| Hot Module Replacement not working | Restart `npm run dev` |
| TypeScript errors after pulling | Delete `node_modules`, run `npm install` again |
| `Cannot find module '@/...'` | `@` alias is configured in `vite.config.ts` and `tsconfig.json` — make sure both match |
| Build fails | Run `npx tsc --noEmit` to see specific type errors |

---

## IDE Setup

### VS Code (recommended)
Install extensions:
- **ESLint** — inline lint errors
- **Prettier** (optional) — code formatting
- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
- **TypeScript Vue Plugin** (not needed — pure React)

`.vscode/settings.json` (create this):
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

### Path Aliases
The `@` alias maps to `src/`. Always use it for imports:
```ts
// ✅ Good
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'

// ❌ Avoid
import { Button } from '../../../components/ui/Button'
```

---

## Useful npm Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Start dev server with HMR |
| `build` | `tsc && vite build` | TypeScript check + production build |
| `preview` | `vite preview` | Serve the production build locally |
| `lint` | `eslint .` | Check code for errors |
