# Codex Build Prompt — Marketing Powered Full Site

Paste this into Codex (or Claude Code). Set the worktree to this repo.

---

## Context

You are building the full Marketing Powered website. The Next.js project already has a homepage built at `src/app/design-1/page.tsx` using the "Midnight Atelier" design language (dark premium, near-black canvas, Fraunces serif, Manrope sans, blue gradient accents). You need to build **29 interior pages** using the same visual system.

## What exists in the repo

- **Homepage design**: `src/app/design-1/page.tsx` — Use this as the design reference. Match its typography, color palette, animation patterns, and component styling.
- **Brand components**: `src/components/brand.tsx` (Logo, Figure), `src/components/Reveal.tsx` (scroll animations)
- **Content library**: `src/lib/content.ts` — Homepage content. Interior page content is in separate files below.
- **Page content**: `content/pages/**/*.md` — 29 markdown files, each containing full page copy with frontmatter (title, url, keywords, target word count) and structured content (H1, H2 sections, CTAs, FAQs, internal links, proof points)
- **Brand images**: `public/images/pages/**/*.jpg` — 8 brand graphics per page (run `scripts/download_images.py` first if images are missing)
- **Framework**: Next.js 14+ with TypeScript, Tailwind CSS, App Router, Framer Motion

## Design System (from design-1)

```
Colors:
  Background: #050B16 (near-black ink)
  Text: #EDEAE3 (warm off-white)
  Accent gradient: #0090F0 → #7FCBFF (blue)
  Green CTA: #08AE67
  Muted text: white/55 opacity

Typography:
  Serif (headings): Fraunces, Georgia, serif
  Sans (body): Manrope, system-ui, sans-serif
  Mono (data): Space Mono, monospace

Patterns:
  - GoldRule gradient dividers
  - Film-grain texture overlay
  - Radial gradient atmosphere (blue glow)
  - Scroll reveal animations via Reveal component
  - Rounded-full CTA buttons with gradient hover fills
  - Cards with border border-white/10 and backdrop blur
```

## Pages to Build

### Route Structure

Build each page as a Next.js App Router page at the URL path specified. Use dynamic content loading from the markdown files.

```
src/app/
  services/
    page.tsx                    → /services/ (hub)
    landing-page-optimization/
      page.tsx                  → /services/landing-page-optimization/
    paid-media/
      page.tsx                  → /services/paid-media/
    meta-ads-management/
      page.tsx                  → /services/meta-ads-management/
    analytics-and-attribution/
      page.tsx                  → /services/analytics-and-attribution/
    call-tracking-and-intake-attribution/
      page.tsx                  → /services/call-tracking-and-intake-attribution/
    google-ads-management/
      page.tsx                  → /services/google-ads-management/
    web-development/
      page.tsx                  → /services/web-development/ (hub)
      website-design-and-build/
        page.tsx                → /services/web-development/website-design-and-build/
      cro-development/
        page.tsx                → /services/web-development/cro-development/
      technical-seo-and-performance/
        page.tsx                → /services/web-development/technical-seo-and-performance/
      landing-page-development/
        page.tsx                → /services/web-development/landing-page-development/
      integrations-and-tracking/
        page.tsx                → /services/web-development/integrations-and-tracking/
  ai-edge/
    page.tsx                    → /ai-edge/ (hub)
    social-media/
      page.tsx                  → /ai-edge/social-media/
    ai-governance/
      page.tsx                  → /ai-edge/ai-governance/
    data-sovereignty/
      page.tsx                  → /ai-edge/data-sovereignty/
    owned-ai-systems/
      page.tsx                  → /ai-edge/owned-ai-systems/
    ai-in-paid-media/
      page.tsx                  → /ai-edge/ai-in-paid-media/
  get-started/
    page.tsx                    → /get-started/ (hub)
    qualification/
      page.tsx                  → /get-started/qualification/
    request-an-audit/
      page.tsx                  → /get-started/request-an-audit/
    book-a-call/
      page.tsx                  → /get-started/book-a-call/
    thanks/
      page.tsx                  → /get-started/thanks/
  who-we-help/
    page.tsx                    → /who-we-help/ (hub)
    behavioral-health/
      page.tsx                  → /who-we-help/behavioral-health/
    mental-health/
      page.tsx                  → /who-we-help/mental-health/
  company/
    about/
      page.tsx                  → /company/about/
    contact/
      page.tsx                  → /company/contact/
```

