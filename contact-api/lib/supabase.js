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

  const message = typeof error.message === "string" ? error.message : "";

  return (
    error.code === "PGRST205" ||
    error.code === "42P01" ||
    message.includes("Could not find the table") ||
    message.includes("schema cache") ||
    message.includes("does not exist")
  );
}

export function getSupabaseQueryErrorMessage(error, tableName) {
  if (isMissingSupabaseTableError(error)) {
    return getMissingSupabaseTableMessage(tableName);
  }

  const message = typeof error?.message === "string" ? error.message : "";

  if (
    message.includes("fetch failed") ||
    message.includes("<!DOCTYPE html>") ||
    message.includes("Connect Timeout Error")
  ) {
    return `Unable to reach Supabase for "${tableName}". Verify SUPABASE_URL and that the project is active.`;
  }

  if (
    error?.code === "PGRST301" ||
    message.includes("JWT") ||
    message.includes("permission denied")
  ) {
    return [
      `Supabase rejected access to "${tableName}".`,
      "Confirm SUPABASE_SECRET_KEY uses a secret/service_role key, not an anon or publishable key.",
      "Then rerun contact-api/supabase/schema.sql in the same Supabase project.",
    ].join(" ");
  }

  return message || `Supabase query failed for "${tableName}".`;
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
