import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageShell from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import ServiceCard from "@/components/site/ServiceCard";
import CtaBand from "@/components/site/CtaBand";
import StickyMobileCta from "@/components/site/StickyMobileCta";
import YouTubeEmbed from "@/components/site/YouTubeEmbed";
import { serif, mono } from "@/components/site/theme";
import { Kicker, GoldRule, PrimaryCta, GhostCta, RichText, SectionHeading } from "@/components/site/ui";
import { AUTHORS, authorPersonSchema } from "@/lib/authors";
import { getPage, HUB_CHILDREN, cardBlurb } from "@/lib/pages";
import { SITE_URL } from "@/lib/site";

/* ================================================================== */
/* Author profile — "Mike Hulick Website Author / Publisher Page"      */
/* (final page copy, November 2026). Copy is reproduced from the        */
/* approved document; the production brief at the end of that document  */
/* sets the path, title, H1, hierarchy, and structured-data rules used  */
/* here. Every byline on the site links to this single page through     */
/* src/lib/authors.ts.                                                  */
/* ================================================================== */

const AUTHOR = AUTHORS["mike-hulick"];
const PATH = AUTHOR.href;

const TITLE = "Michael (Mike) Hulick | Marketing Executive & Author | Marketing Powered";
const DESCRIPTION =
  "Meet Mike Hulick, founder of Marketing Powered and former enterprise CMO. Explore his work in growth strategy, healthcare marketing, owned AI infrastructure, and attribution.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  authors: [{ name: AUTHOR.name, url: PATH }],
  openGraph: {
    type: "profile",
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    images: [{ url: AUTHOR.image, alt: AUTHOR.imageAlt }],
  },
};

const LINKEDIN = AUTHOR.sameAs[0];

const SUBHEAD = "Founder, Marketing Powered | Former Enterprise CMO";
const TAGLINE =
  "Commercial growth strategy • Marketing operations • Applied AI and owned infrastructure • Regulated markets";

/* Cardinal Digital Marketing webinar, May 17, 2023. Hulick was a panelist
   (then CMO, Haven Health Management). The recording is published on
   Cardinal's YouTube channel and embedded on their webinar page. */
const WEBINAR = {
  videoId: "6CCWndD6Xx4",
  title: "Marketing that Scales: How to Drive Growth and Efficiency in Healthcare",
  youtubeTitle: "Webinar - How to Drive Growth and Efficiency in Healthcare",
  description:
    "Cardinal Digital Marketing healthcare webinar: a panel on building a scalable marketing function for multi-site healthcare groups, with Mike Hulick (then CMO, Haven Health Management), Marc Heffner (DSO Marketing Xcelerator), and Alex Membrillo (Cardinal Digital Marketing).",
  uploadDate: "2023-05-17",
  pageUrl: "https://www.cardinaldigitalmarketing.com/healthcare-resources/webinars/marketing-that-scales/",
  poster: "https://i.ytimg.com/vi/6CCWndD6Xx4/maxresdefault.jpg",
  publisher: "Cardinal Digital Marketing",
};

/* Biography. Paragraph copy may carry [anchor](path) internal links,
   resolved through the route registry so none can point at a dead page. */
