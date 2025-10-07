# Quick Start Guide

Get the Dynamic Form System running in 5 minutes!

## ⚡ Prerequisites

- Python 3.8+
- Node.js 16+

## 🚀 One-Click Deployment (Easiest!)

**Windows (PowerShell):**
```powershell
.\deploy-windows.ps1
```

**Windows (Command Prompt):**
```cmd
deploy-windows.bat
```

**Mac/Linux:**
```bash
chmod +x deploy-unix.sh
./deploy-unix.sh
```

That's it! The script handles everything automatically.

See [DEPLOYMENT.md](DEPLOYMENT.md) for more details.

---

## 🔧 Manual Setup (Alternative)

If you prefer manual setup or the scripts don't work:

### Prerequisites for Manual Setup
- Two terminal windows

## 🚀 Start the Application

### Terminal 1: Backend

```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python main.py
```

✅ Backend running at: **http://localhost:8000**

### Terminal 2: Frontend

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running at: **http://localhost:3000**

## 🎯 Test It

1. Open browser: **http://localhost:3000**
2. Select a form schema from the dropdown
3. Fill out the form
4. Click "Submit"
5. See success message!

## 📚 What's Available

### Form Schemas

1. **E-commerce Filter** - Product filtering with cascading categories
2. **User Registration** - Multi-step registration with validation
3. **Location Selector** - Country → Region → City cascading

### API Documentation

- Swagger UI: **http://localhost:8000/api/docs**
- ReDoc: **http://localhost:8000/api/redoc**

## 🔧 Common Commands

### Backend
```bash
# Start server
python main.py

# Stop server
Ctrl+C
```

### Frontend
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## ⚠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 8000 in use | Stop other services or change port in `main.py` |
| Port 3000 in use | Vite will prompt to use different port |
| Module not found | Activate venv / reinstall packages |
| CORS errors | Ensure both servers are running |
| Blank page | Check browser console, verify .env file |

## 📖 Next Steps

- Read [README.md](README.md) for full documentation
- Check [SETUP.md](SETUP.md) for detailed setup instructions
- Review [params_schema_md.md](params_schema_md.md) for schema specification
- Explore [backend/README.md](backend/README.md) for API details
- Read [frontend/README.md](frontend/README.md) for frontend docs

## 🎨 Create Your Own Form

1. Edit `backend/example_schemas.py`
2. Add your schema to `SCHEMA_REGISTRY`
3. Restart backend
4. Select your form in the frontend dropdown

## ✅ Success Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can see API docs at http://localhost:8000/api/docs
- [ ] Forms load in browser
- [ ] Can submit a form successfully

**All done? Start building! 🎉**

