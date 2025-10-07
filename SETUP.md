# Setup Instructions

Complete setup guide for the Dynamic Form System on Windows, macOS, and Linux.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Windows Setup](#windows-setup)
3. [macOS/Linux Setup](#macoslinux-setup)
4. [Verification](#verification)
5. [Common Issues](#common-issues)

---

## Prerequisites

### Required Software

1. **Python 3.9 or higher**
   - Download from: https://www.python.org/downloads/
   - Verify: `python --version` or `python3 --version`

2. **Node.js 18 or higher**
   - Download from: https://nodejs.org/
   - Verify: `node --version`

3. **npm (comes with Node.js)**
   - Verify: `npm --version`

4. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/

---

## Windows Setup

### Step 1: Backend Setup

1. **Open PowerShell or Command Prompt**
   ```powershell
   cd C:\Projects\DynamicForm\backend
   ```

2. **Create virtual environment**
   ```powershell
   python -m venv venv
   ```

3. **Activate virtual environment**
   ```powershell
   .\venv\Scripts\activate
   ```
   
   You should see `(venv)` prefix in your prompt.

4. **Install dependencies**
   ```powershell
   pip install -r requirements.txt
   ```

5. **Run the backend**
   ```powershell
   python main.py
   ```
   
   You should see:
   ```
   INFO:     Uvicorn running on http://0.0.0.0:8000
   ```

6. **Test backend** (in browser):
   - Open http://localhost:8000
   - Open http://localhost:8000/api/docs

### Step 2: Frontend Setup

1. **Open NEW PowerShell/Command Prompt window**
   ```powershell
   cd C:\Projects\DynamicForm\frontend
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Create environment file**
   ```powershell
   copy .env.example .env
   ```

4. **Run the frontend**
   ```powershell
   npm run dev
   ```
   
   You should see:
   ```
   VITE v5.x.x  ready in xxx ms
   ➜  Local:   http://localhost:3000/
   ```

5. **Test frontend** (in browser):
   - Open http://localhost:3000

---

## macOS/Linux Setup

### Step 1: Backend Setup

1. **Open Terminal**
   ```bash
   cd /path/to/DynamicForm/backend
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv venv
   ```

3. **Activate virtual environment**
   ```bash
   source venv/bin/activate
   ```
   
   You should see `(venv)` prefix in your prompt.

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the backend**
   ```bash
   python main.py
   ```
   
   You should see:
   ```
   INFO:     Uvicorn running on http://0.0.0.0:8000
   ```

6. **Test backend** (in browser):
   - Open http://localhost:8000
   - Open http://localhost:8000/api/docs

### Step 2: Frontend Setup

1. **Open NEW Terminal window**
   ```bash
   cd /path/to/DynamicForm/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Run the frontend**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   VITE v5.x.x  ready in xxx ms
   ➜  Local:   http://localhost:3000/
   ```

5. **Test frontend** (in browser):
   - Open http://localhost:3000

---

## Verification

### Check Backend is Running

1. **API Health Check**
   ```bash
   curl http://localhost:8000/api/health
   ```
   
   Expected response:
   ```json
   {
     "status": "healthy",
     "schemas_loaded": 3,
     "submissions_count": 0
   }
   ```

2. **Get Schemas List**
   ```bash
   curl http://localhost:8000/api/schemas
   ```
   
   Expected response:
   ```json
   {
     "ecommerce_filter": "/api/schemas/ecommerce_filter",
     "user_registration": "/api/schemas/user_registration",
     "location_selector": "/api/schemas/location_selector"
   }
   ```

3. **API Documentation**
   - Visit: http://localhost:8000/api/docs
   - You should see interactive Swagger UI

### Check Frontend is Running

1. **Open Application**
   - Visit: http://localhost:3000
   - You should see "Dynamic Form System" header

2. **Test Form Loading**
   - Select different schemas from dropdown
   - Forms should render automatically

3. **Test Form Submission**
   - Fill out "User Registration" form
   - Click "Submit"
   - Should see success message

---

## Common Issues

### Backend Issues

#### Issue: `python: command not found`
**Solution:** 
- Use `python3` instead of `python`
- Or add Python to PATH

#### Issue: `pip: command not found`
**Solution:**
```bash
python -m pip install -r requirements.txt
```

#### Issue: `ModuleNotFoundError: No module named 'fastapi'`
**Solution:**
- Ensure virtual environment is activated
- Reinstall dependencies:
  ```bash
  pip install -r requirements.txt
  ```

#### Issue: `Address already in use (port 8000)`
**Solution:**
- Kill process using port 8000
- Or change port in `main.py`:
  ```python
  uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
  ```

#### Issue: CORS errors in browser
**Solution:**
- Ensure both frontend and backend are running
- Check CORS configuration in `backend/main.py`

### Frontend Issues

#### Issue: `npm: command not found`
**Solution:**
- Install Node.js from https://nodejs.org/
- Restart terminal after installation

#### Issue: `Cannot find module 'react'`
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Issue: `Failed to fetch schema`
**Solution:**
- Ensure backend is running on port 8000
- Check `.env` file has correct API URL
- Check browser console for errors

#### Issue: Port 3000 already in use
**Solution:**
- Frontend will prompt to use different port
- Or manually specify in `vite.config.ts`:
  ```typescript
  server: {
    port: 3001,
    ...
  }
  ```

#### Issue: Blank page after npm run dev
**Solution:**
- Check browser console for errors
- Ensure `.env` file exists
- Clear browser cache

---

## Environment Variables

### Backend
No environment variables required for basic setup.

### Frontend
Create `.env` file (copy from `.env.example`):

```env
VITE_API_URL=http://localhost:8000
```

**Note:** If backend runs on different host/port, update accordingly.

---

## Development Workflow

### Daily Development

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Stopping Servers

- Press `Ctrl+C` in each terminal window
- Deactivate Python venv: `deactivate`

### Restarting After Changes

**Backend:**
- FastAPI auto-reloads on file changes
- No restart needed (unless editing dependencies)

**Frontend:**
- Vite auto-reloads on file changes
- No restart needed

---

## Production Build

### Backend
```bash
cd backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Frontend
```bash
cd frontend
npm run build
```

Output in `frontend/dist/` - serve with any static file server.

---

## Next Steps

After successful setup:

1. **Explore Example Schemas**
   - Try "E-commerce Filter"
   - Try "User Registration"
   - Try "Location Selector"

2. **Read Documentation**
   - Main README: `README.md`
   - Schema Spec: `params_schema_md.md`
   - Backend Docs: `backend/README.md`
   - Frontend Docs: `frontend/README.md`

3. **Create Custom Schema**
   - Edit `backend/example_schemas.py`
   - Add to `SCHEMA_REGISTRY`
   - Reload backend
   - Test in frontend

4. **Explore API**
   - Visit http://localhost:8000/api/docs
   - Try endpoints in Swagger UI
   - Test with curl or Postman

---

## Getting Help

If you encounter issues:

1. Check this document's [Common Issues](#common-issues)
2. Review error messages in terminal
3. Check browser console for frontend errors
4. Verify all prerequisites are installed
5. Ensure both servers are running

## Success Checklist

- [ ] Python 3.9+ installed
- [ ] Node.js 18+ installed
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:3000
- [ ] API docs accessible at http://localhost:8000/api/docs
- [ ] Forms render in browser
- [ ] Form submission works

If all checkboxes are ticked, you're ready to develop! 🎉

