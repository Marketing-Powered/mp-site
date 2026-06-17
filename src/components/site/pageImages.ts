/* ================================================================== */
/*  Page imagery map.                                                  */
/*  We only have the 8 on-brand graphics in /public/images (01-08).    */
/*  Rather than hand-place them per route, we key an ordered pool off  */
/*  the top-level URL segment. Components consume the pool in order:    */
/*  [0] = hero, [1..] = section slots. Pools never repeat an image, so  */
/*  no page shows the same graphic twice; images are deliberately       */
/*  reused across sections where they fit the theme. If a page has more  */
/*  slots than its pool has images, ImageSlot falls back to its dashed  */
/*  placeholder — so extra slots stay graceful.                         */
/* ================================================================== */

export type SlotImg = { src: string; alt: string; fit?: "contain" | "cover" };

const img = (file: string, alt: string): SlotImg => ({
  src: `/images/${file}`,
  alt,
  fit: "contain",
});

const HERO = img("01-hero-banner.jpg", "Marketing Powered team driving data-driven growth");
const CONCEPT = img("02-key-concept-illustration.jpg", "AI-powered behavioral health marketing concept map");
const PROCESS = img("03-infographic-process-steps.jpg", "AI-driven behavioral health marketing process, step by step");
const STATS = img("04-infographic-stats-data.jpg", "Performance metrics: reduced cost per lead and full attribution");
const ICONS = img("05-supporting-icon-set.jpg", "Marketing Powered capabilities at a glance");
const QUOTE = img("06-quote-callout-graphic.jpg", "AI-native strategies. No guesswork. No compliance surprises.");
const DIVIDER = img("07-section-divider-illustration.jpg", "Boosting results through AI optimization");
const TAKEAWAYS = img("08-summary-takeaways-visual.jpg", "Key takeaways: AI-powered behavioral health marketing");

/* ------------------------------------------------------------------ */
/*  Page-specific overrides.                                           */
/*  Each page also has its OWN tailored 8-image set (sourced per-page  */
/*  from Asana) that beats the shared segment pool. As pages get wired */
/*  up, add their hand-picked, section-matched images here keyed by    */
/*  the page's full url. The pool is consumed in order: [0] hero, then */
/*  [1..] the section slots ("Concept", "Process", "Results & Proof"). */
/*  Files live under /images/pages/<segment>/<page>/.                  */
/* ------------------------------------------------------------------ */
const pageImg = (route: string, file: string, alt: string): SlotImg => ({
  src: `/images/pages/${route}/${file}`,
  alt,
  fit: "contain",
});

/* Standard MarkdownPage set: hero + the three section slots
   (Concept Illustration, Process Infographic, Results & Proof), wired to the
   conventional 01/02/03/04 filenames. `alts` is [hero, concept, process, results]. */
const std4 = (route: string, alts: [string, string, string, string]): SlotImg[] => [
  pageImg(route, "01-hero-banner.jpg", alts[0]),
  pageImg(route, "02-concept.jpg", alts[1]),
  pageImg(route, "03-process.jpg", alts[2]),
  pageImg(route, "04-results.jpg", alts[3]),
];

