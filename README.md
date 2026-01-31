# Neural Terminal - Cyberpunk Smart Terminal

> 🚀 A futuristic AI-powered terminal interface with neural networks and cyberpunk aesthetics

## ✨ Features

### 🎨 Cyberpunk Design
- **Glitch text effects** with neon animations
- **VHS retro aesthetics** with scanlines
- **Neural network background** with animated connections
- **Custom scrollbars** with gradient glow effects
- **Matrix-style falling code** animations
- **Neon color scheme** (Green, Cyan, Magenta)

### 🧠 AI-Powered Intelligence
- **Smart command suggestions** using neural networks
- **Real-time AI assistance** for terminal operations
- **Contextual help** based on current directory
- **Command prediction** and auto-completion

### 💻 Advanced Terminal Features
- **Full PTY support** with real-time I/O
- **Non-blocking terminal** operations
- **WebSocket connections** for instant communication
- **Command history** with search and filtering
- **Favorites system** for frequently used commands

### 📊 System Monitoring
- **Real-time resource tracking** (CPU, Memory, Disk)
- **Animated progress bars** with shimmer effects
- **System statistics** and performance metrics
- **Live updating dashboard** with neural theme

### 🌐 Modern Web Interface
- **React + TypeScript** for type safety
- **React Router** for seamless navigation
- **Responsive design** for all screen sizes
- **Beautiful landing page** with cyberpunk aesthetics
- **Toast notifications** with custom styling

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.9+ with Poetry
- **Git** for version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Rakshi2609/OS_project.git
cd OS_project
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend && poetry install && cd ..

# Install frontend dependencies  
cd frontend && npm install && cd ..
```

3. **Start the development servers**
```bash
./start.sh
```

4. **Access the application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📱 Navigation

- **🏠 Landing Page** (`/`) - Cyberpunk welcome interface
- **💻 Terminal** (`/terminal`) - AI-powered terminal interface
- **📊 Dashboard** (`/dashboard`) - System monitoring dashboard  
- **📝 History** (`/history`) - Command history and statistics

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM with async support
- **PostgreSQL** - Robust database storage
- **PTY Process** - Real terminal emulation
- **WebSockets** - Real-time communication
- **Uvicorn** - ASGI server

### Frontend  
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Sonner** - Beautiful toast notifications
- **xterm.js** - Terminal emulator

## 🎭 Cyberpunk Theme

### Color Palette
```css
Primary Green:   #00ff00  /* Matrix green */
Cyber Cyan:      #00ffff  /* Electric blue */  
Neon Magenta:    #ff00ff  /* Hot pink */
Deep Black:      #0a0a0a  /* Void black */
Gray Smoke:      #333333  /* Steel gray */
```

### Typography
- **Font**: JetBrains Mono (Monospace)
- **Glitch Effects**: CSS animations with clip-path
- **Neon Glow**: Multi-layer text-shadow effects
- **VHS Distortion**: Repeating gradient overlays

## 🔧 Development

### Project Structure
```
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── api/routes/     # API endpoints
│   │   ├── core/           # Core services  
│   │   ├── models/         # Data models
│   │   └── main.py         # FastAPI app
│   └── pyproject.toml      # Python dependencies
├── frontend/               # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/            # Utilities
│   │   └── main.tsx        # Entry point
│   └── package.json        # Node dependencies
├── start.sh               # Development server launcher
└── README.md              # This file
```

### Available Scripts

```bash
# Start both servers
./start.sh

# Backend only
cd backend && poetry run uvicorn app.main:app --reload

# Frontend only  
cd frontend && npm run dev

# Run tests
./test-ai.sh

# Install dependencies
./install-deps.sh
```

## 🌟 Key Features Showcase

### 1. Cyberpunk Landing Page
- Animated neural network background
- Glitch text effects with color splitting
- Floating particle animations
- Terminal preview window
- Call-to-action buttons with glow effects

### 2. AI-Powered Terminal
- Real-time command suggestions
- Smart auto-completion
- Context-aware help system
- Non-blocking PTY operations
- WebSocket real-time updates

### 3. System Dashboard
- Live resource monitoring
- Animated progress indicators
- Neural network visualizations  
- Cyberpunk data cards
- Real-time statistics

### 4. Command History
- JSON-based storage system
- Search and filtering
- Favorites management
- Git integration
- Export functionality

## 🔮 Future Enhancements

- [ ] **Voice Commands** - AI voice recognition
- [ ] **Machine Learning** - Predictive command suggestions
- [ ] **Docker Integration** - Container management
- [ ] **Plugin System** - Extensible architecture
- [ ] **Multi-user Support** - Collaborative terminals
- [ ] **Cloud Sync** - Cross-device synchronization
- [ ] **Themes Engine** - Customizable color schemes
- [ ] **Mobile App** - Native mobile interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **xterm.js** for terminal emulation
- **FastAPI** for the amazing Python framework  
- **React** team for the UI library
- **Tailwind CSS** for utility-first styling
- **Matrix** movies for cyberpunk inspiration
- **Cyberpunk 2077** for aesthetic references

---

<div align="center">
  <b>🚀 Welcome to the Neural Terminal - Where AI Meets Cyberpunk! 🧠</b>
</div>
