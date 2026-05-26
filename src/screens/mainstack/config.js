const configuredApiUrl = (import.meta.env.VITE_CONTACT_API_URL || "")
  .trim()
  .replace(/\/+$/, "");

// In dev, use same-origin /api requests so Vite can proxy to the local contact API.
const API_URL =
  configuredApiUrl ||
  (import.meta.env.DEV ? "" : "https://champion-service.vercel.app");

export default API_URL;
