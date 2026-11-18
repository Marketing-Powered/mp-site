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
      // Legacy WordPress URLs that still receive Google Analytics traffic
      // (flagged by Semrush as orphaned pages returning 404). Each points at
      // the closest equivalent page on the current site.
      {
        source: "/services/ppc-campaign-management",
        destination: "/services/ppc",
        permanent: true,
      },
      {
        // Slug uses non-breaking hyphens (U+2011) in the original WordPress URL.
        source:
          "/services/lead-generation/why-mental%E2%80%91health-pay%E2%80%91per%E2%80%91click-is-different-and-why-you-need-an-expert",
        destination: "/resources/guides/mental-health-paid-media-playbook",
        permanent: true,
      },
      {
        source: "/services/lead-generation/:slug*",
        destination: "/resources/paid-media",
        permanent: true,
      },
      {
        source: "/specialties/mental-health-ppc-for-intakes-and-admissions",
        destination: "/who-we-help/mental-health",
        permanent: true,
      },
      {
        source: "/specialties/:slug*",
        destination: "/who-we-help",
        permanent: true,
      },
      {
        source:
          "/the-agentic-revolution-the-definitive-top-10-ai-martech-tools-defining-2025",
        destination: "/resources/ai-in-marketing",
        permanent: true,
      },
      {
        source: "/search-is-everywhere-why-your-brand-needs-seo-across-every-channel",
        destination: "/resources/guides/ai-visibility-seo-visibility-complementary",
        permanent: true,
      },
      // Legacy WordPress URLs reported as "Not found (404)" in Google Search
      // Console (Coverage export, 2026-11-18). Each points at the closest
      // equivalent page on the current site.
      {
        source: "/privacy-policy",
        destination: "/legal/privacy-policy",
        permanent: true,
      },
      {
        source: "/top-10-digital-marketing-tools-for-small-businesses",
        destination: "/resources",
        permanent: true,
      },
      {
        source: "/services/reputation-management",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/ppc/pay-per-click-vs-seo",
        destination: "/resources/rehab-ppc-vs-seo",
        permanent: true,
      },
      {
        source:
          "/services/ppc/best-practices-and-top-tips-on-creating-effective-ppc-ad-copies",
        destination: "/resources/google-ads",
        permanent: true,
      },
      {
        source:
          "/services/search-engine-optimization/large-language-model-optimization-llmo-ai-optimization-aio",
        destination:
          "/resources/guides/ai-discovery-optimization-what-replaces-traditional-seo",
        permanent: true,
      },
      {
        source: "/services/search-engine-optimization/youtube-video-seo-services",
        destination: "/services/youtube-ads",
        permanent: true,
      },
      // The old SEO service hub and any remaining children.
      {
        source: "/services/search-engine-optimization/:slug*",
        destination: "/services/local-seo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
