#!/bin/bash

# Smart Terminal Setup Script

set -e

echo "🚀 Smart Terminal Setup"
echo "======================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  No .env file found${NC}"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo -e "${RED}❗ IMPORTANT: Edit .env and add your GROQ_API_KEY${NC}"
    echo ""
    read -p "Press Enter after you've added your Groq API key to .env..."
fi

# Check for Python
echo "Checking Python..."
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Python found${NC}"

# Check for Node.js
echo "Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found${NC}"

# Install Poetry if not present
echo "Checking Poetry..."
if ! command -v poetry &> /dev/null; then
    echo "Installing Poetry..."
    pip install poetry
fi
echo -e "${GREEN}✓ Poetry ready${NC}"

echo ""
echo "📦 Installing dependencies..."
echo ""

# Backend setup
echo "Installing backend dependencies..."
export PATH="/home/appu/.local/bin:$PATH"
cd backend
poetry install --no-root
cd ..
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

# Frontend setup
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "🎯 Next steps:"
echo ""
echo "1. Make sure your GROQ_API_KEY is set in .env"
echo ""
echo "2. Start the backend (in one terminal):"
echo "   export PATH=\"/home/appu/.local/bin:\$PATH\""
echo "   cd backend && poetry run uvicorn app.main:app --reload"
echo ""
echo "3. Start the frontend (in another terminal):"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "📚 For more details, see SETUP.md"
