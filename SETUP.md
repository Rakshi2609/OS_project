# Neural Terminal - Cyberpunk Setup Guide

## 🚀 Welcome to the Neural Terminal Setup

> Transform your development environment into a cyberpunk neural interface!

## ⚡ Prerequisites

Ensure you have the following installed:

```bash
# Check Node.js version (required: 18+)
node --version

# Check Python version (required: 3.9+)
python3 --version

# Check Poetry (for Python dependency management)
poetry --version

# Install Poetry if not installed
curl -sSL https://install.python-poetry.org | python3 -
```

## 🛠️ Quick Setup

### 1. Clone & Navigate
```bash
git clone https://github.com/Rakshi2609/OS_project.git
cd OS_project
```

### 2. Automated Setup
```bash
# Make scripts executable
chmod +x *.sh

# Run automated installation
./install-deps.sh

# Start development servers
./start.sh
```

### 3. Manual Setup (Alternative)

**Backend Setup:**
```bash
cd backend
poetry install
cd ..
```

**Frontend Setup:**
```bash
cd frontend
npm install
cd ..
```

## 🎯 Environment Configuration

### 1. Set up Groq API Key (Optional)
```bash
cp .env.example .env
```

Edit `.env` file:
```env
GROQ_API_KEY=your_groq_api_key_here
ENVIRONMENT=development
DEBUG=true
```

### 2. Database Setup
The application uses JSON file storage by default. For PostgreSQL:

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt update && sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb neural_terminal
```

Update `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost/neural_terminal
```

## 🚀 Running the Application

### Development Mode
```bash
# Start both servers with auto-reload
./start.sh
```

This launches:
- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:5173
- **API Docs**: http://localhost:8000/docs

### Individual Server Commands

**Backend Only:**
```bash
cd backend
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend Only:**
```bash
cd frontend
npm run dev
```

## 🎨 Cyberpunk Features Enabled

### ✨ Visual Elements
- **Glitch text animations** with color splitting effects
- **Neural network backgrounds** with animated nodes
- **Matrix-style falling code** particles
- **VHS scanline overlays** for retro aesthetics
- **Neon glow effects** on interactive elements
- **Custom scrollbars** with gradient styling

### 🧠 AI Capabilities  
- **Smart command suggestions** powered by Groq
- **Contextual help system** based on current directory
- **Command prediction** using machine learning
- **Real-time assistance** for terminal operations

### 💻 Terminal Features
- **Full PTY emulation** with xterm.js
- **Non-blocking I/O** operations
- **WebSocket real-time** communication  
- **Command history** with JSON storage
- **Favorites system** for frequent commands
- **Git integration** with commit tracking

### 📊 Monitoring Dashboard
- **Live system metrics** (CPU, Memory, Disk)
- **Animated progress bars** with shimmer effects
- **Resource usage graphs** with neural styling
- **Real-time updates** via WebSocket

## 🔧 Development Tools

### Available Scripts
```bash
# Development servers
./start.sh                    # Start both servers
./install-deps.sh            # Install all dependencies  
./test-ai.sh                 # Test AI functionality

# Individual commands
npm run dev                  # Frontend development
poetry run uvicorn app.main:app --reload  # Backend development
```

### Code Quality Tools
```bash
# Frontend linting
cd frontend && npm run lint

# Backend formatting  
cd backend && poetry run black .
cd backend && poetry run isort .

# Type checking
cd frontend && npm run type-check
cd backend && poetry run mypy .
```

## 🌐 Accessing the Application

### 🏠 Landing Page (`/`)
- Cyberpunk welcome interface
- Animated neural networks
- Terminal preview window
- Navigation to main features

### 💻 Terminal Interface (`/terminal`)
- AI-powered command line
- Real-time suggestions
- Smart auto-completion
- Command history sidebar

### 📊 Dashboard (`/dashboard`)  
- System resource monitoring
- Live performance metrics
- Neural-themed data visualization
- Real-time updates

### 📝 History (`/history`)
- Command history browser
- Search and filtering
- Favorites management
- Git commit integration

## ⚠️ Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Kill processes on ports 8000 and 5173
sudo lsof -ti:8000 | xargs kill -9
sudo lsof -ti:5173 | xargs kill -9
```

**Python Dependencies:**
```bash
# Reset Poetry environment
cd backend
poetry env remove python
poetry install
```

**Node Dependencies:**
```bash
# Clear npm cache and reinstall
cd frontend  
rm -rf node_modules package-lock.json
npm install
```

**Backend Import Errors:**
```bash
# Ensure Python path is correct
cd backend
export PYTHONPATH=$PWD:$PYTHONPATH
poetry run python -m app.main
```

### Performance Optimization

**Frontend Build:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend Production:**
```bash
cd backend
poetry run gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 🎯 Next Steps

1. **🔐 Security**: Set up authentication and user management
2. **🐳 Docker**: Containerize the application for easy deployment
3. **☁️ Cloud**: Deploy to cloud platforms (AWS, GCP, Azure)
4. **📱 Mobile**: Create responsive mobile interface
5. **🔌 Plugins**: Develop extensible plugin architecture
6. **🎨 Themes**: Add customizable color schemes
7. **👥 Multi-user**: Implement collaborative features
8. **🔄 CI/CD**: Set up automated testing and deployment

## 📚 Additional Resources

- **FastAPI Documentation**: https://fastapi.tiangolo.com/
- **React Documentation**: https://react.dev/
- **xterm.js Guide**: https://xtermjs.org/
- **Tailwind CSS**: https://tailwindcss.com/
- **Poetry Documentation**: https://python-poetry.org/docs/

---

<div align="center">
  <b>🧠 Neural Terminal Setup Complete - Welcome to the Matrix! 🚀</b>
</div>
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
