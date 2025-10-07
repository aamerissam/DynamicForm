# Demo Guide - Exploring the Dynamic Form System

Welcome to the Dynamic Form System! This guide will help you explore all the features and capabilities of the application.

## 🎯 What You'll Learn

After following this guide, you'll understand:
- How dynamic forms work
- Different field types and their uses
- Dependent field relationships
- Form validation
- API integration

## 🚀 Getting Started

### 1. Deploy the Application

Run the deployment script for your platform:

**Windows (PowerShell):**
```powershell
.\deploy-windows.ps1
```

**Mac/Linux:**
```bash
chmod +x deploy-unix.sh
./deploy-unix.sh
```

### 2. Access the Application

Once deployed, open your browser to:
- **Frontend**: http://localhost:5173
- **API Docs**: http://localhost:8000/docs

## 📚 Exploring the Demo Forms

The system includes three example forms that demonstrate different capabilities.

### Demo 1: E-commerce Product Filter

**Purpose**: Product filtering with cascading categories

**Location**: Select "E-commerce Filter" from the dropdown

**Features to Try**:

1. **Basic Fields**:
   - Enter a search query (text field)
   - Select a price range (slider)

2. **Cascading Dropdowns**:
   - Select a category (e.g., "Electronics")
   - Watch the subcategory dropdown populate automatically
   - Select a subcategory (e.g., "Laptops")
   - Notice how subcategories change based on category

3. **Multi-Select**:
   - Choose multiple brands
   - Notice validation if you select too many

4. **Switches and Checkboxes**:
   - Toggle "In Stock Only"
   - Enable "Free Shipping"

**What to Observe**:
- ✅ Subcategory field is disabled until you select a category
- ✅ Subcategory options change based on selected category
- ✅ Subcategory resets when you change the category
- ✅ All fields maintain their state during interaction

### Demo 2: User Registration Form

**Purpose**: Multi-category form with complex validation

**Location**: Select "User Registration" from the dropdown

**Features to Try**:

1. **Personal Information**:
   - Enter full name (2-100 characters required)
   - Enter email (with proper format validation)
   - Enter username (alphanumeric, 3-20 characters)

2. **Security**:
   - Create a password (8+ characters, with validation)
   - Confirm password (must match)
   - Notice real-time password strength indicator

3. **Contact Details**:
   - Select country code
   - Enter phone number
   - Watch format validation

4. **Address Information**:
   - Enter street address
   - Enter city
   - Enter postal code
   - Select country

5. **Preferences**:
   - Select preferred language
   - Choose notification preferences
   - Toggle newsletter subscription
   - Set communication frequency

6. **Agreements**:
   - Accept terms and conditions (required)
   - Optional privacy policy acceptance

**What to Observe**:
- ✅ Field-level validation (red border for errors)
- ✅ Required field indicators (*)
- ✅ Password strength feedback
- ✅ Email format validation
- ✅ Form cannot submit until all required fields are valid
- ✅ Success message after submission

### Demo 3: Location Selector

**Purpose**: Three-level cascading selection

**Location**: Select "Location Selector" from the dropdown

**Features to Try**:

1. **Level 1 - Country**:
   - Select a country (e.g., "United States")
   - Notice region dropdown activates

2. **Level 2 - Region**:
   - Select a region (e.g., "California")
   - Notice city dropdown activates
   - Try changing country - watch region reset

3. **Level 3 - City**:
   - Select a city (e.g., "Los Angeles")
   - Try changing region - watch city reset

4. **Additional Options**:
   - Select timezone (dependent on country)
   - Choose language

**What to Observe**:
- ✅ Three-level dependency chain
- ✅ Cascade reset behaviour
- ✅ Disabled states for dependent fields
- ✅ Loading states when fetching options
- ✅ Clean reset flow when parent changes

## 🎨 Field Types Showcase

### Input Fields

| Field Type | Try It In | What to Test |
|------------|-----------|--------------|
| **Text Field** | User Registration → Full Name | Min/max length, required validation |
| **Textarea** | (Add custom schema) | Multi-line text entry |
| **Number Field** | (Custom schema) | Numeric input, min/max values |
| **Email Field** | User Registration → Email | Email format validation |

### Selection Fields

| Field Type | Try It In | What to Test |
|------------|-----------|--------------|
| **Dropdown (List)** | E-commerce → Category | Single selection from options |
| **Dependent Dropdown** | E-commerce → Subcategory | Options change based on parent |
| **Multi-Select** | E-commerce → Brands | Multiple selections |
| **Radio Buttons** | User Registration → Language | Exclusive choice |

### Boolean Fields

| Field Type | Try It In | What to Test |
|------------|-----------|--------------|
| **Checkbox** | User Registration → Terms | Boolean acceptance |
| **Switch** | E-commerce → In Stock Only | Toggle on/off |

### Other Fields

| Field Type | Try It In | What to Test |
|------------|-----------|--------------|
| **Range Slider** | E-commerce → Price Range | Min/max value selection |
| **Date Field** | (Custom schema) | Date picker |
| **Time Field** | (Custom schema) | Time selection |

## 🔍 Testing Validation

### Client-Side Validation

1. **Required Fields**:
   - Leave a required field empty
   - Try to submit
   - See error message

2. **Format Validation**:
   - Enter invalid email format
   - See real-time error
   - Correct it and watch error disappear

3. **Length Validation**:
   - Enter too short/long text
   - See validation error
   - Correct to valid length

### Server-Side Validation

1. Submit a complete form
2. Watch the validation request in Network tab
3. See server response validation

## 🛠️ Exploring the API

