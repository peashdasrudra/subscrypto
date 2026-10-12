// ===========================================
// Supabase Client Configuration
// ===========================================
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let browserClient: SupabaseClient | null = null;

// Helper to verify if database environment is set
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && url.trim().length > 0 && !url.includes('placeholder'));
}

// Public client - for browser-side operations (lazily instantiated)
export function getBrowserClient(): SupabaseClient | null {
  if (browserClient) return browserClient;
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  browserClient = createClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
}

// Server-side client - for API routes
// Prioritizes SUPABASE_SERVICE_ROLE_KEY to bypass RLS; falls back gracefully to publishable/anon key
export function getServiceClient(): SupabaseClient {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const key = serviceRoleKey || anonKey;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!url || !key) {
    throw new Error('Supabase URL or Key is not configured');
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
