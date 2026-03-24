import { z } from "zod";
import { requireAdminSession } from "../../../../../lib/adminAuth";
import { getDataTableConfig } from "../../../../../lib/config";
import { json, optionsResponse } from "../../../../../lib/http";
import { reviewSelectFields, toReviewPayload } from "../../../../../lib/reviews";
import {
  getSupabaseAdminClient,
  isMissingSupabaseTableError,
} from "../../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const reviewUpdateSchema = z
  .object({
    visibility: z.enum(["public", "private"]).optional(),
    isPublished: z.boolean().optional(),
  })
  .refine(
    (value) =>
      value.visibility !== undefined || value.isPublished !== undefined,
    {
      message: "No review updates were provided.",
    }
  );

function parseReviewId(value) {
  const parsedId = Number.parseInt(value || "", 10);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return null;
  }

  return parsedId;
}

export async function OPTIONS(request) {
  return optionsResponse(request, { methods: "PATCH, OPTIONS" });
}

export async function PATCH(request, { params }) {
  const authResult = await requireAdminSession(request);

  if (authResult.response) {
    return authResult.response;
  }

  const reviewId = parseReviewId(params?.id);

  if (!reviewId) {
    return json(request, { error: "Invalid review id." }, { status: 400 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return json(request, { error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = reviewUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return json(
      request,
      {
        error: "Invalid review update.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { reviewsTable } = getDataTableConfig();
    const updatePayload = {};

    if (parsed.data.visibility !== undefined) {
      updatePayload.visibility = parsed.data.visibility;
    }

    if (parsed.data.isPublished !== undefined) {
      updatePayload.is_published = parsed.data.isPublished;
    }

    const { data, error } = await supabase
      .from(reviewsTable)
      .update(updatePayload)
      .eq("id", reviewId)
      .select(reviewSelectFields)
      .maybeSingle();

    if (error) {
      if (isMissingSupabaseTableError(error)) {
        return json(
          request,
          {
            error: `Supabase table "${reviewsTable}" has not been created yet. Run the schema setup before managing reviews.`,
          },
          { status: 500 }
        );
      }

      console.error("Failed to update review", error);

      return json(
        request,
        {
          error: "Failed to update review.",
          details:
            process.env.NODE_ENV === "production" ? undefined : error.message,
        },
        { status: 500 }
      );
    }

    if (!data) {
      return json(request, { error: "Review not found." }, { status: 404 });
    }

    return json(request, {
      ok: true,
      review: toReviewPayload(data),
    });
  } catch (error) {
    console.error("Update review API error", error);
    return json(
      request,
      {
        error: "Review update service is unavailable.",
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
