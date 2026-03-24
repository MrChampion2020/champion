const browserHostname =
  typeof window !== "undefined" ? window.location.hostname : "";

const localApiUrl = browserHostname
  ? `http://${browserHostname}:3000`
  : "http://localhost:3000";

const API_URL = localApiUrl;


export default API_URL;
