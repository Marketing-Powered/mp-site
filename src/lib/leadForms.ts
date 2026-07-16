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
};

export type LeadFormConfig = {
  title: string;
  intro: string;
  submitLabel: string;
  /** Identifies which form the lead came from; consumed by the GHL
      workflow / opportunity mapping — keep values stable. */
  source: string;
  fields: LeadField[];
};

export type LeadFormKey = "audit" | "call" | "contact" | "qualification";

export const LEAD_FORMS: Record<LeadFormKey, LeadFormConfig> = {
  audit: {
    title: "Request your free marketing audit",
    intro:
      "Tell us about your center and we'll review your paid media, landing pages, attribution, and compliance posture. You'll get a written assessment of where the opportunities are, straight to your inbox.",
    submitLabel: "Request My Audit",
    source: "Request an Audit",
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "company", label: "Company / Practice Name", type: "text", required: true },
      { name: "website", label: "Website URL", type: "text" },
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
      { name: "name", label: "Full Name", required: true },
      { name: "org", label: "Organization", required: true },
      { name: "email", label: "Work Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "notes", label: "What would you like to cover?", type: "textarea" },
    ],
  },
  contact: {
    title: "Start a conversation",
    intro:
      "Tell us about your center and what you're trying to solve. We'll get back to you within one business day.",
    submitLabel: "Send Message",
    source: "Contact",
    fields: [
      { name: "name", label: "Full Name", required: true },
      { name: "org", label: "Organization", required: true },
      { name: "email", label: "Work Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "message", label: "How can we help?", type: "textarea", required: true },
    ],
  },
  qualification: {
    title: "See if we're the right fit",
    intro:
      "A few quick questions help us route you to the right next step. We work best with behavioral health and mental health providers ready to scale compliant patient acquisition.",
    submitLabel: "Check My Fit",
    source: "Qualification",
    fields: [
      { name: "name", label: "Full Name", required: true },
      { name: "org", label: "Organization", required: true },
      { name: "email", label: "Work Email", type: "email", required: true, full: true },
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
