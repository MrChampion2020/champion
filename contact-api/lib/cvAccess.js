import { randomBytes, randomUUID } from "node:crypto";
import { getCvAccessConfig, getDataTableConfig } from "./config";
import { getSupabaseAdminClient } from "./supabase";

const DEFAULT_TOKEN_TTL_HOURS = 72;

export function normalizeEmail(value = "") {
  return value.trim().toLowerCase();
}

export function createCvAccessToken() {
  return randomBytes(32).toString("base64url");
}

export function createChatId() {
  return randomUUID();
}

export function getCvTokenExpiryDate(ttlHours = DEFAULT_TOKEN_TTL_HOURS) {
  return new Date(Date.now() + ttlHours * 60 * 60 * 1000).toISOString();
}

export function toChatPayload(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    createdAt: row.created_at,
    requesterEmail: row.requester_email,
    requesterName: row.requester_name || "",
    status: row.status,
    approvedAt: row.approved_at || null,
    tokenExpiresAt: row.token_expires_at || null,
    hasAccessToken: Boolean(row.access_token),
  };
}

export function toMessagePayload(row) {
  return {
    id: row.id,
    chatId: row.chat_id,
    senderRole: row.sender_role,
    senderLabel: row.sender_label,
    content: row.content,
    createdAt: row.created_at,
  };
}

export function buildApprovalMessage({ requesterEmail, chatId, accessToken }) {
  return [
    `Access approved for ${requesterEmail}.`,
    `Chat ID: ${chatId}.`,
    `Your access token: ${accessToken}.`,
    "Use the Download CV button in this chat to open the protected file.",
  ].join(" ");
}

export async function insertChatMessage({
  chatId,
  senderRole,
  senderLabel,
  content,
}) {
  const supabase = getSupabaseAdminClient();
  const { cvAccessMessagesTable } = getDataTableConfig();

  const { data, error } = await supabase
    .from(cvAccessMessagesTable)
    .insert({
      chat_id: chatId,
      sender_role: senderRole,
      sender_label: senderLabel,
      content,
    })
    .select("id, chat_id, sender_role, sender_label, content, created_at")
    .single();

  if (error) {
    throw error;
  }

  return toMessagePayload(data);
}

export async function getChatById(chatId) {
  const supabase = getSupabaseAdminClient();
  const { cvAccessChatsTable } = getDataTableConfig();

  const { data, error } = await supabase
    .from(cvAccessChatsTable)
    .select(
      "id, created_at, requester_email, requester_name, status, access_token, token_expires_at, approved_at"
    )
    .eq("id", chatId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getChatMessages(chatId) {
  const supabase = getSupabaseAdminClient();
  const { cvAccessMessagesTable } = getDataTableConfig();

  const { data, error } = await supabase
    .from(cvAccessMessagesTable)
    .select("id, chat_id, sender_role, sender_label, content, created_at")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return (data || []).map(toMessagePayload);
}

export async function getPublicChatState(chatId, requesterEmail) {
  const chat = await getChatById(chatId);

  if (!chat || normalizeEmail(chat.requester_email) !== normalizeEmail(requesterEmail)) {
    return null;
  }

  const messages = await getChatMessages(chatId);
  const isApproved =
    chat.status === "approved" &&
    chat.access_token &&
    (!chat.token_expires_at || new Date(chat.token_expires_at) > new Date());

  return {
    chat: toChatPayload(chat),
    messages,
    accessToken: isApproved ? chat.access_token : "",
    downloadUrl: isApproved
      ? `/api/cv-access/download?token=${encodeURIComponent(chat.access_token)}`
      : "",
  };
}

export async function approveChatAccess(chatId) {
  const chat = await getChatById(chatId);

  if (!chat) {
    return { error: "CV access chat not found.", status: 404 };
  }

  if (chat.status === "approved" && chat.access_token) {
    return {
      chat: toChatPayload(chat),
      accessToken: chat.access_token,
      alreadyApproved: true,
    };
  }

  const accessToken = createCvAccessToken();
  const { tokenTtlHours } = getCvAccessConfig();
  const tokenExpiresAt = getCvTokenExpiryDate(tokenTtlHours);
  const approvedAt = new Date().toISOString();
  const supabase = getSupabaseAdminClient();
  const { cvAccessChatsTable } = getDataTableConfig();

  const { data, error } = await supabase
    .from(cvAccessChatsTable)
    .update({
      status: "approved",
      access_token: accessToken,
      token_expires_at: tokenExpiresAt,
      approved_at: approvedAt,
    })
    .eq("id", chatId)
    .select(
      "id, created_at, requester_email, requester_name, status, access_token, token_expires_at, approved_at"
    )
    .single();

  if (error) {
    throw error;
  }

  const approvalMessage = buildApprovalMessage({
    requesterEmail: chat.requester_email,
    chatId,
    accessToken,
  });

  await insertChatMessage({
    chatId,
    senderRole: "admin",
    senderLabel: chat.requester_email,
    content: approvalMessage,
  });

  return {
    chat: toChatPayload(data),
    accessToken,
    alreadyApproved: false,
  };
}
