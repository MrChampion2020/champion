function firstDefinedValue(values) {
  return values.find((value) => typeof value === "string" && value.trim()) || "";
}

function assertSupabaseServerKey(key) {
  if (key.startsWith("sb_publishable_")) {
    throw new Error(
      "SUPABASE_SECRET_KEY is using a publishable key. Use a Supabase secret key (sb_secret_...) or a legacy service_role key for this server route."
    );
  }

  if (!key.startsWith("eyJ")) {
    return;
  }

  try {
    const payloadSegment = key.split(".")[1];

    if (!payloadSegment) {
      return;
    }

    const payload = JSON.parse(
      Buffer.from(payloadSegment, "base64url").toString("utf8")
    );

    if (payload?.role === "anon") {
      throw new Error(
        "SUPABASE_SECRET_KEY is using an anon key. Use a Supabase secret key (sb_secret_...) or a legacy service_role key for this server route."
      );
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("SUPABASE_SECRET_KEY")) {
      throw error;
    }
  }
}

function ensureRequiredConfig(config, requiredKeys) {
  const missingKeys = requiredKeys.filter((key) => !config[key]);

  if (missingKeys.length) {
    throw new Error(`Missing required environment variables: ${missingKeys.join(", ")}`);
  }
}

function parseIntegerWithFallback(value, fallbackValue) {
  const parsedValue = Number.parseInt(value || "", 10);

  if (Number.isNaN(parsedValue)) {
    return fallbackValue;
  }

  return parsedValue;
}

export function getSupabaseConfig() {
  const config = {
    supabaseUrl: firstDefinedValue([
      process.env.SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_URL,
    ]),
    supabaseSecretKey: firstDefinedValue([
      process.env.SUPABASE_SECRET_KEY,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    ]),
  };

  ensureRequiredConfig(config, ["supabaseUrl", "supabaseSecretKey"]);

  assertSupabaseServerKey(config.supabaseSecretKey);

  return config;
}

export function getDataTableConfig() {
  return {
    contactTable: process.env.SUPABASE_CONTACT_TABLE || "contact_messages",
    adminUsersTable: process.env.SUPABASE_ADMIN_USERS_TABLE || "admin_users",
    currentProjectsTable:
      process.env.SUPABASE_CURRENT_PROJECTS_TABLE || "current_projects",
    reviewsTable: process.env.SUPABASE_REVIEWS_TABLE || "reviews",
    cvAccessChatsTable:
      process.env.SUPABASE_CV_ACCESS_CHATS_TABLE || "cv_access_chats",
    cvAccessMessagesTable:
      process.env.SUPABASE_CV_ACCESS_MESSAGES_TABLE || "cv_access_messages",
  };
}

export function getCvAccessConfig() {
  return {
    pdfPath:
      firstDefinedValue([process.env.CV_PDF_PATH]) ||
      "private/sirchampion.pdf",
    tokenTtlHours: Math.min(
      Math.max(parseIntegerWithFallback(process.env.CV_ACCESS_TOKEN_TTL_HOURS, 72), 1),
      168
    ),
  };
}

export function getContactConfig() {
  const config = {
    ...getSupabaseConfig(),
    ...getDataTableConfig(),
    resendApiKey: firstDefinedValue([process.env.RESEND_API_KEY]),
    resendFromEmail: firstDefinedValue([process.env.RESEND_FROM_EMAIL]),
    contactToEmail: firstDefinedValue([process.env.CONTACT_TO_EMAIL]),
  };

  ensureRequiredConfig(config, [
    "supabaseUrl",
    "supabaseSecretKey",
    "resendApiKey",
    "resendFromEmail",
    "contactToEmail",
  ]);

  return config;
}

export function getAdminSessionConfig() {
  const config = {
    sessionSecret: firstDefinedValue([
      process.env.ADMIN_SESSION_SECRET,
      process.env.SUPABASE_SECRET_KEY,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    ]),
    sessionTtlHours: Math.min(
      Math.max(parseIntegerWithFallback(process.env.ADMIN_SESSION_TTL_HOURS, 12), 1),
      168
    ),
  };

  ensureRequiredConfig(config, ["sessionSecret"]);

  return config;
}

export function getTechCrunchConfig() {
  return {
    feedUrl: process.env.TECHCRUNCH_FEED_URL || "https://techcrunch.com/feed/",
  };
}

export function getCloudinaryConfig() {
  const config = {
    cloudName: firstDefinedValue([process.env.CLOUDINARY_CLOUD_NAME]),
    apiKey: firstDefinedValue([process.env.CLOUDINARY_API_KEY]),
    apiSecret: firstDefinedValue([process.env.CLOUDINARY_API_SECRET]),
    uploadFolder:
      firstDefinedValue([process.env.CLOUDINARY_UPLOAD_FOLDER]) ||
      "champion/current-projects",
  };

  ensureRequiredConfig(config, ["cloudName", "apiKey", "apiSecret"]);

  return config;
}
