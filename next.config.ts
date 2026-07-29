import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536],
  },

  async redirects() {
    return [
      // Legacy / mistyped paths -> canonical, single 301 each.
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
      {
        source: "/bahrain-to-dammam-taxi",
        destination: "/taxi-bahrain-to-dammam/",
        permanent: true,
      },
      {
        source: "/bahrain-to-dammam-taxi/",
        destination: "/taxi-bahrain-to-dammam/",
        permanent: true,
      },
      {
        source: "/dammam-to-bahrain-taxi",
        destination: "/taxi-dammam-to-bahrain/",
        permanent: true,
      },
      {
        source: "/dammam-to-bahrain-taxi/",
        destination: "/taxi-dammam-to-bahrain/",
        permanent: true,
      },
    ];
  },

  async headers() {
    const securityHeaders = [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https://www.google-analytics.com",
          "font-src 'self' data:",
          "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
          "frame-src https://www.google.com",
          "base-uri 'self'",
          "form-action 'self' https://wa.me",
        ].join("; "),
      },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
