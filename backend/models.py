"""
Pydantic models for the Dynamic Form Schema.
Based on OpenAPI 3.1 and JSON Schema specifications.
"""

from typing import Any, Dict, List, Literal, Optional, Union
from pydantic import BaseModel, Field, field_validator
import re


# ============================================================================
# Content Type Models
# ============================================================================

class EnumValue(BaseModel):
    """Single option in an enumeration."""
    label: str = Field(..., description="Display text for the option")
    value: str = Field(..., description="Actual value submitted")
    icon: Optional[str] = Field(None, description="Icon identifier")
    disabled: Optional[bool] = Field(False, description="Whether option is disabled")
    tooltip: Optional[str] = Field(None, description="Additional help text")


class EnumContent(BaseModel):
    """Content for static list of options."""
    type: Literal["enum"] = "enum"
    values: List[EnumValue] = Field(..., description="List of options")
    multiple: Optional[bool] = Field(False, description="Allow multiple selections")
    maxSelections: Optional[int] = Field(None, description="Maximum selections (for multiple)")
    layout: Optional[Literal["vertical", "horizontal"]] = Field(None, description="Layout for radio groups")
    source: Optional[str] = Field(None, description="API endpoint for dynamic loading")
    cacheDuration: Optional[int] = Field(None, description="Cache duration in seconds")
    searchable: Optional[bool] = Field(False, description="Enable search/autocomplete")


class DependentEnumContent(BaseModel):
    """Content for options that depend on another field."""
    type: Literal["dependent_enum"] = "dependent_enum"
    dependsOn: Union[str, List[str]] = Field(..., description="Parent parameter name(s)")
    mapping: Optional[Dict[str, List[EnumValue]]] = Field(None, description="Static mapping of parent to child options")
    source: Optional[str] = Field(None, description="API endpoint for dynamic loading")
    cascadeReset: Optional[bool] = Field(True, description="Clear this field when parent changes")
    searchable: Optional[bool] = Field(False, description="Enable search/autocomplete")
    minSearchLength: Optional[int] = Field(2, description="Minimum characters before search")


class StringContent(BaseModel):
    """Content for text-based inputs."""
    type: Literal["string"] = "string"
    minLength: Optional[int] = Field(None, ge=0, description="Minimum length")
    maxLength: Optional[int] = Field(None, description="Maximum length")
    pattern: Optional[str] = Field(None, description="Regex pattern for validation")
    placeholder: Optional[str] = Field(None, description="Placeholder text")
    multiline: Optional[bool] = Field(False, description="Render as textarea if true")
    rows: Optional[int] = Field(3, description="Textarea rows (if multiline)")


class NumberContent(BaseModel):
    """Content for numeric inputs."""
    type: Literal["number", "integer"] = "number"
    min: Optional[float] = Field(None, description="Minimum value")
    max: Optional[float] = Field(None, description="Maximum value")
    step: Optional[float] = Field(1, description="Increment step")
    placeholder: Optional[str] = Field(None, description="Placeholder text")
    prefix: Optional[str] = Field(None, description="Prefix symbol (e.g., '$')")
    suffix: Optional[str] = Field(None, description="Suffix symbol (e.g., 'kg')")


class DateContent(BaseModel):
    """Content for date/time inputs."""
    type: Literal["date", "datetime", "time"] = "date"
    format: Optional[str] = Field(None, description="Display format")
    min: Optional[str] = Field(None, description="Minimum date/time")
    max: Optional[str] = Field(None, description="Maximum date/time")
    disabledDates: Optional[List[str]] = Field(None, description="Array of disabled dates")


class RangeContent(BaseModel):
    """Content for range sliders."""
    type: Literal["number_range"] = "number_range"
    min: float = Field(..., description="Minimum value")
    max: float = Field(..., description="Maximum value")
    step: Optional[float] = Field(1, description="Increment step")
    defaultValue: Optional[List[float]] = Field(None, min_length=1, max_length=2, description="Default value(s)")
    showLabels: Optional[bool] = Field(True, description="Show labels")
    currency: Optional[str] = Field(None, description="Currency code for price ranges")


class BooleanContent(BaseModel):
    """Content for boolean inputs (checkbox, switch)."""
    type: Literal["boolean"] = "boolean"
    defaultValue: Optional[bool] = Field(False, description="Default value")


# Union of all content types
ContentType = Union[
    EnumContent,
    DependentEnumContent,
    StringContent,
    NumberContent,
    DateContent,
    RangeContent,
    BooleanContent
]


# ============================================================================
# Validation and UI Extension Models
# ============================================================================

