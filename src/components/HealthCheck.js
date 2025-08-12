// src/components/HealthCheck.js
import React from 'react';
import useSupabaseConnection from '../useSupabaseConnection';

const HealthCheck = () => {
  const { isConnected, loading, error } = useSupabaseConnection();

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Supabase Health Check</h1>
      {loading && <p>Status: Checking...</p>}
      {!loading && isConnected && (
        <p style={{ color: 'green' }}>Status: OK (Supabase connection successful)</p>
      )}
      {!loading && !isConnected && (
        <>
          <p style={{ color: 'red' }}>Status: FAILED (Supabase connection failed)</p>
          {error && (
            <pre style={{
              backgroundColor: '#ffe6e6',
              border: '1px solid #ffcccc',
              padding: '10px',
              borderRadius: '4px',
              whiteSpace: 'pre-wrap'
            }}>
              Error: {JSON.stringify(error, null, 2)}
            </pre>
          )}
        </>
      )}
    </div>
  );
};

export default HealthCheck;