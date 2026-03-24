const ADMIN_SESSION_TOKEN_KEY = "sirchamp_admin_session_token";
const ADMIN_SESSION_USER_KEY = "sirchamp_admin_session_user";

export function getAdminToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.sessionStorage.getItem(ADMIN_SESSION_TOKEN_KEY) || "";
}

export function getStoredAdminUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(ADMIN_SESSION_USER_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

export function persistAdminSession(token, adminUser) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(ADMIN_SESSION_TOKEN_KEY, token);

  if (adminUser) {
    window.sessionStorage.setItem(
      ADMIN_SESSION_USER_KEY,
      JSON.stringify(adminUser)
    );
  }
}

export function clearAdminSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(ADMIN_SESSION_TOKEN_KEY);
  window.sessionStorage.removeItem(ADMIN_SESSION_USER_KEY);
}

export function getAdminAuthHeaders(token = getAdminToken()) {
  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}
