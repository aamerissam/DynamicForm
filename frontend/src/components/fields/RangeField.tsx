import React from 'react';
import type { BaseFieldProps, RangeContent } from '../../types';

export const RangeField: React.FC<BaseFieldProps> = ({
  param,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}) => {
  const content = param.content as RangeContent;
  const currentValue = value ?? content.defaultValue?.[0] ?? content.min;

  const formatValue = (val: number) => {
    if (content.currency) {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: content.currency,
      }).format(val);
    }
    return val.toString();
  };

  return (
    <div className="form-field">
      <label htmlFor={param.name} className="form-label">
        {param.description}
        {param.required && <span className="required">*</span>}
      </label>
      <div className="space-y-2">
        <input
          type="range"
          id={param.name}
          name={param.name}
          value={currentValue}
          onChange={(e) => onChange(Number(e.target.value))}
          onBlur={onBlur}
          disabled={disabled}
          min={content.min}
          max={content.max}
          step={content.step}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-primary-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     ${error ? 'ring-2 ring-danger-500' : ''}`}
          style={{
            background: `linear-gradient(to right, 
              rgb(37 99 235) 0%, 
              rgb(37 99 235) ${((currentValue - content.min) / (content.max - content.min)) * 100}%, 
              rgb(229 231 235) ${((currentValue - content.min) / (content.max - content.min)) * 100}%, 
              rgb(229 231 235) 100%)`
          }}
          required={param.required}
        />
        {content.showLabels !== false && (
          <div className="flex justify-between items-center text-xs text-gray-600">
            <span className="font-medium">{formatValue(content.min)}</span>
            <span className="font-semibold text-sm text-primary-600">{formatValue(currentValue)}</span>
            <span className="font-medium">{formatValue(content.max)}</span>
          </div>
        )}
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

