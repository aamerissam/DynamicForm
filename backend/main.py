"""
FastAPI backend for Dynamic Form System.
Provides endpoints for form schemas, validation, and submission.
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List, Optional
import re

from models import (
    FormSchema, FormSubmission, FormValidationResponse,
    FormSubmissionResponse, ValidationError, EnumValue
)
from example_schemas import SCHEMA_REGISTRY


# ============================================================================
# FastAPI Application Setup
# ============================================================================

app = FastAPI(
    title="Dynamic Form API",
    description="API for dynamic form schema delivery and submission",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001", 
        "http://localhost:5173"
    ],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================================
# In-Memory Data Store (Replace with database in production)
# ============================================================================

# Simulated database for submitted forms
submitted_forms: List[Dict[str, Any]] = []

# Simulated database for email validation
registered_emails = {"test@example.com", "admin@example.com"}


# ============================================================================
# Schema Endpoints
# ============================================================================

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information."""
    return {
        "name": "Dynamic Form API",
        "version": "1.0.0",
        "documentation": "/api/docs",
        "available_schemas": list(SCHEMA_REGISTRY.keys())
    }


@app.get("/api/schemas", tags=["Schemas"], response_model=Dict[str, str])
async def list_schemas():
    """List all available form schemas."""
    return {
        schema_id: f"/api/schemas/{schema_id}"
        for schema_id in SCHEMA_REGISTRY.keys()
    }


@app.get("/api/schemas/{schema_id}", tags=["Schemas"], response_model=FormSchema)
async def get_schema(schema_id: str):
    """Get a specific form schema by ID."""
    if schema_id not in SCHEMA_REGISTRY:
        raise HTTPException(
            status_code=404,
            detail=f"Schema '{schema_id}' not found. Available schemas: {list(SCHEMA_REGISTRY.keys())}"
        )
    
    return SCHEMA_REGISTRY[schema_id]


# ============================================================================
# Dynamic Data Endpoints (for dependent fields)
# ============================================================================

@app.get("/api/countries", tags=["Data"], response_model=List[EnumValue])
async def get_countries():
    """Get list of countries (example dynamic data endpoint)."""
    return [
        EnumValue(label="United Kingdom", value="GB"),
        EnumValue(label="United States", value="US"),
        EnumValue(label="Canada", value="CA"),
        EnumValue(label="Australia", value="AU"),
        EnumValue(label="Germany", value="DE"),
        EnumValue(label="France", value="FR"),
    ]


@app.get("/api/cities", tags=["Data"], response_model=List[EnumValue])
async def get_cities(country: str = Query(..., description="Country code")):
    """Get cities for a specific country (example dependent data)."""
    cities_by_country = {
        "GB": [
            EnumValue(label="London", value="london"),
            EnumValue(label="Manchester", value="manchester"),
            EnumValue(label="Birmingham", value="birmingham"),
            EnumValue(label="Edinburgh", value="edinburgh"),
        ],
        "US": [
            EnumValue(label="New York", value="new_york"),
            EnumValue(label="Los Angeles", value="los_angeles"),
            EnumValue(label="Chicago", value="chicago"),
            EnumValue(label="Houston", value="houston"),
        ],
        "CA": [
            EnumValue(label="Toronto", value="toronto"),
            EnumValue(label="Vancouver", value="vancouver"),
            EnumValue(label="Montreal", value="montreal"),
        ],
    }
    
    return cities_by_country.get(country, [])


@app.get("/api/subcategories", tags=["Data"], response_model=List[EnumValue])
async def get_subcategories(parent: str = Query(..., description="Parent category")):
    """Get subcategories based on parent category."""
    subcategories = {
        "electronics": [
            EnumValue(label="Laptops", value="laptops"),
            EnumValue(label="Phones", value="phones"),
            EnumValue(label="Tablets", value="tablets"),
        ],
        "clothing": [
            EnumValue(label="Men", value="men"),
            EnumValue(label="Women", value="women"),
            EnumValue(label="Children", value="children"),
        ],
    }
    
    return subcategories.get(parent, [])


# ============================================================================
# Validation Endpoints
# ============================================================================

