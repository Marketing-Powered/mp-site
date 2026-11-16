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

export type SlotImg = { src: string; alt: string; fit?: "contain" | "cover"; ratio?: string };

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

/* Square / portrait artwork (quote cards) gets its own frame ratio so it is not
   letterboxed inside a 16:9 slot. */
const shaped = (ratio: string, img: SlotImg): SlotImg => ({ ...img, ratio });

/* Standard MarkdownPage set: hero + the three section slots
   (Concept Illustration, Process Infographic, Results & Proof), wired to the
   conventional 01/02/03/04 filenames. `alts` is [hero, concept, process, results]. */
const std4 = (route: string, alts: [string, string, string, string]): SlotImg[] => [
  pageImg(route, "01-hero-banner.jpg", alts[0]),
  pageImg(route, "02-concept.jpg", alts[1]),
  pageImg(route, "03-process.jpg", alts[2]),
  pageImg(route, "04-results.jpg", alts[3]),
];

/* ---- Decorative photography (November 2026 homepage release) ----------
   Abstract light studies shipped with the homepage package. They do not
   depict staff, offices, equipment, or client work, so they carry empty
   alt text (ImageSlot keeps an explicit "" as decorative). Used as hero
   art on supporting pages whose previous graphics carried held claims
   (spend totals, percentage results, certification language, a former
   employer's name, or the expert-witness credential). */
const decoCover = (file: string): SlotImg => ({
  src: `/images/pages/home/${file}`,
  alt: "",
  fit: "cover",
});
const DECO_FIELD = decoCover("home-hero-light-field.jpg");
const DECO_WINDOW = decoCover("home-experience-window-light.jpg");
const DECO_ROWS = decoCover("home-infrastructure-light-rows.jpg");

