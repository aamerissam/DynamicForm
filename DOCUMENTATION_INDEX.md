# Documentation Index

Welcome to the Dynamic Form System documentation! This index will help you find what you need.

## 🚀 Getting Started

Start here if you're new to the project:

1. **[README.md](README.md)** - Main project overview and architecture
2. **[QUICKSTART.md](QUICKSTART.md)** - Get running in 5 minutes
3. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Automated deployment guide
4. **[DEMO_GUIDE.md](DEMO_GUIDE.md)** - Interactive guide to explore features

## 📚 Documentation by Purpose

### For First-Time Users

**Want to try the demo?**
→ [DEPLOYMENT.md](DEPLOYMENT.md) - Run the one-click deployment script

**Want to understand what this is?**
→ [README.md](README.md) - Read the overview and architecture

**Want to explore the features?**
→ [DEMO_GUIDE.md](DEMO_GUIDE.md) - Follow the interactive demo guide

### For Developers

**Need to set up a development environment?**
→ [SETUP.md](SETUP.md) - Detailed setup for Windows/Mac/Linux

**Want to understand the schema format?**
→ [params_schema_md.md](params_schema_md.md) - Complete schema specification

**Need API reference?**
→ http://localhost:8000/docs (after starting backend)

**Want to build custom forms?**
→ [README.md#creating-custom-forms](README.md#-creating-custom-forms)

**Need to add new field types?**
→ [README.md#customisation](README.md#-customisation)

### For DevOps / System Administrators

**Deploying to production?**
→ [SETUP.md](SETUP.md) - Production deployment guide

**Need environment configuration?**
→ [SETUP.md#configuration](SETUP.md)

**Setting up reverse proxy?**
→ [SETUP.md](SETUP.md) - Nginx/Apache examples

**Need security checklist?**
→ [README.md#security-considerations](README.md#-security-considerations)

### For Project Managers

**Understanding the project scope?**
→ [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

**Checking feature completeness?**
→ [README.md#features](README.md#-features)

**Planning roadmap?**
→ [README.md#roadmap](README.md#-roadmap)

## 📖 Complete Documentation List

### Core Documentation

| Document | Purpose | Audience |
|----------|---------|----------|
| [README.md](README.md) | Main project overview, features, architecture | Everyone |
| [QUICKSTART.md](QUICKSTART.md) | 5-minute quick start guide | New users |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Automated deployment scripts | Users trying demo |
| [DEMO_GUIDE.md](DEMO_GUIDE.md) | Interactive feature exploration | New users |
| [SETUP.md](SETUP.md) | Detailed setup and production deployment | Developers, DevOps |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Comprehensive project overview | Project managers |

### Technical Specifications

| Document | Purpose | Audience |
|----------|---------|----------|
| [params_schema_md.md](params_schema_md.md) | Complete schema specification | Developers |
| [backend/README.md](backend/README.md) | Backend API documentation | Backend developers |
| [frontend/README.md](frontend/README.md) | Frontend implementation details | Frontend developers |

### Security and Compliance

| Document | Purpose | Audience |
|----------|---------|----------|
| [frontend/SECURITY.md](frontend/SECURITY.md) | Security considerations for frontend | Developers, Security teams |
| [README.md#security](README.md#-security-considerations) | General security guidelines | Everyone |

### Configuration Files

| File | Purpose | Documentation |
|------|---------|---------------|
| `backend/requirements.txt` | Python dependencies | [SETUP.md](SETUP.md) |
| `frontend/package.json` | Node.js dependencies | [SETUP.md](SETUP.md) |
| `.gitignore` | Git ignore rules | Standard Git |

### Deployment Scripts

| Script | Platform | Documentation |
|--------|----------|---------------|
| `deploy-windows.ps1` | Windows (PowerShell) | [DEPLOYMENT.md](DEPLOYMENT.md) |
| `deploy-windows.bat` | Windows (Command Prompt) | [DEPLOYMENT.md](DEPLOYMENT.md) |
| `deploy-unix.sh` | Mac/Linux (Bash) | [DEPLOYMENT.md](DEPLOYMENT.md) |

## 🎯 Common Tasks Quick Reference

### I Want To...

**Run the demo**
```bash
./deploy-unix.sh        # Mac/Linux
.\deploy-windows.ps1    # Windows
```
→ See [DEPLOYMENT.md](DEPLOYMENT.md)

**Create a custom form**
1. Edit `backend/example_schemas.py`
2. Add schema to `SCHEMA_REGISTRY`
3. Restart backend

→ See [README.md#creating-custom-forms](README.md#-creating-custom-forms)

**Add a new field type**
1. Create component in `frontend/src/components/fields/`
2. Update `DynamicForm.tsx` render switch
3. Add content type in `backend/models.py`
4. Update TypeScript types

→ See [README.md#adding-new-field-types](README.md#adding-new-field-types)

**Deploy to production**
1. Build frontend: `npm run build`
2. Configure environment variables
3. Set up reverse proxy
4. Use process manager (PM2/systemd)

→ See [SETUP.md](SETUP.md)

**Troubleshoot issues**
- Check browser console
- Check server logs
- Review troubleshooting sections

→ See [DEPLOYMENT.md#troubleshooting](DEPLOYMENT.md#troubleshooting)

## 📊 Documentation by Component

### Backend (FastAPI)

- **Overview**: [README.md#backend](README.md#-technology-stack)
- **Setup**: [SETUP.md#backend-setup](SETUP.md)
- **API Reference**: http://localhost:8000/docs
- **Models**: [backend/README.md](backend/README.md)
- **Examples**: `backend/example_schemas.py`

### Frontend (React)

- **Overview**: [README.md#frontend](README.md#-technology-stack)
- **Setup**: [SETUP.md#frontend-setup](SETUP.md)
- **Components**: [frontend/README.md](frontend/README.md)
- **Types**: `frontend/src/types.ts`
- **Styling**: `frontend/src/index.css`

### Schema Specification

- **Complete Spec**: [params_schema_md.md](params_schema_md.md)
- **Examples**: [DEMO_GUIDE.md](DEMO_GUIDE.md)
- **Field Types**: [README.md#supported-field-types](README.md#-features)

## 🔍 Finding Specific Information

### Configuration

**Backend Configuration**
- CORS settings: `backend/main.py` (CORSMiddleware)
- API endpoints: `backend/main.py`
- Schemas: `backend/example_schemas.py`

**Frontend Configuration**
- API URL: `frontend/.env`
- Build config: `frontend/vite.config.ts`
- TypeScript: `frontend/tsconfig.json`

### Code Examples

**Creating a Text Field**
→ [params_schema_md.md](params_schema_md.md) - Field Types section

**Creating Dependent Fields**
→ [DEMO_GUIDE.md#advanced-exploration](DEMO_GUIDE.md#-advanced-exploration)

**Custom Validation**
→ [README.md#validation](README.md#-validation)

### API Endpoints

**Complete API Reference**
→ http://localhost:8000/docs (interactive)

**Endpoint List**
→ [README.md#api-endpoints](README.md#-api-endpoints)

## 🆘 Support Resources

### Troubleshooting

1. [DEPLOYMENT.md#troubleshooting](DEPLOYMENT.md#troubleshooting) - Deployment issues
2. [README.md#troubleshooting](README.md#-troubleshooting) - General issues
3. [QUICKSTART.md#troubleshooting](QUICKSTART.md#-troubleshooting) - Quick fixes

### Learning Resources

1. [DEMO_GUIDE.md](DEMO_GUIDE.md) - Interactive tutorial
2. [params_schema_md.md](params_schema_md.md) - Schema reference
3. API Docs - http://localhost:8000/docs

### External References

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [OpenAPI 3.1 Specification](https://spec.openapis.org/oas/v3.1.0)
- [JSON Schema](https://json-schema.org/)
- [Pydantic Documentation](https://docs.pydantic.dev/)

## 📝 Contributing

Want to contribute to documentation?

1. Fork the repository
2. Update relevant markdown files
3. Ensure British English spelling
4. Submit pull request

See [README.md#contributing](README.md#-contributing)

## 🎓 Recommended Reading Order

### For Complete Beginners

1. [README.md](README.md) - Understand what this is
2. [DEPLOYMENT.md](DEPLOYMENT.md) - Run the deployment script
3. [DEMO_GUIDE.md](DEMO_GUIDE.md) - Explore the features
4. [QUICKSTART.md](QUICKSTART.md) - Learn manual setup
5. [params_schema_md.md](params_schema_md.md) - Learn schema format

### For Experienced Developers

1. [README.md](README.md) - Quick overview
2. [SETUP.md](SETUP.md) - Development setup
3. [params_schema_md.md](params_schema_md.md) - Schema specification
4. [backend/README.md](backend/README.md) + [frontend/README.md](frontend/README.md) - Component docs
5. Source code exploration

### For Production Deployment

1. [SETUP.md](SETUP.md) - Complete setup guide
2. [README.md#security](README.md#-security-considerations) - Security checklist
3. [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - System overview
4. Environment-specific configuration

## 🔄 Documentation Updates

This documentation is current as of: **October 2025**

**Version**: 1.0.0

Last updated sections:
- ✅ Deployment scripts added
- ✅ Demo guide created
- ✅ Security documentation updated
- ✅ Setup guide enhanced

## 📞 Need Help?

If you can't find what you're looking for:

1. Use Ctrl+F to search within documents
2. Check the [README.md](README.md) table of contents
3. Review the API documentation at http://localhost:8000/docs
4. Open an issue on GitHub

---

**Happy reading! 📚**