### 1. Open API Documentation

Visit: http://localhost:8000/docs

### 2. Try These Endpoints

**Get All Schemas**:
```
GET /api/schemas
```
- See all available form schemas

**Get Specific Schema**:
```
GET /api/schemas/user_registration
```
- See the complete schema definition

**Get Countries**:
```
GET /api/countries
```
- See available countries data

**Get Dependent Data**:
```
GET /api/cities?country=US
```
- See how dependent data is fetched

**Validate Form**:
```
POST /api/validate
{
  "formId": "user_registration",
  "data": {
    "full_name": "John Doe",
    "email": "john@example.com"
  }
}
```
- Test validation logic

**Submit Form**:
```
POST /api/submit
{
  "formId": "user_registration",
  "data": { ... }
}
```
- Submit form data

## 🎯 Advanced Exploration

### 1. Modify a Schema

**Edit**: `backend/example_schemas.py`

Try adding a new field:
```python
Param(
    name="favorite_colour",
    type="text_field",
    description="Favourite Colour",
    required=False,
    content=StringContent(type="string")
)
```

**Restart backend** and see the new field appear!

### 2. Create Your Own Schema

Follow the structure in `example_schemas.py`:

```python
MY_CUSTOM_FORM = FormSchema(
    paramCategories=[
        ParamCategory(
            name="my_category",
            description="My Category",
            params=[
                # Add your fields here
            ]
        )
    ]
)

# Register it
SCHEMA_REGISTRY["my_custom_form"] = MY_CUSTOM_FORM
```

### 3. Test Dependent Fields

Create your own cascading relationship:

```python
# Parent field
Param(
    name="department",
    type="list",
    description="Department",
    required=True,
    content=EnumContent(
        type="string",
        enum=[
            EnumValue(label="Sales", value="sales"),
            EnumValue(label="Engineering", value="eng")
        ]
    )
)

# Child field
Param(
    name="team",
    type="sub_list",
    description="Team",
    required=True,
    content=DependentEnumContent(
        type="string",
        dependsOn="department",
        mapping={
            "sales": [
                EnumValue(label="Inside Sales", value="inside"),
                EnumValue(label="Field Sales", value="field")
            ],
            "eng": [
                EnumValue(label="Frontend", value="frontend"),
                EnumValue(label="Backend", value="backend")
            ]
        }
    )
)
```

### 4. Monitor Network Traffic

Open Browser DevTools → Network tab:
- Watch schema fetches
- See validation requests
- Observe form submissions
- Check dependent data loading

### 5. Test Error Handling

Try these scenarios:
- Submit incomplete form
- Enter invalid data formats
- Change parent field rapidly (test cascade)
- Submit with all fields valid

## 📱 Responsive Testing

Test the forms on different screen sizes:
1. Desktop (full width)
2. Tablet (resize browser to ~768px)
3. Mobile (resize to ~375px)

Notice how the layout adapts!

## ✅ Checklist: Features to Verify

- [ ] All three demo forms load successfully
- [ ] Text input fields accept and validate input
- [ ] Dropdowns populate with options
- [ ] Dependent dropdowns update based on parent
- [ ] Cascade reset works (changing parent resets child)
- [ ] Multi-select allows multiple choices
- [ ] Range slider moves smoothly
- [ ] Checkboxes and switches toggle
- [ ] Required field validation works
- [ ] Email format validation works
- [ ] Form submission succeeds with valid data
- [ ] Form submission fails with invalid data
- [ ] Error messages display clearly
- [ ] Success messages appear after submission
- [ ] API documentation is accessible
- [ ] Loading states show during data fetch

## 🎓 Learning Outcomes

By exploring these demos, you've learned:

✅ **Dynamic Form Rendering** - Forms generated from JSON schema  
✅ **Field Types** - Various input types and their uses  
✅ **Dependent Fields** - Cascading relationships between fields  
✅ **Validation** - Client and server-side validation  
✅ **API Integration** - How frontend communicates with backend  
✅ **User Experience** - Loading states, error handling, feedback  
✅ **Extensibility** - How to add your own fields and forms  

## 🚀 Next Steps

Ready to build your own forms?

1. **Read the Documentation**:
   - [README.md](README.md) - Project overview
   - [params_schema_md.md](params_schema_md.md) - Complete schema specification
   - [SETUP.md](SETUP.md) - Production deployment

2. **Explore the Code**:
   - `backend/models.py` - Schema definitions
   - `frontend/src/components/fields/` - Field components
   - `frontend/src/components/DynamicForm.tsx` - Form renderer

3. **Build Something**:
   - Create a custom form for your use case
   - Add new field types
   - Extend validation rules
   - Integrate with your database

## 💡 Tips for Best Results

- **Start Simple**: Begin with basic fields, add complexity gradually
- **Test Validation**: Always test required fields and formats
- **Use Dependencies Wisely**: Don't create too many nested dependencies
- **Follow Standards**: Stick to OpenAPI 3.1 and JSON Schema conventions
- **Check Console**: Browser console shows helpful debug info
- **Read API Docs**: The `/docs` endpoint is your friend

## 🆘 Having Issues?

Check the troubleshooting sections:
- [DEPLOYMENT.md](DEPLOYMENT.md#troubleshooting)
- [README.md](README.md#troubleshooting)
- [QUICKSTART.md](QUICKSTART.md#troubleshooting)

## 🎉 Enjoy Exploring!

Have fun trying out the Dynamic Form System. This architecture can handle virtually any form requirement while keeping your code clean and maintainable.

**Happy form building! 🚀**

