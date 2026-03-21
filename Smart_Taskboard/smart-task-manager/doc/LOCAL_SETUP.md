# Local Setup Guide — MERN Backend

Everything you need to run SmartTask MERN locally from scratch.

---

## Prerequisites

| Tool | Minimum | Install |
|---|---|---|
| Node.js | 20+ | `brew install node` or [nodejs.org](https://nodejs.org) |
| npm | 9+ | Bundled with Node |
| Docker Desktop | Any | [docker.com](https://docker.com) (for MongoDB + MailDev) |
| Git | Any | System package manager |

---

## Option A: Docker for Infrastructure + Node locally (recommended for development)

This is the fastest way. MongoDB and MailDev run in Docker; the Node API runs locally with hot-reload.

### Step 1: Start infrastructure containers

```bash
# MongoDB (port 27017)
docker run -d \
  --name smarttask-mongo \
  -p 27017:27017 \
  --restart unless-stopped \
  mongo:6

# MailDev — fake SMTP trap (port 1025 SMTP, 1080 Web UI)
docker run -d \
  --name smarttask-maildev \
  -p 1025:1025 \
  -p 1080:1080 \
  --restart unless-stopped \
  maildev/maildev
```

Verify containers are running:
```bash
docker ps
```

### Step 2: Install Node dependencies

```bash
cd smart-task-manager
npm install
```

### Step 3: Create `.env` file

```bash
# Create .env in the smart-task-manager/ root
cat > .env << 'EOF'
NODE_ENV=development
PORT=8080
MONGODB_URI=mongodb://localhost:27017/smarttask_dev
JWT_SECRET=local-dev-secret-must-be-at-least-32-chars-long!!
JWT_EXPIRATION_MS=86400000
INVITATION_EXPIRY_DAYS=7
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@smarttask.local
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
EOF
```

> **Important:** `JWT_SECRET` must be ≥ 32 characters. The app will refuse to start otherwise.

### Step 4: Start the API server

```bash
npm run dev       # nodemon — auto-restarts on file changes
```

You should see:
```
[DB] MongoDB connected: localhost/smarttask_dev
[Server] SmartTask API running on port 8080 (development)
```

### Step 5: Verify

```bash
# Health check
curl http://localhost:8080/actuator/health
# Expected: {"status":"UP"}
```

---

## Option B: Using the Spring docker-compose.yml

The Spring backend (`task-manager/`) has a `docker-compose.yml` that starts MongoDB and MailDev.
You can reuse it even if you're running the MERN backend:

```bash
# From the task-manager/ directory
docker compose up mongo maildev -d
```

Then run the Node API as in Option A step 4.

---

## Option C: Fully Dockerised (MERN)

> Useful for testing a production-like setup.

You need to create a `docker-compose.yml` in `smart-task-manager/`:

```yaml
services:
  mongo:
    image: mongo:6
    container_name: mern-mongo
    ports: ["27017:27017"]
    volumes: [mongo_data:/data/db]

  maildev:
    image: maildev/maildev
    container_name: mern-maildev
    ports: ["1025:1025", "1080:1080"]

  api:
    build: .
    container_name: mern-api
    ports: ["8080:8080"]
    depends_on: [mongo, maildev]
    environment:
      NODE_ENV: production
      PORT: 8080
      MONGODB_URI: mongodb://mongo:27017/smarttask_prod
      JWT_SECRET: your-super-secret-32-char-minimum!!
      JWT_EXPIRATION_MS: 86400000
      SMTP_HOST: maildev
      SMTP_PORT: 1025
      FRONTEND_URL: http://localhost:5173
      CORS_ORIGIN: http://localhost:5173

volumes:
  mongo_data:
```

```bash
docker compose up -d
```

> Note: requires a `Dockerfile` in `smart-task-manager/`. The simplest version:
> ```dockerfile
> FROM node:20-alpine
> WORKDIR /app
> COPY package*.json .
> RUN npm ci --omit=dev
> COPY src ./src
> CMD ["node", "src/server.js"]
> ```

---

## Port Reference

| Service | Port | URL |
|---|---|---|
| MERN API | **8080** | http://localhost:8080 |
| MongoDB | **27017** | `mongodb://localhost:27017` |
| MailDev SMTP | **1025** | (SMTP trap, not browseable) |
| MailDev Web UI | **1080** | http://localhost:1080 |
| React Frontend | **5173** | http://localhost:5173 |

---

## Managing Containers Day-to-Day

```bash
# Stop containers (keeps data)
docker stop smarttask-mongo smarttask-maildev

# Start again
docker start smarttask-mongo smarttask-maildev

# Check logs
docker logs smarttask-mongo
docker logs smarttask-maildev

# Wipe MongoDB data (reset everything)
docker rm -f smarttask-mongo
docker volume rm $(docker volume ls -q | grep mongo)
# Then re-run the docker run command from Step 1
```

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|---|---|---|---|
| `NODE_ENV` | No | `development` | `development` or `production` |
| `PORT` | No | `8080` | HTTP port |
| `MONGODB_URI` | **Yes** | — | Full MongoDB connection string |
| `JWT_SECRET` | **Yes** | — | HMAC secret, ≥ 32 chars |
| `JWT_EXPIRATION_MS` | **Yes** | — | Token lifetime in ms (e.g. `86400000` = 24h) |
| `INVITATION_EXPIRY_DAYS` | No | `7` | How long invitation links stay valid |
| `SMTP_HOST` | No | `localhost` | SMTP server hostname |
| `SMTP_PORT` | No | `1025` | SMTP server port |
| `SMTP_USER` | No | `""` | SMTP username (empty for MailDev) |
| `SMTP_PASS` | No | `""` | SMTP password (empty for MailDev) |
| `SMTP_FROM` | No | `noreply@smarttask.local` | From address in emails |
| `FRONTEND_URL` | No | `http://localhost:5173` | Used in invitation links |
| `CORS_ORIGIN` | No | `http://localhost:5173` | Allowed CORS origin |

---

## Common Issues

| Problem | Solution |
|---|---|
| `Missing required env var: MONGODB_URI` | Ensure `.env` file exists and is in `smart-task-manager/` root |
| `JWT_SECRET must be at least 32 characters` | Make your secret longer |
| `MongoNetworkError: connect ECONNREFUSED` | MongoDB container is not running. Run `docker start smarttask-mongo` |
| Port 8080 already in use | `lsof -ti:8080 \| xargs kill` or change `PORT` in `.env` |
| Invitation emails not showing | Open http://localhost:1080 — MailDev Web UI shows all captured emails |
| MailDev container not running | `docker start smarttask-maildev` |
| `nodemon` not found | Run `npm install` in the project directory |
| Changes not reflecting | nodemon should auto-reload. If not, `Ctrl+C` and `npm run dev` again |

---

## Quick Sanity Test (after startup)

```bash
# 1. Register a user
curl -s -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@test.com","password":"password123"}' | jq .

# 2. Login
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@test.com","password":"password123"}' | jq -r '.data.accessToken')

# 3. Create a project
curl -s -X POST http://localhost:8080/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Test Project"}' | jq .
```

If all three return `"success": true`, your setup is working correctly.
