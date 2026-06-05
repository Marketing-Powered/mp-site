# Codex Build Prompt — Marketing Powered Full Site (No Images)

Set the worktree to this repo.

---

## Context

You are building the full Marketing Powered website. The Next.js project already has a homepage built at src/app/design-1/page.tsx using the Midnight Atelier design language (dark premium, near-black canvas, Fraunces serif, Manrope sans, blue gradient accents). Build 29 interior pages using the same visual system.

## What exists in the repo

- **Homepage design**: src/app/design-1/page.tsx and src/app/page.tsx. Use this as the design reference. Match its typography, color palette, animation patterns, and component styling.
- **Brand components**: src/components/ (Logo, Figure, Reveal scroll animations)
- **Homepage content**: src/lib/content.ts
- **Page content**: content/pages/**/*.md. 29 markdown files with frontmatter (title, url, keywords, target word count) and full page copy (H1, H2 sections, CTAs, FAQs, internal links, proof points)
- **Framework**: Next.js with TypeScript, Tailwind CSS, App Router, Framer Motion

## Design System (match design-1 exactly)

Colors:
  Background: #050B16 (near-black)
  Text: #EDEAE3 (warm off-white)
  Accent gradient: #0090F0 to #7FCBFF (blue)
  Green CTA: #08AE67
  Muted text: white/55 opacity

Typography:
  Serif headings: Fraunces, Georgia, serif
  Sans body: Manrope, system-ui, sans-serif
  Mono data: Space Mono, monospace

Patterns:
  - Gradient dividers
  - Film-grain texture overlay
  - Radial gradient atmosphere (blue glow)
  - Scroll reveal animations via Reveal component
  - Rounded-full CTA buttons with gradient hover
  - Cards with border-white/10 and backdrop blur

## Images: SKIP FOR NOW

Do NOT generate images. Do NOT use placeholder images. Instead, leave clean image slots in each page where images will be added manually later. Use a simple div with a dashed border, the page section name, and approximate dimensions so Jason knows where to drop in the 2-3 images per page he will select.

Example image slot:
```jsx
<div className="w-full aspect-video rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center text-white/30 text-sm">
  Image: Hero Banner
</div>
```

Use 2-3 image slots per page spread throughout the content. For pages with a lot of content, use up to 4-5. Place them between major sections to break up the text.

## Pages to Build

Read each markdown file in content/pages/ and build the corresponding Next.js page. The URL path matches the frontmatter url field.

### Route structure:
- /services/ (hub)
- /services/landing-page-optimization/
- /services/paid-media/
- /services/meta-ads-management/
- /services/google-ads-management/
- /services/analytics-and-attribution/
- /services/call-tracking-and-intake-attribution/
- /services/web-development/ (hub)
- /services/web-development/website-design-and-build/
- /services/web-development/cro-development/
- /services/web-development/technical-seo-and-performance/
- /services/web-development/landing-page-development/
- /services/web-development/integrations-and-tracking/
- /ai-edge/ (hub)
- /ai-edge/social-media/
- /ai-edge/ai-governance/
- /ai-edge/data-sovereignty/
- /ai-edge/owned-ai-systems/
- /ai-edge/ai-in-paid-media/
- /get-started/
- /get-started/qualification/
- /get-started/request-an-audit/
- /get-started/book-a-call/
- /get-started/thanks/
- /who-we-help/ (hub)
- /who-we-help/behavioral-health/
- /who-we-help/mental-health/
- /company/about/
- /company/contact/

### Page types and templates:

**Service pages** (individual services): Hero with headline and subhead, problem/pain section, solution section, how it works (3-4 steps), proof points/results, FAQ accordion, CTA

**Hub pages** (/services/, /ai-edge/, /who-we-help/): Overview hero, grid of child pages as cards linking to each sub-page, CTA

**Get started pages**: Form-focused layouts, clear CTAs, minimal distraction

**About page**: Founder story, team/mission, credentials, CTA

**Contact page**: Contact form, phone, email, address, map placeholder

**Thanks page**: Confirmation message, next steps

### Shared components to create:

- NavBar (matching homepage nav with all sections)
- Footer (matching homepage footer)
- PageHero (reusable hero section)
- FAQAccordion (reusable FAQ component)
- CTASection (reusable call-to-action block)
- ServiceCard (for hub page grids)
- ImageSlot (the placeholder component described above)

### For each page:

1. Read the markdown file from content/pages/
2. Extract the content sections (H2s become page sections)
3. Build the page using the design system
4. Use Reveal animations on sections
5. Add 2-3 ImageSlot placeholders between major sections
6. Include the CTA from the content
7. Include FAQs if present in the content
8. Make sure internal links work (link to other pages being built)

## Build order:

1. Shared components first (NavBar, Footer, PageHero, FAQAccordion, CTASection, ServiceCard, ImageSlot)
2. Hub pages (/services/, /ai-edge/, /who-we-help/, /get-started/)
3. Individual service pages
4. AI Edge pages
5. Who We Help verticals
6. Get Started flow pages
7. Company pages (about, contact)
8. Thanks page

## Technical rules:

- Use Tailwind CSS for all styling
- Use Framer Motion for animations
- Read content from the markdown files or import as needed
- Each page is a separate route in the App Router
- Run npm run dev and verify each page renders
- If a page looks generic or template-like, redo it
- Match the visual quality of design-1 on every page
