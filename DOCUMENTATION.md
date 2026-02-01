# Smart Terminal Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Features](#features)
4. [Architecture](#architecture)
5. [API Reference](#api-reference)
6. [Terminal Usage](#terminal-usage)
7. [System Monitoring](#system-monitoring)
8. [AI Integration](#ai-integration)
9. [Configuration](#configuration)
10. [Troubleshooting](#troubleshooting)

---

## Introduction

**Smart Terminal** is a next-generation, AI-powered terminal interface that combines the power of traditional command-line interfaces with modern web technologies and artificial intelligence. Built with a cyberpunk aesthetic, it provides real-time system monitoring, intelligent command suggestions, and seamless terminal operations through an intuitive web interface.

### Key Highlights
- **AI-Powered Assistance**: Get intelligent command suggestions powered by neural networks
- **Real-Time Monitoring**: Track system resources (CPU, Memory, Disk) with live updates
- **Modern Web Interface**: Beautiful, responsive design with cyberpunk aesthetics
- **Full Terminal Emulation**: Complete PTY support with WebSocket communication
- **Cross-Platform**: Works on Windows, macOS, and Linux

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher
- **Python** 3.9 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/nirvik34/OS_project.git
cd OS_project
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r ../requirements.txt

# Or use Poetry (recommended)
poetry install
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install
```

#### 4. Environment Configuration

Create a `.env` file in the backend directory:

```env
# Backend Configuration
BACKEND_HOST=localhost
BACKEND_PORT=8000
DEBUG=true

# CORS Settings
CORS_ORIGINS=["http://localhost:5173"]

# AI Configuration (Optional)
GROQ_API_KEY=your_groq_api_key_here
```

### Running the Application

#### Option 1: Using the Start Script (Recommended)

```bash
# From the project root
./start.sh
```

This will start both the backend and frontend servers concurrently.

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn app.main:app --reload --host localhost --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Accessing the Application

Once running, access the application at:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (Swagger UI)
- **Alternative API Docs**: http://localhost:8000/redoc (ReDoc)

---

## Features

### 1. Neural Terminal Interface

The Smart Terminal provides a full-featured terminal emulator with:

- **Real-time Command Execution**: Execute commands with instant feedback
- **PTY Support**: Full pseudo-terminal support for interactive applications
- **WebSocket Communication**: Low-latency, bidirectional communication
- **Terminal Resizing**: Automatic terminal size adjustment
- **Copy/Paste Support**: Standard clipboard operations
- **Keyboard Shortcuts**: Full keyboard navigation support

### 2. AI-Powered Command Suggestions

Leverage artificial intelligence for smarter terminal usage:

- **Contextual Suggestions**: Get command recommendations based on your current context
- **Confidence Scoring**: Each suggestion includes a confidence percentage
- **Real-time Updates**: Suggestions update as you type
- **Tab Completion**: Press Tab to auto-complete suggested commands
- **Navigation**: Use arrow keys to navigate through suggestions
- **GROQ Integration**: Powered by GROQ's neural network models

### 3. System Resource Monitoring

Monitor your system in real-time:

- **CPU Usage**: Track processor utilization across all cores
- **Memory Usage**: Monitor RAM consumption and availability
- **Disk Usage**: View storage capacity and usage
- **Live Updates**: Metrics refresh every 2 seconds
- **Visual Indicators**: Color-coded progress bars with animations
- **Alert System**: Automatic warnings for high resource usage

### 4. Command History

Track and manage your command history:

- **Persistent Storage**: Commands saved to local database
- **Search Functionality**: Find previous commands quickly
- **Favorites System**: Mark frequently used commands
- **Export Options**: Export history to JSON or CSV
- **Filtering**: Filter by date, command type, or status

---
<!-- 
## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Landing    │  │   Terminal   │  │  Dashboard   │  │
│  │     Page     │  │  Component   │  │  Component   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         │                  │                  │          │
│         └──────────────────┴──────────────────┘          │
│                            │                              │
│                     WebSocket / HTTP                      │
│                            │                              │
└────────────────────────────┼──────────────────────────────┘
                             │
┌────────────────────────────┼──────────────────────────────┐
│                    Backend (FastAPI)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Terminal   │  │      AI      │  │  Resources   │  │
│  │    Router    │  │    Router    │  │    Router    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         │                  │                  │          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ PTY Process  │  │ GROQ Neural  │  │    psutil    │  │
│  │   Manager    │  │    Network   │  │   Monitor    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
``` -->

### Technology Stack

#### Frontend
- **React 18**: Modern UI library with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **xterm.js**: Terminal emulator for the web
- **React Router**: Client-side routing
- **Sonner**: Toast notifications

#### Backend
- **FastAPI**: High-performance Python web framework
- **SQLAlchemy**: SQL toolkit and ORM
- **Uvicorn**: ASGI server
- **WebSockets**: Real-time bidirectional communication
- **psutil**: System and process utilities
- **aiosqlite**: Async SQLite database

---

## API Reference

### Base URL
```
http://localhost:8000/api
```

### Authentication
Currently, the API does not require authentication. This may change in future versions.

### Endpoints

#### Terminal Operations

##### WebSocket Connection
```
WS /api/terminal/ws
```

Connect to the terminal WebSocket for real-time command execution.

**Message Types:**

**Client → Server:**
```json
{
  "type": "input",
  "data": "ls -la\n"
}
```

```json
{
  "type": "resize",
  "cols": 80,
  "rows": 24
}
```

**Server → Client:**
```json
{
  "type": "output",
  "data": "file1.txt\nfile2.txt\n"
}
```

```json
{
  "type": "connected",
  "session_id": "abc123"
}
```

#### AI Suggestions

##### Get Command Suggestions
```http
POST /api/ai/autocomplete
Content-Type: application/json

{
  "input": "git co",
  "context": {
    "cwd": "/home/user/project",
    "history": ["git status", "git add ."]
  }
}
```

**Response:**
```json
{
  "suggestions": [
    {
      "command": "git commit -m",
      "description": "Commit staged changes with a message",
      "confidence": 0.95
    },
    {
      "command": "git checkout",
      "description": "Switch branches or restore files",
      "confidence": 0.87
    }
  ]
}
```

#### System Resources

##### Get System Resources
```http
GET /api/resources/system
```

**Response:**
```json
{
  "cpu": {
    "percent": 45.2,
    "cores": 8
  },
  "memory": {
    "used": 9126805504,
    "total": 17179869184,
    "percent": 53.1
  },
  "disk": {
    "used": 274877906944,
    "total": 549755813888,
    "percent": 50.0
  }
}
```

#### Command History

##### Get Command History
```http
GET /api/history?limit=50&offset=0
```

**Response:**
```json
{
  "commands": [
    {
      "id": 1,
      "command": "ls -la",
      "timestamp": "2024-01-15T10:30:00Z",
      "exit_code": 0,
      "duration": 0.05
    }
  ],
  "total": 150
}
```

##### Add to History
```http
POST /api/history
Content-Type: application/json

{
  "command": "npm install",
  "exit_code": 0,
  "duration": 5.2
}
```

---

## Terminal Usage

### Basic Commands

The Smart Terminal supports all standard shell commands:

```bash
# Navigation
cd /path/to/directory
pwd
ls -la

# File Operations
cat file.txt
mkdir new_folder
rm file.txt
cp source.txt destination.txt

# Process Management
ps aux
kill -9 <pid>
top

# Network
ping google.com
curl https://api.example.com
wget https://example.com/file.zip
```

### AI Assistance

#### Activating Suggestions

1. Start typing a command
2. Wait 300ms for AI suggestions to appear
3. Use **↑** and **↓** arrow keys to navigate suggestions
4. Press **Tab** to accept the selected suggestion
5. Press **Enter** to execute the command

#### Example Workflow

```bash
# Type: git
# AI Suggests:
# → git commit -m "message" (95% confidence)
#   git status (87% confidence)
#   git push origin main (82% confidence)

# Press Tab to complete
git commit -m "message"
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + C` | Interrupt current command |
| `Ctrl + D` | Exit terminal (EOF) |
| `Ctrl + L` | Clear screen |
| `Tab` | Accept AI suggestion |
| `↑` / `↓` | Navigate suggestions |
| `Ctrl + R` | Search command history |

---

## System Monitoring

### Resource Metrics

#### CPU Monitoring
- **Metric**: Percentage of CPU utilization
- **Update Frequency**: Every 2 seconds
- **Warning Threshold**: 80%
- **Critical Threshold**: 95%

#### Memory Monitoring
- **Metric**: RAM usage in GB and percentage
- **Update Frequency**: Every 2 seconds
- **Warning Threshold**: 80%
- **Critical Threshold**: 90%

#### Disk Monitoring
- **Metric**: Storage usage in GB and percentage
- **Update Frequency**: Every 2 seconds
- **Warning Threshold**: 85%
- **Critical Threshold**: 95%

### Alert System

The system automatically displays toast notifications when:
- CPU usage exceeds 80%
- Memory usage exceeds 80%
- Disk usage exceeds 90%
- Connection to backend is lost

---

## AI Integration

### GROQ Neural Network

Smart Terminal uses GROQ's neural network for intelligent command suggestions.

#### Configuration

Set your GROQ API key in the backend `.env` file:

```env
GROQ_API_KEY=your_api_key_here
```

#### How It Works

1. **Input Analysis**: As you type, the system analyzes your input
2. **Context Gathering**: Current directory, recent commands, and system state are collected
3. **Neural Processing**: GROQ processes the context and generates suggestions
4. **Confidence Scoring**: Each suggestion receives a confidence score (0-1)
5. **Real-time Display**: Suggestions appear in the UI with visual confidence indicators

#### Customization

You can adjust AI behavior in `backend/app/config.py`:

```python
# AI Configuration
AI_SUGGESTION_LIMIT = 5  # Max suggestions to show
AI_MIN_CONFIDENCE = 0.5  # Minimum confidence threshold
AI_DEBOUNCE_MS = 300     # Delay before fetching suggestions
```

---

## Configuration

### Backend Configuration

Edit `backend/app/config.py`:

```python
class Settings:
    # Application
    app_name: str = "Smart Terminal"
    debug: bool = True
    
    # Server
    backend_host: str = "localhost"
    backend_port: int = 8000
    
    # CORS
    cors_origins: list = ["http://localhost:5173"]
    
    # Database
    database_url: str = "sqlite+aiosqlite:///./terminal.db"
    
    # AI
    groq_api_key: str = os.getenv("GROQ_API_KEY", "")
```

### Frontend Configuration

Edit `frontend/tailwind.config.js` for theme customization:

```javascript
export default {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: "#0df20d",
        "cyber-cyan": "#00f3ff",
        "cyber-magenta": "#ff00ff",
        "background-dark": "#0a0a0a",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
}
```

---

## Troubleshooting

### Common Issues

#### 1. WebSocket Connection Failed

**Symptom**: Terminal shows "Connection closed" message

**Solution**:
```bash
# Check if backend is running
curl http://localhost:8000/health

# Restart backend
cd backend
uvicorn app.main:app --reload
```

#### 2. AI Suggestions Not Appearing

**Symptom**: No suggestions show up when typing

**Solution**:
- Verify GROQ API key is set in `.env`
- Check browser console for errors
- Ensure backend AI router is accessible: `http://localhost:8000/api/ai/autocomplete`

#### 3. System Resources Not Updating

**Symptom**: Dashboard shows "SCANNING NEURAL PATHWAYS..." indefinitely

**Solution**:
```bash
# Check backend logs
# Ensure psutil is installed
pip install psutil

# Restart backend
```

#### 4. Port Already in Use

**Symptom**: Error: "Address already in use"

**Solution**:
```bash
# Find process using port 8000
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Kill the process or use a different port
```

### Debug Mode

Enable detailed logging:

**Backend:**
```python
# In backend/app/config.py
debug: bool = True
```

**Frontend:**
```bash
# Run with verbose logging
npm run dev -- --debug
```

### Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/nirvik34/OS_project/issues)
2. Review backend logs in the terminal
3. Check browser console for frontend errors
4. Ensure all dependencies are up to date

---

## Best Practices

### Security

- Never expose your GROQ API key in client-side code
- Use environment variables for sensitive configuration
- Enable CORS only for trusted origins
- Implement rate limiting for production deployments

### Performance

- Limit command history to recent entries (default: 1000)
- Use debouncing for AI suggestions (default: 300ms)
- Clear terminal output periodically for long-running sessions
- Monitor system resources to prevent overload

### Development

- Use TypeScript for type safety
- Follow the existing code structure
- Write tests for new features
- Document API changes
- Use meaningful commit messages

---

## Support

For additional support:
- **Documentation**: This file
- **API Docs**: http://localhost:8000/docs
- **GitHub**: https://github.com/nirvik34/OS_project
- **Issues**: https://github.com/nirvik34/OS_project/issues

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**License**: MIT
