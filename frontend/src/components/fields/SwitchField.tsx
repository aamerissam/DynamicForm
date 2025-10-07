import React from 'react';
import type { BaseFieldProps, BooleanContent } from '../../types';

export const SwitchField: React.FC<BaseFieldProps> = ({
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
    <div className="field-wrapper switch-wrapper">
      <label htmlFor={param.name} className="switch-label">
        <span className="switch-text">
          {param.description}
          {param.required && <span className="required">*</span>}
        </span>
        <div className="switch-control">
          <input
            type="checkbox"
            id={param.name}
            name={param.name}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            onBlur={onBlur}
            disabled={disabled}
            className="switch-input"
          />
          <span className="switch-slider"></span>
        </div>
      </label>
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