class ValidationRule(BaseModel):
    """Custom validation rule."""
    rule: str = Field(..., description="Rule identifier")
    message: str = Field(..., description="Error message")
    pattern: Optional[str] = Field(None, description="Regex pattern")
    endpoint: Optional[str] = Field(None, description="API endpoint for validation")
    async_: Optional[bool] = Field(None, alias="async", description="Async validation")
    debounce: Optional[int] = Field(None, description="Debounce time in ms")
    condition: Optional[str] = Field(None, description="Condition expression")
    fields: Optional[List[str]] = Field(None, description="Related fields")


class VisibilityCondition(BaseModel):
    """Conditional visibility settings."""
    condition: str = Field(..., description="Condition expression")


class UIHints(BaseModel):
    """UI-specific hints and preferences."""
    inputType: Optional[str] = Field(None, description="HTML input type")
    showStrengthMeter: Optional[bool] = Field(None, description="Show password strength meter")
    autocomplete: Optional[str] = Field(None, description="Autocomplete attribute")


# ============================================================================
# Parameter and Category Models
# ============================================================================

class Param(BaseModel):
    """Single form parameter/field."""
    name: str = Field(
        ...,
        pattern=r"^[a-z][a-z0-9_]*$",
        description="Unique parameter identifier (snake_case)"
    )
    type: Literal[
        "list",
        "sub_list",
        "text_field",
        "number_field",
        "date_field",
        "datetime_field",
        "time_field",
        "range",
        "checkbox",
        "radio",
        "multi_select",
        "textarea",
        "file_upload",
        "color_picker",
        "switch"
    ] = Field(..., description="Parameter input type")
    description: str = Field(..., description="Human-readable field description/label")
    required: bool = Field(False, description="Whether field is required")
    related: Optional[Union[str, List[str]]] = Field(None, description="Parent parameter(s) this field depends on")
    content: ContentType = Field(..., description="Type-specific configuration")
    
    # Extensions
    x_validation: Optional[List[ValidationRule]] = Field(None, alias="x-validation")
    x_visibility: Optional[VisibilityCondition] = Field(None, alias="x-visibility")
    x_ui_hints: Optional[UIHints] = Field(None, alias="x-ui-hints")
    x_error_messages: Optional[Dict[str, str]] = Field(None, alias="x-error-messages")

    class Config:
        populate_by_name = True


class ParamCategory(BaseModel):
    """Group of related parameters."""
    name: str = Field(..., description="Unique identifier for the category")
    description: Optional[str] = Field(None, description="Human-readable category description")
    params: List[Param] = Field(..., description="List of parameters in this category")


class FormSchema(BaseModel):
    """Root schema for dynamic form."""
    paramCategories: List[ParamCategory] = Field(..., description="List of parameter categories")

    @field_validator('paramCategories')
    @classmethod
    def validate_categories(cls, v):
        """Validate that category names are unique."""
        names = [cat.name for cat in v]
        if len(names) != len(set(names)):
            raise ValueError("Category names must be unique")
        return v

    @field_validator('paramCategories')
    @classmethod
    def validate_params(cls, v):
        """Validate parameter relationships and uniqueness."""
        all_params = {}
        
        for category in v:
            for param in category.params:
                # Check uniqueness across all categories
                if param.name in all_params:
                    raise ValueError(f"Parameter name '{param.name}' is duplicated")
                all_params[param.name] = param
        
        # Validate relationships
        for param_name, param in all_params.items():
            if param.related:
                related_names = param.related if isinstance(param.related, list) else [param.related]
                for related_name in related_names:
                    if related_name not in all_params:
                        raise ValueError(f"Parameter '{param_name}' references non-existent parent '{related_name}'")
        
        return v


# ============================================================================
# Form Submission Models
# ============================================================================

class FormSubmission(BaseModel):
    """Form submission data."""
    formId: Optional[str] = Field(None, description="Form identifier")
    data: Dict[str, Any] = Field(..., description="Form field values")


class ValidationError(BaseModel):
    """Validation error details."""
    field: str = Field(..., description="Field name with error")
    message: str = Field(..., description="Error message")
    code: str = Field(..., description="Error code")


class FormValidationResponse(BaseModel):
    """Response for form validation."""
    valid: bool = Field(..., description="Whether form is valid")
    errors: List[ValidationError] = Field(default_factory=list, description="List of validation errors")


class FormSubmissionResponse(BaseModel):
    """Response for form submission."""
    success: bool = Field(..., description="Whether submission was successful")
    message: str = Field(..., description="Response message")
    data: Optional[Dict[str, Any]] = Field(None, description="Response data")

