// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Ensure these environment variables are correctly set in your .env.local file
// For Create React App: REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY
// For Vite: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);