import { createClient } from "@supabase/supabase-js";

// Env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Create client ONLY if env exists (prevents build crash)
export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// Optional helper (safe check)
export function getSupabase() {
  if (!supabase) {
    console.error("❌ Supabase not initialized. Check env variables.");
    return null;
  }
  return supabase;
}