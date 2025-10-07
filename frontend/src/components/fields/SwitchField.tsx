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
    <div className="form-field">
      <label htmlFor={param.name} className="flex items-center justify-between cursor-pointer">
        <span className="text-sm font-medium text-gray-700">
          {param.description}
          {param.required && <span className="required">*</span>}
        </span>
        <div className="relative inline-block w-11 h-6 ml-3">
          <input
            type="checkbox"
            id={param.name}
            name={param.name}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            onBlur={onBlur}
            disabled={disabled}
            className="sr-only peer"
          />
          <div className={`
            w-11 h-6 bg-gray-300 rounded-full peer 
            peer-checked:bg-primary-600 
            peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2
            peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
            after:content-[''] after:absolute after:top-0.5 after:left-0.5
            after:bg-white after:rounded-full after:h-5 after:w-5
            after:transition-all after:duration-200
            peer-checked:after:translate-x-5
            transition-colors duration-200
          `}></div>
        </div>
      </label>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

