import { z } from "zod";
import { getDataTableConfig } from "../../../../lib/config";
import { requireAdminSession } from "../../../../lib/adminAuth";
import { json, optionsResponse } from "../../../../lib/http";
import {
  getSupabaseAdminClient,
  isMissingSupabaseTableError,
} from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const optionalUrlSchema = z
  .union([z.string().trim().url(), z.literal(""), z.undefined()])
  .transform((value) => value || "");

const currentProjectSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(10).max(600),
  imageUrl: z.string().trim().url().max(500),
  liveUrl: optionalUrlSchema,
});

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
  const authResult = await requireAdminSession(request);

  if (authResult.response) {
    return authResult.response;
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { currentProjectsTable } = getDataTableConfig();
    const { data, error } = await supabase
      .from(currentProjectsTable)
      .select("id, created_at, title, description, image_url, live_url")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Failed to load admin projects", error);

      if (isMissingSupabaseTableError(error)) {
        return json(request, {
          ok: true,
          projects: [],
          setupRequired: true,
          setupMessage: `Supabase table "${currentProjectsTable}" has not been created yet. Run the schema setup before publishing current projects.`,
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
    console.error("Admin projects API error", error);
    return json(
      request,
      {
        error: "Admin projects service is unavailable.",
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

export async function POST(request) {
  const authResult = await requireAdminSession(request);

  if (authResult.response) {
    return authResult.response;
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return json(request, { error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = currentProjectSchema.safeParse(body);

  if (!parsed.success) {
    return json(
      request,
      {
        error: "Invalid current project data.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { currentProjectsTable } = getDataTableConfig();
    const record = {
      title: parsed.data.title,
      description: parsed.data.description,
      image_url: parsed.data.imageUrl,
      live_url: parsed.data.liveUrl,
    };
    const { data, error } = await supabase
      .from(currentProjectsTable)
      .insert(record)
      .select("id, created_at, title, description, image_url, live_url")
      .single();

    if (error) {
      console.error("Failed to create current project", error);

      if (isMissingSupabaseTableError(error)) {
        return json(
          request,
          {
            error: `Supabase table "${currentProjectsTable}" has not been created yet. Run the schema setup before publishing current projects.`,
          },
          { status: 500 }
        );
      }

      return json(
        request,
        {
          error: "Failed to create current project.",
          details:
            process.env.NODE_ENV === "production" ? undefined : error.message,
        },
        { status: 500 }
      );
    }

    return json(
      request,
      { ok: true, project: toProjectPayload(data) },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create current project API error", error);
    return json(
      request,
      {
        error: "Current project service is unavailable.",
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