## Content File Structure

Each markdown file in `content/pages/` has this structure:

```markdown
---
title: "Page Title | Marketing Powered"
url: "/services/example/"
primary_keyword: "example keyword"
secondary_keywords: "keyword two, keyword three"
target_word_count: "1200-1800"
---

PAGE BRIEF ACKNOWLEDGMENT
URL: /services/example/ | Primary keyword: ... | ...

SEO METADATA
Title tag: ...
Meta description: ...
H1: ...
Hero image alt: ...

PAGE COPY

[H1 heading]
[Hero subhead]
[CTA] [CTA text]

[H2 Section 1]
[Section content...]

[H2 Section 2]
[Section content...]

FAQ
Q: ...
A: ...

SCHEMA RECOMMENDATION
...

DELIVERY NOTES
...
```

## How to Parse the Content

Create a utility at `src/lib/pages.ts` that:

1. Reads markdown files from `content/pages/`
2. Parses frontmatter (title, url, primary_keyword, etc.)
3. Extracts the PAGE COPY section (between "PAGE COPY" and "SCHEMA RECOMMENDATION")
4. Parses H2 sections, paragraphs, bullet lists, CTAs (`[CTA] text` or `[CTA] [link text](/url/)`)
5. Parses FAQ blocks (Q:/A: pairs)
6. Returns structured data for each page

## Page Templates to Create

### 1. Service Page Template (13 pages)

Used for all `/services/` pages (except hub) and `/services/web-development/` children.

Sections:
- **Hero**: H1, subhead, primary CTA, hero image (`01-hero-banner.jpg`)
- **Key Concept**: H2 section with illustration (`02-key-concept-illustration.jpg`)
- **Process**: H2 section with process infographic (`03-infographic-process-steps.jpg`)
- **Stats/Data**: Proof points with data visual (`04-infographic-stats-data.jpg`)
- **Features/Details**: Additional H2 sections with icon set (`05-supporting-icon-set.jpg`)
- **Quote/Proof**: Social proof callout (`06-quote-callout-graphic.jpg`)
- **Additional Sections**: Remaining H2s with divider (`07-section-divider-illustration.jpg`)
- **FAQ**: Accordion-style FAQ section
- **CTA Section**: Final conversion block with summary visual (`08-summary-takeaways-visual.jpg`)

### 2. Hub Page Template (5 pages)

Used for `/services/`, `/services/web-development/`, `/ai-edge/`, `/get-started/`, `/who-we-help/`.

Sections:
- **Hero**: H1, subhead explaining the category
- **Card Grid**: Cards linking to each child page with brief descriptions
- **Overview Content**: Hub-specific content from the markdown
- **CTA**: Route to get-started

### 3. AI Edge Page Template (5 pages)

Used for `/ai-edge/` children. Similar to service pages but with:
- More technical/futuristic visual treatment
- AI-specific imagery and proof points
- Emphasis on proprietary technology and data sovereignty

### 4. Vertical Page Template (2 pages)

Used for `/who-we-help/behavioral-health/` and `/who-we-help/mental-health/`.

Sections:
- **Hero**: Vertical-specific headline, empathetic tone
- **Understanding Section**: Shows deep vertical knowledge
- **Services Grid**: Links to relevant services
- **Results**: Vertical-specific proof points and case study references
- **Compliance**: HIPAA, LegitScript, Google sensitive vertical awareness
- **FAQ**: Vertical-specific questions
- **CTA**: Get started / qualification

