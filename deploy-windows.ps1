# Dynamic Form Demo - Windows Deployment Script
# This script sets up and runs both backend and frontend servers

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Dynamic Form Demo - Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
Write-Host "[1/6] Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "  ✓ Found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "  Please install Python 3.8+ from https://www.python.org/" -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
Write-Host "[2/6] Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "  ✓ Found Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "  Please install Node.js 16+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Setup Backend
Write-Host "[3/6] Setting up Python backend..." -ForegroundColor Yellow
Set-Location backend

# Create virtual environment if it doesn't exist
if (-not (Test-Path "venv")) {
    Write-Host "  Creating Python virtual environment..." -ForegroundColor Cyan
    python -m venv venv
}

# Activate virtual environment
Write-Host "  Activating virtual environment..." -ForegroundColor Cyan
& .\venv\Scripts\Activate.ps1

# Install Python dependencies
Write-Host "  Installing Python dependencies..." -ForegroundColor Cyan
pip install --upgrade pip --quiet
pip install -r requirements.txt --quiet

Write-Host "  ✓ Backend setup complete" -ForegroundColor Green
Set-Location ..

# Setup Frontend
Write-Host "[4/6] Setting up React frontend..." -ForegroundColor Yellow
Set-Location frontend

# Install Node dependencies
Write-Host "  Installing Node.js dependencies..." -ForegroundColor Cyan
npm install --silent

Write-Host "  ✓ Frontend setup complete" -ForegroundColor Green
Set-Location ..

# Start Backend Server
Write-Host "[5/6] Starting backend server..." -ForegroundColor Yellow
$backendJob = Start-Job -ScriptBlock {
    Set-Location $args[0]
    Set-Location backend
    & .\venv\Scripts\Activate.ps1
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
} -ArgumentList $PWD

Start-Sleep -Seconds 3
Write-Host "  ✓ Backend server starting at http://localhost:8000" -ForegroundColor Green

# Start Frontend Server
Write-Host "[6/6] Starting frontend server..." -ForegroundColor Yellow
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $args[0]
    Set-Location frontend
    npm run dev
} -ArgumentList $PWD

Start-Sleep -Seconds 5
Write-Host "  ✓ Frontend server starting..." -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  🚀 Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend API:  http://localhost:8000" -ForegroundColor White
Write-Host "Frontend App: http://localhost:5173" -ForegroundColor White
Write-Host "API Docs:     http://localhost:8000/docs" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Yellow
Write-Host ""

# Monitor jobs and keep script running
try {
    while ($true) {
        Start-Sleep -Seconds 1
        
        # Check if jobs are still running
        if ($backendJob.State -eq "Failed") {
            Write-Host "Backend server failed!" -ForegroundColor Red
            Receive-Job $backendJob
            break
        }
        if ($frontendJob.State -eq "Failed") {
            Write-Host "Frontend server failed!" -ForegroundColor Red
            Receive-Job $frontendJob
            break
        }
    }
} finally {
    # Cleanup on exit
    Write-Host "`nStopping servers..." -ForegroundColor Yellow
    Stop-Job $backendJob, $frontendJob -ErrorAction SilentlyContinue
    Remove-Job $backendJob, $frontendJob -ErrorAction SilentlyContinue
    Write-Host "Servers stopped. Goodbye!" -ForegroundColor Green
}

