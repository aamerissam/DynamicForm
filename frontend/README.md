# Dynamic Form Frontend

Modern React + TypeScript frontend for the Dynamic Form System. Renders forms dynamically based on JSON schemas delivered from the backend API.

## Features

- **Dynamic Form Rendering** - Generates forms from JSON schema
- **TypeScript** - Fully typed with comprehensive interfaces
- **Dependent Fields** - Cascading dropdowns and conditional fields
- **Real-time Validation** - Client-side and async server-side validation
- **Modern UI** - Clean, accessible, responsive design
- **Field Types Supported**:
  - Text fields (single and multi-line)
  - Number fields with prefix/suffix
  - Select dropdowns
  - Dependent/cascading selects
  - Checkboxes and switches
  - Radio button groups
  - Multi-select
  - Range sliders
  - Date/time pickers

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tooling
- **Axios** - HTTP client
- **CSS3** - Modern styling with CSS variables

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

## Configuration

Edit `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

## Running the Application

```bash
# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

The application will start at `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── fields/           # Field components for each input type
│   │   │   ├── TextField.tsx
│   │   │   ├── NumberField.tsx
│   │   │   ├── SelectField.tsx
│   │   │   ├── DependentSelectField.tsx
│   │   │   ├── CheckboxField.tsx
│   │   │   ├── RadioField.tsx
│   │   │   ├── RangeField.tsx
│   │   │   ├── DateField.tsx
│   │   │   ├── MultiSelectField.tsx
│   │   │   ├── SwitchField.tsx
│   │   │   └── index.ts
│   │   └── DynamicForm.tsx   # Main form renderer
│   ├── api.ts                # API client
│   ├── types.ts              # TypeScript definitions
│   ├── App.tsx               # Main application component
│   ├── App.css               # Application styles
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

## Component Overview

### DynamicForm

Main form component that:
- Accepts a `FormSchema` prop
- Renders field components based on parameter types
- Handles form submission and validation
- Manages form state and errors

**Props:**
```typescript
interface DynamicFormProps {
  schema: FormSchema;
  schemaId?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}
```

### Field Components

Each field type has its own component implementing the `BaseFieldProps` interface:

```typescript
interface BaseFieldProps {
  param: Param;
  value: any;
  onChange: (value: any) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  formData: FormData;
}
```

## Usage Example

```typescript
import { DynamicForm } from './components/DynamicForm';
import { getSchema } from './api';

function MyComponent() {
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    getSchema('user_registration').then(setSchema);
  }, []);

  const handleSuccess = (data) => {
    console.log('Form submitted:', data);
  };

  return schema ? (
    <DynamicForm
      schema={schema}
      schemaId="user_registration"
      onSuccess={handleSuccess}
    />
  ) : (
    <p>Loading...</p>
  );
}
```

## API Integration

The frontend communicates with the backend through the `api.ts` module:

```typescript
import { getSchema, submitForm, validateForm } from './api';

// Get a form schema
const schema = await getSchema('ecommerce_filter');

// Submit form data
const result = await submitForm({
  formId: 'user_registration',
  data: { email: 'user@example.com', ... }
});

// Validate form
const validation = await validateForm({
  formId: 'user_registration',
  data: { ... }
});
```

## Styling

The application uses CSS variables for easy theming:

```css
:root {
  --primary-colour: #4f46e5;
  --error-colour: #ef4444;
  --success-colour: #10b981;
  /* ... more variables */
}
```

Modify these in `src/index.css` to customise the theme.

## Type Safety

All schema types are defined in `src/types.ts` and match the backend Pydantic models. This ensures type safety across the entire application.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features required
- CSS Grid and Flexbox support required

## Development Notes

### Adding a New Field Type

1. Create a new component in `src/components/fields/`
2. Export it from `src/components/fields/index.ts`
3. Add a case in `DynamicForm.renderField()`
4. Update the `ParamType` union in `src/types.ts`

### Proxy Configuration

The Vite dev server proxies `/api` requests to the backend. This is configured in `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
  },
}
```

## Accessibility

The form components follow WCAG guidelines:
- Semantic HTML elements
- Proper label associations
- Keyboard navigation support
- Focus management
- ARIA attributes where appropriate

## Performance

- **Code Splitting** - Vite automatically splits code
- **Lazy Loading** - Components loaded on demand
- **Optimised Re-renders** - React optimisations in place
- **Debounced Validation** - Async validation is debounced

## Testing

```bash
# Run linter
npm run lint
```

## Production Build

```bash
# Build for production
npm run build

# Output will be in dist/
# Serve with any static file server
```

## Troubleshooting

### Backend Connection Issues

Ensure:
1. Backend is running on `http://localhost:8000`
2. CORS is properly configured
3. `.env` file has correct `VITE_API_URL`

### Type Errors

Run TypeScript check:
```bash
npm run build
```

### Styling Issues

- Check browser console for CSS errors
- Ensure CSS files are imported in `main.tsx`
- Clear browser cache

## Further Development

Ideas for enhancement:
- Add form field validation indicators
- Implement field-level async validation
- Add file upload support
- Implement conditional field visibility
- Add internationalisation (i18n)
- Add dark mode support
- Implement form autosave
- Add accessibility improvements

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.1.0)

