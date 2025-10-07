/**
 * TypeScript type definitions for the Dynamic Form Schema
 * Based on the OpenAPI 3.1 specification
 */

// ============================================================================
// Content Type Definitions
// ============================================================================

export interface EnumValue {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
  tooltip?: string;
}

export interface EnumContent {
  type: "enum";
  values: EnumValue[];
  multiple?: boolean;
  maxSelections?: number;
  layout?: "vertical" | "horizontal";
  source?: string;
  cacheDuration?: number;
  searchable?: boolean;
}

export interface DependentEnumContent {
  type: "dependent_enum";
  dependsOn: string | string[];
  mapping?: Record<string, EnumValue[]>;
  source?: string;
  cascadeReset?: boolean;
  searchable?: boolean;
  minSearchLength?: number;
}

export interface StringContent {
  type: "string";
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

export interface NumberContent {
  type: "number" | "integer";
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}

export interface DateContent {
  type: "date" | "datetime" | "time";
  format?: string;
  min?: string;
  max?: string;
  disabledDates?: string[];
}

export interface RangeContent {
  type: "number_range";
  min: number;
  max: number;
  step?: number;
  defaultValue?: number[];
  showLabels?: boolean;
  currency?: string;
}

export interface BooleanContent {
  type: "boolean";
  defaultValue?: boolean;
}

export type ContentType =
  | EnumContent
  | DependentEnumContent
  | StringContent
  | NumberContent
  | DateContent
  | RangeContent
  | BooleanContent;

// ============================================================================
// Validation and Extension Definitions
// ============================================================================

export interface ValidationRule {
  rule: string;
  message: string;
  pattern?: string;
  endpoint?: string;
  async?: boolean;
  debounce?: number;
  condition?: string;
  fields?: string[];
}

export interface VisibilityCondition {
  condition: string;
}

export interface UIHints {
  inputType?: string;
  showStrengthMeter?: boolean;
  autocomplete?: string;
}

// ============================================================================
// Parameter and Category Definitions
// ============================================================================

export type ParamType =
  | "list"
  | "sub_list"
  | "text_field"
  | "number_field"
  | "date_field"
  | "datetime_field"
  | "time_field"
  | "range"
  | "checkbox"
  | "radio"
  | "multi_select"
  | "textarea"
  | "file_upload"
  | "color_picker"
  | "switch";

export interface Param {
  name: string;
  type: ParamType;
  description: string;
  required: boolean;
  related: string | string[] | null;
  content: ContentType;
  "x-validation"?: ValidationRule[];
  "x-visibility"?: VisibilityCondition;
  "x-ui-hints"?: UIHints;
  "x-error-messages"?: Record<string, string>;
}

export interface ParamCategory {
  name: string;
  description?: string;
  params: Param[];
}

export interface FormSchema {
  paramCategories: ParamCategory[];
}

// ============================================================================
// Form Data and Submission
// ============================================================================

export interface FormData {
  [key: string]: any;
}

export interface FormSubmission {
  formId?: string;
  data: FormData;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface FormValidationResponse {
  valid: boolean;
  errors: ValidationError[];
}

export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  data?: any;
}

// ============================================================================
// Field Props Interface
// ============================================================================

export interface BaseFieldProps {
  param: Param;
  value: any;
  onChange: (value: any) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  formData: FormData;
}

