---
title: "Dev spec: /resources/creative-conversion/ image fixes"
url: "/resources/creative-conversion/"
primary_keyword: ""
author: "mike-hulick"
---

SEO METADATA
Title tag: Dev spec: /resources/creative-conversion/ image fixes
Meta description: Technical spec for converting legacy JPGs to WebP, updating page embeds, refreshing the image sitemap, and enforcing trailing-slash URLs.
H1: Dev change spec for /resources/creative-conversion/ image and sitemap fixes
Hero image alt: A cinema camera lens sitting next to a color calibration palette on a dark studio pedestal.


PAGE COPY

Dev change spec for /resources/creative-conversion/ image and sitemap fixes
This developer-only work order for card BP1 resolves the November 24, 2026 image audit findings on the creative conversion resource page without altering live copy, headings, metadata, or calls to action. It covers WebP conversion, descriptive file renaming, embed updates, image sitemap changes, and trailing-slash URL enforcement. Move the card to Ship to dev only after every pre-handoff check passes.
[CTA] Request a Free Audit → /get-started/request-an-audit
Scope and target WebP filenames
The live page currently loads three legacy JPG files with non-descriptive numbered names. Converting these assets to WebP and placing them in the governed page directory reduces page weight, strengthens image search signals, and aligns the resource library with sitewide file hygiene rules. Nothing else on the published page changes under this work order.
* Hero banner; Current filename: 01-hero-banner.jpg; Target WebP path: /images/pages/resources/creative-conversion/creative-conversion-hero.webp
* Concept section; Current filename: 02-concept.jpg; Target WebP path: /images/pages/resources/creative-conversion/creative-conversion-concept.webp
* Process section; Current filename: 03-process.jpg; Target WebP path: /images/pages/resources/creative-conversion/creative-conversion-process.webp
Apply the scene-descriptor naming rule after visually inspecting the second and third files. If visual inspection confirms a specific scene or graphic, append a short factual descriptor to the base filename, such as creative-conversion-concept-whiteboard-session.webp for a planning photo or creative-conversion-process-diagram.webp for a workflow graphic. Base every descriptor on what the file depicts rather than assumptions from the brief.
Keep every final filename lowercase, hyphen-separated, and free of numbered template prefixes. Exclude all restricted filename tokens, including ai, generated, watermark, gpt, img, untitled, and screenshot.
Mandatory visual inspection and alt text rules
The source image files were not bundled with this brief, so two checks require direct visual inspection before deployment. Do not write alt text or sign off on conversion outputs from filenames alone.
* Write literal alt text from direct inspection. Open each image and describe the actual scene or diagram shown, matching its hero, concept, or process placement. Keep descriptions plain and factual without guessing unseen details or adding extra keywords.
* Audit every pixel for disallowed marks and text artifacts. Inspect all three images for rendered hex color codes, font-specification notes, unreplaced button label markers, dummy Latin filler text, empty label boxes, garbled lettering, watermarks, signatures, or visible AI-generated stamps. If any image displays a domain name in the artwork, confirm that it reads marketingpowered.ai.
If any source image fails the pixel audit, format conversion alone will not meet site image standards. Stop work on that asset, keep the current production embed intact, and open a separate regeneration ticket because new artwork is excluded from this card.
Page embed updates for hero, concept, and process slots
Update all three image references in place inside the page template or content source. Leave image placement, rendered dimensions, responsive containers, lazy-loading settings, and surrounding HTML unchanged so only the asset paths and alt attributes change.
* Hero embed: Point the hero image reference to /images/pages/resources/creative-conversion/creative-conversion-hero.webp and add the inspected hero alt text.
* Concept-section embed: Point the image after the first H2 to the new concept WebP path, including any scene descriptor confirmed during inspection, and add the inspected concept alt text.
* Process-section embed: Point the mid-to-lower page process image to the new process WebP path, including any scene descriptor confirmed during inspection, and add the inspected process alt text.
Inspect the rendered HTML if the site uses <picture> elements or multi-format srcset markup. Remove leftover JPG <source> fallback tags so zero references to the legacy filenames remain in page output. Check the rendered diff to confirm that body copy, headings, live page metadata, and the existing CTA remain completely unchanged.
Stale reference sweep before removing old JPG files
Before deleting the legacy JPG files from the repository or asset storage, confirm that no other template, stylesheet, script, or sitemap file across the site still references them. Removing shared files without a repository-wide scan risks breaking embeds on sibling pages.
The scan must return zero matches outside the files scheduled for update under this card before you delete the old JPGs. As an optional safeguard after removal, add server-level 301 redirects from the legacy .jpg URLs to the new .webp paths to preserve existing image search indexing.
Trailing-slash enforcement for canonicals, links, and sitemaps
The live page URL currently omits a trailing slash, which conflicts with the sitewide posting rule. Standardize every reference at this publish to the trailing-slash form /resources/creative-conversion/.
* Confirm the HTML <link rel="canonical"> tag outputs the trailing-slash URL.
* Confirm both the XML page sitemap and image sitemap <loc> elements use the trailing-slash URL.
* Audit internal links across the repository so no link points to the non-slash path.
Append the trailing slash to every non-slash internal link surfaced by the scan. Confirm that the web server or CDN returns a 301 redirect from the non-slash URL to the trailing-slash canonical URL if that rule is not already active.
Pre-handoff QA checklist and out-of-scope boundaries
Complete each check below in sequence before changing card status.
* Confirm all three WebP files exist in /images/pages/resources/creative-conversion/ with descriptive, lowercase, hyphenated names.
* Confirm pixel dimensions and visual framing match the source JPGs with no visible quality loss at native resolution.
* Confirm all three filenames exclude restricted tokens and numbered template prefixes.
* Confirm direct visual inspection cleared all three images of watermarks, AI stamps, wrong domains, and rendered pixel text artifacts, or confirm a separate regeneration ticket is open for any failed file.
* Confirm literal, section-appropriate alt text is written from actual image inspection for every embed.
* Confirm hero, concept, and process embeds reference the new WebP paths with zero remaining JPG fallback markup in rendered HTML.
* Confirm the image sitemap removes all three old .jpg entries and publishes three .webp entries whose <image:caption> values match the live alt text.
* Confirm the sitewide repository search shows zero stale references to the old .jpg filenames before file deletion.
* Confirm the canonical tag, XML sitemaps, internal links, and server redirect behavior all enforce the trailing-slash URL.
* Confirm the rendered page diff shows zero changes to body copy, headings, live page metadata, keyword targeting, or the existing CTA.
* Move card BP1 to Ship to dev only after items one through ten pass review.
Out of scope for this card: editorial rewrites, heading edits, CTA changes, live page keyword or metadata updates, new visual concepts, and image regeneration.
[CTA] Review the live creative conversion resource page → /resources/creative-conversion/
