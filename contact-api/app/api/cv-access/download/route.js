import { readFile } from "node:fs/promises";
import path from "node:path";
import { getCvAccessConfig, getDataTableConfig } from "../../../../lib/config";
import { corsHeaders, optionsResponse } from "../../../../lib/http";
import { getSupabaseAdminClient } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(request) {
  return optionsResponse(request, {
    methods: "GET, OPTIONS",
  });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = (searchParams.get("token") || "").trim();

  if (!token) {
    return new Response(JSON.stringify({ error: "Access token is required." }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(request, { methods: "GET, OPTIONS" }),
      },
    });
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { cvAccessChatsTable } = getDataTableConfig();
    const { data, error } = await supabase
      .from(cvAccessChatsTable)
      .select("id, requester_email, status, access_token, token_expires_at")
      .eq("access_token", token)
      .eq("status", "approved")
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (
      !data ||
      data.access_token !== token ||
      (data.token_expires_at && new Date(data.token_expires_at) <= new Date())
    ) {
      return new Response(JSON.stringify({ error: "Invalid or expired access token." }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders(request, { methods: "GET, OPTIONS" }),
        },
      });
    }

    const { pdfPath } = getCvAccessConfig();
    const resolvedPdfPath = path.isAbsolute(pdfPath)
      ? pdfPath
      : path.join(process.cwd(), pdfPath);
    const pdfBuffer = await readFile(resolvedPdfPath);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="SirChampion-CV.pdf"',
        "Cache-Control": "private, no-store",
        ...corsHeaders(request, { methods: "GET, OPTIONS" }),
      },
    });
  } catch (error) {
    console.error("Protected CV download error", error);
    return new Response(JSON.stringify({ error: "CV download is unavailable." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(request, { methods: "GET, OPTIONS" }),
      },
    });
  }
}
