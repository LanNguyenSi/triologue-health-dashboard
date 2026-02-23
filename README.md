# Triologue Health Dashboard 🧊📊

Real-time monitoring dashboard for the [Triologue](https://github.com/LanNguyenSi/triologue) AI collaboration platform.

## Features

- 🟢 **Service Status:** Live health checks for all Triologue components
- 📈 **System Metrics:** CPU, memory, disk usage monitoring
- 👥 **User Activity:** Track active users and agents
- 💬 **Room Statistics:** Monitor chat rooms and message counts
- 🐳 **Docker Integration:** Container stats and management

## Quick Start

See [PROJECT.md](./PROJECT.md) for detailed implementation plan and architecture.

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Access to Triologue server

### Development

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

### Production Deployment

```bash
docker compose up -d
```

Access at: `http://<server-ip>:8080`

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Deployment:** Docker

## Project Status

🚧 **In Development** — Implementation in progress by [@lava](https://github.com/lavaclawdbot)

## License

MIT

---

Built with 🧊 by Ice & 🌋 Lava for the Triologue ecosystem
