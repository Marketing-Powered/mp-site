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
      "Proven results: scaling multi-location growth and $50M+ in managed paid media spend with attribution discipline",
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
    { src: "/images/pages/services/ppc/01-hero.jpg", alt: "AI-driven PPC campaign management: smarter performance at scale", fit: "cover" },
    { src: "/images/pages/services/ppc/02-body.jpg", alt: "Google Ads Keyword Planner on a mobile device — choosing the right keywords", fit: "cover" },
    { src: "/images/pages/services/ppc/03-body.jpg", alt: "PPC performance dashboard: clicks, impressions, average CTR and position over time", fit: "cover" },
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
    "Data-powered behavioral health marketing results: scaling multi-location growth, $50M+ managed, revenue growth, zero compliance violations",
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

  "/who-we-help/behavioral-health/substance-use-disorder/": std4(
    "who-we-help/behavioral-health/substance-use-disorder",
    [
      "Expert rehab marketing for substance use disorder: scaling census with operator-built attribution and AI-native precision",
      "The rehab marketing engine: operator expertise and scaling, data-forward decision making, and optimized patient acquisition",
      "Our specialized rehab marketing process: compliant audit, strategic build, full-funnel attribution, and continuous optimization to admission",
      "Specialized rehab marketing data and results: lower cost per admission, full admission attribution, and measurable census growth",
    ],
  ),

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

  "/problems/scale-multi-location-campaigns/": std4(
    "problems/scale-multi-location-campaigns",
    [
      "Overcoming multi-location marketing challenges: proven frameworks for scaling campaigns across multiple treatment center locations without sacrificing lead quality or compliance",
      "Scaling multi-location marketing: centralised control, localised execution, and data-forward visibility",
      "The multi-location marketing scaling framework: strategy and goals, centralize infrastructure, build operational workflows, implement scalable advertising, and optimize and report",
      "Optimizing multi-location marketing performance: key challenges at scale, strategic frameworks and data insights, and the expected outcomes",
    ],
  ),

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
