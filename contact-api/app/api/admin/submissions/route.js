import { getDataTableConfig } from "../../../../lib/config";
import { requireAdminSession } from "../../../../lib/adminAuth";
import { json, optionsResponse } from "../../../../lib/http";
import { getSupabaseAdminClient } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseLimit(request) {
  const { searchParams } = new URL(request.url);
  const rawLimit = Number.parseInt(searchParams.get("limit") || "50", 10);

  if (Number.isNaN(rawLimit)) {
    return 50;
  }

  return Math.min(Math.max(rawLimit, 1), 200);
}

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
    const { contactTable } = getDataTableConfig();
    const limit = parseLimit(request);
    const { data, error } = await supabase
      .from(contactTable)
      .select("id, created_at, name, email, phone, subject, message")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Failed to load admin submissions", error);
      return json(
        request,
        {
          error: "Failed to load submissions.",
          details:
            process.env.NODE_ENV === "production" ? undefined : error.message,
        },
        { status: 500 }
      );
    }

    return json(request, { ok: true, submissions: data || [] });
  } catch (error) {
    console.error("Admin submissions API error", error);
    return json(
      request,
      {
        error: "Admin submissions service is unavailable.",
        details:
          process.env.NODE_ENV === "production"
            ? undefined
            : error instanceof Error
              ? error.message
              : String(error),
      },
      { status: 500 }
    );
  }
}
