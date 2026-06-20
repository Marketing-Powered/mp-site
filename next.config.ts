import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