const BIO: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "Executive perspective",
    paragraphs: [
      "Michael “Mike” Hulick is a marketing executive, founder, author, and applied AI strategist whose career has centered on one question: how do you turn marketing investment into lasting business growth? He has spent more than a decade building the teams, measurement systems, acquisition programs, and operating processes that connect demand to revenue. His experience spans enterprise healthcare, multi-location expansion, professional services, and complex markets where compliance, trust, and commercial performance must work together.",
      "Hulick is the founder of [Marketing Powered](/company/about), a marketing and technology company built around experienced operators, [owned AI infrastructure](/ai-edge/owned-ai-systems), first-party intelligence, and measurable outcomes. Before launching the company in 2025, he served as Chief Marketing Officer at Haven Health Management, helping support its expansion from three locations to 24 across nine states, with more than 1,000 inpatient beds. During that period, annual revenue grew from approximately $30 million to $140 million. His responsibility was to connect marketing performance with admissions capacity, commercial strategy, and organizational execution, not simply to produce more leads.",
    ],
  },
  {
    heading: "From campaign management to enterprise growth",
    paragraphs: [
      "Hulick began his career in the operational side of healthcare growth: field outreach, provider relationships, facility-level market development, and demand generation. Those early roles created a perspective that pure agency experience rarely supplies. A marketing report can show a rising conversion rate while a business is losing qualified opportunities somewhere between the first phone call and the final sale. An impressive cost per lead can hide an expensive cost per acquired customer. More traffic can conceal a broken handoff between the website, CRM, and the team responsible for serving the customer.",
      "His progression through regional development, market analytics, and enterprise leadership took him from facility-level growth to multi-state operations. At Indiana Center for Recovery, he worked on market expansion, referral development, and digital acquisition. At J&J Consulting Group, he assessed treatment markets, reimbursement models, demand patterns, and operational efficiency. Earlier positions involved building local referral networks and strengthening occupancy in competitive treatment markets. Together, those experiences taught him to view marketing as part of a larger commercial system rather than a disconnected department.",
      "At Haven Health Management, his remit became significantly larger. He directed $1.5 million to $2 million in monthly [paid media](/services/paid-media) investment across more than 11 advertising accounts, built and led a multidisciplinary team of over 40 specialists, and worked across marketing, business development, admissions, clinical operations, finance, and executive leadership. Growth included new facilities, new geographic markets, and service-line development in mental health, substance use care, adolescent treatment, veteran-focused services, and telehealth.",
      "The defining lesson was not that larger budgets create larger businesses. It was that the relationship between investment and outcomes must be engineered. [Attribution](/services/analytics-and-attribution), lead qualification, operational capacity, customer experience, pricing and reimbursement, and the quality of the team all determine whether demand converts into durable enterprise value.",
    ],
  },
  {
    heading: "Marketing is an operating system, not a collection of channels",
    paragraphs: [
      "Hulick writes and advises on the difference between activity and performance. Search rankings, impressions, click-through rates, lead volume, and dashboards all have legitimate uses. None of them is a final business outcome. He argues that marketing leaders should be able to connect the money spent to the market entered, the customer acquired, the revenue realized, and the operational work required to deliver it.",
      "That approach shaped several systems developed during his enterprise operating years. The Revenue-Driven Admissions System, built on Salesforce, connected treatment appropriateness and placement decisions with operating and commercial information. In his documented executive record, the system was credited with a 17% increase in annual revenue without additional marketing expenditure. His work on cross-account conversion intelligence also focused on making learning transferable between brands and markets, rather than leaving it trapped in separate advertising accounts.",
      "He later developed multi variant optimization (MVO), a method of matching visitors to relevant landing-page variants based on search intent, campaign context, device, geography, and other meaningful signals. Instead of treating one landing page or one blended conversion rate as the entire market, MVO treats post-click experience as a measurable part of acquisition economics. The operating principle is consistent: test hypotheses, preserve valid measurement, and optimize for the business outcome, not the most flattering platform metric.",
    ],
  },
  {
    heading: "Why Marketing Powered exists",
    paragraphs: [
      "Marketing Powered grew out of a frustration with a familiar industry model. Agencies often sell access to software, talent hours, and dashboards while the client remains dependent on the agency to understand what happened. Hulick wanted to build a different kind of company: one that could combine senior commercial judgment, specialists who understand execution, and a technical foundation that retains and improves its knowledge over time.",
      "Although the company formally launched in 2025, Hulick’s work with internal AI engineering, automation, and data systems dates to 2022. That distinction matters. The aim was not to add a chatbot to conventional agency work. It was to redesign how research, campaign development, analysis, content production, customer routing, reporting, and decision-making fit together. Experienced people still own the judgment. Technology should remove avoidable friction and give good people more leverage.",
      "Today, Marketing Powered works at the intersection of growth strategy, paid media, SEO, creative, conversion optimization, attribution, CRM processes, and [applied AI](/ai-edge). [Healthcare and behavioral health](/who-we-help/behavioral-health) remain important areas of deep specialization, but the company’s broader operating model is relevant to [hospitals](/who-we-help/hospitals-and-health-systems), professional services, legal organizations, [multi-location businesses](/problems/scale-multi-location-campaigns), and other enterprises with demanding acquisition or governance requirements.",
    ],
  },
  {
    heading: "Owned AI infrastructure and data sovereignty",
    paragraphs: [
      "Hulick’s current technology thesis is straightforward: companies should own the assets that make them smarter. That includes first-party data, performance history, workflow logic, institutional knowledge, and the decision systems built around them. Cloud software can be valuable, but subscribing to the same tools as every competitor is not a durable strategy by itself. A company gains long-term leverage when each campaign, experiment, workflow, and operational lesson can improve the next one inside a controlled environment.",
      "Marketing Powered has invested in [local computing resources](/ai-edge/local-processing), controlled storage, [open and locally deployable AI models](/ai-edge/open-source), proprietary data workflows, and specialized agents. MAIOS, the Marketing AI Operating System, is the internal architecture designed to coordinate research, analytics, paid media, content, automation, CRM activity, and executive decision support. It is an evolving operating environment, not a claim that one system has eliminated the need for every external platform or human review.",
      "This architectural choice also reflects the realities of regulated markets. Data location, access permissions, security controls, consent, retention, and integration boundaries are not abstract IT concerns when customer information is sensitive. Hulick’s work focuses on practical [governance](/ai-edge/ai-governance), defensible measurement, and using technology within the rules that apply to each industry. Local inference and owned storage can create more control, but they do not automatically establish HIPAA compliance or replace the need for appropriate legal, technical, and security safeguards.",
      "In his LinkedIn essay, [“Compute Is Now an Asset Class,”](https://www.linkedin.com/pulse/compute-now-asset-class-i-built-marketing-powered-2022-mike-hulick-7fy7e) Hulick describes a transition from renting isolated software capabilities to building owned systems that compound their value. His companion piece, [“Most Just Haven’t Realized It Yet,”](https://www.linkedin.com/pulse/most-just-havent-realized-yet-mike-hulick-58a9e) argues that the constraint in AI-enabled businesses has moved from producing more output to connecting that output with strategy, approvals, deployment, and revenue. Those themes guide both the company’s engineering investments and his editorial work.",
    ],
  },
  {
    heading: "Expertise in regulated, high-stakes markets",
    paragraphs: [
      "Healthcare marketing has high commercial stakes and additional responsibilities. Patient and family communication should be clear, respectful, and accurate. Performance systems must account for clinical capacity, intake quality, payer dynamics, platform advertising restrictions, and lawful handling of sensitive information. A metric that makes sense for a consumer product may be the wrong success measure for a treatment provider or hospital service line.",
      "Hulick has worked with these realities from inside the organization. His interests include practical attribution from first touch to qualified opportunity, disciplined paid search, organic visibility grounded in real expertise, reputation, compliant channel diversification, and the gap between marketing-generated demand and what operations can convert. His more recent writing also examines how AI-generated search answers are changing the relationship between online visibility and actual website visits.",
      "He does not write as a physician or clinician. His perspective is commercial, operational, and technical. When content makes medical claims or discusses treatment decisions, the appropriate standard is independent clinical review and reliable evidence, not a marketing executive’s title.",
    ],
  },
  {
    heading: "How I approach leadership",
    paragraphs: [
      "Hulick’s approach to AI is not about reducing headcount as the first response to change. He has built and managed large, geographically distributed teams, and he believes organizational capability comes from investing in people who can adapt, test assumptions, and work across disciplines. Software cannot rescue weak management or a strategy that nobody understands. Strong teams, clear accountability, and better operating systems reinforce each other.",
      "His recent public commentary challenges leadership teams to retrain and retool before defaulting to staff reductions. He also emphasizes the value of dissent and sound judgment in management, asking prospective teammates whether they are comfortable being wrong. The goal is a culture in which people can challenge weak assumptions early, use evidence to improve decisions, and create results that are repeatable without becoming rigid.",
    ],
  },
  {
    heading: "Author, publisher, and public contributor",
    paragraphs: [
      "Hulick publishes practical analysis on digital marketing, enterprise growth, healthcare acquisition, AI infrastructure, and data governance. His writing combines operator experience with an interest in how technology changes the economics of work. He is particularly interested in the difference between adopting tools and building capabilities, and between collecting data and using it to make a better decision.",
      "His articles have appeared on LinkedIn, Medium, and Marketing Powered’s publishing channels. He has also contributed to industry conversations as a healthcare marketing panelist, including the Cardinal Digital Marketing session [“Marketing that Scales: How to Drive Growth and Efficiency in Healthcare”](https://www.cardinaldigitalmarketing.com/healthcare-resources/webinars/marketing-that-scales/) in May 2023. In addition to executive leadership, he serves as a GLG Network Expert and has provided marketing expert-witness analysis and testimony in matters involving advertising strategy, campaign performance, attribution, and root-cause evaluation.",
    ],
  },
];

