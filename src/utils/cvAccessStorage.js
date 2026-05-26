const CV_CHAT_ID_KEY = "sirchamp_cv_chat_id";
const CV_CHAT_EMAIL_KEY = "sirchamp_cv_chat_email";

export function getStoredCvAccessSession() {
  if (typeof window === "undefined") {
    return { chatId: "", email: "" };
  }

  return {
    chatId: window.sessionStorage.getItem(CV_CHAT_ID_KEY) || "",
    email: window.sessionStorage.getItem(CV_CHAT_EMAIL_KEY) || "",
  };
}

export function persistCvAccessSession(chatId, email) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(CV_CHAT_ID_KEY, chatId);
  window.sessionStorage.setItem(CV_CHAT_EMAIL_KEY, email);
}

export function clearCvAccessSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(CV_CHAT_ID_KEY);
  window.sessionStorage.removeItem(CV_CHAT_EMAIL_KEY);
}
