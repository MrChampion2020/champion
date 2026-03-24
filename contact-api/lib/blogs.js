function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripCdata(value = "") {
  const trimmedValue = value.trim();
  const cdataMatch = trimmedValue.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/i);
  return cdataMatch ? cdataMatch[1].trim() : trimmedValue;
}

function decodeHtmlEntities(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, codePoint) =>
      String.fromCodePoint(Number.parseInt(codePoint, 10))
    )
    .replace(/&#x([a-f0-9]+);/gi, (_, codePoint) =>
      String.fromCodePoint(Number.parseInt(codePoint, 16))
    )
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(value = "") {
  return decodeHtmlEntities(stripCdata(value))
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTagValue(xmlBlock, tagName) {
  const pattern = new RegExp(
    `<${escapeRegex(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapeRegex(tagName)}>`,
    "i"
  );
  const match = xmlBlock.match(pattern);
  return match ? stripCdata(match[1]) : "";
}

function extractTagValues(xmlBlock, tagName) {
  const pattern = new RegExp(
    `<${escapeRegex(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapeRegex(tagName)}>`,
    "gi"
  );
  return [...xmlBlock.matchAll(pattern)].map((match) =>
    stripHtml(match[1])
  );
}

function extractAttributeValue(markup = "", attributeName) {
  const pattern = new RegExp(
    `${escapeRegex(attributeName)}=["']([^"']+)["']`,
    "i"
  );
  const match = markup.match(pattern);
  return match ? decodeHtmlEntities(match[1].trim()) : "";
}

function normalizeUrl(value = "") {
  const normalizedValue = decodeHtmlEntities(value).trim();

  if (!normalizedValue) {
    return "";
  }

  if (normalizedValue.startsWith("//")) {
    return `https:${normalizedValue}`;
  }

  if (normalizedValue.startsWith("/")) {
    return `https://techcrunch.com${normalizedValue}`;
  }

  return normalizedValue;
}

function extractTagAttributeValues(xmlBlock, tagName, attributeName) {
  const pattern = new RegExp(
    `<${escapeRegex(tagName)}\\b[^>]*${escapeRegex(attributeName)}=["']([^"']+)["'][^>]*\\/?>`,
    "gi"
  );

  return [...xmlBlock.matchAll(pattern)].map((match) =>
    normalizeUrl(match[1])
  );
}

function parseSrcSetCandidates(srcSet = "") {
  return srcSet
    .split(",")
    .map((candidate) => candidate.trim())
    .filter(Boolean)
    .map((candidate) => {
      const [url = "", sizeToken = ""] = candidate.split(/\s+/, 2);
      const widthMatch = sizeToken.match(/^(\d+)w$/i);

      return {
        url: normalizeUrl(url),
        width: widthMatch ? Number.parseInt(widthMatch[1], 10) : 0,
      };
    })
    .filter((candidate) => candidate.url);
}

function normalizeSrcSetValue(srcSet = "") {
  const sortedCandidates = parseSrcSetCandidates(srcSet).sort(
    (leftCandidate, rightCandidate) => rightCandidate.width - leftCandidate.width
  );

  if (!sortedCandidates.length) {
    return "";
  }

  return sortedCandidates[0].url;
}

function scoreImageCandidate(candidateUrl, candidateIndex) {
  const normalizedCandidate = normalizeUrl(candidateUrl);

  if (!normalizedCandidate) {
    return Number.NEGATIVE_INFINITY;
  }

  const candidate = normalizedCandidate.toLowerCase();
  let score = 100 - candidateIndex;

  if (candidate.includes("techcrunch.com")) {
    score += 25;
  }

  if (candidate.includes("/wp-content/uploads/")) {
    score += 40;
  }

  if (/\.(avif|gif|jpe?g|png|webp)(?:\?|$)/i.test(candidate)) {
    score += 12;
  }

  const sizeMatch = candidate.match(/[-_](\d{2,4})x(\d{2,4})(?=\.|$|\?)/);
  if (sizeMatch) {
    const width = Number.parseInt(sizeMatch[1], 10);
    const height = Number.parseInt(sizeMatch[2], 10);

    if (width >= 600 && height >= 315) {
      score += 18;
    }
  }

  if (
    /(avatar|badge|emoji|favicon|gravatar|icon|logo|pixel|spinner|tracking)/i.test(
      candidate
    )
  ) {
    score -= 120;
  }

  if (/\.svg(?:\?|$)/i.test(candidate)) {
    score -= 50;
  }

  return score;
}

function extractImageUrl(xmlBlock) {
  const imageCandidates = [];
  const seenCandidates = new Set();

  const addCandidate = (candidateUrl) => {
    const normalizedCandidate = normalizeUrl(candidateUrl);

    if (
      !normalizedCandidate ||
      !/^https?:\/\//i.test(normalizedCandidate) ||
      seenCandidates.has(normalizedCandidate)
    ) {
      return;
    }

    seenCandidates.add(normalizedCandidate);
    imageCandidates.push(normalizedCandidate);
  };

  [
    ...extractTagAttributeValues(xmlBlock, "media:content", "url"),
    ...extractTagAttributeValues(xmlBlock, "media:thumbnail", "url"),
    ...extractTagAttributeValues(xmlBlock, "enclosure", "url"),
    extractTagValue(xmlBlock, "featured_image"),
    extractTagValue(xmlBlock, "jetpack:featured_image"),
    extractTagValue(xmlBlock, "jetpack-featured-image"),
  ].forEach(addCandidate);

  const htmlSource = [
    extractTagValue(xmlBlock, "content:encoded"),
    extractTagValue(xmlBlock, "description"),
  ]
    .filter(Boolean)
    .join(" ");

  const imageTags = [...htmlSource.matchAll(/<img\b[\s\S]*?>/gi)].map(
    (match) => match[0]
  );
  const directAttributes = [
    "data-lazy-src",
    "data-src",
    "data-orig-file",
    "data-medium-file",
    "data-large-file",
    "src",
  ];

  for (const imageTag of imageTags) {
    for (const attributeName of directAttributes) {
      addCandidate(extractAttributeValue(imageTag, attributeName));
    }

    addCandidate(
      normalizeSrcSetValue(
        extractAttributeValue(imageTag, "data-lazy-srcset") ||
          extractAttributeValue(imageTag, "srcset")
      )
    );
  }

  const rankedCandidates = imageCandidates
    .map((candidateUrl, candidateIndex) => ({
      candidateUrl,
      score: scoreImageCandidate(candidateUrl, candidateIndex),
    }))
    .sort((leftCandidate, rightCandidate) => rightCandidate.score - leftCandidate.score);

  return rankedCandidates[0]?.candidateUrl || "";
}

export function parseTechCrunchFeed(feedXml = "") {
  const items = feedXml.match(/<item\b[\s\S]*?<\/item>/gi) || [];

  return items
    .map((itemXml) => {
      const title = stripHtml(extractTagValue(itemXml, "title"));
      const link = stripHtml(extractTagValue(itemXml, "link"));
      const content =
        extractTagValue(itemXml, "content:encoded") ||
        extractTagValue(itemXml, "description");
      const excerpt = stripHtml(content);
      const categories = extractTagValues(itemXml, "category");
      const publishedAtRaw = stripHtml(extractTagValue(itemXml, "pubDate"));
      const publishedDate = publishedAtRaw ? new Date(publishedAtRaw) : null;
      const publishedAt =
        publishedDate && !Number.isNaN(publishedDate.getTime())
          ? publishedDate.toISOString()
          : "";

      return {
        id: link || title,
        source: "TechCrunch",
        title,
        link,
        excerpt,
        imageUrl: extractImageUrl(itemXml),
        author: stripHtml(extractTagValue(itemXml, "dc:creator")),
        publishedAt,
        categories,
      };
    })
    .filter((item) => item.title && item.link);
}
