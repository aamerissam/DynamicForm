import React from 'react';
import type { BaseFieldProps, EnumContent } from '../../types';

export const RadioField: React.FC<BaseFieldProps> = ({
  param,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}) => {
  const content = param.content as EnumContent;
  const layout = content.layout || 'vertical';

  return (
    <div className="form-field">
      <div className="form-label">
        {param.description}
        {param.required && <span className="required">*</span>}
      </div>
      <div className={`radio-group ${layout}`}>
        {content.values.map((option) => (
          <label key={option.value} className="radio-label" title={option.tooltip}>
            <input
              type="radio"
              name={param.name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              disabled={disabled || option.disabled}
              className="radio-input"
              required={param.required}
            />
            <span className="radio-text">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

