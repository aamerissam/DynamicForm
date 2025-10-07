import React from 'react';
import type { BaseFieldProps, EnumContent } from '../../types';

export const MultiSelectField: React.FC<BaseFieldProps> = ({
  param,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}) => {
  const content = param.content as EnumContent;
  const selectedValues: string[] = Array.isArray(value) ? value : [];

  const handleToggle = (optionValue: string) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue];

    // Check maxSelections
    if (content.maxSelections && newValues.length > content.maxSelections) {
      return;
    }

    onChange(newValues);
  };

  return (
    <div className="form-field">
      <div className="form-label">
        {param.description}
        {param.required && <span className="required">*</span>}
      </div>
      <div className="multi-select-wrapper">
        {content.values.map((option) => (
          <label
            key={option.value}
            className="multi-select-option"
            title={option.tooltip}
          >
            <input
              type="checkbox"
              name={`${param.name}[]`}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              onBlur={onBlur}
              disabled={disabled || option.disabled}
              className="checkbox-input"
            />
            <span className="checkbox-text">{option.label}</span>
          </label>
        ))}
      </div>
      {content.maxSelections && (
        <div className="field-hint">
          Selected: {selectedValues.length} / {content.maxSelections}
        </div>
      )}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

