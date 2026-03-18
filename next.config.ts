import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence the workspace-root warning caused by a parent-level lockfile
  outputFileTracingRoot: path.join(__dirname),

  // Serve modern image formats (avif → webp fallback) for better LCP
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow SVGs from placehold.co (placeholder images in dev/demo)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Legacy allowlist (some tooling still checks this)
    domains: [
      "placehold.co",
      "cdn.prod.website-files.com",
      "www.texasselectfencing.com",
      "wordpress.com",
    ],
    // Allow placehold.co in dev/demo. In production replace with your CDN domain.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        // Webflow assets used by the reference site (Texas Select Fencing)
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "www.texasselectfencing.com",
      },
      {
        // Allow the live WP media domain once WP_API_URL is set.
        // Replace with your actual WordPress hostname, e.g. "cms.fenceco.com"
        protocol: "https",
        hostname: "**.wordpress.com",
      },
    ],
  },

  // Compress responses with gzip/brotli
  compress: true,

  // Enforce strict mode for React (catches double-renders in dev)
  reactStrictMode: true,

  // Aggressive cache headers for static assets (_next/static is immutable)
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)\\.(jpg|jpeg|png|webp|avif|svg|ico|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
