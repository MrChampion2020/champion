const configuredApiUrl = (import.meta.env.VITE_CONTACT_API_URL || "")
  .trim()
  .replace(/\/+$/, "");

const API_URL = configuredApiUrl || "https://champion-service.vercel.app";


export default API_URL;
