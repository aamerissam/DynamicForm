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
    <div className="field-wrapper">
      <label htmlFor={param.name} className="field-label">
        {param.description}
        {param.required && <span className="required">*</span>}
      </label>
      <div className="number-input-wrapper">
        {content.prefix && <span className="input-prefix">{content.prefix}</span>}
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
          className={`field-input ${error ? 'error' : ''} ${content.prefix ? 'with-prefix' : ''} ${content.suffix ? 'with-suffix' : ''}`}
          required={param.required}
        />
        {content.suffix && <span className="input-suffix">{content.suffix}</span>}
      </div>
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

