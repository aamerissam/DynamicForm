import React, { useState } from 'react';
import type { FormSchema, FormData, Param, ValidationError } from '../types';
import { submitForm, validateForm } from '../api';
import {
  TextField,
  NumberField,
  SelectField,
  DependentSelectField,
  CheckboxField,
  RadioField,
  RangeField,
  DateField,
  MultiSelectField,
  SwitchField,
} from './fields';

interface DynamicFormProps {
  schema: FormSchema;
  schemaId?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  schemaId,
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error for this field
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const renderField = (param: Param) => {
    const baseProps = {
      param,
      value: formData[param.name],
      onChange: (value: any) => handleFieldChange(param.name, value),
      error: errors[param.name],
      formData,
    };

    switch (param.type) {
      case 'text_field':
        return <TextField key={param.name} {...baseProps} />;

      case 'textarea':
        return <TextField key={param.name} {...baseProps} />;

      case 'number_field':
        return <NumberField key={param.name} {...baseProps} />;

      case 'list':
        return <SelectField key={param.name} {...baseProps} />;

      case 'sub_list':
        return <DependentSelectField key={param.name} {...baseProps} />;

      case 'checkbox':
        return <CheckboxField key={param.name} {...baseProps} />;

      case 'radio':
        return <RadioField key={param.name} {...baseProps} />;

      case 'range':
        return <RangeField key={param.name} {...baseProps} />;

      case 'date_field':
      case 'datetime_field':
      case 'time_field':
        return <DateField key={param.name} {...baseProps} />;

      case 'multi_select':
        return <MultiSelectField key={param.name} {...baseProps} />;

      case 'switch':
        return <SwitchField key={param.name} {...baseProps} />;

      default:
        return (
          <div key={param.name} className="field-wrapper">
            <p className="field-error">
              Unsupported field type: {param.type}
            </p>
          </div>
        );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    setErrors({});

    try {
      // Validate form
      const validationResult = await validateForm({
        formId: schemaId,
        data: formData,
      });

      if (!validationResult.valid) {
        const fieldErrors: Record<string, string> = {};
        validationResult.errors.forEach((error: ValidationError) => {
          fieldErrors[error.field] = error.message;
        });
        setErrors(fieldErrors);
        setSubmitMessage({
          type: 'error',
          text: 'Please correct the errors below.',
        });
        setIsSubmitting(false);
        return;
      }

      // Submit form
      const result = await submitForm({
        formId: schemaId,
        data: formData,
      });

      if (result.success) {
        setSubmitMessage({
          type: 'success',
          text: result.message,
        });
        if (onSuccess) {
          onSuccess(result.data);
        }
        // Reset form
        setFormData({});
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.message,
        });
        if (onError) {
          onError(result);
        }
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'An error occurred while submitting the form.',
      });
      if (onError) {
        onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="dynamic-form" onSubmit={handleSubmit}>
      {submitMessage && (
        <div className={`submit-message ${submitMessage.type}`}>
          {submitMessage.text}
        </div>
      )}

      {schema.paramCategories.map((category) => (
        <div key={category.name} className="form-category">
          <h2 className="category-title">{category.description || category.name}</h2>
          <div className="category-fields">
            {category.params.map((param) => renderField(param))}
          </div>
        </div>
      ))}

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setFormData({});
            setErrors({});
            setSubmitMessage(null);
          }}
          disabled={isSubmitting}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