/* Selected external writing, newest first. The first three are the
   featured cards above the biography. */
const WRITING: {
  title: string;
  href: string;
  outlet: string;
  date: string;
  summary: string;
  /** Cover image published with the piece (served through next/image). */
  image?: string;
}[] = [
  {
    title: "Compute Is Now an Asset Class. I Built Marketing Powered for This in 2022.",
    href: "https://www.linkedin.com/pulse/compute-now-asset-class-i-built-marketing-powered-2022-mike-hulick-7fy7e",
    outlet: "LinkedIn",
    date: "September 5, 2026",
    summary:
      "Owned computing, first-party intelligence, economic leverage, and the limits of subscription-led AI strategy.",
    image: "https://media.licdn.com/dms/image/v2/D4E12AQFn2t3IzzYgKQ/article-cover_image-shrink_720_1280/B4EaBuP3bdGgAU-/0/1788556050325?e=2147483647&v=beta&t=2GUoKVQzO9oE-kOIYXbF01m8Y9hpatmbvGmbxsrrLRo",
  },
  {
    title: "Most Just Haven’t Realized It Yet.",
    href: "https://www.linkedin.com/pulse/most-just-havent-realized-yet-mike-hulick-58a9e",
    outlet: "LinkedIn",
    date: "May 28, 2026",
    summary:
      "Why AI output is not enough and why infrastructure, integration, and governance are becoming competitive advantages.",
    image: "https://media.licdn.com/dms/image/v2/D4E12AQEQYfPCSBLxHQ/article-cover_image-shrink_720_1280/B4EZ5u1Y4dHoAU-/0/1779975950153?e=2147483647&v=beta&t=nYCwfUtxjvsA0qHfmMzUxvptnkka9ODxEiu_pqwK_4A",
  },
  {
    title: "Healthcare Marketing in 2026: The Organizations That Move Now Will Win",
    href: "https://medium.com/@mhulick_97776/healthcare-marketing-in-2026-the-organizations-that-move-now-will-win-8ce4fa3d8980",
    outlet: "Medium",
    date: "April 5, 2026",
    summary:
      "Outcome-based measurement, patient experience, value messaging, and responsible technology adoption.",
    image: "https://cdn-images-1.medium.com/max/1024/1*G8SVIFSt7Y-SJNDtWV6igQ.png",
  },
  {
    title: "Outdated Digital Marketing Tactics in Behavioral Health: What to Leave Behind in 2024",
    href: "https://www.linkedin.com/pulse/outdated-digital-marketing-tactics-behavioral-health-what-mike-hulick-xetje",
    outlet: "LinkedIn",
    date: "August 12, 2025",
    summary:
      "Patient trust, conversion measurement, original content, and disciplined advertising in a regulated field.",
  },
  {
    title: "The New Rules of PPC: Scaling With Data, Not Guesswork",
    href: "https://medium.com/@mhulick_97776/the-new-rules-of-ppc-scaling-with-data-not-guesswork-af87ebe6bcb6",
    outlet: "Medium",
    date: "August 10, 2025",
    summary:
      "Marginal acquisition economics, cross-account learning, testing discipline, and revenue-aligned optimization.",
    image: "https://cdn-images-1.medium.com/max/1024/0*piB-3DxcXW5MA2Eh",
  },
  {
    title: "Top 10 Open Source AI Models of 2025: Comprehensive Review",
    href: "https://www.linkedin.com/pulse/top-10-open-source-ai-models-2025-comprehensive-review-mike-hulick-q8tbe",
    outlet: "LinkedIn",
    date: "July 23, 2025",
    summary:
      "The practical implications of open-weight models, efficiency, and broader access to AI infrastructure.",
    image: "https://media.licdn.com/dms/image/v2/D4E12AQFFoyVEDMebsQ/article-cover_image-shrink_720_1280/B4EZg4de4XHgAI-/0/1753293910182?e=2147483647&v=beta&t=04dbrvfJ4JSFxQ29hcxNXpV-heZVV3HzKeCeKlmZA94",
  },
  {
    title: "Marketing that Scales: How to Drive Growth and Efficiency in Healthcare",
    href: "https://www.cardinaldigitalmarketing.com/healthcare-resources/webinars/marketing-that-scales/",
    outlet: "Cardinal Digital Marketing",
    date: "Panelist | May 17, 2023",
    summary: "Healthcare marketing panel on growth, efficiency, and scaling acquisition programs.",
    image: "https://i.ytimg.com/vi/6CCWndD6Xx4/maxresdefault.jpg",
  },
];

