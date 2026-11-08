/* ================================================================== */
/* Author profile — Michael "Mike" Hulick.                              */
/*                                                                      */
/* Source: "Mike Hulick Website Author / Publisher Page" (final page   */
/* copy, November 2026). One canonical author URL, /author/mike-hulick, */
/* is used in every byline on the site. Body strings carry inline      */
/* [anchor](path) links; internal paths resolve through lib/links so   */
/* nothing here can render a dead link. External links are the         */
/* author's real public profiles. Direct URLs for the individual       */
/* LinkedIn essays are not published here; those entries point at the  */
/* author's LinkedIn articles feed until a direct URL is supplied.     */
/*                                                                      */
/* Title policy: the author is referred to as founder of Marketing      */
/* Powered. Prior titles (CMO) describe former roles only.             */
/* ================================================================== */

export const AUTHOR_PATH = "/author/mike-hulick";

export const author = {
  slug: "mike-hulick",
  path: AUTHOR_PATH,
  /* Person entity name on the profile; bylines use the short form. */
  name: "Michael (Mike) Hulick",
  displayName: "Michael “Mike” Hulick",
  bylineName: "Mike Hulick",
  givenName: "Michael",
  familyName: "Hulick",
  jobTitle: "Founder",
  role: "Founder, Marketing Powered",
  roleLine: "Founder, Marketing Powered | Former Enterprise CMO",
  tagline:
    "Commercial growth strategy • Marketing operations • Applied AI and owned infrastructure • Regulated markets",
  image: "/images/pages/author/mike-hulick/mike-hulick.jpg",
  imageWidth: 1600,
  imageHeight: 1450,
  imageAlt: "Mike Hulick, founder of Marketing Powered",
  shareImage: "/images/pages/author/mike-hulick/mike-hulick-og.jpg",
  updated: "2026-11-08",

  links: {
    linkedin: "https://www.linkedin.com/in/mike-hulick-2a1190200/",
    linkedinArticles: "https://www.linkedin.com/in/mike-hulick-2a1190200/recent-activity/articles/",
    medium: "https://medium.com/@mhulick_97776",
  },

  seo: {
    title: "Michael (Mike) Hulick | Marketing Executive & Author | Marketing Powered",
    description:
      "Meet Mike Hulick, founder of Marketing Powered and former enterprise CMO. Explore his work in growth strategy, healthcare marketing, owned AI infrastructure, and attribution.",
  },

  lead:
    "Marketing executive, founder, author, and applied AI strategist. More than a decade building the teams, measurement systems, acquisition programs, and operating processes that connect demand to revenue.",

  topics: [
    "Commercial growth strategy",
    "Marketing operations",
    "Applied AI and owned infrastructure",
    "Regulated markets",
  ],

  /* Historical operating experience from a prior executive role. */
  metrics: [
    { value: "3 → 24", label: "Locations" },
    { value: "$30M → ~$140M", label: "Annual revenue" },
    { value: "$1.5M–$2M", label: "Monthly media" },
    { value: "40+", label: "Team built" },
  ],
  metricsNote:
    "Selected historical operating experience from a prior executive role. Not results guaranteed to Marketing Powered clients.",

  knowsAbout: [
    "Growth marketing strategy",
    "Healthcare marketing",
    "Behavioral health marketing",
    "Multi-location marketing",
    "Paid media and PPC",
    "Marketing attribution",
    "Conversion rate optimization",
    "AI infrastructure for marketing",
    "First-party data and data governance",
  ],

  sections: [
    {
      id: "perspective",
      heading: "Executive perspective",
      paragraphs: [
        "Michael “Mike” Hulick is a marketing executive, founder, author, and applied AI strategist whose career has centered on one question: how do you turn marketing investment into lasting business growth? He has spent more than a decade building the teams, measurement systems, acquisition programs, and operating processes that connect demand to revenue. His experience spans enterprise healthcare, multi-location expansion, professional services, and complex markets where compliance, trust, and commercial performance must work together.",
        "Hulick is the founder of [Marketing Powered](/company/about), a marketing and technology company built around experienced operators, owned AI infrastructure, first-party intelligence, and measurable outcomes. Before launching the company in 2025, he served as Chief Marketing Officer at Haven Health Management, helping support its expansion from three locations to 24 across nine states, with more than 1,000 inpatient beds. During that period, annual revenue grew from approximately $30 million to $140 million. His responsibility was to connect marketing performance with admissions capacity, commercial strategy, and organizational execution, not simply to produce more leads.",
      ],
    },
    {
      id: "career",
      heading: "From campaign management to enterprise growth",
      paragraphs: [
        "Hulick began his career in the operational side of healthcare growth: field outreach, provider relationships, facility-level market development, and demand generation. Those early roles created a perspective that pure agency experience rarely supplies. A marketing report can show a rising conversion rate while a business is losing qualified opportunities somewhere between the first phone call and the final sale. An impressive cost per lead can hide an expensive cost per acquired customer. More traffic can conceal a broken handoff between the website, CRM, and the team responsible for serving the customer.",
        "His progression through regional development, market analytics, and enterprise leadership took him from facility-level growth to multi-state operations. At Indiana Center for Recovery, he worked on market expansion, referral development, and digital acquisition. At J&J Consulting Group, he assessed treatment markets, reimbursement models, demand patterns, and operational efficiency. Earlier positions involved building local referral networks and strengthening occupancy in competitive treatment markets. Together, those experiences taught him to view marketing as part of a larger commercial system rather than a disconnected department.",
        "At Haven Health Management, his remit became significantly larger. He directed $1.5 million to $2 million in monthly paid media investment across more than 11 advertising accounts, built and led a multidisciplinary team of over 40 specialists, and worked across marketing, business development, admissions, clinical operations, finance, and executive leadership. Growth included new facilities, new geographic markets, and service-line development in [mental health](/who-we-help/mental-health), [substance use care](/who-we-help/behavioral-health/substance-use-disorder), [adolescent treatment](/who-we-help/behavioral-health/adolescent-treatment), veteran-focused services, and [telehealth](/who-we-help/mental-health/tele-mental-health).",
        "The defining lesson was not that larger budgets create larger businesses. It was that the relationship between investment and outcomes must be engineered. Attribution, lead qualification, operational capacity, customer experience, pricing and reimbursement, and the quality of the team all determine whether demand converts into durable enterprise value.",
      ],
    },
    {
      id: "operating-system",
      heading: "Marketing is an operating system, not a collection of channels",
      paragraphs: [
        "Hulick writes and advises on the difference between activity and performance. Search rankings, impressions, click-through rates, lead volume, and dashboards all have legitimate uses. None of them is a final business outcome. He argues that marketing leaders should be able to [connect the money spent](/problems/fix-attribution) to the market entered, the customer acquired, the revenue realized, and the operational work required to deliver it.",
        "That approach shaped several systems developed during his enterprise operating years. The Revenue-Driven Admissions System, built on Salesforce, connected treatment appropriateness and placement decisions with operating and commercial information. In his documented executive record, the system was credited with a 17% increase in annual revenue without additional marketing expenditure. His work on cross-account conversion intelligence also focused on making learning transferable between brands and markets, rather than leaving it trapped in separate advertising accounts.",
        "He later developed [multi variant optimization (MVO)](/services/landing-page-optimization), a method of matching visitors to relevant landing-page variants based on search intent, campaign context, device, geography, and other meaningful signals. Instead of treating one landing page or one blended conversion rate as the entire market, MVO treats [post-click experience](/services/conversion-rate-optimization) as a measurable part of acquisition economics. The operating principle is consistent: test hypotheses, preserve valid measurement, and optimize for the business outcome, not the most flattering platform metric.",
      ],
    },
    {
      id: "why-marketing-powered",
      heading: "Why Marketing Powered exists",
      paragraphs: [
        "Marketing Powered grew out of a frustration with a familiar industry model. Agencies often sell access to software, talent hours, and dashboards while the client remains dependent on the agency to understand what happened. Hulick wanted to build a different kind of company: one that could combine senior commercial judgment, specialists who understand execution, and a technical foundation that retains and improves its knowledge over time.",
        "Although the company formally launched in 2025, Hulick’s work with internal AI engineering, automation, and data systems dates to 2022. That distinction matters. The aim was not to add a chatbot to conventional agency work. It was to redesign how research, campaign development, analysis, content production, customer routing, reporting, and decision-making fit together inside [owned AI systems](/ai-edge/owned-ai-systems). Experienced people still own the judgment. Technology should remove avoidable friction and give good people more leverage.",
        "Today, Marketing Powered works at the intersection of growth strategy, [paid media](/services/paid-media), SEO, creative, conversion optimization, [attribution](/services/analytics-and-attribution), CRM processes, and applied AI. [Healthcare and behavioral health](/who-we-help/behavioral-health) remain important areas of deep specialization, but the company’s broader operating model is relevant to [hospitals](/who-we-help/hospitals-and-health-systems), professional services, legal organizations, [multi-location businesses](/problems/scale-multi-location-campaigns), and other enterprises with demanding acquisition or governance requirements.",
      ],
    },
    {
      id: "infrastructure",
      heading: "Owned AI infrastructure and data sovereignty",
      paragraphs: [
        "Hulick’s current technology thesis is straightforward: companies should [own the assets that make them smarter](/ai-edge/data-sovereignty). That includes first-party data, performance history, workflow logic, institutional knowledge, and the decision systems built around them. Cloud software can be valuable, but subscribing to the same tools as every competitor is not a durable strategy by itself. A company gains long-term leverage when each campaign, experiment, workflow, and operational lesson can improve the next one inside a controlled environment.",
        "Marketing Powered has invested in [local computing resources](/ai-edge/local-processing), controlled storage, [open and locally deployable AI models](/ai-edge/open-source), proprietary data workflows, and specialized agents. MAIOS, the Marketing AI Operating System, is the internal architecture designed to coordinate research, analytics, paid media, content, automation, CRM activity, and executive decision support. It is an evolving operating environment, not a claim that one system has eliminated the need for every external platform or human review.",
        "This architectural choice also reflects the realities of regulated markets. Data location, access permissions, security controls, consent, retention, and integration boundaries are not abstract IT concerns when customer information is sensitive. Hulick’s work focuses on [practical governance](/ai-edge/ai-governance), defensible measurement, and using technology within the rules that apply to each industry. Local inference and owned storage can create more control, but they do not automatically establish [HIPAA compliance](/resources/guides/hipaa-digital-marketing-risk) or replace the need for appropriate legal, technical, and security safeguards.",
        "In his LinkedIn essay, [“Compute Is Now an Asset Class,”](https://www.linkedin.com/in/mike-hulick-2a1190200/recent-activity/articles/) Hulick describes a transition from renting isolated software capabilities to building owned systems that compound their value. His companion piece, [“Most Just Haven’t Realized It Yet,”](https://www.linkedin.com/in/mike-hulick-2a1190200/recent-activity/articles/) argues that the constraint in AI-enabled businesses has moved from producing more output to connecting that output with strategy, approvals, deployment, and revenue. Those themes guide both the company’s engineering investments and his editorial work.",
      ],
    },
    {
      id: "regulated-markets",
      heading: "Expertise in regulated, high-stakes markets",
      paragraphs: [
        "Healthcare marketing has high commercial stakes and additional responsibilities. Patient and family communication should be clear, respectful, and accurate. Performance systems must account for clinical capacity, intake quality, payer dynamics, platform advertising restrictions, and lawful handling of sensitive information. A metric that makes sense for a consumer product may be the wrong success measure for a treatment provider or hospital service line.",
        "Hulick has worked with these realities from inside the organization. His interests include practical attribution from first touch to [qualified opportunity](/problems/fix-lead-quality), disciplined [paid search](/services/google-ads-management), organic visibility grounded in real expertise, reputation, [compliant channel diversification](/resources/compliance-ad-policy), and the gap between marketing-generated demand and what [operations can convert](/services/intake-optimization). His more recent writing also examines how [AI-generated search answers](/resources/guides/future-ai-search-2026-2027) are changing the relationship between online visibility and actual website visits.",
        "He does not write as a physician or clinician. His perspective is commercial, operational, and technical. When content makes medical claims or discusses treatment decisions, the appropriate standard is independent clinical review and reliable evidence, not a marketing executive’s title.",
      ],
    },
    {
      id: "leadership",
      heading: "Leadership approach",
      paragraphs: [
        "Hulick’s approach to AI is not about reducing headcount as the first response to change. He has built and managed large, geographically distributed teams, and he believes organizational capability comes from investing in people who can adapt, test assumptions, and work across disciplines. Software cannot rescue weak management or a strategy that nobody understands. Strong teams, clear accountability, and better operating systems reinforce each other.",
        "His recent public commentary challenges leadership teams to retrain and retool before defaulting to staff reductions. He also emphasizes the value of dissent and sound judgment in management, asking prospective teammates whether they are comfortable being wrong. The goal is a culture in which people can challenge weak assumptions early, use evidence to improve decisions, and create results that are repeatable without becoming rigid.",
      ],
    },
    {
      id: "author",
      heading: "Author, publisher, and public contributor",
      paragraphs: [
        "Hulick publishes practical analysis on digital marketing, enterprise growth, healthcare acquisition, AI infrastructure, and data governance. His writing combines operator experience with an interest in how technology changes the economics of work. He is particularly interested in the difference between adopting tools and building capabilities, and between collecting data and using it to make a better decision.",
        "His articles have appeared on [LinkedIn](https://www.linkedin.com/in/mike-hulick-2a1190200/), [Medium](https://medium.com/@mhulick_97776), and Marketing Powered’s [publishing channels](/resources). He has also contributed to industry conversations as a healthcare marketing panelist, including the Cardinal Digital Marketing session [“Marketing that Scales: How to Drive Growth and Efficiency in Healthcare”](https://cardinaldigitalmarketing.com/healthcare-resources/webinars/marketing-that-scales) in May 2023. In addition to executive leadership, he serves as a GLG Network Expert and has provided marketing expert-witness analysis and testimony in matters involving advertising strategy, campaign performance, attribution, and root-cause evaluation.",
      ],
    },
    {
      id: "readers",
      heading: "What readers can expect",
      paragraphs: [
        "Articles published under Hulick’s byline emphasize first-hand operating experience, a clear separation between observation and inference, and evidence that readers can evaluate. He writes primarily for CEOs, chief marketing officers, healthcare executives, founders, investors, and operators responsible for measurable growth. Topics include revenue strategy, multi-site expansion, paid acquisition, search, attribution, first-party data, AI infrastructure, compliance-aware marketing, and the leadership systems that make execution possible.",
      ],
    },
  ],

  /* Published work, newest first. `href` is a real public destination. */
  writing: [
    {
      title: "Compute Is Now an Asset Class. I Built Marketing Powered for This in 2022.",
      outlet: "LinkedIn",
      kind: "Essay",
      date: "September 5, 2026",
      iso: "2026-09-05",
      blurb:
        "Owned computing, first-party intelligence, economic leverage, and the limits of subscription-led AI strategy.",
      href: "https://www.linkedin.com/in/mike-hulick-2a1190200/recent-activity/articles/",
      featured: true,
    },
    {
      title: "Most Just Haven’t Realized It Yet.",
      outlet: "LinkedIn",
      kind: "Essay",
      date: "May 28, 2026",
      iso: "2026-05-28",
      blurb:
        "Why AI output is not enough and why infrastructure, integration, and governance are becoming competitive advantages.",
      href: "https://www.linkedin.com/in/mike-hulick-2a1190200/recent-activity/articles/",
      featured: true,
    },
    {
      title: "Healthcare Marketing in 2026: The Organizations That Move Now Will Win",
      outlet: "Medium",
      kind: "Article",
      date: "April 5, 2026",
      iso: "2026-04-05",
      blurb:
        "Outcome-based measurement, patient experience, value messaging, and responsible technology adoption.",
      href: "https://medium.com/@mhulick_97776/healthcare-marketing-in-2026-the-organizations-that-move-now-will-win-8ce4fa3d8980",
      featured: true,
    },
    {
      title: "Outdated Digital Marketing Tactics in Behavioral Health: What to Leave Behind in 2024",
      outlet: "LinkedIn",
      kind: "Article",
      date: "August 12, 2025",
      iso: "2025-08-12",
      blurb:
        "Patient trust, conversion measurement, original content, and disciplined advertising in a regulated field.",
      href: "https://www.linkedin.com/in/mike-hulick-2a1190200/recent-activity/articles/",
      featured: false,
    },
    {
      title: "The New Rules of PPC: Scaling With Data, Not Guesswork",
      outlet: "Medium",
      kind: "Article",
      date: "August 10, 2025",
      iso: "2025-08-10",
      blurb:
        "Marginal acquisition economics, cross-account learning, testing discipline, and revenue-aligned optimization.",
      href: "https://medium.com/@mhulick_97776",
      featured: false,
    },
    {
      title: "Top 10 Open Source AI Models of 2025: Comprehensive Review",
      outlet: "Marketing Powered",
      kind: "Article",
      date: "July 23, 2025",
      iso: "2025-07-23",
      blurb:
        "The practical implications of open-weight models, efficiency, and broader access to AI infrastructure. Also published on LinkedIn.",
      href: "/top-10-open-source-ai-models-of-2025",
      featured: false,
    },
    {
      title: "Marketing that Scales: How to Drive Growth and Efficiency in Healthcare",
      outlet: "Cardinal Digital Marketing",
      kind: "Panelist",
      date: "May 17, 2023",
      iso: "2023-05-17",
      blurb:
        "A panel on building a scalable marketing function for multi-site healthcare groups: centralizing operations, structuring the team, and scaling patient acquisition.",
      href: "https://cardinaldigitalmarketing.com/healthcare-resources/webinars/marketing-that-scales",
      featured: false,
    },
  ],

  disclosures: [
    "Views and analysis expressed in his bylined articles are his professional opinions unless otherwise attributed.",
    "Historical operating results refer to work in prior executive roles and should not be read as a guarantee of future client performance.",
    "Marketing Powered, LLC is the publisher of this website. Content on marketing and technology is not medical, legal, or financial advice.",
  ],

  connect: {
    heading: "Connect",
    body:
      "For executive collaboration, speaking, interviews, expert commentary, or a conversation about building durable growth infrastructure, connect with Mike through Marketing Powered or LinkedIn.",
  },
} as const;

export type AuthorWriting = (typeof author.writing)[number];
