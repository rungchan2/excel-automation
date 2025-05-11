import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.type";

// Create a single supabase client for the entire app
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
