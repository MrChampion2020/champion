import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { getAdminSessionConfig, getDataTableConfig } from "./config";
import { json } from "./http";
import {
  getMissingSupabaseTableMessage,
  getSupabaseAdminClient,
  getSupabaseQueryErrorMessage,
  isMissingSupabaseTableError,
} from "./supabase";

const PASSWORD_HASH_PREFIX = "s1";
const SESSION_TOKEN_TYPE = "sirchamp-admin";

function normalizeUsername(value = "") {
  return value.trim().toLowerCase();
}

function base64UrlEncode(value) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function createTokenSignature(encodedPayload, secret) {
  return createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64url");
}

function getBearerToken(request) {
  const authorizationHeader = request.headers.get("authorization") || "";
  const headerMatch = authorizationHeader.trim().match(/^Bearer\s+(.+)$/i);

  return headerMatch ? headerMatch[1] : "";
}

export function createPasswordHash(
  password,
  salt = randomBytes(16).toString("hex")
) {
  const derivedKey = scryptSync(password.normalize("NFKC"), salt, 64).toString(
    "hex"
  );

  return `${PASSWORD_HASH_PREFIX}$${salt}$${derivedKey}`;
}

export function verifyPassword(password, storedHash = "") {
  const [prefix, salt, expectedHash] = storedHash.split("$");

  if (!prefix || !salt || !expectedHash || prefix !== PASSWORD_HASH_PREFIX) {
    return false;
  }

  const expectedBuffer = Buffer.from(expectedHash, "hex");
  const actualBuffer = Buffer.from(
    scryptSync(password.normalize("NFKC"), salt, expectedBuffer.length).toString(
      "hex"
    ),
    "hex"
  );

  return (
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}

export function createAdminSessionToken(adminUser) {
  const { sessionSecret, sessionTtlHours } = getAdminSessionConfig();
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + sessionTtlHours * 60 * 60;
  const payload = {
    typ: SESSION_TOKEN_TYPE,
    sub: String(adminUser.id),
    username: normalizeUsername(adminUser.username),
    displayName:
      adminUser.display_name || adminUser.displayName || adminUser.username,
    iat: issuedAt,
    exp: expiresAt,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = createTokenSignature(encodedPayload, sessionSecret);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token = "") {
  const { sessionSecret } = getAdminSessionConfig();
  const [encodedPayload, providedSignature] = token.split(".");

  if (!encodedPayload || !providedSignature) {
    return null;
  }

  const expectedSignature = createTokenSignature(encodedPayload, sessionSecret);
  const providedSignatureBuffer = Buffer.from(providedSignature, "utf8");
  const expectedSignatureBuffer = Buffer.from(expectedSignature, "utf8");

  if (
    providedSignatureBuffer.length !== expectedSignatureBuffer.length ||
    !timingSafeEqual(providedSignatureBuffer, expectedSignatureBuffer)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));

    if (
      payload?.typ !== SESSION_TOKEN_TYPE ||
      !payload?.sub ||
      !payload?.username ||
      typeof payload?.exp !== "number" ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getAdminByUsername(username) {
  const supabase = getSupabaseAdminClient();
  const { adminUsersTable } = getDataTableConfig();
  const normalizedUsername = normalizeUsername(username);
  const { data, error } = await supabase
    .from(adminUsersTable)
    .select("id, username, display_name, password_hash, is_active")
    .eq("username", normalizedUsername)
    .maybeSingle();

  return {
    admin: data,
    error,
    normalizedUsername,
    adminUsersTable,
  };
}

export async function getAuthenticatedAdmin(request) {
  const token = getBearerToken(request);

  if (!token) {
    return {
      admin: null,
      status: 401,
      message: "Please sign in to continue.",
    };
  }

  const payload = verifyAdminSessionToken(token);

  if (!payload) {
    return {
      admin: null,
      status: 401,
      message: "Your admin session is invalid or has expired.",
    };
  }

  const supabase = getSupabaseAdminClient();
  const { adminUsersTable } = getDataTableConfig();
  const { data, error } = await supabase
    .from(adminUsersTable)
    .select("id, username, display_name, is_active")
    .eq("id", payload.sub)
    .maybeSingle();

  if (error) {
    if (isMissingSupabaseTableError(error)) {
      return {
        admin: null,
        status: 500,
        message: `Supabase table "${adminUsersTable}" has not been created yet. Run the schema setup before using admin login.`,
      };
    }

    console.error("Failed to validate admin session", error);
    return {
      admin: null,
      status: 500,
      message: getSupabaseQueryErrorMessage(error, adminUsersTable),
    };
  }

  if (
    !data ||
    !data.is_active ||
    normalizeUsername(data.username) !== payload.username
  ) {
    return {
      admin: null,
      status: 401,
      message: "Your admin session is no longer valid.",
    };
  }

  return {
    admin: {
      id: data.id,
      username: data.username,
      displayName: data.display_name || data.username,
    },
    status: 200,
    message: "",
  };
}

export async function requireAdminSession(request) {
  const authResult = await getAuthenticatedAdmin(request);

  if (authResult.admin) {
    return authResult;
  }

  if (authResult.status >= 500) {
    return {
      response: json(
        request,
        {
          error: authResult.message,
          setupRequired: true,
        },
        { status: authResult.status }
      ),
    };
  }

  return {
    response: json(
      request,
      {
        error: authResult.message || "Unauthorized.",
      },
      {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Bearer realm="Sir Champion Admin"',
        },
      }
    ),
  };
}
