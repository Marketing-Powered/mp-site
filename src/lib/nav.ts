/* Client-safe site navigation config (no server/fs imports). */
export const NAV: {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}[] = [
  {
    label: "Services",
    href: "/services/",
    children: [
      { label: "Paid Media", href: "/services/paid-media/" },
      { label: "Meta Ads Management", href: "/services/meta-ads-management/" },
      { label: "Google Ads Management", href: "/services/google-ads-management/" },
      { label: "Landing Page Optimization", href: "/services/landing-page-optimization/" },
      { label: "Analytics & Attribution", href: "/services/analytics-and-attribution/" },
      { label: "Call Tracking & Intake", href: "/services/call-tracking-and-intake-attribution/" },
      { label: "Web Development", href: "/services/web-development/" },
    ],
  },
  {
    label: "AI Edge",
    href: "/ai-edge/",
    children: [
      { label: "AI in Paid Media", href: "/ai-edge/ai-in-paid-media/" },
      { label: "Owned AI Systems", href: "/ai-edge/owned-ai-systems/" },
      { label: "AI Governance", href: "/ai-edge/ai-governance/" },
      { label: "Data Sovereignty", href: "/ai-edge/data-sovereignty/" },
      { label: "Social Media", href: "/ai-edge/social-media/" },
    ],
  },
  {
    label: "Who We Help",
    href: "/who-we-help/",
    children: [
      { label: "Behavioral Health", href: "/who-we-help/behavioral-health/" },
      { label: "Residential Treatment", href: "/who-we-help/behavioral-health/residential-treatment/" },
      { label: "Mental Health", href: "/who-we-help/mental-health/" },
      { label: "Outpatient Clinics", href: "/who-we-help/mental-health/outpatient-clinics/" },
      { label: "Therapy Groups", href: "/who-we-help/mental-health/therapy-groups/" },
      { label: "Tele-Mental Health", href: "/who-we-help/mental-health/tele-mental-health/" },
      { label: "Psychiatric Practices", href: "/who-we-help/mental-health/psychiatric-practices/" },
    ],
  },
  {
    label: "Company",
    href: "/company/about/",
    children: [
      { label: "About", href: "/company/about/" },
      { label: "About Us", href: "/company/about-us/" },
      { label: "Contact", href: "/company/contact/" },
    ],
  },
];
