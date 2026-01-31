# Smart Ubuntu Terminal - Setup Instructions

## Project Created! 🎉

Your AI-powered smart terminal with resource monitoring is ready to use.

## 🚀 Quick Start

### 1. Set up your Groq API Key

```bash
cd /home/appu/projects/ubuntu_terminal
cp .env.example .env
```

Edit `.env` and add your Groq API key:
```
GROQ_API_KEY=your_actual_groq_api_key_here
```

### 2. Start Backend (Terminal 1)

```bash
cd backend
pip install poetry
poetry install
poetry run uvicorn app.main:app --reload
```

Backend will run at: http://localhost:8000

### 3. Start Frontend (Terminal 2)

```bash
cd frontend
npm install -g pnpm  # If you don't have pnpm
pnpm install
pnpm dev
```

Frontend will run at: http://localhost:5173

### 4. Open in Browser

Navigate to: http://localhost:5173

## 📋 Features Implemented

### Phase 1: AI Command Suggestions ✅
- **As-you-type autocomplete**: Real-time command suggestions via Groq API
- **Post-execution suggestions**: Smart next-step recommendations
- **Context-aware**: Uses command history, directory, and git status

### Phase 2: Resource Monitoring ✅
- **System-wide tracking**: Live CPU, RAM, and disk usage
- **Per-command tracking**: Resource usage for individual commands
- **Real-time dashboard**: Live graphs with Server-Sent Events
- **Historical data**: Track resource usage over time

### Additional Features ✅
- **Full terminal emulator**: xterm.js with WebSocket PTY connection
- **Command history**: SQLite database with search and export
- **Favorites**: Star important commands
- **Command sequences**: Save multi-command workflows
- **Modern UI**: React + shadcn/ui components

## 🏗️ Project Structure

```
ubuntu_terminal/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/routes/     # API endpoints
│   │   ├── core/           # Business logic
│   │   └── models/         # Data models
│   └── pyproject.toml      # Python dependencies
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   └── lib/           # Utilities
│   └── package.json       # Node dependencies
│
├── .env.example           # Environment template
└── docker-compose.yml     # Docker setup
```

## 🐳 Docker Alternative

If you prefer Docker:

```bash
docker-compose up
```

This starts both backend and frontend in containers.

## 🔧 Development Tips

### Backend API Documentation
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Testing Backend
```bash
cd backend
poetry run pytest
```

### Hot Reload
Both servers support hot reload:
- Backend: Edit Python files, server auto-restarts
- Frontend: Edit React files, browser auto-refreshes

## 📊 How It Works

### Terminal Flow
1. Browser → WebSocket → FastAPI
2. FastAPI → PTY Process (bash/zsh)
3. PTY Output → WebSocket → xterm.js
4. User types → xterm.js → WebSocket → PTY

### AI Suggestions Flow
1. User types command
2. Frontend debounces and sends context to `/api/ai/autocomplete`
3. Backend sends to Groq API with command history + context
4. Groq returns suggestions
5. Frontend displays in dropdown

### Resource Monitoring Flow
1. Backend: psutil polls system every 2 seconds
2. Data sent via Server-Sent Events stream
3. Frontend updates graphs in real-time
4. Per-command tracking via process monitoring

## 🎯 Next Steps

### To Enable AI Features:
1. Get a Groq API key from: https://console.groq.com
2. Add it to `.env` file
3. Restart backend

### To Customize:
- **Terminal theme**: Edit `frontend/src/components/Terminal.tsx`
- **Monitoring interval**: Change `MONITOR_INTERVAL` in `.env`
- **History retention**: Change `MAX_HISTORY_DAYS` in `.env`

## 🐛 Troubleshooting

### "WebSocket connection failed"
- Make sure backend is running on port 8000
- Check firewall settings

### "Groq API error"
- Verify your API key is correct in `.env`
- Check Groq API quota/limits

### "Module not found" errors
- Backend: Run `poetry install` again
- Frontend: Run `pnpm install` again

### Port already in use
- Backend: Change `BACKEND_PORT` in `.env`
- Frontend: Change port in `vite.config.ts`

## 📚 API Endpoints

### Terminal
- `WS /api/terminal/ws` - WebSocket for terminal I/O
- `GET /api/terminal/sessions` - List active sessions

### AI
- `POST /api/ai/autocomplete` - Get command autocomplete
- `POST /api/ai/next-commands` - Get next command suggestions
- `GET /api/ai/git-status` - Get git status

### Resources
- `GET /api/resources/system` - Current system resources
- `GET /api/resources/system/stream` - SSE stream

### History
- `GET /api/history/commands` - Get command history
- `POST /api/history/commands` - Save command
- `GET /api/history/sequences` - Get saved sequences
- `GET /api/history/export` - Export history (JSON/CSV)

## 🎨 UI Components

Built with shadcn/ui:
- Tabs for Terminal/Dashboard view
- Cards for resource panels
- Badges for status indicators
- Charts (recharts) for resource graphs

## ⚡ Performance

- WebSocket for low-latency terminal I/O
- SSE for efficient resource streaming
- Debounced AI API calls (300ms)
- Historical data limited to last 30 points

## 🔐 Security Notes

- Runs with your user permissions (not root)
- Groq API key stored in `.env` (backend only)
- CORS configured for localhost development
- No command injection - PTY provides isolation

## 📝 License

MIT

---

**Happy coding! 🚀**

For issues or questions, check the logs:
- Backend: Terminal where `uvicorn` is running
- Frontend: Browser console (F12)
