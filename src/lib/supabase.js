import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const missingVars = [];
if (!supabaseUrl) missingVars.push("VITE_SUPABASE_URL");
if (!supabaseAnonKey) missingVars.push("VITE_SUPABASE_ANON_KEY");

if (missingVars.length > 0) {
  console.warn(
    `[Supabase] Missing environment variables: ${missingVars.join(", ")}. ` +
    "The application will use local mock data as a fallback. " +
    "Set these in your .env file to connect to Supabase."
  );
}

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export { supabase };
export default supabase;
