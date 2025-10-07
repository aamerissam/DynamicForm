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
      <div className="space-y-3">
        {content.values.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-3 cursor-pointer"
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
              className="form-checkbox w-5 h-5"
            />
            <span className="text-sm text-gray-700 select-none">{option.label}</span>
          </label>
        ))}
      </div>
      {content.maxSelections && (
        <div className="form-hint">
          Selected: {selectedValues.length} / {content.maxSelections}
        </div>
      )}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

