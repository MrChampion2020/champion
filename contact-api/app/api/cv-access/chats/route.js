import { z } from "zod";
import { getDataTableConfig } from "../../../../lib/config";
import {
  createChatId,
  insertChatMessage,
  normalizeEmail,
  toChatPayload,
} from "../../../../lib/cvAccess";
import { getAllowedOrigin, json, optionsResponse } from "../../../../lib/http";
import {
  getSupabaseAdminClient,
  isMissingSupabaseTableError,
} from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const createChatSchema = z.object({
  email: z.string().trim().email().max(120),
  name: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().max(900).optional().default(""),
  website: z.string().optional(),
});

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

  const parsed = createChatSchema.safeParse(body);

  if (!parsed.success) {
    return json(
      request,
      {
        error: "Invalid CV access request.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return json(request, { ok: true }, { status: 200 });
  }

  const requesterEmail = normalizeEmail(parsed.data.email);
  const requesterName = parsed.data.name.trim();
  const requestMessage =
    parsed.data.message.trim() ||
    "Hello, I would like permission to download the CV.";

  try {
    const supabase = getSupabaseAdminClient();
    const { cvAccessChatsTable } = getDataTableConfig();
    const chatId = createChatId();

    const { data, error } = await supabase
      .from(cvAccessChatsTable)
      .insert({
        id: chatId,
        requester_email: requesterEmail,
        requester_name: requesterName,
        status: "pending",
      })
      .select(
        "id, created_at, requester_email, requester_name, status, access_token, token_expires_at, approved_at"
      )
      .single();

    if (error) {
      if (isMissingSupabaseTableError(error)) {
        return json(
          request,
          { error: "CV access service is not configured yet." },
          { status: 503 }
        );
      }

      throw error;
    }

    const systemMessage = await insertChatMessage({
      chatId,
      senderRole: "system",
      senderLabel: "System",
      content: `Access request opened for ${requesterEmail}. Chat ID: ${chatId}. An admin will review this request shortly.`,
    });

    const userMessage = await insertChatMessage({
      chatId,
      senderRole: "user",
      senderLabel: requesterEmail,
      content: requestMessage,
    });

    return json(
      request,
      {
        ok: true,
        chat: toChatPayload(data),
        messages: [systemMessage, userMessage],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create CV access chat error", error);
    return json(request, { error: "CV access request could not be created." }, { status: 500 });
  }
}
