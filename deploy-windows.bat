@echo off
REM Dynamic Form Demo - Windows Deployment Script (Batch)
REM This script sets up and runs both backend and frontend servers

echo ========================================
echo   Dynamic Form Demo - Deployment Script
echo ========================================
echo.

REM Check if Python is installed
echo [1/6] Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo   X Python is not installed or not in PATH
    echo   Please install Python 3.8+ from https://www.python.org/
    exit /b 1
)
echo   - Found Python
echo.

REM Check if Node.js is installed
echo [2/6] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo   X Node.js is not installed or not in PATH
    echo   Please install Node.js 16+ from https://nodejs.org/
    exit /b 1
)
echo   - Found Node.js
echo.

REM Setup Backend
echo [3/6] Setting up Python backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo   Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo   Activating virtual environment...
call venv\Scripts\activate.bat

REM Install Python dependencies
echo   Installing Python dependencies...
pip install --upgrade pip --quiet
pip install -r requirements.txt --quiet

echo   - Backend setup complete
cd ..
echo.

REM Setup Frontend
echo [4/6] Setting up React frontend...
cd frontend

REM Install Node dependencies
echo   Installing Node.js dependencies...
call npm install --silent

echo   - Frontend setup complete
cd ..
echo.

REM Start Backend Server
echo [5/6] Starting backend server...
cd backend
call venv\Scripts\activate.bat
start /B uvicorn main:app --reload --host 0.0.0.0 --port 8000
cd ..
timeout /t 3 /nobreak >nul
echo   - Backend server starting at http://localhost:8000
echo.

REM Start Frontend Server
echo [6/6] Starting frontend server...
cd frontend
start /B npm run dev
cd ..
timeout /t 5 /nobreak >nul
echo   - Frontend server starting
echo.

echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Backend API:  http://localhost:8000
echo Frontend App: http://localhost:5173
echo API Docs:     http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop (you may need to manually kill processes)
echo.

pause

