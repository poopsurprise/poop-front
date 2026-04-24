// =============================================================================
// Supabase Client — PWA
// =============================================================================
// Singleton do Supabase client para uso no frontend.
// Usa variáveis de ambiente do Vite (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY).
//
// IMPORTANTE: Este ficheiro NÃO deve ser importado directamente pelos componentes.
// Use o hook useAuth() ou o AuthProvider.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
