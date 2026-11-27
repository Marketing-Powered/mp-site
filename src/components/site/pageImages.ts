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

/* Photos and graphics shipped from MAIOS Content Studio (scripts/studio-ship.mjs).
   They are full-bleed artwork with their own background, unlike the brand
   graphics above, which sit on a white artboard. So they fill the frame edge
   to edge (`cover`) and the frame takes the file's own aspect ratio: no white
   bands, no padding and no cropping. Portrait and square images get a narrower
   column (see MarkdownPage). */
const studioImg = (route: string, file: string, alt: string, ratio: string): SlotImg => ({
  src: `/images/pages/${route}/${file}`,
  alt,
  fit: "cover",
  ratio,
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
  "/resources/compliance-ad-policy/": [
    // [0] hero
    studioImg(
      "resources/compliance-ad-policy",
      "compliance-ad-policy.webp",
      "Hospital admissions entrance at dusk showing the setting for healthcare advertising compliance.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/compliance-ad-policy",
      "compliance-ad-policy-ringing-desk-phone-intake-folders.webp",
      "Ringing desk phone next to intake folders representing failed healthcare ad launches.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/compliance-ad-policy",
      "compliance-ad-policy-server-room-racks-representing-first.webp",
      "Server room racks representing first-party measurement infrastructure.",
      "3 / 2",
    ),
  ],
  "/research/studies/attribution-reality-check/": [
    // [0] hero
    studioImg(
      "research/studies/attribution-reality-check",
      "attribution-reality-check.webp",
      "Empty conference room table with financial reports and marketing dashboard laptop in morning light",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "research/studies/attribution-reality-check",
      "attribution-reality-check-hands-pointing-two-printed-reports.webp",
      "Hands pointing at two printed reports showing conflicting marketing and revenue numbers on a desk",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "research/studies/attribution-reality-check",
      "attribution-reality-check-two-column-comparison-attribution.webp",
      "Two-column comparison of attribution challenges in consumer versus regulated markets",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "research/studies/attribution-reality-check",
      "attribution-reality-check-hand-marking-dates-wall-calendar-show.webp",
      "Hand marking dates on a wall calendar to show repeated validation process",
      "3 / 2",
    ),
  ],
  "/resources/guides/microsoft-ads-behavioral-health/": [
    // [0] hero
    studioImg(
      "resources/guides/microsoft-ads-behavioral-health",
      "microsoft-ads-behavioral-health.webp",
      "Exterior view of a modern behavioral healthcare facility building with clean glass architecture under morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/guides/microsoft-ads-behavioral-health",
      "microsoft-ads-behavioral-health-close-up-admissions-desk-phone-organized.webp",
      "Close-up of an admissions desk phone and organized intake folders in a treatment facility intake station.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/guides/microsoft-ads-behavioral-health",
      "microsoft-ads-behavioral-health-four-step-process-diagram-showing.webp",
      "Four-step process diagram showing compliant Microsoft Ads campaign setup steps for behavioral health providers.",
      "3 / 2",
    ),
  ],
  "/resources/guides/google-ads-compliance-for-mental-and-behavioral-health/": [
    // [0] hero
    studioImg(
      "resources/guides/google-ads-compliance-for-mental-and-behavioral-health",
      "google-ads-compliance-for-mental-and-behavioral.webp",
      "Exterior entrance of a modern healthcare facility at sunrise with concrete walkways and architectural pillars.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/guides/google-ads-compliance-for-mental-and-behavioral-health",
      "google-ads-compliance-for-mental-and-behavioral-two-column-graphic-comparing-healthcare.webp",
      "Two-column graphic comparing Healthcare Policy requirements against Personalized Advertising rules for healthcare accounts.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/guides/google-ads-compliance-for-mental-and-behavioral-health",
      "google-ads-compliance-for-mental-and-behavioral-close-up-paper-compliance-document-pen.webp",
      "Close-up of a paper compliance document and pen resting on a wooden tabletop in soft daylight.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/guides/google-ads-compliance-for-mental-and-behavioral-health",
      "google-ads-compliance-for-mental-and-behavioral-directional-stone-post-along-paved.webp",
      "Directional stone post along a paved walkway outside a medical office building at dusk.",
      "3 / 2",
    ),
  ],
  "/resources/guides/landing-page-optimization-paid-media/": [
    // [0] hero
    studioImg(
      "resources/guides/landing-page-optimization-paid-media",
      "landing-page-optimization-paid-media.webp",
      "Hospital administrator reviewing landing page performance metrics at admissions desk",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/guides/landing-page-optimization-paid-media",
      "landing-page-optimization-paid-media-desk-phone-printed-report-showing-cost.webp",
      "Desk phone next to printed report showing cost per qualified inquiry ratio",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/guides/landing-page-optimization-paid-media",
      "landing-page-optimization-paid-media-hands-placing-short-intake-form-beside.webp",
      "Hands placing short intake form beside click-to-call instructions",
      "3 / 2",
    ),
  ],
  "/resources/google-ads/": [
    // [0] hero
    studioImg(
      "resources/google-ads",
      "google-ads.webp",
      "Healthcare marketing leader standing at hospital window overlooking city skyline at dawn.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/google-ads",
      "google-ads-healthcare-admissions-coordinator.webp",
      "Healthcare admissions coordinator standing in hospital corridor reviewing a printed report on clipboard.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/google-ads",
      "google-ads-two-column-comparison-showing-typical.webp",
      "Two-column comparison showing typical account versus closed-loop account with first-party data feedback to Google Ads.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/google-ads",
      "google-ads-hospital-parking-lot-dusk-showing-two.webp",
      "Hospital parking lot at dusk showing two separate clinic building entrances with geographic separation.",
      "3 / 2",
    ),
  ],
  "/resources/attribution-measurement/": [
    // [0] hero
    studioImg(
      "resources/attribution-measurement",
      "attribution-measurement.webp",
      "Empty clinic reception counter at opening with a desk phone, intake folders and a sign-in clipboard.",
      "7 / 4",
    ),
    // [2] section image
    studioImg(
      "resources/attribution-measurement",
      "attribution-measurement-close-up-blank-printed-intake-form-pen.webp",
      "Close-up of a blank printed intake form with a pen and an unplugged network cable on a desk surface.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/attribution-measurement",
      "attribution-measurement-four-stage-flow-diagram-reading-tracking.webp",
      "Four-stage flow diagram reading tracking custody, data governance, outcome linkage and reporting cadence.",
      "3 / 2",
    ),
  ],
  "/resources/ai-in-marketing/": [
    // [0] hero
    studioImg(
      "resources/ai-in-marketing",
      "ai-in-marketing.webp",
      "Corridor of grey electrical panels with one large manual lever switch and small blue and green indicator lamps.",
      "7 / 4",
    ),
    // [2] section image
    studioImg(
      "resources/ai-in-marketing",
      "ai-in-marketing-close-up-hands-uncapping-pen-over-stack.webp",
      "Close-up of hands uncapping a pen over a stack of blank proof sheets on a counter.",
      "3 / 2",
    ),
  ],
  "/research/studies/annual-paid-media-and-ai-trends/": [
    // [0] hero
    studioImg(
      "research/studies/annual-paid-media-and-ai-trends",
      "annual-paid-media-and-ai-trends.webp",
      "Hospital building exterior at dusk with empty parking lot and illuminated entrance.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "research/studies/annual-paid-media-and-ai-trends",
      "annual-paid-media-and-ai-trends-printed-google-ads-policy-documents-desk.webp",
      "Printed Google Ads policy documents on a desk highlighting sensitive category rules.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "research/studies/annual-paid-media-and-ai-trends",
      "annual-paid-media-and-ai-trends-vertical-checklist-diagram-seven.webp",
      "Vertical checklist diagram with seven numbered operator evaluation steps for new tools.",
      "3 / 2",
    ),
  ],
  "/resources/guides/mental-health-paid-media-playbook/": [
    // [0] hero
    studioImg(
      "resources/guides/mental-health-paid-media-playbook",
      "mental-health-paid-media-playbook.webp",
      "Marketing leader standing and reviewing abstracted paid media performance charts on a large monitor in a modern office.",
      "7 / 4",
    ),
    // [2] section image
    studioImg(
      "resources/guides/mental-health-paid-media-playbook",
      "mental-health-paid-media-playbook-printed-facility-map-location-list.webp",
      "Printed facility map and location list documents used for multi-location paid media campaign design.",
      "3 / 2",
    ),
  ],
  "/company/data-sovereignty/": [
    // [0] hero
    studioImg(
      "company/data-sovereignty",
      "data-sovereignty.webp",
      "Ringing desk phone beside intake folders on an office surface in a healthcare corridor.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "company/data-sovereignty",
      "data-sovereignty-empty-hospital-corridor-dawn-sunlight.webp",
      "Empty hospital corridor at dawn with sunlight at the far end.",
      "3 / 2",
    ),
  ],
  "/company/contact/": [
    // [0] hero
    studioImg(
      "company/contact",
      "contact.webp",
      "Empty conference table and chairs prepared for a strategy call discussion.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "company/contact",
      "contact-desk-phone-notebook-documenting.webp",
      "Desk phone and notebook documenting acquisition channels and measurement gaps.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "company/contact",
      "contact-healthcare-facility-entrance-dusk.webp",
      "Healthcare facility entrance at dusk representing inquiry entry points and admissions processes.",
      "3 / 2",
    ),
  ],
  "/media/newsroom/": [
    // [0] hero
    studioImg(
      "media/newsroom",
      "newsroom.webp",
      "Operator-led team reviewing generic ad performance data together in the office.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "media/newsroom",
      "newsroom-hands-reviewing-recent-company-news.webp",
      "Hands reviewing recent company news and updates on a tablet.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "media/newsroom",
      "newsroom-presenter-speaking-advertising-strategy.webp",
      "Presenter speaking on advertising strategy in a conference setting.",
      "3 / 2",
    ),
  ],
  "/media/podcast-appearances/": [
    // [0] hero
    studioImg(
      "media/podcast-appearances",
      "podcast-appearances.webp",
      "Former healthcare CMO describing real budget decisions and attribution gaps from operator experience.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "media/podcast-appearances",
      "podcast-appearances-local-server-infrastructure-used-owned.webp",
      "Local server infrastructure used for owned compute in regulated marketing environments.",
      "3 / 2",
    ),
  ],
  "/media/media-kit/": [
    // [0] hero
    studioImg(
      "media/media-kit",
      "media-kit.webp",
      "Printed lower-third graphic template beside an unopened media kit envelope on a studio table.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "media/media-kit",
      "media-kit-media-contact-phone-station-ringing.webp",
      "Media contact phone station with ringing phone and printed media kit folder in office corridor.",
      "3 / 2",
    ),
  ],
  "/who-we-help/collagen-peptide-supplement-brands/": [
    // [0] hero
    studioImg(
      "who-we-help/collagen-peptide-supplement-brands",
      "collagen-peptide-marketing.webp",
      "An unbranded white supplement canister and glass beaker of collagen peptide powder rest on a stainless steel counter beside a measuring scoop.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "who-we-help/collagen-peptide-supplement-brands",
      "collagen-peptide-marketing-three-step-sequential-process-diagram.webp",
      "A three-step sequential process diagram showing Category Review, Claims Substantiation, and Channel Eligibility steps on a white background.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/collagen-peptide-supplement-brands",
      "collagen-peptide-marketing-printed-supplement-packaging-proof.webp",
      "Printed supplement packaging proof sheets displaying an unbranded Supplement Facts panel lay across an illuminated inspection table.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "who-we-help/collagen-peptide-supplement-brands",
      "collagen-peptide-marketing-gloved-hands-place-insert-card-unbranded.webp",
      "Gloved hands place an insert card into an unbranded subscription mailer box on a steel roller conveyor inside a fulfillment facility.",
      "3 / 2",
    ),
  ],
  "/services/unstructured-data-processing/": [
    // [0] hero
    studioImg(
      "services/unstructured-data-processing",
      "unstructured-data-processing-services.webp",
      "Industrial metal shelving holding organized archival storage boxes with blue inventory labels in a quiet records facility.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/unstructured-data-processing",
      "unstructured-data-processing-services-process-diagram-showing-five-stages.webp",
      "Process diagram showing five stages of archive conversion from inventory and extraction to governed dataset.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/unstructured-data-processing",
      "unstructured-data-processing-services-close-up-view-hands-reviewing-paper.webp",
      "Close-up view of hands reviewing a paper archive document with an audit verification stamp and green ink field notation.",
      "3 / 2",
    ),
  ],
  "/services/ai-evaluation-services/": [
    // [0] hero
    studioImg(
      "services/ai-evaluation-services",
      "ai-evaluation-services.webp",
      "Wide view of an on-premises server corridor with overhead cable trays and quiet equipment rack indicator lights.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/ai-evaluation-services",
      "ai-evaluation-services-process-diagram-outlining-four.webp",
      "Process diagram outlining four evaluation stages: Name Decision, Set Baselines, Acceptance Thresholds, and Release Criteria.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/ai-evaluation-services",
      "ai-evaluation-services-close-up-analog-stopwatch-beside-tabbed.webp",
      "Close-up of an analog stopwatch beside tabbed intake folders on a records sorting shelf.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/ai-evaluation-services",
      "ai-evaluation-services-operations-professional-seen-behind.webp",
      "An operations professional seen from behind walking into a healthcare administration building at sunrise.",
      "3 / 2",
    ),
  ],
  "/services/data-governance-consulting/": [
    // [0] hero
    studioImg(
      "services/data-governance-consulting",
      "data-governance-consulting.webp",
      "Wide view of a server room aisle with tall equipment racks illuminated by blue and green indicator lights.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/data-governance-consulting",
      "data-governance-consulting-close-up-hands-holding-two-different.webp",
      "Close-up of hands holding two different colored record folders over a wooden administrative counter.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/data-governance-consulting",
      "data-governance-consulting-medium-shot-empty-administrative-desk.webp",
      "Medium shot of an empty administrative desk station with a phone and review ledger in soft daylight.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/data-governance-consulting",
      "data-governance-consulting-two-column-comparison-diagram.webp",
      "Two-column comparison diagram contrasting small-team baseline governance requirements against enterprise operational cadence.",
      "3 / 2",
    ),
  ],
  "/services/data-quality/": [
    // [0] hero
    studioImg(
      "services/data-quality",
      "data-quality-services.webp",
      "Wide exterior view of a modern glass clinic building entrance at sunrise with an open concrete plaza.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/data-quality",
      "data-quality-services-close-up-black-desk-phone-intake-folder.webp",
      "Close-up of a black desk phone and an intake folder resting on a wooden admissions counter.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/data-quality",
      "data-quality-services-three-step-diagram-showing-validation.webp",
      "Three-step diagram showing validation stages labeled Reconcile Totals, Sample Matches, and Log Exceptions.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/data-quality",
      "data-quality-services-systems-specialist-seen-behind.webp",
      "Systems specialist seen from behind inspecting cabling on an open server rack in a quiet data room.",
      "3 / 2",
    ),
  ],
  "/who-we-help/small-business/private-ai/": [
    // [0] hero
    studioImg(
      "who-we-help/small-business/private-ai",
      "private-ai-for-small-business.webp",
      "Empty medical clinic reception counter and waiting area with morning light on slate tile floor.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "who-we-help/small-business/private-ai",
      "private-ai-for-small-business-four-stage-decision-diagram-filtering.webp",
      "Four-stage decision diagram filtering small-business workflows by volume, effort, failure cost, and owner handoff.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/small-business/private-ai",
      "private-ai-for-small-business-hands-loading-paper-document-invoices.webp",
      "Hands loading paper document invoices into a desktop scanner feed tray on an oak credenza.",
      "3 / 2",
    ),
  ],
  "/services/private-cloud-ai-deployment/": [
    // [0] hero
    studioImg(
      "services/private-cloud-ai-deployment",
      "private-cloud-ai-deployment.webp",
      "Empty server cabinet aisle in a secure data hall with subtle blue and green indicator lights along an open corridor.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/private-cloud-ai-deployment",
      "private-cloud-ai-deployment-comparison-diagram-showing-architecture.webp",
      "Comparison diagram showing architecture and ownership boundaries across dedicated hosting, customer VPC, and managed endpoint options.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/private-cloud-ai-deployment",
      "private-cloud-ai-deployment-technician-hands-antistatic-gloves.webp",
      "Technician hands in antistatic gloves installing cooling hardware into a server chassis on a clean staging workbench.",
      "3 / 2",
    ),
  ],
  "/services/customer-intelligence/": [
    // [0] hero
    studioImg(
      "services/customer-intelligence",
      "customer-intelligence-services.webp",
      "An empty clinic admissions desk with a multi-line telephone and intake folders in early morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/customer-intelligence",
      "customer-intelligence-services-document-portfolio-containing-decision.webp",
      "A document portfolio containing a decision statement resting on a wooden standing lectern in daylight.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/customer-intelligence",
      "customer-intelligence-services-comparison-diagram-contrasting-analysis.webp",
      "A comparison diagram contrasting analysis-only segments and activation-approved segments across three governance boundaries.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/customer-intelligence",
      "customer-intelligence-services-close-up-view-premise-local-inference.webp",
      "A close-up view of an on-premise local inference server chassis with organized cabling in an equipment room.",
      "3 / 2",
    ),
  ],
  "/services/customer-lifetime-value-analysis/": [
    // [0] hero
    studioImg(
      "services/customer-lifetime-value-analysis",
      "customer-lifetime-value-analysis.webp",
      "Galvanized steel guardrail curving along an empty mountain road at dawn.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/customer-lifetime-value-analysis",
      "customer-lifetime-value-analysis-diagram-showing-three-stacked-customer.webp",
      "Diagram showing three stacked customer value tiers: Gross Revenue, Gross Margin, and Contribution.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/customer-lifetime-value-analysis",
      "customer-lifetime-value-analysis-two-blank-intake-folders-analog-desk.webp",
      "Two blank intake folders and an analog desk phone on a quartz reception counter.",
      "3 / 2",
    ),
  ],
  "/services/intelligent-document-processing/": [
    // [0] hero
    studioImg(
      "services/intelligent-document-processing",
      "intelligent-document-processing-services.webp",
      "An empty institutional records intake station with sorting trays on an aluminum counter in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/intelligent-document-processing",
      "intelligent-document-processing-services-decision-flow-diagram-showing-document.webp",
      "A decision flow diagram showing document data extraction branching into automated system write or human exception review.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-email-marketing/": [
    // [0] hero
    studioImg(
      "resources/peptide-email-marketing",
      "peptide-email-marketing.webp",
      "Sealed laboratory transport vials resting in an aluminum staging rack beside dispatch packaging on a clean clinic counter.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-email-marketing",
      "peptide-email-marketing-three-column-classification-diagram.webp",
      "Three-column classification diagram mapping service messages, commercial promotions, and clinical communications to governing rules.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-email-marketing",
      "peptide-email-marketing-gloved-hands-aligning-steel-ruler.webp",
      "Gloved hands aligning a steel ruler against an unprinted product box carton on a gridded inspection mat.",
      "3 / 2",
    ),
  ],
  "/resources/market-intelligence-brief-template/": [
    // [0] hero
    studioImg(
      "resources/market-intelligence-brief-template",
      "market-research-brief-template.webp",
      "Empty modern boardroom overlooking a city skyline at dawn with a timber credenza and expansive morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/market-intelligence-brief-template",
      "market-research-brief-template-executive-viewed-behind-walking-down.webp",
      "Executive viewed from behind walking down a concrete corridor at dusk holding a closed document binder.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/market-intelligence-brief-template",
      "market-research-brief-template-close-up-bound-linen-research.webp",
      "Close-up of a bound linen research specification folder with a blue ribbon on a walnut tabletop.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-marketing-in-house-vs-agency/": [
    // [0] hero
    studioImg(
      "resources/peptide-marketing-in-house-vs-agency",
      "peptide-marketing-agency-vs-in-house.webp",
      "Insulated transport container and sealed document envelopes on a stainless steel staging counter in an empty logistics hallway.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-marketing-in-house-vs-agency",
      "peptide-marketing-agency-vs-in-house-capability-matrix-diagram-organizing.webp",
      "Capability matrix diagram organizing five peptide marketing responsibilities with eligibility review highlighted in sky blue.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-marketing-in-house-vs-agency",
      "peptide-marketing-agency-vs-in-house-operations-leader-standing.webp",
      "An operations leader standing in an administrative hallway carrying a portfolio folder toward a sunlit corridor.",
      "3 / 2",
    ),
  ],
  "/resources/research-peptide-catalog-architecture/": [
    // [0] hero
    studioImg(
      "resources/research-peptide-catalog-architecture",
      "research-peptide-catalog-seo.webp",
      "Row of sealed scientific glass vials held in a blue anodized cold block on a clean laboratory workbench.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/research-peptide-catalog-architecture",
      "research-peptide-catalog-seo-diagram-showing-four-research-peptide.webp",
      "Diagram showing four research peptide data tiers leading from identifiers and specifications to an institutional quote request.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/research-peptide-catalog-architecture",
      "research-peptide-catalog-seo-printed-technical-documentation-safety.webp",
      "Printed technical documentation and safety sheets resting in a tabbed intake folder on a steel laboratory inspection cart.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/research-peptide-catalog-architecture",
      "research-peptide-catalog-seo-open-cardboard-shipping-carton-custom.webp",
      "Open cardboard shipping carton with custom foam cutouts holding laboratory vials on a wooden packaging station.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-supplement-cosmetic-claims/": [
    // [0] hero
    studioImg(
      "resources/peptide-supplement-cosmetic-claims",
      "peptide-supplement-cosmetic-claims.webp",
      "Amber glass dropper bottle and white supplement container resting on a clean staging counter with open space on the right.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-supplement-cosmetic-claims",
      "peptide-supplement-cosmetic-claims-two-column-comparison-diagram-showing.webp",
      "Two-column comparison diagram showing supplement and cosmetic pathways converging into drug intended use when disease claims are made.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-supplement-cosmetic-claims",
      "peptide-supplement-cosmetic-claims-spiral-technical-binder-resting-beside.webp",
      "Spiral technical binder resting beside glass specimen vials on a stainless steel formulation bench.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/peptide-supplement-cosmetic-claims",
      "peptide-supplement-cosmetic-claims-gloved-hands-set-aside-unprinted-product.webp",
      "Gloved hands set aside an unprinted product carton along an industrial packaging guide rail.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-influencer-affiliate-marketing/": [
    // [0] hero
    studioImg(
      "resources/peptide-influencer-affiliate-marketing",
      "peptide-influencer-marketing.webp",
      "Plain white cosmetic product boxes resting on a stainless steel inspection counter in a brightly lit staging room.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-influencer-affiliate-marketing",
      "peptide-influencer-marketing-five-stage-horizontal-flow-diagram.webp",
      "A five-stage horizontal flow diagram outlining claims library, creator brief, content review, monitoring sweeps, and quarterly review.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-claims-knowledge-base/": [
    // [0] hero
    studioImg(
      "resources/peptide-claims-knowledge-base",
      "peptide-claims-knowledge-base.webp",
      "Empty clinical research library with oak reference counter, clothbound catalog ledgers, and morning light through tall windows.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-claims-knowledge-base",
      "peptide-claims-knowledge-base-diagram-comparing-evidence-record.webp",
      "Diagram comparing an evidence record to an approved claim record, separated by a human sign-off decision gate.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-marketing-ad-suspension-continuity/": [
    // [0] hero
    studioImg(
      "resources/peptide-marketing-ad-suspension-continuity",
      "peptide-ad-suspension-business-continuity.webp",
      "A sealed shipping box and inspection clipboard rest on a stainless steel worktable in a distribution facility.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-marketing-ad-suspension-continuity",
      "peptide-ad-suspension-business-continuity-four-labeled-archival-binders-stand.webp",
      "Four labeled archival binders stand in a wooden organizer on an archive room shelf.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-marketing-ad-suspension-continuity",
      "peptide-ad-suspension-business-continuity-vertical-process-diagram-showing-four.webp",
      "A vertical process diagram showing four compliance review stages from lawful operation to account standing.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/peptide-marketing-ad-suspension-continuity",
      "peptide-ad-suspension-business-continuity-enclosed-server-rack-neatly-organized.webp",
      "An enclosed server rack with neatly organized blue ethernet cables and green indicator lights.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-content-clinical-review/": [
    // [0] hero
    studioImg(
      "resources/peptide-content-clinical-review",
      "peptide-content-review.webp",
      "An empty clinical research archive hallway lined with gray reference binders on steel shelves in natural morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-content-clinical-review",
      "peptide-content-review-three-column-comparison-diagram.webp",
      "Three-column comparison diagram categorizing peptide content into Category Education, Service Explanation, and Clinical Claims.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-content-clinical-review",
      "peptide-content-review-close-up-metal-date-stamp-resting-beside.webp",
      "Close-up of a metal date stamp resting beside stacked linen document folders with green indexing tabs on a stone surface.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-marketing-plan-budget/": [
    // [0] hero
    studioImg(
      "resources/peptide-marketing-plan-budget",
      "peptide-marketing-plan.webp",
      "Wide exterior view of a modern glass medical clinic entrance pavilion and empty courtyard in pale early morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-marketing-plan-budget",
      "peptide-marketing-plan-close-up-still-life-consultation-room.webp",
      "Close-up still life of a consultation room doorway key and blank clipboard in warm late afternoon sunlight.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-marketing-plan-budget",
      "peptide-marketing-plan-stepped-flow-diagram-showing-three.webp",
      "Stepped flow diagram showing three conditional 90-day phases from eligibility to controlled launch and scale decision.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/peptide-marketing-plan-budget",
      "peptide-marketing-plan-medium-wide-view-empty-server-room.webp",
      "Medium-wide view of an empty server room corridor with black cabinet racks and quiet blue indicator lights.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-marketing-crm-data-governance/": [
    // [0] hero
    studioImg(
      "resources/peptide-marketing-crm-data-governance",
      "peptide-marketing-data-governance.webp",
      "Three-column comparison table separating patient care, institutional procurement, and consumer commerce data categories.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-marketing-crm-data-governance",
      "peptide-marketing-data-governance-close-up-hands-organizing-access-tags.webp",
      "Close-up of hands organizing access tags on a metal rack in a modern healthcare facility corridor.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-marketing-crm-data-governance",
      "peptide-marketing-data-governance-cleanly-routed-blue-black-network-fiber.webp",
      "Cleanly routed blue and black network fiber cables connected to enterprise server hardware.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-advertising-policy-monitoring/": [
    // [0] hero
    studioImg(
      "resources/peptide-advertising-policy-monitoring",
      "peptide-advertising-policy-updates.webp",
      "Wide view of closed regulatory register volumes and a blue ledger on an oak archive table illuminated by morning window light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-advertising-policy-monitoring",
      "peptide-advertising-policy-updates-four-linen-file-folders-colored-tabs.webp",
      "Four linen file folders with colored tabs arranged neatly on a dark walnut credenza in natural daylight.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-advertising-policy-monitoring",
      "peptide-advertising-policy-updates-flowchart-diagram-illustrating-five.webp",
      "Flowchart diagram illustrating five sequential steps from source register through human review to action approval for policy updates.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/peptide-advertising-policy-monitoring",
      "peptide-advertising-policy-updates-close-up-hands-inserting-green-divider.webp",
      "Close-up of hands inserting a green divider into a physical policy audit binder on a wooden standing desk.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-marketing-geographic-eligibility/": [
    // [0] hero
    studioImg(
      "resources/peptide-marketing-geographic-eligibility",
      "peptide-advertising-geographic-restrictions.webp",
      "Wide empty shipping loading dock at dawn with marked floor staging lanes and industrial roller doors.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-marketing-geographic-eligibility",
      "peptide-advertising-geographic-restrictions-comparison-table-mapping-service.webp",
      "Comparison table mapping service authority, product rules, and platform targeting across three peptide entity types.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-marketing-geographic-eligibility",
      "peptide-advertising-geographic-restrictions-fulfillment-specialist-standing.webp",
      "Fulfillment specialist standing at a stainless steel packaging counter placing a packing slip into a cardboard box.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-reviews-testimonials-marketing/": [
    // [0] hero
    studioImg(
      "resources/peptide-reviews-testimonials-marketing",
      "peptide-marketing-testimonials.webp",
      "An amber dropper bottle and paper feedback card sit on an oak dispensary counter in morning sunlight.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-reviews-testimonials-marketing",
      "peptide-marketing-testimonials-comparison-diagram-showing-differences.webp",
      "A comparison diagram showing the differences in selection, claim responsibility, and substantiation duties between hosted reviews and marketing testimonials.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-reviews-testimonials-marketing",
      "peptide-marketing-testimonials-clinical-review-station-microscope.webp",
      "A clinical review station with a microscope and clipboard on a metal counter while a lab specialist reaches for a binder from behind.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/peptide-reviews-testimonials-marketing",
      "peptide-marketing-testimonials-close-up-hands-filing-paper-document.webp",
      "Close-up of hands filing a paper document into a manila folder in a clinic records area under warm evening light.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-website-security-ad-recovery/": [
    // [0] hero
    studioImg(
      "resources/peptide-website-security-ad-recovery",
      "peptide-website-compromised-ads.webp",
      "Empty server room corridor with black equipment racks and subtle blue indicator lights along a polished floor.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-website-security-ad-recovery",
      "peptide-website-compromised-ads-decision-flow-diagram-separating-website.webp",
      "Decision flow diagram separating website security remediation steps from advertising offer eligibility checks.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-website-security-ad-recovery",
      "peptide-website-compromised-ads-close-up-hands-holding-metal-clipboard.webp",
      "Close-up of hands holding a metal clipboard with a paper verification checklist in morning window light.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/peptide-website-security-ad-recovery",
      "peptide-website-compromised-ads-exterior-architectural-view-commercial.webp",
      "Exterior architectural view of a commercial compliance building entrance with glass doors and stone paving at dusk.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-fda-approval-registration-certification/": [
    // [0] hero
    studioImg(
      "resources/peptide-fda-approval-registration-certification",
      "peptide-fda-approved-marketing-claims.webp",
      "Stacked quality control folders and sealed glass analytical sample bottles on a stainless steel counter in an empty laboratory vestibule.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-fda-approval-registration-certification",
      "peptide-fda-approved-marketing-claims-comparison-diagram-displaying-four.webp",
      "Comparison diagram displaying four regulatory credential categories and their actual verification limits for marketing claims.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-fda-approval-registration-certification",
      "peptide-fda-approved-marketing-claims-close-up-photograph-gloved-hand.webp",
      "Close-up photograph of a gloved hand positioning a micropipette above clear glass sample vials in an analytical laboratory.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/peptide-fda-approval-registration-certification",
      "peptide-fda-approved-marketing-claims-person-viewed-behind-retrieving-archive.webp",
      "Person viewed from behind retrieving an archive binder from tall metal shelves in a sunlit records storage room.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-ad-suspension-diagnosis/": [
    // [0] hero
    studioImg(
      "resources/peptide-ad-suspension-diagnosis",
      "peptide-ad-suspension-diagnosis.webp",
      "Exterior glass double doors of a quiet outpatient medical facility at dawn under early morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-ad-suspension-diagnosis",
      "peptide-ad-suspension-diagnosis-close-up-stacked-archival-folders.webp",
      "Close-up of stacked archival folders and an external hard drive resting on a wooden counter in natural light.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-ad-suspension-diagnosis",
      "peptide-ad-suspension-diagnosis-vertical-diagram-routing-five-peptide.webp",
      "Vertical diagram routing five peptide advertising restriction categories to primary remediation owners.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/peptide-ad-suspension-diagnosis",
      "peptide-ad-suspension-diagnosis-paved-stone-walkway-splitting-two.webp",
      "Paved stone walkway splitting into two distinct paths in an outdoor courtyard under midday sun.",
      "3 / 2",
    ),
  ],
  "/resources/meta-health-event-restrictions-peptide-marketing/": [
    // [0] hero
    studioImg(
      "resources/meta-health-event-restrictions-peptide-marketing",
      "meta-health-event-restrictions-peptides.webp",
      "Row of server racks with neatly routed sky blue patch cables in an enterprise telecommunications facility.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/meta-health-event-restrictions-peptide-marketing",
      "meta-health-event-restrictions-peptides-process-diagram-showing-four-diagnostic.webp",
      "Process diagram showing four diagnostic branches to identify restricted advertising objects: Event, Audience, Ad, and Account.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/meta-health-event-restrictions-peptide-marketing",
      "meta-health-event-restrictions-peptides-close-up-organized-network-cables.webp",
      "Close-up of organized network cables passing through an aluminum management comb with one line separated.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/meta-health-event-restrictions-peptide-marketing",
      "meta-health-event-restrictions-peptides-charcoal-documentation-binder-index-tab.webp",
      "Charcoal documentation binder with an index tab and archival pen resting on a wooden conference table in natural light.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-advertising-circumventing-systems/": [
    // [0] hero
    studioImg(
      "resources/peptide-advertising-circumventing-systems",
      "peptide-google-ads-circumventing-systems.webp",
      "Exterior glass entrance and concrete walkway of a modern commercial clinical facility at dawn.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-advertising-circumventing-systems",
      "peptide-google-ads-circumventing-systems-close-up-open-manila-compliance-folder.webp",
      "Close-up of an open manila compliance folder secured with a brass binder clip on a dark walnut credenza.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-advertising-circumventing-systems",
      "peptide-google-ads-circumventing-systems-empty-server-room-aisle-organized-fiber.webp",
      "Empty server room aisle with organized fiber patch cabling and green indicator lights on rack equipment.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/peptide-advertising-circumventing-systems",
      "peptide-google-ads-circumventing-systems-comparison-diagram-contrasting.webp",
      "Comparison diagram contrasting documented remediation practices against prohibited circumvention risk tactics.",
      "3 / 2",
    ),
  ],
  "/resources/hhs-peptide-compounding-policy-marketing/": [
    // [0] hero
    studioImg(
      "resources/hhs-peptide-compounding-policy-marketing",
      "hhs-peptide-policy-marketing.webp",
      "Four-row comparison diagram contrasting HHS enforcement discretion, FDA approval, LegitScript review, and ad platform rules.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/hhs-peptide-compounding-policy-marketing",
      "hhs-peptide-policy-marketing-close-up-printed-marketing-review.webp",
      "Close-up of printed marketing review checklists and a red pen on a standing wooden desk during a compliance sweep.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/hhs-peptide-compounding-policy-marketing",
      "hhs-peptide-policy-marketing-intake-verification-counter-pharmacy.webp",
      "Intake verification counter in a pharmacy facility staging bay with a document clipboard and scale in late afternoon light.",
      "3 / 2",
    ),
  ],
  "/services/peptide-clinic-local-seo/": [
    // [0] hero
    studioImg(
      "services/peptide-clinic-local-seo",
      "peptide-clinic-local-seo.webp",
      "Exterior entrance of a licensed medical clinic with glass double doors and bronze suite plaque in morning sunlight.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-clinic-local-seo",
      "peptide-clinic-local-seo-horizontal-process-diagram-showing-six.webp",
      "Horizontal process diagram showing six stages for verifying clinic identity, directories, content, reviews, inquiries, and ongoing governance.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-clinic-local-seo",
      "peptide-clinic-local-seo-exterior-wayfinding-monument-sign-edge.webp",
      "Exterior wayfinding monument sign at the edge of a clinic parking lot at dusk, showing suite numbers under warm low-voltage uplights.",
      "3 / 2",
    ),
  ],
  "/services/peptide-competitive-intelligence/": [
    // [0] hero
    studioImg(
      "services/peptide-competitive-intelligence",
      "peptide-competitive-intelligence.webp",
      "Exterior view of an empty commercial life sciences building facade and entrance plaza at dawn.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-competitive-intelligence",
      "peptide-competitive-intelligence-closed-glass-doors-leading-unpopulated.webp",
      "Closed glass doors leading into an unpopulated secondary medical clinic suite along a brightly lit corridor.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-competitive-intelligence",
      "peptide-competitive-intelligence-close-up-landline-telephone-call.webp",
      "Close-up of a landline telephone and call disposition folder on a wooden shelf in an admissions office.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/peptide-competitive-intelligence",
      "peptide-competitive-intelligence-two-column-comparison-diagram.webp",
      "Two-column comparison diagram contrasting observable public market signals against unverified commercial inferences.",
      "3 / 2",
    ),
  ],
  "/services/peptide-content-marketing/": [
    // [0] hero
    studioImg(
      "services/peptide-content-marketing",
      "peptide-content-marketing.webp",
      "Wide exterior view of an institutional life-sciences facility entrance with glass walls and concrete pillars at dawn.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-content-marketing",
      "peptide-content-marketing-process-diagram-outlining-three-distinct.webp",
      "Process diagram outlining three distinct peptide content audience lanes for commercial leaders, procurement teams, and clinic patients.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-content-marketing",
      "peptide-content-marketing-closed-charcoal-document-binder-green.webp",
      "Closed charcoal document binder with a green tab divider and metal pen resting on a wooden surface in warm afternoon light.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/peptide-content-marketing",
      "peptide-content-marketing-wall-mounted-telephone-handset-outside.webp",
      "Wall-mounted telephone handset outside an intake room in quiet evening hallway light.",
      "3 / 2",
    ),
  ],
  "/resources/local-service-ads/": [
    // [0] hero
    studioImg(
      "resources/local-service-ads",
      "local-service-ads.webp",
      "Clinic operations director reviewing patient intake analytics and campaign data on an office laptop.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/local-service-ads",
      "local-service-ads-diagram-showing-google-search-page-tiers.webp",
      "Diagram showing Google search page tiers for Local Services Ads, paid search text ads, and local organic map listings.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/local-service-ads",
      "local-service-ads-intake-finance-manager-discussing.webp",
      "Intake finance manager discussing acquisition cost models and lead bidding data on a tablet in an office.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/local-service-ads",
      "local-service-ads-healthcare-marketing-team-collaborating.webp",
      "Healthcare marketing team collaborating on integrated paid search and Local Services Ads campaign architecture.",
      "79 / 53",
    ),
  ],
  "/services/peptide-reputation-management/": [
    // [0] hero
    studioImg(
      "services/peptide-reputation-management",
      "peptide-reputation-management.webp",
      "Exterior glass double doors of an empty medical clinic in soft morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-reputation-management",
      "peptide-reputation-management-three-textured-linen-folders-arranged.webp",
      "Three textured linen folders arranged on a dark stone surface.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-reputation-management",
      "peptide-reputation-management-five-step-decision-diagram-illustrating.webp",
      "Five-step decision diagram illustrating feedback categorization, routing to owners, and logging resolution.",
      "3 / 2",
    ),
  ],
  "/who-we-help/peptide-manufacturers/": [
    // [0] hero
    studioImg(
      "who-we-help/peptide-manufacturers",
      "peptide-manufacturer-marketing.webp",
      "Automated solid-phase peptide synthesizer reaction column and stainless manifold in a sterile pharmaceutical cleanroom.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "who-we-help/peptide-manufacturers",
      "peptide-manufacturer-marketing-analytical-glass-vials-stainless-steel.webp",
      "Analytical glass vials in a stainless steel rack for peptide chromatography purity testing.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/peptide-manufacturers",
      "peptide-manufacturer-marketing-insulated-cold-chain-shipping-container.webp",
      "Insulated cold-chain shipping container on an industrial conveyor at a manufacturing facility dock.",
      "3 / 2",
    ),
  ],
  "/who-we-help/peptide-skincare-brands/": [
    // [0] hero
    studioImg(
      "who-we-help/peptide-skincare-brands",
      "peptide-skincare-marketing.webp",
      "Amber glass dropper bottle for peptide skincare serum resting on a pale concrete surface in morning sunlight.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "who-we-help/peptide-skincare-brands",
      "peptide-skincare-marketing-two-column-comparison-diagram-showing.webp",
      "Two-column comparison diagram showing cosmetic appearance claims alongside unapproved drug claims for peptide skincare products.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/peptide-skincare-brands",
      "peptide-skincare-marketing-standardized-camera-tripod-rig-color.webp",
      "Standardized camera tripod rig and color calibration card set up in a photo studio for controlled cosmetic imaging.",
      "3 / 2",
    ),
  ],
  "/services/b2b-peptide-lead-generation/": [
    // [0] hero
    studioImg(
      "services/b2b-peptide-lead-generation",
      "b2b-peptide-lead-generation.webp",
      "Automated liquid chromatography instrument and reagent vial rack on a stainless steel bench inside a laboratory.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/b2b-peptide-lead-generation",
      "b2b-peptide-lead-generation-insulated-cold-chain-container-sealed.webp",
      "Insulated cold-chain container with sealed glass sample vials and an inspection packet on a metal receiving table.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/b2b-peptide-lead-generation",
      "b2b-peptide-lead-generation-two-column-comparison-diagram.webp",
      "Two-column comparison diagram contrasting consumer inquiry signals against verified institutional qualification criteria.",
      "3 / 2",
    ),
  ],
  "/services/peptide-conversion-optimization/": [
    // [0] hero
    studioImg(
      "services/peptide-conversion-optimization",
      "peptide-conversion-optimization.webp",
      "Exterior entrance of a modern glass and steel medical facility at dawn.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-conversion-optimization",
      "peptide-conversion-optimization-diagram-comparing-valid-conversion.webp",
      "Diagram comparing valid conversion definitions for peptide clinic consultations, B2B lab quotes, and ecommerce purchases.",
      "3 / 2",
    ),
  ],
  "/services/peptide-seo/": [
    // [0] hero
    studioImg(
      "services/peptide-seo",
      "peptide-seo-services.webp",
      "Clean stainless steel laboratory intake area with distinct wire sorting bins under morning window light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-seo",
      "peptide-seo-services-three-column-comparison-diagram.webp",
      "Three-column comparison diagram contrasting search criteria for clinical care, laboratory procurement, and consumer product audiences.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-seo",
      "peptide-seo-services-macro-close-up-hands-placing-green-index.webp",
      "Macro close-up of hands placing a green index tab onto a printed compliance review document on a wooden table.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/peptide-seo",
      "peptide-seo-services-empty-administrative-intake-station.webp",
      "Empty administrative intake station with an analog desk telephone and notebook illuminated by late-afternoon window light.",
      "3 / 2",
    ),
  ],
  "/services/peptide-merchant-center-remediation/": [
    // [0] hero
    studioImg(
      "services/peptide-merchant-center-remediation",
      "peptide-merchant-center-suspension-help.webp",
      "Clean glass cosmetic dropper bottles and boxed supplements arranged on warehouse staging shelves in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-merchant-center-remediation",
      "peptide-merchant-center-suspension-help-two-column-comparison-diagram.webp",
      "A two-column comparison diagram illustrating account-level versus item-level policy issue classification paths.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-merchant-center-remediation",
      "peptide-merchant-center-suspension-help-hands-fabric-gloves-placing-unbranded.webp",
      "Hands in fabric gloves placing an unbranded cosmetic bottle into a sorting crate on a clean aluminum workbench.",
      "3 / 2",
    ),
  ],
  "/who-we-help/peptide-pharmacies/": [
    // [0] hero
    studioImg(
      "who-we-help/peptide-pharmacies",
      "peptide-pharmacy-marketing.webp",
      "Clean pass-through anteroom and stainless steel prep ledge inside a specialized compounding pharmacy facility at dawn.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "who-we-help/peptide-pharmacies",
      "peptide-pharmacy-marketing-three-tier-classification-diagram.webp",
      "Three-tier classification diagram sorting pharmacy offerings into FDA-approved, conditionally compounded, and unsupported categories.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/peptide-pharmacies",
      "peptide-pharmacy-marketing-covered-glass-pedestrian-walkway.webp",
      "Covered glass pedestrian walkway connecting two independent healthcare facility buildings at twilight.",
      "3 / 2",
    ),
  ],
  "/services/peptide-marketing-measurement/": [
    // [0] hero
    studioImg(
      "services/peptide-marketing-measurement",
      "peptide-marketing-attribution.webp",
      "Exterior facade of a modern clinical research building at sunrise with open sky on the left.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-marketing-measurement",
      "peptide-marketing-attribution-process-diagram-mapping-clinic-b2b-quote.webp",
      "Process diagram mapping clinic, B2B quote, and ecommerce peptide conversion streams against platform boundary rules.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-marketing-measurement",
      "peptide-marketing-attribution-clean-premises-server-corridor-organized.webp",
      "Clean on-premises server corridor with organized rack cabinets and muted status lights.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/peptide-marketing-measurement",
      "peptide-marketing-attribution-close-up-hands-organizing-color-coded.webp",
      "Close-up of hands organizing color-coded intake routing tabs in an archival binder.",
      "3 / 2",
    ),
  ],
  "/services/peptide-website-design/": [
    // [0] hero
    studioImg(
      "services/peptide-website-design",
      "peptide-website-design.webp",
      "Exterior architectural entrance of a modern medical research facility at dawn with dual glass wings and concrete pavers.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-website-design",
      "peptide-website-design-three-column-comparison-diagram.webp",
      "Three-column comparison diagram contrasting clinical consultation, laboratory procurement, and consumer product conversion paths.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-website-design",
      "peptide-website-design-open-linen-audit-ledger-physical-sign.webp",
      "Open linen audit ledger and physical sign-off stamp resting on a wooden standing review counter.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/peptide-website-design",
      "peptide-website-design-close-up-organized-blue-network-patch.webp",
      "Close-up of organized blue network patch cables terminating into an enterprise distribution panel in a server room.",
      "3 / 2",
    ),
  ],
  "/services/private-ai-peptide-marketing/": [
    // [0] hero
    studioImg(
      "services/private-ai-peptide-marketing",
      "private-ai-peptide-marketing.webp",
      "Wide view of an on-premise server rack in a clean commercial facility corridor with cool directional lighting.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/private-ai-peptide-marketing",
      "private-ai-peptide-marketing-medium-shot-empty-clinical-intake.webp",
      "Medium shot of an empty clinical intake counter with a multi-line desk phone and closed reconciliation folders in morning light.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/private-ai-peptide-marketing",
      "private-ai-peptide-marketing-flow-diagram-showing-product-claims.webp",
      "Flow diagram showing product claims, spend changes, and published material passing through an accountable reviewer to create an approved record.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/private-ai-peptide-marketing",
      "private-ai-peptide-marketing-close-up-linen-bound-operating-manual.webp",
      "Close-up of a linen-bound operating manual and external data drive on a walnut table illuminated by late afternoon sun.",
      "3 / 2",
    ),
  ],
  "/who-we-help/peptide-clinics/": [
    // [0] hero
    studioImg(
      "who-we-help/peptide-clinics",
      "peptide-clinic-marketing.webp",
      "Exterior entrance of a licensed outpatient medical clinic at dawn with glass double doors and an open paved walkway.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "who-we-help/peptide-clinics",
      "peptide-clinic-marketing-five-stage-horizontal-flow-diagram.webp",
      "A five-stage horizontal flow diagram outlining clinic licensing verification, service definition, capacity mapping, inquiry targets, and visibility.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/peptide-clinics",
      "peptide-clinic-marketing-medium-shot-premises-server-rack-clean.webp",
      "Medium shot of an on-premises server rack with clean network cabling and illuminated status lights in a data room.",
      "3 / 2",
    ),
  ],
  "/services/peptide-paid-media/": [
    // [0] hero
    studioImg(
      "services/peptide-paid-media",
      "peptide-advertising-agency.webp",
      "Exterior view of a modern medical clinic building at dawn with glass entryway and concrete walkway.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-paid-media",
      "peptide-advertising-agency-flow-diagram-showing-six-sequential.webp",
      "Flow diagram showing six sequential stages of peptide campaign eligibility and pre-launch review.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-paid-media",
      "peptide-advertising-agency-close-up-server-hardware-network-cabling.webp",
      "Close-up of server hardware and network cabling with green indicator lights in an on-site equipment rack.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/peptide-paid-media",
      "peptide-advertising-agency-compliance-specialist-seen-behind.webp",
      "Compliance specialist seen from behind placing a folder into a wall sleeve in a bright clinic corridor.",
      "3 / 2",
    ),
  ],
  "/services/peptide-marketing-claims-review/": [
    // [0] hero
    studioImg(
      "services/peptide-marketing-claims-review",
      "peptide-marketing-claims-review.webp",
      "A bound claims audit dossier rests open on an oak table in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-marketing-claims-review",
      "peptide-marketing-claims-review-campaign-storyboard-sheets-packaging.webp",
      "Campaign storyboard sheets and packaging proofs grouped inside boundary lines on a workbench.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-marketing-claims-review",
      "peptide-marketing-claims-review-vertical-four-tier-diagram-ranking.webp",
      "A vertical four-tier diagram ranking claims corrections from treatment claims down to imprecise wording.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/peptide-marketing-claims-review",
      "peptide-marketing-claims-review-metal-archive-shelving-holding-organized.webp",
      "Metal archive shelving holding organized file boxes in an administrative records room.",
      "3 / 2",
    ),
  ],
  "/services/peptide-ad-policy-monitoring/": [
    // [0] hero
    studioImg(
      "services/peptide-ad-policy-monitoring",
      "peptide-ad-policy-monitoring.webp",
      "Exterior glass entrance of a modern healthcare facility at dawn with morning light reflecting off the facade.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-ad-policy-monitoring",
      "peptide-ad-policy-monitoring-hardbound-audit-ledger-categorized.webp",
      "Hardbound audit ledger and categorized reference folders resting on a wooden counter in an administrative records room.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-ad-policy-monitoring",
      "peptide-ad-policy-monitoring-decision-flow-diagram-detailing-five.webp",
      "Decision flow diagram detailing five stages of ad campaign escalation thresholds from change detection to logged outcome.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/peptide-ad-policy-monitoring",
      "peptide-ad-policy-monitoring-close-up-hands-closing-heavy-canvas.webp",
      "Close-up of hands closing a heavy canvas audit binder in a quiet corridor under late afternoon light.",
      "3 / 2",
    ),
  ],
  "/services/peptide-marketing-eligibility-audit/": [
    // [0] hero
    studioImg(
      "services/peptide-marketing-eligibility-audit",
      "peptide-marketing-compliance-audit.webp",
      "Amber laboratory serum vials in a stainless steel inspection tray on a clean receiving counter in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-marketing-eligibility-audit",
      "peptide-marketing-compliance-audit-hand-nitrile-glove-places-archival.webp",
      "A hand in a nitrile glove places an archival divider tab into an open metal file drawer.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-marketing-eligibility-audit",
      "peptide-marketing-compliance-audit-illustrative-diagram-showing-peptide.webp",
      "Illustrative diagram showing peptide offer and channel review feeding into proceed, remediate, exclude or specialist-review outcomes.",
      "3 / 2",
    ),
  ],
  "/services/peptide-ad-account-recovery/": [
    // [0] hero
    studioImg(
      "services/peptide-ad-account-recovery",
      "peptide-ad-account-recovery.webp",
      "An empty administrative compliance staging room with a navy folder and pen resting on a slate inspection counter in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-ad-account-recovery",
      "peptide-ad-account-recovery-process-diagram-displaying-four.webp",
      "A process diagram displaying four advertising restriction categories: Account Suspension, Ad Disapproval, Identity Hold, and Billing Hold.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-ad-account-recovery",
      "peptide-ad-account-recovery-close-up-hands-holding-metal-mechanical.webp",
      "Close-up of hands holding a metal mechanical date stamper above a paper submission packet on a steel counter.",
      "3 / 2",
    ),
  ],
  "/services/peptide-website-policy-remediation/": [
    // [0] hero
    studioImg(
      "services/peptide-website-policy-remediation",
      "peptide-website-policy-remediation.webp",
      "Tabbed blue archive folders and catalog documentation sheets arranged flat across an oak table in morning window light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-website-policy-remediation",
      "peptide-website-policy-remediation-process-diagram-showing-documented.webp",
      "Process diagram showing documented findings mapped across destination assets to produce an evidence register and dated capture.",
      "3 / 2",
    ),
  ],
  "/services/competitive-intelligence/": [
    // [0] hero
    studioImg(
      "services/competitive-intelligence",
      "competitive-intelligence-services.webp",
      "An empty library reference table with stacked research folders, a blue notebook, and morning window light across open space.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/competitive-intelligence",
      "competitive-intelligence-services-exterior-glass-entrance-paved-walkway.webp",
      "Exterior glass entrance and paved walkway of a modern outpatient healthcare center in morning sunlight.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-market-research-methodology/": [
    // [0] hero
    studioImg(
      "resources/peptide-market-research-methodology",
      "peptide-market-research.webp",
      "Exterior view of an empty specialized medical compounding facility entrance at dawn.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-market-research-methodology",
      "peptide-market-research-four-row-decision-matrix-comparing.webp",
      "A four-row decision matrix comparing peptide buyer segments against primary constraints and validation thresholds.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-market-research-methodology",
      "peptide-market-research-intake-counter-phone-console-illuminated.webp",
      "An intake counter phone console with an illuminated line indicator next to file folders.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/peptide-market-research-methodology",
      "peptide-market-research-hands-holding-open-black-document.webp",
      "Hands holding an open black document verification binder with paper forms in front of a filing cabinet.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-advertiser-identity-verification/": [
    // [0] hero
    studioImg(
      "resources/peptide-advertiser-identity-verification",
      "peptide-advertiser-verification.webp",
      "Physical corporate registration binders and an official seal rest on a wooden table in an empty office.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-advertiser-identity-verification",
      "peptide-advertiser-verification-comparison-diagram-showing-entity-name.webp",
      "Comparison diagram showing entity name, payment profile, and domain owner alignment for advertiser verification.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-advertiser-identity-verification",
      "peptide-advertiser-verification-hands-positioning-blank-physical.webp",
      "Hands positioning a blank physical identification card on a matte surface under even lighting for capture.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-marketing-agency-rfp/": [
    // [0] hero
    studioImg(
      "resources/peptide-marketing-agency-rfp",
      "peptide-marketing-agency-rfp.webp",
      "Three thick procurement evaluation binders with colored tabs resting on a slate counter in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-marketing-agency-rfp",
      "peptide-marketing-agency-rfp-four-column-scorecard-diagram-outlining.webp",
      "Four-column scorecard diagram outlining agency evaluation categories: delivery evidence, policy judgment, asset ownership, and recovery safety.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-marketing-agency-rfp",
      "peptide-marketing-agency-rfp-secure-metal-network-server-cabinet-data.webp",
      "Secure metal network server cabinet in a data facility with mechanical key latch and small status indicator lights.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/peptide-marketing-agency-rfp",
      "peptide-marketing-agency-rfp-three-aluminum-clipboards-resting.webp",
      "Three aluminum clipboards resting on a stainless steel inspection surface in soft daylight.",
      "3 / 2",
    ),
  ],
  "/resources/google-ads-peptide-drug-terms/": [
    // [0] hero
    studioImg(
      "resources/google-ads-peptide-drug-terms",
      "google-ads-peptide-policy.webp",
      "Exterior glass double doors of an outpatient clinic building at sunrise with clean pavers and landscaped planters.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/google-ads-peptide-drug-terms",
      "google-ads-peptide-policy-four-tier-vertical-stack-diagram.webp",
      "A four-tier vertical stack diagram displaying review layers for keyword targeting, ad copy, linked destination, and business certification.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/google-ads-peptide-drug-terms",
      "google-ads-peptide-policy-brightly-lit-interior-healthcare.webp",
      "A brightly lit interior healthcare facility hallway with clean wayfinding lines along the floor leading toward an open suite.",
      "3 / 2",
    ),
  ],
  "/resources/peptide-advertising-eligibility/": [
    // [0] hero
    studioImg(
      "resources/peptide-advertising-eligibility",
      "can-peptide-companies-advertise.webp",
      "Unlabelled glass laboratory vial resting in an aluminum rack on a stainless steel counter in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/peptide-advertising-eligibility",
      "can-peptide-companies-advertise-diagram-showing-four-peptide-business.webp",
      "Diagram showing four peptide business categories: Clinical Care, Pharmacy Dispensing, Laboratory Supply, and Consumer Products.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/peptide-advertising-eligibility",
      "can-peptide-companies-advertise-empty-climate-controlled-commercial.webp",
      "Empty climate-controlled commercial laboratory distribution bay with metal shelving and stacked storage crates.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/peptide-advertising-eligibility",
      "can-peptide-companies-advertise-open-hardbound-compliance-ledger.webp",
      "Open hardbound compliance ledger with an archival pen resting on lined paper in natural midday light.",
      "3 / 2",
    ),
  ],
  "/who-we-help/research-peptide-suppliers/": [
    // [0] hero
    studioImg(
      "who-we-help/research-peptide-suppliers",
      "research-peptide-marketing.webp",
      "Exterior receiving entrance of a research facility with insulated reagent transport containers on a utility cart in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "who-we-help/research-peptide-suppliers",
      "research-peptide-marketing-comparison-framework-distinguishing.webp",
      "Comparison framework distinguishing genuine institutional lab peptide suppliers from consumer-facing sellers using research-only language.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/research-peptide-suppliers",
      "research-peptide-marketing-laboratory-fulfillment-specialist.webp",
      "Laboratory fulfillment specialist packing an insulated cold-chain shipment at a stainless steel station in a distribution facility.",
      "3 / 2",
    ),
  ],
  "/services/data-strategy-consulting/": [
    // [0] hero
    studioImg(
      "services/data-strategy-consulting",
      "data-strategy-consulting.webp",
      "Empty sunlit hospital administrative hallway with polished floors leading toward double frosted glass doors.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/data-strategy-consulting",
      "data-strategy-consulting-close-up-hands-placing-sky-blue-project.webp",
      "Close-up of hands placing a sky-blue project portfolio on a wooden table before a morning meeting.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/data-strategy-consulting",
      "data-strategy-consulting-three-stage-diagram-linking-priority.webp",
      "Three-stage diagram linking a priority business decision to an assigned data owner and an early architecture choice.",
      "3 / 2",
    ),
  ],
  "/services/ai-workflow-automation/": [
    // [0] hero
    studioImg(
      "services/ai-workflow-automation",
      "ai-workflow-automation-services.webp",
      "A climate-controlled server room with neatly dressed sky blue patch cables in an equipment rack, leaving open space on the right.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/ai-workflow-automation",
      "ai-workflow-automation-services-manila-quote-folder-stamped-paper.webp",
      "A manila quote folder and stamped paper pricing matrix resting on a birch counter in an administrative records room.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/ai-workflow-automation",
      "ai-workflow-automation-services-process-diagram-showing-six-steps.webp",
      "A process diagram showing six steps from incoming request through model draft, approval gate, and manual fallback path.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/ai-workflow-automation",
      "ai-workflow-automation-services-open-operational-runbook-binder-tab.webp",
      "An open operational runbook binder with tab dividers resting on a wooden table in an empty room at dusk.",
      "3 / 2",
    ),
  ],
  "/resources/research-use-only-peptide-marketing/": [
    // [0] hero
    studioImg(
      "resources/research-use-only-peptide-marketing",
      "research-use-only-peptide-marketing.webp",
      "Wide view of an empty institutional research facility corridor with stainless steel benches and cryogenic storage vessels in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/research-use-only-peptide-marketing",
      "research-use-only-peptide-marketing-close-up-laboratory-sample-vials.webp",
      "Close-up of laboratory sample vials and measuring tools on a stainless steel inspection bench under soft daylight.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/research-use-only-peptide-marketing",
      "research-use-only-peptide-marketing-comparison-table-contrasting.webp",
      "Comparison table contrasting institutional laboratory supply practices with commercial human-use marketing signals.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/research-use-only-peptide-marketing",
      "research-use-only-peptide-marketing-warehouse-logistics-technician-standing.webp",
      "A warehouse logistics technician standing at a dispatch station sealing an institutional shipping container.",
      "3 / 2",
    ),
  ],
  "/resources/market-intelligence-cost/": [
    // [0] hero
    studioImg(
      "resources/market-intelligence-cost",
      "market-intelligence-cost.webp",
      "Exterior view of an empty newly constructed outpatient healthcare building in morning sunlight.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/market-intelligence-cost",
      "market-intelligence-cost-two-two-matrix-categorizing-research.webp",
      "A two-by-two matrix categorizing research decisions by reversibility and required confidence.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/market-intelligence-cost",
      "market-intelligence-cost-archival-storage-box-metal-dispatch-tray.webp",
      "An archival storage box and a metal dispatch tray resting on an oak credenza in an office corridor.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/market-intelligence-cost",
      "market-intelligence-cost-close-up-hands-holding-aluminum.webp",
      "Close-up of hands holding an aluminum clipboard with a paper scoping document in an equipment room.",
      "3 / 2",
    ),
  ],
  "/resources/ai-proof-of-concept-success-criteria/": [
    // [0] hero
    studioImg(
      "resources/ai-proof-of-concept-success-criteria",
      "ai-proof-of-concept-success-criteria.webp",
      "Empty data facility server aisle with clean cable conduits and soft dawn light receding down a quiet corridor.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/ai-proof-of-concept-success-criteria",
      "ai-proof-of-concept-success-criteria-open-doorway-looking-quiet-executive.webp",
      "An open doorway looking into a quiet executive office with morning light falling across a walnut credenza and binder.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/ai-proof-of-concept-success-criteria",
      "ai-proof-of-concept-success-criteria-process-diagram-showing-five-pilot.webp",
      "Process diagram showing five pilot stages from baseline measurement and test scope to preset thresholds and decision gate.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/ai-proof-of-concept-success-criteria",
      "ai-proof-of-concept-success-criteria-hands-closing-two-page-document-folio.webp",
      "Hands closing a two-page document folio on a stone counter in bright daylight.",
      "3 / 2",
    ),
  ],
  "/resources/market-sizing-tam-sam-som/": [
    // [0] hero
    studioImg(
      "resources/market-sizing-tam-sam-som",
      "tam-sam-som-market-sizing.webp",
      "Wide exterior view of a multi-location clinic building with a glass facade and plaza at sunrise.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/market-sizing-tam-sam-som",
      "tam-sam-som-market-sizing-three-empty-armchairs-arranged-around.webp",
      "Three empty armchairs arranged around a low table in an outpatient treatment room.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/market-sizing-tam-sam-som",
      "tam-sam-som-market-sizing-three-tier-funnel-diagram-illustrating.webp",
      "A three-tier funnel diagram illustrating total, serviceable, and obtainable market sizing layers.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/market-sizing-tam-sam-som",
      "tam-sam-som-market-sizing-metal-date-stamper-resting-top-closed.webp",
      "A metal date stamper resting on top of closed manila document folders on a wooden desk.",
      "3 / 2",
    ),
  ],
  "/resources/competitive-intelligence-research-methods/": [
    // [0] hero
    studioImg(
      "resources/competitive-intelligence-research-methods",
      "competitive-intelligence-research-methods.webp",
      "Rows of tall metal archival shelves holding uniform gray storage boxes and paper ledgers in a quiet records repository.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/competitive-intelligence-research-methods",
      "competitive-intelligence-research-methods-standing-person-writes-intelligence.webp",
      "A standing person writes an intelligence objective on a paper document on an oak standing desk with a graphite pencil.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/competitive-intelligence-research-methods",
      "competitive-intelligence-research-methods-overhead-view-three-independent-research.webp",
      "An overhead view of three independent research documents arranged in a triangle on a dark concrete inspection table.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/competitive-intelligence-research-methods",
      "competitive-intelligence-research-methods-three-tier-confidence-diagram-outlining.webp",
      "A three-tier confidence diagram outlining Confirmed, Likely, and Speculative standards for evaluating research findings.",
      "3 / 2",
    ),
  ],
  "/resources/ai-data-readiness-checklist/": [
    // [0] hero
    studioImg(
      "resources/ai-data-readiness-checklist",
      "ai-data-readiness-checklist.webp",
      "A quiet hospital records room with steel shelving holding categorized document boxes and reference binders.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/ai-data-readiness-checklist",
      "ai-data-readiness-checklist-intake-coordinator-seen-behind-sorting.webp",
      "An intake coordinator seen from behind sorting printed workflow reference cards on an outpatient clinic counter.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/ai-data-readiness-checklist",
      "ai-data-readiness-checklist-decision-flow-diagram-routing-source.webp",
      "A decision flow diagram routing source evaluation checks into stop, remediate, and pass with conditions outcomes.",
      "3 / 2",
    ),
  ],
  "/resources/ai-knowledge-base-permissions/": [
    // [0] hero
    studioImg(
      "resources/ai-knowledge-base-permissions",
      "ai-knowledge-base-permissions.webp",
      "An empty server room corridor with black compute racks and cool blue cable conduit illumination along polished concrete flooring.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/ai-knowledge-base-permissions",
      "ai-knowledge-base-permissions-six-step-flow-diagram-tracking-document.webp",
      "A six-step flow diagram tracking document access permissions from initial source rights to the final generated answer.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/ai-knowledge-base-permissions",
      "ai-knowledge-base-permissions-close-up-stacked-archival-folders-blue.webp",
      "Close-up of stacked archival folders with blue index tabs on a gray metal surface in an audit storage room.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/ai-knowledge-base-permissions",
      "ai-knowledge-base-permissions-professional-viewed-behind-walking-down.webp",
      "A professional viewed from behind walking down a sunlit modern hallway toward a frosted glass doorway.",
      "3 / 2",
    ),
  ],
  "/resources/market-intelligence-vs-market-research/": [
    // [0] hero
    studioImg(
      "resources/market-intelligence-vs-market-research",
      "market-intelligence-vs-market-research.webp",
      "Paved stone walkway splitting toward two entrances outside a modern outpatient medical pavilion at dawn.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/market-intelligence-vs-market-research",
      "market-intelligence-vs-market-research-exterior-view-empty-commercial-medical.webp",
      "Exterior view of an empty commercial medical office suite with bare concrete floors seen through clean glass windows.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/market-intelligence-vs-market-research",
      "market-intelligence-vs-market-research-comparison-matrix-classifying-bounded.webp",
      "Comparison matrix classifying bounded studies, recurring programs, and internal analytics across evidence sources.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/market-intelligence-vs-market-research",
      "market-intelligence-vs-market-research-metal-mechanical-date-stamp-resting-dark.webp",
      "Metal mechanical date stamp resting on a dark walnut table beside an archival folder in natural side light.",
      "3 / 2",
    ),
  ],
  "/resources/private-ai-vendor-evaluation-checklist/": [
    // [0] hero
    studioImg(
      "resources/private-ai-vendor-evaluation-checklist",
      "private-ai-vendor-evaluation.webp",
      "Enterprise server room corridor with an open rack cabinet showing blue and green network patch cables.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/private-ai-vendor-evaluation-checklist",
      "private-ai-vendor-evaluation-four-row-comparison-diagram-mapping.webp",
      "Four-row comparison diagram mapping private AI claims to required evidence documents including network diagrams and asset schedules.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/private-ai-vendor-evaluation-checklist",
      "private-ai-vendor-evaluation-black-exit-schedule-binder-blue-index.webp",
      "Black exit schedule binder with blue index tabs lying next to a compact external storage drive on an oak credenza.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/private-ai-vendor-evaluation-checklist",
      "private-ai-vendor-evaluation-standing-procurement-evaluator-holding.webp",
      "Standing procurement evaluator holding a tabbed technical folder in a sunlit architectural corridor.",
      "3 / 2",
    ),
  ],
  "/resources/private-ai-vs-public-ai/": [
    // [0] hero
    studioImg(
      "resources/private-ai-vs-public-ai",
      "private-ai-vs-public-ai.webp",
      "An on-premise server rack with neatly routed blue cables and indicator lights in a quiet administrative facility.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/private-ai-vs-public-ai",
      "private-ai-vs-public-ai-diagram-showing-five-deployment.webp",
      "Diagram showing five deployment boundaries: network access, hosting location, tenancy model, data use terms, and stack ownership.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/private-ai-vs-public-ai",
      "private-ai-vs-public-ai-close-up-technician-s-hands-inserting.webp",
      "Close-up of a technician's hands inserting a hot-swap drive caddy into a server chassis inside an equipment alcove.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/private-ai-vs-public-ai",
      "private-ai-vs-public-ai-archival-evidence-binder-blue-indexing.webp",
      "An archival evidence binder with blue indexing tabs resting on an oak counter in a bright, quiet records room.",
      "3 / 2",
    ),
  ],
  "/resources/rag-vs-fine-tuning/": [
    // [0] hero
    studioImg(
      "resources/rag-vs-fine-tuning",
      "rag-vs-fine-tuning.webp",
      "A server rack enclosure with neatly bundled network cables and soft blue and green status indicator lights.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/rag-vs-fine-tuning",
      "rag-vs-fine-tuning-four-part-decision-diagram-connecting-ai.webp",
      "A four-part decision diagram connecting AI failure types to recommended interventions including RAG and fine-tuning.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/rag-vs-fine-tuning",
      "rag-vs-fine-tuning-archival-document-binders-tabbed-folders.webp",
      "Archival document binders and tabbed folders resting on an office counter in natural morning light.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/rag-vs-fine-tuning",
      "rag-vs-fine-tuning-close-up-hands-placing-blue-evaluation.webp",
      "Close-up of hands placing a blue evaluation marker onto a testing grid on a white display board.",
      "3 / 2",
    ),
  ],
  "/research/peptide-advertising-restrictions-evidence-review/": [
    // [0] hero
    studioImg(
      "research/peptide-advertising-restrictions-evidence-review",
      "peptide-ad-suspension-research.webp",
      "Empty pharmaceutical research laboratory with stainless steel counter and glass vials in a blue metal rack in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "research/peptide-advertising-restrictions-evidence-review",
      "peptide-ad-suspension-research-four-stage-diagram-classifying-ad.webp",
      "Four-stage diagram classifying ad rejection, delivery restriction, account suspension, and permanent exclusion enforcement levels.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "research/peptide-advertising-restrictions-evidence-review",
      "peptide-ad-suspension-research-close-up-hands-placing-manila-compliance.webp",
      "Close-up of hands placing a manila compliance audit folder into a metal storage archive shelf.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "research/peptide-advertising-restrictions-evidence-review",
      "peptide-ad-suspension-research-granite-steps-iron-balustrade-federal.webp",
      "Granite steps and iron balustrade of a federal building portico at twilight under an evening sky.",
      "3 / 2",
    ),
  ],
  "/services/product-validation-research/": [
    // [0] hero
    studioImg(
      "services/product-validation-research",
      "product-validation-research.webp",
      "Wide view of an empty clinic reception lobby with polished floors and glass entrance doors in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/product-validation-research",
      "product-validation-research-four-card-framework-diagram-showing.webp",
      "Four-card framework diagram showing target buyer, current problem, current alternative, and proposed change.",
      "3 / 2",
    ),
  ],
  "/services/market-intelligence-dashboards/": [
    // [0] hero
    studioImg(
      "services/market-intelligence-dashboards",
      "market-intelligence-dashboard-services.webp",
      "Exterior view of a multi-story glass healthcare headquarters building at sunrise with manicured green shrubs and an empty concrete terrace.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/market-intelligence-dashboards",
      "market-intelligence-dashboard-services-three-labeled-archival-folders-linen.webp",
      "Three labeled archival folders with linen covers and spine ribbons lie in a row on a wooden credenza in diffused morning light.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/market-intelligence-dashboards",
      "market-intelligence-dashboard-services-horizontal-flow-diagram-linking-five.webp",
      "Horizontal flow diagram linking five stages from external signal to stored observation, comparison view, owner threshold, and decision record.",
      "3 / 2",
    ),
  ],
  "/services/private-conversation-intelligence/": [
    // [0] hero
    studioImg(
      "services/private-conversation-intelligence",
      "private-conversation-intelligence.webp",
      "An empty administrative telephone station with a landline handset and acoustic fabric privacy panel in soft morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/private-conversation-intelligence",
      "private-conversation-intelligence-horizontal-process-diagram-outlining-six.webp",
      "A horizontal process diagram outlining six stages from authorized corpus to decision use with traceable evidence highlighted.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/private-conversation-intelligence",
      "private-conversation-intelligence-close-up-hands-highlighting-line-printed.webp",
      "Close-up of hands highlighting a line on a printed transcript sheet marked with a blue index tab on an oak desk.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/private-conversation-intelligence",
      "private-conversation-intelligence-operations-manager-seen-behind-placing.webp",
      "An operations manager seen from behind placing a reviewed briefing folio into a wall-mounted distribution tray in a quiet hallway.",
      "3 / 2",
    ),
  ],
  "/services/data-warehouse-implementation/": [
    // [0] hero
    studioImg(
      "services/data-warehouse-implementation",
      "data-warehouse-implementation.webp",
      "Structured network cables in blue and green jackets neatly organized on black server rack frames in a server room.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/data-warehouse-implementation",
      "data-warehouse-implementation-brass-facility-keys-resting-beside.webp",
      "Brass facility keys resting beside labeled paper intake folders on an oak wooden counter in natural morning light.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/data-warehouse-implementation",
      "data-warehouse-implementation-process-diagram-showing-data-flow.webp",
      "Process diagram showing data flow through source systems, raw ingestion, permission boundaries, transformation tests, and analytical store.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/data-warehouse-implementation",
      "data-warehouse-implementation-hands-administrator-placing-bound.webp",
      "Hands of an administrator placing a bound technical runbook binder onto an industrial steel shelf in a staging room.",
      "3 / 2",
    ),
  ],
  "/services/data-enrichment/": [
    // [0] hero
    studioImg(
      "services/data-enrichment",
      "data-enrichment-services.webp",
      "An empty admissions intake desk with a telephone and document folders in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/data-enrichment",
      "data-enrichment-services-close-up-hands-applying-green.webp",
      "Close-up of hands applying a green verification seal to an intake folder on a dark slate counter.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/data-enrichment",
      "data-enrichment-services-process-diagram-showing-five-data.webp",
      "Process diagram showing five data enrichment stages from source licensing to permitted use flag.",
      "3 / 2",
    ),
  ],
  "/who-we-help/peptide-businesses/": [
    // [0] hero
    studioImg(
      "who-we-help/peptide-businesses",
      "peptide-marketing-agency.webp",
      "Clear laboratory vials and amber glass bottles resting on a stainless steel preparation counter in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "who-we-help/peptide-businesses",
      "peptide-marketing-agency-comparison-table-classifying-four.webp",
      "A comparison table classifying four peptide business models across legal status, certification, and ad channel eligibility.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/peptide-businesses",
      "peptide-marketing-agency-manila-document-folders-archival-file.webp",
      "Manila document folders and archival file jackets arranged neatly across a solid wood table in soft daylight.",
      "3 / 2",
    ),
  ],
  "/who-we-help/multi-location/data-and-market-intelligence/": [
    // [0] hero
    studioImg(
      "who-we-help/multi-location/data-and-market-intelligence",
      "multi-location-business-intelligence.webp",
      "Exterior view of an empty regional medical pavilion entrance at dawn with concrete walkways and glass double doors.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "who-we-help/multi-location/data-and-market-intelligence",
      "multi-location-business-intelligence-close-up-hands-placing-color-coded-tab.webp",
      "Close-up of hands placing color-coded tab dividers into a location registry binder on a counter.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/multi-location/data-and-market-intelligence",
      "multi-location-business-intelligence-four-step-diagram-showing-diagnostic.webp",
      "Four-step diagram showing the diagnostic sequence of Maturity, Capacity, Execution, and Market Residual.",
      "3 / 2",
    ),
  ],
  "/services/channel-and-partner-research/": [
    // [0] hero
    studioImg(
      "services/channel-and-partner-research",
      "channel-partner-research.webp",
      "Exterior wide view of an empty commercial logistics staging apron with closed freight bay doors at dawn.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/channel-and-partner-research",
      "channel-partner-research-frosted-glass-door-black-steel-frame.webp",
      "A frosted-glass door and black steel frame leading into a hospital administrative office suite.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/channel-and-partner-research",
      "channel-partner-research-comparison-matrix-evaluating-four.webp",
      "Comparison matrix evaluating four commercial routes across commercial control and margin impact.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/channel-and-partner-research",
      "channel-partner-research-bound-decision-document-folder-fountain.webp",
      "A bound decision document folder and fountain pen resting on a dark slate tabletop.",
      "3 / 2",
    ),
  ],
  "/services/competitive-positioning-research/": [
    // [0] hero
    studioImg(
      "services/competitive-positioning-research",
      "competitive-positioning-research.webp",
      "Exterior wide shot of a modern healthcare facility entrance at dawn with concrete walkway and blue glass awning.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/competitive-positioning-research",
      "competitive-positioning-research-empty-administrative-corridor-multi.webp",
      "Empty administrative corridor in a multi-location facility with terrazzo flooring and natural sunlight.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/competitive-positioning-research",
      "competitive-positioning-research-diagram-three-intersecting-circles-buyer.webp",
      "Diagram with three intersecting circles for buyer relevance, competitor differentiation, and provable evidence meeting at defensible position.",
      "3 / 2",
    ),
  ],
  "/services/pricing-research/": [
    // [0] hero
    studioImg(
      "services/pricing-research",
      "pricing-research-services.webp",
      "Wide exterior shot of a modern healthcare clinic entryway with concrete pillars and glass doors at early dawn.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/pricing-research",
      "pricing-research-services-diagram-displaying-four-pricing-decision.webp",
      "Diagram displaying four pricing decision pillars: Price Level, Packaging, Discounting, and Value Communication.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/pricing-research",
      "pricing-research-services-close-up-hardbound-administrative-cost.webp",
      "Close-up of hardbound administrative cost records and binders resting on a steel shelf in soft daylight.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/pricing-research",
      "pricing-research-services-steel-highway-guardrail-curving-beside.webp",
      "A steel highway guardrail curving beside a paved two-lane asphalt road bordered by green grass in afternoon light.",
      "3 / 2",
    ),
  ],
  "/services/sales-pipeline-analytics/": [
    // [0] hero
    studioImg(
      "services/sales-pipeline-analytics",
      "sales-pipeline-analytics-services.webp",
      "Empty glass skybridge between modern office buildings at dawn with morning light reflecting on polished concrete.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/sales-pipeline-analytics",
      "sales-pipeline-analytics-services-comparison-table-contrasting-crm-default.webp",
      "Comparison table contrasting CRM default tracking fields with standardized stage dictionary criteria.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/sales-pipeline-analytics",
      "sales-pipeline-analytics-services-gravel-path-diverging-two-trails-through.webp",
      "A gravel path diverging into two trails through open grassy fields in late afternoon sunlight.",
      "3 / 2",
    ),
  ],
  "/services/hybrid-ai-architecture/": [
    // [0] hero
    studioImg(
      "services/hybrid-ai-architecture",
      "hybrid-ai-architecture.webp",
      "Structured fiber optic cabling runs overhead in an orderly enterprise server room.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/hybrid-ai-architecture",
      "hybrid-ai-architecture-two-color-coded-intake-classification.webp",
      "Two color-coded intake classification folders rest on a clean wooden administrative counter.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/hybrid-ai-architecture",
      "hybrid-ai-architecture-process-diagram-showing-automated.webp",
      "Process diagram showing automated fallback pathways branching into stop and alert, queue for retry, and hand to human.",
      "3 / 2",
    ),
  ],
  "/services/private-ai-assistant/": [
    // [0] hero
    studioImg(
      "services/private-ai-assistant",
      "private-ai-assistant-for-business.webp",
      "A wide view of an empty commercial building entrance foyer with a brushed metal passage stanchion glowing green at dawn.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/private-ai-assistant",
      "private-ai-assistant-for-business-two-column-comparison-diagram-listing.webp",
      "A two-column comparison diagram listing permitted jobs including drafting documents alongside excluded scope including clinical judgment.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/private-ai-assistant",
      "private-ai-assistant-for-business-close-up-manila-classification-folders.webp",
      "Close-up of manila classification folders with green divider tabs resting on an oak desk in afternoon sunlight.",
      "3 / 2",
    ),
  ],
  "/services/ai-model-migration/": [
    // [0] hero
    studioImg(
      "services/ai-model-migration",
      "ai-model-migration-services.webp",
      "Row of matte-black server cabinets in an enterprise facility with structured overhead cabling along an empty corridor.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/ai-model-migration",
      "ai-model-migration-services-archival-folders-technical-documentation.webp",
      "Archival folders and technical documentation binders with colored index tabs resting on a stainless-steel table.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/ai-model-migration",
      "ai-model-migration-services-process-flow-diagram-showing-six-model.webp",
      "Process flow diagram showing six model migration steps from inventory through exit verification.",
      "3 / 2",
    ),
  ],
  "/services/enterprise-search-implementation/": [
    // [0] hero
    studioImg(
      "services/enterprise-search-implementation",
      "enterprise-search-implementation.webp",
      "Rows of steel storage shelving with labeled archival document boxes in an organized corporate records room.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/enterprise-search-implementation",
      "enterprise-search-implementation-hands-turning-tabbed-section-dividers.webp",
      "Hands turning tabbed section dividers inside an open clinical protocol binder on an empty counter.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/enterprise-search-implementation",
      "enterprise-search-implementation-horizontal-flowchart-showing-query.webp",
      "A horizontal flowchart showing query processing through keyword and vector matches, permission checks, semantic ranking, and verified sources.",
      "3 / 2",
    ),
  ],
  "/resources/first-party-data-strategy/": [
    // [0] hero
    studioImg(
      "resources/first-party-data-strategy",
      "first-party-data-strategy.webp",
      "Marketing analytics director and intake operations manager analyzing conversion data on a desktop monitor in a conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/first-party-data-strategy",
      "first-party-data-strategy-healthcare-admissions-coordinator.webp",
      "Healthcare admissions coordinator wearing a headset and reviewing intake status records on an office computer terminal.",
      "79 / 53",
    ),
  ],
  "/services/customer-data-integration/": [
    // [0] hero
    studioImg(
      "services/customer-data-integration",
      "customer-data-integration-services.webp",
      "Wide view of an empty clinic intake counter with an analog telephone console and document trays in morning light.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/customer-data-integration",
      "customer-data-integration-services-close-up-open-records-binder-blank-index.webp",
      "Close-up of an open records binder with blank index tabs and a metal pen on a standing wooden counter.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/customer-data-integration",
      "customer-data-integration-services-flow-diagram-showing-customer-data.webp",
      "Flow diagram showing customer data moving through source systems, matching, conflict rules, lineage tags, and governed destinations.",
      "3 / 2",
    ),
  ],
  "/services/win-loss-analysis/": [
    // [0] hero
    studioImg(
      "services/win-loss-analysis",
      "win-loss-analysis-services.webp",
      "Empty glass-walled corporate boardroom with an unbranded conference phone hub on the table under morning daylight.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/win-loss-analysis",
      "win-loss-analysis-services-close-up-hands-arranging-three-distinct.webp",
      "Close-up of hands arranging three distinct colored project folders on a dark slate work surface.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/win-loss-analysis",
      "win-loss-analysis-services-two-three-matrix-diagram-displaying-six.webp",
      "A two-by-three matrix diagram displaying six qualitative coding categories for win-loss analysis.",
      "3 / 2",
    ),
  ],
  "/who-we-help/small-business/market-intelligence/": [
    // [0] hero
    studioImg(
      "who-we-help/small-business/market-intelligence",
      "market-research-for-small-business.webp",
      "Commercial retail storefront in morning sunlight with a leasing sign in the window and an open parking apron.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "who-we-help/small-business/market-intelligence",
      "market-research-for-small-business-vertical-flow-diagram-illustrating-six.webp",
      "Vertical flow diagram illustrating six stages of a bounded market research process from decision framing to scope boundary.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/small-business/market-intelligence",
      "market-research-for-small-business-close-up-hands-holding-clipboard-printed.webp",
      "Close-up of hands holding a clipboard with a printed question set and pen outside a commercial storefront.",
      "3 / 2",
    ),
  ],
  "/who-we-help/enterprise/private-ai/": [
    // [0] hero
    studioImg(
      "who-we-help/enterprise/private-ai",
      "enterprise-private-ai.webp",
      "Empty data facility corridor with locked black server racks, overhead fiber trays, and blue indicator lights.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "who-we-help/enterprise/private-ai",
      "enterprise-private-ai-vertical-five-tier-diagram-detailing.webp",
      "Vertical five-tier diagram detailing governance categories from identity and architecture to procurement handoff.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/enterprise/private-ai",
      "enterprise-private-ai-rack-mounted-utility-hardware-patch.webp",
      "Rack-mounted utility hardware with patch cables, status LEDs, and a locked mechanical key switch.",
      "3 / 2",
    ),
  ],
  "/who-we-help/peptide-telehealth-providers/": [
    // [0] hero
    studioImg(
      "who-we-help/peptide-telehealth-providers",
      "peptide-telehealth-marketing.webp",
      "Frosted glass double doors and an architectural metal canopy at an empty outpatient clinic entrance at sunrise.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "who-we-help/peptide-telehealth-providers",
      "peptide-telehealth-marketing-process-flow-diagram-showing-five.webp",
      "Process flow diagram showing five enrollment stages from eligibility quiz to clinician evaluation, branching to prescription declined.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/peptide-telehealth-providers",
      "peptide-telehealth-marketing-linen-binder-archival-file-folders-rest.webp",
      "A linen binder and archival file folders rest on a slate windowsill in late afternoon sunlight.",
      "3 / 2",
    ),
  ],
  "/services/location-market-analysis/": [
    // [0] hero
    studioImg(
      "services/location-market-analysis",
      "location-market-analysis.webp",
      "Exterior view of an unoccupied commercial storefront and empty asphalt parking lot during morning daylight.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/location-market-analysis",
      "location-market-analysis-paved-roadway-junction-travel-corridor.webp",
      "Paved roadway junction and travel corridor dividing traffic directions under overcast daytime lighting.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/location-market-analysis",
      "location-market-analysis-commercial-facility-service-entrance.webp",
      "Commercial facility service entrance with an open metal door beside an exterior delivery staging bay.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/location-market-analysis",
      "location-market-analysis-decision-scorecard-matrix-comparing.webp",
      "Decision scorecard matrix comparing candidate expansion sites across observed evidence and assumed demand.",
      "3 / 2",
    ),
  ],
  "/services/market-entry-research/": [
    // [0] hero
    studioImg(
      "services/market-entry-research",
      "market-entry-research-services.webp",
      "Exterior view of an empty commercial healthcare building at sunrise with clean parking lot and glass entryway.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/market-entry-research",
      "market-entry-research-services-interior-view-empty-clinic-room-prepared.webp",
      "Interior view of an empty clinic room prepared for regulatory inspection with plastic-covered equipment and clean floors.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/market-entry-research",
      "market-entry-research-services-decision-diagram-showing-demand-access.webp",
      "Decision diagram showing demand access, operating limits, and entry economics inputs flowing to go, defer, and reject outcomes.",
      "3 / 2",
    ),
  ],
  "/services/voice-of-customer-research/": [
    // [0] hero
    studioImg(
      "services/voice-of-customer-research",
      "voice-of-customer-research.webp",
      "Empty modern healthcare corridor and entrance foyer illuminated by morning sunlight.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/voice-of-customer-research",
      "voice-of-customer-research-close-up-hands-organizing-color-coded.webp",
      "Close-up of hands organizing color-coded intake category divider cards on a wooden surface.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/voice-of-customer-research",
      "voice-of-customer-research-diagram-showing-four-stage-voice.webp",
      "Diagram showing a four-stage voice of customer traceability workflow from source records to decision brief.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/voice-of-customer-research",
      "voice-of-customer-research-fork-gravel-garden-path-dividing-around.webp",
      "A fork in a gravel garden path dividing around a stone border in late afternoon light.",
      "3 / 2",
    ),
  ],
  "/services/ideal-customer-profile-research/": [
    // [0] hero
    studioImg(
      "services/ideal-customer-profile-research",
      "ideal-customer-profile-research.webp",
      "Wide exterior shot of a modern multi-location healthcare campus entrance at dawn with concrete walkway and architectural glass doors.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/ideal-customer-profile-research",
      "ideal-customer-profile-research-close-up-client-onboarding-folders.webp",
      "Close-up of client onboarding folders and a fountain pen resting on a dark wood credenza in soft morning light.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/ideal-customer-profile-research",
      "ideal-customer-profile-research-decision-matrix-diagram-showing-three.webp",
      "Decision matrix diagram showing three account classification columns labeled Must-Haves, Disqualifiers, and Unknowns.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/ideal-customer-profile-research",
      "ideal-customer-profile-research-admissions-desk-phone-station-intake.webp",
      "Admissions desk phone station and intake folders on a stone counter next to an interior hallway at dusk.",
      "3 / 2",
    ),
  ],
  "/services/customer-segmentation/": [
    // [0] hero
    studioImg(
      "services/customer-segmentation",
      "customer-segmentation-analysis.webp",
      "Wide view of a brightly lit clinic concourse at sunrise with two polished corridors diverging toward separate wings.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/customer-segmentation",
      "customer-segmentation-analysis-empty-admissions-intake-station-multi.webp",
      "An empty admissions intake station with a multi-line telephone and color-coded route binder tabs arranged in a wall rack.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/customer-segmentation",
      "customer-segmentation-analysis-process-diagram-showing-five-step-path.webp",
      "Process diagram showing a five-step path from defining business decisions through a stability validation gate to operating choices.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/customer-segmentation",
      "customer-segmentation-analysis-staff-member-viewed-behind-opening.webp",
      "Staff member viewed from behind opening a frosted-glass door into a dedicated care suite along a brightly lit corridor.",
      "3 / 2",
    ),
  ],
  "/services/business-intelligence-consulting/": [
    // [0] hero
    studioImg(
      "services/business-intelligence-consulting",
      "business-intelligence-consulting.webp",
      "Wide exterior view of a multi-location healthcare clinic entrance at dawn with open pavement in the foreground.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/business-intelligence-consulting",
      "business-intelligence-consulting-five-stage-process-diagram-showing.webp",
      "Five-stage process diagram showing the sequence from naming an operating decision to defining owners, reconciling sources, reporting, and review.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/business-intelligence-consulting",
      "business-intelligence-consulting-close-up-hands-pulling-indexed-admission.webp",
      "Close-up of hands pulling an indexed admission record folder from a vertical filing rack.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/business-intelligence-consulting",
      "business-intelligence-consulting-medium-shot-empty-admissions-desk.webp",
      "Medium shot of an empty admissions desk with a landline telephone and metal clipboard at dusk.",
      "3 / 2",
    ),
  ],
  "/services/data-engineering/": [
    // [0] hero
    studioImg(
      "services/data-engineering",
      "data-engineering-services.webp",
      "Structured blue data cabling neatly bundled in overhead ladder trays inside an empty enterprise server facility.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/data-engineering",
      "data-engineering-services-process-diagram-showing-data-contract.webp",
      "Process diagram showing a data contract step defining schema, refresh cadence, and volume SLAs between source and destination.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/data-engineering",
      "data-engineering-services-clothbound-technical-binder-blue-ribbon.webp",
      "A clothbound technical binder with a blue ribbon bookmark and a solid metal access key resting on a wooden counter.",
      "3 / 2",
    ),
  ],
  "/services/ai-data-preparation/": [
    // [0] hero
    studioImg(
      "services/ai-data-preparation",
      "ai-data-preparation-services.webp",
      "Neat rows of bound reference binders with sky blue spines rest on metal shelving in an empty records room.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/ai-data-preparation",
      "ai-data-preparation-services-standing-person-seen-behind-carries.webp",
      "A standing person seen from behind carries a black documentation folder down an administrative hallway.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/ai-data-preparation",
      "ai-data-preparation-services-flow-diagram-showing-six-stages-document.webp",
      "Flow diagram showing six stages of document chunking and metadata tags routing to a query filter.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/ai-data-preparation",
      "ai-data-preparation-services-close-up-structured-network-cables-green.webp",
      "Close-up of structured network cables and green indicator lights plugged into a server chassis.",
      "3 / 2",
    ),
  ],
  "/services/rag-development/": [
    // [0] hero
    studioImg(
      "services/rag-development",
      "rag-development-services.webp",
      "Approved operational protocol binders arranged on an oak credenza in a sunlit administrative corridor.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/rag-development",
      "rag-development-services-two-protocol-reference-binders-color.webp",
      "Two protocol reference binders with color-coded edge tabs resting on a clinic intake counter.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/rag-development",
      "rag-development-services-process-diagram-showing-data-indexing.webp",
      "Process diagram showing data indexing, identity filtering, and branching to a cited answer or abstention response.",
      "3 / 2",
    ),
  ],
  "/services/on-premise-ai-deployment/": [
    // [0] hero
    studioImg(
      "services/on-premise-ai-deployment",
      "on-premise-ai-deployment.webp",
      "Empty server room with locked matte-black racks on the right, bundled blue overhead cables, and an open gray wall on the left.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/on-premise-ai-deployment",
      "on-premise-ai-deployment-boundary-diagram-white-showing-six.webp",
      "Boundary diagram on white showing six labeled tracks meeting a blue line, with a green arrow crossing the line for External connectors.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/on-premise-ai-deployment",
      "on-premise-ai-deployment-close-up-hands-passing-steel-cabinet-key.webp",
      "Close-up of hands passing a steel cabinet key with a blue tag and a closed linen binder in front of a bright frosted-glass hallway.",
      "3 / 2",
    ),
  ],
  "/services/peptide-legitscript-readiness/": [
    // [0] hero
    studioImg(
      "services/peptide-legitscript-readiness",
      "peptide-legitscript-certification-support.webp",
      "Neat folders with blue tabs and a pen arranged on a sunlit conference table in an administrative office.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/peptide-legitscript-readiness",
      "peptide-legitscript-certification-support-decision-flowchart-showing-pathways.webp",
      "Decision flowchart showing pathways between addiction treatment, healthcare merchant, and research-only certification eligibility.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/peptide-legitscript-readiness",
      "peptide-legitscript-certification-support-professional-hands-placing-sealed-white.webp",
      "Professional hands placing a sealed white document packet into an outgoing dispatch tray.",
      "3 / 2",
    ),
  ],
  "/services/data-agency/": [
    // [0] hero
    studioImg(
      "services/data-agency",
      "ai-data-agency.webp",
      "Wide view of an on-premises enterprise server room corridor with black equipment racks and blue indicator lights.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/data-agency",
      "ai-data-agency-close-up-printed-operational-summary.webp",
      "Close-up of printed operational summary forms and a green highlighter on a wooden admissions counter.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/data-agency",
      "ai-data-agency-clinical-operations-director-holding.webp",
      "Clinical operations director holding a folder while walking down an empty hospital corridor in morning light.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/data-agency",
      "ai-data-agency-diagram-showing-source-systems-flowing.webp",
      "Diagram showing source systems flowing through identity governance into a governed dataset to drive an operating decision.",
      "3 / 2",
    ),
  ],
  "/services/ai-readiness-assessment/": [
    // [0] hero
    studioImg(
      "services/ai-readiness-assessment",
      "ai-readiness-assessment.webp",
      "Exterior of a modern outpatient healthcare pavilion at sunrise with concrete walkways and architectural glass.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/ai-readiness-assessment",
      "ai-readiness-assessment-close-up-multi-line-desk-phone-tabbed.webp",
      "Close-up of a multi-line desk phone and tabbed intake folders on an admissions counter.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/ai-readiness-assessment",
      "ai-readiness-assessment-decision-matrix-diagram-showing-workflow.webp",
      "Decision matrix diagram showing workflow evaluation axes with pilot, hold, and no-go status gates.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/ai-readiness-assessment",
      "ai-readiness-assessment-bound-executive-decision-pack-divider.webp",
      "Bound executive decision pack with divider tabs resting on a dark wood credenza in afternoon light.",
      "3 / 2",
    ),
  ],
  "/services/managed-private-ai/": [
    // [0] hero
    studioImg(
      "services/managed-private-ai",
      "managed-private-ai.webp",
      "Clean private server room aisle with black equipment racks and blue network cabling under diffused overhead lighting.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/managed-private-ai",
      "managed-private-ai-comparison-matrix-showing-operating.webp",
      "Comparison matrix showing operating responsibilities across customer-owned hardware, provider capacity, and managed cloud deployments.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/managed-private-ai",
      "managed-private-ai-hands-standing-technician-placing.webp",
      "Hands of a standing technician placing an incident escalation checklist beside a desk telephone in late afternoon natural light.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/managed-private-ai",
      "managed-private-ai-pre-contracted-handover-binder-sealed.webp",
      "Pre-contracted handover binder, sealed document envelopes, and an encrypted data drive resting on a wooden tabletop in daylight.",
      "3 / 2",
    ),
  ],
  "/services/churn-analysis/": [
    // [0] hero
    studioImg(
      "services/churn-analysis",
      "churn-analysis-services.webp",
      "Operations, finance, and marketing leaders reviewing printed retention notes around a conference table in natural daylight.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/churn-analysis",
      "churn-analysis-services-decision-diagram-showing-four-churn.webp",
      "Decision diagram showing four churn categories flowing into cohort structure before deciding whether prediction is justified.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/churn-analysis",
      "churn-analysis-services-customer-operations-managers-reviewing.webp",
      "Customer operations managers reviewing printed onboarding workflow notes together at a sunlit desk with human oversight.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/churn-analysis",
      "churn-analysis-services-marketing-leader-revenue-analyst.webp",
      "A marketing leader and revenue analyst comparing printed acquisition and retention sheets at a glass-walled office table.",
      "3 / 2",
    ),
  ],
  "/services/private-ai-agency/": [
    // [0] hero
    studioImg(
      "services/private-ai-agency",
      "private-ai-agency.webp",
      "A company operations leader and technical specialist review a printed system boundary schematic together across a sunlit office table.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "services/private-ai-agency",
      "private-ai-agency-operations-manager-intake-coordinator.webp",
      "An operations manager and intake coordinator review printed workflow checklists together at a quiet office workstation.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/private-ai-agency",
      "private-ai-agency-six-step-process-diagram-showing.webp",
      "Six-step process diagram showing Assessment, Dataset approval, Prototype, Evaluation, Controlled rollout, and Handoff in sequence.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/private-ai-agency",
      "private-ai-agency-three-business-governance-leaders.webp",
      "Three business and governance leaders compare printed evaluation packets and scope checklists around a bright conference table.",
      "3 / 2",
    ),
  ],
  "/resources/first-party-data-vs-third-party-data/": [
    // [0] hero
    studioImg(
      "resources/first-party-data-vs-third-party-data",
      "first-party-data-vs-third-party-data.webp",
      "Healthcare marketing director and data analyst reviewing digital acquisition metrics on a display in an office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/first-party-data-vs-third-party-data",
      "first-party-data-vs-third-party-data-healthcare-intake-coordinator-entering.webp",
      "Healthcare intake coordinator entering patient consultation details into an office workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/first-party-data-vs-third-party-data",
      "first-party-data-vs-third-party-data-diagram-showing-first-party-data-flowing.webp",
      "Diagram showing first-party data flowing from user submission to server container, hashing, CRM, and ad network API.",
      "79 / 53",
    ),
  ],
  "/resources/google-ads-audit/": [
    // [0] hero
    studioImg(
      "resources/google-ads-audit",
      "google-ads-audit.webp",
      "A marketing director and paid media analyst review paid search campaign audit data together at a conference table.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/google-ads-audit",
      "google-ads-audit-healthcare-intake-coordinator-verifies.webp",
      "A healthcare intake coordinator verifies patient intake records at an administrative desk while handling a call.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/google-ads-audit",
      "google-ads-audit-two-healthcare-operations-managers.webp",
      "Two healthcare operations managers examine regional clinic territory boundaries and capacity in an office.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/google-ads-audit",
      "google-ads-audit-four-step-audit-workflow-diagram-showing.webp",
      "A four-step audit workflow diagram showing tracking audit, query scrub, network lock, and intake alignment.",
      "79 / 53",
    ),
  ],
  "/resources/google-ads-dashboard/": [
    // [0] hero
    studioImg(
      "resources/google-ads-dashboard",
      "google-ads-dashboard.webp",
      "Marketing director and media analyst reviewing campaign metrics at a conference table in a modern clinic office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/google-ads-dashboard",
      "google-ads-dashboard-paid-search-strategist-analyzing.webp",
      "Paid search strategist analyzing campaign trend lines and impression share metrics on a desktop monitor.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/google-ads-dashboard",
      "google-ads-dashboard-architecture-diagram-showing-ad-network.webp",
      "Architecture diagram showing ad network data separated from CRM admission records via an anonymized lead identifier.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/google-ads-dashboard",
      "google-ads-dashboard-senior-paid-media-team-discussing-search.webp",
      "Senior paid media team discussing search campaign attribution workflows during an executive audit session.",
      "79 / 53",
    ),
  ],
  "/resources/conversion-rate-optimization-examples/": [
    // [0] hero
    studioImg(
      "resources/conversion-rate-optimization-examples",
      "conversion-rate-optimization-examples.webp",
      "A marketing director and intake supervisor analyze digital conversion performance on desktop monitors in a sunlit administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/conversion-rate-optimization-examples",
      "conversion-rate-optimization-examples-healthcare-intake-coordinator-headset.webp",
      "A healthcare intake coordinator with a headset reviews an inbound digital referral at a sunlit workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/conversion-rate-optimization-examples",
      "conversion-rate-optimization-examples-horizontal-diagram-illustrating-three.webp",
      "A horizontal diagram illustrating three conversion rate optimization techniques: message matching, contextual proof, and friction calibration.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/conversion-rate-optimization-examples",
      "conversion-rate-optimization-examples-healthcare-operations-leaders-discuss.webp",
      "Healthcare operations leaders discuss statistical testing models around a conference table in an administrative suite.",
      "79 / 53",
    ),
  ],
  "/resources/addiction-treatment-marketing/": [
    // [0] hero
    studioImg(
      "resources/addiction-treatment-marketing",
      "addiction-treatment-marketing.webp",
      "Executive and clinical leadership team discussing admissions strategy at an addiction treatment facility.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/addiction-treatment-marketing",
      "addiction-treatment-marketing-diagram-comparing-non-compliant.webp",
      "Diagram comparing non-compliant addiction marketing triggers with a compliant acquisition pipeline.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/addiction-treatment-marketing",
      "addiction-treatment-marketing-exterior-welcoming-entrance-accredited.webp",
      "Exterior and welcoming entrance of an accredited addiction treatment center.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/addiction-treatment-marketing",
      "addiction-treatment-marketing-attribution-flowchart-connecting.webp",
      "Attribution flowchart connecting marketing clicks to verified patient admission stages.",
      "79 / 53",
    ),
  ],
  "/services/mental-health-marketing-agency/": [
    // [0] hero
    studioImg(
      "services/mental-health-marketing-agency",
      "mental-health-marketing-agency.webp",
      "A clinical director and admissions supervisor review intake data on a laptop in an outpatient center conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/mental-health-marketing-agency",
      "mental-health-marketing-agency-photo-why-behavioral-healthcare.webp",
      "A manager points at a spreadsheet while an intake coordinator in a headset takes notes at a busy call-center desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/mental-health-marketing-agency",
      "mental-health-marketing-agency-healthcare-executives-discuss.webp",
      "Healthcare executives discuss operational vendor evaluation criteria around a conference table in an administrative office.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/mental-health-marketing-agency",
      "mental-health-marketing-agency-process-diagram-illustrating-four-core.webp",
      "Process diagram illustrating four core mental health acquisition services from compliant search to intake automation.",
      "79 / 53",
    ),
  ],
  "/resources/behavioral-health-vs-mental-health/": [
    // [0] hero
    studioImg(
      "resources/behavioral-health-vs-mental-health",
      "behavioral-health-vs-mental-health.webp",
      "Two healthcare operations leaders discuss behavioral health service pathways around a conference table in an office setting.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/behavioral-health-vs-mental-health",
      "behavioral-health-vs-mental-health-licensed-clinical-psychologist-reviews.webp",
      "A licensed clinical psychologist reviews treatment notes with a colleague inside a modern outpatient therapy office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/behavioral-health-vs-mental-health",
      "behavioral-health-vs-mental-health-comparison-diagram-showing-key.webp",
      "Comparison diagram showing key operational and clinical differences between behavioral health and behavioral medicine.",
      "79 / 53",
    ),
  ],
  "/resources/telehealth-marketing/": [
    // [0] hero
    studioImg(
      "resources/telehealth-marketing",
      "telehealth-marketing.webp",
      "A physician in a modern consultation room conducts a virtual visit via a dual-monitor desktop workstation.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/telehealth-marketing",
      "telehealth-marketing-clinical-care-coordinator-reviews-daily.webp",
      "A clinical care coordinator reviews daily provider scheduling queues at an administrative workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/telehealth-marketing",
      "telehealth-marketing-diagram-contrasting-delayed-lead-forms.webp",
      "A diagram contrasting delayed lead forms against direct EHR scheduling pathways for virtual patient visits.",
      "79 / 53",
    ),
  ],
  "/resources/marketing-attribution-in-salesforce/": [
    // [0] hero
    studioImg(
      "resources/marketing-attribution-in-salesforce",
      "marketing-attribution-in-salesforce.webp",
      "Marketing executives review campaign attribution dashboards and pipeline metrics on desktop displays in an enterprise office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/marketing-attribution-in-salesforce",
      "marketing-attribution-in-salesforce-five-step-process-diagram-showing-how-ad.webp",
      "A five-step process diagram showing how ad campaign parameters transfer through web forms into CRM records.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/marketing-attribution-in-salesforce",
      "marketing-attribution-in-salesforce-data-engineer-configures-custom-crm.webp",
      "A data engineer configures custom CRM webhook ingestion and deal mapping on a widescreen monitor in a studio workspace.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/marketing-attribution-in-salesforce",
      "marketing-attribution-in-salesforce-intake-specialist-wearing-headset-logs.webp",
      "An intake specialist wearing a headset logs patient referral data on an office computer during an inbound call.",
      "79 / 53",
    ),
  ],
  "/resources/local-seo-for-law-firms/": [
    // [0] hero
    studioImg(
      "resources/local-seo-for-law-firms",
      "local-seo-for-law-firms.webp",
      "A senior law partner and marketing director examine local case inquiries on a workstation in a modern law office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/local-seo-for-law-firms",
      "local-seo-for-law-firms-diagram-comparing-map-pack-visibility.webp",
      "Diagram comparing map pack visibility drop-off across metro mileage rings against outsized entity prominence.",
      "79 / 53",
    ),
  ],
  "/resources/local-seo-vs-google-ads/": [
    // [0] hero
    studioImg(
      "resources/local-seo-vs-google-ads",
      "local-seo-vs-google-ads.webp",
      "Two healthcare marketing leaders review localized search engine performance metrics on desktop monitors in a bright office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/local-seo-vs-google-ads",
      "local-seo-vs-google-ads-digital-marketing-strategist-analyzes.webp",
      "A digital marketing strategist analyzes local geo-grid search ranking boundaries across a regional territory on an office monitor.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/local-seo-vs-google-ads",
      "local-seo-vs-google-ads-patient-taps-smartphone-against-nfc.webp",
      "A patient taps a smartphone against an NFC review card at a contemporary clinic reception desk.",
      "79 / 53",
    ),
  ],
  "/resources/generative-engine-optimization-vs-seo/": [
    // [0] hero
    studioImg(
      "resources/generative-engine-optimization-vs-seo",
      "generative-engine-optimization-vs-seo.webp",
      "A marketing director and technical strategist review search analytics on dual monitors in a sunlit operational office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/generative-engine-optimization-vs-seo",
      "generative-engine-optimization-vs-seo-diagram-comparing-traditional-search.webp",
      "Diagram comparing traditional search indexing and ranking against generative semantic retrieval and synthesized answers.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/generative-engine-optimization-vs-seo",
      "generative-engine-optimization-vs-seo-operations-manager-reviewing-multi.webp",
      "Operations manager reviewing multi-location facility metrics on a digital tablet in a bright healthcare office.",
      "79 / 53",
    ),
  ],
  "/resources/landing-page-vs-website/": [
    // [0] hero
    studioImg(
      "resources/landing-page-vs-website",
      "landing-page-vs-website.webp",
      "Healthcare marketing directors reviewing acquisition metrics on an office screen in daylight.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/landing-page-vs-website",
      "landing-page-vs-website-diagram-comparing-multi-link-corporate.webp",
      "Diagram comparing multi-link corporate website exploration with a linear single-action landing page flow.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/landing-page-vs-website",
      "landing-page-vs-website-institutional-evaluation-committee.webp",
      "Institutional evaluation committee reviewing compliance and vendor specifications in a conference room.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/landing-page-vs-website",
      "landing-page-vs-website-admissions-intake-specialist-handling.webp",
      "Admissions intake specialist handling incoming inquiries at a healthcare operations desk.",
      "79 / 53",
    ),
  ],
  "/resources/in-house-vs-agency-marketing/": [
    // [0] hero
    studioImg(
      "resources/in-house-vs-agency-marketing",
      "in-house-vs-agency-marketing.webp",
      "Commercial healthcare executives review marketing operations and acquisition metrics during a strategy meeting in a bright conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/in-house-vs-agency-marketing",
      "in-house-vs-agency-marketing-internal-marketing-director-operations.webp",
      "An internal marketing director and operations manager discuss organizational strategy and performance across an office collaboration table.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/in-house-vs-agency-marketing",
      "in-house-vs-agency-marketing-photo-specialization-gaps-why-generalist.webp",
      "Marketing team reviewing where generalist skills fall short on conversion systems.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/in-house-vs-agency-marketing",
      "in-house-vs-agency-marketing-architecture-diagram-outlining-five.webp",
      "Architecture diagram outlining five stages of enterprise data sovereignty from owned ad accounts to admission attribution.",
      "79 / 53",
    ),
  ],
  "/resources/customer-acquisition-cost-by-industry/": [
    // [0] hero
    studioImg(
      "resources/customer-acquisition-cost-by-industry",
      "customer-acquisition-cost-by-industry.webp",
      "Executive team in a conference room analyzing financial metrics on a tabletop display.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/customer-acquisition-cost-by-industry",
      "customer-acquisition-cost-by-industry-comparison-diagram-showing-pure-media.webp",
      "Comparison diagram showing pure media CAC versus fully loaded CAC calculations.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/customer-acquisition-cost-by-industry",
      "customer-acquisition-cost-by-industry-photo-intake-conversion-leak-where.webp",
      "Intake team reviewing where acquisition spend leaks between inquiry and admission.",
      "79 / 53",
    ),
  ],
  "/resources/law-firm-marketing/": [
    // [0] hero
    studioImg(
      "resources/law-firm-marketing",
      "law-firm-marketing.webp",
      "A law firm operations director and senior partner analyze digital acquisition metrics on a screen in a sunlit conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/law-firm-marketing",
      "law-firm-marketing-legal-intake-coordinator-wearing-headset.webp",
      "A legal intake coordinator wearing a headset logs consultation details into a practice management system at a dual-monitor desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/law-firm-marketing",
      "law-firm-marketing-legal-marketing-manager-intake.webp",
      "A legal marketing manager and intake supervisor evaluate a mobile consultation form layout on an office monitor.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/law-firm-marketing",
      "law-firm-marketing-diagram-law-firm-digital-marketing.webp",
      "Diagram of a law firm marketing system from search to signed client.",
      "79 / 53",
    ),
  ],
  "/resources/hipaa-compliant-texting/": [
    // [0] hero
    studioImg(
      "resources/hipaa-compliant-texting",
      "hipaa-compliant-texting.webp",
      "A healthcare intake coordinator wears a headset while managing incoming digital communications at an ergonomic desk.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hipaa-compliant-texting",
      "hipaa-compliant-texting-two-healthcare-administrative.webp",
      "Two healthcare administrative professionals review a secure patient communication portal on dual monitors.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/hipaa-compliant-texting",
      "hipaa-compliant-texting-patient-sits-sunlit-clinic-reception.webp",
      "A patient sits in a sunlit clinic reception area reviewing digital consent options on a handheld tablet.",
      "79 / 53",
    ),
  ],
  "/resources/local-seo-for-dentists/": [
    // [0] hero
    studioImg(
      "resources/local-seo-for-dentists",
      "local-seo-for-dentists.webp",
      "Dental practice operations manager reviewing appointment intake on a tablet at a modern clinic reception desk.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/local-seo-for-dentists",
      "local-seo-for-dentists-diagram-core-signals-local-seo-dentists.webp",
      "Diagram of the three local search signals for dentists: relevance, distance, and prominence.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/local-seo-for-dentists",
      "local-seo-for-dentists-healthcare-marketing-specialist.webp",
      "Healthcare marketing specialist reviewing clinic directory alignment and technical metadata on desktop monitors.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/local-seo-for-dentists",
      "local-seo-for-dentists-dental-clinic-coordinator-presenting.webp",
      "Dental clinic coordinator presenting a contactless review card to a patient at the front desk counter.",
      "79 / 53",
    ),
  ],
  "/resources/franchise-seo/": [
    // [0] hero
    studioImg(
      "resources/franchise-seo",
      "franchise-seo.webp",
      "Marketing director and clinic operations manager reviewing multi-location performance data on a tablet in an office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/franchise-seo",
      "franchise-seo-healthcare-clinic-practice-manager.webp",
      "Healthcare clinic practice manager at an intake reception desk speaking with a local community coordinator.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/franchise-seo",
      "franchise-seo-comparison-diagram-showing-consolidated.webp",
      "Comparison diagram showing consolidated website subdirectories versus fragmented independent local domains.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/franchise-seo",
      "franchise-seo-photo-franchise-digital-marketing.webp",
      "Franchise marketing team connecting paid media and local search across locations.",
      "79 / 53",
    ),
  ],
  "/resources/urgent-care-marketing/": [
    // [0] hero
    studioImg(
      "resources/urgent-care-marketing",
      "urgent-care-marketing.webp",
      "A healthcare operations director holding a digital tablet speaks with a clinic supervisor in a bright urgent care lobby.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/urgent-care-marketing",
      "urgent-care-marketing-photo-multi-location-dilemma-why-metro.webp",
      "Urgent care operations team comparing metro-wide campaigns against single-clinic demand.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/urgent-care-marketing",
      "urgent-care-marketing-photo-intent-driven-paid-search-high.webp",
      "Marketer reviewing paid search terms for urgent care and walk-in demand.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/urgent-care-marketing",
      "urgent-care-marketing-diagram-privacy-safe-attribution.webp",
      "Diagram of privacy-safe attribution that measures clinic visits instead of clicks.",
      "79 / 53",
    ),
  ],
  "/resources/dental-marketing/": [
    // [0] hero
    studioImg(
      "resources/dental-marketing",
      "dental-marketing.webp",
      "A healthcare marketing leader and operations manager review clinic operatory scheduling data on a wall display in a bright office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/dental-marketing",
      "dental-marketing-four-step-diagram-showing-flow.webp",
      "A four-step diagram showing the flow from centralized dental media to localized operatory scheduling.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/dental-marketing",
      "dental-marketing-photo-patient-retention-recall-closing.webp",
      "Dental front desk staff reviewing patient recall and retention schedules.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/dental-marketing",
      "dental-marketing-photo-what-look-dental-marketing.webp",
      "Dentist and office manager comparing dental marketing agency proposals.",
      "79 / 53",
    ),
  ],
  "/resources/senior-living-marketing/": [
    // [0] hero
    studioImg(
      "resources/senior-living-marketing",
      "senior-living-marketing.webp",
      "An adult daughter and senior mother tour a sunlit senior living community atrium with an admissions director.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/senior-living-marketing",
      "senior-living-marketing-senior-living-intake-coordinator.webp",
      "A senior living intake coordinator provides empathetic guidance during a phone consultation at an office desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/senior-living-marketing",
      "senior-living-marketing-photo-event-driven-acquisition-senior.webp",
      "Senior living community staff planning an open house event for prospective families.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/senior-living-marketing",
      "senior-living-marketing-three-pillar-framework-diagram.webp",
      "A three-pillar framework diagram highlighting clinical depth, regulatory maturity, and full-funnel attribution.",
      "79 / 53",
    ),
  ],
  "/resources/google-ads-vs-lsa/": [
    // [0] hero
    studioImg(
      "resources/google-ads-vs-lsa",
      "google-ads-vs-lsa.webp",
      "A healthcare marketing director and clinic administrator analyze digital growth channels on a laptop in a bright office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/google-ads-vs-lsa",
      "google-ads-vs-lsa-intake-coordinator-wearing-headset.webp",
      "An intake coordinator wearing a headset answers an incoming patient inquiry call at a medical clinic front desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/google-ads-vs-lsa",
      "google-ads-vs-lsa-practice-administrator-reviews-provider.webp",
      "A practice administrator reviews provider licensing and credentialing records in a sunlit medical management office.",
      "79 / 53",
    ),
  ],
  "/resources/facebook-ads-for-dentists/": [
    // [0] hero
    studioImg(
      "resources/facebook-ads-for-dentists",
      "facebook-ads-for-dentists.webp",
      "A licensed dentist reviews digital three-dimensional oral scans on an operatory monitor in a modern clinic.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/facebook-ads-for-dentists",
      "facebook-ads-for-dentists-photo-economics-facebook-ads-dentists.webp",
      "Dental practice owner reviewing Facebook ad results against treatment revenue.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/facebook-ads-for-dentists",
      "facebook-ads-for-dentists-four-stage-process-diagram-showing.webp",
      "A four-stage process diagram showing patient acquisition flow from social media discovery to search intent and confirmed booking.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/facebook-ads-for-dentists",
      "facebook-ads-for-dentists-dental-intake-coordinator-wearing.webp",
      "A dental intake coordinator wearing a headset manages patient consultation calendars on dual workstation monitors.",
      "79 / 53",
    ),
  ],
  "/resources/ai-marketing-tools/": [
    // [0] hero
    studioImg(
      "resources/ai-marketing-tools",
      "ai-marketing-tools.webp",
      "Marketing director and operations strategist reviewing campaign workflows on a laptop in a brightly lit modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/ai-marketing-tools",
      "ai-marketing-tools-two-marketing-professionals-discussing.webp",
      "Two marketing professionals discussing software workflow bottlenecks at a desktop workstation in an office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/ai-marketing-tools",
      "ai-marketing-tools-comparison-diagram-displaying-trade-offs.webp",
      "Comparison diagram displaying trade-offs between rented SaaS tools and owned internal marketing workflows.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/ai-marketing-tools",
      "ai-marketing-tools-marketing-operations-manager-analyzing.webp",
      "Marketing operations manager analyzing search query data and ad performance on dual monitors in a daylight office.",
      "79 / 53",
    ),
  ],
  "/resources/ai-seo-pricing/": [
    // [0] hero
    studioImg(
      "resources/ai-seo-pricing",
      "ai-seo-pricing.webp",
      "A wide view of a server room corridor with blue and green cabling organized inside dark equipment racks.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/ai-seo-pricing",
      "ai-seo-pricing-close-up-view-open-technical-audit.webp",
      "A close-up view of an open technical audit ledger with blue and green index tabs on a tall wooden counter.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/ai-seo-pricing",
      "ai-seo-pricing-horizontal-three-step-process-diagram.webp",
      "A horizontal three-step process diagram illustrating Phase 1 Audit Repair, Phase 2 Governed Production, and Phase 3 Specialist Growth.",
      "3 / 2",
    ),
  ],
  "/resources/fractional-cmo/": [
    // [0] hero
    studioImg(
      "resources/fractional-cmo",
      "fractional-cmo.webp",
      "Executive marketing director leading an operational strategy discussion with company leaders around a conference table.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/fractional-cmo",
      "fractional-cmo-marketing-executive-operations-director.webp",
      "Marketing executive and operations director analyzing digital performance metrics on a laptop in an office setting.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/fractional-cmo",
      "fractional-cmo-finance-director-marketing-strategist.webp",
      "Finance director and marketing strategist reviewing quarterly acquisition budgets and compensation models across a desk.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/fractional-cmo",
      "fractional-cmo-process-diagram-mapping-clean-search.webp",
      "Process diagram mapping clean search intent to landing page conversion, rapid intake response, and patient attribution.",
      "79 / 53",
    ),
  ],
  "/resources/cookieless-tracking/": [
    // [0] hero
    studioImg(
      "resources/cookieless-tracking",
      "cookieless-tracking.webp",
      "A healthcare marketing leader and technical architect review analytics data and tracking code on a workstation in an enterprise office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/cookieless-tracking",
      "cookieless-tracking-compliance-officer-digital-marketing.webp",
      "A compliance officer and digital marketing specialist inspect script audits and tracking warnings across two office monitors.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/cookieless-tracking",
      "cookieless-tracking-diagram-comparing-direct-browser.webp",
      "Diagram comparing direct browser tracking against a governed server-side endpoint filtering data before ad platform APIs.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/cookieless-tracking",
      "cookieless-tracking-secure-enterprise-server-rack-organized.webp",
      "A secure enterprise server rack with organized cabling and status indicator lights in an on-premise compute facility.",
      "79 / 53",
    ),
  ],
  "/resources/ai-seo-tools/": [
    // [0] hero
    studioImg(
      "resources/ai-seo-tools",
      "ai-seo-tools.webp",
      "Marketing executives reviewing search data and organic attribution metrics in a corporate meeting room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/ai-seo-tools",
      "ai-seo-tools-architectural-comparison-diagram.webp",
      "Architectural comparison diagram illustrating rented commercial AI tools versus owned private marketing systems.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/ai-seo-tools",
      "ai-seo-tools-process-flow-diagram-showing-entity-data.webp",
      "Process flow diagram showing entity data moving from website schema into generative search engine summaries.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/ai-seo-tools",
      "ai-seo-tools-technical-marketing-operators-reviewing.webp",
      "Technical marketing operators reviewing organic search architecture and data governance standards.",
      "79 / 53",
    ),
  ],
  "/resources/google-ads-cost/": [
    // [0] hero
    studioImg(
      "resources/google-ads-cost",
      "google-ads-cost.webp",
      "Marketing leaders reviewing media performance metrics on a display screen in an executive conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/google-ads-cost",
      "google-ads-cost-paid-media-specialist-analyzing-daily.webp",
      "A paid media specialist analyzing daily auction data and budget pacing on desktop monitors.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/google-ads-cost",
      "google-ads-cost-intake-director-paid-search-strategist.webp",
      "Intake director and paid search strategist collaborating on operational media tracking in a modern office.",
      "79 / 53",
    ),
  ],
  "/resources/consent-mode/": [
    // [0] hero
    studioImg(
      "resources/consent-mode",
      "consent-mode.webp",
      "Healthcare marketing and compliance leaders reviewing digital analytics dashboards in an office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/consent-mode",
      "consent-mode-technical-diagram-showing-google-consent.webp",
      "Technical diagram showing Google Consent Mode v2 parameter signaling from a cookie banner to tag containers.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/consent-mode",
      "consent-mode-architectural-diagram-comparing-network.webp",
      "Architectural diagram comparing network tag blocking in Basic Consent Mode against cookieless pings in Advanced Consent Mode.",
      "79 / 53",
    ),
  ],
  "/resources/drug-rehab-leads/": [
    // [0] hero
    studioImg(
      "resources/drug-rehab-leads",
      "drug-rehab-leads.webp",
      "Two behavioral health administrators review intake metrics in a sunlit treatment facility office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/drug-rehab-leads",
      "drug-rehab-leads-intake-coordinator-wearing-headset-takes.webp",
      "An intake coordinator wearing a headset takes notes at an admissions desk in a treatment center.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/drug-rehab-leads",
      "drug-rehab-leads-treatment-center-executives-discuss.webp",
      "Treatment center executives discuss acquisition costs and intake economics during a boardroom meeting.",
      "79 / 53",
    ),
  ],
  "/resources/healthcare-marketing-platform/": [
    // [0] hero
    studioImg(
      "resources/healthcare-marketing-platform",
      "healthcare-marketing-platform.webp",
      "Hospital marketing director and clinical operations executive reviewing regional healthcare performance data in a modern conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-marketing-platform",
      "healthcare-marketing-platform-patient-access-intake-coordinator.webp",
      "Patient access intake coordinator on a headset reviewing scheduling blocks alongside a clinical team lead in a hospital office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-marketing-platform",
      "healthcare-marketing-platform-diagram-contrasting-fragmented.webp",
      "Diagram contrasting fragmented healthcare point solutions with a unified five-stage intake and attribution architecture.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/healthcare-marketing-platform",
      "healthcare-marketing-platform-healthcare-digital-marketing-specialist.webp",
      "Healthcare digital marketing specialist and hospital access managers collaborating around a meeting table.",
      "79 / 53",
    ),
  ],
  "/resources/ppc-management/": [
    // [0] hero
    studioImg(
      "resources/ppc-management",
      "ppc-management.webp",
      "Marketing director and paid media analyst reviewing search analytics dashboards in a conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/ppc-management",
      "ppc-management-process-diagram-showing-ppc-workflow.webp",
      "Process diagram showing PPC workflow from search ad intent capture to server-side tagging, CRM verification, and offline conversion loops.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/ppc-management",
      "ppc-management-marketing-team-conducting-person-agency.webp",
      "Marketing team conducting an in-person agency vetting session focused on campaign ownership and conversion tracking.",
      "79 / 53",
    ),
  ],
  "/resources/reputation-management-software/": [
    // [0] hero
    studioImg(
      "resources/reputation-management-software",
      "reputation-management-software.webp",
      "A healthcare operations director reviews multi-facility performance metrics on a desktop screen in a bright office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/reputation-management-software",
      "reputation-management-software-clinic-practice-manager-receptionist.webp",
      "A clinic practice manager and receptionist discuss front-desk check-in workflows in a modern healthcare reception area.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/reputation-management-software",
      "reputation-management-software-comparison-diagram-showing-three-multi.webp",
      "A comparison diagram showing three multi-location software pricing structures: per-location fees, tiered licenses, and usage charges.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/reputation-management-software",
      "reputation-management-software-clinic-staff-member-presents-contactless.webp",
      "A clinic staff member presents a contactless NFC review card to a customer at a service counter.",
      "79 / 53",
    ),
  ],
  "/resources/local-seo-cost/": [
    // [0] hero
    studioImg(
      "resources/local-seo-cost",
      "local-seo-cost.webp",
      "Healthcare marketing director and operations manager reviewing local clinic performance data on a tablet in a bright reception lobby.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/local-seo-cost",
      "local-seo-cost-comparison-diagram-showing-monthly-local.webp",
      "Comparison diagram showing monthly local SEO pricing tiers for automated listing syndication, single locations, and multi-location networks.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/local-seo-cost",
      "local-seo-cost-photo-reputation-search-currency.webp",
      "Customer leaving a review at a point-of-service card as part of local search work.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/local-seo-cost",
      "local-seo-cost-marketing-strategist-clinical-operations.webp",
      "Marketing strategist and clinical operations leader reviewing multi-location search attribution data in a conference room.",
      "79 / 53",
    ),
  ],
  "/resources/data-sovereignty/": [
    // [0] hero
    studioImg(
      "resources/data-sovereignty",
      "data-sovereignty.webp",
      "Healthcare marketing leaders review audience attribution data on monitors in an administrative conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/data-sovereignty",
      "data-sovereignty-marketing-intake-operations-managers.webp",
      "Marketing and intake operations managers discuss data routing workflows at an office standing desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/data-sovereignty",
      "data-sovereignty-diagram-comparing-rented-cloud-ad.webp",
      "Diagram comparing rented cloud ad tracking with direct, sovereign marketing data ingestion.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/data-sovereignty",
      "data-sovereignty-marketing-technologist-evaluates.webp",
      "Marketing technologist evaluates dedicated on-premise computing hardware inside a secure server room.",
      "79 / 53",
    ),
  ],
  "/resources/ai-infrastructure/": [
    // [0] hero
    studioImg(
      "resources/ai-infrastructure",
      "ai-infrastructure.webp",
      "A dedicated server rack with clean cable management inside a climate-controlled equipment room.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/ai-infrastructure",
      "ai-infrastructure-yellow-note-attached-corner-bezel-high.webp",
      "A yellow note attached to the corner bezel of a high-performance batch processing workstation.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/ai-infrastructure",
      "ai-infrastructure-comparison-chart-displaying-break-even.webp",
      "A comparison chart displaying break-even utilization thresholds between owned compute hardware and cloud services.",
      "3 / 2",
    ),
  ],
  "/resources/meta-ads-cost/": [
    // [0] hero
    studioImg(
      "resources/meta-ads-cost",
      "meta-ads-cost.webp",
      "A marketing director and media planner analyze paid acquisition spend trends on a digital workspace display in an office setting.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/meta-ads-cost",
      "meta-ads-cost-two-digital-marketing-specialists-review.webp",
      "Two digital marketing specialists review ad auction diagnostics and campaign delivery data at a dual-monitor workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/meta-ads-cost",
      "meta-ads-cost-photo-how-much-do-facebook-ads-cost.webp",
      "Marketer reviewing a Facebook ads budget for a multi-location business.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/meta-ads-cost",
      "meta-ads-cost-flow-diagram-outlining-six-step-budget.webp",
      "Flow diagram outlining the six-step budget forecasting framework from target conversions to final ad spend.",
      "79 / 53",
    ),
  ],
  "/resources/best-conversion-rate-optimization-tools/": [
    // [0] hero
    studioImg(
      "resources/best-conversion-rate-optimization-tools",
      "best-conversion-rate-optimization-tools.webp",
      "Healthcare marketing director and intake lead reviewing lead quality data on an office computer screen.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/best-conversion-rate-optimization-tools",
      "best-conversion-rate-optimization-tools-photo-why-traditional-conversion-rate.webp",
      "Marketing analyst comparing conversion testing software against lead intake data.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/best-conversion-rate-optimization-tools",
      "best-conversion-rate-optimization-tools-process-diagram-showing-five-steps.webp",
      "Process diagram showing five steps connecting ad campaigns and landing page variants to closed revenue.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/best-conversion-rate-optimization-tools",
      "best-conversion-rate-optimization-tools-two-marketing-executives-evaluating.webp",
      "Two marketing executives evaluating conversion software categories in a conference room.",
      "79 / 53",
    ),
  ],
  "/resources/marketing-budget/": [
    // [0] hero
    studioImg(
      "resources/marketing-budget",
      "marketing-budget.webp",
      "Executive leaders analyze marketing capital allocation forecasts and financial models in a sunlit conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/marketing-budget",
      "marketing-budget-two-commercial-leaders-review.webp",
      "Two commercial leaders review departmental revenue benchmarks and budget projections on a digital wall display.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/marketing-budget",
      "marketing-budget-clinical-intake-coordinator-reviews.webp",
      "A clinical intake coordinator reviews multi-location facility schedules and intake queues at a dual-screen workstation.",
      "79 / 53",
    ),
  ],
  "/resources/mental-health-marketing-campaigns/": [
    // [0] hero
    studioImg(
      "resources/mental-health-marketing-campaigns",
      "mental-health-marketing-campaigns.webp",
      "Admissions director and clinical supervisor reviewing intake criteria in a sunlit behavioral health clinic conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/mental-health-marketing-campaigns",
      "mental-health-marketing-campaigns-healthcare-marketing-director-analyzing.webp",
      "Healthcare marketing director analyzing campaign performance metrics on a desktop monitor in an administrative office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/mental-health-marketing-campaigns",
      "mental-health-marketing-campaigns-photo-scaling-mental-health-therapist.webp",
      "Therapy practice owner planning marketing that respects clinical boundaries.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/mental-health-marketing-campaigns",
      "mental-health-marketing-campaigns-diagram-digital-marketing-mental-health.webp",
      "Diagram of a mental health marketing funnel with technical guardrails and privacy limits.",
      "79 / 53",
    ),
  ],
  "/resources/hipaa-compliant-crm/": [
    // [0] hero
    studioImg(
      "resources/hipaa-compliant-crm",
      "hipaa-compliant-crm.webp",
      "Healthcare marketing and operations leaders review intake metrics in a sunlit administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hipaa-compliant-crm",
      "hipaa-compliant-crm-intake-coordinator-wearing-headset.webp",
      "An intake coordinator wearing a headset manages prospective patient inquiries at an intake desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/hipaa-compliant-crm",
      "hipaa-compliant-crm-photo-comparing-medical-crm.webp",
      "Clinic operations lead comparing medical CRM systems on a laptop.",
      "79 / 53",
    ),
  ],
  "/resources/healthcare-marketing-benchmarks/": [
    // [0] hero
    studioImg(
      "resources/healthcare-marketing-benchmarks",
      "healthcare-marketing-benchmarks.webp",
      "A healthcare marketing executive reviews service-line acquisition data on a laptop in a sunlit hospital conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-marketing-benchmarks",
      "healthcare-marketing-benchmarks-healthcare-marketing-leaders-clinical.webp",
      "Healthcare marketing leaders and clinical directors discuss patient journey metrics at an industry summit.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-marketing-benchmarks",
      "healthcare-marketing-benchmarks-hospital-intake-director-marketing.webp",
      "A hospital intake director and marketing strategist analyze patient admission records in an administrative office.",
      "79 / 53",
    ),
  ],
  "/resources/healthcare-content-marketing/": [
    // [0] hero
    studioImg(
      "resources/healthcare-content-marketing",
      "healthcare-content-marketing.webp",
      "Health system marketing director and clinical leader reviewing service-line capacity and scheduling trends in a conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-content-marketing",
      "healthcare-content-marketing-diagram-disconnect-between-healthcare.webp",
      "Diagram showing healthcare content demand outrunning the clinical capacity to see patients.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-content-marketing",
      "healthcare-content-marketing-photo-clinical-governance-managing.webp",
      "Clinician and marketer reviewing medical content for accuracy before publication.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/healthcare-content-marketing",
      "healthcare-content-marketing-hospital-operations-manager-reviewing.webp",
      "Hospital operations manager reviewing multi-facility scheduling systems at an ambulatory center workstation.",
      "79 / 53",
    ),
  ],
  "/resources/physician-referral-marketing/": [
    // [0] hero
    studioImg(
      "resources/physician-referral-marketing",
      "physician-referral-marketing.webp",
      "Hospital marketing director and physician liaison reviewing service line analytics in a sunlit administrative conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/physician-referral-marketing",
      "physician-referral-marketing-clinic-coordinator-wearing-headset.webp",
      "Clinic coordinator wearing a headset at a computer workstation managing specialist appointment scheduling.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/physician-referral-marketing",
      "physician-referral-marketing-healthcare-compliance-officer-marketing.webp",
      "Healthcare compliance officer and marketing executive reviewing operational policy documents at a desk.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/physician-referral-marketing",
      "physician-referral-marketing-diagram-closed-loop-referral-attribution.webp",
      "Diagram of closed-loop referral attribution from physician outreach to clinical admission.",
      "79 / 53",
    ),
  ],
  "/resources/legitscript-certification-cost/": [
    // [0] hero
    studioImg(
      "resources/legitscript-certification-cost",
      "legitscript-certification-cost.webp",
      "Healthcare executives reviewing financial and compliance planning documents on a tablet in a bright office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/legitscript-certification-cost",
      "legitscript-certification-cost-behavioral-health-directors-discussing.webp",
      "Behavioral health directors discussing platform advertising policies around a laptop in a conference room.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/legitscript-certification-cost",
      "legitscript-certification-cost-diagram-five-digital-compliance-checks.webp",
      "Diagram of five digital compliance checks for landing pages including legal entity, domain ownership, and clinical oversight.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/legitscript-certification-cost",
      "legitscript-certification-cost-marketing-director-intake-coordinator.webp",
      "Marketing director and intake coordinator reviewing admissions attribution data on a computer screen.",
      "79 / 53",
    ),
  ],
  "/resources/marketing-attribution-tools/": [
    // [0] hero
    studioImg(
      "resources/marketing-attribution-tools",
      "marketing-attribution-tools.webp",
      "Marketing executive and operations director reviewing campaign attribution reporting together in a sunlit conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/marketing-attribution-tools",
      "marketing-attribution-tools-analytics-director-reviewing-data.webp",
      "Analytics director reviewing data discrepancies and attribution records on a desktop monitor in an office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/marketing-attribution-tools",
      "marketing-attribution-tools-photo-data-sources-sales-cycles-matching.webp",
      "Team matching attribution software options to their data sources and sales cycle.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/marketing-attribution-tools",
      "marketing-attribution-tools-diagram-marketing-attribution-dashboard.webp",
      "Diagram of an executive marketing attribution dashboard tying spend to revenue.",
      "79 / 53",
    ),
  ],
  "/resources/marketing-dashboard/": [
    // [0] hero
    studioImg(
      "resources/marketing-dashboard",
      "marketing-dashboard.webp",
      "Marketing executives reviewing spend and revenue performance metrics on an operational dashboard.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/marketing-dashboard",
      "marketing-dashboard-diagram-comparing-siloed-ad-platform.webp",
      "Diagram comparing siloed ad platform reporting with a unified executive marketing dashboard.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/marketing-dashboard",
      "marketing-dashboard-marketing-operations-leaders-reviewing.webp",
      "Marketing and operations leaders reviewing customer acquisition costs and facility unit economics.",
      "79 / 53",
    ),
  ],
  "/resources/server-side-tracking/": [
    // [0] hero
    studioImg(
      "resources/server-side-tracking",
      "server-side-tracking.webp",
      "Marketing and analytics directors review website conversion logs on a monitor in a sunlit office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/server-side-tracking",
      "server-side-tracking-architecture-diagram-showing-web-event.webp",
      "Architecture diagram showing web event data routed through a first-party server container to analytics endpoints.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/server-side-tracking",
      "server-side-tracking-engineer-finance-manager-review-monthly.webp",
      "An engineer and finance manager review monthly cloud computing costs on a laptop screen.",
      "79 / 53",
    ),
  ],
  "/resources/legitscript-certification/": [
    // [0] hero
    studioImg(
      "resources/legitscript-certification",
      "legitscript-certification.webp",
      "Two healthcare executives review operational compliance records at a conference table in an administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/legitscript-certification",
      "legitscript-certification-healthcare-marketing-intake-leaders.webp",
      "Healthcare marketing and intake leaders inspect digital campaign settings and compliance files on desktop screens.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/legitscript-certification",
      "legitscript-certification-diagram-legitscript-cost-application.webp",
      "Diagram of LegitScript certification costs across application, monitoring, and vetting time.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/legitscript-certification",
      "legitscript-certification-photo-operational-friction-points-that.webp",
      "Treatment center staff reviewing a certification application for gaps before submission.",
      "79 / 53",
    ),
  ],
  "/resources/call-tracking/": [
    // [0] hero
    studioImg(
      "resources/call-tracking",
      "call-tracking.webp",
      "An admissions director in an office reviewing call routing data and inquiry metrics on a desktop monitor.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/call-tracking",
      "call-tracking-marketing-analyst-intake-coordinator.webp",
      "A marketing analyst and an intake coordinator collaborating over campaign call attribution data at a desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/call-tracking",
      "call-tracking-diagram-showing-five-core-call-tracking.webp",
      "A diagram showing five core call tracking metrics evaluated beyond raw call volume.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/call-tracking",
      "call-tracking-photo-regulatory-compliance-patient.webp",
      "Compliance lead and marketer reviewing call tracking settings for patient privacy.",
      "79 / 53",
    ),
  ],
  "/resources/cost-per-admission/": [
    // [0] hero
    studioImg(
      "resources/cost-per-admission",
      "cost-per-admission.webp",
      "An admissions director and intake supervisor review admission records in a behavioral health administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/cost-per-admission",
      "cost-per-admission-comparison-diagram-showing-lead-cost.webp",
      "Comparison diagram showing lead cost and conversion rates yielding $6,000 versus $2,500 cost per admission.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/cost-per-admission",
      "cost-per-admission-healthcare-marketing-director-compliance.webp",
      "A healthcare marketing director and compliance officer discuss ad policies in an administrative conference room.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/cost-per-admission",
      "cost-per-admission-treatment-center-executives-evaluate.webp",
      "Treatment center executives evaluate level-of-care financial data and reimbursement metrics on a tablet.",
      "79 / 53",
    ),
  ],
  "/resources/what-is-behavioral-health-marketing/": [
    // [0] hero
    studioImg(
      "resources/what-is-behavioral-health-marketing",
      "what-is-behavioral-health-marketing.webp",
      "Healthcare leaders review admissions data during an operational strategy session in a modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/what-is-behavioral-health-marketing",
      "what-is-behavioral-health-marketing-admissions-coordinator-speaks-headset.webp",
      "An admissions coordinator speaks on a headset at an intake desk in a quiet behavioral health facility.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/what-is-behavioral-health-marketing",
      "what-is-behavioral-health-marketing-step-step-diagram-showing-five-stages.webp",
      "A step-by-step diagram showing the five stages of behavioral health patient intake from ad click to verified admission.",
      "79 / 53",
    ),
  ],
  "/resources/hospital-marketing/": [
    // [0] hero
    studioImg(
      "resources/hospital-marketing",
      "hospital-marketing.webp",
      "Hospital marketing leaders analyzing service line growth and patient acquisition data in a health system conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hospital-marketing",
      "hospital-marketing-hospital-marketing-director-clinical.webp",
      "A hospital marketing director and clinical service line lead reviewing outpatient scheduling capacity in an office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/hospital-marketing",
      "hospital-marketing-diagram-illustrating-privacy-safe.webp",
      "Diagram illustrating a privacy-safe healthcare marketing architecture routing search traffic to EHR appointment intake.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/hospital-marketing",
      "hospital-marketing-photo-closing-intake-gap-turning-search.webp",
      "Hospital marketing and scheduling teams reviewing how search demand becomes booked visits.",
      "79 / 53",
    ),
  ],
  "/resources/google-business-profile-optimization/": [
    // [0] hero
    studioImg(
      "resources/google-business-profile-optimization",
      "google-business-profile-optimization.webp",
      "Healthcare marketing director reviewing regional multi-location facility pins on an office display.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/google-business-profile-optimization",
      "google-business-profile-optimization-marketing-specialist-reviewing-local.webp",
      "Marketing specialist reviewing local search metrics on a desktop monitor in an administrative clinic office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/google-business-profile-optimization",
      "google-business-profile-optimization-operations-team-reviewing-facility.webp",
      "Operations team reviewing facility checklists in a bright healthcare conference room.",
      "79 / 53",
    ),
  ],
  "/resources/speed-to-lead/": [
    // [0] hero
    studioImg(
      "resources/speed-to-lead",
      "speed-to-lead.webp",
      "Healthcare intake coordinator wearing a headset at a dual-monitor desk in a sunlit office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/speed-to-lead",
      "speed-to-lead-two-operations-managers-reviewing-lead.webp",
      "Two operations managers reviewing lead queue metrics on a tablet in an office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/speed-to-lead",
      "speed-to-lead-intake-specialist-holding-phone-receiver.webp",
      "Intake specialist holding a phone receiver while reviewing an administrative queue at a desk.",
      "79 / 53",
    ),
  ],
  "/resources/what-is-local-seo/": [
    // [0] hero
    studioImg(
      "resources/what-is-local-seo",
      "what-is-local-seo.webp",
      "Two healthcare operations leaders review local intake analytics on a digital tablet in a bright clinic lobby.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/what-is-local-seo",
      "what-is-local-seo-driver-checks-local-facility-listings.webp",
      "A driver checks local facility listings and map results on a smartphone in a parking lot.",
      "79 / 53",
    ),
  ],
  "/resources/how-does-call-tracking-work/": [
    // [0] hero
    studioImg(
      "resources/how-does-call-tracking-work",
      "how-does-call-tracking-work.webp",
      "Marketing professional reviewing attribution dashboard linking web sessions to call records in a modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/how-does-call-tracking-work",
      "how-does-call-tracking-work-photo-what-call-tracking-why.webp",
      "Analyst reviewing call tracking data that links each caller to a marketing source.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/how-does-call-tracking-work",
      "how-does-call-tracking-work-infographic-comparing-static-phone.webp",
      "Infographic comparing static phone numbers for offline channels versus dynamic number pools for digital session tracking.",
      "79 / 53",
    ),
  ],
  "/resources/admissions-marketing/": [
    // [0] hero
    studioImg(
      "resources/admissions-marketing",
      "admissions-marketing.webp",
      "An admissions director and intake specialist review intake operations at a desk in a behavioral health facility.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/admissions-marketing",
      "admissions-marketing-behavioral-health-intake-coordinator.webp",
      "A behavioral health intake coordinator wearing a headset takes an admissions inquiry call at an office desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/admissions-marketing",
      "admissions-marketing-comparison-diagram-showing-cost-per.webp",
      "Comparison diagram showing cost per admission across broad paid search, high-intent paid search, and local SEO.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/admissions-marketing",
      "admissions-marketing-healthcare-marketing-compliance.webp",
      "Healthcare marketing and compliance professionals discuss digital advertising standards in a conference room.",
      "79 / 53",
    ),
  ],
  "/resources/lead-quality/": [
    // [0] hero
    studioImg(
      "resources/lead-quality",
      "lead-quality.webp",
      "Marketing director and intake manager reviewing lead qualification data on an office screen.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/lead-quality",
      "lead-quality-admissions-supervisor-reviewing-verified.webp",
      "Admissions supervisor reviewing verified lead qualification statuses on dual office monitors.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/lead-quality",
      "lead-quality-process-diagram-showing-offline.webp",
      "Process diagram showing offline conversion tracking from ad click to Google Ads smart bidding optimization.",
      "79 / 53",
    ),
  ],
  "/resources/hipaa-compliant-ai/": [
    // [0] hero
    studioImg(
      "resources/hipaa-compliant-ai",
      "hipaa-compliant-ai.webp",
      "A healthcare marketing director and compliance officer review campaign analytics on a laptop in a bright clinic conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hipaa-compliant-ai",
      "hipaa-compliant-ai-intake-coordinator-wearing-headset.webp",
      "An intake coordinator wearing a headset reviews de-identified demographic categories on a dual-monitor workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/hipaa-compliant-ai",
      "hipaa-compliant-ai-comparison-diagram-showing-commercial-ai.webp",
      "Comparison diagram showing commercial AI standards versus healthcare compliant requirements across five procurement criteria.",
      "79 / 53",
    ),
  ],
  "/resources/multi-touch-attribution/": [
    // [0] hero
    studioImg(
      "resources/multi-touch-attribution",
      "multi-touch-attribution.webp",
      "Marketing analytics director reviewing multi-channel attribution performance on an office workstation monitor.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/multi-touch-attribution",
      "multi-touch-attribution-marketing-analytics-team-reviewing.webp",
      "Marketing analytics team reviewing chronological session logs and multi-touch conversion events at an office desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/multi-touch-attribution",
      "multi-touch-attribution-diagram-showing-shapley-value-weighting.webp",
      "Diagram showing Shapley value weighting with an eight percent conversion rate when search is present versus two percent when absent.",
      "79 / 53",
    ),
  ],
  "/resources/addiction-treatment-seo/": [
    // [0] hero
    studioImg(
      "resources/addiction-treatment-seo",
      "addiction-treatment-seo.webp",
      "Treatment center marketing director and admissions leader collaborating at a sunlit conference table in a behavioral health facility.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/addiction-treatment-seo",
      "addiction-treatment-seo-four-stage-insurance-search-conversion.webp",
      "Four-stage insurance search conversion diagram showing payer landing pages, network transparency, secure VOB forms, and admissions intake.",
      "79 / 53",
    ),
  ],
  "/resources/service-line-marketing/": [
    // [0] hero
    studioImg(
      "resources/service-line-marketing",
      "service-line-marketing.webp",
      "Hospital executives reviewing service line marketing dashboards in a conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/service-line-marketing",
      "service-line-marketing-clinical-marketing-leaders-discussing.webp",
      "Clinical and marketing leaders discussing patient pathway data at a hospital workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/service-line-marketing",
      "service-line-marketing-diagram-orthopedic-marketing-high-margin.webp",
      "Diagram aligning orthopedic search demand with high-margin scheduling capacity.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/service-line-marketing",
      "service-line-marketing-infographic-detailing-clinical-intake.webp",
      "Infographic detailing clinical intake friction points and patient leakage risks.",
      "79 / 53",
    ),
  ],
  "/resources/healthcare-advertising/": [
    // [0] hero
    studioImg(
      "resources/healthcare-advertising",
      "healthcare-advertising.webp",
      "Healthcare compliance officer and marketing director reviewing digital advertising policies together.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-advertising",
      "healthcare-advertising-healthcare-marketing-strategist.webp",
      "Healthcare marketing strategist analyzing digital performance data and tracking architecture.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-advertising",
      "healthcare-advertising-diagram-medical-advertising-rules-google.webp",
      "Diagram of Google medical advertising rules and the LegitScript certification step.",
      "79 / 53",
    ),
  ],
  "/resources/what-is-conversion-rate-optimization/": [
    // [0] hero
    studioImg(
      "resources/what-is-conversion-rate-optimization",
      "what-is-conversion-rate-optimization.webp",
      "Two healthcare executives review digital conversion metrics on a laptop in a sunlit administrative conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/what-is-conversion-rate-optimization",
      "what-is-conversion-rate-optimization-intake-coordinator-private-healthcare.webp",
      "An intake coordinator in a private healthcare office handles a confidential consultation call with a headset.",
      "79 / 53",
    ),
  ],
  "/resources/ai-agents-for-marketing/": [
    // [0] hero
    studioImg(
      "resources/ai-agents-for-marketing",
      "ai-agents-for-marketing.webp",
      "Marketing director reviewing automated workflow dashboards and campaign data with an analyst in a modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/ai-agents-for-marketing",
      "ai-agents-for-marketing-marketing-operations-specialist-monitors.webp",
      "A marketing operations specialist monitors multiple terminal displays managing automated research and content workflows.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/ai-agents-for-marketing",
      "ai-agents-for-marketing-compliance-editor-marketing-strategist.webp",
      "A compliance editor and marketing strategist audit regulatory guidelines and campaign copy together on a digital tablet.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/ai-agents-for-marketing",
      "ai-agents-for-marketing-diagram-specialized-ai-systems-practice.webp",
      "Diagram of specialized AI agents working inside a marketing and intake workflow.",
      "79 / 53",
    ),
  ],
  "/resources/ppc-lead-quality/": [
    // [0] hero
    studioImg(
      "resources/ppc-lead-quality",
      "ppc-lead-quality.webp",
      "Marketing and admissions leaders discussing campaign performance at an office conference table.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/ppc-lead-quality",
      "ppc-lead-quality-healthcare-intake-coordinator-conducting.webp",
      "Healthcare intake coordinator conducting a pre-qualification call at an organized workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/ppc-lead-quality",
      "ppc-lead-quality-paid-search-specialist-reviewing-search.webp",
      "Paid search specialist reviewing search term logs and conversion settings on an office monitor.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/ppc-lead-quality",
      "ppc-lead-quality-process-diagram-showing-four-steps.webp",
      "Process diagram showing the four steps of offline conversion tracking from ad click to Google Ads value bidding.",
      "79 / 53",
    ),
  ],
  "/resources/google-ads-for-healthcare/": [
    // [0] hero
    studioImg(
      "resources/google-ads-for-healthcare",
      "google-ads-for-healthcare.webp",
      "Healthcare marketing director analyzing paid search performance dashboards in a modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/google-ads-for-healthcare",
      "google-ads-for-healthcare-healthcare-leaders-collaborating-multi.webp",
      "Healthcare leaders collaborating on multi-location campaign strategy and clinic intake coordination.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/google-ads-for-healthcare",
      "google-ads-for-healthcare-diagram-showing-privacy-preserving.webp",
      "Diagram showing the privacy-preserving server-side measurement architecture for healthcare ads.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/google-ads-for-healthcare",
      "google-ads-for-healthcare-photo-optimizing-closed-loop-conversions.webp",
      "Marketer reviewing Google Ads bidding tied to qualified patient encounters.",
      "79 / 53",
    ),
  ],
  "/resources/generative-engine-optimization/": [
    // [0] hero
    studioImg(
      "resources/generative-engine-optimization",
      "generative-engine-optimization.webp",
      "Healthcare marketing executive and technical analyst reviewing digital performance metrics together in a sunlit executive office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/generative-engine-optimization",
      "generative-engine-optimization-marketing-director-mapping-ai-search.webp",
      "Marketing director mapping an AI search retrieval process on a whiteboard during a conference room strategy meeting.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/generative-engine-optimization",
      "generative-engine-optimization-three-step-diagram-showing-direct-claim.webp",
      "Three-step diagram showing direct claim, technical evidence, and operational impact for structuring content for AI engines.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/generative-engine-optimization",
      "generative-engine-optimization-photo-owned-ai-infrastructure-building.webp",
      "Operator reviewing an owned AI infrastructure plan for search visibility.",
      "79 / 53",
    ),
  ],
  "/resources/ai-for-healthcare-marketing/": [
    // [0] hero
    studioImg(
      "resources/ai-for-healthcare-marketing",
      "ai-for-healthcare-marketing-team-reviewing-campaign-dashboard.webp",
      "Healthcare marketing team reviewing aggregate campaign dashboard in strategy session",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/ai-for-healthcare-marketing",
      "ai-for-healthcare-marketing-admissions-phone-station-intake-folders.webp",
      "Admissions phone station with intake folders in healthcare facility corridor",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/ai-for-healthcare-marketing",
      "ai-for-healthcare-marketing-printed-governance-checklist-document.webp",
      "Printed governance checklist document with pen marking AI control questions",
      "3 / 2",
    ),
  ],
  "/resources/medical-practice-marketing/": [
    // [0] hero
    studioImg(
      "resources/medical-practice-marketing",
      "medical-practice-marketing.webp",
      "Healthcare executives reviewing provider schedules and patient acquisition data in a modern conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/medical-practice-marketing",
      "medical-practice-marketing-diagram-1-foundations-aligning-medical.webp",
      "Diagram aligning medical practice marketing with clinical capacity.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/medical-practice-marketing",
      "medical-practice-marketing-photo-4-content-strategy-marketing.webp",
      "Medical practice team planning content across digital touchpoints.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/medical-practice-marketing",
      "medical-practice-marketing-marketing-strategist-analyzing-multi.webp",
      "A marketing strategist analyzing multi-location campaign attribution and first-party data flows on a workstation.",
      "79 / 53",
    ),
  ],
  "/resources/hipaa-compliant-website/": [
    // [0] hero
    studioImg(
      "resources/hipaa-compliant-website",
      "hipaa-compliant-website.webp",
      "Healthcare marketing and compliance leaders review digital architecture in a bright hospital administration office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hipaa-compliant-website",
      "hipaa-compliant-website-admissions-coordinator-technical.webp",
      "An admissions coordinator and technical specialist review secure intake form code on a laptop in an operations suite.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/hipaa-compliant-website",
      "hipaa-compliant-website-diagram-implementing-hipaa-compliant.webp",
      "Diagram of HIPAA-aware website analytics run through a server-side pipeline.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/hipaa-compliant-website",
      "hipaa-compliant-website-photo-how-marketing-powered-architects.webp",
      "Marketing and compliance leads reviewing a privacy-safe healthcare marketing tech stack.",
      "79 / 53",
    ),
  ],
  "/resources/marketing-measurement/": [
    // [0] hero
    studioImg(
      "resources/marketing-measurement",
      "marketing-measurement.webp",
      "A marketing director analyzing performance metrics and call logs on a computer screen.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/marketing-measurement",
      "marketing-measurement-intake-coordinator-reviewing-call.webp",
      "An intake coordinator reviewing call inquiries at a professional desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/marketing-measurement",
      "marketing-measurement-four-step-diagram-showing-technical.webp",
      "A four-step diagram showing the technical workflow for offline marketing measurement.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/marketing-measurement",
      "marketing-measurement-photo-how-marketing-powered-builds.webp",
      "Analyst reviewing an attribution and data analytics architecture on a monitor.",
      "79 / 53",
    ),
  ],
  "/resources/answer-engine-optimization/": [
    // [0] hero
    studioImg(
      "resources/answer-engine-optimization",
      "answer-engine-optimization.webp",
      "Digital marketing leaders collaborate over structured data content hierarchies at an office conference table in natural morning light.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/answer-engine-optimization",
      "answer-engine-optimization-content-strategist-clinical-director.webp",
      "Content strategist and clinical director discuss structured service documentation in a modern conference room.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/answer-engine-optimization",
      "answer-engine-optimization-four-stage-workflow-diagram-showing.webp",
      "Four-stage workflow diagram showing the implementation steps for answer engine optimization on a website.",
      "79 / 53",
    ),
  ],
  "/resources/what-is-ai-marketing/": [
    // [0] hero
    studioImg(
      "resources/what-is-ai-marketing",
      "what-is-ai-marketing.webp",
      "A marketing executive and an intake director review operational campaign performance on a monitor in a bright conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/what-is-ai-marketing",
      "what-is-ai-marketing-digital-media-director-operations.webp",
      "A digital media director and an operations manager analyze automated campaign bidding workflows at an office workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/what-is-ai-marketing",
      "what-is-ai-marketing-engineer-marketing-technologist-inspect.webp",
      "An engineer and a marketing technologist inspect owned computing hardware inside a secure server room.",
      "79 / 53",
    ),
  ],
  "/resources/reputation-management-for-doctors/": [
    // [0] hero
    studioImg(
      "resources/reputation-management-for-doctors",
      "reputation-management-for-doctors.webp",
      "A healthcare practice operations director holds a tablet in a modern outpatient clinic corridor near the front desk.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/reputation-management-for-doctors",
      "reputation-management-for-doctors-photo-what-reputation-management-doctors.webp",
      "Doctor and practice manager reviewing patient feedback and online ratings together.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/reputation-management-for-doctors",
      "reputation-management-for-doctors-comparison-diagram-showing-prohibited.webp",
      "A comparison diagram showing prohibited review gating steps contrasted with compliant direct review collection.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/reputation-management-for-doctors",
      "reputation-management-for-doctors-photo-point-service-review-collection.webp",
      "Clinic front desk with a point-of-service review card ready for patients to tap.",
      "79 / 53",
    ),
  ],
  "/resources/local-seo-best-practices/": [
    // [0] hero
    studioImg(
      "resources/local-seo-best-practices",
      "local-seo-best-practices.webp",
      "A clinic director and marketing manager reviewing multi-location performance data on a tablet in a modern medical office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/local-seo-best-practices",
      "local-seo-best-practices-three-column-diagram-illustrating-google.webp",
      "A three-column diagram illustrating Google local ranking factors: relevance, distance, and prominence.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/local-seo-best-practices",
      "local-seo-best-practices-person-tapping-smartphone-physical.webp",
      "A person tapping a smartphone on a physical review card at a healthcare clinic check-out counter.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/local-seo-best-practices",
      "local-seo-best-practices-two-marketing-specialists-analyzing.webp",
      "Two marketing specialists analyzing local search territory maps and performance analytics in a conference room.",
      "79 / 53",
    ),
  ],
  "/resources/lead-tracking/": [
    // [0] hero
    studioImg(
      "resources/lead-tracking",
      "lead-tracking.webp",
      "Healthcare marketing and operations leaders review intake metrics on a computer monitor in a bright office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/lead-tracking",
      "lead-tracking-intake-specialist-working-across-dual.webp",
      "Intake specialist working across dual monitors comparing data records at an administrative desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/lead-tracking",
      "lead-tracking-flow-diagram-showing-dynamic-call.webp",
      "Flow diagram showing dynamic call tracking steps from ad click to outcome attribution.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/lead-tracking",
      "lead-tracking-photo-privacy-first-tracking-regulated.webp",
      "Marketing and compliance leads reviewing privacy-first lead tracking on a laptop.",
      "79 / 53",
    ),
  ],
  "/resources/offline-conversion-tracking/": [
    // [0] hero
    studioImg(
      "resources/offline-conversion-tracking",
      "offline-conversion-tracking.webp",
      "A healthcare marketing director reviews ad attribution data on a desktop monitor in a bright office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/offline-conversion-tracking",
      "offline-conversion-tracking-photo-what-offline-conversion-tracking.webp",
      "Analyst matching offline conversions from a CRM to paid media reports.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/offline-conversion-tracking",
      "offline-conversion-tracking-technical-data-lead-compliance.webp",
      "A technical data lead and compliance specialist discuss data segregation architecture in a conference room.",
      "79 / 53",
    ),
  ],
  "/resources/google-ads-for-rehab/": [
    // [0] hero
    studioImg(
      "resources/google-ads-for-rehab",
      "google-ads-for-rehab.webp",
      "Admissions director discussing intake paperwork with a family member in a sunlit treatment center office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/google-ads-for-rehab",
      "google-ads-for-rehab-admissions-coordinator-wearing-headset.webp",
      "Admissions coordinator wearing a headset while reviewing intake records in an accredited behavioral health facility.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/google-ads-for-rehab",
      "google-ads-for-rehab-admissions-director-marketing-manager.webp",
      "Admissions director and marketing manager reviewing search query logs and call qualification data at a conference table.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/google-ads-for-rehab",
      "google-ads-for-rehab-five-step-process-diagram-illustrating.webp",
      "Five-step process diagram illustrating closed-loop attribution tracking from ad click to bed admission.",
      "79 / 53",
    ),
  ],
  "/resources/landing-page-optimization/": [
    // [0] hero
    studioImg(
      "resources/landing-page-optimization",
      "landing-page-optimization.webp",
      "Marketing and operations leaders reviewing landing page conversion metrics on an office wall display.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/landing-page-optimization",
      "landing-page-optimization-digital-marketing-strategist-analyzing.webp",
      "A digital marketing strategist analyzing landing page wireframes and conversion funnels at a workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/landing-page-optimization",
      "landing-page-optimization-process-diagram-comparing-low-friction.webp",
      "Process diagram comparing low-friction lead capture against calibrated form qualification outcomes.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/landing-page-optimization",
      "landing-page-optimization-photo-landing-page-best-practices.webp",
      "Marketing team reviewing a landing page layout for a regulated service on a monitor.",
      "79 / 53",
    ),
  ],
  "/resources/privacy-first-marketing/": [
    // [0] hero
    studioImg(
      "resources/privacy-first-marketing",
      "privacy-first-marketing.webp",
      "Healthcare marketing and systems leaders collaborate in a modern office, analyzing data architecture on a shared monitor.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/privacy-first-marketing",
      "privacy-first-marketing-compliance-officer-marketing-strategist.webp",
      "A compliance officer and marketing strategist review campaign governance documents at an executive conference table.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/privacy-first-marketing",
      "privacy-first-marketing-diagram-engineering-privacy-safe.webp",
      "Diagram of privacy-safe measurement that keeps third-party browser tracking out of the data path.",
      "79 / 53",
    ),
  ],
  "/resources/cost-per-lead/": [
    // [0] hero
    studioImg(
      "resources/cost-per-lead",
      "cost-per-lead.webp",
      "Marketing executive and clinical operations director reviewing healthcare acquisition metrics on a display in a bright conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/cost-per-lead",
      "cost-per-lead-healthcare-intake-coordinator-wearing.webp",
      "Healthcare intake coordinator wearing a headset while reviewing intake inquiries on a desktop screen in an administrative office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/cost-per-lead",
      "cost-per-lead-flow-diagram-comparing-how-unvalidated.webp",
      "Flow diagram comparing how unvalidated bidding leads to margin loss while verified milestones produce profitable revenue.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/cost-per-lead",
      "cost-per-lead-marketing-director-data-analyst.webp",
      "Marketing director and data analyst discussing closed-loop attribution workflows around a tablet in an office breakout area.",
      "79 / 53",
    ),
  ],
  "/resources/hipaa-compliant-website-examples/": [
    // [0] hero
    studioImg(
      "resources/hipaa-compliant-website-examples",
      "hipaa-compliant-website-examples.webp",
      "Healthcare marketing and compliance leaders reviewing digital intake architecture on a screen in a modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hipaa-compliant-website-examples",
      "hipaa-compliant-website-examples-primary-care-clinician-patient-reviewing.webp",
      "Primary care clinician and patient reviewing check-in steps on a secure digital tablet in a clinic lobby.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/hipaa-compliant-website-examples",
      "hipaa-compliant-website-examples-comparison-diagram-contrasting-standard.webp",
      "Comparison diagram contrasting standard web hosting with HIPAA-compliant cloud architecture across three technical layers.",
      "79 / 53",
    ),
  ],
  "/resources/customer-acquisition-cost/": [
    // [0] hero
    studioImg(
      "resources/customer-acquisition-cost",
      "customer-acquisition-cost.webp",
      "Executive and finance director reviewing marketing performance metrics on a display in a modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/customer-acquisition-cost",
      "customer-acquisition-cost-healthcare-intake-coordinator-headset.webp",
      "Healthcare intake coordinator on a headset entering patient admission data into a secure desktop system.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/customer-acquisition-cost",
      "customer-acquisition-cost-financial-diagram-showing-customer.webp",
      "Financial diagram showing customer acquisition cost recovery across months leading to net operating profit.",
      "79 / 53",
    ),
  ],
  "/resources/local-seo-for-doctors/": [
    // [0] hero
    studioImg(
      "resources/local-seo-for-doctors",
      "local-seo-for-doctors.webp",
      "A healthcare practice operations director analyzes multi-clinic location performance data on a laptop in a sunlit administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/local-seo-for-doctors",
      "local-seo-for-doctors-diagram-displaying-google-s-three-local.webp",
      "Diagram displaying Google's three local ranking pillars for medical practices: Relevance, Distance, and Prominence.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/local-seo-for-doctors",
      "local-seo-for-doctors-clinic-operations-specialist-audits.webp",
      "A clinic operations specialist audits provider directory data across dual monitors in a modern healthcare office.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/local-seo-for-doctors",
      "local-seo-for-doctors-marketing-director-clinical-leaders.webp",
      "A marketing director and clinical leaders review practice growth strategy around a conference table in an executive suite.",
      "79 / 53",
    ),
  ],
  "/resources/healthcare-seo/": [
    // [0] hero
    studioImg(
      "resources/healthcare-seo",
      "healthcare-seo.webp",
      "Healthcare marketing leaders reviewing multi-location clinic operations in a bright hospital administration office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-seo",
      "healthcare-seo-healthcare-administrators-analyzing.webp",
      "Healthcare administrators analyzing clinic search hierarchies and location data across dual monitors.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-seo",
      "healthcare-seo-process-diagram-showing-three-steps-desk.webp",
      "Process diagram showing three steps from desk touchpoint to NFC phone tap and verified review.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/healthcare-seo",
      "healthcare-seo-strategy-team-reviewing-regional.webp",
      "Strategy team reviewing regional healthcare service lines and taxonomy data in a modern office.",
      "79 / 53",
    ),
  ],
  "/resources/what-is-hipaa-marketing/": [
    // [0] hero
    studioImg(
      "resources/what-is-hipaa-marketing",
      "what-is-hipaa-marketing.webp",
      "Healthcare marketing and compliance leaders discuss acquisition metrics and data governance in an office setting.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/what-is-hipaa-marketing",
      "what-is-hipaa-marketing-healthcare-admissions-staff-review.webp",
      "Healthcare admissions staff review patient intake and communication workflows at an office workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/what-is-hipaa-marketing",
      "what-is-hipaa-marketing-diagram-comparing-non-compliant-ad.webp",
      "Diagram comparing non-compliant ad retargeting with a compliant server-side healthcare tracking pipeline.",
      "79 / 53",
    ),
  ],
  "/resources/hipaa-marketing-authorization/": [
    // [0] hero
    studioImg(
      "resources/hipaa-marketing-authorization",
      "hipaa-marketing-authorization-blank-form-signature-line.webp",
      "Blank form with a ruled signature line, a black pen and an envelope on a white desk in daylight.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/hipaa-marketing-authorization",
      "hipaa-marketing-authorization-hospital-corridor-mail-slots-paper-files.webp",
      "Hospital corridor with wall-mounted mail slots holding envelopes and a cart of paper files.",
      "3 / 2",
    ),
  ],
  "/resources/patient-acquisition/": [
    // [0] hero
    studioImg(
      "resources/patient-acquisition",
      "patient-acquisition.webp",
      "Healthcare marketing leaders review clinical capacity and appointment scheduling data in a bright hospital conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/patient-acquisition",
      "patient-acquisition-outpatient-clinic-intake-coordinator.webp",
      "Outpatient clinic intake coordinator reviews appointment details with a family member in a modern healthcare reception area.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/patient-acquisition",
      "patient-acquisition-diagram-comparing-vanity-lead.webp",
      "Diagram comparing vanity lead acquisition tracking against fully loaded patient acquisition cost for attended appointments.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/patient-acquisition",
      "patient-acquisition-central-intake-coordinator-manages.webp",
      "Central intake coordinator manages regional clinic scheduling calendars across dual computer monitors.",
      "79 / 53",
    ),
  ],
  "/resources/performance-max/": [
    // [0] hero
    studioImg(
      "resources/performance-max",
      "performance-max.webp",
      "A marketing director reviews campaign analytics on a laptop in a bright administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/performance-max",
      "performance-max-admissions-intake-specialist-reviews.webp",
      "An admissions intake specialist reviews incoming service inquiries at an office workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/performance-max",
      "performance-max-comparative-diagram-contrasting-standard.webp",
      "A comparative diagram contrasting standard search and Performance Max across intent and channel reach.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/performance-max",
      "performance-max-two-marketing-executives-evaluate-paid.webp",
      "Two marketing executives evaluate paid media strategy across a conference table in an office.",
      "79 / 53",
    ),
  ],
  "/resources/what-is-healthcare-marketing/": [
    // [0] hero
    studioImg(
      "resources/what-is-healthcare-marketing",
      "what-is-healthcare-marketing.webp",
      "Health system marketing director and operations leader reviewing regional patient capacity metrics in a bright conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/what-is-healthcare-marketing",
      "what-is-healthcare-marketing-healthcare-market-research-team.webp",
      "Healthcare market research team analyzing regional demographic data and patient travel thresholds on digital displays.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/what-is-healthcare-marketing",
      "what-is-healthcare-marketing-healthcare-data-compliance-officer.webp",
      "Healthcare data compliance officer and digital strategist reviewing secure server-side tracking protocols on laptops.",
      "79 / 53",
    ),
  ],
  "/resources/how-to-get-more-google-reviews/": [
    // [0] hero
    studioImg(
      "resources/how-to-get-more-google-reviews",
      "how-to-get-more-google-reviews.webp",
      "Healthcare receptionist and client tapping a smartphone on a contactless review card at a front desk.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/how-to-get-more-google-reviews",
      "how-to-get-more-google-reviews-diagram-showing-google-local-search.webp",
      "Diagram showing Google local search ranking factors with Distance, Relevance, and Prominence feeding map pack visibility.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/how-to-get-more-google-reviews",
      "how-to-get-more-google-reviews-front-desk-staff-member-gesturing-toward.webp",
      "Front desk staff member gesturing toward an NFC and QR review card stand during a patient checkout.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/how-to-get-more-google-reviews",
      "how-to-get-more-google-reviews-photo-operational-workflows-increase.webp",
      "Multi-location team reviewing a workflow for collecting Google reviews at each site.",
      "79 / 53",
    ),
  ],
  "/resources/ai-ownership/": [
    // [0] hero
    studioImg(
      "resources/ai-ownership",
      "ai-ownership.webp",
      "A wide view of enterprise server hardware racks with sky blue ambient indicators in a quiet room.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/ai-ownership",
      "ai-ownership-industrial-steel-power-conduit-box.webp",
      "An industrial steel power conduit box and cabling mounted on a concrete building wall in direct sunlight.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/ai-ownership",
      "ai-ownership-five-step-process-diagram-illustrating.webp",
      "A five-step process diagram illustrating the flow from input separation to human verification and output record writing.",
      "3 / 2",
    ),
  ],
  "/resources/ai-marketing-ideas/": [
    // [0] hero
    studioImg(
      "resources/ai-marketing-ideas",
      "ai-marketing-ideas.webp",
      "Healthcare and marketing executives analyze operational acquisition data on a display in a bright conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/ai-marketing-ideas",
      "ai-marketing-ideas-marketing-leadership-team-collaborates.webp",
      "A marketing leadership team collaborates over campaign workflow schematics in a modern corporate office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/ai-marketing-ideas",
      "ai-marketing-ideas-comparison-diagram-showing-which.webp",
      "Comparison diagram showing which marketing infrastructure elements to rent through commercial SaaS versus build and own internally.",
      "79 / 53",
    ),
  ],
  "/resources/facebook-ads-for-healthcare/": [
    // [0] hero
    studioImg(
      "resources/facebook-ads-for-healthcare",
      "facebook-ads-for-healthcare.webp",
      "Healthcare marketing director and physician executive reviewing compliant digital advertising campaigns on a desktop screen.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/facebook-ads-for-healthcare",
      "facebook-ads-for-healthcare-diagram-regulatory-landscape-why.webp",
      "Diagram of the regulatory limits that shape healthcare social media advertising.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/facebook-ads-for-healthcare",
      "facebook-ads-for-healthcare-board-certified-physician-recording.webp",
      "Board-certified physician recording an educational healthcare video for patient outreach in a modern clinic setting.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/facebook-ads-for-healthcare",
      "facebook-ads-for-healthcare-architecture-diagram-showing-privacy.webp",
      "Architecture diagram showing privacy-safe conversion tracking and offline attribution for healthcare paid social campaigns.",
      "79 / 53",
    ),
  ],
  "/resources/google-ads-best-practices/": [
    // [0] hero
    studioImg(
      "resources/google-ads-best-practices",
      "google-ads-best-practices.webp",
      "A marketing director and search strategist analyze lead conversion data on a screen in a bright office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/google-ads-best-practices",
      "google-ads-best-practices-healthcare-intake-coordinator-wearing.webp",
      "A healthcare intake coordinator wearing a headset reviews a consultation submission at an office desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/google-ads-best-practices",
      "google-ads-best-practices-diagram-showing-high-intent-google-ads.webp",
      "A diagram showing high-intent Google Ads campaign architecture linked to offline conversion milestone tracking.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/google-ads-best-practices",
      "google-ads-best-practices-media-manager-audits-search-term-queries.webp",
      "A media manager audits search term queries and negative keyword lists at an office workstation.",
      "79 / 53",
    ),
  ],
  "/resources/intake-automation/": [
    // [0] hero
    studioImg(
      "resources/intake-automation",
      "intake-automation.webp",
      "Two healthcare intake managers review automated routing queues on a dual-monitor workstation in an operations office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/intake-automation",
      "intake-automation-intake-coordinator-office-desk-responds.webp",
      "An intake coordinator at an office desk responds immediately to an incoming digital inquiry notification.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/intake-automation",
      "intake-automation-six-step-diagram-illustrating-closed.webp",
      "A six-step diagram illustrating closed-loop attribution from initial ad click to final admission and offline conversion import.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/intake-automation",
      "intake-automation-photo-engineering-operational-workflows.webp",
      "Intake coordinator and operations lead mapping an automated workflow with a human handoff.",
      "79 / 53",
    ),
  ],
  "/resources/chatgpt-for-marketing/": [
    // [0] hero
    studioImg(
      "resources/chatgpt-for-marketing",
      "chatgpt-for-marketing-operator-evaluating-chat-assistant.webp",
      "Marketing operator evaluating a chat assistant tool in an office setting",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/chatgpt-for-marketing",
      "chatgpt-for-marketing-marketing-manager-reviewing-ad-variants.webp",
      "Marketing manager reviewing ad variants and localized copy documents",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/chatgpt-for-marketing",
      "chatgpt-for-marketing-intake-coordinator-handling-notes-desk.webp",
      "Intake coordinator handling notes and a desk phone in an admissions area",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/chatgpt-for-marketing",
      "chatgpt-for-marketing-diagram-comparing-rented-multi-tenant-ai.webp",
      "Diagram comparing rented multi-tenant AI versus owned local infrastructure",
      "3 / 2",
    ),
  ],
  "/resources/meta-pixel-hipaa/": [
    // [0] hero
    studioImg(
      "resources/meta-pixel-hipaa",
      "meta-pixel-hipaa.webp",
      "Healthcare marketing and compliance leaders reviewing digital tracking architecture on office monitors.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/meta-pixel-hipaa",
      "meta-pixel-hipaa-process-diagram-showing-how-client-side.webp",
      "Process diagram showing how client-side tracking pixels transmit URL telemetry to advertising servers.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/meta-pixel-hipaa",
      "meta-pixel-hipaa-legal-counsel-healthcare-executive.webp",
      "Legal counsel and healthcare executive reviewing federal regulatory enforcement documents.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/meta-pixel-hipaa",
      "meta-pixel-hipaa-architecture-diagram-illustrating-secure.webp",
      "Architecture diagram illustrating secure server-side tagging and filtered conversion API data flows.",
      "79 / 53",
    ),
  ],
  "/resources/marketing-economics/": [
    // [0] hero
    studioImg(
      "resources/marketing-economics",
      "marketing-economics.webp",
      "Two executives analyze marketing unit economics and customer acquisition data at a boardroom table.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/marketing-economics",
      "marketing-economics-marketing-director-finance-executive.webp",
      "A marketing director and finance executive discuss capital allocation during a conference meeting.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/marketing-economics",
      "marketing-economics-diagram-showing-how-conversion-rate.webp",
      "A diagram showing how conversion rate increases customer acquisition from the same traffic volume.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/marketing-economics",
      "marketing-economics-photo-conversion-optimization-intake.webp",
      "Operator reviewing conversion and intake automation results against marketing spend.",
      "79 / 53",
    ),
  ],
  "/resources/local-llm/": [
    // [0] hero
    studioImg(
      "resources/local-llm",
      "local-llm.webp",
      "Technology director and operations executive reviewing an on-premise server rack in a secure data room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/local-llm",
      "local-llm-software-engineer-marketing-manager.webp",
      "Software engineer and marketing manager reviewing local inference execution logs on dual monitors in an office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/local-llm",
      "local-llm-comparison-diagram-showing-vram.webp",
      "Comparison diagram showing VRAM requirements across model quantization tiers from 140 gigabytes to 6 gigabytes.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/local-llm",
      "local-llm-healthcare-compliance-officer-clinical.webp",
      "Healthcare compliance officer and clinical operations director reviewing intake data handling protocols in a conference room.",
      "79 / 53",
    ),
  ],
  "/resources/multi-location-marketing-strategy/": [
    // [0] hero
    studioImg(
      "resources/multi-location-marketing-strategy",
      "multi-location-marketing-strategy.webp",
      "A healthcare operations director and a clinic manager talking in a modern, sunlit medical clinic reception lobby.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/multi-location-marketing-strategy",
      "multi-location-marketing-strategy-suburban-clinic-office-manager-sitting.webp",
      "A suburban clinic office manager sitting at an organized reception desk looking at an appointment schedule on a monitor.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/multi-location-marketing-strategy",
      "multi-location-marketing-strategy-diagram-comparing-three-multi-location.webp",
      "A diagram comparing three multi-location marketing flaws with their corresponding operational solutions using six clear labels.",
      "79 / 53",
    ),
  ],
  "/resources/google-ads-explained/": [
    // [0] hero
    studioImg(
      "resources/google-ads-explained",
      "google-ads-explained-phone-held-upright-bus-shelter.webp",
      "Hands holding a phone upright at a bus shelter in morning light, screen angled away from the camera.",
      "7 / 4",
    ),
    // [2] section image
    studioImg(
      "resources/google-ads-explained",
      "google-ads-explained-empty-clinic-admissions-counter-dusk.webp",
      "Empty clinic admissions counter at dusk with a desk phone, blank intake folders and a cup of pens.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/google-ads-explained",
      "google-ads-explained-stacked-chart-ranking-four-metrics-cost.webp",
      "Stacked chart ranking four metrics, with cost per qualified opportunity highlighted at the top in green.",
      "3 / 2",
    ),
  ],
  "/services/ai-agents-for-marketing-agency/": [
    // [0] hero
    studioImg(
      "services/ai-agents-for-marketing-agency",
      "ai-agents-for-marketing-agency.webp",
      "Marketing director and systems architect analyzing acquisition pipeline performance on a conference display.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/ai-agents-for-marketing-agency",
      "ai-agents-for-marketing-agency-operations-strategist-media-lead.webp",
      "Operations strategist and media lead evaluating campaign verification rules across dual desktop monitors.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/ai-agents-for-marketing-agency",
      "ai-agents-for-marketing-agency-process-flow-diagram-showing-privacy.webp",
      "Process flow diagram showing privacy-safe attribution from initial ad click through pipeline routing to verified outcome sync.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/ai-agents-for-marketing-agency",
      "ai-agents-for-marketing-agency-photo-controlled-execution-how-marketing.webp",
      "Marketing team reviewing a specialized AI agent workflow running on private infrastructure.",
      "79 / 53",
    ),
  ],
  "/services/ai-seo-marketing-agency/": [
    // [0] hero
    studioImg(
      "services/ai-seo-marketing-agency",
      "ai-seo-marketing-agency.webp",
      "Senior marketing director and technical search strategist reviewing organic query data on a large display in a sunlit office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/ai-seo-marketing-agency",
      "ai-seo-marketing-agency-comparison-diagram-showing-traditional.webp",
      "Comparison diagram showing traditional search agency manual tasks versus AI-native algorithmic workflows across six clear labels.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/ai-seo-marketing-agency",
      "ai-seo-marketing-agency-healthcare-compliance-director-search.webp",
      "Healthcare compliance director and search engineer reviewing private data governance protocols in an administrative office.",
      "79 / 53",
    ),
  ],
  "/services/healthcare-marketing-agency/": [
    // [0] hero
    studioImg(
      "services/healthcare-marketing-agency",
      "healthcare-marketing-agency.webp",
      "Hospital marketing director and clinical administrator reviewing ambulatory service-line scheduling data on a tablet.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/healthcare-marketing-agency",
      "healthcare-marketing-agency-ambulatory-intake-supervisor-marketing.webp",
      "Ambulatory intake supervisor and marketing coordinator reviewing patient inquiry routing at a clinical triage desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/healthcare-marketing-agency",
      "healthcare-marketing-agency-process-diagram-showing-three-healthcare.webp",
      "Process diagram showing three healthcare acquisition stages: intent capture, secure conversion, and downstream tracking.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/healthcare-marketing-agency",
      "healthcare-marketing-agency-health-system-marketing-executive.webp",
      "Health system marketing executive and analytics advisor evaluating appointment attribution reporting in a boardroom.",
      "79 / 53",
    ),
  ],
  "/services/marketing-attribution-agency/": [
    // [0] hero
    studioImg(
      "services/marketing-attribution-agency",
      "marketing-attribution-agency.webp",
      "Marketing director and data analyst reviewing cross-channel attribution data at a dual-monitor workstation in a sunlit conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/marketing-attribution-agency",
      "marketing-attribution-agency-healthcare-admissions-director-analyzing.webp",
      "Healthcare admissions director analyzing incoming call timestamps and CRM records across two monitors in an administrative office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/marketing-attribution-agency",
      "marketing-attribution-agency-diagram-showing-privacy-safe-attribution.webp",
      "Diagram showing a privacy-safe attribution pipeline flowing from user touchpoints through data stripping to secure server conversion signals.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/marketing-attribution-agency",
      "marketing-attribution-agency-photo-vetting-partner-infrastructure.webp",
      "Marketing and operations leaders reviewing an agency partner's infrastructure and contract terms.",
      "79 / 53",
    ),
  ],
  "/resources/hipaa-compliant-marketing/": [
    // [0] hero
    studioImg(
      "resources/hipaa-compliant-marketing",
      "hipaa-compliant-marketing.webp",
      "Healthcare marketing executive reviewing analytics data on a display in a clinic administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hipaa-compliant-marketing",
      "hipaa-compliant-marketing-outpatient-admissions-coordinator.webp",
      "Outpatient admissions coordinator working at a clinic check-in desk reviewing administrative intake documents.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/hipaa-compliant-marketing",
      "hipaa-compliant-marketing-diagram-showing-server-side-data.webp",
      "Diagram showing server-side data sanitization and privacy controls between a website and media platforms.",
      "79 / 53",
    ),
  ],
  "/services/healthcare-seo-company/": [
    // [0] hero
    studioImg(
      "services/healthcare-seo-company",
      "healthcare-seo-company.webp",
      "Healthcare marketing executive reviewing multi-location clinic operations on a tablet in a modern medical office reception area.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/healthcare-seo-company",
      "healthcare-seo-company-structured-data-hierarchy-diagram.webp",
      "Structured data hierarchy diagram illustrating connections between healthcare entities, clinic locations, and provider schema markup.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/healthcare-seo-company",
      "healthcare-seo-company-photo-compliant-review-acquisition-how.webp",
      "Patient checking in at a clinic front desk where a point-of-care review card sits on the counter.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/healthcare-seo-company",
      "healthcare-seo-company-healthcare-marketing-executives.webp",
      "Healthcare marketing executives reviewing agency evaluation criteria and local ranking data in a clinic conference room.",
      "79 / 53",
    ),
  ],
  "/resources/conversion-rate-optimization/": [
    // [0] hero
    studioImg(
      "resources/conversion-rate-optimization",
      "conversion-rate-optimization.webp",
      "Two senior marketing leaders reviewing lead generation analytics data together in a modern office setting.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/conversion-rate-optimization",
      "conversion-rate-optimization-intake-coordinator-managing-lead.webp",
      "An intake coordinator managing lead qualification status in a CRM system at their desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/conversion-rate-optimization",
      "conversion-rate-optimization-diagram-showing-four-phase-cro-cycle.webp",
      "Diagram showing the four-phase CRO cycle: diagnostic research, hypothesis, execution, and closed-loop attribution.",
      "79 / 53",
    ),
  ],
  "/services/fractional-cmo-agency/": [
    // [0] hero
    studioImg(
      "services/fractional-cmo-agency",
      "fractional-cmo-agency.webp",
      "A senior marketing executive and an operations director review attribution and conversion metrics on a display in a conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/fractional-cmo-agency",
      "fractional-cmo-agency-fractional-marketing-leader-collaborates.webp",
      "A fractional marketing leader collaborates with an internal marketing and operations team around an open workspace table.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/fractional-cmo-agency",
      "fractional-cmo-agency-horizontal-five-stage-conversion-diagram.webp",
      "A horizontal five-stage conversion diagram tracing paid traffic through landing pages, intake routing, CRM stages, and verified revenue.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/fractional-cmo-agency",
      "fractional-cmo-agency-photo-conversion-optimization-landing.webp",
      "Marketing operator reviewing landing page conversion and intake automation reports on a laptop.",
      "79 / 53",
    ),
  ],
  "/services/hipaa-compliant-marketing-companies/": [
    // [0] hero
    studioImg(
      "services/hipaa-compliant-marketing-companies",
      "hipaa-compliant-marketing-companies.webp",
      "Healthcare marketing director and data analyst reviewing privacy-compliant workflow diagrams on a dual-monitor workstation.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/hipaa-compliant-marketing-companies",
      "hipaa-compliant-marketing-companies-diagram-comparing-standard-client-side.webp",
      "Diagram comparing standard client-side tracking risks with specialist server-side privacy architecture for healthcare marketing.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/hipaa-compliant-marketing-companies",
      "hipaa-compliant-marketing-companies-compliance-officer-reviewing-data.webp",
      "Compliance officer reviewing data security settings and encryption status on a laptop screen during a stack audit.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/hipaa-compliant-marketing-companies",
      "hipaa-compliant-marketing-companies-checklist-infographic-listing-seven.webp",
      "Checklist infographic listing seven technical criteria including tag management, BAA coverage, and AI data sovereignty for vetting agencies.",
      "79 / 53",
    ),
  ],
  "/services/google-ads-agency/": [
    // [0] hero
    studioImg(
      "services/google-ads-agency",
      "google-ads-agency.webp",
      "Marketing director and paid media strategist reviewing search ad performance metrics in a sunlit conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/google-ads-agency",
      "google-ads-agency-healthcare-intake-coordinator-managing.webp",
      "Healthcare intake coordinator managing qualified patient calls in a modern, naturally lit administrative office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/google-ads-agency",
      "google-ads-agency-diagram-attribution-beyond-lead-tracking.webp",
      "Diagram showing attribution tracked past the lead to downstream admissions and revenue.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/google-ads-agency",
      "google-ads-agency-executive-leadership-team-reviewing-paid.webp",
      "Executive leadership team reviewing paid search governance and direct account ownership in a boardroom.",
      "79 / 53",
    ),
  ],
  "/resources/healthcare-marketing/": [
    // [0] hero
    studioImg(
      "resources/healthcare-marketing",
      "healthcare-marketing.webp",
      "Healthcare marketing executives reviewing health-system service-line acquisition data in a hospital administrative conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-marketing",
      "healthcare-marketing-clinical-operations-coordinator-hospital.webp",
      "Clinical operations coordinator and hospital administrator discussing patient scheduling workflows in an outpatient care center.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-marketing",
      "healthcare-marketing-comparison-diagram-illustrating.webp",
      "Comparison diagram illustrating disconnected ad lead queues versus direct electronic health record appointment scheduling.",
      "79 / 53",
    ),
  ],
  "/services/call-tracking-services/": [
    // [0] hero
    studioImg(
      "services/call-tracking-services",
      "call-tracking-services.webp",
      "Diagram illustrating the five-step process from call intake to revenue attribution in a professional service.",
      "79 / 53",
    ),
  ],
  "/services/addiction-treatment-marketing-agency/": [
    // [0] hero
    studioImg(
      "services/addiction-treatment-marketing-agency",
      "addiction-treatment-marketing-agency.webp",
      "Behavioral health admissions director and marketing executive reviewing operational census data on a computer monitor in an office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/addiction-treatment-marketing-agency",
      "addiction-treatment-marketing-agency-photo-operational-stakes-addiction.webp",
      "Treatment center leaders weighing agency options around a conference table.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/addiction-treatment-marketing-agency",
      "addiction-treatment-marketing-agency-flow-diagram-compliant-server-side.webp",
      "Flow diagram of a compliant server-side tracking architecture separating user identifiers from conversion milestones.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/addiction-treatment-marketing-agency",
      "addiction-treatment-marketing-agency-admissions-coordinator-wearing-headset.webp",
      "Admissions coordinator wearing a headset at an intake desk while a supervisor reviews verification notes.",
      "79 / 53",
    ),
  ],
  "/services/multi-location-seo-services/": [
    // [0] hero
    studioImg(
      "services/multi-location-seo-services",
      "multi-location-seo-services.webp",
      "A healthcare marketing director examines regional clinic locations on an administrative office display.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/multi-location-seo-services",
      "multi-location-seo-services-diagram-outlining-four-operational.webp",
      "Diagram outlining four operational layers of multi-location SEO from technical architecture to daily review velocity.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/multi-location-seo-services",
      "multi-location-seo-services-photo-point-service-reputation-solving.webp",
      "Customer leaving a review from a point-of-service card at a multi-location business.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/multi-location-seo-services",
      "multi-location-seo-services-marketing-leadership-reviews-multi.webp",
      "Marketing leadership reviews multi-location search attribution and intake performance metrics in a conference room.",
      "79 / 53",
    ),
  ],
  "/resources/multi-location-seo/": [
    // [0] hero
    studioImg(
      "resources/multi-location-seo",
      "multi-location-seo.webp",
      "A healthcare marketing director reviews multi-facility performance metrics on an office display.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/multi-location-seo",
      "multi-location-seo-diagram-showing-nested-subdirectory-site.webp",
      "Diagram showing a nested subdirectory site structure from root domain to individual facility pages.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/multi-location-seo",
      "multi-location-seo-medical-clinic-receptionist-presents.webp",
      "A medical clinic receptionist presents a contactless review card to a visitor at the check-in desk.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/multi-location-seo",
      "multi-location-seo-two-healthcare-operations-executives.webp",
      "Two healthcare operations executives analyze regional market growth data in a modern conference room.",
      "79 / 53",
    ),
  ],
  "/services/reputation-management-agency/": [
    // [0] hero
    studioImg(
      "services/reputation-management-agency",
      "reputation-management-agency.webp",
      "Clinic front-desk coordinator handing an NFC review card to a visitor at checkout in a modern healthcare clinic lobby.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/reputation-management-agency",
      "reputation-management-agency-process-diagram-illustrating-five-step.webp",
      "Process diagram illustrating the five-step operational pipeline from point-of-service review collection to qualified patient intake.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/reputation-management-agency",
      "reputation-management-agency-smartphone-tapping-nfc-review-card.webp",
      "Smartphone tapping an NFC review card on a clinic reception desk to open the direct Google review interface.",
      "79 / 53",
    ),
  ],
  "/services/google-review-cards/": [
    // [0] hero
    studioImg(
      "services/google-review-cards",
      "google-review-cards.webp",
      "A client taps a smartphone against an acrylic Google review stand at a modern outpatient clinic reception desk.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/google-review-cards",
      "google-review-cards-process-diagram-showing-nfc-qr-card.webp",
      "A process diagram showing an NFC and QR card transmitting point-of-service data directly to a Google review submission modal.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/google-review-cards",
      "google-review-cards-compliance-matrix-comparing-approved.webp",
      "A compliance matrix comparing approved review collection practices against prohibited review gating and incentives.",
      "79 / 53",
    ),
  ],
  "/services/meta-ads-agency/": [
    // [0] hero
    studioImg(
      "services/meta-ads-agency",
      "meta-ads-agency.webp",
      "Marketing director and paid media strategist review campaign metrics on a monitor in a bright modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/meta-ads-agency",
      "meta-ads-agency-healthcare-operations-team-plans-patient.webp",
      "Healthcare operations team plans a patient intake acquisition workflow on a glass board in a bright conference room.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/meta-ads-agency",
      "meta-ads-agency-four-step-diagram-showing-systematic.webp",
      "Four-step diagram showing a systematic paid social creative testing workflow from library audit to scaled delivery.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/meta-ads-agency",
      "meta-ads-agency-senior-media-engineer-reviews-server.webp",
      "Senior media engineer reviews server-side attribution logs at a multi-monitor workstation in a sunlit studio.",
      "79 / 53",
    ),
  ],
  "/services/generative-engine-optimization-agency/": [
    // [0] hero
    studioImg(
      "services/generative-engine-optimization-agency",
      "generative-engine-optimization-agency.webp",
      "Marketing executives reviewing technical entity architecture and generative engine optimization strategy in a conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/generative-engine-optimization-agency",
      "generative-engine-optimization-agency-process-diagram-comparing-legacy-search.webp",
      "Process diagram comparing legacy search index retrieval with generative engine optimization citation synthesis.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/generative-engine-optimization-agency",
      "generative-engine-optimization-agency-photo-how-evaluate-generative-engine.webp",
      "Marketing leader comparing generative engine optimization proposals on a laptop.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/generative-engine-optimization-agency",
      "generative-engine-optimization-agency-photo-identifying-best-generative-engine.webp",
      "Marketing team reviewing generative engine optimization options for a regulated healthcare brand.",
      "79 / 53",
    ),
  ],
  "/services/hospital-marketing-company/": [
    // [0] hero
    studioImg(
      "services/hospital-marketing-company",
      "hospital-marketing-company.webp",
      "Hospital marketing executives analyze patient service line volume data on a digital display in a modern administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/hospital-marketing-company",
      "hospital-marketing-company-hospital-marketing-director-physician.webp",
      "A hospital marketing director and a physician department chair review intake metrics together at a conference table.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/hospital-marketing-company",
      "hospital-marketing-company-five-point-comparison-framework-diagram.webp",
      "A five-point comparison framework diagram detailing criteria for evaluating a specialized hospital marketing agency.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/hospital-marketing-company",
      "hospital-marketing-company-photo-what-distinguishes-best-hospital.webp",
      "Hospital marketing director comparing specialist and generalist agency proposals.",
      "79 / 53",
    ),
  ],
  "/services/conversion-rate-optimization-agency/": [
    // [0] hero
    studioImg(
      "services/conversion-rate-optimization-agency",
      "conversion-rate-optimization-agency.webp",
      "Executives reviewing conversion funnel analytics on a monitor in a modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/conversion-rate-optimization-agency",
      "conversion-rate-optimization-agency-photo-what-modern-conversion-rate.webp",
      "Marketing analyst reviewing conversion rate results on a monitor in an office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/conversion-rate-optimization-agency",
      "conversion-rate-optimization-agency-photo-core-capabilities-lead-capture.webp",
      "Team reviewing lead capture and ecommerce conversion data on a shared screen.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/conversion-rate-optimization-agency",
      "conversion-rate-optimization-agency-strategist-evaluating-data-governance.webp",
      "Strategist evaluating data governance and attribution models during a meeting.",
      "79 / 53",
    ),
  ],
  "/services/healthcare-ppc-services/": [
    // [0] hero
    studioImg(
      "services/healthcare-ppc-services",
      "healthcare-ppc-services.webp",
      "Healthcare marketing executives reviewing clinic patient acquisition and paid search performance metrics.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/healthcare-ppc-services",
      "healthcare-ppc-services-comparison-chart-showing-differences.webp",
      "Comparison chart showing differences between general consumer PPC and privacy-compliant healthcare PPC.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/healthcare-ppc-services",
      "healthcare-ppc-services-architecture-diagram-showing-privacy.webp",
      "Architecture diagram showing privacy-compliant offline conversion tracking for healthcare search advertising.",
      "79 / 53",
    ),
  ],
  "/resources/marketing-attribution/": [
    // [0] hero
    studioImg(
      "resources/marketing-attribution",
      "marketing-attribution.webp",
      "Two marketing professionals reviewing a data dashboard together in a bright office setting.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/marketing-attribution",
      "marketing-attribution-photo-what-marketing-attribution-why.webp",
      "Marketing analyst comparing platform-reported conversions against intake records.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/marketing-attribution",
      "marketing-attribution-diagram-how-build-accountable-first.webp",
      "Diagram of a first-party marketing attribution architecture from ad click to closed revenue.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/marketing-attribution",
      "marketing-attribution-photo-decision-framework-matching.webp",
      "Leadership team matching an attribution method to their sales cycle at a whiteboard.",
      "79 / 53",
    ),
  ],
  "/resources/healthcare-ppc/": [
    // [0] hero
    studioImg(
      "resources/healthcare-ppc",
      "healthcare-ppc.webp",
      "Healthcare clinical director and intake coordinator collaborating at an office desk in a bright medical administrative suite.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-ppc",
      "healthcare-ppc-diagram-what-healthcare-ppc-why-does.webp",
      "Diagram of a healthcare paid search architecture connecting ads, intake, and admissions.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-ppc",
      "healthcare-ppc-admissions-coordinator-wearing-headset.webp",
      "Admissions coordinator wearing a headset at an intake workstation handling a confidential patient inquiry call.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/healthcare-ppc",
      "healthcare-ppc-senior-search-strategist-healthcare.webp",
      "Senior search strategist and healthcare marketing executive reviewing paid media trends in a naturally lit conference room.",
      "79 / 53",
    ),
  ],
  "/services/landing-page-optimization-agency/": [
    // [0] hero
    studioImg(
      "services/landing-page-optimization-agency",
      "landing-page-optimization-agency.webp",
      "A marketing executive analyzing conversion metrics on a dual-monitor workstation.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/landing-page-optimization-agency",
      "landing-page-optimization-agency-six-step-diagram-detailing-delivery.webp",
      "A six-step diagram detailing the delivery pipeline of a specialist conversion agency.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/landing-page-optimization-agency",
      "landing-page-optimization-agency-marketing-operations-team-reviewing.webp",
      "A marketing operations team reviewing regulated landing page wireframes and compliance items.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/landing-page-optimization-agency",
      "landing-page-optimization-agency-technical-checklist-infographic.webp",
      "A technical checklist infographic for evaluating landing page optimization vendors.",
      "79 / 53",
    ),
  ],
  "/services/ai-marketing-agency/": [
    // [0] hero
    studioImg(
      "services/ai-marketing-agency",
      "ai-marketing-agency.webp",
      "A corporate marketing leader reviewing performance data on a multi-screen workstation.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/ai-marketing-agency",
      "ai-marketing-agency-two-operations-leaders-reviewing-custom.webp",
      "Two operations leaders reviewing custom workflow architecture on a glass whiteboard.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/ai-marketing-agency",
      "ai-marketing-agency-marketing-strategist-discussing-secure.webp",
      "Marketing strategist discussing secure data systems with a corporate leadership team.",
      "79 / 53",
    ),
  ],
  "/resources/ai-marketing/": [
    // [0] hero
    studioImg(
      "resources/ai-marketing",
      "ai-marketing-capital-allocation-four-categories-infographic.webp",
      "Infographic comparing four capital allocation categories for AI marketing: working media, data infrastructure, AI capability, and governance",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/ai-marketing",
      "ai-marketing-hospital-entrance-dusk-showing-regulated.webp",
      "Hospital entrance at dusk showing regulated healthcare setting for paid media and attribution work",
      "3 / 2",
    ),
  ],
  "/services/performance-max-agency/": [
    // [0] hero
    studioImg(
      "services/performance-max-agency",
      "performance-max-agency.webp",
      "An executive marketing director and paid media operator reviewing multi-channel campaign architectures on dual monitors.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/performance-max-agency",
      "performance-max-agency-diagram-comparing-ungoverned-automated.webp",
      "Diagram comparing ungoverned automated bidding against managed governance controls in paid media.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/performance-max-agency",
      "performance-max-agency-agency-strategist-presenting-account.webp",
      "An agency strategist presenting account audit findings and performance charts to a leadership team.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/performance-max-agency",
      "performance-max-agency-photo-closed-loop-attribution-tracking.webp",
      "Analyst tracing offline conversions and pipeline milestones back to Performance Max campaigns.",
      "79 / 53",
    ),
  ],
  "/resources/palm-beach-county-local-visibility-audit/": [
    // [0] hero
    studioImg(
      "resources/palm-beach-county-local-visibility-audit",
      "palm-beach-county-local-visibility-audit.webp",
      "A marketing director and operations lead examine local digital visibility metrics on a monitor in a bright West Palm Beach office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/palm-beach-county-local-visibility-audit",
      "palm-beach-county-local-visibility-audit-process-diagram-showing-five-core.webp",
      "Process diagram showing five core dimensions evaluated across Palm Beach County commercial service domains.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/palm-beach-county-local-visibility-audit",
      "palm-beach-county-local-visibility-audit-photo-4-content-architecture.webp",
      "Photo representing content architecture benchmarking for regional agency and provider pages.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/palm-beach-county-local-visibility-audit",
      "palm-beach-county-local-visibility-audit-operations-lead-audits-location-records.webp",
      "An operations lead audits location records and aggregator listings on a laptop in a modern Boca Raton office.",
      "79 / 53",
    ),
  ],
  "/resources/local-seo-call-tracking/": [
    // [0] hero
    studioImg(
      "resources/local-seo-call-tracking",
      "local-seo-call-tracking.webp",
      "An operations director analyzing intake and call routing dashboards on dual office monitors.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/local-seo-call-tracking",
      "local-seo-call-tracking-process-flow-diagram-showing-disconnect.webp",
      "Process flow diagram showing the disconnect between mobile call button clicks and completed conversations.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/local-seo-call-tracking",
      "local-seo-call-tracking-funnel-diagram-outlining-four.webp",
      "Funnel diagram outlining the four operational stages of local search lead qualification.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/local-seo-call-tracking",
      "local-seo-call-tracking-healthcare-intake-manager-reviewing.webp",
      "A healthcare intake manager reviewing encrypted telephony data and compliance logs in a private office.",
      "79 / 53",
    ),
  ],
  "/resources/city-pages-for-service-businesses/": [
    // [0] hero
    studioImg(
      "resources/city-pages-for-service-businesses",
      "service-area-pages.webp",
      "A regional operations manager and dispatch lead review municipal service territories on a fleet logistics screen.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/city-pages-for-service-businesses",
      "service-area-pages-commercial-facility-manager-reviews.webp",
      "A commercial facility manager reviews contractor landing pages and dispatch details on a laptop at a desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/city-pages-for-service-businesses",
      "service-area-pages-four-part-wireframe-diagram-showing-high.webp",
      "A four-part wireframe diagram showing the high-converting content layout for a multi-territory service area page.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/city-pages-for-service-businesses",
      "service-area-pages-technical-seo-specialist-developer.webp",
      "A technical SEO specialist and developer review structured JSON-LD code for service area business markup on a monitor.",
      "79 / 53",
    ),
  ],
  "/resources/google-maps-vs-website-rankings/": [
    // [0] hero
    studioImg(
      "resources/google-maps-vs-website-rankings",
      "google-maps-vs-organic-rankings.webp",
      "A marketing director examines website analytics and map data side by side on dual monitors.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/google-maps-vs-website-rankings",
      "google-maps-vs-organic-rankings-healthcare-leader-reviews-mobile-local.webp",
      "A healthcare leader reviews mobile local search results in a modern office lobby.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/google-maps-vs-website-rankings",
      "google-maps-vs-organic-rankings-comparison-diagram-showing-limitations.webp",
      "Comparison diagram showing limitations of static rank tracking versus multi-node geocoded grids.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/google-maps-vs-website-rankings",
      "google-maps-vs-organic-rankings-two-professionals-review-search.webp",
      "Two professionals review search visibility data together in a bright conference room.",
      "79 / 53",
    ),
  ],
  "/resources/healthcare-marketing-budget-by-location/": [
    // [0] hero
    studioImg(
      "resources/healthcare-marketing-budget-by-location",
      "healthcare-marketing-budget-allocation-by.webp",
      "Healthcare and marketing leaders reviewing multi-site performance dashboards in a modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-marketing-budget-by-location",
      "healthcare-marketing-budget-allocation-by-healthcare-admissions-coordinator.webp",
      "Healthcare admissions coordinator managing patient capacity schedules on dual monitors.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-marketing-budget-by-location",
      "healthcare-marketing-budget-allocation-by-diagram-illustrating-three-tier.webp",
      "Diagram illustrating the three-tier healthcare marketing budget allocation framework.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/healthcare-marketing-budget-by-location",
      "healthcare-marketing-budget-allocation-by-process-table-outlining-weekly-media.webp",
      "Process table outlining the weekly media pacing and census governance cadence.",
      "79 / 53",
    ),
  ],
  "/resources/hospital-marketing-agency-rfp/": [
    // [0] hero
    studioImg(
      "resources/hospital-marketing-agency-rfp",
      "hospital-marketing-agency-rfp.webp",
      "Healthcare executives reviewing an agency RFP in a modern board room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hospital-marketing-agency-rfp",
      "hospital-marketing-agency-rfp-clinical-operations-director-reviewing.webp",
      "Clinical operations director reviewing hospital data pipelines on a monitor.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/hospital-marketing-agency-rfp",
      "hospital-marketing-agency-rfp-diagram-showing-clinical-service-line.webp",
      "Diagram showing clinical service line capacity and media action alignment.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/hospital-marketing-agency-rfp",
      "hospital-marketing-agency-rfp-infographic-hospital-marketing-agency.webp",
      "Infographic of the hospital marketing agency evaluation scoring matrix.",
      "79 / 53",
    ),
  ],
  "/resources/42-cfr-part-2-marketing-data/": [
    // [0] hero
    studioImg(
      "resources/42-cfr-part-2-marketing-data",
      "42-cfr-part-2-marketing.webp",
      "Treatment center marketing executive and admissions director reviewing acquisition metrics in an administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/42-cfr-part-2-marketing-data",
      "42-cfr-part-2-marketing-healthcare-compliance-officer-marketing.webp",
      "Healthcare compliance officer and marketing director reviewing data privacy regulations in a private office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/42-cfr-part-2-marketing-data",
      "42-cfr-part-2-marketing-diagram-compliant-technical-architecture.webp",
      "Diagram of a compliant technical architecture for addiction treatment marketing data privacy.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/42-cfr-part-2-marketing-data",
      "42-cfr-part-2-marketing-admissions-leadership-team-data-analyst.webp",
      "Admissions leadership team and data analyst collaborating on operational milestones in an administrative suite.",
      "79 / 53",
    ),
  ],
  "/resources/referral-and-digital-attribution-treatment-centers/": [
    // [0] hero
    studioImg(
      "resources/referral-and-digital-attribution-treatment-centers",
      "referral-vs-digital-marketing-attribution-for.webp",
      "Healthcare executives reviewing marketing attribution dashboards in a conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/referral-and-digital-attribution-treatment-centers",
      "referral-vs-digital-marketing-attribution-for-photo-core-conflict-business-development.webp",
      "Photo representing the conflict between business development outreach and paid acquisition.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/referral-and-digital-attribution-treatment-centers",
      "referral-vs-digital-marketing-attribution-for-diagram-showing-workflow-incoming-calls.webp",
      "Diagram showing the workflow from incoming calls to locked CRM attribution fields.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/referral-and-digital-attribution-treatment-centers",
      "referral-vs-digital-marketing-attribution-for-cfo-analyzing-financial-spreadsheets.webp",
      "CFO analyzing financial spreadsheets and unit economics data at a desk.",
      "79 / 53",
    ),
  ],
  "/resources/cost-per-admission-rehab/": [
    // [0] hero
    studioImg(
      "resources/cost-per-admission-rehab",
      "cost-per-admission-rehab.webp",
      "Behavioral health operations director and admissions lead reviewing intake reports in a brightly lit administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/cost-per-admission-rehab",
      "cost-per-admission-rehab-comparison-diagram-contrasting-direct.webp",
      "Comparison diagram contrasting direct media cost per admission with fully loaded acquisition cost components.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/cost-per-admission-rehab",
      "cost-per-admission-rehab-healthcare-compliance-officer-reviewing.webp",
      "Healthcare compliance officer reviewing facility licensure and certification documentation at an office desk.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/cost-per-admission-rehab",
      "cost-per-admission-rehab-dedicated-behavioral-health-admissions.webp",
      "Dedicated behavioral health admissions coordinator wearing a headset while assisting an intake caller at a quiet desk.",
      "79 / 53",
    ),
  ],
  "/resources/ai-search-healthcare-patient-acquisition/": [
    // [0] hero
    studioImg(
      "resources/ai-search-healthcare-patient-acquisition",
      "ai-search-healthcare-patient-acquisition.webp",
      "Mother searching on phone at kitchen table at night for her son's behavioral health care options.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/ai-search-healthcare-patient-acquisition",
      "ai-search-healthcare-patient-acquisition-empty-admissions-phone-station-intake.webp",
      "Empty admissions phone station and intake folders in healthcare facility corridor at dusk.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/ai-search-healthcare-patient-acquisition",
      "ai-search-healthcare-patient-acquisition-four-step-vertical-flow-diagram-creating.webp",
      "Four-step vertical flow diagram for creating intake-legible content: inventory questions, assign canonical page, make facts machine-readable, wire answers to intake.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/ai-search-healthcare-patient-acquisition",
      "ai-search-healthcare-patient-acquisition-guardrail-along-winding-mountain-road.webp",
      "Guardrail along winding mountain road at dawn illustrating compliance constraints in healthcare strategy.",
      "3 / 2",
    ),
  ],
  "/resources/choose-mental-health-marketing-agency/": [
    // [0] hero
    studioImg(
      "resources/choose-mental-health-marketing-agency",
      "best-mental-health-marketing-agency.webp",
      "Practice director analyzing appointment intake data on a modern office computer.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/choose-mental-health-marketing-agency",
      "best-mental-health-marketing-agency-clinic-intake-coordinator-managing.webp",
      "Clinic intake coordinator managing patient inquiries at a front desk workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/choose-mental-health-marketing-agency",
      "best-mental-health-marketing-agency-infographic-agency-comparison-framework.webp",
      "Infographic comparing generalist firms with specialized healthcare marketing operators.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/choose-mental-health-marketing-agency",
      "best-mental-health-marketing-agency-practice-leaders-reviewing-strategic.webp",
      "Practice leaders reviewing strategic agency evaluation criteria in a meeting room.",
      "79 / 53",
    ),
  ],
  "/resources/healthcare-campaign-management-systems/": [
    // [0] hero
    studioImg(
      "resources/healthcare-campaign-management-systems",
      "healthcare-campaign-management-system.webp",
      "Healthcare marketing director and intake leader reviewing digital acquisition reports in a modern administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-campaign-management-systems",
      "healthcare-campaign-management-system-diagram-showing-six-core-stages-server.webp",
      "Diagram showing the six core stages of a server-side healthcare campaign management system pipeline.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-campaign-management-systems",
      "healthcare-campaign-management-system-clinical-intake-coordinator-wearing.webp",
      "Clinical intake coordinator wearing a headset at an admissions workstation managing an incoming inquiry.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/healthcare-campaign-management-systems",
      "healthcare-campaign-management-system-two-healthcare-data-engineers-reviewing.webp",
      "Two healthcare data engineers reviewing local secure server infrastructure in a private facility rack room.",
      "79 / 53",
    ),
  ],
  "/resources/healthcare-crm-marketing-integration/": [
    // [0] hero
    studioImg(
      "resources/healthcare-crm-marketing-integration",
      "healthcare-crm-integration.webp",
      "Healthcare executives reviewing marketing attribution dashboards in a bright modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-crm-marketing-integration",
      "healthcare-crm-integration-admissions-coordinator-reviewing-patient.webp",
      "Admissions coordinator reviewing patient inquiry records on dual monitors.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-crm-marketing-integration",
      "healthcare-crm-integration-architectural-workflow-diagram-showing.webp",
      "Architectural workflow diagram showing secure offline conversion tracking steps.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/healthcare-crm-marketing-integration",
      "healthcare-crm-integration-analysts-reviewing-marketing-attribution.webp",
      "Analysts reviewing marketing attribution charts and multi-touch data limitations.",
      "79 / 53",
    ),
  ],
  "/ai-edge/ai-governance/": [
    // [0] hero
    studioImg(
      "ai-edge/ai-governance",
      "ai-governance.webp",
      "Empty hospital corridor at night representing AI governance for healthcare marketing leaders",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "ai-edge/ai-governance",
      "ai-governance-admissions-coordinator-reviewing-intake.webp",
      "Admissions coordinator reviewing intake form at 2 a.m. workstation",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "ai-edge/ai-governance",
      "ai-governance-printed-risk-assessment-checklist-model.webp",
      "Printed risk assessment checklist for model selection in healthcare marketing",
      "3 / 2",
    ),
  ],
  "/services/hospital-seo/": [
    // [0] hero
    studioImg(
      "services/hospital-seo",
      "hospital-seo.webp",
      "Hospital marketing leadership and clinical directors reviewing digital patient acquisition and service line performance.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/hospital-seo",
      "hospital-seo-diagram-showing-health-system-entity.webp",
      "Diagram showing health system entity architecture connecting parent organization, hospital facilities, service lines, and physician profiles.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/hospital-seo",
      "hospital-seo-healthcare-digital-strategist-analyzing.webp",
      "Healthcare digital strategist analyzing technical crawl performance and multi-site indexing health across dual monitors.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/hospital-seo",
      "hospital-seo-comparison-chart-contrasting-vanity.webp",
      "Comparison chart contrasting vanity website traffic metrics with full-funnel hospital appointment attribution pathways.",
      "79 / 53",
    ),
  ],
  "/resources/behavioral-health-intake-automation/": [
    // [0] hero
    studioImg(
      "resources/behavioral-health-intake-automation",
      "behavioral-health-intake-automation.webp",
      "An admissions coordinator reviewing a secure intake dashboard in a modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/behavioral-health-intake-automation",
      "behavioral-health-intake-automation-admissions-team-reviewing-intake.webp",
      "An admissions team reviewing intake performance metrics in a conference room.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/behavioral-health-intake-automation",
      "behavioral-health-intake-automation-process-diagram-illustrating-intake.webp",
      "Process diagram illustrating the intake automation architecture from ad click to admission.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/behavioral-health-intake-automation",
      "behavioral-health-intake-automation-healthcare-operations-leader-reviewing.webp",
      "A healthcare operations leader reviewing data governance and compliance controls.",
      "79 / 53",
    ),
  ],
  "/resources/healthcare-intake-marketing-data-dictionary/": [
    // [0] hero
    studioImg(
      "resources/healthcare-intake-marketing-data-dictionary",
      "healthcare-marketing-data-dictionary.webp",
      "Healthcare marketing and admissions leaders reviewing intake performance dashboards together.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-intake-marketing-data-dictionary",
      "healthcare-marketing-data-dictionary-admissions-coordinator-entering.webp",
      "Admissions coordinator entering structured inquiry notes into a healthcare CRM.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-intake-marketing-data-dictionary",
      "healthcare-marketing-data-dictionary-process-diagram-showing-marketing-intake.webp",
      "Process diagram showing the marketing-to-intake pipeline from media spend to admissions.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/healthcare-intake-marketing-data-dictionary",
      "healthcare-marketing-data-dictionary-healthcare-technology-strategist.webp",
      "Healthcare technology strategist reviewing privacy-safe attribution architecture.",
      "79 / 53",
    ),
  ],
  "/resources/rehab-marketing-rfp/": [
    // [0] hero
    studioImg(
      "resources/rehab-marketing-rfp",
      "rehab-marketing-agency-rfp.webp",
      "Executive team reviewing an agency RFP document in a modern conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/rehab-marketing-rfp",
      "rehab-marketing-agency-rfp-four-step-procurement-workflow-diagram.webp",
      "A four-step procurement workflow diagram outlining core RFP evaluation areas.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/rehab-marketing-rfp",
      "rehab-marketing-agency-rfp-five-stage-conversion-flowchart-tracing.webp",
      "A five-stage conversion flowchart tracing the path from digital click to admission.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/rehab-marketing-rfp",
      "rehab-marketing-agency-rfp-admissions-leaders-reviewing-technical.webp",
      "Admissions leaders reviewing technical scorecard criteria on a laptop.",
      "79 / 53",
    ),
  ],
  "/resources/measure-patient-acquisition-roi/": [
    // [0] hero
    studioImg(
      "resources/measure-patient-acquisition-roi",
      "how-to-measure-patient-acquisition-roi.webp",
      "Healthcare marketing and finance leaders reviewing patient acquisition data on a monitor.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/measure-patient-acquisition-roi",
      "how-to-measure-patient-acquisition-roi-diagram-breaking-down-revenue-cost.webp",
      "Diagram breaking down the revenue and cost inputs in the healthcare acquisition ROI formula.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/measure-patient-acquisition-roi",
      "how-to-measure-patient-acquisition-roi-analytics-engineer-reviewing-secure.webp",
      "Analytics engineer reviewing secure offline conversion attribution workflows on dual monitors.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/measure-patient-acquisition-roi",
      "how-to-measure-patient-acquisition-roi-admissions-team-lead-operations-manager.webp",
      "Admissions team lead and operations manager reviewing multi-location intake metrics.",
      "79 / 53",
    ),
  ],
  "/resources/mental-health-content-marketing/": [
    // [0] hero
    studioImg(
      "resources/mental-health-content-marketing",
      "mental-health-content-marketing.webp",
      "Clinical director and marketing strategist reviewing educational health manuscripts in a modern outpatient clinic office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/mental-health-content-marketing",
      "mental-health-content-marketing-licensed-psychiatrist-reviewing-medical.webp",
      "Licensed psychiatrist reviewing medical source citations and diagnostic copy at an office desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/mental-health-content-marketing",
      "mental-health-content-marketing-photo-privacy-architecture-regulatory.webp",
      "Photo representing privacy architecture and regulatory constraints in mental health promotion.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/mental-health-content-marketing",
      "mental-health-content-marketing-six-step-clinical-review-publishing.webp",
      "Six-step clinical review and publishing workflow diagram showing stages from intent identification to sign-off.",
      "79 / 53",
    ),
  ],
  "/resources/hospital-service-line-marketing/": [
    // [0] hero
    studioImg(
      "resources/hospital-service-line-marketing",
      "hospital-service-line-marketing.webp",
      "Hospital marketing and service line leaders reviewing regional patient acquisition metrics in a boardroom.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hospital-service-line-marketing",
      "hospital-service-line-marketing-compliance-officer-digital-lead.webp",
      "Compliance officer and digital lead reviewing healthcare ad restrictions and privacy guidelines.",
      "79 / 53",
    ),
  ],
  "/resources/outpatient-rehab-seo/": [
    // [0] hero
    studioImg(
      "resources/outpatient-rehab-seo",
      "outpatient-rehab-seo.webp",
      "Comparison diagram contrasting residential and outpatient search mechanics and logistics.",
      "79 / 53",
    ),
    // [1] section image
    studioImg(
      "resources/outpatient-rehab-seo",
      "outpatient-rehab-seo-admissions-coordinator-reviewing.webp",
      "Admissions coordinator reviewing schedule options and insurance verification on a dual-monitor workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/outpatient-rehab-seo",
      "outpatient-rehab-seo-healthcare-marketing-executive-auditing.webp",
      "Healthcare marketing executive auditing local search rankings and Google Business Profile analytics.",
      "79 / 53",
    ),
  ],
  "/resources/detox-center-seo/": [
    // [0] hero
    studioImg(
      "resources/detox-center-seo",
      "detox-center-seo.webp",
      "An admissions coordinator at a medical detox center speaks with a caller while reviewing intake logistics.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/detox-center-seo",
      "detox-center-seo-comparison-diagram-showing-acute-detox.webp",
      "Comparison diagram showing acute detox search intent versus evaluative rehab research behaviors.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/detox-center-seo",
      "detox-center-seo-detox-clinical-director-operations.webp",
      "A detox clinical director and operations manager review regional hospital transport logistics on a tablet.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/detox-center-seo",
      "detox-center-seo-detox-facility-leadership-reviewing.webp",
      "Detox facility leadership reviewing intake performance metrics and admissions data during an executive meeting.",
      "79 / 53",
    ),
  ],
  "/resources/hospital-marketing-ideas/": [
    // [0] hero
    studioImg(
      "resources/hospital-marketing-ideas",
      "hospital-marketing-ideas.webp",
      "Hospital executives reviewing service-line dashboards and clinical scheduling capacity in a conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hospital-marketing-ideas",
      "hospital-marketing-ideas-digital-media-manager-aligning-paid.webp",
      "Digital media manager aligning paid search campaigns with live hospital outpatient appointment schedules.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/hospital-marketing-ideas",
      "hospital-marketing-ideas-diagram-4-eliminate-intake-friction.webp",
      "Diagram of removing intake friction between lead generation and scheduled encounters.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/hospital-marketing-ideas",
      "hospital-marketing-ideas-photo-6-build-high-value-educational.webp",
      "Photo representing educational content built around the patient care journey.",
      "79 / 53",
    ),
  ],
  "/resources/therapist-marketing-guide/": [
    // [0] hero
    studioImg(
      "resources/therapist-marketing-guide",
      "therapist-marketing.webp",
      "Practice owner reviewing patient acquisition dashboards in a modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/therapist-marketing-guide",
      "therapist-marketing-practice-director-operations-manager.webp",
      "Practice director and operations manager analyzing clinician utilization.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/therapist-marketing-guide",
      "therapist-marketing-process-diagram-showing-multi-channel.webp",
      "Process diagram showing the multi-channel patient intake and response workflow.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/therapist-marketing-guide",
      "therapist-marketing-photo-privacy-tracking-regulatory.webp",
      "Photo representing privacy, tracking, and regulatory guardrails for mental health practices.",
      "79 / 53",
    ),
  ],
  "/resources/healthcare-tracking-pixel-audit/": [
    // [0] hero
    studioImg(
      "resources/healthcare-tracking-pixel-audit",
      "healthcare-website-compliance.webp",
      "Healthcare marketing and operations leaders reviewing digital compliance data together.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-tracking-pixel-audit",
      "healthcare-website-compliance-flowchart-illustrating-patient-data.webp",
      "Flowchart illustrating patient data routing and regulatory compliance assessment.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-tracking-pixel-audit",
      "healthcare-website-compliance-diagram-detailing-four-phases-healthcare.webp",
      "Diagram detailing the four phases of a healthcare website tracking audit.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/healthcare-tracking-pixel-audit",
      "healthcare-website-compliance-comparison-diagram-showing-vanity-lead.webp",
      "Comparison diagram showing vanity lead funnels versus governed admission attribution.",
      "79 / 53",
    ),
  ],
  "/resources/marketing-to-admissions-scorecard/": [
    // [0] hero
    studioImg(
      "resources/marketing-to-admissions-scorecard",
      "admissions-marketing.webp",
      "Healthcare marketing executive reviewing an admissions performance dashboard in a modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/marketing-to-admissions-scorecard",
      "admissions-marketing-admissions-director-intake-coordinator.webp",
      "Admissions director and intake coordinator collaborating over an intake workflow diagram.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/marketing-to-admissions-scorecard",
      "admissions-marketing-diagram-data-architecture-connecting-ad.webp",
      "Diagram of connecting ad platforms to a CRM without compliance exposure.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/marketing-to-admissions-scorecard",
      "admissions-marketing-healthcare-operations-leader-analyzing.webp",
      "Healthcare operations leader analyzing phone tree metrics and staffing schedules on a tablet.",
      "79 / 53",
    ),
  ],
  "/resources/hipaa-compliant-email-marketing/": [
    // [0] hero
    studioImg(
      "resources/hipaa-compliant-email-marketing",
      "hipaa-compliant-email-marketing.webp",
      "A marketing director reviewing encrypted email infrastructure and campaign dashboards on a multi-monitor workstation.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hipaa-compliant-email-marketing",
      "hipaa-compliant-email-marketing-healthcare-operations-leader-specialist.webp",
      "A healthcare operations leader and IT specialist reviewing network security and data segregation diagrams.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/hipaa-compliant-email-marketing",
      "hipaa-compliant-email-marketing-diagram-consent-architecture.webp",
      "Diagram of consent architecture separating healthcare operations from HIPAA marketing.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/hipaa-compliant-email-marketing",
      "hipaa-compliant-email-marketing-photo-measuring-email-pipeline.webp",
      "Photo representing email pipeline measurement through to admissions.",
      "79 / 53",
    ),
  ],
  "/problems/reduce-cpa/": [
    // [0] hero
    studioImg(
      "problems/reduce-cpa",
      "lower-cpa-ppc-agency.webp",
      "Healthcare executives reviewing admission performance dashboards in a conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "problems/reduce-cpa",
      "lower-cpa-ppc-agency-intake-coordinator-reviewing-patient.webp",
      "Intake coordinator reviewing patient inquiries on a workstation headset.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "problems/reduce-cpa",
      "lower-cpa-ppc-agency-four-step-process-diagram-illustrating.webp",
      "Four-step process diagram illustrating the paid media audit workflow from search queries to admissions.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "problems/reduce-cpa",
      "lower-cpa-ppc-agency-media-strategist-clinical-operations.webp",
      "Media strategist and clinical operations leader collaborating over attribution data.",
      "79 / 53",
    ),
  ],
  "/who-we-help/behavioral-health/residential-treatment/": [
    // [0] hero
    studioImg(
      "who-we-help/behavioral-health/residential-treatment",
      "residential-treatment-marketing.webp",
      "Healthcare facility leaders review daily residential census reports in a brightly lit morning meeting room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "who-we-help/behavioral-health/residential-treatment",
      "residential-treatment-marketing-admissions-coordinator-behavioral-health.webp",
      "An admissions coordinator at a behavioral health facility reviews intake verification data at a dual-monitor desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "who-we-help/behavioral-health/residential-treatment",
      "residential-treatment-marketing-mother-adult-daughter-review-accredited.webp",
      "A mother and adult daughter review accredited residential treatment options on a digital tablet at home.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "who-we-help/behavioral-health/residential-treatment",
      "residential-treatment-marketing-horizontal-flow-diagram-showing-six.webp",
      "Horizontal flow diagram showing the six stages of closed-loop attribution from initial ad click to qualified admission.",
      "79 / 53",
    ),
  ],
  "/services/psychiatrist-seo/": [
    // [0] hero
    studioImg(
      "services/psychiatrist-seo",
      "psychiatrist-seo.webp",
      "A mental health practice owner reviews local search analytics in a bright clinic office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/psychiatrist-seo",
      "psychiatrist-seo-clinical-leaders-discuss-patient-inquiry.webp",
      "Clinical leaders discuss patient inquiry routing and search intent data in an office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/psychiatrist-seo",
      "psychiatrist-seo-structural-diagram-showing-three-tiers.webp",
      "A structural diagram showing three tiers of psychiatric website architecture.",
      "79 / 53",
    ),
  ],
  "/services/healthcare-marketing-automation/": [
    // [0] hero
    studioImg(
      "services/healthcare-marketing-automation",
      "healthcare-marketing-automation.webp",
      "An admissions coordinator wearing a headset takes notes at an administrative desk in a healthcare facility.",
      "79 / 53",
    ),
    // [1] section image
    studioImg(
      "services/healthcare-marketing-automation",
      "healthcare-marketing-automation-healthcare-marketing-compliance-officers.webp",
      "Healthcare marketing and compliance officers examine a regulatory workflow plan in a modern conference room.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/healthcare-marketing-automation",
      "healthcare-marketing-automation-flow-diagram-illustrating-closed-loop.webp",
      "Flow diagram illustrating closed-loop attribution progression from search ad click to confirmed healthcare admission.",
      "79 / 53",
    ),
  ],
  "/resources/psychiatry-marketing/": [
    // [0] hero
    studioImg(
      "resources/psychiatry-marketing",
      "psychiatry-marketing.webp",
      "A psychiatrist reviews upcoming patient appointments on a laptop in a brightly lit outpatient clinic office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/psychiatry-marketing",
      "psychiatry-marketing-clinic-intake-coordinator-headset.webp",
      "A clinic intake coordinator with a headset manages patient scheduling screens at a healthcare workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/psychiatry-marketing",
      "psychiatry-marketing-comparison-diagram-showing-distinct.webp",
      "Comparison diagram showing distinct intake funnels for general medication management versus interventional psychiatric care.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/psychiatry-marketing",
      "psychiatry-marketing-healthcare-practice-leaders-review.webp",
      "Healthcare practice leaders review patient appointment attendance data on a conference room screen.",
      "79 / 53",
    ),
  ],
  "/resources/is-google-analytics-hipaa-compliant/": [
    // [0] hero
    studioImg(
      "resources/is-google-analytics-hipaa-compliant",
      "is-google-analytics-hipaa-compliant.webp",
      "A healthcare marketing director and IT lead review website tracking code and analytics governance on a monitor in a modern hospital office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/is-google-analytics-hipaa-compliant",
      "is-google-analytics-hipaa-compliant-healthcare-compliance-officer-digital.webp",
      "A healthcare compliance officer and digital marketing specialist review vendor contracts and software agreements in a conference room.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/is-google-analytics-hipaa-compliant",
      "is-google-analytics-hipaa-compliant-diagram-showing-five-compliance.webp",
      "Diagram showing five compliance governance phases for healthcare analytics from script audit to admission attribution.",
      "79 / 53",
    ),
  ],
  "/resources/hipaa-compliant-call-tracking/": [
    // [0] hero
    studioImg(
      "resources/hipaa-compliant-call-tracking",
      "hipaa-compliant-call-tracking.webp",
      "Healthcare administrators reviewing privacy workflow diagrams on an office monitor under natural light.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hipaa-compliant-call-tracking",
      "hipaa-compliant-call-tracking-process-diagram-showing-five-steps.webp",
      "Process diagram showing five steps of server-side healthcare call tracking routing phone numbers securely.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/hipaa-compliant-call-tracking",
      "hipaa-compliant-call-tracking-behavioral-health-admissions-coordinator.webp",
      "A behavioral health admissions coordinator sitting at a desk with a headset managing call records.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/hipaa-compliant-call-tracking",
      "hipaa-compliant-call-tracking-analyst-reviewing-anonymized-healthcare.webp",
      "An analyst reviewing anonymized healthcare marketing attribution metrics on a computer display.",
      "79 / 53",
    ),
  ],
  "/services/hipaa-conscious-marketing-agency/": [
    // [0] hero
    studioImg(
      "services/hipaa-conscious-marketing-agency",
      "hipaa-compliant-marketing-agency.webp",
      "Healthcare operations leaders reviewing digital acquisition performance reports in a sunlit conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/hipaa-conscious-marketing-agency",
      "hipaa-compliant-marketing-agency-healthcare-compliance-marketing-leaders.webp",
      "Healthcare compliance and marketing leaders reviewing data governance checklists at an administrative workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/hipaa-conscious-marketing-agency",
      "hipaa-compliant-marketing-agency-senior-media-strategist-analyzing-search.webp",
      "Senior media strategist analyzing search campaign performance at a dual-monitor workstation.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/hipaa-conscious-marketing-agency",
      "hipaa-compliant-marketing-agency-process-diagram-showing-five-steps.webp",
      "Process diagram showing five steps of compliant downstream admission attribution using tokenized identifiers.",
      "79 / 53",
    ),
  ],
  "/problems/fix-attribution/": [
    // [0] hero
    studioImg(
      "problems/fix-attribution",
      "fix-marketing-attribution.webp",
      "Healthcare executives review marketing performance and admissions reports together in an administrative conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "problems/fix-attribution",
      "fix-marketing-attribution-admissions-director-reviews-call-logs.webp",
      "An admissions director reviews call logs and facility bed occupancy records at an office workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "problems/fix-attribution",
      "fix-marketing-attribution-photo-mapping-intake-call-attribution.webp",
      "Photo representing intake call attribution mapped through telephony and dynamic number insertion.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "problems/fix-attribution",
      "fix-marketing-attribution-diagram-rebuilding-offline-conversion.webp",
      "Diagram of an offline conversion feedback loop that avoids protected health information.",
      "79 / 53",
    ),
  ],
  "/resources/rehab-marketing-budget/": [
    // [0] hero
    studioImg(
      "resources/rehab-marketing-budget",
      "rehab-marketing-strategy.webp",
      "Healthcare executives review admission forecasts and marketing capacity planning at a conference table.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/rehab-marketing-budget",
      "rehab-marketing-strategy-admissions-personnel-review-real-time.webp",
      "Admissions personnel review real-time facility census and discharge schedules on an office computer.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/rehab-marketing-budget",
      "rehab-marketing-strategy-digital-advertising-specialists-examine.webp",
      "Digital advertising specialists examine healthcare compliance standards and platform advertising policies.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/rehab-marketing-budget",
      "rehab-marketing-strategy-comparative-diagram-illustrating-unit.webp",
      "Comparative diagram illustrating unit economics between raw inquiry volume and cost per verified admission.",
      "79 / 53",
    ),
  ],
  "/resources/choose-healthcare-ppc-agency/": [
    // [0] hero
    studioImg(
      "resources/choose-healthcare-ppc-agency",
      "best-ppc-agency-for-healthcare.webp",
      "A healthcare marketing leader and intake supervisor confer over operational data in a bright medical office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/choose-healthcare-ppc-agency",
      "best-ppc-agency-for-healthcare-intake-coordinator-wearing-headset.webp",
      "An intake coordinator wearing a headset reviews scheduling software at a clean healthcare workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/choose-healthcare-ppc-agency",
      "best-ppc-agency-for-healthcare-four-quadrant-evaluation-scorecard.webp",
      "A four-quadrant evaluation scorecard outlining domain expertise, compliance, technical setup, and account ownership.",
      "79 / 53",
    ),
  ],
  "/resources/multi-location-marketing-best-practices/": [
    // [0] hero
    studioImg(
      "resources/multi-location-marketing-best-practices",
      "multi-location-marketing.webp",
      "A healthcare marketing director and media specialist review multi-site performance data on a computer screen.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/multi-location-marketing-best-practices",
      "multi-location-marketing-healthcare-facility-operations-director.webp",
      "A healthcare facility operations director reviews daily intake logs at an office desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/multi-location-marketing-best-practices",
      "multi-location-marketing-comparison-diagram-showing-static.webp",
      "A comparison diagram showing static regional budget allocation versus dynamic centralized healthcare spend.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/multi-location-marketing-best-practices",
      "multi-location-marketing-admissions-coordinator-wearing-headset.webp",
      "An admissions coordinator wearing a headset reviews intake verification data on an office screen.",
      "79 / 53",
    ),
  ],
  "/services/hospital-ppc/": [
    // [0] hero
    studioImg(
      "services/hospital-ppc",
      "hospitals-ppc-agency.webp",
      "Hospital marketing executive and clinical director reviewing service-line scheduling plans in a modern administrative conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/hospital-ppc",
      "hospitals-ppc-agency-hospital-intake-coordinator-headset.webp",
      "Hospital intake coordinator with headset managing patient scheduling calls at a dual-monitor administrative workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/hospital-ppc",
      "hospitals-ppc-agency-four-step-process-diagram-showing.webp",
      "Four-step process diagram showing patient search ad clicks connecting to scheduled appointments and offline conversion bidding.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/hospital-ppc",
      "hospitals-ppc-agency-healthcare-marketing-directors.webp",
      "Healthcare marketing directors evaluating centralized multi-site service line performance metrics on a boardroom display screen.",
      "79 / 53",
    ),
  ],
  "/services/therapist-seo/": [
    // [0] hero
    studioImg(
      "services/therapist-seo",
      "seo-for-therapists.webp",
      "A practice founder reviews intake schedules on a desktop monitor in a brightly lit outpatient clinic office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/therapist-seo",
      "seo-for-therapists-diagram-comparing-national-informational.webp",
      "Diagram comparing national informational search drop-off to local search driving qualified intake inquiries.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/therapist-seo",
      "seo-for-therapists-clinical-director-two-associate.webp",
      "A clinical director and two associate therapists discuss caseload scheduling in a clinic conference room.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/therapist-seo",
      "seo-for-therapists-intake-coordinator-reviews-digital.webp",
      "An intake coordinator reviews digital compliance documentation at an outpatient clinic reception desk.",
      "79 / 53",
    ),
  ],
  "/services/therapist-website-design/": [
    // [0] hero
    studioImg(
      "services/therapist-website-design",
      "therapist-website-design.webp",
      "Modern outpatient group therapy practice reception area with natural daylight and comfortable seating.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/therapist-website-design",
      "therapist-website-design-comparison-diagram-showing-generic.webp",
      "Comparison diagram showing generic website drop-off versus targeted clinical routing to scheduled appointment.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/therapist-website-design",
      "therapist-website-design-intake-coordinator-wearing-headset.webp",
      "Intake coordinator wearing a headset at an office desk while managing outpatient therapy appointment schedules.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/therapist-website-design",
      "therapist-website-design-practice-director-reviewing-anonymized.webp",
      "Practice director reviewing anonymized appointment pipeline analytics on a laptop in an outpatient office.",
      "79 / 53",
    ),
  ],
  "/resources/local-seo-for-therapists/": [
    // [0] hero
    studioImg(
      "resources/local-seo-for-therapists",
      "local-seo-for-therapists.webp",
      "A mental health clinic director reviews multi-location operational schedules on a tablet in a sunlit outpatient reception lobby.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/local-seo-for-therapists",
      "local-seo-for-therapists-diagram-illustrating-listing-hierarchy.webp",
      "Diagram illustrating the listing hierarchy between a primary clinic facility profile and authorized practitioner listings.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/local-seo-for-therapists",
      "local-seo-for-therapists-healthcare-operations-staff-verify.webp",
      "Healthcare operations staff verify physical office addresses and directory listings across clinical locations at an office table.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/local-seo-for-therapists",
      "local-seo-for-therapists-admissions-director-wears-headset.webp",
      "An admissions director wears a headset while coordinating patient intake in a private outpatient healthcare office.",
      "79 / 53",
    ),
  ],
  "/resources/google-ads-for-therapists/": [
    // [0] hero
    studioImg(
      "resources/google-ads-for-therapists",
      "google-ads-for-therapists.webp",
      "Mental health clinic director and practice manager reviewing practice operations at a desk in a modern outpatient office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/google-ads-for-therapists",
      "google-ads-for-therapists-compliance-diagram-showing-boundary.webp",
      "Compliance diagram showing the boundary separating public Google ad clicks from secure clinical intake data.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/google-ads-for-therapists",
      "google-ads-for-therapists-intake-coordinator-mental-health-group.webp",
      "Intake coordinator at a mental health group practice speaking on a headset while managing clinical intake inquiries.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/google-ads-for-therapists",
      "google-ads-for-therapists-marketing-operations-specialist.webp",
      "Marketing operations specialist reviewing data workflows on desktop monitors in a healthcare administrative office.",
      "79 / 53",
    ),
  ],
  "/resources/hipaa-compliant-marketing-automation/": [
    // [0] hero
    studioImg(
      "resources/hipaa-compliant-marketing-automation",
      "hipaa-compliant-marketing-automation.webp",
      "A healthcare operations leader reviews marketing automation workflows on a dual-monitor computer in a sunlit office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hipaa-compliant-marketing-automation",
      "hipaa-compliant-marketing-automation-diagram-showing-compliant-healthcare.webp",
      "Diagram showing a compliant healthcare marketing workflow that isolates patient data from external advertising platforms.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/hipaa-compliant-marketing-automation",
      "hipaa-compliant-marketing-automation-compliance-officer-marketing-director.webp",
      "A compliance officer and a marketing director discuss data privacy workflows across a conference room table.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/hipaa-compliant-marketing-automation",
      "hipaa-compliant-marketing-automation-healthcare-operations-specialist.webp",
      "A healthcare operations specialist completes a technical security and tracking audit on a laptop at a standing desk.",
      "79 / 53",
    ),
  ],
  "/resources/hipaa-compliant-web-forms/": [
    // [0] hero
    studioImg(
      "resources/hipaa-compliant-web-forms",
      "hipaa-compliant-web-forms.webp",
      "Healthcare admissions coordinator working at a desk in a modern administrative office setting.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/hipaa-compliant-web-forms",
      "hipaa-compliant-web-forms-healthcare-compliance-director-reviewing.webp",
      "Healthcare compliance director reviewing documentation at a conference table in an office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/hipaa-compliant-web-forms",
      "hipaa-compliant-web-forms-three-step-process-diagram-illustrating.webp",
      "Three-step process diagram illustrating marketing, IT, and compliance roles for secure web forms.",
      "79 / 53",
    ),
  ],
  "/services/mental-health-website-design/": [
    // [0] hero
    studioImg(
      "services/mental-health-website-design",
      "mental-health-website-design.webp",
      "Clinical leadership team reviewing website intake performance on a monitor in a bright healthcare office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/mental-health-website-design",
      "mental-health-website-design-outpatient-clinic-managers-evaluating.webp",
      "Outpatient clinic managers evaluating printed patient journey maps and appointment conversion data at a desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/mental-health-website-design",
      "mental-health-website-design-horizontal-workflow-diagram-illustrating.webp",
      "Horizontal workflow diagram illustrating four stages from search discovery to confirmed appointment booking.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/mental-health-website-design",
      "mental-health-website-design-healthcare-compliance-officer-systems.webp",
      "Healthcare compliance officer and systems architect reviewing secure data configurations in an office.",
      "79 / 53",
    ),
  ],
  "/services/addiction-treatment-website-design/": [
    // [0] hero
    studioImg(
      "services/addiction-treatment-website-design",
      "addiction-treatment-website-design.webp",
      "A behavioral health operations leader and admissions coordinator review intake workflows on a monitor in a modern administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/addiction-treatment-website-design",
      "addiction-treatment-website-design-admissions-coordinator-speaks-headset.webp",
      "An admissions coordinator speaks on a headset while reviewing intake schedules at a dual-monitor desk in a sunlit behavioral health office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/addiction-treatment-website-design",
      "addiction-treatment-website-design-diagram-showing-four-step-intake-routing.webp",
      "A diagram showing a four-step intake routing sequence from inquiry through level of care and verification to scheduled assessment.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/addiction-treatment-website-design",
      "addiction-treatment-website-design-two-healthcare-executives-review.webp",
      "Two healthcare executives review compliance guidelines and intake wireframes across a sunlit conference table.",
      "79 / 53",
    ),
  ],
  "/problems/increase-qualified-calls/": [
    // [0] hero
    studioImg(
      "problems/increase-qualified-calls",
      "increase-qualified-calls.webp",
      "A healthcare admissions director examines intake call data on a laptop in a brightly lit administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "problems/increase-qualified-calls",
      "increase-qualified-calls-intake-coordinator-wearing-headset.webp",
      "An intake coordinator wearing a headset reviews call notes at an administrative workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "problems/increase-qualified-calls",
      "increase-qualified-calls-comparison-diagram-outlining-marketing.webp",
      "A comparison diagram outlining marketing upstream tracking tasks versus operations downstream intake disposition responsibilities.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "problems/increase-qualified-calls",
      "increase-qualified-calls-healthcare-executives-collaborate-around.webp",
      "Healthcare executives collaborate around a conference table during a strategic planning meeting.",
      "79 / 53",
    ),
  ],
  "/resources/healthcare-marketing-analytics/": [
    // [0] hero
    studioImg(
      "resources/healthcare-marketing-analytics",
      "healthcare-marketing-analytics.webp",
      "Healthcare executives in an administrative office reviewing patient acquisition and analytics data on a tablet.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-marketing-analytics",
      "healthcare-marketing-analytics-admissions-coordinator-workstation.webp",
      "An admissions coordinator at a workstation reviewing qualified call and intake disposition criteria.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-marketing-analytics",
      "healthcare-marketing-analytics-diagram-comparing-last-non-direct-time.webp",
      "Diagram comparing last non-direct, time-decay, and position-based attribution models for healthcare marketing.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/healthcare-marketing-analytics",
      "healthcare-marketing-analytics-healthcare-leadership-team-collaborating.webp",
      "Healthcare leadership team collaborating around a conference table on an admissions analytics implementation checklist.",
      "79 / 53",
    ),
  ],
  "/resources/treatment-center-marketing-guide/": [
    // [0] hero
    studioImg(
      "resources/treatment-center-marketing-guide",
      "treatment-center-marketing.webp",
      "Healthcare executives review acquisition data and operational metrics in a modern administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/treatment-center-marketing-guide",
      "treatment-center-marketing-admissions-coordinator-conducts-phone.webp",
      "An admissions coordinator conducts a phone screening while reviewing intake criteria on a computer screen.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/treatment-center-marketing-guide",
      "treatment-center-marketing-diagram-role-ownership-ceo-coo-cmo.webp",
      "Diagram of role ownership across CEO, COO, CMO, and admissions director responsibilities.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/treatment-center-marketing-guide",
      "treatment-center-marketing-healthcare-executive-reviews-operational.webp",
      "A healthcare executive reviews operational documents beside a window in a quiet conference room.",
      "79 / 53",
    ),
  ],
  "/resources/local-seo-for-rehab-centers/": [
    // [0] hero
    studioImg(
      "resources/local-seo-for-rehab-centers",
      "local-seo-for-rehab-centers.webp",
      "Admissions leader reviewing facility reports at a desk in natural light",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "resources/local-seo-for-rehab-centers",
      "local-seo-for-rehab-centers-parent-searching-smartphone-inside.webp",
      "Parent searching on smartphone inside a parked car showing local map results",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "resources/local-seo-for-rehab-centers",
      "local-seo-for-rehab-centers-side-side-comparison-compliant-versus.webp",
      "Side-by-side comparison of compliant versus non-compliant rehab center location pages",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "resources/local-seo-for-rehab-centers",
      "local-seo-for-rehab-centers-ladder-diagram-showing-steps-local.webp",
      "Ladder diagram showing steps from local search visibility to verified admissions with privacy notes",
      "1600 / 1067",
    ),
  ],
  "/ai-edge/data-sovereignty/": [
    // [0] hero
    studioImg(
      "ai-edge/data-sovereignty",
      "healthcare-marketing-data-governance.webp",
      "Healthcare marketing and operations leaders compare workflow sketches at a table.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "ai-edge/data-sovereignty",
      "healthcare-marketing-data-governance-marketing-leader-intake-colleague.webp",
      "A marketing leader and intake colleague discuss measurement at a laptop.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "ai-edge/data-sovereignty",
      "healthcare-marketing-data-governance-four-vendor-review-questions-cover-data.webp",
      "Four vendor-review questions cover data ownership, hardware ownership, processing location and approval status.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "ai-edge/data-sovereignty",
      "healthcare-marketing-data-governance-security-reviewer-marketing-colleague.webp",
      "A security reviewer and marketing colleague discuss a laptop during a meeting.",
      "3 / 2",
    ),
  ],
  "/services/local-seo/": [
    // [0] hero
    studioImg(
      "services/local-seo",
      "local-seo-services.webp",
      "A service business owner and colleague review a laptop and phone at a desk.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "services/local-seo",
      "local-seo-services-marketing-lead-business-owner-review.webp",
      "A marketing lead and business owner review tasks together at a desk.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/local-seo",
      "local-seo-services-office-manager-checks-schedule-working.webp",
      "An office manager checks a schedule while working at a laptop.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/local-seo",
      "local-seo-services-two-operations-colleagues-compare.webp",
      "Two operations colleagues compare folders and notes at a meeting table.",
      "3 / 2",
    ),
  ],
  "/resources/in-house-vs-agency-behavioral-health/": [
    // [0] hero
    studioImg(
      "resources/in-house-vs-agency-behavioral-health",
      "in-house-vs-agency-behavioral-health-marketing.webp",
      "Healthcare executives in a meeting discussing marketing staffing options around a conference table.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "resources/in-house-vs-agency-behavioral-health",
      "in-house-vs-agency-behavioral-health-marketing-matrix-comparing-six-marketing-functions.webp",
      "Matrix comparing six marketing functions across in-house, shared, and agency ownership.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "resources/in-house-vs-agency-behavioral-health",
      "in-house-vs-agency-behavioral-health-marketing-flow-ad-spend-admission-showing-where.webp",
      "Flow from ad spend to admission showing where tracking data can be lost.",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "resources/in-house-vs-agency-behavioral-health",
      "in-house-vs-agency-behavioral-health-marketing-healthcare-operations-leader-reviewing.webp",
      "Healthcare operations leader reviewing cost model spreadsheets and reports at a desk.",
      "1600 / 1067",
    ),
  ],
  "/services/patient-acquisition-marketing/": [
    // [0] hero
    studioImg(
      "services/patient-acquisition-marketing",
      "patient-acquisition-marketing.webp",
      "Marketing and admissions leaders review a planning sheet together.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "services/patient-acquisition-marketing",
      "patient-acquisition-marketing-photo-who-needs-patient-acquisition.webp",
      "Photo · Who needs patient acquisition marketing, and when to bring in an agenc",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/patient-acquisition-marketing",
      "patient-acquisition-marketing-diagram-connecting-demand-intake.webp",
      "Diagram connecting demand, intake and capacity as three parts of an acquisition diagnosis.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/patient-acquisition-marketing",
      "patient-acquisition-marketing-diagram-how-patient-acquisition.webp",
      "Diagram · How patient acquisition marketing should be measured against admission",
      "3 / 2",
    ),
  ],
  "/services/healthcare-local-seo/": [
    // [0] hero
    studioImg(
      "services/healthcare-local-seo",
      "healthcare-local-seo.webp",
      "Healthcare marketing leader reviewing multi-site location maps and reports in a professional office.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "services/healthcare-local-seo",
      "healthcare-local-seo-healthcare-operations-marketing-leaders.webp",
      "Healthcare operations and marketing leaders discussing multi-site performance reports in an office.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "services/healthcare-local-seo",
      "healthcare-local-seo-infographic-how-should-healthcare-local.webp",
      "Infographic · How should healthcare local SEO be measured against qualified calls an",
      "1600 / 1067",
    ),
  ],
  "/resources/behavioral-health-marketing-strategies/": [
    // [0] hero
    studioImg(
      "resources/behavioral-health-marketing-strategies",
      "marketing-strategies-for-behavioral-health.webp",
      "Behavioral health admissions and marketing leaders reviewing census and call reports in a strategy meeting.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "resources/behavioral-health-marketing-strategies",
      "marketing-strategies-for-behavioral-health-acquisition-chain-diagram-showing-seven.webp",
      "Acquisition chain diagram showing seven stages from demand to admission with accountable owners for behavioral health marketing.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "resources/behavioral-health-marketing-strategies",
      "marketing-strategies-for-behavioral-health-matrix-table-assigning-accountable.webp",
      "Matrix table assigning accountable owners, measures and failure signals to each stage of behavioral health patient acquisition.",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "resources/behavioral-health-marketing-strategies",
      "marketing-strategies-for-behavioral-health-healthcare-operations-leader-analyzing.webp",
      "Healthcare operations leader analyzing illustrative acquisition funnel data on office monitors.",
      "1600 / 1067",
    ),
  ],
  "/resources/mental-health-marketing/": [
    // [0] hero
    studioImg(
      "resources/mental-health-marketing",
      "mental-health-marketing-strategies.webp",
      "Mental health practice owner reviewing acquisition reports at her desk.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "resources/mental-health-marketing",
      "mental-health-marketing-strategies-outpatient-mental-health-clinic-leaders.webp",
      "Outpatient mental health clinic leaders discussing operations in a professional setting.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "resources/mental-health-marketing",
      "mental-health-marketing-strategies-infographic-showing-qualified-inquiry.webp",
      "Infographic showing the qualified inquiry ladder with measured ratios from inquiries to attended first appointments.",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "resources/mental-health-marketing",
      "mental-health-marketing-strategies-healthcare-leader-reviewing-acquisition.webp",
      "Healthcare leader reviewing an acquisition audit map and checklist.",
      "1600 / 1067",
    ),
  ],
  "/resources/multi-location-healthcare-reporting/": [
    // [0] hero
    studioImg(
      "resources/multi-location-healthcare-reporting",
      "multi-location-healthcare-marketing-reporting.webp",
      "Healthcare marketing and operations leaders review a report together.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/multi-location-healthcare-reporting",
      "multi-location-healthcare-marketing-reporting-healthcare-colleagues-discuss-reporting.webp",
      "Healthcare colleagues discuss a reporting plan at a desk.",
      "3 / 2",
    ),
  ],
  "/resources/guides/meta-ads-for-treatment-centers/": [
    // [0] hero
    studioImg(
      "resources/guides/meta-ads-for-treatment-centers",
      "meta-ads-for-treatment-centers.webp",
      "Treatment center leadership team in an admissions huddle reviewing marketing reports and call logs.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "resources/guides/meta-ads-for-treatment-centers",
      "meta-ads-for-treatment-centers-treatment-center-executives-comparing.webp",
      "Treatment center executives comparing Meta Ads reports with internal qualified inquiry and admissions data.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "resources/guides/meta-ads-for-treatment-centers",
      "meta-ads-for-treatment-centers-flow-diagram-inquiry-handoff-chain-meta.webp",
      "Flow diagram of the inquiry handoff chain from Meta ad to verified admission showing data sources and privacy review points at each stage.",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "resources/guides/meta-ads-for-treatment-centers",
      "meta-ads-for-treatment-centers-wireframe-paid-media-dashboard-template.webp",
      "Wireframe of a paid media dashboard template showing blank fields for spend, qualified inquiries, cost per qualified inquiry, admissions and related metrics.",
      "1600 / 1067",
    ),
  ],
  "/resources/guides/intake-attribution-and-call-quality-framework/": [
    // [0] hero
    studioImg(
      "resources/guides/intake-attribution-and-call-quality-framework",
      "intake-attribution-framework.webp",
      "Healthcare leadership team reviewing attribution reports in a strategy meeting",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "resources/guides/intake-attribution-and-call-quality-framework",
      "intake-attribution-framework-operations-team-discussing-call-reports.webp",
      "Operations team discussing call reports and admissions data in a healthcare meeting",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "resources/guides/intake-attribution-and-call-quality-framework",
      "intake-attribution-framework-flow-diagram-inquiry-admission-stages.webp",
      "Flow diagram of inquiry-to-admission stages showing data owners and fields where marketing source data can be lost",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "resources/guides/intake-attribution-and-call-quality-framework",
      "intake-attribution-framework-diagram-showing-data-ownership-flow.webp",
      "Diagram showing data ownership flow and consent boundaries across marketing, intake, and finance systems for hospitals",
      "1600 / 1067",
    ),
  ],
  "/resources/healthcare-marketing-compliance-checklist/": [
    // [0] hero
    studioImg(
      "resources/healthcare-marketing-compliance-checklist",
      "healthcare-marketing-compliance.webp",
      "Healthcare CMO reviewing compliance documents in a professional office setting.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-marketing-compliance-checklist",
      "healthcare-marketing-compliance-healthcare-marketing-operations-team.webp",
      "Healthcare marketing and operations team discussing a compliance checklist together in a meeting room.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-marketing-compliance-checklist",
      "healthcare-marketing-compliance-raci-owner-matrix-table-showing-approval.webp",
      "RACI owner matrix table showing approval responsibilities for healthcare marketing compliance gates across roles.",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "resources/healthcare-marketing-compliance-checklist",
      "healthcare-marketing-compliance-three-column-compliance-verification.webp",
      "Three-column compliance verification ledger diagram listing key healthcare marketing items, status, and verification questions.",
      "1600 / 1067",
    ),
  ],
  "/resources/hipaa-compliant-analytics/": [
    // [0] hero
    studioImg(
      "resources/hipaa-compliant-analytics",
      "hipaa-compliant-analytics.webp",
      "Healthcare marketing and privacy leaders reviewing HIPAA-aware analytics data flow in an office setting.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "resources/hipaa-compliant-analytics",
      "hipaa-compliant-analytics-data-flow-decision-diagram-showing.webp",
      "Data-flow decision diagram showing compliance gates between website pages, tags, and data recipients for HIPAA-aware analytics.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "resources/hipaa-compliant-analytics",
      "hipaa-compliant-analytics-healthcare-team-discussing-page.webp",
      "Healthcare team discussing page classification and data handling decisions in a meeting room.",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "resources/hipaa-compliant-analytics",
      "hipaa-compliant-analytics-measurement-ladder-showing-what-each.webp",
      "Measurement ladder showing what each analytics level can and cannot prove from page events to verified admissions.",
      "1600 / 1067",
    ),
  ],
  "/resources/hospital-marketing-guide/": [
    // [0] hero
    studioImg(
      "resources/hospital-marketing-guide",
      "hospital-marketing.webp",
      "Hospital CMO and service-line leader reviewing capacity and demand planning documents in a conference room.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "resources/hospital-marketing-guide",
      "hospital-marketing-hospital-cmos-vps-marketing-service-line.webp",
      "Hospital CMOs, VPs of marketing, and service-line leaders collaborating in a strategy meeting.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "resources/hospital-marketing-guide",
      "hospital-marketing-measurement-ladder-impression-admitted.webp",
      "Measurement ladder from impression to admitted patient showing visibility and data owner at each step.",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "resources/hospital-marketing-guide",
      "hospital-marketing-four-step-hospital-marketing-planning.webp",
      "Four-step hospital marketing planning flow showing sequence, outputs and owning roles.",
      "1600 / 1067",
    ),
  ],
  "/services/healthcare-digital-marketing-services/": [
    // [0] hero
    studioImg(
      "services/healthcare-digital-marketing-services",
      "healthcare-digital-marketing-services.webp",
      "Healthcare marketing leader and admissions coordinator reviewing performance data in a hospital office.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "services/healthcare-digital-marketing-services",
      "healthcare-digital-marketing-services-six-service-tiles-showing-paid-media-seo.webp",
      "Six service tiles showing paid media, SEO, web conversion, call tracking, analytics and attribution, and AI operations, each with the core business question it answers.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "services/healthcare-digital-marketing-services",
      "healthcare-digital-marketing-services-photo-how-measure-healthcare-digital.webp",
      "Photo · How to measure healthcare digital marketing against qualified calls or",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "services/healthcare-digital-marketing-services",
      "healthcare-digital-marketing-services-healthcare-operations-marketing-leaders.webp",
      "Healthcare operations and marketing leaders discussing an acquisition audit summary in a professional office.",
      "1600 / 1067",
    ),
  ],
  "/services/multi-location-healthcare-seo/": [
    // [0] hero
    studioImg(
      "services/multi-location-healthcare-seo",
      "multi-location-healthcare-seo.webp",
      "Healthcare leaders reviewing a site map together in a meeting room.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "services/multi-location-healthcare-seo",
      "multi-location-healthcare-seo-photo-who-needs-multi-location.webp",
      "Photo · Who needs multi-location healthcare SEO, and when to bring in an agenc",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/multi-location-healthcare-seo",
      "multi-location-healthcare-seo-two-colleagues-reviewing-location.webp",
      "Two colleagues reviewing a location information change request.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/multi-location-healthcare-seo",
      "multi-location-healthcare-seo-two-colleagues-reviewing-abstract.webp",
      "Two colleagues reviewing an abstract website structure on a laptop and paper.",
      "3 / 2",
    ),
  ],
  "/resources/rehab-advertising-guide/": [
    // [0] hero
    studioImg(
      "resources/rehab-advertising-guide",
      "rehab-advertising.webp",
      "Marketing and admissions leaders review a planning sheet together.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/rehab-advertising-guide",
      "rehab-advertising-admissions-marketing-leads-discuss.webp",
      "Admissions and marketing leads discuss a document at a desk.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/rehab-advertising-guide",
      "rehab-advertising-marketing-lead-compliance-reviewer.webp",
      "A marketing lead and compliance reviewer examine a laptop together.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/rehab-advertising-guide",
      "rehab-advertising-three-team-members-discuss-launch-plan.webp",
      "Three team members discuss a launch plan around a meeting table.",
      "3 / 2",
    ),
  ],
  "/services/healthcare-lead-generation/": [
    // [0] hero
    studioImg(
      "services/healthcare-lead-generation",
      "healthcare-lead-generation.webp",
      "Healthcare marketing leader and admissions director reviewing performance data together in a conference room.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "services/healthcare-lead-generation",
      "healthcare-lead-generation-healthcare-operations-leader-examining.webp",
      "Healthcare operations leader examining reports and metrics to evaluate lead generation performance.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "services/healthcare-lead-generation",
      "healthcare-lead-generation-illustrative-flow-showing-inquiry-moving.webp",
      "Illustrative flow showing an inquiry moving through intake, qualification and disposition to a scheduled appointment or admission, with branches for inquiries that do not qualify.",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "services/healthcare-lead-generation",
      "healthcare-lead-generation-diagram-showing-which-data-client-owns.webp",
      "Diagram showing which data the client owns and how it moves between client systems and Marketing Powered's tools.",
      "1600 / 1067",
    ),
  ],
  "/resources/legitscript-certification-guide/": [
    // [0] hero
    studioImg(
      "resources/legitscript-certification-guide",
      "legitscript-certification.webp",
      "Healthcare leadership team in a strategy meeting reviewing compliance and marketing documents.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "resources/legitscript-certification-guide",
      "legitscript-certification-flow-diagram-showing-legitscript.webp",
      "Flow diagram showing LegitScript certification as one of six steps between deciding to advertise and measuring qualified admissions.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "resources/legitscript-certification-guide",
      "legitscript-certification-compliance-marketing-professionals.webp",
      "Compliance and marketing professionals preparing and organizing documentation for certification review.",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "resources/legitscript-certification-guide",
      "legitscript-certification-wireframe-dashboard-certification.webp",
      "Wireframe of a dashboard with a certification milestone timeline and a funnel from calls to admissions. Values are placeholders.",
      "1600 / 1067",
    ),
  ],
  "/services/rehab-lead-generation/": [
    // [0] hero
    studioImg(
      "services/rehab-lead-generation",
      "rehab-lead-generation.webp",
      "Marketing and admissions leaders review a laptop together.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "services/rehab-lead-generation",
      "rehab-lead-generation-admissions-lead-marketing-colleague.webp",
      "An admissions lead and marketing colleague review a laptop together.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/rehab-lead-generation",
      "rehab-lead-generation-six-stages-measurement-inquiry-through.webp",
      "Six stages of measurement from inquiry through admission, with reporting dependent on available, authorized data.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/rehab-lead-generation",
      "rehab-lead-generation-three-column-comparison-marketing.webp",
      "Three-column comparison of marketing, admissions and shared responsibilities in the acquisition process.",
      "2 / 3",
    ),
  ],
  "/resources/rehab-ppc-vs-seo/": [
    // [0] hero
    studioImg(
      "resources/rehab-ppc-vs-seo",
      "rehab-ppc-vs-seo.webp",
      "Marketing and admissions leaders review a budget worksheet together.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/rehab-ppc-vs-seo",
      "rehab-ppc-vs-seo-two-healthcare-leaders-discuss-planning.webp",
      "Two healthcare leaders discuss a planning sheet at a meeting table.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/rehab-ppc-vs-seo",
      "rehab-ppc-vs-seo-marketing-operator-admissions-colleague.webp",
      "A marketing operator and admissions colleague compare information on a laptop.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/rehab-ppc-vs-seo",
      "rehab-ppc-vs-seo-five-budget-constraints-first.webp",
      "Five budget constraints and their first considerations: speed, margin, intake capacity, location visibility and attribution confidence.",
      "3 / 2",
    ),
  ],
  "/resources/treatment-center-marketing-audit-checklist/": [
    // [0] hero
    studioImg(
      "resources/treatment-center-marketing-audit-checklist",
      "treatment-center-marketing-audit-checklist.webp",
      "Marketing and admissions leaders review materials together at a meeting table.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/treatment-center-marketing-audit-checklist",
      "treatment-center-marketing-audit-checklist-marketing-admissions-leads-compare.webp",
      "Marketing and admissions leads compare reporting materials at a desk.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/treatment-center-marketing-audit-checklist",
      "treatment-center-marketing-audit-checklist-scoring-guide-0-means-not-place.webp",
      "Scoring guide: 0 means not in place or unverifiable; 1 means partial or not regularly reviewed; 2 means documented, reviewed and evidenced.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/treatment-center-marketing-audit-checklist",
      "treatment-center-marketing-audit-checklist-analytics-admissions-leads-review.webp",
      "Analytics and admissions leads review a document together.",
      "3 / 2",
    ),
  ],
  "/resources/addiction-treatment-content-marketing/": [
    // [0] hero
    studioImg(
      "resources/addiction-treatment-content-marketing",
      "addiction-treatment-content-marketing.webp",
      "A marketing leader and clinical reviewer discuss a document at a conference table.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/addiction-treatment-content-marketing",
      "addiction-treatment-content-marketing-admissions-clinical-marketing-colleagues.webp",
      "Admissions, clinical and marketing colleagues discuss a content program.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/addiction-treatment-content-marketing",
      "addiction-treatment-content-marketing-marketing-manager-admissions-lead.webp",
      "A marketing manager and admissions lead compare notes at a desk.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/addiction-treatment-content-marketing",
      "addiction-treatment-content-marketing-content-lead-clinical-reviewer-examine.webp",
      "A content lead and clinical reviewer examine a page while a colleague listens.",
      "3 / 2",
    ),
  ],
  "/services/meta-ads-management/": [
    // [0] hero
    studioImg(
      "services/meta-ads-management",
      "mental-health-facebook-ads.webp",
      "Healthcare marketing leader reviewing Meta ads performance data in a professional office setting.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "services/meta-ads-management",
      "mental-health-facebook-ads-mental-health-practice-owner-admissions.webp",
      "Mental health practice owner and admissions leader discussing campaign readiness in a clinic conference room.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "services/meta-ads-management",
      "mental-health-facebook-ads-diagram-five-stages-ad-click-kept.webp",
      "Diagram of five stages from ad click to kept appointment, showing which stages are visible in Meta reporting and which require intake and CRM data.",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "services/meta-ads-management",
      "mental-health-facebook-ads-healthcare-consultant-clinic-leader.webp",
      "Healthcare consultant and clinic leader reviewing an acquisition audit document in a meeting room.",
      "1600 / 1067",
    ),
  ],
  "/resources/mental-health-google-ads/": [
    // [0] hero
    studioImg(
      "resources/mental-health-google-ads",
      "mental-health-google-ads.webp",
      "Practice leader and intake lead review a planning sheet together in an office.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/mental-health-google-ads",
      "mental-health-google-ads-practice-manager-clinician-discuss.webp",
      "Practice manager and clinician discuss capacity beside a blank planning board.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/mental-health-google-ads",
      "mental-health-google-ads-diagram-showing-service-line-campaign.webp",
      "Diagram showing a service-line campaign branching into location ad groups, each connected to a matched ad, landing page, and call script.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/mental-health-google-ads",
      "mental-health-google-ads-intake-lead-practice-manager-review.webp",
      "Intake lead and practice manager review a sheet together at a desk.",
      "3 / 2",
    ),
  ],
  "/resources/mental-health-practice-marketing/": [
    // [0] hero
    studioImg(
      "resources/mental-health-practice-marketing",
      "mental-health-practice-marketing.webp",
      "Practice owner and intake lead review a capacity sheet together.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/mental-health-practice-marketing",
      "mental-health-practice-marketing-practice-manager-marketing-lead-compare.webp",
      "A practice manager and marketing lead compare notes at a desk.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/mental-health-practice-marketing",
      "mental-health-practice-marketing-clinical-director-practice-manager.webp",
      "A clinical director and practice manager discuss scheduling beside a planning board.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/mental-health-practice-marketing",
      "mental-health-practice-marketing-six-step-system-mapping-capacity-through.webp",
      "Six-step system from mapping capacity through a weekly operating cadence.",
      "3 / 2",
    ),
  ],
  "/resources/healthcare-ppc-advertising-guide/": [
    // [0] hero
    studioImg(
      "resources/healthcare-ppc-advertising-guide",
      "healthcare-ppc-advertising.webp",
      "A marketing lead and an admissions leader review a worksheet together in an office.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-ppc-advertising-guide",
      "healthcare-ppc-advertising-scheduling-lead-marketing-manager.webp",
      "A scheduling lead and marketing manager discuss service-line planning in an office.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-ppc-advertising-guide",
      "healthcare-ppc-advertising-two-healthcare-colleagues-review-laptop.webp",
      "Two healthcare colleagues review a laptop together before a planning decision.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/healthcare-ppc-advertising-guide",
      "healthcare-ppc-advertising-admissions-leader-discusses-worksheet.webp",
      "An admissions leader discusses a worksheet with a marketing colleague.",
      "3 / 2",
    ),
  ],
  "/resources/location-page-seo-healthcare/": [
    // [0] hero
    studioImg(
      "resources/location-page-seo-healthcare",
      "healthcare-location-page-seo.webp",
      "Healthcare marketing and operations colleagues reviewing a location-page layout.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/location-page-seo-healthcare",
      "healthcare-location-page-seo-illustrative-page-map-showing-hub.webp",
      "Illustrative page map showing a hub, an optional regional layer, a facility page and a conditional service page.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/location-page-seo-healthcare",
      "healthcare-location-page-seo-operations-web-colleagues-comparing.webp",
      "Operations and web colleagues comparing a checklist with a location-page wireframe.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/location-page-seo-healthcare",
      "healthcare-location-page-seo-operations-admissions-web-colleagues.webp",
      "Operations, admissions and web colleagues discussing a location-page work plan.",
      "3 / 2",
    ),
  ],
  "/resources/mental-health-advertising-guide/": [
    // [0] hero
    studioImg(
      "resources/mental-health-advertising-guide",
      "mental-health-advertising.webp",
      "An intake coordinator takes a phone call at a clinic reception desk beside a printed intake checklist, while a practice owner stands nearby reviewing a tablet.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/mental-health-advertising-guide",
      "mental-health-advertising-hands-marking-printed-one-page-summary.webp",
      "Hands marking a printed one-page summary with a pen on a conference table, with a laptop closed beside it.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/mental-health-advertising-guide",
      "mental-health-advertising-practice-owner-marketing-lead-clinician.webp",
      "A practice owner, a marketing lead and a clinician review a laptop together in a meeting room while discussing channel options.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/mental-health-advertising-guide",
      "mental-health-advertising-intake-lead-studies-wall-schedule-board.webp",
      "An intake lead studies a wall schedule board with open time slots marked in color, considering how much capacity is available.",
      "3 / 2",
    ),
  ],
  "/who-we-help/behavioral-health/detox-centers/": [
    // [0] hero
    studioImg(
      "who-we-help/behavioral-health/detox-centers",
      "detox-program-marketing.webp",
      "An admissions coordinator wearing a headset answers an inquiry at a desk in a bright office, with a staffing sheet beside the laptop.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "who-we-help/behavioral-health/detox-centers",
      "detox-program-marketing-three-leaders-treatment-organization.webp",
      "Three leaders of a treatment organization review a printed call log together at a conference table in a glass-walled meeting room.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/behavioral-health/detox-centers",
      "detox-program-marketing-intake-specialist-takes-call-busy.webp",
      "An intake specialist takes a call at a busy workstation while a second phone waits face down nearby.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "who-we-help/behavioral-health/detox-centers",
      "detox-program-marketing-five-row-checklist-showing-criteria.webp",
      "Five-row checklist showing the criteria a detox program can use to prioritize qualified inquiries: urgency signals, payment fit, location and access, capacity, and response time.",
      "2 / 3",
    ),
  ],
  "/services/rehab-ppc/": [
    // [0] hero
    studioImg(
      "services/rehab-ppc",
      "drug-rehab-ppc.webp",
      "Treatment center leaders reviewing a weekly report together in a bright conference room.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "services/rehab-ppc",
      "drug-rehab-ppc-marketing-director-reviews-printed-call.webp",
      "A marketing director reviews a printed call log at her desk to check what calls are turning into admissions.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/rehab-ppc",
      "drug-rehab-ppc-scorecard-six-criteria-evaluating-rehab.webp",
      "Scorecard of six criteria for evaluating a rehab PPC agency, from optimization event to account and data ownership.",
      "2 / 3",
    ),
    // [3] section image
    studioImg(
      "services/rehab-ppc",
      "drug-rehab-ppc-paid-search-specialist-sketches-campaign.webp",
      "A paid search specialist sketches a campaign structure on a whiteboard, grouping ads by service line.",
      "3 / 2",
    ),
  ],
  "/services/google-ads-management/": [
    // [0] hero
    studioImg(
      "services/google-ads-management",
      "google-ads-for-treatment-centers.webp",
      "Marketing and admissions leaders review a laptop together in an office.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "services/google-ads-management",
      "google-ads-for-treatment-centers-treatment-center-executive-discusses.webp",
      "A treatment center executive discusses a decision with a colleague.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/google-ads-management",
      "google-ads-for-treatment-centers-admissions-staff-member-listens-headset.webp",
      "An admissions staff member listens on a headset at a workstation.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/google-ads-management",
      "google-ads-for-treatment-centers-healthcare-leaders-prospective-marketing.webp",
      "Healthcare leaders and a prospective marketing partner talk around a meeting table.",
      "3 / 2",
    ),
  ],
  "/services/drug-rehab-seo/": [
    // [0] hero
    studioImg(
      "services/drug-rehab-seo",
      "drug-rehab-seo.webp",
      "Marketing and admissions leaders review a laptop together in a meeting room.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "services/drug-rehab-seo",
      "drug-rehab-seo-two-colleagues-discuss-website-redesign.webp",
      "Two colleagues discuss a website redesign at a conference table.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/drug-rehab-seo",
      "drug-rehab-seo-illustrative-page-map-connecting.webp",
      "Illustrative page map connecting treatment services to levels of care and location pages.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/drug-rehab-seo",
      "drug-rehab-seo-admissions-team-lead-colleague-discuss.webp",
      "An admissions team lead and colleague discuss inquiry criteria at a table.",
      "3 / 2",
    ),
  ],
  "/services/healthcare-ppc/": [
    // [0] hero
    studioImg(
      "services/healthcare-ppc",
      "healthcare-ppc.webp",
      "Healthcare marketing and admissions leads review a laptop together.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "services/healthcare-ppc",
      "healthcare-ppc-healthcare-executive-marketing-lead.webp",
      "A healthcare executive and marketing lead discuss a document at a meeting table.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/healthcare-ppc",
      "healthcare-ppc-marketing-analyst-admissions-manager.webp",
      "A marketing analyst and admissions manager review a worksheet beside a laptop.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/healthcare-ppc",
      "healthcare-ppc-illustrative-comparison-both-locations.webp",
      "Illustrative comparison: both locations spend $10,000 and receive 100 calls. Location A has 50 qualified inquiries and 10 admitted or scheduled outcomes; Location B has 25 and 5.",
      "2 / 3",
    ),
  ],
  "/areas-we-serve/jupiter/": [
    // [0] hero
    studioImg(
      "areas-we-serve/jupiter",
      "marketing-agency-jupiter-fl.webp",
      "A business owner and marketing lead discuss priorities at a table.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "areas-we-serve/jupiter",
      "marketing-agency-jupiter-fl-four-marketing-problems-paired-starting.webp",
      "Four marketing problems paired with starting scopes, from local information review to attribution and intake measurement.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "areas-we-serve/jupiter",
      "marketing-agency-jupiter-fl-marketing-lead-reviews-website-layout.webp",
      "A marketing lead reviews a website layout and notes about service access.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "areas-we-serve/jupiter",
      "marketing-agency-jupiter-fl-business-owner-prepares-call-notebook.webp",
      "A business owner prepares for a call with a notebook nearby.",
      "3 / 2",
    ),
  ],
  "/areas-we-serve/west-palm-beach/": [
    // [0] hero
    studioImg(
      "areas-we-serve/west-palm-beach",
      "marketing-agency-west-palm-beach.webp",
      "Two colleagues in a bright office review a printed service page together at a table, with one laptop open beside them.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "areas-we-serve/west-palm-beach",
      "marketing-agency-west-palm-beach-four-professionals-healthcare-law-home.webp",
      "Four professionals from healthcare, law, home services and marketing discuss a whiteboard during a planning meeting in a bright conference room.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "areas-we-serve/west-palm-beach",
      "marketing-agency-west-palm-beach-senior-marketing-leader-sketches-simple.webp",
      "A senior marketing leader sketches a simple funnel on a whiteboard while a colleague listens in a small meeting room.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "areas-we-serve/west-palm-beach",
      "marketing-agency-west-palm-beach-diagram-three-columns-mapping-local.webp",
      "Diagram with three columns mapping local marketing problems (not being found, visitors who do not inquire, unknown inquiry source) to local search, Google Ads or website work, and measurement.",
      "2 / 3",
    ),
  ],
  "/resources/healthcare-marketing-roi/": [
    // [0] hero
    studioImg(
      "resources/healthcare-marketing-roi",
      "healthcare-marketing-roi.webp",
      "A marketing lead and an admissions coordinator review a laptop together at a table in a bright office, with a printed form beside them.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/healthcare-marketing-roi",
      "healthcare-marketing-roi-marketing-analyst-admissions-specialist.webp",
      "A marketing analyst and an admissions specialist talk across a shared office, one at a laptop and one at an intake workstation with forms and a headset.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/healthcare-marketing-roi",
      "healthcare-marketing-roi-five-step-flow-50-000-spend-400.webp",
      "A five-step flow from $50,000 spend to 400 inquiries, 85 qualified inquiries, 12 unique admissions and $108,000 margin, giving an illustrative ROI of 116%.",
      "2 / 3",
    ),
    // [3] section image
    studioImg(
      "resources/healthcare-marketing-roi",
      "healthcare-marketing-roi-clinical-lead-admissions-director.webp",
      "A clinical lead, an admissions director and a marketing director review a printed definition together at a meeting table.",
      "3 / 2",
    ),
  ],
  "/areas-we-serve/palm-beach-gardens/": [
    // [0] hero
    studioImg(
      "areas-we-serve/palm-beach-gardens",
      "marketing-agency-palm-beach-gardens.webp",
      "A business owner and a marketing lead reviewing a printed inquiry log next to a laptop showing a call log.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "areas-we-serve/palm-beach-gardens",
      "marketing-agency-palm-beach-gardens-practice-manager-clinical-staff-member.webp",
      "A practice manager and a clinical staff member discussing scheduling in a bright clinic hallway.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "areas-we-serve/palm-beach-gardens",
      "marketing-agency-palm-beach-gardens-front-desk-coordinator-answering-inquiry.webp",
      "A front-desk coordinator answering an inquiry call while a colleague takes notes at a reception desk.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "areas-we-serve/palm-beach-gardens",
      "marketing-agency-palm-beach-gardens-five-questions-judging-marketing.webp",
      "Five questions for judging marketing performance: where the inquiry came from, whether it was a real prospect, what happened next, whether it holds up by service line and location, and whether the record can be shown.",
      "2 / 3",
    ),
  ],
  "/services/mental-health-seo/": [
    // [0] hero
    studioImg(
      "services/mental-health-seo",
      "mental-health-seo.webp",
      "Two staff members review a call log and scheduling screen together at a bright clinic reception counter, with empty waiting room chairs in the background.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "services/mental-health-seo",
      "mental-health-seo-practice-owner-operations-lead-review.webp",
      "A practice owner and operations lead review a list of clinic locations together on a wall monitor in a meeting room.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/mental-health-seo",
      "mental-health-seo-clinician-marketing-coordinator-review.webp",
      "A clinician and a marketing coordinator review a draft clinician biography together on a laptop in a quiet office.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/mental-health-seo",
      "mental-health-seo-three-column-diagram-showing-visibility.webp",
      "Three-column diagram showing visibility, conversion and measurement checks for a mental health SEO diagnosis, with two checks under each heading.",
      "2 / 3",
    ),
  ],
  "/who-we-help/behavioral-health/substance-use-disorder/": [
    // [0] hero
    studioImg(
      "who-we-help/behavioral-health/substance-use-disorder",
      "rehab-marketing-agency.webp",
      "Admissions coordinator taking a phone call at a desk in a bright office, with a colleague working in the background.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "who-we-help/behavioral-health/substance-use-disorder",
      "rehab-marketing-agency-two-treatment-center-leaders-reviewing.webp",
      "Two treatment center leaders reviewing a whiteboard that lists programs and open capacity in a conference room.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/behavioral-health/substance-use-disorder",
      "rehab-marketing-agency-admissions-director-marketing-lead.webp",
      "Admissions director and marketing lead reviewing a printed monthly report together in a meeting room.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "who-we-help/behavioral-health/substance-use-disorder",
      "rehab-marketing-agency-marketing-lead-admissions-director.webp",
      "A marketing lead and an admissions director review the same laptop together at a desk.",
      "3 / 2",
    ),
  ],
  "/areas-we-serve/": [
    // [0] hero
    studioImg(
      "areas-we-serve",
      "south-florida-marketing-services.webp",
      "A marketing lead and a practice owner review a printed page and a laptop together at a bright office table.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "areas-we-serve",
      "south-florida-marketing-services-map-palm-beach-county-showing-marketing.webp",
      "Map of Palm Beach County showing Marketing Powered's base in Palm Beach Gardens and the areas served, West Palm Beach and Jupiter.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "areas-we-serve",
      "south-florida-marketing-services-marketing-coordinator-colleague-compare.webp",
      "A marketing coordinator and a colleague compare service pages on a tablet at a desk.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "areas-we-serve",
      "south-florida-marketing-services-four-step-flow-reviewing-existing-search.webp",
      "Four-step flow from reviewing existing search, website and ad accounts, through sharing access, a senior team review, and agreed scoping.",
      "3 / 2",
    ),
  ],
  // Only the abstract hero remains. The founder-quote, growth-framework, and
  // results-stats graphics carried the expert-witness credential, "AI-native
  // since 2022", a $50M+ spend total, and the former employer's name (held
  // claims per the November 2026 package), so they are no longer rendered.
  "/company/about/": [
    // [0] hero
    studioImg(
      "company/about",
      "about.webp",
      "Former healthcare CMO standing in office corridor reviewing documents.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "company/about",
      "about-hands-holding-printed-growth-report.webp",
      "Hands holding printed growth report with charts in facility hallway.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "company/about",
      "about-server-rack-owned-compute-hardware.webp",
      "Server rack with owned compute hardware in company server room.",
      "3 / 2",
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
    // [0] hero
    studioImg(
      "services/paid-media",
      "healthcare-paid-media.webp",
      "Healthcare marketing and admissions leaders review acquisition information together.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "services/paid-media",
      "healthcare-paid-media-admissions-manager-marketing-colleague.webp",
      "An admissions manager and marketing colleague discuss acquisition planning.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "services/paid-media",
      "healthcare-paid-media-intake-capacity-geography-policy.webp",
      "Intake capacity, geography, policy exposure and measurement readiness inform selection among Google search, Meta, Microsoft search, and local search and maps.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/paid-media",
      "healthcare-paid-media-two-colleagues-review-landing-page.webp",
      "Two colleagues review landing-page material before a campaign launch.",
      "3 / 2",
    ),
  ],


  "/services/landing-page-optimization/": std4("services/landing-page-optimization", [
    "Strategic landing page optimization to convert more qualified admission calls",
    "Optimized behavioral health landing page lifting conversion from 3% to 6% admissions",
    "Landing page optimization process: strategic audit, testing roadmap, execute experiments, analyze data, and implement winners",
    "Behavioral health landing page performance: optimized pages convert 5-8%, lower bounce, Multi-location behavioral health landing page performance",
  ]),

  // Concept, process, and results graphics carried invented figures ("$340",
  // "+35% ROI", "ROI: 50%") and "HIPAA-compliant" assurances. Hero remains.
  "/services/analytics-and-attribution/": [
    // [0] hero
    studioImg(
      "services/analytics-and-attribution",
      "healthcare-marketing-attribution.webp",
      "A healthcare marketing director and clinical operations leader review admission analytics on a monitor in a bright office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "services/analytics-and-attribution",
      "healthcare-marketing-attribution-admissions-coordinator-wearing-headset.webp",
      "An admissions coordinator wearing a headset reviews intake screening data on a screen in a modern healthcare office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "services/analytics-and-attribution",
      "healthcare-marketing-attribution-diagram-showing-how-anonymous-click-id.webp",
      "A diagram showing how an anonymous click ID moves from secure local storage to the CRM and returns to the ad network.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "services/analytics-and-attribution",
      "healthcare-marketing-attribution-two-healthcare-executives-evaluate.webp",
      "Two healthcare executives evaluate acquisition performance and admission marketing metrics during an executive strategy meeting.",
      "79 / 53",
    ),
  ],
  // Hero swapped to the clean funnel graphic; the original 01 hero had a garbled headline.
  // Every graphic in this set carried "20-40%" results, "HIPAA compliant
  // infrastructure", or a literal "[CTA]" placeholder; decorative hero only.
  "/services/call-tracking-and-intake-attribution/": [
    // [0] hero
    studioImg(
      "services/call-tracking-and-intake-attribution",
      "healthcare-call-tracking.webp",
      "CMO and admissions leader reviewing campaign and intake data side by side at a shared desk",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "services/call-tracking-and-intake-attribution",
      "healthcare-call-tracking-healthcare-leadership-team-discussing.webp",
      "Healthcare leadership team discussing call tracking and admissions data in a conference room",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "services/call-tracking-and-intake-attribution",
      "healthcare-call-tracking-infographic-showing-how-score-healthcare.webp",
      "Infographic showing how to score healthcare call tracking from source through disposition, stage and outcome to admission",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "services/call-tracking-and-intake-attribution",
      "healthcare-call-tracking-senior-operator-analyst-reviewing.webp",
      "Senior operator and analyst reviewing anonymized attribution data during an acquisition audit",
      "1600 / 1067",
    ),
  ],

  // Hero is the page's original photographic banner (cover); the two in-article
  // section slots fall back to brand process/takeaways graphics.
  "/services/ppc/introduction-to-ppc-campaign-management/": [
    // [0] hero
    studioImg(
      "services/ppc/introduction-to-ppc-campaign-management",
      "introduction-to-ppc-campaign-management.webp",
      "Marketer reviewing paid search campaign performance on dashboard screens.",
      "7 / 4",
    ),
    // [2] section image
    studioImg(
      "services/ppc/introduction-to-ppc-campaign-management",
      "introduction-to-ppc-campaign-management-side-side-view-generic-homepage-location.webp",
      "Side-by-side view of a generic homepage and a location-specific landing page reached from the same paid search ad.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "services/ppc/introduction-to-ppc-campaign-management",
      "introduction-to-ppc-campaign-management-empty-hospital-corridor-leading.webp",
      "Empty hospital corridor leading to an admissions station representing regulated PPC environments.",
      "3 / 2",
    ),
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
  "/who-we-help/hospitals-and-health-systems/": [
    // [0] hero
    studioImg(
      "who-we-help/hospitals-and-health-systems",
      "hospital-digital-marketing.webp",
      "Hospital marketing leaders reviewing operational service line capacity and campaign analytics in a conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "who-we-help/hospitals-and-health-systems",
      "hospital-digital-marketing-hospital-patient-intake-coordinator.webp",
      "A hospital patient intake coordinator managing scheduling queues and inbound calls at a computer workstation.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "who-we-help/hospitals-and-health-systems",
      "hospital-digital-marketing-healthcare-marketing-directors-planning.webp",
      "Healthcare marketing directors planning regional facility campaigns and service line governance around a table.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "who-we-help/hospitals-and-health-systems",
      "hospital-digital-marketing-architecture-diagram-showing-privacy.webp",
      "Architecture diagram showing privacy-safe healthcare tracking flow from search inquiry to admission attribution.",
      "79 / 53",
    ),
  ],

  // The previous set asserted "complete control", "full data sovereignty",
  // "no third-party API dependencies", and 40% / 1.4X / sub-100ms results,
  // which the package holds or contradicts. Decorative hero only.
  "/ai-edge/owned-ai-systems/": [
    // [0] hero
    studioImg(
      "ai-edge/owned-ai-systems",
      "owned-ai-systems.webp",
      "Empty healthcare marketing operations room with owned infrastructure hardware at dawn",
      "7 / 4",
    ),
    // [2] section image
    studioImg(
      "ai-edge/owned-ai-systems",
      "owned-ai-systems-hands-marking-campaign-performance.webp",
      "Hands marking campaign performance report with budget figures",
      "3 / 2",
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
    // [0] hero
    studioImg(
      "who-we-help",
      "healthcare-marketing-agency.webp",
      "Healthcare marketing and admissions leaders reviewing multi-site facility operational data in a sunlit administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "who-we-help",
      "healthcare-marketing-agency-admissions-coordinator-operations.webp",
      "Admissions coordinator and operations director reviewing clinical bed capacity at a multi-site facility intake desk.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "who-we-help",
      "healthcare-marketing-agency-five-step-diagram-showing-healthcare.webp",
      "Five-step diagram showing healthcare conversion tracking from ad click and dynamic call to intake CRM and de-identified admission sync.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "who-we-help",
      "healthcare-marketing-agency-technical-systems-engineer-monitoring.webp",
      "Technical systems engineer monitoring on-premises computing infrastructure inside a secure local data room.",
      "79 / 53",
    ),
  ],

  // Hero, concept, and process graphics carried "LegitScript certified /
  // compliant" badges; the results panel carried $50M+, +140M, and "0
  // compliance violations". Decorative hero only.
  "/who-we-help/behavioral-health/": [
    // [0] hero
    studioImg(
      "who-we-help/behavioral-health",
      "behavioral-health-marketing-agency.webp",
      "Healthcare executives and admissions leaders discussing facility capacity and inquiry trends in a modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "who-we-help/behavioral-health",
      "behavioral-health-marketing-agency-admissions-director-marketing-leader.webp",
      "Admissions director and marketing leader reviewing intake reports in a bright administrative office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "who-we-help/behavioral-health",
      "behavioral-health-marketing-agency-comparison-diagram-showing-key.webp",
      "Comparison diagram showing key operational differences and metrics between residential and outpatient care.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "who-we-help/behavioral-health",
      "behavioral-health-marketing-agency-marketing-analyst-reviewing-digital.webp",
      "Marketing analyst reviewing digital healthcare compliance and ad platform guidelines on a desktop monitor.",
      "79 / 53",
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
    // [0] hero
    studioImg(
      "who-we-help/mental-health",
      "mental-health-marketing-agency.webp",
      "Practice leader and admissions coordinator review scheduling capacity together.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "who-we-help/mental-health",
      "mental-health-marketing-agency-clinic-operations-manager-clinician.webp",
      "A clinic operations manager and clinician discuss a weekly capacity plan.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "who-we-help/mental-health",
      "mental-health-marketing-agency-marketing-specialist-intake-coordinator.webp",
      "A marketing specialist and intake coordinator discuss an inquiry handoff.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "who-we-help/mental-health",
      "mental-health-marketing-agency-practice-leaders-compare-planning-sheets.webp",
      "Practice leaders compare planning sheets during a multi-location discussion.",
      "3 / 2",
    ),
  ],

  // Hero swapped to the clean path graphic (02) — Asana's 01 hero showed a literal
  // "[CTA]" placeholder button token. Three clean images.
  "/who-we-help/mental-health/outpatient-clinics/": [
    // [0] hero
    studioImg(
      "who-we-help/mental-health/outpatient-clinics",
      "outpatient-clinic-marketing.webp",
      "Outpatient clinic staff review scheduling on a tablet in a sunlit reception office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "who-we-help/mental-health/outpatient-clinics",
      "outpatient-clinic-marketing-mental-health-clinic-staff-meet.webp",
      "Mental health clinic staff meet in a conference room for a morning scheduling huddle.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "who-we-help/mental-health/outpatient-clinics",
      "outpatient-clinic-marketing-diagram-showing-five-stages-outpatient.webp",
      "Diagram showing five stages of outpatient clinic appointment and admission attribution.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "who-we-help/mental-health/outpatient-clinics",
      "outpatient-clinic-marketing-healthcare-marketing-operator-clinic.webp",
      "Healthcare marketing operator and clinic manager review call metrics and a scheduling calendar.",
      "79 / 53",
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


  /* ---- Get Started cluster ---- */

  // Hub (HubPage): only index [1] renders. Capabilities icon set.
  "/get-started/": [
    // [0] hero
    studioImg(
      "get-started",
      "get-started.webp",
      "Empty conference table with spreadsheet, CRM printout and ringing phone ready for the first marketing conversation",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "get-started",
      "get-started-healthcare-operator-leader-standing.webp",
      "Healthcare operator and leader standing in clinic corridor reviewing printed call logs during first conversation",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "get-started",
      "get-started-notebook-usb-drive-server-room-desk.webp",
      "Notebook and USB drive on server room desk documenting regulated advertising constraints for healthcare",
      "3 / 2",
    ),
  ],

  // Hero swapped to the clean concept (02) — Asana's 01 hero headline was garbled
  // ("audit auditay"). Three clean images.
  "/get-started/request-an-audit/": [
    // [0] hero
    studioImg(
      "get-started/request-an-audit",
      "free-marketing-audit.webp",
      "Marketing operator reviewing business intake metrics and local search analytics on a desktop display.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "get-started/request-an-audit",
      "free-marketing-audit-process-diagram-outlining-three.webp",
      "Process diagram outlining the three evaluation stages of profile setup, local presence, and intake pathways.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "get-started/request-an-audit",
      "free-marketing-audit-senior-digital-marketing-strategist.webp",
      "Senior digital marketing strategist conducting a manual operational account audit across dual monitors.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "get-started/request-an-audit",
      "free-marketing-audit-comparison-diagram-contrasting-automated.webp",
      "Comparison diagram contrasting automated software scrapers with an operator-led written visibility review.",
      "79 / 53",
    ),
  ],

  // book-a-call has only 01-04 in Asana; 03 was a placeholder-text draft, so the
  // results graphic (04) fills the second section slot. Three clean images.
  "/get-started/book-a-call/": [
    // [0] hero
    studioImg(
      "get-started/book-a-call",
      "book-a-call.webp",
      "Professional participating in a focused marketing consultation call in an office setting.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "get-started/book-a-call",
      "book-a-call-hospital-marketing-lead-walking-through.webp",
      "Hospital marketing lead walking through a healthcare facility corridor.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "get-started/book-a-call",
      "book-a-call-close-up-ringing-desk-phone-representing.webp",
      "Close-up of a ringing desk phone representing outcome measurement in marketing.",
      "3 / 2",
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
    // [0] hero
    studioImg(
      "resources/guides/creative-testing-system-for-meta-ads",
      "creative-testing-system-for-meta-ads.webp",
      "Marketing director reviewing printed ad performance reports in a hospital office early morning.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/guides/creative-testing-system-for-meta-ads",
      "creative-testing-system-for-meta-ads-ringing-desk-phone-printed-ad-variant.webp",
      "Ringing desk phone and printed ad variant sheets with notes on a marketing office table.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/guides/creative-testing-system-for-meta-ads",
      "creative-testing-system-for-meta-ads-vertical-timeline-infographic-five-day.webp",
      "Vertical timeline infographic of the five-day weekly creative testing cadence for Meta ads.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/guides/creative-testing-system-for-meta-ads",
      "creative-testing-system-for-meta-ads-metal-key-open-testing-log-notebook.webp",
      "Metal key on an open testing log notebook in a server room at dusk.",
      "3 / 2",
    ),
  ],

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
    // [0] hero
    studioImg(
      "resources/guides/behavioral-health-paid-media-playbook",
      "behavioral-health-paid-media-playbook.webp",
      "Exterior glass entrance of a low healthcare building at dawn with empty sky at left.",
      "7 / 4",
    ),
    // [2] section image
    studioImg(
      "resources/guides/behavioral-health-paid-media-playbook",
      "behavioral-health-paid-media-playbook-face-down-phone-mug-car-keys-dim-kitchen.webp",
      "Face-down phone, mug and car keys on a dim kitchen table under a single lamp at night.",
      "3 / 2",
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
    // [0] hero
    studioImg(
      "resources/behavioral-health-marketing",
      "behavioral-health-seo-company.webp",
      "Healthcare executives review marketing strategy around a conference table in a modern clinic office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/behavioral-health-marketing",
      "behavioral-health-seo-company-healthcare-leadership-team-discusses.webp",
      "Healthcare leadership team discusses organic search visibility around an office laptop.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/behavioral-health-marketing",
      "behavioral-health-seo-company-flow-diagram-showing-search-attribution.webp",
      "Flow diagram showing search attribution tracking from initial organic entry to verified admission.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/behavioral-health-marketing",
      "behavioral-health-seo-company-healthcare-executives-examine-search.webp",
      "Healthcare executives examine search performance reports in a sunlit conference room.",
      "79 / 53",
    ),
  ],

  // 02 concept illustration had headline/label typos ("Cointinuous", "Mowered"),
  // so the management framework (03) and trackable-results graphic (04) are used.
  "/resources/paid-media/": [
    // [0] hero
    studioImg(
      "resources/paid-media",
      "paid-media.webp",
      "Empty conference room prepared for weekly paid media operating review with pacing reports and conversion logs.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/paid-media",
      "paid-media-hands-marking-changes-dates-paid-media.webp",
      "Hands marking changes and dates on paid media reports during a weekly operating review.",
      "3 / 2",
    ),
  ],


  /* ---- Resources guides (final wave) ---- */




  /* ---- Guides: TSMC publish batch (Asana-sourced per-page graphics) ----
     Trimmed 2026-11-05 to two images per guide: the cleanest diagram / icon
     grid as hero and one quote card or data graphic in-article. AI-generated
     people-photo hero banners were dropped. Guides still awaiting review keep
     their original set. ---- */

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
    // [0] hero
    studioImg(
      "resources/guides/90-day-agency-onboarding-playbook",
      "90-day-agency-onboarding.webp",
      "A treatment center director and admissions leader reviewing intake workflows on a laptop in an administrative conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/guides/90-day-agency-onboarding-playbook",
      "90-day-agency-onboarding-admissions-coordinator-wearing-headset.webp",
      "An admissions coordinator wearing a headset reviews call logs at a computer workstation in a behavioral healthcare office.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/guides/90-day-agency-onboarding-playbook",
      "90-day-agency-onboarding-diagram-days-61-90-campaign-scalability.webp",
      "Diagram · Days 61 to 90: Campaign Scalability, Negative Keyword Expansion, and C",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/guides/90-day-agency-onboarding-playbook",
      "90-day-agency-onboarding-healthcare-marketing-director-admissions.webp",
      "A healthcare marketing director and admissions manager reviewing an onboarding checklist in a bright administrative room.",
      "79 / 53",
    ),
  ],


  "/resources/guides/meta-ads-creative-behavioral-health/": [
    // [0] hero
    studioImg(
      "resources/guides/meta-ads-creative-behavioral-health",
      "meta-ads-creative-behavioral-health.webp",
      "Comparison diagram showing standard retail funnel with retargeting versus behavioral health funnel where retargeting is restricted.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/guides/meta-ads-creative-behavioral-health",
      "meta-ads-creative-behavioral-health-printed-compliance-policy-documents.webp",
      "Printed compliance policy documents on conference table for behavioral health Meta ad review.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/guides/meta-ads-creative-behavioral-health",
      "meta-ads-creative-behavioral-health-marketing-operator-reviewing-location.webp",
      "Marketing operator reviewing location performance summary in treatment facility corridor at dusk.",
      "3 / 2",
    ),
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
    studioImg(
      "resources/guides/intake-handoff-marketing-roi",
      "intake-handoff-marketing-roi.webp",
      "Sunlit interior entrance hall of a modern healthcare facility with glass doors and polished concrete floors at dawn.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "resources/guides/intake-handoff-marketing-roi",
      "intake-handoff-marketing-roi-phone-headset-closed-intake-folder.webp",
      "A phone headset and closed intake folder resting on a sunlit wooden desk in an admissions office.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/guides/intake-handoff-marketing-roi",
      "intake-handoff-marketing-roi-horizontal-timeline-diagram-illustrating.webp",
      "A horizontal timeline diagram illustrating five intake progression steps from initial call to arrival plan.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/guides/intake-handoff-marketing-roi",
      "intake-handoff-marketing-roi-two-physical-document-folders-resting.webp",
      "Two physical document folders resting side by side on a dark wooden table with a pen.",
      "3 / 2",
    ),
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
    studioImg(
      "resources/guides/why-treatment-center-ceos-fire-marketing-agencies",
      "best-rehab-marketing-agency.webp",
      "Treatment center leadership team reviewing marketing reports and admissions data in a conference room.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "resources/guides/why-treatment-center-ceos-fire-marketing-agencies",
      "best-rehab-marketing-agency-healthcare-ceo-admissions-director.webp",
      "Healthcare CEO and admissions director comparing mismatched marketing and admissions reports at a whiteboard.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "resources/guides/why-treatment-center-ceos-fire-marketing-agencies",
      "best-rehab-marketing-agency-agency-evaluation-scorecard-table-eight.webp",
      "Agency evaluation scorecard table with eight categories, scoring, weight, and notes columns for treatment center leaders.",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "resources/guides/why-treatment-center-ceos-fire-marketing-agencies",
      "best-rehab-marketing-agency-three-column-timeline-graphic-showing.webp",
      "Three-column timeline graphic showing agency verification checkpoints from days 1 to 90 with extension to 180.",
      "1600 / 1067",
    ),
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
    studioImg(
      "resources/guides/building-ai-native-marketing-function",
      "04-results.jpg",
      "Key areas of the AI-native marketing function, from infrastructure and team to governance and the roadmap to maturity",
      "3 / 2",
    ),
    // [1] single in-article slot
    studioImg(
      "resources/guides/building-ai-native-marketing-function",
      "02-concept.jpg",
      "AI-native marketing infrastructure: ad platforms, CRM, analytics, and call tracking feeding application, compute, and data layers",
      "3 / 2",
    ),
  ],

  "/resources/guides/ai-visibility-seo-visibility-complementary/": [
    // [0] hero
    studioImg(
      "resources/guides/ai-visibility-seo-visibility-complementary",
      "ai-visibility-seo-visibility-complementary.webp",
      "Hospital service-line director standing in an office researching at dusk.",
      "7 / 4",
    ),
    // [2] section image
    studioImg(
      "resources/guides/ai-visibility-seo-visibility-complementary",
      "ai-visibility-seo-visibility-complementary-empty-admissions-phone-station.webp",
      "Empty admissions phone station in a healthcare facility corridor.",
      "3 / 2",
    ),
  ],

  "/resources/guides/server-side-tracking-modern-setup/": [
    // [0] hero
    studioImg(
      "resources/guides/server-side-tracking-modern-setup",
      "healthcare-server-side-tracking.webp",
      "A healthcare marketing director and systems architect reviewing an anonymized data pipeline diagram on an office display.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/guides/server-side-tracking-modern-setup",
      "healthcare-server-side-tracking-technical-diagram-comparing-direct.webp",
      "Technical diagram comparing direct client-side tracking data leakage against a secure server-side redaction proxy.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/guides/server-side-tracking-modern-setup",
      "healthcare-server-side-tracking-behavioral-health-marketing-manager.webp",
      "A behavioral health marketing manager and admissions supervisor reviewing conversion attribution metrics on a laptop.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/guides/server-side-tracking-modern-setup",
      "healthcare-server-side-tracking-legal-compliance-marketing-leaders.webp",
      "IT, legal compliance, and marketing leaders meeting in a conference room to coordinate data governance implementation.",
      "79 / 53",
    ),
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
    studioImg(
      "resources/guides/hipaa-digital-marketing-risk",
      "hipaa-compliant-marketing.webp",
      "Healthcare marketing and privacy colleagues review a workflow together.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "resources/guides/hipaa-digital-marketing-risk",
      "hipaa-compliant-marketing-marketing-colleagues-review-notes.webp",
      "Marketing colleagues review notes together at a desk.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "resources/guides/hipaa-digital-marketing-risk",
      "hipaa-compliant-marketing-marketing-lead-privacy-officer-discuss.webp",
      "A marketing lead and privacy officer discuss a document across a table.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "resources/guides/hipaa-digital-marketing-risk",
      "hipaa-compliant-marketing-privacy-professional-organizes-review.webp",
      "A privacy professional organizes review materials at a desk.",
      "3 / 2",
    ),
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
    studioImg(
      "resources/guides/phone-call-attribution-treatment-centers",
      "phone-call-attribution-treatment-centers.webp",
      "An admissions director works at a modern desk reviewing healthcare intake metrics in a brightly lit office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/guides/phone-call-attribution-treatment-centers",
      "phone-call-attribution-treatment-centers-healthcare-intake-coordinator-wearing.webp",
      "A healthcare intake coordinator wearing a headset reviews call records on a computer monitor.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/guides/phone-call-attribution-treatment-centers",
      "phone-call-attribution-treatment-centers-four-step-diagram-showing-progression-ad.webp",
      "A four-step diagram showing the progression from ad click and dynamic call to CRM record and verified admission.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/guides/phone-call-attribution-treatment-centers",
      "phone-call-attribution-treatment-centers-two-healthcare-executives-collaborate.webp",
      "Two healthcare executives collaborate over campaign performance data at a sunlit conference table.",
      "79 / 53",
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
    // [0] hero
    studioImg(
      "media",
      "media.webp",
      "Operator-style professional reviewing paid media performance data on a monitor in a clean office setting.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "media",
      "media-healthcare-marketing-lead-operator.webp",
      "Healthcare marketing lead and operator-consultant meeting in a hospital administrative conference room to discuss advertising strategy.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "media",
      "media-comparison-diagram-showing-lead-only.webp",
      "Comparison diagram showing lead-only attribution tracking versus attribution tracked to admission.",
      "3 / 2",
    ),
  ],


  // 01 hero carried a literal "[CTA]" placeholder button token, so the clean
  // capabilities concept (02) is promoted to hero, followed by process (03) and
  // performance (04). Three images.
  "/media/email-marketing/": [
    // [0] hero
    studioImg(
      "media/email-marketing",
      "email-marketing.webp",
      "Coordinator reviewing printed email campaign reports in a shared marketing office",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "media/email-marketing",
      "email-marketing-three-papers-table-representing-missing.webp",
      "Three papers on a table representing missing segmentation, deliverability, and measurement elements in email programs",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "media/email-marketing",
      "email-marketing-intake-coordinator-reviewing-consent.webp",
      "Intake coordinator reviewing consent form at clinic reception with family member present",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "media/email-marketing",
      "email-marketing-two-column-comparison-showing-common.webp",
      "Two-column comparison showing common email metrics versus outcome metrics like admissions and revenue",
      "3 / 2",
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


  "/media/press/": std4("media/press", [
    "Media hub: press mentions and authority building for behavioral health",
    "From press mentions and credibility to behavioral health authority and growth and revenue, with strategic media exposure",
    "Our framework for behavioral health press coverage: research and identification, story angle development, proactive media outreach, and placement and tracking",
    "Press mentions and media matters: amplifying behavioral health authority, our data-driven press approach, and press coverage impact scaling a multi-location behavioral health organization from operator-side growth work",
  ]),


  // 04 stats carried a garbled headline ("BRAND BPIND / BRAND BRAND"), so three
  // clean images are used: hero, the brand-kit showcase, and the access process.
  "/media/brand-assets/": [
    // [0] hero
    studioImg(
      "media/brand-assets",
      "brand-assets.webp",
      "Marketing Powered primary logo on brand background.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "media/brand-assets",
      "brand-assets-grid-overview-brand-kit-contents-logo.webp",
      "Grid overview of brand kit contents: logo, color swatches, and typography specimen.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "media/brand-assets",
      "brand-assets-marketing-powered-brand-color-palette.webp",
      "Marketing Powered brand color palette: electric blue, black, white, and green swatches with hex values.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "media/brand-assets",
      "brand-assets-marketing-powered-team-working.webp",
      "Marketing Powered team working in a professional office setting.",
      "3 / 2",
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
    // [0] hero
    studioImg(
      "research/studies",
      "studies.webp",
      "Empty admissions phone station with desk phone and intake folders holding call recordings and CRM records.",
      "3 / 2",
    ),
    // [1] hub overview (Capabilities Overview slot)
    studioImg(
      "research/studies/annual-paid-media-and-ai-trends",
      "annual-paid-media-and-ai-trends-printed-google-ads-policy-documents-desk.webp",
      "Three printed pages with highlighted passages on a wooden desk beside a pen and a desk lamp.",
      "3 / 2",
    ),
  ],


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


  // The previous set framed the page for treatment centers only, prescribed a
  // single account architecture, and carried a LegitScript panel and
  // "3 to 24+ locations" results; decorative hero only.
  "/problems/scale-multi-location-campaigns/": [
    // [0] hero
    studioImg(
      "problems/scale-multi-location-campaigns",
      "multi-location-healthcare-marketing.webp",
      "Healthcare marketing and operations leaders review location reports together.",
      "3 / 2",
    ),
    // [1] section image
    studioImg(
      "problems/scale-multi-location-campaigns",
      "multi-location-healthcare-marketing-marketing-intake-colleagues-compare.webp",
      "Marketing and intake colleagues compare reports at a desk.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "problems/scale-multi-location-campaigns",
      "multi-location-healthcare-marketing-four-acquisition-measures-define.webp",
      "Four acquisition measures to define by numerator, denominator, owner and data source.",
      "2 / 3",
    ),
    // [3] section image
    studioImg(
      "problems/scale-multi-location-campaigns",
      "multi-location-healthcare-marketing-marketing-local-operations-colleagues.webp",
      "Marketing and local operations colleagues discuss a location’s capacity.",
      "3 / 2",
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
    // [0] hero
    studioImg(
      "company",
      "company.webp",
      "Empty hospital corridor at dawn with natural light and long shadows",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "company",
      "company-healthcare-executive-walking-through.webp",
      "Healthcare executive walking through hospital lobby toward entrance",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "company",
      "company-server-room-hardware-racks-indicator.webp",
      "Server room with hardware racks and indicator lights at dusk",
      "3 / 2",
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
    // [0] hero
    studioImg(
      "accessibility",
      "accessibility.webp",
      "Modern office workspace with desk laptop and adjustable monitor representing an accessible considered digital environment.",
      "7 / 4",
    ),
    // [1] section image
    studioImg(
      "accessibility",
      "accessibility-person-navigating-website-using-keyboard.webp",
      "Person navigating a website using keyboard controls.",
      "3 / 2",
    ),
    // [2] section image
    studioImg(
      "accessibility",
      "accessibility-diagram-showing-repeating-cycle.webp",
      "Diagram showing a repeating cycle of accessibility review, issue identification, remediation, and re-testing.",
      "3 / 2",
    ),
    // [3] section image
    studioImg(
      "accessibility",
      "accessibility-desk-phone-laptop-representing.webp",
      "Desk phone and laptop representing alternative contact paths for third-party content and integrations.",
      "3 / 2",
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

/** A page's own (non-decorative) images, for the image sitemap. Shared pool art is left out. */
export function ownPageImages(url: string): SlotImg[] {
  const withSlash = url.endsWith("/") ? url : `${url}/`;
  return (ROUTE_OVERRIDES[withSlash] ?? []).filter((i) => i.alt);
}

export function pageImages(url: string): SlotImg[] {
  // Per-page hand-picked sets win over the shared segment pool. Normalize the
  // trailing slash so "/company/about" and "/company/about/" both match.
  const withSlash = url.endsWith("/") ? url : `${url}/`;
  const override = ROUTE_OVERRIDES[withSlash];
  if (override) return override;

  const seg = url.split("/").filter(Boolean)[0] || "home";
  return POOLS[seg] || POOLS.home;
}
