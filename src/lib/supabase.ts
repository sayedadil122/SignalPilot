import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gyfhemivkushqwfwzsou.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5ZmhlbWl2a3VzaHF3Znd6c291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMzIwNTEsImV4cCI6MjA5NzcwODA1MX0.UTaYDyculPhBz9kYrYsQkCW7HDTePtDxhsQ0zUv9qOQ';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