### 5. Contact/Form Pages (4 pages)

Used for `/get-started/qualification/`, `/get-started/request-an-audit/`, `/get-started/book-a-call/`, `/company/contact/`.

Sections:
- **Hero**: Short headline, reassuring subhead
- **Form or Embed**: Contact form or Calendly embed
- **Supporting Info**: What to expect, response times
- **Trust Signals**: Proof points, compliance badges

### 6. About Page (1 page)

Used for `/company/about/`.
- **Founder Story**: Jason Martinez background, Haven Health, court-certified expert
- **Company Mission**: AI-native positioning
- **Credentials**: Proof points, certifications
- **CTA**: Get started

### 7. Thanks Page (1 page)

Used for `/get-started/thanks/`.
- **Confirmation**: Thank you message
- **Next Steps**: What to expect
- **Suggested Pages**: Links to explore while waiting

## Image Mapping

Each page has 8 images in `public/images/pages/{section}/{page}/`:

| Image | Purpose | Suggested Usage |
|-------|---------|----------------|
| `01-hero-banner.jpg` | Hero section | Full-width or large hero background |
| `02-key-concept-illustration.jpg` | Primary concept | Alongside first H2 section |
| `03-infographic-process-steps.jpg` | Process visual | Process/how-it-works section |
| `04-infographic-stats-data.jpg` | Data/stats | Statistics or proof points section |
| `05-supporting-icon-set.jpg` | Icons/features | Feature grid or bullet section |
| `06-quote-callout-graphic.jpg` | Social proof | Quote or testimonial block |
| `07-section-divider-illustration.jpg` | Visual break | Between major sections |
| `08-summary-takeaways-visual.jpg` | Summary/CTA | Final CTA section background |

## Shared Components to Create

1. **PageLayout** — Wraps all pages with nav, footer, background effects
2. **ServiceHero** — Reusable hero with H1, subhead, CTA, image
3. **SectionBlock** — Standard content section with optional image
4. **ProofBar** — Horizontal strip of proof points/stats
5. **FAQAccordion** — Expandable FAQ (match design-1 style)
6. **CTASection** — Final conversion section
7. **HubCardGrid** — Grid of linked cards for hub pages
8. **SiteNav** — Full navigation with Services, AI Edge, Who We Help, Get Started dropdowns
9. **SiteFooter** — Footer with all page links organized by section

## SEO Requirements

For each page, set:
- `<title>` from the frontmatter title
- `<meta name="description">` from the SEO METADATA section
- Proper `<h1>`, `<h2>` hierarchy matching the content
- Internal links as specified in the page content (e.g., `[text](/url/)`)
- Schema markup as recommended in each page's SCHEMA RECOMMENDATION section
- For `/get-started/qualification/`: add `<meta name="robots" content="noindex">`

## Brand Rules (from content briefs)

- **Approved colors**: #2CACE8 blue, #000000 black, #FFFFFF white, #08AE67 green accent
- **Typography**: Just Sans Variable (or Manrope as fallback) for body, stronger weights for headings
- **Avoid these words**: em dashes, crucial, ever-evolving, leverage, "in today's fast-paced"
- **Tone**: Direct, operator-to-operator. Calm, specific, grounded in proof. Not hype.
- **Brand assets**: Full logo in hero, standalone mark for trust blocks

## Build Order

1. Create `src/lib/pages.ts` content parser
2. Create shared components (PageLayout, ServiceHero, etc.)
3. Build the hub pages first (they link to children)
4. Build service pages (largest group, establishes patterns)
5. Build AI Edge pages
6. Build Who We Help pages
7. Build Get Started pages (forms/CTAs)
8. Build Company pages
9. Add SiteNav and SiteFooter to all pages
10. Verify all internal links work
11. Run `next build` to confirm no errors
