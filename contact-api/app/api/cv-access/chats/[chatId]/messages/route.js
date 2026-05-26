import { z } from "zod";
import { getChatById, insertChatMessage, normalizeEmail } from "../../../../../../lib/cvAccess";
import { getAllowedOrigin, json, optionsResponse } from "../../../../../../lib/http";
import { isMissingSupabaseTableError } from "../../../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const messageSchema = z.object({
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(1).max(900),
  website: z.string().optional(),
});

export async function OPTIONS(request) {
  return optionsResponse(request);
}

export async function POST(request, { params }) {
  if (getAllowedOrigin(request) === null) {
    return json(request, { error: "Origin not allowed." }, { status: 403 });
  }

  const chatId = params?.chatId || "";
  let body;

  try {
    body = await request.json();
  } catch {
    return json(request, { error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = messageSchema.safeParse(body);

  if (!chatId || !parsed.success) {
    return json(
      request,
      {
        error: "Invalid chat message.",
        fields: parsed.success ? undefined : parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return json(request, { ok: true }, { status: 200 });
  }

  try {
    const chat = await getChatById(chatId);

    if (!chat || normalizeEmail(chat.requester_email) !== normalizeEmail(parsed.data.email)) {
      return json(request, { error: "Chat not found." }, { status: 404 });
    }

    const message = await insertChatMessage({
      chatId,
      senderRole: "user",
      senderLabel: normalizeEmail(parsed.data.email),
      content: parsed.data.message.trim(),
    });

    return json(request, { ok: true, message }, { status: 201 });
  } catch (error) {
    console.error("Create CV access chat message error", error);

    if (isMissingSupabaseTableError(error)) {
      return json(request, { error: "CV access service is not configured yet." }, { status: 503 });
    }

    return json(request, { error: "Message could not be sent." }, { status: 500 });
  }
}
