import React, { useEffect, useState } from 'react';
import type { BaseFieldProps, DependentEnumContent, EnumValue } from '../../types';

export const DependentSelectField: React.FC<BaseFieldProps> = ({
  param,
  value,
  onChange,
  onBlur,
  error,
  disabled,
  formData,
}) => {
  const content = param.content as DependentEnumContent;
  const [options, setOptions] = useState<EnumValue[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const parentField = Array.isArray(content.dependsOn) ? content.dependsOn[0] : content.dependsOn;
  const parentValue = formData[parentField];

  useEffect(() => {
    // Reset value when parent changes
    if (content.cascadeReset !== false) {
      onChange('');
    }

    // Load options based on parent value
    if (parentValue) {
      if (content.mapping && content.mapping[parentValue]) {
        // Use static mapping
        setOptions(content.mapping[parentValue]);
      } else if (content.source) {
        // Load from API
        setIsLoading(true);
        const url = content.source.replace(`{${parentField}}`, parentValue);
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setOptions(data);
            setIsLoading(false);
          })
          .catch(() => {
            setOptions([]);
            setIsLoading(false);
          });
      } else {
        setOptions([]);
      }
    } else {
      setOptions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentValue, content.mapping, content.source, content.cascadeReset, parentField]);

  const isDisabled = disabled || !parentValue || isLoading;

  return (
    <div className="form-field">
      <label htmlFor={param.name} className="form-label">
        {param.description}
        {param.required && <span className="required">*</span>}
      </label>
      <select
        id={param.name}
        name={param.name}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={isDisabled}
        className={`form-select ${error ? 'error' : ''}`}
        required={param.required}
      >
        <option value="">
          {isLoading
            ? 'Loading...'
            : !parentValue
            ? `Select ${formData[parentField] ? formData[parentField] : 'parent'} first`
            : `-- Select ${param.description} --`}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            title={option.tooltip}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

