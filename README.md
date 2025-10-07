# Dynamic Form System

> **🚀 New User?** → [START HERE](START_HERE.md) for quick deployment!

A comprehensive dynamic form system based on OpenAPI 3.1 and JSON Schema specifications. Forms are defined declaratively on the backend and rendered automatically on the frontend with full TypeScript support.

## 📋 Overview

This system allows you to:
- **Define forms as JSON schemas** following OpenAPI 3.1 standards
- **Automatically render forms** on the frontend without hardcoding
- **Support complex relationships** between fields (dependent dropdowns, conditional visibility)
- **Validate data** on both client and server
- **Extend easily** with custom field types and validation rules

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌────────────────────────────────────────────────┐    │
│  │  Dynamic Form Renderer                         │    │
│  │  • Fetches schema from API                     │    │
│  │  • Renders fields based on type                │    │
│  │  • Handles validation and submission           │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          │ HTTP/JSON
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   Backend (FastAPI)                      │
│  ┌────────────────────────────────────────────────┐    │
│  │  Schema Management                             │    │
│  │  • Serves form schemas (OpenAPI 3.1 based)     │    │
│  │  • Validates submissions                       │    │
│  │  • Provides dynamic data for dependent fields  │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### One-Click Deployment (Recommended)

Use our automated deployment scripts to get started instantly:

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

The scripts will automatically:
- ✅ Check dependencies
- ✅ Set up virtual environments
- ✅ Install all requirements
- ✅ Start both servers

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Prerequisites

- **Backend**: Python 3.8+ with pip
- **Frontend**: Node.js 16+ with npm

### Manual Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd DynamicForm
   ```

2. **Set up the backend:**
   ```bash
   cd backend
   python -m venv venv
   
   # On Windows:
   venv\Scripts\activate
   # On Unix/MacOS:
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

3. **Set up the frontend:**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   ```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
# Activate virtual environment first
python main.py
```
Backend runs at: http://localhost:8000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs at: http://localhost:3000

### Access the Application

- **Frontend App**: http://localhost:3000
- **API Docs**: http://localhost:8000/api/docs
- **API ReDoc**: http://localhost:8000/api/redoc

## 📚 Features

### Supported Field Types

| Type | Description | Use Case |
|------|-------------|----------|
| `text_field` | Single-line text input | Names, emails, short text |
| `textarea` | Multi-line text input | Descriptions, comments |
| `number_field` | Numeric input | Prices, quantities, measurements |
| `list` | Single-select dropdown | Categories, countries |
| `sub_list` | Dependent dropdown | States (depends on country) |
| `multi_select` | Multiple selection | Tags, categories |
| `checkbox` | Boolean checkbox | Agreements, flags |
| `switch` | Toggle switch | Enable/disable settings |
| `radio` | Radio button group | Exclusive choices |
| `range` | Range slider | Price ranges, ratings |
| `date_field` | Date picker | Birthdate, appointments |
| `datetime_field` | Date and time picker | Event timestamps |
| `time_field` | Time picker | Opening hours |

### Key Features

✅ **Declarative Schema** - Define forms in JSON, render automatically  
✅ **Type Safe** - Full TypeScript support with generated types  
✅ **Dependent Fields** - Cascading dropdowns and conditional visibility  
✅ **Validation** - Built-in JSON Schema validation + custom rules  
✅ **Async Validation** - Server-side validation for uniqueness checks  
✅ **Extensible** - Easy to add new field types and content types  
✅ **Standards Based** - OpenAPI 3.1 and JSON Schema compliant  
✅ **Responsive** - Mobile-friendly UI  
✅ **Accessible** - WCAG compliant with proper ARIA labels  

## 📖 Example Schemas

The system comes with three example schemas:

### 1. E-commerce Filter
Product filtering with category → subcategory cascading and price range:
```bash
http://localhost:8000/api/schemas/ecommerce_filter
```

### 2. User Registration
Multi-category form with validation, password strength, and address fields:
```bash
http://localhost:8000/api/schemas/user_registration
```

### 3. Location Selector
Three-level cascading: Country → Region → City:
```bash
http://localhost:8000/api/schemas/location_selector
```

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Pydantic v2** - Data validation using Python type hints
- **Uvicorn** - ASGI server
- **Python 3.9+** - Programming language

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling with modern CSS variables

## 📂 Project Structure

```
DynamicForm/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── models.py               # Pydantic models
│   ├── example_schemas.py      # Example form schemas
│   ├── requirements.txt        # Python dependencies
│   └── README.md               # Backend documentation
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── fields/         # Field components
│   │   │   └── DynamicForm.tsx # Form renderer
│   │   ├── types.ts            # TypeScript definitions
│   │   ├── api.ts              # API client
│   │   ├── App.tsx             # Main app
│   │   └── main.tsx            # Entry point
│   ├── package.json            # Node dependencies
│   ├── vite.config.ts          # Vite configuration
│   └── README.md               # Frontend documentation
├── params_schema_md.md         # Complete schema specification
└── README.md                   # This file
```

## 📝 Creating Custom Forms

### Backend - Define Schema

