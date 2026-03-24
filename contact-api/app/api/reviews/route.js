import { Resend } from "resend";
import { z } from "zod";
import { getContactConfig, getDataTableConfig } from "../../../lib/config";
import { getAllowedOrigin, json, optionsResponse } from "../../../lib/http";
import { reviewSelectFields, toReviewPayload } from "../../../lib/reviews";
import {
  getMissingSupabaseTableMessage,
  getSupabaseAdminClient,
  isMissingSupabaseTableError,
} from "../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const publicReviewSchema = z.object({
  name: z.string().trim().min(2).max(120),
  comment: z.string().trim().min(10).max(900),
  website: z.string().optional(),
});

function parseLimit(request) {
  const { searchParams } = new URL(request.url);
  const rawLimit = Number.parseInt(searchParams.get("limit") || "6", 10);

  if (Number.isNaN(rawLimit)) {
    return 6;
  }

  return Math.min(Math.max(rawLimit, 1), 24);
}

export async function OPTIONS(request) {
  return optionsResponse(request);
}

export async function GET(request) {
  try {
    const supabase = getSupabaseAdminClient();
    const { reviewsTable } = getDataTableConfig();
    const limit = parseLimit(request);
    const { data, error } = await supabase
      .from(reviewsTable)
      .select(reviewSelectFields)
      .eq("is_published", true)
      .eq("visibility", "public")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      if (isMissingSupabaseTableError(error)) {
        return json(request, {
          ok: true,
          reviews: [],
          setupRequired: true,
          setupMessage: getMissingSupabaseTableMessage(reviewsTable),
        });
      }

      console.error("Failed to load public reviews", error);

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
    console.error("Public reviews API error", error);
    return json(
      request,
      {
        error: "Reviews service is unavailable.",
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
  if (getAllowedOrigin(request) === null) {
    return json(request, { error: "Origin not allowed." }, { status: 403 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return json(request, { error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = publicReviewSchema.safeParse(body);

  if (!parsed.success) {
    return json(
      request,
      {
        error: "Invalid review submission.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return json(request, { ok: true }, { status: 200 });
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { reviewsTable } = getDataTableConfig();
    const record = {
      author_name: parsed.data.name,
      author_role: "",
      content: parsed.data.comment,
      visibility: "public",
      is_published: false,
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

      console.error("Failed to submit public review", error);

      return json(
        request,
        {
          error: "Failed to submit review.",
          details:
            process.env.NODE_ENV === "production" ? undefined : error.message,
        },
        { status: 500 }
      );
    }

    try {
      const contactConfig = getContactConfig();
      const resend = new Resend(contactConfig.resendApiKey);
      await resend.emails.send({
        from: contactConfig.resendFromEmail,
        to: [contactConfig.contactToEmail],
        subject: `New review awaiting approval: ${parsed.data.name}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;">
            <h2>New Review Submission</h2>
            <p><strong>Name:</strong> ${parsed.data.name}</p>
            <p><strong>Month/Year:</strong> ${new Date().toLocaleDateString("en-NG", {
              month: "short",
              year: "numeric",
            })}</p>
            <p><strong>Status:</strong> Awaiting admin approval</p>
            <p><strong>Comment:</strong></p>
            <p>${parsed.data.comment.replace(/\n/g, "<br />")}</p>
          </div>
        `,
        text: [
          "New Review Submission",
          `Name: ${parsed.data.name}`,
          `Month/Year: ${new Date().toLocaleDateString("en-NG", {
            month: "short",
            year: "numeric",
          })}`,
          "Status: Awaiting admin approval",
          "",
          "Comment:",
          parsed.data.comment,
        ].join("\n"),
      });
    } catch (emailError) {
      console.error("Review notification email failed", emailError);
    }

    return json(
      request,
      {
        ok: true,
        message:
          "Thank you. Your review has been received and is awaiting approval.",
        review: toReviewPayload(data),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Public review submission API error", error);
    return json(
      request,
      {
        error: "Review submission service is unavailable.",
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
