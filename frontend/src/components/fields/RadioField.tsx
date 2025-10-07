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
      <div className={`space-y-3 ${layout === 'horizontal' ? 'sm:flex sm:space-y-0 sm:space-x-6' : ''}`}>
        {content.values.map((option) => (
          <label 
            key={option.value} 
            className="flex items-center space-x-3 cursor-pointer"
            title={option.tooltip}
          >
            <input
              type="radio"
              name={param.name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              disabled={disabled || option.disabled}
              className="form-radio w-5 h-5"
              required={param.required}
            />
            <span className="text-sm text-gray-700 select-none">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

