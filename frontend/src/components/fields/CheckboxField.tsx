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
    <div className="form-field checkbox-wrapper">
      <label htmlFor={param.name} className="checkbox-label">
        <input
          type="checkbox"
          id={param.name}
          name={param.name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          onBlur={onBlur}
          disabled={disabled}
          className="checkbox-input"
        />
        <span className="checkbox-text">
          {param.description}
          {param.required && <span className="required">*</span>}
        </span>
      </label>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