Edit `backend/example_schemas.py`:

```python
from models import FormSchema, ParamCategory, Param, StringContent

MY_FORM_SCHEMA = FormSchema(
    paramCategories=[
        ParamCategory(
            name="basic_info",
            description="Basic Information",
            params=[
                Param(
                    name="full_name",
                    type="text_field",
                    description="Full Name",
                    required=True,
                    related=None,
                    content=StringContent(
                        type="string",
                        minLength=2,
                        maxLength=100
                    )
                )
            ]
        )
    ]
)

# Register schema
SCHEMA_REGISTRY["my_form"] = MY_FORM_SCHEMA
```

### Frontend - Use Schema

The frontend automatically renders any schema from the backend:

```typescript
import { DynamicForm } from './components/DynamicForm';
import { getSchema } from './api';

const schema = await getSchema('my_form');
<DynamicForm schema={schema} schemaId="my_form" />
```

## 🔧 API Endpoints

### Schema Endpoints
- `GET /api/schemas` - List all schemas
- `GET /api/schemas/{schema_id}` - Get specific schema

### Data Endpoints
- `GET /api/countries` - Get countries list
- `GET /api/cities?country={code}` - Get cities by country
- `GET /api/subcategories?parent={category}` - Get subcategories

### Validation Endpoints
- `GET /api/validate/email?email={email}` - Validate email
- `POST /api/validate` - Validate form data

### Form Endpoints
- `POST /api/submit` - Submit form
- `GET /api/submissions` - Get submissions (admin)

### Utility
- `GET /api/health` - Health check

## 🎨 Customisation

### Styling

Edit `frontend/src/index.css` to customise theme colours:

```css
:root {
  --primary-colour: #4f46e5;    /* Main brand colour */
  --error-colour: #ef4444;       /* Error states */
  --success-colour: #10b981;     /* Success states */
  /* ... more variables */
}
```

### Adding New Field Types

1. Create field component in `frontend/src/components/fields/`
2. Add to `DynamicForm.tsx` render switch
3. Define content type in `backend/models.py`
4. Update TypeScript types in `frontend/src/types.ts`

## 🔒 Security Considerations

For production deployment:

1. **Backend:**
   - Replace in-memory storage with database
   - Implement authentication/authorisation
   - Add rate limiting
   - Configure CORS properly
   - Use HTTPS
   - Sanitise all inputs
   - Add logging and monitoring

2. **Frontend:**
   - Never trust client-side validation alone
   - Implement CSRF protection
   - Sanitise user inputs
   - Use environment variables for API URLs

## 📊 Validation

The system provides multiple validation levels:

1. **Browser Validation** - HTML5 attributes (pattern, required, min/max)
2. **Client-Side Validation** - JSON Schema validation in React
3. **Server-Side Validation** - Pydantic models in FastAPI
4. **Async Validation** - Custom endpoint validation (e.g., email uniqueness)

## 🧪 Testing

**Backend:**
```bash
cd backend
# Activate venv first
python -m pytest  # (tests not included, add as needed)
```

**Frontend:**
```bash
cd frontend
npm run lint
```

## 📈 Performance

- **Frontend:** Code splitting, lazy loading, optimised re-renders
- **Backend:** Async endpoints, efficient validation
- **Caching:** Optional response caching for dynamic data endpoints

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is provided as-is for educational and commercial use.

## 🆘 Troubleshooting

### Backend won't start
- Ensure virtual environment is activated
- Check Python version (3.9+)
- Verify all dependencies installed: `pip install -r requirements.txt`

### Frontend won't connect to backend
- Ensure backend is running on port 8000
- Check `.env` file has correct `VITE_API_URL`
- Verify CORS settings in `backend/main.py`

### Form doesn't render
- Check browser console for errors
- Verify schema is valid JSON
- Ensure backend returns 200 status for schema endpoint

### Styling issues
- Clear browser cache
- Check CSS files are imported
- Verify CSS variables in `:root`

## 📞 Support

For issues and questions:
- **[Documentation Index](DOCUMENTATION_INDEX.md)** - Complete guide to all documentation
- Check the [Schema Documentation](params_schema_md.md)
- Review [Backend README](backend/README.md)
- Review [Frontend README](frontend/README.md)
- Check API documentation at http://localhost:8000/api/docs

## 🎯 Roadmap

Future enhancements:
- [ ] File upload support
- [ ] Conditional field visibility
- [ ] Multi-step forms
- [ ] Form versioning
- [ ] Internationalisation (i18n)
- [ ] Dark mode
- [ ] Form analytics
- [ ] Export/import schemas
- [ ] Visual schema builder
- [ ] Database integration
- [ ] User authentication
- [ ] Form templates library

## ⭐ Acknowledgements

Built with:
- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pydantic](https://docs.pydantic.dev/)
- [Vite](https://vitejs.dev/)

Based on:
- [OpenAPI 3.1 Specification](https://spec.openapis.org/oas/v3.1.0)
- [JSON Schema Draft 2020-12](https://json-schema.org/)

---

**Created:** October 2025  
**Version:** 1.0.0