/* Outbound links to third-party records of appearances and recognition.
   Each item links to the organization's own page or document. */
const RECOGNITION: {
  title: string;
  org: string;
  date: string;
  href: string;
  summary: string;
  linkText: string;
}[] = [
  {
    title: "Marketing that Scales: How to Drive Growth and Efficiency in Healthcare",
    org: "Cardinal Digital Marketing",
    date: "Webinar panelist | May 17, 2023",
    href: "https://www.youtube.com/watch?v=6CCWndD6Xx4",
    summary:
      "Healthcare marketing panel on driving growth and efficiency across a multi-location organization. The recording is embedded above and published on [Cardinal's webinar page](https://www.cardinaldigitalmarketing.com/healthcare-resources/webinars/marketing-that-scales/).",
    linkText: "Watch the webinar",
  },
  {
    title: "Intel International Science and Engineering Fair, Grand Awards",
    org: "Society for Science",
    date: "Environmental Sciences | Los Angeles, May 2011",
    href: "https://sspcdn.blob.core.windows.net/files/Documents/SEP/ISEF/2011/Press-Releases/Grand-Awards.pdf",
    summary:
      "A 2011 Grand Award [Intel ISEF](https://sspcdn.blob.core.windows.net/files/Documents/SEP/ISEF/2011/Press-Releases/Grand-Awards.pdf) Recipient in the Society for Science winner announcement.",
    linkText: "Read the 2011 Grand Awards announcement",
  },
];

