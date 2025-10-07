#!/bin/bash
# Dynamic Form Demo - Unix/Mac/Linux Deployment Script
# This script sets up and runs both backend and frontend servers

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}========================================"
echo -e "  Dynamic Form Demo - Deployment Script"
echo -e "========================================${NC}"
echo ""

# Cleanup function
cleanup() {
    echo -e "\n${YELLOW}Stopping servers...${NC}"
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    echo -e "${GREEN}Servers stopped. Goodbye!${NC}"
    exit 0
}

trap cleanup INT TERM

# Check if Python is installed
echo -e "${YELLOW}[1/6] Checking Python installation...${NC}"
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "  ${GREEN}✓ Found: $PYTHON_VERSION${NC}"
    PYTHON_CMD=python3
elif command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version)
    echo -e "  ${GREEN}✓ Found: $PYTHON_VERSION${NC}"
    PYTHON_CMD=python
else
    echo -e "  ${RED}✗ Python is not installed or not in PATH${NC}"
    echo -e "  ${RED}Please install Python 3.8+ from https://www.python.org/${NC}"
    exit 1
fi

# Check if Node.js is installed
echo -e "${YELLOW}[2/6] Checking Node.js installation...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "  ${GREEN}✓ Found Node.js: $NODE_VERSION${NC}"
else
    echo -e "  ${RED}✗ Node.js is not installed or not in PATH${NC}"
    echo -e "  ${RED}Please install Node.js 16+ from https://nodejs.org/${NC}"
    exit 1
fi

# Setup Backend
echo -e "${YELLOW}[3/6] Setting up Python backend...${NC}"
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo -e "  ${CYAN}Creating Python virtual environment...${NC}"
    $PYTHON_CMD -m venv venv
fi

# Activate virtual environment
echo -e "  ${CYAN}Activating virtual environment...${NC}"
source venv/bin/activate

# Install Python dependencies
echo -e "  ${CYAN}Installing Python dependencies...${NC}"
pip install --upgrade pip --quiet
pip install -r requirements.txt --quiet

echo -e "  ${GREEN}✓ Backend setup complete${NC}"
cd ..

# Setup Frontend
echo -e "${YELLOW}[4/6] Setting up React frontend...${NC}"
cd frontend

# Install Node dependencies
echo -e "  ${CYAN}Installing Node.js dependencies...${NC}"
npm install --silent

echo -e "  ${GREEN}✓ Frontend setup complete${NC}"
cd ..

# Start Backend Server
echo -e "${YELLOW}[5/6] Starting backend server...${NC}"
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &> ../backend.log &
BACKEND_PID=$!
cd ..

sleep 3
echo -e "  ${GREEN}✓ Backend server starting at http://localhost:8000${NC}"

# Start Frontend Server
echo -e "${YELLOW}[6/6] Starting frontend server...${NC}"
cd frontend
npm run dev &> ../frontend.log &
FRONTEND_PID=$!
cd ..

sleep 5
echo -e "  ${GREEN}✓ Frontend server starting...${NC}"

echo ""
echo -e "${CYAN}========================================${NC}"
echo -e "  ${GREEN}🚀 Deployment Complete!${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""
echo -e "Backend API:  http://localhost:8000"
echo -e "Frontend App: http://localhost:5173"
echo -e "API Docs:     http://localhost:8000/docs"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"
echo ""
echo -e "${CYAN}Logs:${NC}"
echo -e "  Backend:  tail -f backend.log"
echo -e "  Frontend: tail -f frontend.log"
echo ""

# Keep script running
wait

