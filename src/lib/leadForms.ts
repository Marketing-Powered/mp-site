/* Client-safe shared definitions for the site's lead forms.
   One source of truth consumed by both the full-page forms
   (src/app/get-started/*, /company/contact) and the popup lead modal
   that CTA buttons open — so the popup and the page always ask the
   same questions and stamp the same `source` for GHL field mapping. */

export type LeadField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  full?: boolean;
  /** HTML autocomplete token (name, organization, email, tel…). */
  autocomplete?: string;
};

export type LeadFormConfig = {
  title: string;
  intro: string;
  submitLabel: string;
  /** Identifies which form the lead came from; consumed by the GHL
      workflow / opportunity mapping — keep values stable. */
  source: string;
  fields: LeadField[];
  /** Small print under the submit button. Defaults to DEFAULT_FORM_HELPER. */
  helper?: string;
  /** Button label while the request is in flight. Defaults to "Sending…". */
  pendingLabel?: string;
  /** Confirmation shown once the server has accepted the request. */
  successTitle?: string;
  successBody?: string;
  /** Shown when the server did not accept the request. Defaults to DEFAULT_FORM_ERROR. */
  errorMessage?: string;
};

export type LeadFormKey = "audit" | "call" | "contact" | "qualification";

export const DEFAULT_FORM_HELPER =
  "HIPAA-aware intake. Your information stays within our controlled environment.";

export const DEFAULT_FORM_ERROR =
  "We could not send your request. Please try again or email info@marketingpowered.ai.";

export const LEAD_FORMS: Record<LeadFormKey, LeadFormConfig> = {
  audit: {
    title: "Request your free marketing audit",
    intro:
      "Tell us about your center and we'll review your paid media, landing pages, attribution, and compliance posture. You'll get a written assessment of where the opportunities are, straight to your inbox.",
    submitLabel: "Request My Audit",
    source: "Request an Audit",
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true, autocomplete: "name" },
      { name: "email", label: "Email", type: "email", required: true, autocomplete: "email" },
      {
        name: "company",
        label: "Company / Practice Name",
        type: "text",
        required: true,
        autocomplete: "organization",
      },
      { name: "website", label: "Website URL", type: "text", autocomplete: "url" },
      {
        name: "spend",
        label: "Monthly Ad Spend",
        type: "select",
        options: ["Under $5K", "$5K-$15K", "$15K-$50K", "$50K-$100K", "$100K+"],
      },
      {
        name: "challenge",
        label: "Biggest Marketing Challenge",
        type: "textarea",
        required: true,
      },
    ],
  },
  call: {
    title: "Book a discovery call",
    intro:
      "Share a few details and a strategist who has operated at scale in behavioral health will follow up within one business day.",
    submitLabel: "Request My Call",
    source: "Book a Call",
    fields: [
      { name: "name", label: "Full Name", required: true, autocomplete: "name" },
      { name: "org", label: "Organization", required: true, autocomplete: "organization" },
      { name: "email", label: "Work Email", type: "email", required: true, autocomplete: "email" },
      { name: "phone", label: "Phone", type: "tel", autocomplete: "tel" },
      { name: "notes", label: "What would you like to cover?", type: "textarea" },
    ],
  },
  /* The strategy-call request. /company/contact is the destination for the
     homepage's primary action, so this form asks for a conversation — not a
     booked appointment, not an audit — and keeps the first step to contact
     details only (no budget, website, patient details, or qualification
     questions). Copy follows the November 2026 homepage package. */
  contact: {
    title: "Request a strategy call",
    intro:
      "Tell us who you are and how to reach you. We will contact you to discuss your priorities and arrange a strategy call.",
    submitLabel: "Request a strategy call",
    source: "Contact",
    helper: "Please do not include patient information or other sensitive personal information.",
    pendingLabel: "Sending your request...",
    successTitle: "Request received",
    successBody:
      "Your request has been received. We will contact you using the information provided to arrange a strategy call.",
    errorMessage:
      "We could not send your request. Please try again or email info@marketingpowered.ai.",
    fields: [
      { name: "name", label: "Name", required: true, autocomplete: "name" },
      { name: "org", label: "Organization", required: true, autocomplete: "organization" },
      { name: "email", label: "Email", type: "email", required: true, autocomplete: "email" },
      { name: "phone", label: "Phone", type: "tel", autocomplete: "tel" },
    ],
  },
  qualification: {
    title: "See if we're the right fit",
    intro:
      "A few quick questions help us route you to the right next step. We work best with behavioral health and mental health providers ready to scale compliant patient acquisition.",
    submitLabel: "Check My Fit",
    source: "Qualification",
    fields: [
      { name: "name", label: "Full Name", required: true, autocomplete: "name" },
      { name: "org", label: "Organization", required: true, autocomplete: "organization" },
      {
        name: "email",
        label: "Work Email",
        type: "email",
        required: true,
        full: true,
        autocomplete: "email",
      },
      {
        name: "vertical",
        label: "Primary Vertical",
        type: "select",
        options: ["Behavioral Health", "Mental Health", "Both", "Other"],
      },
      {
        name: "locations",
        label: "Number of Locations",
        type: "select",
        options: ["1", "2–5", "6–15", "16+"],
      },
      {
        name: "spend",
        label: "Current Monthly Ad Spend",
        type: "select",
        options: ["Not running paid yet", "Under $25k", "$25k–$100k", "$100k–$500k", "$500k+"],
      },
      {
        name: "timeline",
        label: "Timeline to Start",
        type: "select",
        options: ["Immediately", "This quarter", "Exploring options"],
      },
      { name: "notes", label: "Anything else we should know?", type: "textarea" },
    ],
  },
};

/* Lead-generating destinations → which popup form a CTA should open.
   Any other href is navigational and the CTA just links as before. */
const FORM_ROUTES: Record<string, LeadFormKey> = {
  "/get-started/request-an-audit": "audit",
  "/get-started/book-a-call": "call",
  "/company/contact": "contact",
  "/get-started/qualification": "qualification",
  // the get-started hub's job is conversion; default it to the primary CTA
  "/get-started": "audit",
};

/** Which popup form (if any) a CTA pointing at `href` should open. */
export function leadFormKeyForHref(href: string): LeadFormKey | null {
  if (!href || !href.startsWith("/")) return null;
  const path = (href.split(/[?#]/)[0] ?? "").replace(/\/+$/, "") || "/";
  return FORM_ROUTES[path] ?? null;
}
