import React from 'react';
import type { BaseFieldProps, NumberContent } from '../../types';

export const NumberField: React.FC<BaseFieldProps> = ({
  param,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}) => {
  const content = param.content as NumberContent;

  return (
    <div className="form-field">
      <label htmlFor={param.name} className="form-label">
        {param.description}
        {param.required && <span className="required">*</span>}
      </label>
      <div className="relative flex items-center">
        {content.prefix && (
          <span className="absolute left-3 text-sm text-gray-500 pointer-events-none">
            {content.prefix}
          </span>
        )}
        <input
          type="number"
          id={param.name}
          name={param.name}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={content.placeholder}
          min={content.min}
          max={content.max}
          step={content.step}
          className={`form-input ${error ? 'error' : ''} ${content.prefix ? 'pl-8' : ''} ${content.suffix ? 'pr-12' : ''}`}
          required={param.required}
        />
        {content.suffix && (
          <span className="absolute right-3 text-sm text-gray-500 pointer-events-none">
            {content.suffix}
          </span>
        )}
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

