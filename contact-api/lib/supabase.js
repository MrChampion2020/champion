import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

export function getSupabaseAdminClient() {
  const config = getSupabaseConfig();

  return createClient(config.supabaseUrl, config.supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function isMissingSupabaseTableError(error) {
  if (!error || typeof error !== "object") {
    return false;
  }

  return (
    error.code === "PGRST205" ||
    (typeof error.message === "string" &&
      error.message.includes("Could not find the table"))
  );
}

export function getMissingSupabaseTableMessage(tableName) {
  return [
    `Supabase cannot access table "${tableName}".`,
    "If the table already exists, reload the PostgREST schema cache with",
    "`notify pgrst, 'reload schema';`,",
    "confirm this API is using the same Supabase project from `.env`,",
    "and verify the table name env var matches.",
  ].join(" ");
}