const EXPECT: string[] = [
  "Articles published under Hulick’s byline emphasize first-hand operating experience, a clear separation between observation and inference, and evidence that readers can evaluate. He writes primarily for CEOs, chief marketing officers, healthcare executives, founders, investors, and operators responsible for measurable growth. Topics include revenue strategy, multi-site expansion, paid acquisition, search, attribution, first-party data, AI infrastructure, compliance-aware marketing, and the leadership systems that make execution possible.",
  "Views and analysis expressed in his bylined articles are his professional opinions unless otherwise attributed. Historical operating results refer to work in prior executive roles and should not be read as a guarantee of future client performance. Marketing Powered, LLC is the publisher of this website. Content on marketing and technology is not medical, legal, or financial advice.",
];

const CONNECT =
  "For executive collaboration, speaking, interviews, expert commentary, or a conversation about building durable growth infrastructure, connect with Mike through Marketing Powered or LinkedIn.";

/* Guides on this site that carry Mike's byline (author frontmatter). */
function bylinedGuides() {
  return (HUB_CHILDREN["resources/guides/index.md"] || []).flatMap((g) => {
    const p = getPage(g.file);
    if (p.frontmatter.author !== AUTHOR.key) return [];
    return [{ href: g.href, title: p.h1, description: cardBlurb(g.file) }];
  });
}

