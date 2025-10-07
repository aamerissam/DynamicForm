/**
 * API client for Dynamic Form System
 */

import axios from 'axios';
import type {
  FormSchema,
  FormSubmission,
  FormValidationResponse,
  FormSubmissionResponse,
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
// Dynamic Data Loading
// ============================================================================
// Note: Data for dependent fields is loaded dynamically using the 'source' URL
// from the schema. No hardcoded data endpoints are needed - the backend controls
// all data sources through the schema definition.
//
// Example: If the schema specifies:
//   content.source = "/api/cities?country={country}"
// The DependentSelectField will automatically fetch from that URL.
// This keeps the frontend truly dynamic - no frontend updates needed when
// adding new data endpoints!

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

