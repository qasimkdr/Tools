import type { NextConfig } from "next";

// Fully static export: `npm run build` writes plain HTML/CSS/JS to /out (deploy anywhere: Cloudflare Pages, Netlify, S3).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /tool-name/ -> one canonical URL form, matches sitemap + canonical tags
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
