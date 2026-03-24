import { parseTechCrunchFeed } from "../../../../lib/blogs";
import { getTechCrunchConfig } from "../../../../lib/config";
import { json, optionsResponse } from "../../../../lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(request) {
  return optionsResponse(request);
}

export async function GET(request) {
  try {
    const config = getTechCrunchConfig();
    const feedResponse = await fetch(config.feedUrl, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml",
        "User-Agent": "SirChampionPortfolio/1.0",
      },
      next: { revalidate: 900 },
    });

    if (!feedResponse.ok) {
      return json(
        request,
        { error: "Failed to load TechCrunch feed." },
        { status: 502 }
      );
    }

    const feedXml = await feedResponse.text();
    const items = parseTechCrunchFeed(feedXml).slice(0, 24);

    return json(request, {
      ok: true,
      source: "TechCrunch",
      items,
    });
  } catch (error) {
    console.error("TechCrunch feed API error", error);
    return json(
      request,
      {
        error: "Blog feed service is unavailable.",
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
