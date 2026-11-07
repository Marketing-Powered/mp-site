/* ================================================================== */
/* Homepage copy — "Marketing Powered Homepage Copy and Implementation  */
/* Package", November 6, 2026.                                          */
/*                                                                      */
/* Ten sections in publication order. Body strings carry inline         */
/* contextual links as [anchor](path); the homepage renders them with   */
/* next/link. Anchors and destinations follow the package's link map:   */
/* all 20 placements across 17 destinations are active. The four        */
/* supporting pages created for this release (hospitals and health      */
/* systems, local processing, open source, customizable AI) carry the   */
/* five anchors that were plain text until they shipped.                */
/*                                                                      */
/* Founder figures (locations, states, monthly spend, employer revenue) */
/* are historical founder responsibility, attributed in the copy. They  */
/* are not agency results and must not be relabeled as such.            */
/*                                                                      */
/* Image paths carry no query string: next.config.ts `localPatterns`    */
/* only admits `/images/**` with an empty search, or the legacy         */
/* `?v=20260624` under /images/pages/home. New filenames need no        */
/* cache-busting.                                                       */
/* ================================================================== */

export const homeContent = {
  seo: {
    title: "Experienced Growth Marketing Agency | Marketing Powered",
    description:
      "Marketing leadership for hospitals, health systems, and multi-location organizations, with owned technology and execution tied to measurable growth.",
  },

  /* Field patch merged into the existing Organization entity. */
  organization: {
    description:
      "Marketing Powered combines experienced marketing leadership, technology it owns and customizes, and execution tied to measurable growth for healthcare and multi-location organizations.",
    founder: { name: "Mike Hulick", jobTitle: "Founder and CEO" },
  },

  cta: {
    label: "Request a strategy call",
    href: "/company/contact",
    emailPrompt: "Prefer email? Contact",
  },

  /* 01 — Hero and value proposition */
  hero: {
    h1: "Marketing leadership built for measurable growth",
    paragraphs: [
      "Marketing Powered brings executive experience running marketing operations and managing substantial budgets to organizations ready to grow.",
      "We combine that experience with technology we own and customize, connecting strategy, execution, and measurement around your business priorities.",
      "For CEOs and CMOs, that means a partner who understands the decisions behind the campaigns: where to invest, what to improve, and how to judge performance. Our [marketing leadership](/company/about) starts with operating experience, not a software pitch.",
    ],
    /* Hero photograph (the page's largest above-the-fold element; preloaded).
       Decorative, with empty alt: it is not presented as Marketing Powered
       staff, offices, or client work, and the dashboard figures in the frame
       are not claims. Source is 1920×1080; next/image serves resized variants. */
    image: "/images/pages/home/home-hero-team-dashboard.jpg",
    imageAlt: "",
  },

  /* 02 — Experience and leadership */
  experience: {
    h2: "Experience earned inside growing organizations",
    paragraphs: [
      "Before founding Marketing Powered, Mike Hulick led marketing as CMO of a multi-state behavioral health operator. During his tenure, the organization expanded from 3 to 24 locations across 9 states. He managed about $1.5 million to $2 million per month in Google Ads spend.",
      "That responsibility extended beyond individual campaigns. Attribution, intake, conversion, reporting, and the systems supporting expansion had to work together. Marketing decisions needed to account for operating capacity, market differences, and revenue, not just activity inside an advertising account.",
      "Today, [our experience](/company/about) shapes how Marketing Powered approaches an engagement. We examine the operation behind the marketing, identify where performance breaks down, and connect execution to the business objective.",
      "Prior executive experience is distinct from agency client work. That distinction matters when evaluating [case studies](/results/case-studies), budgets managed, and the contribution marketing made to an organization's growth. You should know what the evidence actually represents.",
    ],
    /* Decorative: daylight through blinds. Swap for an actual founder portrait
       (alt: "Mike Hulick, founder and CEO of Marketing Powered.") when one is approved. */
    image: "/images/pages/home/home-experience-window-light.jpg",
    imageAlt: "",
  },

  /* 03 — Core marketing services */
  services: {
    h2: "Connected marketing, from acquisition to revenue",
    intro:
      "Your marketing should operate as one system. We connect the work that attracts demand with the experience that converts it and the reporting that guides investment.",
    items: [
      {
        h3: "Acquisition with financial visibility",
        body: "Our [paid media](/services/paid-media) work prioritizes qualified demand and conversion value per cost, where higher is better. We evaluate campaign economics alongside lead quality and available operating capacity.",
      },
      {
        h3: "Visibility that supports long-term demand",
        body: "We combine [technical SEO](/services/web-development/technical-seo-and-performance), local search, and content to help people find relevant services and locations. Content answers the questions buyers research and supports an informed next step.",
      },
      {
        h3: "Websites built for conversion",
        body: "Our [website development](/services/web-development) connects clear messaging, location structure, and intake paths. We preserve useful existing URLs and remove friction between interest and inquiry.",
      },
      {
        h3: "Creative with a commercial purpose",
        body: "We develop messaging and creative that keep your offer consistent across channels and locations, then test what improves response.",
      },
      {
        h3: "More value from existing traffic",
        body: "Multi variant optimization uses machine learning to route visitors among landing page variants, with conversion performance guiding the testing.",
      },
      {
        h3: "Measurement beyond the lead",
        body: "Our [analytics and attribution](/services/analytics-and-attribution) connect call tracking and CRM integration to admissions, patients, or revenue, where the available data supports it.",
      },
      {
        h3: "Execution without repetitive handoffs",
        body: "We build automation for intake, follow-up, and reporting, reducing manual work while keeping people responsible for decisions. The objective is stronger patient or customer acquisition, not another disconnected tool.",
      },
    ],
  },

  /* 04 — Hospitals and health systems (capability framing only; no logos or engagement imagery) */
  hospitals: {
    h2: "Built for hospitals and health systems",
    paragraphs: [
      "Marketing Powered is a healthcare marketing agency designed to serve hospitals and health systems across locations, service lines, and internal teams.",
      "A campaign can generate interest while scheduling, intake, or inconsistent location information prevents that interest from becoming patient acquisition. We approach those connections as part of the marketing operation, not someone else's problem.",
      "Our approach to [hospital marketing](/who-we-help/hospitals-and-health-systems) brings acquisition strategy, website structure, and performance visibility into the same plan. For health system marketing teams, that means a clearer view of demand by service line and location.",
      "We design [multi-location marketing](/problems/scale-multi-location-campaigns) around shared standards and local market needs. Your leadership team can compare performance without forcing every site into the same campaign.",
      "Data handling and governance belong in the planning discussion because they shape which information can move between systems. We work within your review process, with responsibilities and deployment boundaries defined before implementation.",
    ],
  },

  /* 05 — Owned infrastructure */
  infrastructure: {
    h2: "Infrastructure we own, operated for your business",
    paragraphs: [
      "Marketing Powered invests in and operates its own computing hardware and systems. Our [owned infrastructure](/ai-edge/owned-ai-systems) gives us direct control over supported deployments, customization, and capacity instead of relying entirely on rented access.",
      "That lets us choose how a workflow runs and adapt the environment to its requirements. The value is practical: more control over the systems supporting your marketing operation, not hardware for its own sake.",
    ],
    subsections: [
      {
        h3: "Local processing",
        paragraphs: [
          "Supported workloads run on infrastructure we control, giving us direct oversight of data handling during processing. Our [local processing](/ai-edge/local-processing) approach does not mean every integration runs offline or every external service disappears. Clients retain ownership of their data; our ownership of the hardware does not change that.",
        ],
      },
      {
        h3: "AI governance",
        paragraphs: [
          "Our [AI governance](/ai-edge/ai-governance) approach combines access controls, testing before deployment, human review at defined decision points, and clear accountability. We decide where automation is appropriate and where a person must review the output or approve an action. Those controls support responsible execution without promising that technology alone resolves every security or compliance obligation.",
        ],
      },
    ],
    /* Decorative: out-of-focus indicator lights. Swap for a photo of actual
       agency-owned equipment (alt: "Computing infrastructure operated by
       Marketing Powered.") when one is approved. */
    image: "/images/pages/home/home-infrastructure-light-rows.jpg",
    imageAlt: "",
  },

  /* 06 — Data sovereignty, open source, and customization */
  dataControl: {
    h2: "Technology shaped around the way your business operates",
    intro:
      "The useful question is how technology improves control, fits your operation, and supports decisions your team needs to make. Our approach addresses each concern directly.",
    columns: [
      {
        h3: "Data sovereignty",
        paragraphs: [
          "Our [data sovereignty](/ai-edge/data-sovereignty) approach makes storage, processing, access, and outside services explicit. We define where information resides, how it moves, who can use it, and which providers participate in the workflow.",
          "You can see those choices rather than relying on a general assurance about privacy. The configuration follows the engagement and approved data uses, including any third-party connections needed to operate it.",
        ],
      },
      {
        h3: "Open source",
        paragraphs: [
          "Our [open source](/ai-edge/open-source) approach uses adaptable software to select, configure, and integrate technology around the business. We distinguish software under OSI-approved licenses from open-weight models released under other terms.",
          "Licensing and permitted use inform selection, not simply whether something is available to download. This flexibility helps us avoid forcing an operational requirement into a product that was designed for a different purpose.",
        ],
      },
      {
        h3: "Customizable AI",
        paragraphs: [
          "Our [customizable AI](/ai-edge/customizable-ai) work connects model configuration, approved business data, and workflows for specific operational needs. [Workflow integrations](/services/web-development/integrations-and-tracking) can support intake, attribution, reporting, or follow-up without adding another disconnected task for your team.",
          "We define the use case, available data, responsibilities, and limits before building. Clients retain their data ownership; access to our services does not automatically transfer our proprietary technology, workflows, or configurations.",
        ],
      },
    ],
  },

  /* 07 — Performance, attribution, and results */
  performance: {
    h2: "Measure what happens after the inquiry",
    paragraphs: [
      "Marketing performance should connect investment to business outcomes, with the limits of the data made clear.",
      "We connect campaign information, call tracking, and CRM records to examine what happens after an inquiry. Qualified opportunities, admissions, patients, and revenue matter more than a dashboard filled with disconnected activity. Our [intake attribution](/services/call-tracking-and-intake-attribution) work helps identify where demand converts and where the handoff breaks.",
      "We propose weekly operating checks and a monthly executive review, with the cadence defined in your engagement. Reporting covers spend, acquisition quality, conversion, and the next decisions. We distinguish measured outcomes from estimates and explain gaps rather than presenting incomplete tracking as certainty.",
      "The operating perspective comes from experience: during our founder's prior CMO tenure, his employer grew from about $30 million to about $140 million in revenue. That is organizational growth during his tenure, not an agency result or a claim that marketing alone caused it.",
      "Evaluate [client results](/results/case-studies) against the starting point, measurement period, work performed, and business context. A useful result should help you make a decision, not simply give you a larger number.",
    ],
  },

  /* 08 — Industries and specialties */
  industries: {
    h2: "Specialty depth with a broader operating model",
    items: [
      {
        h3: "Behavioral health and addiction treatment",
        body: "Our founder's operator experience informs [behavioral health marketing](/who-we-help/behavioral-health) and addiction treatment marketing. The focus includes admissions, intake, acquisition economics, and the constraints surrounding sensitive services.",
      },
      {
        h3: "Mental health providers",
        body: "Our operating approach connects demand generation with appropriate service information, inquiry handling, and conversion measurement. The objective is qualified patient acquisition, not call volume without context.",
      },
      {
        h3: "Hospitals and health systems",
        body: "Our model is built to support [health system marketing](/who-we-help/hospitals-and-health-systems) across service lines and locations, with organizational review and data handling considered from the start.",
      },
      {
        h3: "Other multi-location organizations",
        body: "The same operating disciplines apply where distributed teams need coordinated campaigns, consistent execution, and comparable reporting. We assess the fit before defining the engagement.",
      },
    ],
  },

  /* 09 — Why Marketing Powered (no new claims or links) */
  why: {
    h2: "Why Marketing Powered",
    items: [
      {
        h3: "Leadership that understands the operation",
        body: "You work with an agency shaped by executive responsibility for budgets, expansion, and the systems behind performance.",
      },
      {
        h3: "Technology with room to adapt",
        body: "Our investment in systems we operate gives us options beyond whatever a standard subscription allows.",
      },
      {
        h3: "Execution connected to the business",
        body: "We treat acquisition, conversion, and measurement as related responsibilities. The objective is progress you can evaluate, not a longer activity report.",
      },
      {
        h3: "People accountable for the decisions",
        body: "Automation supports the work. Human judgment remains responsible for priorities, approvals, and the changes that affect your organization. You should know who is responsible and what happens next.",
      },
    ],
  },

  /* 10 — Final call to action */
  close: {
    h2: "Start with the decisions your marketing needs to support",
    paragraphs: [
      "Tell us where growth is getting stuck and what your leadership team needs to see. We will discuss your priorities, current measurement, and the operational gaps between investment and results.",
      "The next step is a focused conversation about fit and where a deeper review would be useful. Bring the business problem. We will start there.",
    ],
  },
} as const;

export type HomeContent = typeof homeContent;