@app.get("/api/validate/email", tags=["Validation"])
async def validate_email(email: str = Query(..., description="Email to validate")):
    """Validate if email is unique (async validation example)."""
    # Email format validation
    email_pattern = r"^[^@]+@[^@]+\.[^@]+$"
    if not re.match(email_pattern, email):
        return {
            "valid": False,
            "message": "Invalid email format"
        }
    
    # Check if email already exists
    if email.lower() in registered_emails:
        return {
            "valid": False,
            "message": "This email is already registered"
        }
    
    return {
        "valid": True,
        "message": "Email is available"
    }


@app.post("/api/validate", tags=["Validation"], response_model=FormValidationResponse)
async def validate_form(submission: FormSubmission):
    """Validate form data against schema rules."""
    errors: List[ValidationError] = []
    
    # Get schema if formId is provided
    if submission.formId and submission.formId in SCHEMA_REGISTRY:
        schema = SCHEMA_REGISTRY[submission.formId]
        
        # Collect all parameters
        all_params = {}
        for category in schema.paramCategories:
            for param in category.params:
                all_params[param.name] = param
        
        # Validate required fields
        for param_name, param in all_params.items():
            if param.required and param_name not in submission.data:
                errors.append(ValidationError(
                    field=param_name,
                    message=f"{param.description} is required",
                    code="required"
                ))
            
            # Validate field content if present
            if param_name in submission.data:
                value = submission.data[param_name]
                
                # String validation
                if hasattr(param.content, 'type') and param.content.type == "string":
                    if hasattr(param.content, 'minLength') and param.content.minLength:
                        if len(str(value)) < param.content.minLength:
                            errors.append(ValidationError(
                                field=param_name,
                                message=f"{param.description} must be at least {param.content.minLength} characters",
                                code="minLength"
                            ))
                    
                    if hasattr(param.content, 'pattern') and param.content.pattern:
                        if not re.match(param.content.pattern, str(value)):
                            errors.append(ValidationError(
                                field=param_name,
                                message=f"{param.description} has invalid format",
                                code="pattern"
                            ))
                
                # Number validation
                if hasattr(param.content, 'type') and param.content.type in ["number", "integer"]:
                    try:
                        num_value = float(value)
                        if hasattr(param.content, 'min') and param.content.min is not None:
                            if num_value < param.content.min:
                                errors.append(ValidationError(
                                    field=param_name,
                                    message=f"{param.description} must be at least {param.content.min}",
                                    code="min"
                                ))
                        
                        if hasattr(param.content, 'max') and param.content.max is not None:
                            if num_value > param.content.max:
                                errors.append(ValidationError(
                                    field=param_name,
                                    message=f"{param.description} must be at most {param.content.max}",
                                    code="max"
                                ))
                    except (ValueError, TypeError):
                        errors.append(ValidationError(
                            field=param_name,
                            message=f"{param.description} must be a number",
                            code="type"
                        ))
    
    return FormValidationResponse(
        valid=len(errors) == 0,
        errors=errors
    )


# ============================================================================
# Form Submission Endpoints
# ============================================================================

@app.post("/api/submit", tags=["Forms"], response_model=FormSubmissionResponse)
async def submit_form(submission: FormSubmission):
    """Submit form data."""
    # Validate first
    validation_result = await validate_form(submission)
    
    if not validation_result.valid:
        return FormSubmissionResponse(
            success=False,
            message="Form validation failed",
            data={"errors": [error.dict() for error in validation_result.errors]}
        )
    
    # Process submission
    submission_record = {
        "formId": submission.formId,
        "data": submission.data,
        "timestamp": None  # Would use datetime in production
    }
    
    submitted_forms.append(submission_record)
    
    # Special handling for user registration
    if submission.formId == "user_registration" and "email" in submission.data:
        registered_emails.add(submission.data["email"].lower())
    
    return FormSubmissionResponse(
        success=True,
        message="Form submitted successfully",
        data={"submissionId": len(submitted_forms)}
    )


@app.get("/api/submissions", tags=["Forms"])
async def get_submissions(
    form_id: Optional[str] = Query(None, description="Filter by form ID")
):
    """Get all form submissions (admin endpoint)."""
    if form_id:
        return [s for s in submitted_forms if s.get("formId") == form_id]
    return submitted_forms


# ============================================================================
# Health Check
# ============================================================================

@app.get("/api/health", tags=["Health"])
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "schemas_loaded": len(SCHEMA_REGISTRY),
        "submissions_count": len(submitted_forms)
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