const ROUTE_OVERRIDES: Record<string, SlotImg[]> = {
  "/areas-we-serve/palm-beach-gardens/": [
    // [0] hero
    pageImg(
      "areas-we-serve/palm-beach-gardens",
      "01-hero.jpg",
      "A business owner and a marketing lead reviewing a printed inquiry log next to a laptop showing a call log.",
    ),
    // [1] section image
    pageImg(
      "areas-we-serve/palm-beach-gardens",
      "02-section.jpg",
      "A practice manager and a clinical staff member discussing scheduling in a bright clinic hallway.",
    ),
    // [2] section image
    pageImg(
      "areas-we-serve/palm-beach-gardens",
      "03-section.jpg",
      "A front-desk coordinator answering an inquiry call while a colleague takes notes at a reception desk.",
    ),
    // [3] section image
    pageImg(
      "areas-we-serve/palm-beach-gardens",
      "04-section.jpg",
      "Five questions for judging marketing performance: where the inquiry came from, whether it was a real prospect, what happened next, whether it holds up by service line and location, and whether the record can be shown.",
    ),
  ],
  "/services/mental-health-seo/": [
    // [0] hero
    pageImg(
      "services/mental-health-seo",
      "01-hero.jpg",
      "Two staff members review a call log and scheduling screen together at a bright clinic reception counter, with empty waiting room chairs in the background.",
    ),
    // [1] section image
    pageImg(
      "services/mental-health-seo",
      "02-section.jpg",
      "A practice owner and operations lead review a list of clinic locations together on a wall monitor in a meeting room.",
    ),
    // [2] section image
    pageImg(
      "services/mental-health-seo",
      "03-section.jpg",
      "A clinician and a marketing coordinator review a draft clinician biography together on a laptop in a quiet office.",
    ),
    // [3] section image
    pageImg(
      "services/mental-health-seo",
      "04-section.jpg",
      "Three-column diagram showing visibility, conversion and measurement checks for a mental health SEO diagnosis, with two checks under each heading.",
    ),
  ],
  "/who-we-help/behavioral-health/substance-use-disorder/": [
    // [0] hero
    pageImg(
      "who-we-help/behavioral-health/substance-use-disorder",
      "01-hero.jpg",
      "Admissions coordinator taking a phone call at a desk in a bright office, with a colleague working in the background.",
    ),
    // [1] section image
    pageImg(
      "who-we-help/behavioral-health/substance-use-disorder",
      "02-section.jpg",
      "Two treatment center leaders reviewing a whiteboard that lists programs and open capacity in a conference room.",
    ),
    // [2] section image
    pageImg(
      "who-we-help/behavioral-health/substance-use-disorder",
      "03-section.jpg",
      "Admissions director and marketing lead reviewing a printed monthly report together in a meeting room.",
    ),
    // [3] section image
    pageImg(
      "who-we-help/behavioral-health/substance-use-disorder",
      "04-section.jpg",
      "A marketing lead and an admissions director review the same laptop together at a desk.",
    ),
  ],
  "/areas-we-serve/": [
    // [0] hero
    pageImg(
      "areas-we-serve",
      "01-hero.jpg",
      "A marketing lead and a practice owner review a printed page and a laptop together at a bright office table.",
    ),
    // [1] section image
    pageImg(
      "areas-we-serve",
      "02-section.jpg",
      "Map of Palm Beach County showing Marketing Powered's base in Palm Beach Gardens and the areas served, West Palm Beach and Jupiter.",
    ),
    // [2] section image
    pageImg(
      "areas-we-serve",
      "03-section.jpg",
      "A marketing coordinator and a colleague compare service pages on a tablet at a desk.",
    ),
    // [3] section image
    pageImg(
      "areas-we-serve",
      "04-section.jpg",
      "Four-step flow from reviewing existing search, website and ad accounts, through sharing access, a senior team review, and agreed scoping.",
    ),
  ],
  // Only the abstract hero remains. The founder-quote, growth-framework, and
  // results-stats graphics carried the expert-witness credential, "AI-native
  // since 2022", a $50M+ spend total, and the former employer's name (held
  // claims per the November 2026 package), so they are no longer rendered.
  "/company/about/": [
    pageImg(
      "company/about",
      "01-hero-banner.jpg",
      "Abstract Marketing Powered brand graphic with upward arrows",
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

  // Hero and results graphics carried "$50M+ managed", "8X facility growth",
  // and "100% compliant" (held claims); the process graphic had placeholder
  // typos. Decorative hero plus the illustrative funnel diagram remain.
  "/services/paid-media/": [
    DECO_FIELD,
    pageImg(
      "services/paid-media",
      "02-concept.jpg",
      "Illustrative paid media path: first click or call, intake qualification, and admission",
    ),
  ],
  "/services/google-ads-management/": std4("services/google-ads-management", [
    "Expert Google Ads management for behavioral health, tracked through to admissions",
    "Google Ads path: precision targeting, intelligent bidding, and creative optimization to qualified admissions",
    "Google Ads management framework: precision targeting, intelligent bidding, creative optimization, and attribution to admission",
    "Google Ads results: 34% lower cost per lead, more qualified calls, 2.3X return on ad spend, scaled multi-location growth",
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
    "Behavioral health landing page performance: optimized pages convert 5-8%, lower bounce, Multi-location behavioral health landing page performance",
  ]),

  // Concept, process, and results graphics carried invented figures ("$340",
  // "+35% ROI", "ROI: 50%") and "HIPAA-compliant" assurances. Hero remains.
  "/services/analytics-and-attribution/": [
    pageImg(
      "services/analytics-and-attribution",
      "01-hero-banner.jpg",
      "Abstract attribution graphic connecting ad clicks, CRM entry, and admission verification",
    ),
  ],
  // Hero swapped to the clean funnel graphic; the original 01 hero had a garbled headline.
  // Every graphic in this set carried "20-40%" results, "HIPAA compliant
  // infrastructure", or a literal "[CTA]" placeholder; decorative hero only.
  "/services/call-tracking-and-intake-attribution/": [DECO_ROWS],
  /* ---- Services cluster (P1 additions) ---- */

  "/services/conversion-rate-optimization/": std4("services/conversion-rate-optimization", [
    "Effective conversion rate optimization services built on $50M+ in behavioral health media spend",
    "Data-driven CRO funnel: from website visitors through A/B testing to qualified admission inquiries and census impact",
    "Our CRO process: audit and analysis, hypothesis development, A/B and multi-variant testing, attribution connectivity, validate and scale",
    "CRO services summary: data-driven and specialized, rigorous testing methodology, optimizing the intake journey, full-funnel attribution",
  ]),

  "/services/microsoft-ads-management/": std4("services/microsoft-ads-management", [
    "Microsoft Ads management dashboard for behavioral health: qualified admissions, lower cost per admission, AI-optimized bidding",
    "Maximize growth with Microsoft Ads management: behavioral health search intent, AI optimization, and policy compliance",
    "The MP approach to Microsoft advertising: deep audit, audience architecture, optimized bidding and attribution, creative testing, compliance review",
    "Microsoft Ads performance insights: $50M+ managed, attribution to admission, audience reach, and compliance-first results",
  ]),

  "/services/youtube-ads/": std4("services/youtube-ads", [
    "YouTube ads agency: expert management of optimized behavioral health campaigns with clear attribution to admissions",
    "Optimized YouTube ads for behavioral health: audience strategy, creative optimization, compliance monitoring, and attribution",
    "Our YouTube ads management process: discovery and compliance review, audience and intent strategy, creative production, campaign execution, attribution",
    "YouTube ads powering behavioral health admissions: 2.5B+ monthly users, precision targeting, attribution beyond the click, operator advantage",
  ]),

  "/services/linkedin-ads/": std4("services/linkedin-ads", [
    "Expert LinkedIn ads agency services: B2B targeting precision and $50M+ in vertical expertise",
    "Specialized LinkedIn ads agency: targeting qualified B2B decision-makers over generic, inflated-spend approaches",
    "Optimizing LinkedIn ads management: audience architecture, targeting strategy, bid optimization, creative testing, compliance and attribution",
    "Your behavioral health LinkedIn ads partner: unprecedented B2B precision, results-driven expertise, compliance-first framework, data-powered optimization",
  ]),

  // Hero + capabilities icons + process + quote: Asana's 02 carried hex-swatch
  // artifacts and 04 a "Just Sans Variable" placeholder, so the clean icon set
  // (05) fills the concept slot and the quote (06) the results slot.
  "/services/intake-optimization/": std4("services/intake-optimization", [
    "Optimize your behavioral health intake: turn more calls into admissions with data-driven solutions",
    "Intake optimization capabilities: speed to lead, insurance verification, lower cost per admission, higher conversion, integrated systems, better patient experience",
    "Our intake optimization framework: discovery call, intake audit, implementation roadmap, measurement and iteration",
    "The treatment centers that consistently convert more leads integrate technology, staff, and continuous measurement into a repeatable system",
  ]),

  "/services/creative-testing/": std4("services/creative-testing", [
    "Creative testing dashboard for behavioral health: A/B variants, cost per lead, and admissions performance",
    "Creative testing flow: variant experimentation through insights to ad performance boost, with compliance confidence",
    "Structured creative testing framework: strategy and compliance review, sequential experiments, data analysis, iterate and scale",
    "Boosting behavioral health ad performance through creative testing: -25% cost per lead, +18% intake completion, 3X faster validation, 99% ad approval",
  ]),

  /* ---- PPC sub-cluster (migrated legacy pages) ---- */

  // Migrated from the live WordPress site. Real page photography preserved as
  // the hero (cover fit on the dark artboard); section slots use brand graphics.
  "/services/ppc/": [
    // [0] hero
    pageImg(
      "services/ppc",
      "01-hero.jpg",
      "Two colleagues review printed campaign reports at a conference table, one pointing at a figure while the other reads handwritten notes beside a laptop.",
    ),
    // [1] section image
    pageImg(
      "services/ppc",
      "02-section.jpg",
      "An admissions coordinator wearing a headset takes notes on a pad during a phone call at a desk in a bright office.",
    ),
    // [2] section image
    pageImg(
      "services/ppc",
      "03-section.jpg",
      "A chief executive and a marketing operator review a four-point checklist together at a table.",
    ),
    // [3] section image
    pageImg(
      "services/ppc",
      "04-section.jpg",
      "Two paid media team members review a printed list of search terms, one marking a line with a pen while the other checks a second monitor.",
    ),
  ],

  // Hero is the page's original photographic banner (cover); the two in-article
  // section slots fall back to brand process/takeaways graphics.
  "/services/ppc/introduction-to-ppc-campaign-management/": [
    { src: "/images/pages/services/ppc/introduction-to-ppc-campaign-management/01-hero.jpg", alt: "Introduction to PPC campaign management", fit: "cover" },
    PROCESS,
    TAKEAWAYS,
  ],

  /* ---- LLM Advertising sub-cluster ---- */

  // Hub (HubPage): only index [1] renders. Capabilities icon set.
  "/services/llm-advertising/": [
    pageImg(
      "services/llm-advertising/hub",
      "01-hero-banner.jpg",
      "LLM advertising for behavioral health: AI-driven campaigns optimized for admissions",
    ),
    pageImg(
      "services/llm-advertising/hub",
      "05-capabilities.jpg",
      "LLM advertising capabilities: contextual messaging, AI-driven optimization, healthcare compliance, closed-loop measurement, patient journey tracking, strategic growth",
    ),
  ],

  "/services/llm-advertising/chatgpt/": std4("services/llm-advertising/chatgpt", [
    "Revolutionize your advertising with ChatGPT: AI-native strategies for behavioral health",
    "AI chat advertising with ChatGPT: intent-rich context and conversational engagement driving qualified admissions, compliance, and patient journey",
    "Get started with ChatGPT advertising: audit your current state, align on compliance posture, define attribution requirements, request your audit",
    "ChatGPT advertising takeaways: reach intent-rich audiences, strategize effective ads, navigate compliance rigor, track attribution through admission",
  ]),

  // Concept slot uses the clean capabilities icons (05) — Asana's 02 carried
  // "Just Sans Variable" placeholder text and garbled labels.
  "/services/llm-advertising/ai-discovery-optimization/": std4(
    "services/llm-advertising/ai-discovery-optimization",
    [
      "AI discovery optimization for enhanced visibility: position your brand where AI assistants find answers",
      "AI discovery optimization essentials: understanding AI discovery, shift from ranking to citation, generative engine optimization, practical AI search strategies, measured outcomes",
      "Your path to AI citation visibility: discovery and assessment, comprehensive audit, strategic implementation, measurement and iteration",
      "Accelerate visibility with data-driven AI discovery optimization: the shift from ranking to citation, generative AI reshaping search, optimized content driving citation rates",
    ],
  ),

  /* ---- Web Development sub-cluster ---- */

  // Hub (HubPage): only index [1] renders. Capabilities icon set.
  // Hub (HubPage): only index [1] renders. The capabilities icon set carried
  // "HIPAA compliance" and "leveraging AI" labels, so a decorative image is
  // used for the overview slot.
  "/services/web-development/": [DECO_FIELD, DECO_ROWS],
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

  // The hero carried a $50M+ spend line and the statistics panel a stray
  // footer; the two framework diagrams remain.
  "/services/web-development/technical-seo-and-performance/": [
    DECO_WINDOW,
    pageImg(
      "services/web-development/technical-seo-and-performance",
      "02-concept.jpg",
      "Technical SEO foundations: crawlability, site architecture, structured data, and Core Web Vitals",
    ),
    pageImg(
      "services/web-development/technical-seo-and-performance",
      "03-process.jpg",
      "Technical SEO and performance framework: crawlability and indexing audit, site architecture, Core Web Vitals assessment, remediation roadmap",
    ),
  ],
  // Concept, process, and results graphics carried "HIPAA compliant" badges,
  // a LegitScript icon, and percentage recovery claims. Hero remains.
  "/services/web-development/integrations-and-tracking/": [
    pageImg(
      "services/web-development/integrations-and-tracking",
      "01-hero-banner.jpg",
      "Abstract graphic of analytics, GA4, and Google Tag Manager data flows",
    ),
  ],
  /* ---- November 2026 supporting pages (decorative photography) ---- */
  "/ai-edge/customizable-ai/": [DECO_ROWS, DECO_WINDOW],
  "/ai-edge/local-processing/": [DECO_ROWS],
  "/ai-edge/open-source/": [DECO_WINDOW],
  "/who-we-help/hospitals-and-health-systems/": [DECO_FIELD],

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

  // The previous set asserted "complete control", "full data sovereignty",
  // "no third-party API dependencies", and 40% / 1.4X / sub-100ms results,
  // which the package holds or contradicts. Decorative hero only.
  "/ai-edge/owned-ai-systems/": [DECO_ROWS],
  "/ai-edge/ai-in-paid-media/": std4("ai-edge/ai-in-paid-media", [
    "Optimize paid media with AI for performance-driven agency growth",
    "AI in paid media: advanced targeting, real-time bidding, multivariate testing, and budget allocation",
    "Framework for AI integration: identify bottlenecks, platform-native bidding, connect CRM and offline conversions, vertical compliance, predictive AI",
    "Key takeaways on AI in paid media: strategic shift, boosted efficiency, and scalable growth",
  ]),

  // Hero swapped to the clean concept (02) — Asana's 01 hero headline was garbled
  // ("APPPLICATONS"), and 04 had placeholder artifacts; 3 clean images supplied.
  // The rewritten page describes the agency's operating model (storage,
  // access, providers, retention) rather than jurisdictions, so the old
  // hero and icon set no longer match; decorative hero only.
  "/ai-edge/data-sovereignty/": [DECO_FIELD],
  // Process slot uses the clean takeaways graphic (08) — Asana's 03 was a
  // placeholder-text draft ("Semi BOLD" cards).
  "/ai-edge/ai-governance/": [
    pageImg(
      "ai-edge/ai-governance",
      "01-hero-banner.jpg",
      "Abstract graphic for AI governance in healthcare marketing",
    ),
    pageImg(
      "ai-edge/ai-governance",
      "02-concept.jpg",
      "Four elements of AI governance: policy, technical controls, accountability, and continuous monitoring",
    ),
    pageImg(
      "ai-edge/ai-governance",
      "04-results.jpg",
      "AI governance overview: addressing risk, maturing governance, and key elements of compliance",
    ),
  ],
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

  // Hero, concept, and process graphics carried "LegitScript certified /
  // compliant" badges; the results panel carried $50M+, +140M, and "0
  // compliance violations". Decorative hero only.
  "/who-we-help/behavioral-health/": [DECO_WINDOW],
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

  "/who-we-help/behavioral-health/adolescent-treatment/": std4(
    "who-we-help/behavioral-health/adolescent-treatment",
    [
      "Adolescent rehab marketing: amplify teen programs with compliant, data-forward strategies",
      "Marketing for adolescent rehab: bridging the decision-maker gap between parents and adolescents across paid search, social, and content",
      "Streamlining adolescent rehab marketing: a five-step process from compliant strategy through attribution to admission and census",
      "Adolescent rehab marketing data and strategy insights: the parental decision journey, compliance, and the concerns that drive admissions",
    ],
  ),

  // 02 carries a minor "CRORGESUS" sub-label garble; tolerated — flow is clean.
  "/who-we-help/behavioral-health/dual-diagnosis/": std4(
    "who-we-help/behavioral-health/dual-diagnosis",
    [
      "Explore marketing strategies for dual diagnosis treatment: reach the right audience with expert strategies and data insights",
      "Unlocking dual diagnosis momentum: marketing that reflects clinical complexity, turning mental health and substance use needs into qualified leads",
      "A strategic marketing framework for dual diagnosis treatment: six steps from audience identification through compliance to scaled admissions",
      "Dual diagnosis treatment marketing: audience identification, compliance as foundation, lead quality optimization, and scaling across locations",
    ],
  ),

  // 02/03/04 from Asana were garbled (font-name placeholders, "[CTA]" tokens,
  // scrambled stat labels), so the clean icon set (05), quote (06), and
  // takeaways (08) fill the concept/process/results slots.
  "/who-we-help/behavioral-health/detox-centers/": std4(
    "who-we-help/behavioral-health/detox-centers",
    [
      "Detox center marketing: from patient searches and intake teams to a stable, growing census",
      "Detox center marketing capabilities: compliant paid search, SEO pipeline, admission attribution, conversion optimization, compliance, and scaling operations",
      "The difference between an agency that has managed $50,000 in behavioral health spend and one that has managed $50M+ is the depth of problem-solving when a single policy violation can shut down your primary channel overnight",
      "Takeaways for detox center marketing: a specialized approach, core strategies that work, disciplined scaling, and the right partner attributes",
    ],
  ),

  // 04 stats graphic was garbled ("performance performance", scrambled labels),
  // so the clean capabilities icon set (05) fills the results slot.
  "/who-we-help/behavioral-health/iop-php/": std4(
    "who-we-help/behavioral-health/iop-php",
    [
      "Effective marketing strategies for IOP and PHP: operator-tested approaches for qualified behavioral health admissions",
      "Targeted outpatient acquisition for IOP and PHP: intent-based keywords, geotargeting, and referral development with compliant measurement",
      "The IOP and PHP marketing framework: click-to-admission attribution across keyword research, geo-targeted acquisition, landing pages, and ROI optimization",
      "IOP and PHP marketing capabilities: care continuum, search strategies, qualified admissions, local referral networks, compliance, and maximized ROI",
    ],
  ),

  // 02 concept illustration had mixed-caps headline garble, so the process (03),
  // stats (04), and capabilities icons (05) fill the section slots.
  "/who-we-help/mental-health/adolescent-mental-health/": std4(
    "who-we-help/mental-health/adolescent-mental-health",
    [
      "Effective teen mental health treatment marketing: accelerate growth and census, reaching families with precision data",
      "Four steps to effective teen mental health treatment marketing: intent mapping, compliant paid media, dual-audience engagement, and AI-accelerated growth",
      "Adolescent mental health marketing insights: paid search intent mapping, dual-audience targeting, AI-powered optimization, and compliance assurance",
      "Adolescent mental health marketing capabilities: paid search, dual-audience reach, compliance and ethics, AI-powered insights, multi-channel, and measurable growth",
    ],
  ),

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
      "Behavioral health marketing results: scaling multi-location growth, +700% growth, 28% lower cost per lead, 47% more qualified calls",
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

  /* ---- Migrated legacy blog (top-level slug) ---- */

  // Hero is the article's original illustration (cover); in-article section
  // slots use brand icon set + takeaways graphics.
  "/top-10-open-source-ai-models-of-2025/": [
    { src: "/images/pages/top-10-open-source-ai-models-of-2025/01-hero.jpg", alt: "Top 10 open source AI models of 2025", fit: "cover" },
    ICONS,
    TAKEAWAYS,
  ],

  /* ---- Resources cluster ---- */

  // Hub (HubPage): only index [1] renders as the "Capabilities Overview".
  "/resources/": [
    pageImg(
      "resources/hub",
      "01-hero-banner.jpg",
      "Explore Marketing Powered's behavioral health marketing resources, guides, and playbooks",
    ),
    pageImg(
      "resources/hub",
      "05-capabilities.jpg",
      "Resource categories: behavioral health marketing resources, paid media strategies, healthcare marketing trends, and marketing guides and playbooks",
    ),
  ],

  // Hub (HubPage): only index [1] renders. Capabilities icon set.
  "/resources/guides/": [
    pageImg(
      "resources/guides/hub",
      "01-hero-banner.jpg",
      "Marketing guides for enhanced strategies: actionable playbooks built from $50M+ in managed behavioral health media spend",
    ),
    pageImg(
      "resources/guides/hub",
      "05-capabilities.jpg",
      "Guide categories: comprehensive playbooks, paid media guides, compliance frameworks, patient funnel optimization, attribution and measurement, and AI edge approach",
    ),
  ],

  "/resources/meta-ads/": std4("resources/meta-ads", [
    "Meta Ads guide for healthcare marketing: strategies for Special Ad Categories in 2026",
    "The compliant healthcare marketing funnel: navigating Special Ad Category restrictions from awareness to leads and conversions",
    "Healthcare Meta Ads campaign setup process: declare Special Ad Category, define objective, set up the ad set, and create compliant creative",
    "2026 Meta Ads guide for healthcare: compliance, strategy, and performance data with industry CPC and CPM benchmarks",
  ]),

  // 04 stats carried a "Just Sans Variable" placeholder subtitle, so the clean
  // key-takeaways graphic (08) fills the results slot.
  "/resources/google-ads/": std4("resources/google-ads", [
    "Mastering Google Ads for behavioral health and mental health treatment providers",
    "The Google Ads resource path: keyword architecture, bid management, compliance checks, and ad structure driving qualified leads",
    "Building your healthcare Google Ads playbook: define conventions, document workflows, set testing rules, embed compliance, and optimize repeatedly",
    "Mastering Google Ads key takeaways: strategic keywords, thematic ad structure, data-driven bidding, relevant landing pages, and essential compliance",
  ]),

  // 01 hero and 05 icons carried garbled/typo labels; the clean concept flow (02)
  // is promoted to hero, followed by the process (03) and stats (04). Three images.
  "/resources/llm-advertising/": [
    pageImg(
      "resources/llm-advertising",
      "01-hero-banner.jpg",
      "LLM advertising in practice: from content briefs and data through LLM processing to measured momentum",
    ),
    pageImg(
      "resources/llm-advertising",
      "02-concept.jpg",
      "Implementing LLM advertising, a strategic workflow: choose your tooling, integrate workflows, establish governance, and pilot and measure",
    ),
    pageImg(
      "resources/llm-advertising",
      "03-process.jpg",
      "Unlocking LLM advertising potential: efficiency gains, personalization at scale, and testing velocity",
    ),
  ],

  // Concept slot uses the clean compliance icon set (05) — Asana's 02 carried
  // hex-swatch placeholders and a garbled "COMPLILADICS" label.
  "/resources/compliance-ad-policy/": std4("resources/compliance-ad-policy", [
    "Guide to healthcare advertising compliance: protect your campaigns, budget, and organization from preventable compliance failures",
    "Healthcare advertising compliance areas: HIPAA regulations, LegitScript certification, FTC standards, platform policies, and compliance strategies",
    "The healthcare advertising compliance framework: define requirements, conduct audits, build a review process, and monitor policies",
    "Healthcare advertising compliance data: major risk layers, HIPAA checkpoints in ads, the LegitScript certification mandate, and quarterly audit benefits",
  ]),

  // Hero swapped to the clean multi-touch funnel (02) — Asana's 01 hero had a
  // duplicated, partly garbled headline. Results slot uses the takeaways (08).
  "/resources/attribution-measurement/": std4("resources/attribution-measurement", [
    "Multi-touch attribution measurement: tracking the patient journey from awareness and consideration through to admission",
    "Building a reliable attribution framework: define business outcomes, deploy robust tracking, map patient journeys, select models, and optimize budget",
    "Measuring marketing effectiveness with attribution: the conversion path, attribution model comparison, channel contribution, and multi-touch gains",
    "Effective marketing attribution summary: understand your attribution, choose the right models, and partner with behavioral health media expertise",
  ]),

  "/resources/mental-health-marketing/": std4("resources/mental-health-marketing", [
    "Effective strategies for mental health marketing: data-forward insights for your practice",
    "Mental health marketing pillars: brand positioning, audience targeting, and compliance infrastructure boosting practice reach and growth",
    "The mental health marketing framework built for momentum: strategic foundation, compliance-first setup, search visibility, paid media, measurement, and practice momentum",
    "Effective mental health marketing key data insights: patient journey begins with search, local SEO foundation, paid search best practices, and measuring success",
  ]),

  // 03 process infographic was a placeholder draft ("Rehulini tive Variable",
  // broken step numbering), so the stats graphic (04) fills the second slot.
  // Three clean images.
  "/resources/creative-conversion/": [
    pageImg(
      "resources/creative-conversion",
      "01-hero-banner.jpg",
      "Creative testing beyond the clicks to qualified admissions: systematic iteration that optimizes ad spend for behavioral health providers",
    ),
    pageImg(
      "resources/creative-conversion",
      "02-concept.jpg",
      "Creative testing for conversion optimization: data-driven A/B decisions that produce more qualified admissions",
    ),
    pageImg(
      "resources/creative-conversion",
      "03-process.jpg",
      "Mastering creative testing for conversion optimization: key conversion metrics, testable creative elements, and the test-and-iterate process",
    ),
  ],

  // 03 process infographic carried style-spec placeholder text (hex codes,
  // "Just Sans Variable"), so the stats graphic (04) fills the second slot.
  // Three clean images.
  "/resources/research/": [
    pageImg(
      "resources/research",
      "01-hero-banner.jpg",
      "In-depth paid media research: behavioral health benchmarks and ROI data",
    ),
    pageImg(
      "resources/research",
      "02-concept.jpg",
      "Data-driven research powering behavioral health paid media success: from CPC, intake, and benchmark inputs to ROI and admissions outputs",
    ),
    pageImg(
      "resources/research",
      "03-process.jpg",
      "Behavioral health paid media benchmarks: relative keyword CPCs, click-through rate ranges, the metric that matters, and multi-variant landing page optimization",
    ),
  ],

  /* ---- Resources guides ---- */

  // 03 process infographic had a duplicated step number, so the performance
  // stats graphic (04) fills the second slot. Three clean images.
  "/resources/guides/creative-testing-system-for-meta-ads/": [
    pageImg(
      "resources/guides/creative-testing-system-for-meta-ads",
      "01-hero-banner.jpg",
      "Optimizing creative testing for Meta Ads: systematic iteration, data-driven results, and continuous improvement",
    ),
    pageImg(
      "resources/guides/creative-testing-system-for-meta-ads",
      "02-concept.jpg",
      "The systematic creative testing loop for Meta Ads: hypothesize and build, structure tests, measure results, and iterate and scale",
    ),
    pageImg(
      "resources/guides/creative-testing-system-for-meta-ads",
      "03-process.jpg",
      "Boosting Meta Ads performance through creative testing: up to 40% lower cost per acquisition, the iteration framework, and creative best practices",
    ),
  ],

  "/resources/guides/google-ads-compliance-for-mental-and-behavioral-health/": std4(
    "resources/guides/google-ads-compliance-for-mental-and-behavioral-health",
    [
      "Master Google Ads compliance for mental health: LegitScript certified, sensitive-vertical adherent, and HIPAA-compliant data",
      "Google Ads compliance for mental and behavioral health advertising: LegitScript, HIPAA, and sensitive-vertical guardrails",
      "Navigating Google Ads compliance for healthcare: obtain certification, implement sensitive-vertical restrictions, optimize compliant pages, and ensure regulatory alignment",
      "Google Ads compliance data: the LegitScript certification gateway, key compliance pillars, ad-disapproval triggers, and the impact of a compliance-first posture",
    ],
  ),

  // 01 hero had a placeholder headline and 02 was a "Just Sans Variable" draft,
  // so the clean overview (08) is promoted to hero, followed by process (03),
  // performance (04), and capability icons (05).
  "/resources/guides/meta-ads-for-mental-health-practices/": std4(
    "resources/guides/meta-ads-for-mental-health-practices",
    [
      "Master Meta Ads for mental health practices: compliance as a strategic advantage, an integrated Facebook framework, and authentic Instagram storytelling",
      "Mastering Meta Ads for mental health practices: define goals and compliance, research audiences, structure campaigns, craft empathetic creative, optimize, and track conversions",
      "Meta Ads performance and efficiency for a mental health practice: campaign efficiency trends, audience source conversion, and engagement by content type",
      "Meta Ads for mental health capabilities: account setup, compliant campaigns, targeted reach, Instagram growth, lookalike audiences, and high-converting funnels",
    ],
  ),

  // 04 stats graphic carried a "JUST SARGITS" placeholder block, so three clean
  // images are used: hero, audience concept, and the 7-step strategy.
  "/resources/guides/behavioral-health-paid-media-playbook/": [
    pageImg(
      "resources/guides/behavioral-health-paid-media-playbook",
      "01-hero-banner.jpg",
      "The ultimate guide to behavioral health paid media: the operator-level playbook for treatment centers",
    ),
    pageImg(
      "resources/guides/behavioral-health-paid-media-playbook",
      "02-concept.jpg",
      "From intent-based search, geographic targets, and family-member reach through platform compliance to qualified admission calls",
    ),
    pageImg(
      "resources/guides/behavioral-health-paid-media-playbook",
      "03-process.jpg",
      "Building a successful paid media strategy in seven steps: define the admission profile, select channels, allocate budget, structure campaigns, optimize landing pages, reach patients and families, and implement attribution",
    ),
  ],

  "/resources/guides/ai-discovery-optimization-what-replaces-traditional-seo/": std4(
    "resources/guides/ai-discovery-optimization-what-replaces-traditional-seo",
    [
      "The age of AI discovery is here: move beyond rankings to being cited and recommended",
      "Moving beyond traditional SEO: from ranking on page one to being cited, referenced, and recommended through AI discovery optimization",
      "Implementing your AI discovery optimization strategy: visibility audit, entity strategy, brand entities, AI-readable content, original research, topical authority, and monitoring",
      "AI discovery optimization data and insights: the shift from rankings to citations, content composition for citation, and measured brand-entity impact",
    ],
  ),

  /* ---- Resources cluster (final wave) ---- */

  // 04 stats graphic carried duplicated/placeholder labels, so three clean
  // images are used: hero, the SEO concept flow, and the success framework.
  "/resources/behavioral-health-marketing/": [
    pageImg(
      "resources/behavioral-health-marketing",
      "01-hero-banner.jpg",
      "Master behavioral health SEO strategies: specialized strategies to boost online visibility and patient admissions for treatment centers",
    ),
    pageImg(
      "resources/behavioral-health-marketing",
      "02-concept.jpg",
      "From behavioral health provider to qualified admissions and targeted organic visibility, via NIDA terminology, LegitScript compliance, patient journey, and local SEO",
    ),
    pageImg(
      "resources/behavioral-health-marketing",
      "03-process.jpg",
      "The behavioral health SEO success framework: foundation and compliance, targeted content structure, authoritative reach, and measurable admissions",
    ),
  ],

  // 02 concept illustration had headline/label typos ("Cointinuous", "Mowered"),
  // so the management framework (03) and trackable-results graphic (04) are used.
  "/resources/paid-media/": [
    pageImg(
      "resources/paid-media",
      "01-hero-banner.jpg",
      "Paid media resources: guides, tools, and best practices that turn channel spend into ROI and lead volume",
    ),
    pageImg(
      "resources/paid-media",
      "02-concept.jpg",
      "The strategic paid media management framework: audience segmentation, budget and pacing, creative testing, cross-channel attribution, and compliance and optimization",
    ),
    pageImg(
      "resources/paid-media",
      "03-process.jpg",
      "Paid media resources for trackable results and growth: channels, audience segmentation, core best practices, attribution and measurement, and performance marketing",
    ),
  ],

  "/resources/ai-in-marketing/": std4("resources/ai-in-marketing", [
    "AI in marketing: an AI-driven platform turning lead signals, behavioral data, and ad clicks into predictive scoring and admissions",
    "Your comprehensive guide to AI in marketing: practical applications and automation across lead scoring, content optimization, personalized journeys, and attribution",
    "Implementing AI in healthcare marketing, a compliance-first framework: define goals, ensure data sovereignty and HIPAA, integrate systems, optimize, and scale",
    "Comprehensive guide to AI in marketing: adoption trends, behavioral health opportunities, automation benefits, and compliance considerations",
  ]),

  /* ---- Resources guides (final wave) ---- */

  "/resources/guides/mental-health-paid-media-playbook/": std4(
    "resources/guides/mental-health-paid-media-playbook",
    [
      "Mental health paid media, the complete guide for marketing leaders: a field-tested playbook built on $50M+ in managed spend",
      "The mental health paid media playbook: navigating regulatory constraints with compliant keyword strategy to drive effective patient acquisition",
      "The mental health paid media framework, the profitable path to patient acquisition: build the compliance foundation, uncover intent, craft risk-free ad copy, match searchers, launch, and scale",
      "Mental health paid media performance data: ad approvals by vertical, cost per conversion by channel, search traffic breakdown, and PPC optimization results",
    ],
  ),

  "/resources/guides/meta-ads-for-treatment-centers/": std4(
    "resources/guides/meta-ads-for-treatment-centers",
    [
      "Meta Ads for treatment centers guide: compliant Facebook and Instagram advertising that drives qualified admission inquiries",
      "Strategic Meta advertising for treatment centers: compliant targeting and education-first creative from platforms through to increased leads and revenue",
      "Optimizing Meta Ads for treatment centers, a strategic framework: compliance and setup, audience and targeting, creative development, campaign execution, and measurement",
      "Data-forward insights for Meta Ads at treatment centers: navigating compliance, structuring for admissions, and optimizing for cost per admission",
    ],
  ),

  "/resources/guides/intake-attribution-and-call-quality-framework/": std4(
    "resources/guides/intake-attribution-and-call-quality-framework",
    [
      "Optimize your intake process: an intake attribution and call quality framework that connects marketing spend to admission outcomes",
      "From inquiry source through intake attribution and the call quality framework to admissions outcomes: identify the channels that drive admissions, not just leads",
      "Connecting intake to admissions, a proven framework: track inquiry source, score intake calls, verify clinical fit and insurance, streamline the admissions funnel, and optimize marketing spend",
      "Intake attribution and call quality framework, data that drives admissions: intake attribution advantages plus call quality metrics and benchmarks for call answer rate, abandonment, and the call-to-admission funnel",
    ],
  ),

  /* ---- Guides: TSMC publish batch (Asana-sourced per-page graphics) ----
     Trimmed 2026-11-05 to two images per guide: the cleanest diagram / icon
     grid as hero and one quote card or data graphic in-article. AI-generated
     people-photo hero banners were dropped. Guides still awaiting review keep
     their original set. ---- */

  "/resources/guides/microsoft-ads-behavioral-health/": std4(
    "resources/guides/microsoft-ads-behavioral-health",
    [
      "Microsoft Ads for behavioral health: diversify beyond Google, reach high-intent audiences, and lower competition",
      "Diversify beyond Google: how Microsoft Ads reaches qualified behavioral health audiences with lower CPCs, desktop reach, LinkedIn layering, and admission tracking",
      "Microsoft Ads vs Google Ads for behavioral health: lower CPCs, less competition, older higher-income users, desktop strength, and easy campaign import",
      "Diversifying beyond Google is how treatment centers win in a competitive landscape: reach high-intent audiences at a lower cost and focus on admissions",
    ],
  ),

  "/resources/guides/brand-citation-share-ai-metric/": std4(
    "resources/guides/brand-citation-share-ai-metric",
    [
      "AI citation rate reveals what matters most: track how often AI systems mention your brand and turn visibility into measurable growth",
      "AI citation rate overview: how ChatGPT, Claude, Perplexity, and Google AI cite your brand, benchmarked against last month and industry average",
      "Understanding AI citation rate: what it is, its impact on brand visibility, tracking tools and platforms, key metrics, improvement strategies, and benchmarking",
      "AI is changing how people find and choose brands: show up in AI responses and you stay top of mind when it matters most",
    ],
  ),

  "/resources/guides/90-day-agency-onboarding-playbook/": [
    pageImg(
      "resources/guides/90-day-agency-onboarding-playbook",
      "01-hero-banner.jpg",
      "90-day guide to marketing agency onboarding: a structured playbook for treatment center operators switching agencies without losing momentum",
    ),
    pageImg(
      "resources/guides/90-day-agency-onboarding-playbook",
      "02-concept.jpg",
      "90-day marketing agency onboarding phases: discover and transfer, test and validate, then optimize and scale for better ROI",
    ),
    pageImg(
      "resources/guides/90-day-agency-onboarding-playbook",
      "03-process.jpg",
      "The right onboarding process doesn't just protect performance, it sets the foundation for everything that follows",
    ),
    STATS,
  ],

  "/resources/guides/landing-page-optimization-paid-media/": std4(
    "resources/guides/landing-page-optimization-paid-media",
    [
      "Better landing pages, better paid media results: optimize for clarity, speed, and conversion to turn paid traffic into qualified leads",
      "Six landing page optimization principles: page design and structure, message alignment, lead generation forms, mobile experience, page speed, and trust signals",
      "Optimize landing pages to improve paid media ROI: conversion rate impact, page load speed, and mobile-first performance data",
      "Every second of load time costs you real leads: faster pages, lower costs, more conversions",
    ],
  ),

  "/resources/guides/meta-ads-creative-behavioral-health/": [
    pageImg(
      "resources/guides/meta-ads-creative-behavioral-health",
      "01-hero-banner.jpg",
      "Test with purpose, connect with impact: data-driven creative testing built for behavioral health marketing",
    ),
    pageImg(
      "resources/guides/meta-ads-creative-behavioral-health",
      "02-concept.jpg",
      "Meta Ads creative testing for behavioral health: a practical framework for testing, iterating, and scaling compliant creative informed by $50M+ in managed spend",
    ),
    pageImg(
      "resources/guides/meta-ads-creative-behavioral-health",
      "03-process.jpg",
      "Creative without data is just a guess — the brands that win on Meta don't just create more, they test smarter",
    ),
    STATS,
  ],

  "/resources/guides/intake-call-quality-scoring-framework/": [
    // [0] hero
    pageImg(
      "resources/guides/intake-call-quality-scoring-framework",
      "02-concept.jpg",
      "Call quality scoring drives better performance in behavioral health: top call quality drivers by impact on admissions and how quality scores predict admission rates",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/intake-call-quality-scoring-framework",
      "03-process.jpg",
      "You can't improve what you don't measure: scoring intake calls reveals what drives admissions and where leads slip away",
    )),
  ],

  "/resources/guides/marketing-mix-modeling-modern-attribution/": [
    pageImg(
      "resources/guides/marketing-mix-modeling-modern-attribution",
      "01-hero-banner.jpg",
      "Master marketing mix modeling for modern attribution: understand what really drives revenue across channels",
    ),
    pageImg(
      "resources/guides/marketing-mix-modeling-modern-attribution",
      "02-concept.jpg",
      "How a marketing mix model works: marketing inputs, external factors, and base sales flow through statistical analysis to show incremental contribution and revenue growth",
    ),
    pageImg(
      "resources/guides/marketing-mix-modeling-modern-attribution",
      "03-process.jpg",
      "It's not about what gets clicked, it's about what actually drives revenue: marketing mix modeling reveals the true impact of every marketing dollar",
    ),
    STATS,
  ],

  "/resources/guides/llm-seo-vs-traditional-seo-behavioral-health/": [
    // [0] hero
    shaped("4 / 3", pageImg(
      "resources/guides/llm-seo-vs-traditional-seo-behavioral-health",
      "03-process.jpg",
      "Key areas of LLM SEO for behavioral health providers: keyword search, contextual relevance, AI citations, structured data, authority signals, and discovery optimization",
    )),
    // [1] single in-article slot
    shaped("4 / 5", pageImg(
      "resources/guides/llm-seo-vs-traditional-seo-behavioral-health",
      "05-quote.jpg",
      "Your content is no longer competing for a blue link, it is competing to be the source an AI assistant cites: why AI discovery matters for behavioral health providers",
    )),
  ],

  "/resources/guides/intake-handoff-marketing-roi/": [
    // [0] hero
    pageImg(
      "resources/guides/intake-handoff-marketing-roi",
      "02-concept.jpg",
      "From lead to admission: a clearer intake handoff improves conversion and ROI across response time, qualification, scheduling, and measurement",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/intake-handoff-marketing-roi",
      "04-results.jpg",
      "Every lead you don't convert isn't just a missed admission, it's lost impact: optimize intake to maximize every marketing dollar",
    )),
  ],

  "/resources/guides/private-equity-rollup-threat-treatment-centers/": [
    // [0] hero
    pageImg(
      "resources/guides/private-equity-rollup-threat-treatment-centers",
      "04-results.jpg",
      "Consolidation is reshaping the competitive landscape: PE deal volume, the scale advantage in marketing spend, and what independents must do to compete",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/private-equity-rollup-threat-treatment-centers",
      "05-quote.jpg",
      "Scale may bring capital, but purpose builds lasting impact: independent treatment centers win by doubling down on people, outcomes, and community",
    )),
  ],

  "/resources/guides/multimodal-ai-search-discovery/": [
    // [0] hero
    pageImg(
      "resources/guides/multimodal-ai-search-discovery",
      "02-concept.jpg",
      "Unified discovery across image, voice, and text inputs: how multimodal AI search connects visual matches, related results, and product picks",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/multimodal-ai-search-discovery",
      "04-results.jpg",
      "Multimodal AI search meets users where they are, reducing friction between intent and discovery",
    )),
  ],

  "/resources/guides/marketing-attribution-models-b2b/": [
    // [0] hero
    pageImg(
      "resources/guides/marketing-attribution-models-b2b",
      "03-process.jpg",
      "Everything you need to measure what matters: customer journey, attribution models, channel impact, content influence, pipeline and revenue, insights and optimization",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/marketing-attribution-models-b2b",
      "05-quote.jpg",
      "In B2B, buyers engage with an average of 27 pieces of content before making a purchase decision: without a clear attribution framework you're flying blind on what drives revenue",
    )),
  ],

  "/resources/guides/why-treatment-center-ceos-fire-marketing-agencies/": [
    // [0] hero
    pageImg(
      "resources/guides/why-treatment-center-ceos-fire-marketing-agencies",
      "03-process.jpg",
      "The top reasons agency partnerships fail: lack of results, compliance issues, poor reporting, poor communication, lack of industry expertise, and misaligned strategy",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/why-treatment-center-ceos-fire-marketing-agencies",
      "05-quote.jpg",
      "You don't fire an agency for one bad month, you fire them for 12 months of excuses and no admissions: the right marketing partner drives outcomes, not just activity",
    )),
  ],

  "/resources/guides/evaluating-ai-marketing-capabilities/": [
    // [0] hero
    pageImg(
      "resources/guides/evaluating-ai-marketing-capabilities",
      "02-concept.jpg",
      "Evaluate AI marketing agency capabilities: predictive analytics, audience intelligence, attribution to admissions, automation infrastructure, and compliance integration",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/evaluating-ai-marketing-capabilities",
      "03-process.jpg",
      "The right AI marketing agency doesn't just bring technology, it brings systems that drive admissions, protect compliance, and deliver measurable impact",
    )),
  ],

  "/resources/guides/cro-six-tests-lead-generation/": [
    // [0] hero
    pageImg(
      "resources/guides/cro-six-tests-lead-generation",
      "04-results.jpg",
      "CRO that drives pipeline: more conversions, more revenue, lower cost, and the return on every dollar spent on conversion rate optimization",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/cro-six-tests-lead-generation",
      "03-process.jpg",
      "A 1% lift in conversion rate can drive a disproportionate lift in revenue: optimize first, scale smarter",
    )),
  ],

  "/resources/guides/google-ads-quality-score-optimization/": [
    // [0] hero
    pageImg(
      "resources/guides/google-ads-quality-score-optimization",
      "03-process.jpg",
      "Six steps to Quality Score optimization: understand quality score, improve ad relevance, optimize landing experience, refine keywords, lower CPC, and measure",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/google-ads-quality-score-optimization",
      "04-results.jpg",
      "A higher Quality Score doesn't just lower your costs, it compounds your results over time: relevance earns rewards",
    )),
  ],

  "/resources/guides/building-ai-native-marketing-function/": [
    // [0] hero
    pageImg(
      "resources/guides/building-ai-native-marketing-function",
      "04-results.jpg",
      "Key areas of the AI-native marketing function: infrastructure, team, operations, measurement and attribution, governance and compliance, and the roadmap to maturity",
    ),
    // [1] single in-article slot
    pageImg(
      "resources/guides/building-ai-native-marketing-function",
      "02-concept.jpg",
      "AI-native marketing infrastructure: ad platforms, CRM, analytics, and call tracking flowing through application, compute, and data layers to audience targeting, predictive insights, content at scale, and attribution",
    ),
  ],

  "/resources/guides/ai-visibility-seo-visibility-complementary/": [
    // [0] hero
    pageImg(
      "resources/guides/ai-visibility-seo-visibility-complementary",
      "02-concept.jpg",
      "AI visibility plus SEO, two strategies one goal: complete discovery and stronger presence across search rankings and AI citations",
    ),
    // [1] single in-article slot
    pageImg(
      "resources/guides/ai-visibility-seo-visibility-complementary",
      "03-process.jpg",
      "Key areas across AI visibility and SEO: AI visibility, content optimization, AI search visibility, intent and audience, competitive intelligence, and authority and trust",
    ),
  ],

  "/resources/guides/server-side-tracking-modern-setup/": [
    // [0] hero
    pageImg(
      "resources/guides/server-side-tracking-modern-setup",
      "02-concept.jpg",
      "How server-side tracking works: user interactions flow through a first-party server container to analytics and ad destinations with privacy by design",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/server-side-tracking-modern-setup",
      "04-results.jpg",
      "Server-side tracking moves measurement out of the browser and into your control: better data accuracy, stronger privacy, more admissions",
    )),
  ],

  "/resources/guides/generative-engine-optimization-content/": [
    // [0] hero
    pageImg(
      "resources/guides/generative-engine-optimization-content",
      "03-process.jpg",
      "Six pillars of GEO: AI search evolution, content optimization for AI, entity mapping and topical authority, structured data and schema, question-answer alignment, and content freshness",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/generative-engine-optimization-content",
      "04-results.jpg",
      "The future of search isn't a list of links, it's an answer: GEO ensures your content is the answer AI systems trust, cite, and deliver",
    )),
  ],

  "/resources/guides/future-ai-search-2026-2027/": [
    // [0] hero
    pageImg(
      "resources/guides/future-ai-search-2026-2027",
      "02-concept.jpg",
      "The future of AI search: from keyword search to AI-powered discovery, acceleration in 2026, and personalized predictive search by 2027",
    ),
    // [1] single in-article slot
    pageImg(
      "resources/guides/future-ai-search-2026-2027",
      "04-results.jpg",
      "AI search by the numbers: key trends and predictions shaping 2026-2027, the rise of conversational search, and content that gets cited by AI",
    ),
  ],

  "/resources/guides/hipaa-digital-marketing-risk/": [
    // [0] hero
    pageImg(
      "resources/guides/hipaa-digital-marketing-risk",
      "02-concept.jpg",
      "HIPAA compliant marketing essentials: protect patient data, follow HIPAA rules, and drive effective marketing across every channel and touchpoint",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/hipaa-digital-marketing-risk",
      "03-process.jpg",
      "HIPAA compliance isn't just about avoiding risk, it's about earning patient trust: compliant marketing protects patient data at every touchpoint",
    )),
  ],

  "/resources/guides/google-ads-match-types-2026-strategy/": [
    // [0] hero
    pageImg(
      "resources/guides/google-ads-match-types-2026-strategy",
      "02-concept.jpg",
      "Match type strategy areas: fundamentals, broad phrase and exact match, search term analysis, negative keywords, performance optimization, and testing",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/google-ads-match-types-2026-strategy",
      "03-process.jpg",
      "Match type strategy is your most powerful lever for precision, lead quality, and wasted spend in behavioral health PPC",
    )),
  ],

  "/resources/guides/phone-call-attribution-treatment-centers/": [
    // [0] hero
    pageImg(
      "resources/guides/phone-call-attribution-treatment-centers",
      "03-process.jpg",
      "Call tracking essentials: basics, intake attribution, smarter budget decisions, operational efficiency, location performance, and compliance and privacy",
    ),
    // [1] single in-article slot
    pageImg(
      "resources/guides/phone-call-attribution-treatment-centers",
      "02-concept.jpg",
      "Connect every call, attribute what matters: campaign-level tracking numbers flow through call tracking to intake attribution from calls to admissions",
    ),
  ],

  "/resources/guides/mental-health-marketing-playbook/": [
    // [0] hero
    pageImg(
      "resources/guides/mental-health-marketing-playbook",
      "04-results.jpg",
      "Mental health marketing key insights that drive results: market opportunity, high-intent search, channel effectiveness, and the power of local",
    ),
    // [1] single in-article slot
    shaped("1 / 1", pageImg(
      "resources/guides/mental-health-marketing-playbook",
      "03-process.jpg",
      "Mental health marketing isn't one-size-fits-all: it requires strategies built for clinical sensitivity, platform policies, and the real journey therapy seekers take",
    )),
  ],

  /* ---- Media cluster ---- */

  // Hub (HubPage): only index [1] renders. Capabilities icon set.
  "/media/": [
    pageImg(
      "media/hub",
      "01-hero-banner.jpg",
      "Marketing Powered media coverage: industry recognition, compliance leadership, and measurable results",
    ),
    pageImg(
      "media/hub",
      "05-capabilities.jpg",
      "Media coverage themes: media coverage, behavioral health, agency credibility, documented results, compliance leadership, and measurable impact",
    ),
  ],

  "/media/newsroom/": std4("media/newsroom", [
    "Latest updates from Marketing Powered: agency announcements and company news for the behavioral and mental health field",
    "Accelerating your treatment center's visibility: predictive analytics, compliance posture, AI-native operations, and founder credentials driving better budget allocation and a faster admissions pipeline",
    "Leveraging agency updates for admissions momentum: track the newsroom, identify strategic updates, consult your partner, deploy solutions, and optimize campaign performance",
    "Marketing Powered driving agency growth and client impact: AI-native operations, $50M+ managed media, validated strategy, scalable growth, and what company news delivers",
  ]),

  // 01 hero carried a literal "[CTA]" placeholder button token, so the clean
  // capabilities concept (02) is promoted to hero, followed by process (03) and
  // performance (04). Three images.
  "/media/email-marketing/": [
    pageImg(
      "media/email-marketing",
      "01-hero-banner.jpg",
      "Expert email marketing services: boost patient engagement, drive appointments, with HIPAA-aware, healthcare-focused, AI-driven automation",
    ),
    pageImg(
      "media/email-marketing",
      "02-concept.jpg",
      "Our healthcare email marketing process: compliance architecture, data-driven segmentation, custom campaign development, AI-enhanced automation, and measurable optimization",
    ),
    pageImg(
      "media/email-marketing",
      "03-process.jpg",
      "Healthcare email marketing powered by data and compliant strategy: consistent high ROI, compliant engagement, patient lifecycle impact, and key performance metrics",
    ),
  ],

  // 03 process infographic had broken step numbering and style-spec placeholder
  // text, so the data-insights graphic (04) fills the second slot. Three images.
  "/media/pitch-guidelines/": [
    pageImg(
      "media/pitch-guidelines",
      "01-hero-banner.jpg",
      "Refine your outreach with data-backed pitching: effective strategies for sustained coverage and press success through credible guidelines",
    ),
    pageImg(
      "media/pitch-guidelines",
      "02-concept.jpg",
      "Effective pitch guidelines for mental health communications: research the beat, lead with the angle, keep it concise, and include data and quotes for credible outreach",
    ),
    pageImg(
      "media/pitch-guidelines",
      "03-process.jpg",
      "Improving your media pitches, data-driven insights for PR strategy: pitch timing optimization, key success factors, effective tactics and pitfalls, and integrating AI in outreach",
    ),
  ],

  "/media/podcast-appearances/": std4("media/podcast-appearances", [
    "Maximize your reach with podcast appearances: strategic placements that build authority for behavioral health brands",
    "Strategic podcast appearances that build authority and qualified conversations: building trust, demonstrating expertise, strategic placements, founder credibility, and compliance focus",
    "The strategic podcast placements process: identify and align, craft the pitch, secure and prepare, and amplify and track",
    "Podcast appearances data insights: the power of auditory authority, high ROI and content compounding, founder-led credibility, and strategic placement discipline",
  ]),

  "/media/press/": std4("media/press", [
    "Media hub: press mentions and authority building for behavioral health",
    "From press mentions and credibility to behavioral health authority and growth and revenue, with strategic media exposure",
    "Our framework for behavioral health press coverage: research and identification, story angle development, proactive media outreach, and placement and tracking",
    "Press mentions and media matters: amplifying behavioral health authority, our data-driven press approach, and press coverage impact scaling a multi-location behavioral health organization from operator-side growth work",
  ]),

  "/media/media-kit/": std4("media/media-kit", [
    "Access our comprehensive media kit: accurate, consistent coverage starts here",
    "Your verified resource hub with the complete media kit inside: logo files, executive bios and headshots, boilerplate and press resources, brand guidelines, and a company fact sheet",
    "Modern journalism, accelerated workflow: traditional research versus a functional media kit workflow, with editorial time savings, brand consistency, and reduced correction requests",
    "Essential resources, the Marketing Powered media kit: verified assets, efficient resources for journalists on deadline, and brand consistency",
  ]),

  // 04 stats carried a garbled headline ("BRAND BPIND / BRAND BRAND"), so three
  // clean images are used: hero, the brand-kit showcase, and the access process.
  "/media/brand-assets/": [
    pageImg(
      "media/brand-assets",
      "01-hero-banner.jpg",
      "Find and download official brand assets: logos, brand kits, and usage guidelines for media and partners",
    ),
    pageImg(
      "media/brand-assets",
      "02-concept.jpg",
      "The Marketing Powered brand kit: logo files (PNG, SVG, EPS), the color palette, typography, and usage guidelines",
    ),
    pageImg(
      "media/brand-assets",
      "03-process.jpg",
      "How to access and use brand assets: find and download the kit, review the guidelines, and implement and represent the brand consistently",
    ),
  ],

  // 02 concept carried garbled sub-captions, so the process (03) and impact
  // stats (04) are used alongside the hero. Three clean images.
  "/media/guest-contributions/": [
    pageImg(
      "media/guest-contributions",
      "01-hero-banner.jpg",
      "Guest contributions for positioning: establish authority and expand your reach through strategic bylined articles",
    ),
    pageImg(
      "media/guest-contributions",
      "02-concept.jpg",
      "Guest contributions process: research targets, pitch a proposal, create value, maximize reach, and track results",
    ),
    pageImg(
      "media/guest-contributions",
      "03-process.jpg",
      "The impact of strategic guest contributions: boosting domain authority, engagement and readership, building a credibility portfolio, and measuring success",
    ),
  ],

  // 02 concept had an awkward truncated label, so the process (03) and impact
  // stats (04) are used alongside the hero. Three clean images.
  "/media/syndication/": [
    pageImg(
      "media/syndication",
      "01-hero-banner.jpg",
      "Content syndication to expand your reach: strategically syndicating content to boost behavioral health outreach without risking compliance or SEO authority",
    ),
    pageImg(
      "media/syndication",
      "02-concept.jpg",
      "Five steps to strategic content syndication: define partners and audiences, tailor content, establish compliance and SEO standards, select and distribute, and track and optimize",
    ),
    pageImg(
      "media/syndication",
      "03-process.jpg",
      "Boosting reach, the impact of content syndication in behavioral health: amplified visibility, audience composition, SEO and authority gains, and why syndication strategy matters",
    ),
  ],

  /* ---- Research cluster ---- */

  // Hub (HubPage): only index [1] renders. Capabilities icon set.
  "/research/": [
    pageImg(
      "research/hub",
      "01-hero-banner.jpg",
      "Marketing Powered research: behavioral health paid media performance and data insights",
    ),
    pageImg(
      "research/hub",
      "05-capabilities.jpg",
      "Research areas: paid media data, compliance insights, performance metrics, optimization research, attribution models, and strategy implementation",
    ),
  ],

  // Hub (HubPage): only index [1] renders. Asana's 05 icon set carried "(Black
  // Semi Bold)" placeholder labels, so the clean takeaways graphic (08) is used.
  "/research/studies/": [
    pageImg(
      "research/studies/hub",
      "01-hero-banner.jpg",
      "Discover our marketing studies and insights: evidence-based research for behavioral health decisions",
    ),
    pageImg(
      "research/studies/hub",
      "05-capabilities.jpg",
      "Key takeaways from our behavioral health marketing studies: evidence over opinion, vertical-specific insights, performance under constraints, and iterative growth and ROI",
    ),
  ],

  "/research/studies/annual-paid-media-and-ai-trends/": std4(
    "research/studies/annual-paid-media-and-ai-trends",
    [
      "2026: the AI revolution in paid media — annual trends and data report",
      "Annual paid media and AI trends for 2026: predictive modeling, cross-channel optimization, generative creative scale, and first-party data fueling growth",
      "The AI-powered paid media optimization framework: first-party data ingestion, AI-driven audience modeling, generative variation, cross-channel automation, and continuous performance feedback",
      "Annual paid media and AI trends, 2026 data insights: AI integration growth, performance uplift, creative automation adoption, the first-party data advantage, and generative AI risks",
    ],
  ),

  "/research/studies/attribution-reality-check/": std4(
    "research/studies/attribution-reality-check",
    [
      "Unveiling the reality in marketing attribution: how $50M+ in media spend reveals what models actually deliver",
      "The attribution gap: marketing channels and attributed performance versus actual business outcomes and real value",
      "Methodology, the Greenfield attribution study: gather multi-platform data, evaluate seven models, calculate accuracy ratios, identify over/under-credit, and publish robust findings",
      "Reality check, marketing attribution study findings: the attribution gap of expectation versus reality, systematic bias by channel, and accuracy impact on media spend",
    ],
  ),

  "/research/studies/meta-ads-benchmarks/": std4(
    "research/studies/meta-ads-benchmarks",
    [
      "Meta Ads benchmarks 2026: a research study for behavioral health organizations, from CPM and CTR to cost per admission",
      "From benchmark data through informed strategy and performance momentum to a $1,840 average admission cost and boosted census",
      "Optimizing behavioral health Meta Ads for admissions: benchmark historical performance, diagnose creative and audience gaps, implement optimizations, refine conversion funnels, and measure admission impact",
      "2026 Meta Ads benchmarks for behavioral health: average CPM, CTR and creative diagnostics, CPC analysis, and the CPL-to-admission economics",
    ],
  ),

  "/research/studies/llm-advertising-early-signals/": std4(
    "research/studies/llm-advertising-early-signals",
    [
      "Decoding early signals in LLM advertising: trends, adoption indicators, and strategic planning for leaders",
      "LLM advertising early signals: infrastructure signals, behavioral signals, and economic signals to watch",
      "A framework for analyzing LLM advertising early signals: infrastructure, behavioral engagement, economic flows, pattern synthesis, and developing strategic optionality",
      "LLM advertising early signals research findings: accelerating user adoption, conversational query patterns, platform experimentation trends, and early performance insights",
    ],
  ),

  /* ---- Problems cluster ---- */

  "/problems/fix-attribution/": std4("problems/fix-attribution", [
    "Fix GA4 attribution: stop misallocating ad spend",
    "Resolve your marketing attribution challenges in GA4: from a broken attribution data flow to a corrected flow with efficient budget allocation",
    "Steps to fix broken attribution in GA4: audit conversion configuration, verify cross-domain measurement, check attribution model settings, validate Google Ads linking, and test consent mode integration",
    "Resolve your GA4 attribution challenges: common issues with attribution, the steps to fix them, and the benefits of accurate attribution",
  ]),

  // The previous set framed the page for treatment centers only, prescribed a
  // single account architecture, and carried a LegitScript panel and
  // "3 to 24+ locations" results; decorative hero only.
  "/problems/scale-multi-location-campaigns/": [DECO_FIELD],
  "/problems/fix-lead-quality/": std4("problems/fix-lead-quality", [
    "Resolve your lead quality challenges now: stop wasting budget on leads that never convert with targeted strategies built for behavioral health operators",
    "From unqualified leads through lead-quality scoring to high-quality admissions",
    "Fix lead quality, a five-step strategic process: define qualified leads, segment campaigns and content, implement lead scoring, train intake teams, and optimize and attribute admissions",
    "Fix lead quality issues: recognize poor lead quality, improve-lead-quality strategies, and the technology enablers behind them",
  ]),

  // 01 hero carried a literal "[CTA]" token in its button; the clean concept
  // image (02, which has a real headline) is promoted to hero. Three images.
  "/problems/increase-qualified-calls/": [
    pageImg(
      "problems/increase-qualified-calls",
      "01-hero-banner.jpg",
      "Increase qualified calls by streamlining the path to admission: optimize every stage, from click to census",
    ),
    pageImg(
      "problems/increase-qualified-calls",
      "02-concept.jpg",
      "The process to increase qualified calls: data-driven precision targeting, smarter pre-qualification, multi-variant AI optimization, and tracked attribution to admission",
    ),
    pageImg(
      "problems/increase-qualified-calls",
      "03-process.jpg",
      "Increase qualified calls with behavioral health strategies: the drivers of unqualified calls, the AI-driven advantage, and qualified call generation results",
    ),
  ],

  // 03 process had broken step numbering and duplicate steps, so the hero,
  // concept, and the clean data-driven stats graphic (04) are used.
  "/media/editorial-topics/": [
    pageImg(
      "media/editorial-topics",
      "01-hero-banner.jpg",
      "Effective editorial topics to elevate media coverage: a guide to selecting engaging topics that build authority and drive measurable engagement",
    ),
    pageImg(
      "media/editorial-topics",
      "02-concept.jpg",
      "Effective editorial topics emerge where audience interest, organizational expertise, and current media conversations meet to earn media coverage",
    ),
    pageImg(
      "media/editorial-topics",
      "03-process.jpg",
      "Driving media coverage with data-driven editorial strategies: strategic topic alignment, the impact of data-driven narratives, key topic areas driving traction, and expert commentary value",
    ),
  ],

  /* ---- Company cluster ---- */

  // Hub (HubPage): only index [1] renders. Capabilities icon set.
  "/company/": [
    pageImg(
      "company/hub",
      "01-hero-banner.jpg",
      "Marketing Powered: a behavioral health marketing agency built by former treatment center operators",
    ),
    pageImg(
      "company/hub",
      "05-capabilities.jpg",
      "What sets Marketing Powered apart: operator experience, ethical practices, transparent reporting, measurable outcomes, proprietary AI, and compliance infrastructure",
    ),
  ],

  // 04 stats carried "Just Sans Variable" placeholder figure captions and a
  // "RESTULATORY" typo, so the hero, concept, and process are used (3 clean).
  "/company/ai-systems-policy/": [
    pageImg(
      "company/ai-systems-policy",
      "01-hero-banner.jpg",
      "Understanding our AI systems policy: transparent governance, accountable practices",
    ),
    pageImg(
      "company/ai-systems-policy",
      "02-concept.jpg",
      "Responsible AI governance built on accountability, transparency, and compliance with regulatory alignment (HIPAA, FTC)",
    ),
    pageImg(
      "company/ai-systems-policy",
      "03-process.jpg",
      "Our responsible AI governance framework, four steps to ethical AI in regulated industries: transparent governance, data privacy commitment, responsible practices, and compliance and updates",
    ),
  ],

  "/company/data-sovereignty/": std4("company/data-sovereignty", [
    "Data sovereignty in healthcare: essentials for innovation and compliance",
    "Data sovereignty in healthcare: data residency, data ownership, and client data control over a secure healthcare data infrastructure that reduces risk and builds patient trust",
    "Building a defensible healthcare data sovereignty strategy: map data flows, identify compliance gaps, implement infrastructure, establish controls, and audit and review",
    "Healthcare data sovereignty, key statistics and risks: the cost of compliance failures, why data governance matters, and how sovereignty builds client trust",
  ]),

  // 01 hero carried a literal "[CTA]" token in its button; the clean concept
  // image (02, which has a real headline) is promoted to hero. Three images.
  "/company/security/": [
    pageImg(
      "company/security",
      "01-hero-banner.jpg",
      "Security overview for behavioral health data protection: encryption, role-based access, network segmentation, and proprietary local AI inference",
    ),
    pageImg(
      "company/security",
      "02-concept.jpg",
      "Our layered security process: data architecture, access control, encryption protocols, compliance monitoring, and ongoing review",
    ),
    pageImg(
      "company/security",
      "03-process.jpg",
      "Security infrastructure for behavioral health marketing: proprietary AI local inference, owned hardware, managed media spend since 2022, and compliance and risk mitigation",
    ),
  ],

  /* ---- Utility pages ---- */

  // 01 hero carried a literal "[CTA]" token in its button and 04 stats had a
  // "Light weight black" placeholder + typos; the clean concept (02) is promoted
  // to hero, with the compliance process, summary takeaways, and icon set.
  "/accessibility/": [
    pageImg(
      "accessibility",
      "01-hero-banner.jpg",
      "Our accessibility commitment, building inclusive digital experiences: ADA compliance, patient access, and WCAG 2.1 AA standards",
    ),
    pageImg(
      "accessibility",
      "02-concept.jpg",
      "Our accessibility compliance process: full website assessment, strategic compliance plan, barrier removal guidance, and sustainable accessibility against WCAG 2.1 AA standards",
    ),
    pageImg(
      "accessibility",
      "03-process.jpg",
      "Summary takeaways on understanding your accessibility statement: what it is, achieving WCAG 2.1 AA compliance, our human-led approach, and why accessibility matters in healthcare",
    ),
    pageImg(
      "accessibility",
      "04-results.jpg",
      "Accessibility statement essentials: understand standards, ensure ADA compliance, perform audits, boost usability, serve patients better, and build trust",
    ),
  ],

  // 04 stats carried a "#2CACE8" hex swatch label and multiple typos, so the
  // clean hero, sitemap concept, and navigation process are used.
  "/sitemap/": [
    pageImg(
      "sitemap",
      "01-hero-banner.jpg",
      "Explore our comprehensive sitemap: navigate directly to specialized behavioral health and mental health marketing services, resources, and case studies",
    ),
    pageImg(
      "sitemap",
      "02-concept.jpg",
      "The Marketing Powered sitemap: behavioral health services, mental health resources, and performance data for efficient navigation",
    ),
    pageImg(
      "sitemap",
      "03-process.jpg",
      "Navigating your growth with our sitemap: explore our architecture, select your vertical, access deep resources, and discover momentum",
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
