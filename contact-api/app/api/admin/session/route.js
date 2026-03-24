import { z } from "zod";
import {
  createAdminSessionToken,
  getAdminByUsername,
  requireAdminSession,
  verifyPassword,
} from "../../../../lib/adminAuth";
import { json, optionsResponse } from "../../../../lib/http";
import { getSupabaseAdminClient, isMissingSupabaseTableError } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const loginSchema = z.object({
  username: z.string().trim().min(3).max(60),
  password: z.string().min(8).max(200),
});

export async function OPTIONS(request) {
  return optionsResponse(request);
}

export async function GET(request) {
  const authResult = await requireAdminSession(request);

  if (authResult.response) {
    return authResult.response;
  }

  return json(request, {
    ok: true,
    admin: authResult.admin,
  });
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return json(request, { error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return json(
      request,
      {
        error: "Invalid admin login data.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  try {
    const { admin, error, normalizedUsername, adminUsersTable } =
      await getAdminByUsername(parsed.data.username);

    if (error) {
      if (isMissingSupabaseTableError(error)) {
        return json(
          request,
          {
            error: `Supabase table "${adminUsersTable}" has not been created yet. Run the schema setup before using admin login.`,
            setupRequired: true,
          },
          { status: 500 }
        );
      }

      console.error("Failed to load admin account", error);
      return json(
        request,
        { error: "Admin login service is unavailable." },
        { status: 500 }
      );
    }

    if (
      !admin ||
      !admin.is_active ||
      !verifyPassword(parsed.data.password, admin.password_hash)
    ) {
      return json(
        request,
        { error: "Incorrect admin username or password." },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken(admin);
    const supabase = getSupabaseAdminClient();

    await supabase
      .from(adminUsersTable)
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", admin.id);

    return json(request, {
      ok: true,
      token,
      admin: {
        id: admin.id,
        username: normalizedUsername,
        displayName: admin.display_name || admin.username,
      },
    });
  } catch (error) {
    console.error("Admin session API error", error);
    return json(
      request,
      {
        error: "Admin login service is unavailable.",
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
