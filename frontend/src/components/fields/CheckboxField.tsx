import React from 'react';
import type { BaseFieldProps, BooleanContent } from '../../types';

export const CheckboxField: React.FC<BaseFieldProps> = ({
  param,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}) => {
  const content = param.content as BooleanContent;
  const checked = value ?? content.defaultValue ?? false;

  return (
    <div className="form-field">
      <label htmlFor={param.name} className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          id={param.name}
          name={param.name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          onBlur={onBlur}
          disabled={disabled}
          className="form-checkbox w-5 h-5"
        />
        <span className="text-sm text-gray-700 select-none">
          {param.description}
          {param.required && <span className="required">*</span>}
        </span>
      </label>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

