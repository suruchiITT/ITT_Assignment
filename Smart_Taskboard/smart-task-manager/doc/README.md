# SmartTask Manager — MERN Backend

> **Node.js / Express / MongoDB** rewrite of the original Spring Boot API.
> Functionally identical feature set, same REST contract, same WebSocket events.

---

## What is this?

SmartTask is a collaborative task management platform. This repo is the **backend API only**. It handles:

- User registration & JWT authentication
- Project creation and management
- Role-based membership (ADMIN / REPORTER / REPORTEE)
- Email invitations with signed tokens
- Task CRUD with assignee tracking
- Real-time WebSocket events (Socket.IO)
- Activity log per project

The frontend lives in `../task-manager-ui`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js ≥ 20 |
| Framework | Express 4 |
| Database | MongoDB 6 via Mongoose 8 |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Real-time | Socket.IO 4 |
| Email | Nodemailer → MailDev (local) |
| Validation | express-validator |
| Security | helmet, cors, express-rate-limit |

---

## Quick Start (local, no Docker)

### Prerequisites
- Node.js ≥ 20
- MongoDB running on `localhost:27017`
- (Optional) MailDev for email testing

### 1. Install dependencies
```bash
cd smart-task-manager
npm install
```

### 2. Create `.env`
```env
NODE_ENV=development
PORT=8080
MONGODB_URI=mongodb://localhost:27017/smarttask_dev
JWT_SECRET=local-dev-secret-must-be-32-chars-min!!
JWT_EXPIRATION_MS=86400000
INVITATION_EXPIRY_DAYS=7
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@smarttask.local
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

### 3. Start MongoDB (Docker, one-liner)
```bash
docker run -d --name smarttask-mongo -p 27017:27017 mongo:6
```

### 4. (Optional) Start MailDev for email testing
```bash
docker run -d --name smarttask-maildev \
  -p 1025:1025 -p 1080:1080 \
  maildev/maildev
# Web UI → http://localhost:1080
```

### 5. Run the server
```bash
npm run dev        # nodemon (auto-reload)
# OR
npm start          # plain node
```

Server starts on **http://localhost:8080**

---

## Quick Start (Docker Compose)

> Starts MongoDB + MailDev automatically. The MERN app itself still runs via `npm run dev` locally.

```bash
# From the task-manager/ (Spring) folder which contains docker-compose.yml
docker compose up mongo maildev -d
```

Then run the Node server as above with the `.env` pointing at `localhost:27017`.

---

## Port Reference

| Service | Port | Notes |
|---|---|---|
| MERN API | 8080 | Express HTTP |
| MongoDB | 27017 | default |
| MailDev SMTP | 1025 | fake SMTP trap |
| MailDev UI | 1080 | view captured emails |
| Frontend (Vite) | 5173 | `task-manager-ui` |

---

## Docs in This Folder

| File | Contents |
|---|---|
| `ARCHITECTURE.md` | Request flow, layers, cross-cutting concerns |
| `CODEBASE_GUIDE.md` | File-by-file walkthrough, where to add code |
| `API_REFERENCE.md` | All REST endpoints with method, path, auth, body |
| `DATA_MODELS.md` | MongoDB schemas, field types, indexes |
| `LOCAL_SETUP.md` | Full local + Docker setup with troubleshooting |