function ProfileJsonLd({ guides }: { guides: { href: string; title: string }[] }) {
  const person = {
    ...authorPersonSchema(AUTHOR),
    description: DESCRIPTION,
    award: "2011 Grand Award Intel ISEF Recipient",
    knowsAbout: [
      "Growth marketing strategy",
      "Healthcare and behavioral health marketing",
      "Paid media",
      "Marketing attribution",
      "Owned AI infrastructure",
      "Data governance",
    ],
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}${PATH}#profile`,
    url: `${SITE_URL}${PATH}`,
    name: TITLE,
    mainEntity: person,
    publisher: { "@id": `${SITE_URL}/#organization` },
    hasPart: guides.map((g) => ({
      "@type": "Article",
      headline: g.title,
      url: `${SITE_URL}${g.href}`,
      author: { "@id": person["@id"] },
    })),
  };
  const videoLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: WEBINAR.title,
    description: WEBINAR.description,
    thumbnailUrl: [WEBINAR.poster],
    uploadDate: WEBINAR.uploadDate,
    embedUrl: `https://www.youtube-nocookie.com/embed/${WEBINAR.videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${WEBINAR.videoId}`,
    publisher: { "@type": "Organization", name: WEBINAR.publisher },
    // Hulick appears as a panelist; Cardinal published the recording.
    contributor: { "@id": person["@id"] },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
      />
    </>
  );
}

