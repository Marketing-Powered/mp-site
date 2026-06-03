# Codex Prompt: Redesign MP Homepage

Paste this into Codex. Set the worktree to this repo.

---

## Prompt:

You are redesigning the Marketing Powered homepage. The Next.js project is already set up with content and images ready to use. Your job is to create 5 completely different, visually stunning homepage designs that look like they were built by a top-tier design agency, not a developer using default Tailwind templates.

### What exists in the repo:

- **Content:** src/lib/content.ts has all the real homepage copy (hero, growth section, services, results, FAQs, CTAs). Use this content as-is.
- **Brand images:** public/images/ has 8 brand graphics from the client (01-hero-banner.jpg through 08-summary-takeaways-visual.jpg). Use these throughout the designs.
- **Framework:** Next.js with TypeScript and Tailwind CSS. App Router.
- **Current designs at:** src/app/design-1 through design-5. These are bad and need to be completely replaced.
- **Index page:** src/app/page.tsx is a gallery linking to all 5 designs.

### What the homepage needs to communicate:

- AI marketing agency specializing in behavioral health and mental health
- $50M+ in managed ad spend, $1.5-2M/month in Google Ads
- Operator background (founder scaled Haven Health from 3 to 24 locations)
- AI-native since 2022 with proprietary predictive analytics
- Services: Google Ads, Meta Ads, SEO, CRO, web development, analytics
- Results: 847% ROAS, $42 cost per admission, 312% organic traffic growth
- Primary CTA: Book a Discovery Call at /get-started/

### Design requirements:

Each of the 5 designs must be COMPLETELY different from each other. Not just different colors on the same layout. Different visual languages, different section structures, different interaction patterns.

For each design, think about:
- What would a $50K agency build for this client?
- How do premium marketing agencies present themselves online?
- What stops the scroll and makes someone think these people are serious?

Reference the visual quality of sites like:
- webflow.com (smooth animations, editorial layouts)
- linear.app (dark mode, clean typography, precision)
- stripe.com (gradient work, micro-interactions, density)
- vercel.com (minimalist, developer-focused, fast)
- superside.com (agency positioning, bold visuals, social proof)

### Specific directions for the 5 designs:

1. **Dark premium** - Near-black background (#0A0A0A), large serif headlines (use Google Fonts like Playfair Display or similar), smooth fade-in animations, gradient accent lines, cinematic feel. Think Linear meets a luxury brand.

2. **Light editorial** - Off-white/cream background, sophisticated serif + sans-serif pairing, asymmetric layouts, editorial grid with intentional whitespace, subtle parallax on images. Think high-end magazine.

3. **Bold gradient** - Dark base with vibrant gradient accents (purple to blue to cyan), glassmorphism cards, floating elements, animated background orbs or mesh gradients, modern SaaS feel. Think Stripe visual language.

4. **Minimal Swiss** - Pure white, strict grid system, bold sans-serif typography (Inter or similar), black and one accent color only, lots of negative space, data-forward with large numbers/stats prominent. Think Swiss design poster.

5. **Immersive scroll** - Full-viewport sections that snap or flow, each section a different visual world, parallax layers, scroll-triggered animations, video-like storytelling through the page. Think Apple product page meets agency site.

### Technical rules:

- Use Tailwind CSS for all styling
- Use Framer Motion for animations (install if needed: npm install framer-motion)
- Import content from @/lib/content, do not hardcode text
- Use the brand images from public/images/
- Each design is a separate route: /design-1 through /design-5
- The index page should be a clean gallery showing all 5 with previews
- Run npm run dev after building and verify each design renders
- Take a screenshot of each design to verify it looks good
- If a design looks generic or template-like, redo it

### What NOT to do:

- Do not use default Tailwind component patterns (the generic card-in-a-grid look)
- Do not make all 5 designs look like variations of the same template
- Do not use placeholder images. Use the real brand images from public/images/
- Do not skip animations. Every design should have some motion
- Do not make it look like a free Tailwind template from the internet

After building all 5, start the dev server and take screenshots of each design. If any of them look mediocre, rebuild that one before finishing.
