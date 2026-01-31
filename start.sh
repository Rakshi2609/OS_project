#!/bin/bash

# Start backend and frontend in separate terminals

echo "🚀 Starting Smart Terminal..."
echo ""

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env and add your GROQ_API_KEY"
    echo "Then run this script again."
    exit 1
fi

# Check if GROQ_API_KEY is set
if ! grep -q "GROQ_API_KEY=gsk_" .env && ! grep -q "GROQ_API_KEY=.*[a-zA-Z0-9]" .env | grep -v "your_groq_api_key_here"; then
    echo "❌ GROQ_API_KEY not set in .env file"
    echo ""
    echo "Please edit .env and add your Groq API key:"
    echo "  GROQ_API_KEY=your_actual_api_key_here"
    echo ""
    echo "Get your API key from: https://console.groq.com"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "⚠️  Frontend dependencies not installed. Installing now..."
    cd frontend && npm install && cd ..
fi

echo "Starting backend on http://localhost:8000"
echo "Starting frontend on http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
export PATH="/home/appu/.local/bin:$PATH"

# Start backend
(cd backend && poetry run uvicorn app.main:app --reload) &
BACKEND_PID=$!

# Start frontend
(cd frontend && npm run dev) &
FRONTEND_PID=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    
    # Kill the direct PIDs
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    
    # Kill any remaining uvicorn processes
    pkill -P $BACKEND_PID 2>/dev/null
    pkill -f "uvicorn app.main:app" 2>/dev/null
    
    # Kill any remaining vite processes
    pkill -P $FRONTEND_PID 2>/dev/null
    pkill -f "vite" 2>/dev/null
    
    # Also kill by port to be sure
    lsof -ti:8000 | xargs -r kill -9 2>/dev/null
    lsof -ti:5173 | xargs -r kill -9 2>/dev/null
    
    echo "✅ Servers stopped"
    exit 0
}

# Trap Ctrl+C (SIGINT) and SIGTERM only - not EXIT to allow background running
trap cleanup INT TERM

wait
