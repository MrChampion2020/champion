import { getDataTableConfig } from "../../../../lib/config";
import { json, optionsResponse } from "../../../../lib/http";
import {
  getSupabaseAdminClient,
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

      return json(request, {
        ok: true,
        projects: [],
      });
    }

    return json(request, {
      ok: true,
      projects: (data || []).map(toProjectPayload),
    });
  } catch (error) {
    console.error("Public current projects API error", error);
    return json(request, {
      ok: true,
      projects: [],
    });
  }
}
