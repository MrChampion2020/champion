import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  outputFileTracingIncludes: {
    "/api/cv-access/download": ["./private/sirchampion.pdf"],
  },
};

export default nextConfig;
