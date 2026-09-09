# Claude Code Build Prompt — Marketing Powered Site V3

**Model:** Use Opus 4.8
**Skill:** Use the frontend design skill for visual quality
**Worktree:** Set to this repo

---

## Context

You are extending and upgrading the Marketing Powered website. The Next.js project already has ~29 interior pages built using the Midnight Atelier design system (dark premium, near-black canvas, Fraunces serif, Manrope sans, blue gradient accents). You need to:

1. **Build 12 new pages** from content files already in the repo
2. **Update ALL existing pages** with more CTAs, form-first conversion strategy, and image slots

This is a standard Next.js 16 App Router project — no non-standard APIs or conventions.

---

## What Exists in the Repo

### Design System

- **Theme tokens:** `src/components/site/theme.ts` — INK (#050B16), accent (#0090F0), accentLight (#7FCBFF), green (#08AE67), serif (Fraunces), sans (Manrope), mono (Space Mono)
- **Homepage reference:** `src/app/design-1/page.tsx` — the canonical design language. Match its visual quality everywhere.

### Shared Components (in `src/components/site/`)

| Component | What it does |
|-----------|-------------|
| `PageShell.tsx` | Full-page chrome: near-black canvas, film-grain + radial glow, Nav + Footer wrapper |
| `Nav.tsx` | Desktop + mobile nav with dropdown menus. Config in `src/lib/nav.ts` |
| `Footer.tsx` | Footer with link columns + brand info |
| `MarkdownPage.tsx` | Standard page template: Hero → Sections → FAQ → CtaBand. Automatically parses markdown files and renders them with ImageSlots inserted between sections |
| `Section.tsx` | Renders one content section with headings, paragraphs, lists, inline CTAs |
| `CtaBand.tsx` | Full-width CTA block with gradient background, headline, body, and PrimaryCta button |
| `FaqAccordion.tsx` | Expandable FAQ section |
| `ImageSlot.tsx` | Dashed-border placeholder for images Jason will add later |
| `Forms.tsx` | `LeadForm` (configurable form fields) and `BookingBlock` (calendar embed placeholder) |
| `Breadcrumbs.tsx` | Breadcrumb navigation |
| `ServiceCard.tsx` | Card component for hub page grids |
| `HubPage.tsx` | Hub page template with child page card grid |
| `ui.tsx` | Design primitives: `GoldRule`, `Kicker`, `PrimaryCta`, `GhostCta`, `RichText`, `SectionHeading` |
| `Reveal.tsx` | Framer Motion scroll-reveal wrapper (in `src/components/`) |

### Content Layer

- **Page content:** `content/pages/**/*.md` — 41 markdown files with frontmatter (title, url, keywords) and full page copy
- **Data index:** `content/_data.json` — maps URLs to content files with draft IDs
- **Content parser:** `src/lib/pages.ts` — `getPage()` parses markdown into structured data (hero, sections, FAQ), `pageMetadata()` generates Next.js metadata
- **Hub config:** `HUB_CHILDREN` in `src/lib/pages.ts` — maps hub pages to their child pages for card grids

### Existing Page Pattern

Every existing page follows this minimal pattern:

```tsx
import MarkdownPage from "@/components/site/MarkdownPage";
import { pageMetadata } from "@/lib/pages";

const FILE = "who-we-help/behavioral-health.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return <MarkdownPage file={FILE} />;
}
```

The `MarkdownPage` component handles everything: hero, sections, image slots, FAQ, and final CTA.

---

## Part 1: Build 12 New Pages

### New Routes to Create

Each needs a `page.tsx` file in `src/app/` at the matching path:

**P1 — Behavioral Health Depth (1 page)**
- `/who-we-help/behavioral-health/residential-treatment/` → `who-we-help/behavioral-health/residential-treatment.md`

**P1 — Mental Health Depth (4 pages)**
- `/who-we-help/mental-health/outpatient-clinics/` → `who-we-help/mental-health/outpatient-clinics.md`
- `/who-we-help/mental-health/therapy-groups/` → `who-we-help/mental-health/therapy-groups.md`
- `/who-we-help/mental-health/tele-mental-health/` → `who-we-help/mental-health/tele-mental-health.md`
- `/who-we-help/mental-health/psychiatric-practices/` → `who-we-help/mental-health/psychiatric-practices.md`

**P4 — Problems (1 page)**
- `/problems/reduce-cpa/` → `problems/reduce-cpa.md`

**P5 — Legal (5 pages)**
- `/legal/privacy-policy/` → `legal/privacy-policy.md`
- `/legal/terms/` → `legal/terms.md`
- `/legal/cookie-policy/` → `legal/cookie-policy.md`
- `/legal/advertising-disclaimer/` → `legal/advertising-disclaimer.md`
- `/legal/hipaa-phi-disclaimer/` → `legal/hipaa-phi-disclaimer.md`

**P5 — Company (1 page)**
- `/company/about-us/` → `company/about-us.md`

### Build Instructions for New Pages

**Vertical sub-pages** (residential-treatment, outpatient-clinics, therapy-groups, tele-mental-health, psychiatric-practices): Use the existing MarkdownPage component, same as behavioral-health and mental-health pages. These are vertical depth pages under their parent hubs.

**Problems page** (reduce-cpa): Use MarkdownPage. This is a problem/use-case landing page. Style like a service page but with problem-focused copy.

**Legal pages** (privacy-policy, terms, cookie-policy, advertising-disclaimer, hipaa-phi-disclaimer): These are text-heavy legal documents. Create a `LegalPage` component variant or override the MarkdownPage styling:
- No hero image slot (legal pages don't need hero banners)
- Tighter, more readable layout (max-w-3xl for the prose)
- Keep the PageShell (Nav + Footer)
- Minimal visual flair — clean, readable text. Use the design system typography but skip image slots.
- No FAQ accordion unless the content has FAQ section
- Keep a simple CTA at the bottom linking to /company/contact/ ("Questions about this policy? Contact us.")

**About-us page**: Use MarkdownPage. NOTE: There is already a /company/about/ page. This /company/about-us/ may be a duplicate or longer version. Build it as a separate page; Jason will decide whether to consolidate.

### Update Hub Pages

After building new pages, update the hub children in `src/lib/pages.ts` (`HUB_CHILDREN`):

```ts
// Add to "who-we-help/index.md" children or create new hubs:
"who-we-help/behavioral-health.md": [
  { href: "/who-we-help/behavioral-health/residential-treatment/", file: "who-we-help/behavioral-health/residential-treatment.md" },
],
"who-we-help/mental-health.md": [
  { href: "/who-we-help/mental-health/outpatient-clinics/", file: "who-we-help/mental-health/outpatient-clinics.md" },
  { href: "/who-we-help/mental-health/therapy-groups/", file: "who-we-help/mental-health/therapy-groups.md" },
  { href: "/who-we-help/mental-health/tele-mental-health/", file: "who-we-help/mental-health/tele-mental-health.md" },
  { href: "/who-we-help/mental-health/psychiatric-practices/", file: "who-we-help/mental-health/psychiatric-practices.md" },
],
```

### Update Navigation

Update `src/lib/nav.ts` to add new sections:

- Under "Who We Help" → "Behavioral Health" children: add Residential Treatment
- Under "Who We Help" → "Mental Health" children: add Outpatient Clinics, Therapy Groups, Tele-Mental Health, Psychiatric Practices
- Add a "Legal" section to the footer in `src/components/site/Footer.tsx` with links to Privacy Policy, Terms, Cookie Policy

---

## Part 2: Update ALL Existing Pages — CTA Strategy Overhaul

### Problem

The current site has a single CtaBand at the bottom of each page. That's not enough conversion touchpoints. Also, the primary CTA is "Book a Discovery Call" which pushes people to phone calls. We want to shift to form fills and email.

### New CTA Strategy

**Primary CTA:** "Request a Free Audit" → links to `/get-started/request-an-audit/`
**Secondary CTA:** "Get Your Custom Strategy" → links to `/get-started/`
**Tertiary CTA:** "Email Us" → mailto:hello@marketingpowered.ai
**De-emphasize:** Phone calls. Phone number stays in footer/nav but is NOT the primary action anywhere.

### New Component: InlineCta

Create `src/components/site/InlineCta.tsx` — a lighter-weight CTA that can be inserted between content sections. Unlike the full CtaBand (which is a large rounded card with gradient background), InlineCta should be:

```tsx
// Compact inline CTA that sits between content sections
// Visually lighter than CtaBand but still eye-catching
// Props: headline, body (optional), ctaText, ctaLink, variant ("primary" | "secondary" | "email")
```

Design it to fit naturally between two Section components without overwhelming the content flow. Use the design system colors. Suggestions:
- A horizontal rule-style divider with centered CTA text and button
- Or a slim banner with left-aligned text and right-aligned button
- Use the gradient accent colors but at lower opacity than CtaBand
- Wrap in Reveal for scroll animation

### New Component: StickyMobileCta

Create `src/components/site/StickyMobileCta.tsx` — a fixed-bottom bar visible only on mobile (hidden on md+):

```tsx
// Fixed bottom bar on mobile with primary CTA
// Only appears after scrolling past the hero
// Slides up on scroll-down, appears on scroll-up (standard UX pattern)
// "Request a Free Audit →" button
// Small "or email us" link below
```

### Update MarkdownPage.tsx

Modify the MarkdownPage component to:

1. **Insert InlineCta after every 2-3 sections** instead of just one CtaBand at the end
2. **Alternate CTA variants**: first InlineCta = "Request a Free Audit", second = "Get Your Custom Strategy", etc.
3. **Keep the final CtaBand** but change its default text:
   - headline: "Ready to see what AI-native marketing can do for your treatment center?"
   - ctaText: "Request a Free Audit" (not "Book a Discovery Call")
   - ctaLink: "/get-started/request-an-audit/"
   - Add a secondary line: `<p>or email us at <a href="mailto:hello@marketingpowered.ai">hello@marketingpowered.ai</a></p>`
4. **Add StickyMobileCta** to the page shell

### Update CtaBand.tsx

- Change the default `ctaText` from "Book a Discovery Call" to "Request a Free Audit"
- Change the default `ctaLink` from "/get-started/" to "/get-started/request-an-audit/"
- Add an optional `secondaryCta` prop for the email link or a GhostCta
- Add optional `emailLink` prop that renders "or email us at hello@marketingpowered.ai" below the primary CTA

### Update Footer.tsx

- Change the bottom-right "Book a Discovery Call →" link to "Request a Free Audit →" pointing to /get-started/request-an-audit/
- Add a Legal column with Privacy Policy, Terms, Cookie Policy links
- Keep the phone number but add the email (hello@marketingpowered.ai) more prominently

### Update Get-Started Pages

The `/get-started/request-an-audit/` page form should capture these fields:
- Full Name (required)
- Email (required)
- Company / Practice Name (required)
- Website URL
- Monthly Ad Spend (select: Under $5K, $5K-$15K, $15K-$50K, $50K-$100K, $100K+)
- Biggest Marketing Challenge (textarea, required)

The form should POST to `/api/contact` (create a placeholder API route that returns 200 and redirects to /get-started/thanks/).

### Create API Route

Create `src/app/api/contact/route.ts`:

```ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // TODO: Wire to CRM / email service
  const data = await request.json();
  console.log("Contact form submission:", data);
  return NextResponse.json({ success: true });
}
```

### Update Thanks Page

The `/get-started/thanks/` page should set expectations for EMAIL follow-up, not a call:
- "We've received your request. Expect a detailed audit report in your inbox within 2 business days."
- "In the meantime, explore our case studies" (link)
- Remove any "we'll call you" language

---

## Part 3: Image Slot Updates

Keep the existing ImageSlot dashed-border placeholder approach. Target image slot counts:

- **Normal pages:** 2-3 image slots spread throughout
- **Content-heavy pages** (behavioral-health, mental-health, services hub, etc.): 4-5 image slots
- **Legal pages:** 0 image slots (text only)
- **Get-started pages:** 0-1 image slots

The current MarkdownPage already auto-inserts image slots. Verify it works correctly for the new pages and adjust if needed.

---

## Part 4: Update Internal Links

### Link resolution

The existing `src/lib/links.ts` handles link resolution. Make sure it supports the new page URLs. Add any new pages to the link map if needed.

### Cross-linking

The behavioral-health and mental-health hub pages should link to their new child pages. Update the hub page content or the MarkdownPage rendering to show child page cards on vertical hub pages (behavioral-health.md and mental-health.md), similar to how HubPage.tsx works for the top-level hubs.

---

## Technical Rules

1. Use standard, current Next.js App Router conventions
2. Use Tailwind CSS for all styling
3. Use Framer Motion via the existing `Reveal` component for animations
4. Wrap everything in `Reveal` — every section, every card, every CTA
5. Match the visual quality of design-1 on every page
6. All pages use the App Router
7. All forms should POST to `/api/contact` endpoint
8. Email links use `mailto:hello@marketingpowered.ai`
9. Run `npm run build` and verify no errors
10. If a page looks generic or template-like, redo it

## Build Order

1. Create the InlineCta and StickyMobileCta components
2. Create the /api/contact placeholder route
3. Update MarkdownPage.tsx with new CTA insertion logic
4. Update CtaBand.tsx defaults and add email option
5. Create the LegalPage component for legal pages
6. Build all 12 new page routes (page.tsx files)
7. Update HUB_CHILDREN in pages.ts
8. Update nav.ts with new navigation items
9. Update Footer.tsx with legal links and email
10. Update the get-started/request-an-audit form fields
11. Update the thanks page messaging
12. Update links.ts if needed for new routes
13. Run `npm run build` — fix all errors
14. Visually verify key pages render correctly

## Banned Phrasing

Do not use these words/phrases in any copy you write or modify:
leverage, cutting-edge, game-changer, revolutionary, seamlessly, unlock, harness, landscape, empower, transformative
