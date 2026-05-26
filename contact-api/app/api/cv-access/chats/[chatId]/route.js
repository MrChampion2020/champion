import { z } from "zod";
import { getPublicChatState } from "../../../../../lib/cvAccess";
import { json, optionsResponse } from "../../../../../lib/http";
import { isMissingSupabaseTableError } from "../../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const querySchema = z.object({
  email: z.string().trim().email().max(120),
});

export async function OPTIONS(request) {
  return optionsResponse(request);
}

export async function GET(request, { params }) {
  const chatId = params?.chatId || "";
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    email: searchParams.get("email") || "",
  });

  if (!chatId || !parsed.success) {
    return json(request, { error: "Chat ID and email are required." }, { status: 400 });
  }

  try {
    const chatState = await getPublicChatState(chatId, parsed.data.email);

    if (!chatState) {
      return json(request, { error: "Chat not found." }, { status: 404 });
    }

    return json(request, {
      ok: true,
      ...chatState,
    });
  } catch (error) {
    console.error("Load CV access chat error", error);

    if (isMissingSupabaseTableError(error)) {
      return json(request, { error: "CV access service is not configured yet." }, { status: 503 });
    }

    return json(request, { error: "CV access chat could not be loaded." }, { status: 500 });
  }
}
