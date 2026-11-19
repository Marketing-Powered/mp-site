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
      "google-ads-explained.webp",
      "Marketing executives evaluating search advertising economics and conversion metrics on an office display.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/google-ads-explained",
      "google-ads-explained-flowchart-illustrating-how-user-search.webp",
      "Flowchart illustrating how user search intent triggers a real-time Google Ads auction and intake conversion.",
      "79 / 53",
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
      "ai-marketing.webp",
      "A marketing operations leader reviews attribution dashboards and workflow graphs on a large monitor in a modern office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/ai-marketing",
      "ai-marketing-photo-strategic-shift-how-ai-marketing.webp",
      "Marketing leader planning an AI marketing architecture beyond one-off prompts.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/ai-marketing",
      "ai-marketing-infographic-capital-allocation-budgeting.webp",
      "Infographic of an AI marketing budget split across compute, talent, and data.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/ai-marketing",
      "ai-marketing-photo-data-sovereignty-compliance.webp",
      "Compliance and marketing leads reviewing data handling for AI tools in a regulated organization.",
      "79 / 53",
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
      "ai-search-optimization-healthcare.webp",
      "Healthcare marketing and clinical operations executives review digital patient acquisition metrics on a display in a conference room.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "resources/ai-search-healthcare-patient-acquisition",
      "ai-search-optimization-healthcare-diagram-illustrating-four-step-ai-search.webp",
      "Diagram illustrating the four-step AI search retrieval process from natural language query to synthesized healthcare answer.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "resources/ai-search-healthcare-patient-acquisition",
      "ai-search-optimization-healthcare-technical-director-web-engineer.webp",
      "Technical director and web engineer reviewing structured healthcare schema and JSON-LD code on an office workstation screen.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "resources/ai-search-healthcare-patient-acquisition",
      "ai-search-optimization-healthcare-healthcare-data-strategist-monitoring.webp",
      "Healthcare data strategist monitoring private marketing data infrastructure and compliance telemetry at an office workstation.",
      "79 / 53",
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
      "ai-governance-for-healthcare.webp",
      "Healthcare marketing and operations leaders review acquisition data governance policies in a modern medical administrative office.",
      "43 / 24",
    ),
    // [1] section image
    studioImg(
      "ai-edge/ai-governance",
      "ai-governance-for-healthcare-admissions-coordinator-secure.webp",
      "An admissions coordinator at a secure workstation handles healthcare inquiries while following data intake boundaries.",
      "79 / 53",
    ),
    // [2] section image
    studioImg(
      "ai-edge/ai-governance",
      "ai-governance-for-healthcare-technical-diagram-showing-four-stages.webp",
      "Technical diagram showing four stages of healthcare AI inference from inbound data to audited conversion logs.",
      "79 / 53",
    ),
    // [3] section image
    studioImg(
      "ai-edge/ai-governance",
      "ai-governance-for-healthcare-healthcare-admissions-marketing.webp",
      "Healthcare admissions and marketing supervisors review lead attribution and audit records in an office setting.",
      "79 / 53",
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
      "ai-for-healthcare-marketing.webp",
      "Healthcare marketing and operations leaders reviewing diagrams together in a professional office setting.",
      "16 / 9",
    ),
    // [1] section image
    studioImg(
      "ai-edge/owned-ai-systems",
      "ai-for-healthcare-marketing-healthcare-marketing-leader-analyzing.webp",
      "Healthcare marketing leader analyzing data, decision and measurement reports in an office.",
      "1600 / 1067",
    ),
    // [2] section image
    studioImg(
      "ai-edge/owned-ai-systems",
      "ai-for-healthcare-marketing-diagram-owned-ai-marketing-system.webp",
      "Diagram of an owned AI marketing system showing data minimization before model inference and human review before campaign changes.",
      "1600 / 1067",
    ),
    // [3] section image
    studioImg(
      "ai-edge/owned-ai-systems",
      "ai-for-healthcare-marketing-healthcare-leaders-collaboratively.webp",
      "Healthcare leaders collaboratively reviewing an acquisition audit map in a meeting room.",
      "1600 / 1067",
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

  // Process slot uses the clean takeaways graphic (08) — Asana's 03 carried
  // raw hex-swatch artifacts and "[CTA]" placeholder tokens.
  "/company/contact/": std4("company/contact", [
    "Behavioral health marketing expertise: connect with specialists in compliance, specialized media, and AI-native infrastructure",
    "Get in touch with Marketing Powered: start a conversation about compliance, admissions growth, and targeted leads with vertical-specific experts",
    "Contacting Marketing Powered: connect with experts, navigate compliance and restrictions, drive measurable results, and start a conversation",
    "Behavioral health marketing impact: $50M+ managed media spend, court-certified expert witness, and LegitScript certification fluency",
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
