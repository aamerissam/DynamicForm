import React from 'react';
import type { BaseFieldProps, DateContent } from '../../types';

export const DateField: React.FC<BaseFieldProps> = ({
  param,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}) => {
  const content = param.content as DateContent;

  let inputType = 'date';
  if (content.type === 'datetime') {
    inputType = 'datetime-local';
  } else if (content.type === 'time') {
    inputType = 'time';
  }

  return (
    <div className="field-wrapper">
      <label htmlFor={param.name} className="field-label">
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
        min={content.min}
        max={content.max}
        className={`field-input ${error ? 'error' : ''}`}
        required={param.required}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

