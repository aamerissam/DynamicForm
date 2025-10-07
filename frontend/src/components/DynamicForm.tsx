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
    <form className="space-y-8" onSubmit={handleSubmit}>
      {submitMessage && (
        <div className={`alert ${submitMessage.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          <div className="flex items-center space-x-2">
            {submitMessage.type === 'success' ? (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span>{submitMessage.text}</span>
          </div>
        </div>
      )}

      {schema.paramCategories.map((category) => (
        <div key={category.name} className="form-category">
          <h2 className="category-title">{category.description || category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {category.params.map((param) => renderField(param))}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setFormData({});
            setErrors({});
            setSubmitMessage(null);
          }}
          disabled={isSubmitting}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Form
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner mr-2"></span>
              Submitting...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Submit Form
            </>
          )}
        </button>
      </div>
    </form>
  );
};

