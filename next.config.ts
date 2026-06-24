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
  },
  async headers() {
    return [
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
