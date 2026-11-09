import type { NextConfig } from "next";

const longLivedPublicAssetHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 2678400,
    qualities: [70, 72, 75],
    // Article cover images and the webinar poster are served from their
    // publishers' CDNs through the image optimizer (resized, cached 31 days).
    remotePatterns: [
      { protocol: "https", hostname: "media.licdn.com", pathname: "/dms/image/**" },
      { protocol: "https", hostname: "cdn-images-1.medium.com", pathname: "/max/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
    localPatterns: [
      {
        pathname: "/images/**",
        search: "",
      },
      {
        pathname: "/images/pages/home/**",
        search: "?v=20260624",
      },
    ],
  },
  async headers() {
    return [
      {
        // HSTS: the site is HTTPS-only, so instruct browsers to never try HTTP.
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: longLivedPublicAssetHeaders,
      },
      {
        source: "/logo.svg",
        headers: longLivedPublicAssetHeaders,
      },
      {
        source: "/favicon.ico",
        headers: longLivedPublicAssetHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // /company/about-us/ was a duplicate of /company/about/; redirect permanently.
      // Paths are non-trailing-slash to match the served canonical (trailingSlash
      // defaults to false), so requests land directly on the 200 without an extra hop.
      {
        source: "/company/about-us",
        destination: "/company/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
