// src/useSupabaseConnection.js
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const useSupabaseConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // A simple query to a non-existent table to test the connection.
        // If the connection is successful, the request will go through,
        // and Supabase will respond with a 404 for the non-existent table.
        // If the connection fails, the request itself will fail.
        const { error } = await supabase.from('test_connection').select('*');

        if (error && error.code === 'PGRST116') {
          // This specific error code indicates "The table 'test_connection' does not exist."
          // This means the API is reachable and the connection is working.
          setIsConnected(true);
        } else {
          // Any other error (like network errors, auth issues) means the connection failed.
          setIsConnected(false);
          setError(error);
        }
      } catch (err) {
        // Catch any other potential errors, e.g., network issues.
        setIsConnected(false);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  return { isConnected, loading, error };
};

export default useSupabaseConnection;