import { requireAdminSession } from "../../../../../lib/adminAuth";
import { toChatPayload } from "../../../../../lib/cvAccess";
import { getDataTableConfig } from "../../../../../lib/config";
import { json, optionsResponse } from "../../../../../lib/http";
import {
  getSupabaseAdminClient,
  isMissingSupabaseTableError,
} from "../../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(request) {
  return optionsResponse(request);
}

export async function GET(request) {
  const authResult = await requireAdminSession(request);

  if (authResult.response) {
    return authResult.response;
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { cvAccessChatsTable } = getDataTableConfig();
    const { data, error } = await supabase
      .from(cvAccessChatsTable)
      .select(
        "id, created_at, requester_email, requester_name, status, access_token, token_expires_at, approved_at"
      )
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      if (isMissingSupabaseTableError(error)) {
        return json(request, {
          ok: true,
          chats: [],
          setupRequired: true,
          setupMessage: `Supabase table "${cvAccessChatsTable}" has not been created yet.`,
        });
      }

      throw error;
    }

    return json(request, {
      ok: true,
      chats: (data || []).map(toChatPayload),
    });
  } catch (error) {
    console.error("Admin CV access list error", error);
    return json(request, { error: "CV access requests could not be loaded." }, { status: 500 });
  }
}
