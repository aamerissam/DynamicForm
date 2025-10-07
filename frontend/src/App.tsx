import { useState, useEffect } from 'react';
import { DynamicForm } from './components/DynamicForm';
import { getSchema, listSchemas } from './api';
import type { FormSchema } from './types';

function App() {
  const [schemas, setSchemas] = useState<Record<string, string>>({});
  const [selectedSchemaId, setSelectedSchemaId] = useState<string>('');
  const [currentSchema, setCurrentSchema] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load available schemas on mount
  useEffect(() => {
    listSchemas()
      .then((data) => {
        setSchemas(data);
        // Select first schema by default
        const firstSchemaId = Object.keys(data)[0];
        if (firstSchemaId) {
          setSelectedSchemaId(firstSchemaId);
        }
      })
      .catch((err) => {
        setError('Failed to load schemas: ' + err.message);
      });
  }, []);

  // Load schema when selection changes
  useEffect(() => {
    if (!selectedSchemaId) return;

    setLoading(true);
    setError(null);

    getSchema(selectedSchemaId)
      .then((schema) => {
        setCurrentSchema(schema);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load schema: ' + err.message);
        setLoading(false);
      });
  }, [selectedSchemaId]);

  const handleSuccess = (data: any) => {
    console.log('Form submitted successfully:', data);
  };

  const handleError = (error: any) => {
    console.error('Form submission error:', error);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dynamic Form System</h1>
                <p className="text-xs text-gray-500">OpenAPI 3.1 Schema-Based Forms</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="http://localhost:8000/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>API Docs</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Schema Selector Card */}
        <div className="card mb-6">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Select Form Template</h2>
                <p className="text-sm text-gray-500">Choose a form schema to get started</p>
              </div>
              <div className="w-full max-w-xs">
                <select
                  id="schema-select"
                  value={selectedSchemaId}
                  onChange={(e) => setSelectedSchemaId(e.target.value)}
                  className="form-select"
                >
                  {Object.keys(schemas).map((schemaId) => (
                    <option key={schemaId} value={schemaId}>
                      {schemaId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error mb-6">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span><strong>Error:</strong> {error}</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="card">
            <div className="card-body">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="spinner text-primary-600 mb-4"></div>
                <p className="text-gray-600 font-medium">Loading form schema...</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        {!loading && !error && currentSchema && (
          <div className="card">
            <div className="card-body">
              <DynamicForm
                schema={currentSchema}
                schemaId={selectedSchemaId}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-600">
            Built with <span className="font-semibold text-gray-900">FastAPI</span> and{' '}
            <span className="font-semibold text-gray-900">React</span> • TypeScript • Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

