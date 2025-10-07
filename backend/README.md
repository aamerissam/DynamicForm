# Dynamic Form Backend

FastAPI backend for the Dynamic Form System based on OpenAPI 3.1 and JSON Schema.

## Features

- **RESTful API** for form schema delivery
- **Dynamic form schemas** with dependent fields
- **Validation endpoints** for async field validation
- **Form submission** with server-side validation
- **OpenAPI documentation** at `/api/docs`
- **CORS enabled** for frontend integration

## Installation

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Unix/MacOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Running the Server

```bash
# Development mode (with auto-reload)
python main.py

# Or using uvicorn directly
uvicorn main:app --reload --port 8000
```

The server will start at `http://localhost:8000`

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **OpenAPI JSON**: http://localhost:8000/api/openapi.json

## Available Endpoints

### Schema Management
- `GET /api/schemas` - List all available form schemas
- `GET /api/schemas/{schema_id}` - Get specific form schema

### Data Endpoints
- `GET /api/countries` - Get list of countries
- `GET /api/cities?country={code}` - Get cities for a country
- `GET /api/subcategories?parent={category}` - Get subcategories

### Validation
- `GET /api/validate/email?email={email}` - Validate email uniqueness
- `POST /api/validate` - Validate complete form data

### Form Submission
- `POST /api/submit` - Submit form data
- `GET /api/submissions` - Get all submissions (admin)

### Health
- `GET /api/health` - Health check endpoint

## Available Form Schemas

1. **ecommerce_filter** - E-commerce product filtering form
2. **user_registration** - User registration form with validation
3. **location_selector** - Multi-level location selector (Country > Region > City)

## Example Usage

### Get a Form Schema

```bash
curl http://localhost:8000/api/schemas/user_registration
```

### Submit a Form

```bash
curl -X POST http://localhost:8000/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "formId": "user_registration",
    "data": {
      "email": "user@example.com",
      "password": "SecurePass123",
      "full_name": "John Smith",
      "birth_date": "1990-01-01",
      "country": "GB",
      "postal_code": "SW1A 1AA"
    }
  }'
```

### Validate Email

```bash
curl "http://localhost:8000/api/validate/email?email=test@example.com"
```

## Project Structure

```
backend/
├── main.py              # FastAPI application and routes
├── models.py            # Pydantic models for schema validation
├── example_schemas.py   # Example form schemas
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Models Overview

### Core Models
- `FormSchema` - Root schema containing parameter categories
- `ParamCategory` - Group of related parameters
- `Param` - Individual form field definition

### Content Types
- `EnumContent` - Static dropdown options
- `DependentEnumContent` - Dynamic options based on parent field
- `StringContent` - Text input configuration
- `NumberContent` - Numeric input configuration
- `DateContent` - Date/time picker configuration
- `RangeContent` - Range slider configuration
- `BooleanContent` - Checkbox/switch configuration

## Extending the API

### Adding a New Form Schema

Edit `example_schemas.py`:

```python
MY_CUSTOM_SCHEMA = FormSchema(
    paramCategories=[
        ParamCategory(
            name="my_category",
            description="My Category",
            params=[
                Param(
                    name="my_field",
                    type="text_field",
                    description="My Field",
                    required=True,
                    content=StringContent(type="string")
                )
            ]
        )
    ]
)

# Add to registry
SCHEMA_REGISTRY["my_custom"] = MY_CUSTOM_SCHEMA
```

### Adding Custom Validation

Add a new endpoint in `main.py`:

```python
@app.get("/api/validate/my_field")
async def validate_my_field(value: str):
    # Custom validation logic
    return {"valid": True, "message": "Valid"}
```

## Development Notes

- Uses Pydantic v2 for data validation
- Follows OpenAPI 3.1 specification
- All endpoints return JSON
- CORS configured for local frontend development
- In-memory storage (replace with database for production)

## Production Considerations

For production deployment:

1. Replace in-memory storage with a proper database
2. Add authentication and authorisation
3. Implement rate limiting
4. Add logging and monitoring
5. Use environment variables for configuration
6. Set up proper CORS origins
7. Add HTTPS/TLS
8. Implement proper error handling and logging

