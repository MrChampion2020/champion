import { NextResponse } from "next/server";

export function splitCsv(value = "") {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getAllowedOrigin(request) {
  const requestOrigin = request.headers.get("origin");
  const allowedOrigins = splitCsv(process.env.ALLOWED_ORIGINS);

  if (!requestOrigin) {
    return allowedOrigins[0] || "*";
  }

  if (!allowedOrigins.length) {
    return "*";
  }

  return allowedOrigins.includes(requestOrigin) ? requestOrigin : null;
}

export function corsHeaders(
  request,
  {
    methods = "GET, POST, OPTIONS",
    allowHeaders = "Content-Type, Authorization",
  } = {}
) {
  const allowedOrigin = getAllowedOrigin(request);

  return {
    "Access-Control-Allow-Origin": allowedOrigin || "null",
    "Access-Control-Allow-Methods": methods,
    "Access-Control-Allow-Headers": allowHeaders,
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function json(request, payload, init = {}, corsOptions = {}) {
  return NextResponse.json(payload, {
    ...init,
    headers: {
      ...corsHeaders(request, corsOptions),
      ...(init.headers || {}),
    },
  });
}

export function optionsResponse(request, corsOptions = {}) {
  const allowedOrigin = getAllowedOrigin(request);

  if (allowedOrigin === null) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request, corsOptions),
  });
}
