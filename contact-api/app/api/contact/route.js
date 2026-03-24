import { Resend } from "resend";
import { z } from "zod";
import { buildContactEmailHtml, buildContactEmailText } from "../../../lib/contactEmail";
import { getContactConfig } from "../../../lib/config";
import { getAllowedOrigin, json, optionsResponse } from "../../../lib/http";
import { getSupabaseAdminClient } from "../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().max(30).optional().default(""),
  subject: z.string().trim().min(3).max(140),
  message: z.string().trim().min(10).max(4000),
  website: z.string().optional(),
});

export async function GET(request) {
  return json(request, {
    ok: true,
    service: "champion-contact-api",
    route: "/api/contact",
    methods: ["GET", "POST", "OPTIONS"],
  });
}

export async function OPTIONS(request) {
  return optionsResponse(request);
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

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return json(
      request,
      {
        error: "Invalid form data.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const submission = parsed.data;

  if (submission.website) {
    return json(request, { ok: true }, { status: 200 });
  }

  try {
    const config = getContactConfig();
    const supabase = getSupabaseAdminClient();
    const record = {
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      subject: submission.subject,
      message: submission.message,
    };

    const { error: insertError } = await supabase
      .from(config.contactTable)
      .insert(record);

    if (insertError) {
      console.error("Supabase insert failed", insertError);
      return json(
        request,
        {
          error: "Failed to save message.",
          details:
            process.env.NODE_ENV === "production" ? undefined : insertError.message,
        },
        { status: 500 }
      );
    }

    const resend = new Resend(config.resendApiKey);
    const { data: emailResult, error: emailError } = await resend.emails.send({
      from: config.resendFromEmail,
      to: [config.contactToEmail],
      replyTo: submission.email,
      subject: `New contact form: ${submission.subject}`,
      html: buildContactEmailHtml(record),
      text: buildContactEmailText(record),
    });

    if (emailError) {
      console.error("Resend delivery failed", emailError);
      return json(
        request,
        {
          error: "Message saved, but email delivery failed.",
          details:
            process.env.NODE_ENV === "production" ? undefined : emailError.message,
        },
        { status: 502 }
      );
    }

    return json(request, {
      ok: true,
      messageId: emailResult?.id || null,
    });
  } catch (error) {
    console.error("Contact API error", error);
    return json(
      request,
      {
        error: "Contact service is not configured correctly.",
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