const ROUTE_OVERRIDES: Record<string, SlotImg[]> = {
  "/company/about/": [
    // [0] hero — abstract on-brand growth banner
    pageImg(
      "company/about",
      "01-hero-banner.jpg",
      "Marketing Powered: an AI-native behavioral health marketing agency",
    ),
    // [1] after "Our Founder and Leadership" — founder quote callout
    pageImg(
      "company/about",
      "06-founder-quote.jpg",
      "Founder Mike Hulick: operator experience shapes every strategy — we know what happens after the lead comes in",
    ),
    // [2] mid (AI-native / expertise) — the growth framework
    pageImg(
      "company/about",
      "03-growth-framework.jpg",
      "Our AI-powered behavioral health growth framework: founder-led strategy, AI-native workflows, specialization, paid media, and attribution to admission",
    ),
    // [3] near "Proven Success" — results and proof points
    pageImg(
      "company/about",
      "04-results-stats.jpg",
      "Proven results: scaling 3 to 24 locations and $50M+ in managed paid media spend with attribution discipline",
    ),
  ],

  /* ---- Services cluster ---- */

  // Hub (HubPage): only index [1] is rendered as the "Capabilities Overview".
  "/services/": [
    pageImg(
      "services/hub",
      "01-hero-banner.jpg",
      "Explore Marketing Powered's comprehensive marketing services for behavioral health",
    ),
    pageImg(
      "services/hub",
      "05-capabilities.jpg",
      "Marketing Powered service capabilities: paid media, AI-driven insights, behavioral health marketing, revenue attribution, operator experience, and compliance solutions",
    ),
  ],

  "/services/paid-media/": std4("services/paid-media", [
    "Paid media agency for behavioral health: $50M+ managed with full ad-to-admission attribution",
    "Paid ads to admission funnel: first click and call, intake qualification, operator-backed experience",
    "Paid media process: audit and funnel mapping, compliant build, full-funnel attribution, optimization, and budget pacing",
    "Paid media results for behavioral health: $50M+ managed, 8X facility growth, 100% platform-compliant, admission-level metrics over vanity data",
  ]),

  "/services/google-ads-management/": std4("services/google-ads-management", [
    "Expert Google Ads management for behavioral health, tracked through to admissions",
    "Google Ads path: precision targeting, intelligent bidding, and creative optimization to qualified admissions",
    "Google Ads management framework: precision targeting, intelligent bidding, creative optimization, and attribution to admission",
    "Google Ads results: 34% lower cost per lead, more qualified calls, 2.3X return on ad spend, scaled 3 to 24 locations",
  ]),

  "/services/meta-ads-management/": std4("services/meta-ads-management", [
    "Meta Ads agency expertise to boost admissions across Facebook and Instagram",
    "The shift from chasing low cost-per-lead to AI-driven precision optimizing for admissions",
    "Step-by-step Meta Ads process: discovery, strategic planning, creative development, campaign execution, AI optimization, and transparent reporting",
    "Meta Ads results: $50M+ behavioral health media managed with operator-level insights, AI optimization, and compliant strategy",
  ]),

  "/services/landing-page-optimization/": std4("services/landing-page-optimization", [
    "Strategic landing page optimization to convert more qualified admission calls",
    "Optimized behavioral health landing page lifting conversion from 3% to 6% admissions",
    "Landing page optimization process: strategic audit, testing roadmap, execute experiments, analyze data, and implement winners",
    "Behavioral health landing page performance: optimized pages convert 5-8%, lower bounce, Haven Health scaled 3 to 24 locations",
  ]),

  "/services/analytics-and-attribution/": std4("services/analytics-and-attribution", [
    "Advanced marketing attribution built for behavioral health: know exactly which channels drive admissions",
    "Multi-touch attribution mapping a Google Ads click through organic search, phone call, and consultation to a confirmed admission",
    "Attribution methodology: full-stack audit, cleanse data and infrastructure, deploy multi-touch models, and optimize ROI based on admissions",
    "Attribution analytics: know which channels drive admissions, +35% ROI improvement, with HIPAA-aware methodology",
  ]),

  // Hero swapped to the clean funnel graphic; the original 01 hero had a garbled headline.
  "/services/call-tracking-and-intake-attribution/": std4(
    "services/call-tracking-and-intake-attribution",
    [
      "Call tracking and intake attribution for treatment centers: reduced cost-per-admission, maximized marketing ROI",
      "Stop guessing which channels: intake attribution reduces cost-per-admission by 20-40% within the first 90 days",
      "Call tracking process: capture call source, inform intake team, track intake stages, measure ROI, ensure HIPAA compliance, and optimize budget",
      "Call tracking results: admissions up 20-40%, cost-per-admission reduced, on HIPAA-compliant infrastructure",
    ],
  ),

  /* ---- Web Development sub-cluster ---- */

  // Hub (HubPage): only index [1] renders. Capabilities icon set.
  "/services/web-development/": [
    pageImg(
      "services/web-development/hub",
      "01-hero-banner.jpg",
      "Expert healthcare web development: compliant code, operator insight, marketing results",
    ),
    pageImg(
      "services/web-development/hub",
      "05-capabilities.jpg",
      "Healthcare web development capabilities: HIPAA compliance, conversion focus, marketing integration, operator experience, AI optimization, and attribution clarity",
    ),
  ],

  "/services/web-development/website-design-and-build/": std4(
    "services/web-development/website-design-and-build",
    [
      "Custom healthcare websites for growth: patient-centered design, built for compliance",
      "Healthcare website design agency: HIPAA-conscious development, EHR integration, measurable lead quality",
      "Our proven web design process: discovery, information architecture, visual design, development and compliance review, launch and testing, ongoing optimization",
      "Custom website design for healthcare: $50M+ in managed media spend, solutions scaled from small practices to multi-location organizations",
    ],
  ),

  "/services/web-development/landing-page-development/": std4(
    "services/web-development/landing-page-development",
    [
      "Custom landing page development for healthcare: convert visitors into qualified leads",
      "From first click to patient admission: strategy, mobile-first design, integration and attribution",
      "Our landing page development process: strategy and discovery, design and architecture, development and integration, testing and optimization",
      "Landing page development as your conversion accelerator: healthcare expertise, operator experience, custom architecture, measurable outcomes",
    ],
  ),

  // PARTIAL: only 01/02/04 supplied by Asana, and 01's hero headline was garbled
  // ("OPTIMIZATTION") — so the clean conversion funnel (02) is promoted to hero and
  // the results graphic (04) fills the first section slot. Two images, by design.
  "/services/web-development/cro-development/": [
    pageImg(
      "services/web-development/cro-development",
      "01-hero-banner.jpg",
      "Behavioral health treatment center conversion optimization funnel: from visitors to fueled admissions",
    ),
    pageImg(
      "services/web-development/cro-development",
      "02-concept.jpg",
      "Maximizing admissions with data-driven CRO: full-funnel tracking, reduced cost per inquiry, measurable success metrics",
    ),
  ],

  "/services/web-development/technical-seo-and-performance/": std4(
    "services/web-development/technical-seo-and-performance",
    [
      "Technical SEO and site performance optimization built on the discipline behind $50M+ in managed media spend",
      "Technical SEO is your site's foundation: crawlability, site architecture, and Core Web Vitals driving performance gains",
      "Our technical SEO and performance framework: crawlability and indexing audit, site architecture, Core Web Vitals assessment, performance and remediation roadmap",
      "Technical SEO key statistics: Core Web Vitals targets, performance optimization strategies, and foundational SEO layers",
    ],
  ),

  "/services/web-development/integrations-and-tracking/": std4(
    "services/web-development/integrations-and-tracking",
    [
      "Comprehensive marketing tracking implementation: GA4, GTM, and server-side tracking for growth",
      "Unifying website, social, search ads, and call tracking into accurate analytics, tag management, and compliant server-side tracking",
      "Behavioral health tracking implementation process: measurement planning and compliance audit, GA4 and event configuration, GTM and tag management, server-side routing",
      "Tracking implementation drives behavioral health growth: GA4 implementation quality, optimized GTM setup, and server-side tracking benefits",
    ],
  ),

  /* ---- AI Edge cluster ---- */

  // Hub (HubPage): only index [1] renders. Capabilities icon set.
  "/ai-edge/": [
    pageImg(
      "ai-edge/hub",
      "01-hero-banner.jpg",
      "Marketing Powered's AI edge for behavioral health advertising",
    ),
    pageImg(
      "ai-edge/hub",
      "05-capabilities.jpg",
      "AI capabilities: owned AI infrastructure, predictive analytics, data sovereignty, admission tracking, multi-variant optimization, and ethical advertising",
    ),
  ],

  "/ai-edge/owned-ai-systems/": std4("ai-edge/owned-ai-systems", [
    "Owned AI systems: move beyond API wrappers and build AI infrastructure you control",
    "The owned AI advantage: building control, security, and independence with local inference hardware",
    "Phased implementation of your owned AI system: define and analyze, infrastructure setup, data integration, deploy and scale",
    "Owned AI results: 1.4X faster iteration cycles, sub-100ms latency, complete compliance, and scalable growth",
  ]),

  "/ai-edge/ai-in-paid-media/": std4("ai-edge/ai-in-paid-media", [
    "Optimize paid media with AI for performance-driven agency growth",
    "AI in paid media: advanced targeting, real-time bidding, multivariate testing, and budget allocation",
    "Framework for AI integration: identify bottlenecks, platform-native bidding, connect CRM and offline conversions, vertical compliance, predictive AI",
    "Key takeaways on AI in paid media: strategic shift, boosted efficiency, and scalable growth",
  ]),

  // Hero swapped to the clean concept (02) — Asana's 01 hero headline was garbled
  // ("APPPLICATONS"), and 04 had placeholder artifacts; 3 clean images supplied.
  "/ai-edge/data-sovereignty/": [
    pageImg(
      "ai-edge/data-sovereignty",
      "01-hero-banner.jpg",
      "Navigating data sovereignty: AI data compliance and healthcare data control",
    ),
    pageImg(
      "ai-edge/data-sovereignty",
      "02-concept.jpg",
      "Data sovereignty essentials: data residency, legal jurisdiction, HIPAA compliance, AI data mapping, technical controls, and contractual provisions",
    ),
    pageImg(
      "ai-edge/data-sovereignty",
      "03-process.jpg",
      "Implementing data sovereignty in AI systems: build a compliant data inventory, conduct jurisdiction analysis, implement controls, maintain an audit-ready posture",
    ),
  ],

  // Process slot uses the clean takeaways graphic (08) — Asana's 03 was a
  // placeholder-text draft ("Semi BOLD" cards).
  "/ai-edge/ai-governance/": std4("ai-edge/ai-governance", [
    "Building responsible AI in healthcare: understanding AI governance",
    "The four pillars of AI governance: policy, technical controls, accountability, and continuous monitoring",
    "AI governance in practice: establish policies and controls, assign accountability, conduct a compliance inventory, implement continuous monitoring",
    "Navigating AI governance in healthcare: addressing risk and liabilities, maturing governance for acceleration, key elements of AI compliance",
  ]),

  "/ai-edge/social-media/": std4("ai-edge/social-media", [
    "Leverage AI for social media marketing effectiveness: AI-native strategies built for compliance and growth",
    "AI-driven social media cycle: data analysis, scalable content generation, real-time optimization, and admission-focused results",
    "Implementing AI social media marketing for behavioral health: compliance architecture, AI-native integration, content strategy, optimization, ethical oversight",
    "Leverage AI for social media: AI's role, content creation benefits, and healthcare-specific compliance architecture",
  ]),

  /* ---- Who We Help cluster ---- */

  // Hub (HubPage): only index [1] renders. Capabilities icon set.
  "/who-we-help/": [
    pageImg(
      "who-we-help/hub",
      "01-hero-banner.jpg",
      "Who Marketing Powered helps: behavioral health and mental health providers",
    ),
    pageImg(
      "who-we-help/hub",
      "05-capabilities.jpg",
      "How we help: operator expertise, compliant growth, mental health reach, admission attribution, tech-enabled marketing, and strategic navigation",
    ),
  ],

  "/who-we-help/behavioral-health/": std4("who-we-help/behavioral-health", [
    "Expert behavioral health marketing: operator-built marketing for treatment centers to scale admissions",
    "Specialized behavioral health marketing driving census growth, from qualified leads through intake and insurance verification to admissions",
    "Five steps to optimize behavioral health admissions: compliantly audit, architect strategy, build authority, full-funnel attribution, continuous optimization",
    "Data-powered behavioral health marketing results: scaling 3 to 24 locations, $50M+ managed, +$140M revenue growth, zero compliance violations",
  ]),

  // Hero swapped to the clean path graphic (02) — Asana's 01 hero showed literal
  // "[CTA]" placeholder button tokens. Three clean images.
  "/who-we-help/behavioral-health/residential-treatment/": [
    pageImg(
      "who-we-help/behavioral-health/residential-treatment",
      "01-hero-banner.jpg",
      "Residential treatment center marketing: paid media precision, SEO growth, and conversion to measurable admission growth",
    ),
    pageImg(
      "who-we-help/behavioral-health/residential-treatment",
      "02-concept.jpg",
      "The MP framework for residential treatment center marketing: revenue audit, compliance foundation, multi-channel visibility, AI optimization, closed-loop attribution",
    ),
    pageImg(
      "who-we-help/behavioral-health/residential-treatment",
      "03-process.jpg",
      "Data-driven residential treatment center marketing: 100% regulatory fluency, zero platform shutdowns, proven admission and cost-per-admission performance",
    ),
  ],

  // Hero swapped to the clean concept (02) — Asana's 01 hero was unbalanced with
  // garbled labels. Three clean images.
  "/who-we-help/mental-health/": [
    pageImg(
      "who-we-help/mental-health",
      "01-hero-banner.jpg",
      "Intelligent mental health marketing: data-forward growth from mental health needs to admissions-focused attribution",
    ),
    pageImg(
      "who-we-help/mental-health",
      "02-concept.jpg",
      "The Marketing Powered mental health acceleration process: compliance foundation, omnichannel deployment, conversion optimization, attribution, growth scale",
    ),
    pageImg(
      "who-we-help/mental-health",
      "03-process.jpg",
      "Measuring impact for mental health admissions: prioritizing qualified leads over volume, key metrics that matter, compliance and category expertise",
    ),
  ],

  // Hero swapped to the clean path graphic (02) — Asana's 01 hero showed a literal
  // "[CTA]" placeholder button token. Three clean images.
  "/who-we-help/mental-health/outpatient-clinics/": [
    pageImg(
      "who-we-help/mental-health/outpatient-clinics",
      "01-hero-banner.jpg",
      "Outpatient clinic marketing that fills your schedule: paid search, local SEO, and referral networks driving compliant patient acquisition",
    ),
    pageImg(
      "who-we-help/mental-health/outpatient-clinics",
      "02-concept.jpg",
      "Outpatient clinic patient acquisition framework: discovery and alignment, compliance integration, multi-channel acquisition, operator-led optimization, measurable outcomes",
    ),
    pageImg(
      "who-we-help/mental-health/outpatient-clinics",
      "03-process.jpg",
      "Outpatient clinic data-driven growth: proven strategy mix, reduced cost per acquisition, improved lead quality, clinical attribution, compliance-first foundation",
    ),
  ],

  "/who-we-help/mental-health/psychiatric-practices/": std4(
    "who-we-help/mental-health/psychiatric-practices",
    [
      "Psychiatric practice marketing solutions for sustainable patient growth",
      "Psychiatric practice growth: patient acquisition, AI-native infrastructure, HIPAA compliance, paid search, content marketing, and referral networks",
      "Four steps to effective psychiatric practice marketing: align on compliance and goals, target high-intent channels, deploy AI-powered tech, measure attribution to admission",
      "Psychiatric practice growth metrics: acquisition cost efficiency, click-to-admission conversion funnel, and patient lifetime value",
    ],
  ),

  "/who-we-help/mental-health/tele-mental-health/": std4(
    "who-we-help/mental-health/tele-mental-health",
    [
      "Telehealth marketing for mental health: acquire patients and scale virtually with AI-powered strategies",
      "Boosting virtual mental health appointments: geo-targeted paid media, telehealth-specific SEO, and HIPAA-conscious campaigns",
      "Proven process for virtual provider patient acquisition: compliance audit, paid media targeting, multi-state landing pages, full-funnel attribution, AI optimization",
      "Effective telehealth marketing strategies: virtual visits up 30x, geographic precision, attribution to admission, 20-40% lower cost per acquisition",
    ],
  ),

  "/who-we-help/mental-health/therapy-groups/": std4(
    "who-we-help/mental-health/therapy-groups",
    [
      "Therapy practice marketing built for compliance and qualified client growth",
      "Therapy practice marketing flow: compliance and reputation, performance campaigns, and qualified client inquiries",
      "Proven framework for therapy practice marketing: define and optimize high-intent channels, build authority and trust, expand reach and referrals, measure and optimize",
      "Measuring success for therapy practice marketing: channel effectiveness, inquiry-to-intake conversion, return on ad spend, and lifetime value by acquisition",
    ],
  ),

  /* ---- Company: Contact ---- */

  // Process slot uses the clean takeaways graphic (08) — Asana's 03 carried
  // raw hex-swatch artifacts and "[CTA]" placeholder tokens.
  "/company/contact/": std4("company/contact", [
    "Behavioral health marketing expertise: connect with specialists in compliance, specialized media, and AI-native infrastructure",
    "Get in touch with Marketing Powered: start a conversation about compliance, admissions growth, and targeted leads with vertical-specific experts",
    "Contacting Marketing Powered: connect with experts, navigate compliance and restrictions, drive measurable results, and start a conversation",
    "Behavioral health marketing impact: $50M+ managed media spend, court-certified expert witness, and LegitScript certification fluency",
  ]),

  /* ---- Problems: Reduce CPA ---- */

  // Process slot uses the clean takeaways graphic (08) — Asana's 03 carried a
  // "Just Sans Variable Semi Bold" placeholder subtitle.
  "/problems/reduce-cpa/": std4("problems/reduce-cpa", [
    "How to effectively reduce CPA for better budget management: smarter targeting, tighter attribution, compliance-first execution",
    "Reducing cost per acquisition through refined targeting, smarter attribution, and compliance-first campaigns that protect reputation",
    "Key takeaways to reduce CPA: refine targeting, deploy AI bidding, align landing pages, and close the attribution loop to admission",
    "Pro strategies to reduce CPA: average CPA reduction, decreased wasted spend, and increased attributed admissions",
  ]),

  /* ---- Get Started cluster ---- */

  // Hub (HubPage): only index [1] renders. Capabilities icon set.
  "/get-started/": [
    pageImg(
      "get-started/hub",
      "01-hero-banner.jpg",
      "Start your journey with Marketing Powered: operator-led strategy and AI infrastructure for behavioral health growth",
    ),
    pageImg(
      "get-started/hub",
      "05-capabilities.jpg",
      "Get started with Marketing Powered: marketing audit, personalized strategy, operator expertise, regulatory compliance, AI-native insights, optimized performance",
    ),
  ],

  // Hero swapped to the clean concept (02) — Asana's 01 hero headline was garbled
  // ("audit auditay"). Three clean images.
  "/get-started/request-an-audit/": [
    pageImg(
      "get-started/request-an-audit",
      "01-hero-banner.jpg",
      "Marketing audit to uncover inefficiencies: expert assessment backed by $50M+ in managed behavioral health spend",
    ),
    pageImg(
      "get-started/request-an-audit",
      "02-concept.jpg",
      "Our free marketing audit process: request the audit, full assessment, competitive benchmarking, and deliver findings",
    ),
    pageImg(
      "get-started/request-an-audit",
      "03-process.jpg",
      "Free marketing audit results: $50M+ behavioral health ad spend experience, wasted spend identified, and lower cost per admission call",
    ),
  ],

  // book-a-call has only 01-04 in Asana; 03 was a placeholder-text draft, so the
  // results graphic (04) fills the second section slot. Three clean images.
  "/get-started/book-a-call/": [
    pageImg(
      "get-started/book-a-call",
      "01-hero-banner.jpg",
      "Schedule your marketing consultation: direct access to operators with $50M+ in behavioral health media spend",
    ),
    pageImg(
      "get-started/book-a-call",
      "02-concept.jpg",
      "Direct access to expert operators that scales treatment center admissions, backed by $50M+ managed spend and AI-native systems",
    ),
    pageImg(
      "get-started/book-a-call",
      "03-process.jpg",
      "Behavioral health marketing results: scaling 3 to 24 locations, +700% growth, 28% lower cost per lead, 47% more qualified calls",
    ),
  ],

  // qualification: 01-03 are clean; Asana's 04 carried placeholder caption text.
  "/get-started/qualification/": [
    pageImg(
      "get-started/qualification",
      "01-hero-banner.jpg",
      "Service qualification requirements: not every treatment center is the right fit, and this process helps both sides find out",
    ),
    pageImg(
      "get-started/qualification",
      "02-concept.jpg",
      "Service qualification: finding the right fit together through budget alignment, compliance readiness, and growth objectives",
    ),
    pageImg(
      "get-started/qualification",
      "03-process.jpg",
      "The qualification process: submit information, team review, schedule a discovery call, discuss strategy, and confirm partnership fit",
    ),
  ],
};

/* Ordered pools keyed by the first URL segment. */
const POOLS: Record<string, SlotImg[]> = {
  home: [HERO, QUOTE, ICONS, TAKEAWAYS],
  company: [HERO, QUOTE, ICONS, TAKEAWAYS],
  services: [STATS, PROCESS, ICONS, TAKEAWAYS],
  "ai-edge": [CONCEPT, PROCESS, ICONS, DIVIDER],
  "who-we-help": [HERO, TAKEAWAYS, ICONS, QUOTE],
  problems: [STATS, PROCESS, QUOTE, TAKEAWAYS],
  "get-started": [HERO, ICONS, QUOTE, TAKEAWAYS],
};

export function pageImages(url: string): SlotImg[] {
  // Per-page hand-picked sets win over the shared segment pool. Normalize the
  // trailing slash so "/company/about" and "/company/about/" both match.
  const withSlash = url.endsWith("/") ? url : `${url}/`;
  const override = ROUTE_OVERRIDES[withSlash];
  if (override) return override;

  const seg = url.split("/").filter(Boolean)[0] || "home";
  return POOLS[seg] || POOLS.home;
}
