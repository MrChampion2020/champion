import { getDataTableConfig } from "../../../../lib/config";
import { json, optionsResponse } from "../../../../lib/http";
import {
  getSupabaseAdminClient,
  isMissingSupabaseTableError,
} from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseLimit(request) {
  const { searchParams } = new URL(request.url);
  const rawLimit = Number.parseInt(searchParams.get("limit") || "6", 10);

  if (Number.isNaN(rawLimit)) {
    return 6;
  }

  return Math.min(Math.max(rawLimit, 1), 24);
}

function toProjectPayload(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    liveUrl: row.live_url || "",
  };
}

export async function OPTIONS(request) {
  return optionsResponse(request);
}

export async function GET(request) {
  try {
    const supabase = getSupabaseAdminClient();
    const { currentProjectsTable } = getDataTableConfig();
    const limit = parseLimit(request);
    const { data, error } = await supabase
      .from(currentProjectsTable)
      .select("id, created_at, title, description, image_url, live_url")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Failed to load current projects", error);

      if (isMissingSupabaseTableError(error)) {
        return json(request, {
          ok: true,
          projects: [],
          setupRequired: true,
          setupMessage: `Supabase table "${currentProjectsTable}" has not been created yet.`,
        });
      }

      return json(
        request,
        {
          error: "Failed to load current projects.",
          details:
            process.env.NODE_ENV === "production" ? undefined : error.message,
        },
        { status: 500 }
      );
    }

    return json(request, {
      ok: true,
      projects: (data || []).map(toProjectPayload),
    });
  } catch (error) {
    console.error("Public current projects API error", error);
    return json(
      request,
      {
        error: "Current projects service is unavailable.",
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