function ExternalLink({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

/* Cover image for an external piece. Pieces without a published cover get a
   quiet outlet tile instead of a stock placeholder. */
function CoverThumb({
  src,
  title,
  outlet,
  sizes,
  className = "",
}: {
  src?: string;
  title: string;
  outlet: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[#0A1322] ${className}`}
      style={{ aspectRatio: "16 / 9" }}
    >
      {src ? (
        <Image
          src={src}
          alt={`Cover image for ${title}`}
          fill
          quality={75}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-end bg-[linear-gradient(140deg,rgba(0,144,240,0.25),rgba(8,174,103,0.12))] p-4">
          <span
            className="text-[11px] uppercase tracking-[0.22em] text-white/70"
            style={{ fontFamily: mono }}
          >
            {outlet}
          </span>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="mb-8 flex items-center gap-4">
      <span
        className="text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
        style={{ fontFamily: mono }}
      >
        {children}
      </span>
      <GoldRule className="flex-1" />
    </Reveal>
  );
}

export default function AuthorPage() {
  const guides = bylinedGuides();
  const featured = WRITING.slice(0, 3);

  return (
    <PageShell>
      <ProfileJsonLd guides={guides} />

      {/* ---------- LEAD ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-12 lg:px-12 lg:pt-16">
        <Breadcrumbs url={`${PATH}/`} current="Michael Hulick" />
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Kicker>Author and publisher</Kicker>
            <h1
              className="text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02]"
              style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
            >
              {AUTHOR.fullName}
            </h1>
            <p className="mt-5 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-snug text-white/80">
              {SUBHEAD}
            </p>
            <p
              className="mt-4 text-[12px] uppercase tracking-[0.18em] text-white/45"
              style={{ fontFamily: mono }}
            >
              {TAGLINE}
            </p>
            <p className="mt-7 max-w-xl text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-white/55">
              Operator-led perspective on turning marketing investment into lasting business growth,
              drawn from a decade inside enterprise healthcare and multi-location expansion.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
              <ExternalLink
                href={LINKEDIN}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-12px_rgba(0,144,240,0.6)]"
              >
                <span className="relative z-10">Connect on LinkedIn</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </ExternalLink>
              <GhostCta href="/company/about">Explore Marketing Powered</GhostCta>
            </div>
          </div>

          {/* Approved professional headshot. */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-[2px] rounded-[28px] opacity-90"
              style={{ background: "linear-gradient(140deg,#0090F0,#00A8D8 50%,#08AE67)" }}
            />
            <figure
              className="relative overflow-hidden rounded-[26px] bg-[#0A1322]"
              style={{ aspectRatio: "4 / 5" }}
            >
              <Image
                src={AUTHOR.image}
                alt={AUTHOR.imageAlt}
                fill
                preload
                fetchPriority="high"
                quality={75}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 40vw"
                className="object-cover"
                style={{ objectPosition: "center top" }}
              />
            </figure>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <GoldRule />
      </div>

      {/* ---------- WEBINAR ---------- */}
      <section id="webinar" className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <SectionLabel>Watch</SectionLabel>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
          <Reveal variant="blur" className="relative">
            <div
              aria-hidden
              className="absolute -inset-[2px] rounded-[28px] opacity-90"
              style={{ background: "linear-gradient(140deg,#0090F0,#00A8D8 50%,#08AE67)" }}
            />
            <YouTubeEmbed
              videoId={WEBINAR.videoId}
              title={WEBINAR.youtubeTitle}
              poster={WEBINAR.poster}
              className="relative"
            />
          </Reveal>
          <Reveal delay={100}>
            <p
              className="text-[11px] uppercase tracking-[0.22em] text-[#0090F0]"
              style={{ fontFamily: mono }}
            >
              {WEBINAR.publisher} · Webinar panelist · May 17, 2023
            </p>
            <h2
              className="mt-4 text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.1]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              {WEBINAR.title}
            </h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-white/60">
              A panel on building a scalable marketing function for multi-site healthcare groups.
              Hulick joined as Chief Marketing Officer of Haven Health Management alongside Marc
              Heffner of DSO Marketing Xcelerator and Alex Membrillo of Cardinal Digital Marketing.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              <ExternalLink
                href={`https://www.youtube.com/watch?v=${WEBINAR.videoId}`}
                className="text-[12px] uppercase tracking-[0.18em] text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 transition-colors hover:decoration-[#7FCBFF]"
              >
                Watch on YouTube →
              </ExternalLink>
              <ExternalLink
                href={WEBINAR.pageUrl}
                className="text-[12px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-[#7FCBFF]"
              >
                Webinar page on Cardinal →
              </ExternalLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- FEATURED WRITING ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <SectionLabel>Featured writing</SectionLabel>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((w, i) => (
            <Reveal
              key={w.href}
              delay={i * 80}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >
              <ExternalLink href={w.href} className="block">
                <CoverThumb
                  src={w.image}
                  title={w.title}
                  outlet={w.outlet}
                  sizes="(max-width: 768px) 92vw, 30vw"
                />
              </ExternalLink>
              <p
                className="mt-5 text-[11px] uppercase tracking-[0.22em] text-[#0090F0]"
                style={{ fontFamily: mono }}
              >
                {w.outlet} · {w.date}
              </p>
              <h3
                className="mt-4 text-[1.2rem] leading-snug text-white"
                style={{ fontFamily: serif, fontWeight: 500 }}
              >
                <ExternalLink href={w.href} className="transition-colors hover:text-[#7FCBFF]">
                  {w.title}
                </ExternalLink>
              </h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-white/60">{w.summary}</p>
              <ExternalLink
                href={w.href}
                className="mt-5 text-[12px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-[#7FCBFF]"
              >
                Read on {w.outlet} →
              </ExternalLink>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- BIOGRAPHY ---------- */}
      {BIO.map((sec) => (
        <section key={sec.heading} className="relative z-10 mx-auto max-w-3xl px-6 py-12 lg:px-12">
          <Reveal>
            <SectionHeading className="mb-7">{sec.heading}</SectionHeading>
          </Reveal>
          <div className="space-y-6">
            {sec.paragraphs.map((p, i) => (
              <Reveal key={i}>
                <p className="text-[1.02rem] leading-relaxed text-white/65">
                  <RichText text={p} />
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {/* ---------- APPEARANCES AND RECOGNITION ---------- */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-12 lg:px-12">
        <Reveal>
          <SectionHeading className="mb-7">Appearances and recognition</SectionHeading>
        </Reveal>
        <ul className="space-y-6">
          {RECOGNITION.map((r) => (
            <li key={r.href}>
              <Reveal className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                <p
                  className="text-[11px] uppercase tracking-[0.22em] text-[#0090F0]"
                  style={{ fontFamily: mono }}
                >
                  {r.org} · {r.date}
                </p>
                <h3
                  className="mt-3 text-[1.2rem] leading-snug text-white"
                  style={{ fontFamily: serif, fontWeight: 500 }}
                >
                  <ExternalLink href={r.href} className="transition-colors hover:text-[#7FCBFF]">
                    {r.title}
                  </ExternalLink>
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-white/60">
                  <RichText text={r.summary} />
                </p>
                <ExternalLink
                  href={r.href}
                  className="mt-4 inline-block text-[12px] uppercase tracking-[0.18em] text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 transition-colors hover:decoration-[#7FCBFF]"
                >
                  {r.linkText} →
                </ExternalLink>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- ARTICLES ON THIS SITE ---------- */}
      {guides.length > 0 && (
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-12">
          <SectionLabel>Articles by Mike Hulick on Marketing Powered</SectionLabel>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((g, i) => (
              <ServiceCard
                key={g.href}
                index={i}
                title={g.title}
                description={g.description}
                href={g.href}
              />
            ))}
          </div>
        </section>
      )}

      {/* ---------- SELECTED EXTERNAL WRITING ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <SectionLabel>Selected writing and appearances</SectionLabel>
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {WRITING.map((w) => (
            <li key={w.href}>
              <Reveal className="grid gap-4 py-7 md:grid-cols-[260px_1fr] md:gap-10">
                <ExternalLink href={w.href} className="block">
                  <CoverThumb
                    src={w.image}
                    title={w.title}
                    outlet={w.outlet}
                    sizes="(max-width: 768px) 92vw, 260px"
                  />
                </ExternalLink>
                <div>
                  <p
                    className="text-[11px] uppercase tracking-[0.22em] text-white/45"
                    style={{ fontFamily: mono }}
                  >
                    {w.outlet} · {w.date}
                  </p>
                  <h3
                    className="mt-2 text-[1.2rem] leading-snug text-white"
                    style={{ fontFamily: serif, fontWeight: 500 }}
                  >
                    <ExternalLink href={w.href} className="transition-colors hover:text-[#7FCBFF]">
                      {w.title}
                    </ExternalLink>
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-white/60">{w.summary}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- WHAT READERS CAN EXPECT ---------- */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-12 lg:px-12">
        <Reveal>
          <SectionHeading className="mb-7">What readers can expect</SectionHeading>
        </Reveal>
        <div className="space-y-6">
          {EXPECT.map((p, i) => (
            <Reveal key={i}>
              <p className="text-[1.02rem] leading-relaxed text-white/65">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- CONNECT ---------- */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-6 pt-12 lg:px-12">
        <Reveal>
          <SectionHeading className="mb-7">Connect</SectionHeading>
          <p className="text-[1.02rem] leading-relaxed text-white/65">{CONNECT}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
            <ExternalLink
              href={LINKEDIN}
              className="text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 transition-colors hover:decoration-[#7FCBFF]"
            >
              Connect on LinkedIn
            </ExternalLink>
            <span className="text-white/30">|</span>
            <Link
              href="/"
              className="text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 transition-colors hover:decoration-[#7FCBFF]"
            >
              Visit Marketing Powered
            </Link>
            <span className="text-white/30">|</span>
            <Link
              href="/company/contact"
              className="text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 transition-colors hover:decoration-[#7FCBFF]"
            >
              Contact the team
            </Link>
          </div>
          <div className="mt-10">
            <PrimaryCta href="/company/contact">Request a strategic conversation</PrimaryCta>
          </div>
        </Reveal>
      </section>

      <CtaBand
        headline="Start with the decisions your marketing needs to support"
        body="Tell us where growth is getting stuck and what your leadership team needs to see. The next step is a focused conversation about fit and where a deeper review would be useful."
        ctaText="Request a strategy call"
        ctaLink="/company/contact"
        secondaryCta={{ text: "Connect on LinkedIn", link: LINKEDIN }}
      />

      <StickyMobileCta href="/company/contact" label="Strategy call" />
    </PageShell>
  );
}
