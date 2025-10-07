import React from 'react';
import type { BaseFieldProps, StringContent } from '../../types';

export const TextField: React.FC<BaseFieldProps> = ({
  param,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}) => {
  const content = param.content as StringContent;
  const inputType = param['x-ui-hints']?.inputType || 'text';

  if (content.multiline || param.type === 'textarea') {
    return (
      <div className="form-field">
        <label htmlFor={param.name} className="form-label">
          {param.description}
          {param.required && <span className="required">*</span>}
        </label>
        <textarea
          id={param.name}
          name={param.name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={content.placeholder}
          rows={content.rows || 3}
          minLength={content.minLength}
          maxLength={content.maxLength}
          className={`form-textarea ${error ? 'error' : ''}`}
          required={param.required}
        />
        {error && <span className="form-error">{error}</span>}
      </div>
    );
  }

  return (
    <div className="form-field">
      <label htmlFor={param.name} className="form-label">
        {param.description}
        {param.required && <span className="required">*</span>}
      </label>
      <input
        type={inputType}
        id={param.name}
        name={param.name}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={content.placeholder}
        minLength={content.minLength}
        maxLength={content.maxLength}
        pattern={content.pattern}
        className={`form-input ${error ? 'error' : ''}`}
        required={param.required}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

