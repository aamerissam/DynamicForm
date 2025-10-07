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
      <div className="range-wrapper">
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
          className={`range-input ${error ? 'error' : ''}`}
          required={param.required}
        />
        {content.showLabels !== false && (
          <div className="range-labels">
            <span className="range-min">{formatValue(content.min)}</span>
            <span className="range-current">{formatValue(currentValue)}</span>
            <span className="range-max">{formatValue(content.max)}</span>
          </div>
        )}
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

