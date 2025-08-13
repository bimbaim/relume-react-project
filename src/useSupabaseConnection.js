import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const useSupabaseConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Attempt to select from a table that doesn't exist
        const { error } = await supabase.from('test_connection').select('*');
        
        // --- THIS IS THE KEY LOGIC CHANGE ---
        // A successful connection will result in a specific error message.
        // We check for two possible error codes:
        // 1. `PGRST116`: The PostgREST error for "relation does not exist".
        // 2. `42P01`: The PostgreSQL error for "undefined_table".
        // If either of these errors is present, the connection is good.
        if (error && (error.code === 'PGRST116' || error.code === '42P01')) {
          setIsConnected(true);
        } else {
          // Any other error (e.g., network failure, authentication issue)
          // means the connection failed.
          setIsConnected(false);
          setError(error);
        }
      } catch (err) {
        // Catch network-level errors
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