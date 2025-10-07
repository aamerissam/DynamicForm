# Dynamic Form Parameters Schema

## Overview

This document defines a standardized schema for dynamic form parameter rendering based on OpenAPI 3.1 and JSON Schema specifications. The schema supports dependent fields, complex relationships, and various input types while maintaining standards compliance.

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Schema Structure](#schema-structure)
3. [Parameter Types](#parameter-types)
4. [Content Types](#content-types)
5. [Relationships & Dependencies](#relationships--dependencies)
6. [Validation Rules](#validation-rules)
7. [Examples](#examples)
8. [Best Practices](#best-practices)

---

## Core Concepts

### Design Principles

1. **Standards-Based**: Built on OpenAPI 3.1 and JSON Schema
2. **Declarative**: Frontend renders based on schema, no hardcoding
3. **Extensible**: Custom `x-` properties for specific needs
4. **Type-Safe**: Full TypeScript support via code generation
5. **Validated**: Built-in validation through JSON Schema

### Key Components

```
FormSchema
├── paramCategories[]
    ├── name: string
    ├── description: string
    └── params[]
        ├── name: string
        ├── type: string
        ├── description: string
        ├── required: boolean
        ├── related: string | null
        └── content: ContentType
```

---

## Schema Structure

### Root Schema: FormSchema

```yaml
FormSchema:
  type: object
  required:
    - paramCategories
  properties:
    paramCategories:
      type: array
      items:
        $ref: '#/components/schemas/ParamCategory'
```

### ParamCategory

Groups related parameters together for logical organization.

```yaml
ParamCategory:
  type: object
  required:
    - name
    - params
  properties:
    name:
      type: string
      description: Unique identifier for the category
      example: "product_filters"
    
    description:
      type: string
      description: Human-readable category description
      example: "Product filtering options"
    
    params:
      type: array
      items:
        $ref: '#/components/schemas/Param'
```

**Usage:**
- Group logically related fields (e.g., "Address Information", "Payment Details")
- Can be rendered as sections, tabs, or accordions
- Supports progressive disclosure patterns

### Param

Defines a single form field/parameter.

```yaml
Param:
  type: object
  required:
    - name
    - type
    - content
  properties:
    name:
      type: string
      description: Unique parameter identifier (use snake_case)
      pattern: "^[a-z][a-z0-9_]*$"
      example: "product_category"
    
    type:
      type: string
      description: Parameter input type
      enum:
        - list                # Single-select dropdown
        - sub_list            # Dependent dropdown
        - text_field          # Text input
        - number_field        # Numeric input
        - date_field          # Date picker
        - datetime_field      # Date and time picker
        - time_field          # Time picker
        - range               # Range slider
        - checkbox            # Single checkbox
        - radio               # Radio button group
        - multi_select        # Multi-select dropdown
        - textarea            # Multi-line text
        - file_upload         # File upload
        - color_picker        # Color selector
        - switch              # Toggle switch
    
    description:
      type: string
      description: Human-readable field description/label
      example: "Select product category"
    
    required:
      type: boolean
      description: Whether field is required for form submission
      default: false
    
    related:
      type: string
      nullable: true
      description: Name of parent parameter this field depends on
      example: "category"
    
    content:
      description: Type-specific configuration
      oneOf:
        - $ref: '#/components/schemas/EnumContent'
        - $ref: '#/components/schemas/DependentEnumContent'
        - $ref: '#/components/schemas/StringContent'
        - $ref: '#/components/schemas/NumberContent'
        - $ref: '#/components/schemas/DateContent'
        - $ref: '#/components/schemas/RangeContent'
```

---

## Parameter Types

### 1. List (Single Select Dropdown)

**Use Case:** Select one option from a predefined list

```yaml
type: list
content:
  type: enum
  values:
    - label: "Electronics"
      value: "electronics"
    - label: "Clothing"
      value: "clothing"
```

**Properties:**
- Static options defined in schema
- Single selection only
- Good for stable, small option sets (< 50 items)

### 2. Sub-List (Dependent Dropdown)

**Use Case:** Cascading dropdowns where options depend on another field

```yaml
type: sub_list
related: "category"
content:
  type: dependent_enum
  dependsOn: "category"
  mapping:
    electronics:
      - label: "Phones"
        value: "phones"
    clothing:
      - label: "Men"
        value: "men"
```

**Properties:**
- Options change based on parent field value
- Automatically disabled until parent is selected
- Frontend clears value when parent changes

### 3. Text Field

**Use Case:** Free-form text input

```yaml
type: text_field
content:
  type: string
  minLength: 3
  maxLength: 100
  pattern: "^[A-Za-z0-9 ]+$"
  placeholder: "Enter product name..."
```

### 4. Number Field

**Use Case:** Numeric input with validation

```yaml
type: number_field
content:
  type: number
  min: 0
  max: 1000
  step: 0.01
  placeholder: "0.00"
```

### 5. Date Field

**Use Case:** Date selection

```yaml
type: date_field
content:
  type: date
  format: "YYYY-MM-DD"
  min: "2020-01-01"
  max: "2030-12-31"
```

### 6. Range Slider

**Use Case:** Select value from continuous range

```yaml
type: range
content:
  type: number_range
  min: 0
  max: 10000
  step: 100
  defaultValue: [0, 5000]
  showLabels: true
  currency: "USD"
```

### 7. Multi-Select

**Use Case:** Select multiple options

```yaml
type: multi_select
content:
  type: enum
  multiple: true
  maxSelections: 5
  values:
    - label: "Option 1"
      value: "opt1"
```

### 8. Radio Group

**Use Case:** Single selection with all options visible

```yaml
type: radio
content:
  type: enum
  layout: "vertical"  # or "horizontal"
  values:
    - label: "Small"
      value: "S"
```

---

## Content Types

### EnumContent

For static list of options.

```yaml
EnumContent:
  type: object
  required:
    - type
    - values
  properties:
    type:
      type: string
      enum: [enum]
    
    values:
      type: array
      items:
        type: object
        required:
          - label
          - value
        properties:
          label:
            type: string
            description: Display text
          value:
            type: string
            description: Actual value submitted
          icon:
            type: string
            description: Icon identifier (optional)
          disabled:
            type: boolean
            description: Whether option is disabled
          tooltip:
            type: string
            description: Additional help text
```

### DependentEnumContent

For dynamic options based on another field.

```yaml
DependentEnumContent:
  type: object
  required:
    - type
    - dependsOn
  properties:
    type:
      type: string
      enum: [dependent_enum]
    
    dependsOn:
      type: string
      description: Parent parameter name
    
    source:
      type: string
      description: API endpoint for dynamic loading
      example: "/api/subcategories?parent={category}"
    
    mapping:
      type: object
      description: Static mapping of parent to child options
      additionalProperties:
        type: array
        items:
          $ref: '#/components/schemas/EnumValue'
    
    cascadeReset:
      type: boolean
      description: Clear this field when parent changes
      default: true
```

**Loading Strategies:**

1. **Static Mapping** (Recommended for < 1000 total options)
```yaml
mapping:
  parent_value_1: [child_options]
  parent_value_2: [child_options]
```

2. **Dynamic Loading** (For large datasets)
```yaml
source: "/api/options?parent={parentField}"
```

3. **Hybrid** (Best of both)
```yaml
mapping:  # Fallback/cache
  common_value: [options]
source: "/api/options"  # Load if needed
```

### StringContent

For text-based inputs.

```yaml
StringContent:
  type: object
  required:
    - type
  properties:
    type:
      type: string
      enum: [string]
    
    minLength:
      type: integer
      minimum: 0
    
    maxLength:
      type: integer
    
    pattern:
      type: string
      description: Regex pattern for validation
      example: "^[A-Za-z0-9]+$"
    
    placeholder:
      type: string
    
    multiline:
      type: boolean
      description: Render as textarea if true
      default: false
    
    rows:
      type: integer
      description: Textarea rows (if multiline)
      default: 3
```

### NumberContent

For numeric inputs.

```yaml
NumberContent:
  type: object
  required:
    - type
  properties:
    type:
      type: string
      enum: [number, integer]
    
    min:
      type: number
    
    max:
      type: number
    
    step:
      type: number
      description: Increment step
      default: 1
    
    placeholder:
      type: string
    
    prefix:
      type: string
      description: Prefix symbol (e.g., "$")
    
    suffix:
      type: string
      description: Suffix symbol (e.g., "kg")
```

### DateContent

For date/time inputs.

```yaml
DateContent:
  type: object
  required:
    - type
  properties:
    type:
      type: string
      enum: [date, datetime, time]
    
    format:
      type: string
      description: Display format
      examples:
        - "YYYY-MM-DD"
        - "MM/DD/YYYY"
        - "HH:mm:ss"
    
    min:
      type: string
      description: Minimum date/time
    
    max:
      type: string
      description: Maximum date/time
    
    disabledDates:
      type: array
      items:
        type: string
      description: Array of disabled dates
```

### RangeContent

For range sliders.

```yaml
RangeContent:
  type: object
  required:
    - type
    - min
    - max
  properties:
    type:
      type: string
      enum: [number_range]
    
    min:
      type: number
    
    max:
      type: number
    
    step:
      type: number
      default: 1
    
    defaultValue:
      type: array
      items:
        type: number
      minItems: 1
      maxItems: 2
      description: Default value(s) [single or range]
    
    showLabels:
      type: boolean
      default: true
    
    currency:
      type: string
      description: Currency code for price ranges
```

---

## Relationships & Dependencies

### Simple Parent-Child Relationship

```yaml
# Parent field
- name: "country"
  type: "list"
  related: null
  content:
    type: "enum"
    values:
      - label: "USA"
        value: "US"

# Child field
- name: "state"
  type: "sub_list"
  related: "country"  # Points to parent
  content:
    type: "dependent_enum"
    dependsOn: "country"
    mapping:
      US:
        - label: "California"
          value: "CA"
```

### Multi-Level Dependencies

```yaml
# Level 1
- name: "country"
  type: "list"
  related: null

# Level 2
- name: "state"
  type: "sub_list"
  related: "country"

# Level 3
- name: "city"
  type: "sub_list"
  related: "state"
  content:
    type: "dependent_enum"
    dependsOn: "state"
```

### Multiple Parent Dependencies

For complex scenarios where a field depends on multiple parents:

```yaml
- name: "city"
  type: "sub_list"
  related: ["country", "state"]  # Array of parents
  content:
    type: "dependent_enum"
    dependsOn: ["country", "state"]
    source: "/api/cities?country={country}&state={state}"
```

### Conditional Visibility

Use custom extension for conditional display:

```yaml
- name: "tax_id"
  type: "text_field"
  x-visibility:
    condition: "country == 'US'"
  content:
    type: "string"
```

---

## Validation Rules

### Built-in Validation

JSON Schema provides automatic validation:

```yaml
content:
  type: string
  minLength: 5          # Minimum length
  maxLength: 50         # Maximum length
  pattern: "^[A-Z].*"   # Regex pattern
```

### Custom Validation Rules

Use `x-validation` extension:

```yaml
x-validation:
  - rule: "email_format"
    message: "Please enter a valid email"
    pattern: "^[^@]+@[^@]+\\.[^@]+$"
  
  - rule: "custom_check"
    message: "Value must be unique"
    endpoint: "/api/validate/unique"
    async: true
```

### Cross-Field Validation

```yaml
x-validation:
  - rule: "date_range"
    message: "End date must be after start date"
    condition: "date_end > date_start"
    fields: ["date_start", "date_end"]
```

---

## Examples

### Example 1: E-commerce Product Filter

```yaml
paramCategories:
  - name: "product_filters"
    description: "Filter Products"
    params:
      - name: "category"
        type: "list"
        description: "Category"
        required: true
        related: null
        content:
          type: "enum"
          values:
            - label: "Electronics"
              value: "electronics"
              icon: "laptop"
            - label: "Clothing"
              value: "clothing"
              icon: "shirt"
      
      - name: "subcategory"
        type: "sub_list"
        description: "Subcategory"
        required: false
        related: "category"
        content:
          type: "dependent_enum"
          dependsOn: "category"
          mapping:
            electronics:
              - label: "Laptops"
                value: "laptops"
              - label: "Phones"
                value: "phones"
            clothing:
              - label: "Men"
                value: "men"
              - label: "Women"
                value: "women"
      
      - name: "price_range"
        type: "range"
        description: "Price Range"
        required: false
        related: null
        content:
          type: "number_range"
          min: 0
          max: 5000
          step: 50
          defaultValue: [0, 2500]
          currency: "USD"
      
      - name: "in_stock"
        type: "checkbox"
        description: "In Stock Only"
        required: false
        related: null
        content:
          type: "boolean"
          defaultValue: true
```

### Example 2: User Registration Form

```yaml
paramCategories:
  - name: "basic_info"
    description: "Basic Information"
    params:
      - name: "email"
        type: "text_field"
        description: "Email Address"
        required: true
        related: null
        content:
          type: "string"
          pattern: "^[^@]+@[^@]+\\.[^@]+$"
          placeholder: "you@example.com"
        x-validation:
          - rule: "unique_email"
            endpoint: "/api/validate/email"
            async: true
            debounce: 500
      
      - name: "password"
        type: "text_field"
        description: "Password"
        required: true
        related: null
        content:
          type: "string"
          minLength: 8
          pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$"
        x-ui-hints:
          inputType: "password"
          showStrengthMeter: true
      
      - name: "birth_date"
        type: "date_field"
        description: "Date of Birth"
        required: true
        related: null
        content:
          type: "date"
          max: "2010-01-01"  # Must be 13+ years old
  
  - name: "address"
    description: "Address Information"
    params:
      - name: "country"
        type: "list"
        description: "Country"
        required: true
        related: null
        content:
          type: "enum"
          values:
            - label: "United States"
              value: "US"
            - label: "Canada"
              value: "CA"
      
      - name: "postal_code"
        type: "text_field"
        description: "Postal Code"
        required: true
        related: "country"
        content:
          type: "string"
          pattern: "^[0-9]{5}$"
        x-visibility:
          condition: "country == 'US'"
```

### Example 3: Dynamic API Loading

```yaml
params:
  - name: "country"
    type: "list"
    description: "Country"
    required: true
    related: null
    content:
      type: "enum"
      source: "/api/countries"  # Load from API
      cacheDuration: 3600       # Cache for 1 hour
  
  - name: "city"
    type: "sub_list"
    description: "City"
    required: true
    related: "country"
    content:
      type: "dependent_enum"
      dependsOn: "country"
      source: "/api/cities?country={country}"
      searchable: true           # Enable search/autocomplete
      minSearchLength: 2         # Start search after 2 chars
```

---

## Best Practices

### 1. Naming Conventions

- **Parameter names**: Use `snake_case` (e.g., `product_category`)
- **Category names**: Use `snake_case` (e.g., `user_preferences`)
- **Values**: Use `lowercase` or `snake_case` (e.g., `electronics`, `new_york`)

### 2. Performance Optimization

- Use static `mapping` for < 1000 total options
- Use `source` API for large datasets
- Implement pagination for > 100 options in dropdown
- Add `searchable: true` for lists with > 20 items
- Cache API responses with `cacheDuration`

### 3. User Experience

- Provide clear `description` for each field
- Use `placeholder` text for input guidance
- Add `tooltip` for complex options
- Group related fields in same `paramCategory`
- Order fields logically (general → specific)

### 4. Validation

- Always validate on both frontend and backend
- Use `pattern` for format validation
- Use `min`/`max` for range validation
- Provide clear error messages
- Use async validation sparingly (debounce properly)

### 5. Accessibility

- Always include `description` (becomes label)
- Use semantic `type` values
- Include `aria-*` hints via `x-ui-hints`
- Ensure proper tab order
- Support keyboard navigation

### 6. Error Handling

```yaml
x-error-messages:
  required: "This field is required"
  pattern: "Please enter a valid format"
  minLength: "Must be at least {min} characters"
  custom: "Custom validation failed"
```

### 7. Security

- Never trust client-side validation alone
- Sanitize all inputs on backend
- Use HTTPS for API endpoints
- Implement rate limiting for validation endpoints
- Don't expose sensitive data in `mapping`

---

## Version History

- **v1.0.0** (2025-10-07): Initial schema definition
- Based on OpenAPI 3.1.0 and JSON Schema Draft 2020-12

## References

- [OpenAPI 3.1 Specification](https://spec.openapis.org/oas/v3.1.0)
- [JSON Schema Documentation](https://json-schema.org/)
- [JSON Schema Validation](https://json-schema.org/draft/2020-12/json-schema-validation.html)