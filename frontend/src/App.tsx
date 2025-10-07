import React, { useState, useEffect } from 'react';
import { DynamicForm } from './components/DynamicForm';
import { getSchema, listSchemas } from './api';
import type { FormSchema } from './types';
import './App.css';

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
    <div className="app">
      <header className="app-header">
        <h1>Dynamic Form System</h1>
        <p className="subtitle">Declarative form rendering based on OpenAPI 3.1 schema</p>
      </header>

      <main className="app-main">
        <div className="schema-selector">
          <label htmlFor="schema-select" className="selector-label">
            Select Form Schema:
          </label>
          <select
            id="schema-select"
            value={selectedSchemaId}
            onChange={(e) => setSelectedSchemaId(e.target.value)}
            className="selector-input"
          >
            {Object.keys(schemas).map((schemaId) => (
              <option key={schemaId} value={schemaId}>
                {schemaId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="error-banner">
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading form schema...</p>
          </div>
        )}

        {!loading && !error && currentSchema && (
          <div className="form-container">
            <DynamicForm
              schema={currentSchema}
              schemaId={selectedSchemaId}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Built with <strong>FastAPI</strong> and <strong>React</strong> |{' '}
          <a
            href="http://localhost:8000/api/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            API Documentation
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

