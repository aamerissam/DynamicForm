/**
 * API client for Dynamic Form System
 */

import axios from 'axios';
import type {
  FormSchema,
  FormSubmission,
  FormValidationResponse,
  FormSubmissionResponse,
  EnumValue,
} from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================================================
// Schema APIs
// ============================================================================

export async function listSchemas(): Promise<Record<string, string>> {
  const response = await api.get('/api/schemas');
  return response.data;
}

export async function getSchema(schemaId: string): Promise<FormSchema> {
  const response = await api.get(`/api/schemas/${schemaId}`);
  return response.data;
}

// ============================================================================
// Data APIs
// ============================================================================

export async function getCountries(): Promise<EnumValue[]> {
  const response = await api.get('/api/countries');
  return response.data;
}

export async function getCities(country: string): Promise<EnumValue[]> {
  const response = await api.get('/api/cities', { params: { country } });
  return response.data;
}

export async function getSubcategories(parent: string): Promise<EnumValue[]> {
  const response = await api.get('/api/subcategories', { params: { parent } });
  return response.data;
}

// ============================================================================
// Validation APIs
// ============================================================================

export async function validateEmail(email: string): Promise<{ valid: boolean; message: string }> {
  const response = await api.get('/api/validate/email', { params: { email } });
  return response.data;
}

export async function validateForm(submission: FormSubmission): Promise<FormValidationResponse> {
  const response = await api.post('/api/validate', submission);
  return response.data;
}

// ============================================================================
// Submission APIs
// ============================================================================

export async function submitForm(submission: FormSubmission): Promise<FormSubmissionResponse> {
  const response = await api.post('/api/submit', submission);
  return response.data;
}

export async function getSubmissions(formId?: string): Promise<any[]> {
  const response = await api.get('/api/submissions', {
    params: formId ? { form_id: formId } : {},
  });
  return response.data;
}

// ============================================================================
// Health Check
// ============================================================================

export async function healthCheck(): Promise<any> {
  const response = await api.get('/api/health');
  return response.data;
}

export default api;

