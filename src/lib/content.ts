export const siteContent = {
  brand: {
    name: "Marketing Powered",
    phone: "(561) 560-6804",
    email: "info@marketingpowered.ai",
    address: "9494 Osprey Isles Blvd, Palm Beach Gardens, FL 33412",
    tagline: "AI Marketing Agency for Behavioral Health",
  },
  seo: {
    title: "AI Marketing Agency for Behavioral Health",
    description:
      "Achieve more with $50M+ in managed ad spend and AI-native strategies. Request a free audit.",
  },
  nav: ["Home", "Services", "Specialties", "Resources"],
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services/" },
    { label: "Specialties", href: "/who-we-help/" },
    { label: "Resources", href: "/resources/" },
  ],
  hero: {
    headline:
      "Partner with an AI Marketing Agency That Knows Behavioral Health",
    subheadline:
      "AI-native strategies built on $50M+ in managed behavioral health and mental health ad spend. No guesswork. No compliance surprises.",
    cta: "REQUEST A FREE AUDIT",
    ctaLink: "/get-started/request-an-audit/",
    image: "/images/pages/home/01-hero-banner.jpg?v=20260624",
    imageAlt:
      "Marketing Powered strategy team meeting in a modern office conference room",
  },
  growth: {
    headline: "Meet Your AI Marketing Experts",
    body: "Most agencies learn behavioral health marketing by billing you for their education. We started from the operator's seat, building acquisition systems for multi-location treatment organizations where lead quality, intake capacity, compliance, and attribution all had to work together. That operator perspective shapes every campaign we build.",
    body2:
      "Marketing Powered is an AI marketing agency built specifically for the behavioral health and mental health verticals. We have managed over $50M in ad spend across these sectors, including $1.5 to $2M monthly in Google Ads alone. Our AI-native approach dates back to 2022, when we began building proprietary systems for predictive analytics, multi-variant optimization, and attribution modeling.",
    body3:
      "What does AI-native mean in practice? It means we do not bolt AI onto legacy processes. Our infrastructure runs on owned hardware with HIPAA-conscious protocols. Your data stays within our controlled environment. We use machine learning to optimize landing page routing per visitor, predict lead quality before intake touches a phone, and attribute conversions through to admission.",
    image: "/images/pages/home/02-key-concept-illustration.jpg?v=20260624",
    imageAlt:
      "Business leader with an AI network visualization for marketing technology",
  },
  socialProof:
    "$50M+ in managed behavioral health and mental health ad spend",
  specializedMarketing: {
    headline: "Why Behavioral Health Needs Specialized Marketing",
    body: "Behavioral health marketing operates under restrictions that most agencies have never encountered. Google Ads classifies addiction treatment as a sensitive healthcare vertical, which means no retargeting. Meta places behavioral health content under Special Ad Categories, limiting targeting options. LegitScript certification is required before you can even run addiction treatment ads on major platforms.",
    body2:
      "A generalist agency will learn these rules the hard way, often with your budget and your compliance record at stake. We have operated under these constraints since 2022, across dozens of treatment centers ranging from single-location detox facilities to multi-state residential networks.",
    body3:
      "We build campaigns that respect these distinctions. Our targeting strategies account for the fact that you cannot retarget in this vertical. Our creative testing protocols avoid the compliance landmines that get accounts suspended. Our attribution models track from first click through admission, so you know exactly which channels are filling beds.",
    body4:
      "Mental health marketing shares some of these constraints but has its own nuances. Outpatient therapy practices, psychiatric groups, and telehealth platforms face different economics than residential treatment centers. We understand the difference between a $200 therapy intake and a $30,000 residential admission, and we build campaigns accordingly.",
    image: "/images/pages/home/05-supporting-icon-set.jpg?v=20260624",
    imageAlt:
      "Business leader presenting AI marketing, audience, growth, and performance icons",
  },
  servicesIntro: {
    headline: "How AI Technology Delivers Better Marketing Outcomes",
    body: "AI is not a feature we added to check a box. It is the foundation of how we operate. Our proprietary infrastructure runs on local hardware, including Mac Studio M3 Ultra clusters and dedicated NAS storage, purpose-built for HIPAA-compliant local AI inference. Your data never leaves our controlled environment.",
  },
  // `href` targets are all entries in links.ts VALID so they resolve to real pages.
  services: [
    {
      title: "Real-Time Campaign Optimization",
      description:
        "Multi-variant optimization that routes each visitor to the landing page variant most likely to convert them. Our AI systems handle creative testing, bid management, audience refinement, and attribution modeling continuously.",
      icon: "target",
      href: "/services/paid-media/",
    },
    {
      title: "Predictive Lead Scoring",
      description:
        "Predictive analytics that score leads before your intake team picks up the phone. Know which prospects have the highest intent so your team prioritizes the right calls and improves close rates.",
      icon: "search",
      href: "/services/intake-optimization/",
    },
    {
      title: "Full-Funnel Attribution",
      description:
        "Track attribution through to admission, not just to form fills or phone calls. We optimize for the metrics that affect your P&L: cost per admission, admission volume, and lifetime value by acquisition channel.",
      icon: "chart",
      href: "/services/analytics-and-attribution/",
    },
    {
      title: "Compliance-First Architecture",
      description:
        "HIPAA-conscious infrastructure with data sovereignty that matters in healthcare. We do not send your lead data through commercial API wrappers or third-party AI platforms with unclear data handling policies.",
      icon: "shield",
      href: "/ai-edge/data-sovereignty/",
    },
    {
      title: "Behavioral Health PPC",
      description:
        "Navigate Google Ads sensitive vertical restrictions, LegitScript certification requirements, and Meta Special Ad Categories with campaigns built by a team that has managed $1.5 to $2M monthly in behavioral health Google Ads.",
      icon: "zap",
      href: "/services/ppc/",
    },
    {
      title: "Mental Health Content Strategy",
      description:
        "Messaging that speaks to the specific emotional and informational needs of those seeking treatment. From the family member searching at 2 a.m. to the hospital referral coordinator, we build campaigns that respect these distinctions.",
      icon: "code",
      href: "/who-we-help/mental-health/",
    },
  ],
  // `value` is the authoritative display string (and the reduced-motion / no-JS
  // fallback). `prefix` + `to` + `suffix` reconstruct it exactly so the count-up
  // animates the numeric part without breaking on ranges/mixed formats.
  stats: [
    {
      value: "$50M+",
      prefix: "$",
      to: 50,
      suffix: "M+",
      label:
        "Managed in behavioral health and mental health ad spend with full-funnel attribution.",
    },
    {
      value: "11+",
      prefix: "",
      to: 11,
      suffix: "+",
      label:
        "Behavioral health Google Ads accounts managed with vertical-specific compliance awareness.",
    },
    {
      value: "30-45%",
      prefix: "30-",
      to: 45,
      suffix: "%",
      label:
        "Reduced cost per qualified lead through AI-driven multi-variant optimization.",
    },
    {
      value: "0",
      prefix: "",
      to: 0,
      suffix: "",
      label:
        "Account suspensions — maintained LegitScript compliance across all sensitive vertical campaigns.",
    },
  ],
  whyChoose: {
    headline: "Our Proven Results in Mental Health Marketing",
    body: "Numbers tell the story better than adjectives. Across behavioral health and mental health accounts, our work combines predictive modeling, attribution systems, and creative optimization built for regulated healthcare growth. The goal is not more leads at any cost. It is qualified demand that your intake team can trace through to admission.",
    cards: [
      {
        title: "Full-Funnel Attribution",
        description:
          "We track attribution through to admission, not just to form fills or phone calls. Many agencies optimize for leads that never convert. We optimize for cost per admission, admission volume, and lifetime value by acquisition channel.",
      },
      {
        title: "AI-Native Since 2022",
        description:
          "Our proprietary systems for predictive analytics, multi-variant optimization, and attribution modeling have been running since 2022, giving us training data and operational experience that agencies adopting AI today cannot replicate.",
      },
      {
        title: "Compliance Built In",
        description:
          "Maintained LegitScript compliance and zero account suspensions across sensitive vertical campaigns. Our creative testing protocols avoid the compliance landmines that get accounts suspended.",
      },
      {
        title: "HIPAA-Conscious Infrastructure",
        description:
          "Our infrastructure runs on owned hardware with HIPAA-conscious protocols. Your data stays within our controlled environment — no commercial API wrappers or third-party AI platforms with unclear data handling.",
      },
    ],
    image: "/images/04-infographic-stats-data.jpg",
    imageAlt:
      "Infographic showing Marketing Powered driving growth in AI-native behavioral health marketing with key performance metrics",
  },
  bookAudit: {
    headline: "Request a Tailored Marketing Audit",
    body: "Every treatment center has a different starting point. Some are spending $500K monthly on Google Ads with no clear attribution. Others are just beginning to scale beyond word-of-mouth referrals. Your strategy should reflect your specific situation, not a template pulled from another vertical.",
    body2:
      "A Marketing Powered audit covers the questions that matter: Where is your current spend going? What does your attribution look like from click to admission? Are there compliance gaps in your current campaigns? Which channels have headroom for growth?",
    image: "/images/03-infographic-process-steps.jpg",
    imageAlt:
      "Process steps infographic showing Marketing Powered's approach to behavioral health marketing audits",
  },
  faq: [
    {
      question:
        "What marketing strategies work for behavioral health providers?",
      answer:
        "Effective behavioral health marketing requires strategies built around platform-specific compliance requirements. Google Ads sensitive vertical restrictions prohibit retargeting for addiction treatment, so campaigns must rely on intent-based targeting and strong landing page optimization. LegitScript certification is mandatory for paid ads. Successful strategies combine compliant paid media with content that addresses the specific concerns of patients, families, and referral sources at different stages of their decision process.",
    },
    {
      question: "How does AI improve mental health marketing?",
      answer:
        "AI improves mental health digital marketing through predictive lead scoring, real-time bid optimization, and multi-variant testing that runs continuously rather than in manual cycles. Our systems analyze which creative, landing page, and audience combinations produce qualified leads, then allocate budget accordingly. The result is lower cost per qualified lead and better intake conversion rates because your team spends time on prospects with higher intent.",
    },
    {
      question: "Why choose an AI-native agency for behavioral health?",
      answer:
        "An AI-native agency builds optimization into every layer of campaign management rather than adding it as an afterthought. For behavioral health specifically, this means HIPAA-conscious infrastructure, predictive models trained on treatment center data, and attribution that tracks through to admission. Our proprietary systems have been running since 2022, giving us training data and operational experience that agencies adopting AI today cannot replicate.",
    },
    {
      question:
        "What are the risks of using a generic marketing agency?",
      answer:
        "Generic agencies often learn behavioral health compliance requirements using your budget and your account's standing with platforms. Common mistakes include running retargeting campaigns that violate Google's sensitive vertical policies, using messaging that triggers LegitScript reviews, and optimizing for lead volume rather than admission quality. These errors can result in account suspensions, wasted spend on unqualified leads, and compliance exposure.",
    },
    {
      question: "How can AI marketing drive more admissions?",
      answer:
        "AI marketing drives admissions by optimizing every touchpoint between first click and intake call. Predictive lead scoring identifies high-intent prospects so your intake team prioritizes the right calls. Multi-variant optimization routes visitors to landing pages matched to their specific search intent. Real-time bid management allocates budget to the keywords and audiences producing qualified leads. We track attribution through to admission, so optimization targets the metric that matters to your business.",
    },
  ],
  cta: {
    headline:
      "Ready to See What AI-Native Marketing Can Do for Your Treatment Center?",
    body: "Request a free audit of your current marketing performance, compliance posture, and growth objectives. We will give you an honest assessment of where the opportunities are and whether Marketing Powered is the right partner to pursue them.",
    ctaText: "REQUEST A FREE AUDIT",
    ctaLink: "/get-started/request-an-audit/",
    image: "/images/08-summary-takeaways-visual.jpg",
    imageAlt:
      "Summary visual of Marketing Powered AI marketing agency takeaways and next steps",
  },
  footer: {
    tagline: "AI-Native Marketing for Behavioral Health & Mental Health.",
    services: [
      "Behavioral Health PPC",
      "Mental Health Marketing",
      "Predictive Lead Scoring",
      "Full-Funnel Attribution",
      "Compliance-First Campaigns",
      "AI-Driven Optimization",
    ],
    serviceLinks: [
      { label: "Behavioral Health PPC", href: "/services/ppc/" },
      { label: "Mental Health Marketing", href: "/who-we-help/mental-health/" },
      { label: "Predictive Lead Scoring", href: "/services/intake-optimization/" },
      { label: "Full-Funnel Attribution", href: "/services/analytics-and-attribution/" },
      { label: "Compliance-First Campaigns", href: "/resources/compliance-ad-policy/" },
      { label: "AI-Driven Optimization", href: "/ai-edge/" },
    ],
    copyright:
      "Copyright 2025. All rights Reserved. Design by Marketing Powered AI",
  },
  images: {
    hero: "/images/01-hero-banner.jpg",
    keyConcept: "/images/02-key-concept-illustration.jpg",
    processSteps: "/images/03-infographic-process-steps.jpg",
    statsData: "/images/04-infographic-stats-data.jpg",
    iconSet: "/images/05-supporting-icon-set.jpg",
    quoteCallout: "/images/06-quote-callout-graphic.jpg",
    sectionDivider: "/images/07-section-divider-illustration.jpg",
    summaryVisual: "/images/08-summary-takeaways-visual.jpg",
  },
};
