import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, RefreshCcw, X } from "lucide-react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BrandLoader from "../../components/BrandLoader";
import PageHero from "../../components/PageHero";
import heroPortrait from "../../assets/me/hero.jpeg";
import API_URL from "./config";

const CARD_TITLE_LIMIT = 78;
const CARD_EXCERPT_LIMIT = 150;
const FEATURED_EXCERPT_LIMIT = 280;
const TOPIC_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "for",
  "from",
  "how",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "of",
  "on",
  "or",
  "our",
  "says",
  "so",
  "that",
  "the",
  "their",
  "this",
  "to",
  "what",
  "when",
  "why",
  "with",
]);
const FALLBACK_PALETTES = [
  {
    start: "#111d64",
    end: "#3e62b8",
    accent: "#f2c58d",
    detail: "#eff4ff",
    glow: "#8caef7",
  },
  {
    start: "#0f3846",
    end: "#1f6a7a",
    accent: "#9de8dc",
    detail: "#effffd",
    glow: "#79d4e4",
  },
  {
    start: "#3b2140",
    end: "#8f4b63",
    accent: "#ffd0a8",
    detail: "#fff2e8",
    glow: "#f4a7c5",
  },
  {
    start: "#2b2d18",
    end: "#7f6f32",
    accent: "#f5e59c",
    detail: "#fffbe6",
    glow: "#dccb70",
  },
];

const truncateText = (value = "", maxLength) => {
  const normalizedValue = value.trim();

  if (!normalizedValue || normalizedValue.length <= maxLength) {
    return normalizedValue;
  }

  return `${normalizedValue.slice(0, maxLength).trimEnd()}...`;
};

