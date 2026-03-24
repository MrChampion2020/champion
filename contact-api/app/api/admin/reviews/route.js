import { z } from "zod";
import { requireAdminSession } from "../../../../lib/adminAuth";
import { getDataTableConfig } from "../../../../lib/config";
import { json, optionsResponse } from "../../../../lib/http";
import { reviewSelectFields, toReviewPayload } from "../../../../lib/reviews";
import {
  getMissingSupabaseTableMessage,
  getSupabaseAdminClient,
  isMissingSupabaseTableError,
} from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const reviewSchema = z.object({
  authorName: z.string().trim().min(2).max(120),
  authorRole: z.string().trim().max(120).optional().default(""),
  content: z.string().trim().min(10).max(900),
  visibility: z.enum(["public", "private"]).optional().default("public"),
  isPublished: z.boolean().optional().default(false),
});

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
    const { reviewsTable } = getDataTableConfig();
    const { data, error } = await supabase
      .from(reviewsTable)
      .select(reviewSelectFields)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      if (isMissingSupabaseTableError(error)) {
        return json(request, {
          ok: true,
          reviews: [],
          setupRequired: true,
          setupMessage: getMissingSupabaseTableMessage(reviewsTable),
        });
      }

      console.error("Failed to load admin reviews", error);

      return json(
        request,
        {
          error: "Failed to load reviews.",
          details:
            process.env.NODE_ENV === "production" ? undefined : error.message,
        },
        { status: 500 }
      );
    }

    return json(request, {
      ok: true,
      reviews: (data || []).map(toReviewPayload),
    });
  } catch (error) {
    console.error("Admin reviews API error", error);
    return json(
      request,
      {
        error: "Admin reviews service is unavailable.",
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

  const parsed = reviewSchema.safeParse(body);

  if (!parsed.success) {
    return json(
      request,
      {
        error: "Invalid review data.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { reviewsTable } = getDataTableConfig();
    const record = {
      author_name: parsed.data.authorName,
      author_role: parsed.data.authorRole,
      content: parsed.data.content,
      visibility: parsed.data.visibility,
      is_published: parsed.data.isPublished,
    };
    const { data, error } = await supabase
      .from(reviewsTable)
      .insert(record)
      .select(reviewSelectFields)
      .single();

    if (error) {
      if (isMissingSupabaseTableError(error)) {
        return json(
          request,
          {
            error: getMissingSupabaseTableMessage(reviewsTable),
          },
          { status: 500 }
        );
      }

      console.error("Failed to create review", error);

      return json(
        request,
        {
          error: "Failed to create review.",
          details:
            process.env.NODE_ENV === "production" ? undefined : error.message,
        },
        { status: 500 }
      );
    }

    return json(
      request,
      { ok: true, review: toReviewPayload(data) },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create review API error", error);
    return json(
      request,
      {
        error: "Review service is unavailable.",
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
