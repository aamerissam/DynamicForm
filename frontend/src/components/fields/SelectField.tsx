import React from 'react';
import type { BaseFieldProps, EnumContent } from '../../types';

export const SelectField: React.FC<BaseFieldProps> = ({
  param,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}) => {
  const content = param.content as EnumContent;

  return (
    <div className="field-wrapper">
      <label htmlFor={param.name} className="field-label">
        {param.description}
        {param.required && <span className="required">*</span>}
      </label>
      <select
        id={param.name}
        name={param.name}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        className={`field-input ${error ? 'error' : ''}`}
        required={param.required}
      >
        <option value="">-- Select {param.description} --</option>
        {content.values.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            title={option.tooltip}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