const formatPublishDate = (value) => {
  if (!value) {
    return "Fresh from TechCrunch";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const normalizeTopicLabel = (value = "") => {
  const sanitizedValue = value.replace(/[^a-z0-9+#/&\s-]/gi, " ").replace(/\s+/g, " ").trim();

  if (!sanitizedValue) {
    return "";
  }

  return sanitizedValue
    .split(" ")
    .map((part) => {
      if (
        part === part.toUpperCase() ||
        part.length <= 3 ||
        /[+#/&]/.test(part)
      ) {
        return part.toUpperCase();
      }

      return `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`;
    })
    .join(" ");
};

const getArticleTopics = (article = {}) => {
  const topics = [];
  const seenTopics = new Set();

  const pushTopic = (value) => {
    const label = normalizeTopicLabel(value);

    if (!label) {
      return;
    }

    const topicKey = label.toLowerCase();

    if (seenTopics.has(topicKey)) {
      return;
    }

    seenTopics.add(topicKey);
    topics.push(label);
  };

  (article.categories || []).forEach(pushTopic);

  (article.title || "")
    .replace(/[^a-z0-9+#/&\s-]/gi, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => word.length >= 3 && !TOPIC_STOP_WORDS.has(word.toLowerCase()))
    .forEach(pushTopic);

  return topics.slice(0, 3);
};

const hashString = (value = "") =>
  [...value].reduce(
    (accumulator, character) =>
      (accumulator * 31 + character.charCodeAt(0)) >>> 0,
    7
  );

const pickFallbackPalette = (article = {}) =>
  FALLBACK_PALETTES[
    hashString(
      `${article.title || ""}|${(article.categories || []).join("|")}`
    ) % FALLBACK_PALETTES.length
  ];

const wrapTitleForSvg = (value = "", maxLineLength = 24, maxLines = 4) => {
  const words = value.trim().split(/\s+/).filter(Boolean);

  if (!words.length) {
    return ["Tech story"];
  }

  const lines = [];
  let line = "";
  let wordIndex = 0;

  for (; wordIndex < words.length; wordIndex += 1) {
    const word = words[wordIndex];
    const candidate = line ? `${line} ${word}` : word;

    if (candidate.length <= maxLineLength || !line) {
      line = candidate;
      continue;
    }

    lines.push(line);
    line = word;

    if (lines.length === maxLines - 1) {
      wordIndex += 1;
      break;
    }
  }

  const remainingWords = [...(line ? [line] : []), ...words.slice(wordIndex)];

  if (remainingWords.length) {
    let finalLine = remainingWords.join(" ");

    if (finalLine.length > maxLineLength) {
      finalLine = `${finalLine.slice(0, maxLineLength - 3).trimEnd()}...`;
    }

    lines.push(finalLine);
  }

  return lines.slice(0, maxLines);
};

const escapeSvgText = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const createArticleFallbackImage = (article = {}) => {
  const title = article.title?.trim() || "TechCrunch story";
  const topics = getArticleTopics(article);
  const palette = pickFallbackPalette(article);
  const titleLines = wrapTitleForSvg(title, 23, 4);
  const topicLine = (topics.length ? topics : ["Startups", "Software", "Product"])
    .join(" • ")
    .toUpperCase();
  const anchorWord = (topics[0] || "Tech").toUpperCase().slice(0, 12);
  const footerCopy = article.author
    ? `By ${article.author}`
    : "Live from TechCrunch";
  const titleMarkup = titleLines
    .map(
      (line, index) => `
        <text
          x="96"
          y="${286 + index * 86}"
          fill="${palette.detail}"
          font-family="Manrope, Segoe UI, Arial, sans-serif"
          font-size="62"
          font-weight="800"
        >
          ${escapeSvgText(line)}
        </text>
      `
    )
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="${escapeSvgText(
      title
    )}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.start}" />
          <stop offset="100%" stop-color="${palette.end}" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${palette.glow}" stop-opacity="0.9" />
          <stop offset="100%" stop-color="${palette.glow}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#bg)" />
      <circle cx="1270" cy="180" r="240" fill="url(#glow)" opacity="0.7" />
      <circle cx="1460" cy="730" r="220" fill="url(#glow)" opacity="0.24" />
      <path
        d="M1040 90c120 14 218 112 234 232-70 66-145 130-237 179-84-81-139-195-139-298 42-78 79-122 142-145z"
        fill="rgba(255,255,255,0.08)"
      />
      <rect x="96" y="86" width="262" height="64" rx="24" fill="rgba(255,255,255,0.1)" />
      <text
        x="126"
        y="129"
        fill="${palette.detail}"
        font-family="Manrope, Segoe UI, Arial, sans-serif"
        font-size="30"
        font-weight="700"
        letter-spacing="2"
      >
        TECHCRUNCH
      </text>
      <text
        x="96"
        y="192"
        fill="${palette.accent}"
        font-family="Manrope, Segoe UI, Arial, sans-serif"
        font-size="28"
        font-weight="800"
        letter-spacing="6"
      >
        ${escapeSvgText(topicLine)}
      </text>
      ${titleMarkup}
      <text
        x="1492"
        y="758"
        fill="${palette.detail}"
        font-family="Manrope, Segoe UI, Arial, sans-serif"
        font-size="128"
        font-weight="800"
        opacity="0.13"
        text-anchor="end"
      >
        ${escapeSvgText(anchorWord)}
      </text>
      <text
        x="96"
        y="812"
        fill="${palette.detail}"
        font-family="Manrope, Segoe UI, Arial, sans-serif"
        font-size="30"
        font-weight="600"
        opacity="0.88"
      >
        ${escapeSvgText(footerCopy)}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const BlogArticleImage = ({ article, imageClassName }) => {
  const [hasError, setHasError] = useState(false);
  const fallbackSrc = useMemo(() => createArticleFallbackImage(article), [article]);
  const src = article?.imageUrl || "";
  const alt = article?.title || "TechCrunch article";

  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <img
      src={hasError || !src ? fallbackSrc : src}
      alt={alt}
      className={imageClassName}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
    />
  );
};

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const loadArticles = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_URL}/api/blogs/techcrunch`);
      setArticles(response.data?.items ?? []);
    } catch (requestError) {
      setError("The TechCrunch feed could not be loaded right now.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    if (!selectedArticle) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedArticle(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedArticle]);

  const [featuredArticle, remainingArticles] = useMemo(() => {
    if (!articles.length) {
      return [null, []];
    }

    return [articles[0], articles.slice(1)];
  }, [articles]);

  return (
    <div className="theme-page overflow-x-hidden">
      <Navbar />
      <PageHero
        eyebrow="Blog"
        title="Tech & Dev Radar"
        description="A live stream of TechCrunch stories for staying close to product launches, engineering shifts, startup momentum, and the wider tech conversation."
        image={heroPortrait}
      >
        <button
          type="button"
          className="theme-button-secondary px-6 py-3"
          onClick={loadArticles}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <BrandLoader inline />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCcw size={16} />
              Refresh Feed
            </>
          )}
        </button>
        <a
          href="https://techcrunch.com"
          target="_blank"
          rel="noopener noreferrer"
          className="theme-button-primary px-6 py-3"
        >
          Visit TechCrunch
        </a>
      </PageHero>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {error ? (
          <div className="glass-card blog-status-card">
            <p className="admin-status-error">{error}</p>
          </div>
        ) : null}

        {isLoading ? (
          <BrandLoader label="Loading stories" compact />
        ) : featuredArticle ? (
          <div className="space-y-10">
            <motion.article
              className="glass-card blog-feature-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="blog-feature-media-shell">
                <BlogArticleImage
                  article={featuredArticle}
                  imageClassName="blog-feature-image"
                />
              </div>
              <div className="blog-feature-copy">
                <div className="blog-chip-row">
                  <span className="theme-chip">Featured Story</span>
                  <span className="theme-chip">{formatPublishDate(featuredArticle.publishedAt)}</span>
                </div>
                <h2 className="blog-feature-title">{featuredArticle.title}</h2>
                <p className="blog-feature-excerpt">
                  {truncateText(
                    featuredArticle.excerpt || "No preview is available for this story yet.",
                    FEATURED_EXCERPT_LIMIT
                  )}
                </p>
                <div className="blog-chip-row">
                  {(featuredArticle.categories || []).slice(0, 3).map((category) => (
                    <span key={category} className="blog-category-chip">
                      {category}
                    </span>
                  ))}
                </div>
                <div className="blog-feature-actions">
                  <button
                    type="button"
                    className="theme-button-secondary px-6 py-3"
                    onClick={() => setSelectedArticle(featuredArticle)}
                  >
                    Read More
                  </button>
                  <a
                    href={featuredArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-button-primary px-6 py-3 inline-flex"
                  >
                    Read on TechCrunch
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.article>

            <div className="blog-grid">
              {remainingArticles.map((article) => (
                <article key={article.id} className="glass-card blog-card">
                  <div className="blog-card-media-shell">
                    <BlogArticleImage
                      article={article}
                      imageClassName="blog-card-image"
                    />
                  </div>
                  <div className="blog-card-copy">
                    <div className="blog-card-meta">
                      <span>{formatPublishDate(article.publishedAt)}</span>
                      <span>{article.author || "TechCrunch Staff"}</span>
                    </div>
                    <h3 className="blog-card-title">
                      {truncateText(article.title, CARD_TITLE_LIMIT)}
                    </h3>
                    <p className="blog-card-excerpt">
                      {truncateText(
                        article.excerpt || "No preview is available for this story yet.",
                        CARD_EXCERPT_LIMIT
                      )}
                    </p>
                    <div className="blog-chip-row">
                      {(article.categories || []).slice(0, 2).map((category) => (
                        <span key={category} className="blog-category-chip">
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="blog-card-actions">
                      <button
                        type="button"
                        className="theme-button-secondary blog-card-button"
                        onClick={() => setSelectedArticle(article)}
                      >
                        Read More
                      </button>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="theme-link inline-flex items-center gap-2 font-semibold"
                      >
                        Open article
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-card blog-status-card">
            <p className="theme-muted">No TechCrunch articles are available right now.</p>
          </div>
        )}
      </section>
      <AnimatePresence>
        {selectedArticle ? (
          <motion.div
            className="blog-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              className="glass-card blog-modal-shell"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="blog-preview-title"
            >
              <button
                type="button"
                className="blog-modal-close"
                onClick={() => setSelectedArticle(null)}
                aria-label="Close article preview"
              >
                <X size={18} />
              </button>
              <div className="blog-modal-grid">
                <div className="blog-modal-media-shell">
                  <BlogArticleImage
                    article={selectedArticle}
                    imageClassName="blog-modal-image"
                  />
                </div>
                <div className="blog-modal-copy">
                  <div className="blog-chip-row">
                    <span className="theme-chip">TechCrunch</span>
                    <span className="theme-chip">{formatPublishDate(selectedArticle.publishedAt)}</span>
                  </div>
                  <h2 id="blog-preview-title" className="blog-modal-title">
                    {selectedArticle.title}
                  </h2>
                  <div className="blog-modal-meta">
                    <span>{selectedArticle.author || "TechCrunch Staff"}</span>
                    <span>{selectedArticle.source || "TechCrunch"}</span>
                  </div>
                  <p className="blog-modal-excerpt">
                    {selectedArticle.excerpt || "No preview is available for this story yet."}
                  </p>
                  <div className="blog-chip-row">
                    {(selectedArticle.categories || []).slice(0, 4).map((category) => (
                      <span key={category} className="blog-category-chip">
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="blog-modal-actions">
                    <a
                      href={selectedArticle.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-button-primary px-6 py-3 inline-flex"
                    >
                      Read on TechCrunch
                      <ArrowUpRight size={16} />
                    </a>
                    <button
                      type="button"
                      className="theme-button-secondary px-6 py-3"
                      onClick={() => setSelectedArticle(null)}
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Blog;
