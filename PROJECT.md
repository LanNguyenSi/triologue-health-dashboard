# Triologue Health Dashboard

Real-time monitoring dashboard for the Triologue AI collaboration platform.

## Overview

A web-based dashboard that provides live health status and metrics for all Triologue services:
- API server status
- Database (PostgreSQL) status
- Cache (Redis) status
- Agent Gateway status
- Active users/agents
- Room statistics
- System resources (CPU, memory)

## Tech Stack

### Frontend
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **State Management:** React Query (for real-time data)
- **Charts:** Recharts or Chart.js
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **API Design:** RESTful + optional WebSocket for real-time updates
- **Docker Integration:** Docker SDK for Node.js (container stats)
- **Health Checks:** Endpoints to probe Triologue services

### Deployment
- **Platform:** Docker on Ice's VPS
- **Port:** 8080
- **Reverse Proxy:** Nginx (optional)
- **Environment:** Production-ready with error handling

## Architecture

```
┌─────────────────┐
│  React Frontend │ :3000 (dev) / :80 (prod, nginx)
└────────┬────────┘
         │ HTTP/WebSocket
         ▼
┌─────────────────┐
│  Express API    │ :8080
└────────┬────────┘
         │
         ├─► Docker API (container stats)
         ├─► Triologue API (http://localhost:4001)
         ├─► PostgreSQL (docker exec / psql)
         └─► Redis (docker exec / redis-cli)
```

## Project Structure

```
triologue-health-dashboard/
├── frontend/              # React app
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── api/          # API client
│   │   ├── hooks/        # Custom React hooks
│   │   └── App.tsx       # Main app
│   ├── package.json
│   └── vite.config.ts
├── backend/              # Express API
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Business logic
│   │   └── index.ts      # Server entry
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml    # Deployment config
├── Dockerfile.frontend   # Frontend container
├── Dockerfile.backend    # Backend container
├── README.md            # User docs
└── PROJECT.md           # This file
```

## API Endpoints

### Backend API (`/api`)

#### Health Checks
- `GET /api/health` — Overall system health summary
- `GET /api/services/triologue` — Triologue API status
- `GET /api/services/postgres` — PostgreSQL status
- `GET /api/services/redis` — Redis status
- `GET /api/services/gateway` — Agent Gateway status

#### Metrics
- `GET /api/metrics/system` — CPU, memory, disk usage
- `GET /api/metrics/docker` — Container stats (running, stopped)
- `GET /api/metrics/triologue` — Active users, rooms, messages

#### Real-Time (WebSocket, optional)
- `WS /api/realtime` — Push updates every 5 seconds

## Features

### Dashboard Views

1. **Overview**
   - Traffic light status (🟢🟡🔴) for each service
   - Uptime counters
   - Quick stats (active users, rooms, messages)

2. **Services**
   - Detailed status for each container
   - Logs preview (last 20 lines)
   - Restart buttons (admin only)

3. **Metrics**
   - CPU/Memory graphs (last hour)
   - Database size
   - Redis memory usage
   - Active connections

4. **Users & Rooms**
   - List of online users/agents
   - Most active rooms
   - Recent messages count

### Security

- **Read-Only by Default:** Dashboard has no write access to Triologue
- **Optional Admin Mode:** Protected by basic auth (env var `ADMIN_PASSWORD`)
- **CORS:** Restricted to dashboard domain
- **Rate Limiting:** Prevent API abuse

## Development

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Access to Triologue VPS (for deployment)

### Setup

```bash
# Frontend
cd frontend
npm install
npm run dev     # Runs on http://localhost:3000

# Backend
cd backend
npm install
npm run dev     # Runs on http://localhost:8080
```

### Environment Variables

**Backend** (`.env`):
```
PORT=8080
TRIOLOGUE_API_URL=http://localhost:4001
DOCKER_SOCKET=/var/run/docker.sock
ADMIN_PASSWORD=<optional>
```

**Frontend** (`.env`):
```
VITE_API_URL=http://localhost:8080
```

## Deployment

### Docker Compose

```bash
# Build
docker compose build

# Run
docker compose up -d

# Access
http://<ice-vps-ip>:8080
```

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure admin password
- [ ] Set up Nginx reverse proxy (optional)
- [ ] Enable HTTPS (Let's Encrypt)
- [ ] Set up monitoring/alerts
- [ ] Backup config

## Implementation Plan

### Phase 1: Backend (Day 1)
1. Express server setup
2. Docker API integration (container stats)
3. Triologue API health checks
4. PostgreSQL/Redis health checks
5. System metrics (CPU, memory)

### Phase 2: Frontend (Day 1)
1. Vite + React setup
2. Tailwind config
3. Dashboard layout (header, sidebar, main)
4. Service status cards
5. Basic styling

### Phase 3: Integration (Day 2)
1. Connect frontend to backend API
2. Real-time data fetching (React Query)
3. Charts for metrics
4. Error handling & loading states

### Phase 4: Polish & Deploy (Day 2)
1. Responsive design
2. Dark mode (optional)
3. Docker build
4. Deploy to VPS
5. Testing & bug fixes

## Testing

- **Backend:** Manual API testing (Postman/curl)
- **Frontend:** Browser testing (Chrome DevTools)
- **Integration:** End-to-end smoke test on VPS

## Success Criteria

✅ Dashboard loads and shows all service statuses  
✅ Real-time metrics update every 5-10 seconds  
✅ Responsive design (mobile + desktop)  
✅ Deployable via Docker Compose  
✅ Accessible at `http://<ice-vps-ip>:8080`  
✅ No crashes under normal load  

## Future Enhancements (Post-MVP)

- WebSocket real-time updates (instead of polling)
- Alerts/notifications (email, Telegram)
- Historical metrics (time-series DB)
- Multi-server support (monitor multiple Triologue instances)
- User authentication (OAuth)
- Custom dashboards (drag-and-drop widgets)

---

**Created by:** Ice 🧊  
**For:** Triologue Demo Project  
**Date:** 2026-02-23  
**Repository:** https://github.com/LanNguyenSi/triologue-health-dashboard
