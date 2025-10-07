# Deployment Guide

This guide explains how to deploy and run the Dynamic Form Demo application.

## Quick Start

Choose the deployment script for your operating system:

### Windows

**Option 1: PowerShell (Recommended)**
```powershell
.\deploy-windows.ps1
```

**Option 2: Command Prompt**
```cmd
deploy-windows.bat
```

### Mac/Linux

```bash
chmod +x deploy-unix.sh
./deploy-unix.sh
```

## What the Scripts Do

The deployment scripts automatically:

1. ✅ Check for Python and Node.js installation
2. ✅ Create Python virtual environment (if needed)
3. ✅ Install Python dependencies
4. ✅ Install Node.js dependencies
5. ✅ Start the backend server on port 8000
6. ✅ Start the frontend server on port 5173

## Access the Application

Once deployed, you can access:

- **Frontend Application**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Alternative API Docs**: http://localhost:8000/redoc

## Prerequisites

Before running the deployment script, ensure you have:

- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **Git** (optional) - For cloning the repository

## Manual Deployment

If you prefer to set up manually or the scripts don't work:

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

In a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

## Stopping the Servers

### Using Deployment Scripts

- Press `Ctrl+C` to stop all servers

### Manual Stop

- **Backend**: Press `Ctrl+C` in the backend terminal
- **Frontend**: Press `Ctrl+C` in the frontend terminal

## Troubleshooting

### Port Already in Use

If ports 8000 or 5173 are already in use:

**Backend (Change Port 8000)**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

**Frontend (Change Port 5173)**
- Edit `frontend/vite.config.ts`
- Add server configuration:
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
```

### Python Not Found

- Ensure Python is installed and in your PATH
- Try using `python3` instead of `python`
- Verify installation: `python --version`

### Node.js Not Found

- Ensure Node.js is installed and in your PATH
- Verify installation: `node --version`

### PowerShell Execution Policy Error (Windows)

If you get an execution policy error:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Dependencies Installation Fails

**Python Dependencies**
```bash
# Update pip first
pip install --upgrade pip

# Install dependencies one by one
pip install fastapi uvicorn pydantic
```

**Node.js Dependencies**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

For production deployment, see [SETUP.md](SETUP.md) for detailed instructions on:

- Building production bundles
- Configuring environment variables
- Setting up reverse proxies
- SSL/TLS configuration
- Process management with PM2/systemd

## Docker Deployment (Future)

Docker deployment support is planned. Check back for updates or contribute to the project!

## Support

If you encounter issues:

1. Check the [SETUP.md](SETUP.md) for detailed setup instructions
2. Review the [README.md](README.md) for project overview
3. Check server logs for error messages
4. Open an issue on GitHub with details about your environment

## Environment Details

The deployment scripts are tested on:

- **Windows**: Windows 10/11 with PowerShell 5.1+
- **Mac**: macOS 11+ (Big Sur and later)
- **Linux**: Ubuntu 20.04+, Debian 10+, Fedora 34+

## Next Steps

After successful deployment:

1. Explore the example form schemas in the frontend
2. Review the API documentation at http://localhost:8000/docs
3. Check out the [params_schema_md.md](params_schema_md.md) for schema specifications
4. Start building your own dynamic forms!

---

**Happy Coding! 🚀**

