import { requireAdminSession } from "../../../../../../../lib/adminAuth";
import { approveChatAccess, getChatMessages } from "../../../../../../../lib/cvAccess";
import { json, optionsResponse } from "../../../../../../../lib/http";
import { isMissingSupabaseTableError } from "../../../../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(request) {
  return optionsResponse(request);
}

export async function POST(request, { params }) {
  const authResult = await requireAdminSession(request);

  if (authResult.response) {
    return authResult.response;
  }

  const chatId = params?.chatId || "";

  if (!chatId) {
    return json(request, { error: "Chat ID is required." }, { status: 400 });
  }

  try {
    const result = await approveChatAccess(chatId);

    if (result.error) {
      return json(request, { error: result.error }, { status: result.status || 400 });
    }

    const messages = await getChatMessages(chatId);

    return json(request, {
      ok: true,
      chat: result.chat,
      accessToken: result.accessToken,
      alreadyApproved: result.alreadyApproved,
      messages,
    });
  } catch (error) {
    console.error("Approve CV access chat error", error);

    if (isMissingSupabaseTableError(error)) {
      return json(request, { error: "CV access service is not configured yet." }, { status: 503 });
    }

    return json(request, { error: "CV access could not be approved." }, { status: 500 });
  }
}
