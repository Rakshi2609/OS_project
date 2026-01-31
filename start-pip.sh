#!/bin/bash

# Quick start script without Poetry (uses pip + venv)

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "🚀 Starting Smart Terminal (pip mode)..."
echo ""

# Check .env
if [ ! -f .env ]; then
    echo "❌ .env file not found"
    cp .env.example .env
    echo "Created .env - please add your GROQ_API_KEY and run again"
    exit 1
fi

# Check backend venv
if [ ! -d "backend/venv" ]; then
    echo "❌ Backend venv not found. Run ./install-deps.sh first"
    exit 1
fi

# Check frontend deps
if [ ! -d "frontend/node_modules" ]; then
    echo "❌ Frontend dependencies not found. Run ./install-deps.sh first"
    exit 1
fi

echo "Starting backend on http://localhost:8000"
echo "Starting frontend on http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend with venv
(cd backend && source venv/bin/activate && uvicorn app.main:app --reload) &
BACKEND_PID=$!

# Start frontend
(cd frontend && npm run dev) &
FRONTEND_PID=$!

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

wait
