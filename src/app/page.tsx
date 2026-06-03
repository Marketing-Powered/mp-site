import Link from "next/link";

/* ================================================================== */
/*  GALLERY — index of the five homepage concepts.                    */
/*  Each card is a miniature rendered in its own design language       */
/*  rather than a generic swatch row.                                  */
/* ================================================================== */

const fraunces = "'Fraunces', Georgia, serif";
const newsreader = "'Newsreader', Georgia, serif";
const sora = "'Sora', system-ui, sans-serif";
const archivoBlack = "'Archivo Black', sans-serif";
const bricolage = "'Bricolage Grotesque', system-ui, sans-serif";
const manrope = "'Manrope', system-ui, sans-serif";

const designs = [
  {
    id: 1,
    name: "Midnight Atelier",
    tag: "Dark · Cinematic · Luxury",
    blurb:
      "Near-black canvas, high-contrast Fraunces serif, champagne gradient hairlines and film-grain atmosphere. Linear's precision in a luxury suit.",
  },
  {
    id: 2,
    name: "The Quarterly",
    tag: "Editorial · Print · Warm",
    blurb:
      "A high-end magazine on warm paper stock. Newsreader display serif, drop caps, ruled captions, multi-column copy and oxblood accents.",
  },
  {
    id: 3,
    name: "Aurora",
    tag: "SaaS · Gradient · Motion",
    blurb:
      "Deep-space base with animated mesh orbs, frosted glassmorphism and floating UI fragments. The Stripe lineage, executed with density.",
  },
  {
    id: 4,
    name: "Grid System",
    tag: "Swiss · Minimal · Data",
    blurb:
      "International Typographic Style — rigid grid, Archivo Black, a single vermillion accent and oversized numerals on pure white.",
  },
  {
    id: 5,
    name: "The Descent",
    tag: "Immersive · Scroll · Story",
    blurb:
      "Full-viewport chapters that snap and parallax, each its own visual world. Apple product page meets a cinematic agency reel.",
  },
];

/* a tiny, design-accurate preview for each concept */
function Preview({ id }: { id: number }) {
  if (id === 1)
    return (
      <div className="relative h-full w-full overflow-hidden" style={{ background: "#0A0A0B" }}>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(80% 60% at 50% -10%, rgba(201,162,75,0.18), transparent 60%)" }}
        />
        <div className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A24B", fontFamily: "'Space Mono',monospace" }}>
          AI-Native Since 2022
        </div>
        <div className="absolute bottom-7 left-6 right-6">
          <div className="text-[clamp(1.3rem,3vw,1.9rem)] leading-[0.98] text-[#EDEAE3]" style={{ fontFamily: fraunces }}>
            Partner with an AI agency that{" "}
            <span className="italic" style={{ color: "#F5E6BE" }}>knows</span> behavioral health
          </div>
          <div className="mt-4 inline-block rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black" style={{ background: "linear-gradient(90deg,#F5E6BE,#C9A24B)" }}>
            Book a Discovery Call
          </div>
        </div>
      </div>
    );
  if (id === 2)
    return (
      <div className="relative h-full w-full overflow-hidden p-5" style={{ background: "#F4EFE6", color: "#1C1815" }}>
        <div className="flex items-center justify-between border-b-2 border-[#1C1815] pb-1 text-[8px] uppercase tracking-[0.2em]">
          <span>Vol. XII</span>
          <span style={{ color: "#8A2B2B" }}>Issue 2026</span>
        </div>
        <div className="mt-3 text-center text-[clamp(1.4rem,3.4vw,2.2rem)] leading-none" style={{ fontFamily: newsreader, fontWeight: 500 }}>
          Marketing Powered
        </div>
        <div className="mt-4 border-t border-[#1C1815]/30 pt-3">
          <div className="text-[9px] uppercase tracking-[0.25em]" style={{ color: "#8A2B2B" }}>The Cover Story</div>
          <p className="mt-2 text-[0.95rem] leading-tight" style={{ fontFamily: newsreader, fontWeight: 500 }}>
            <span className="float-left mr-2 text-[2.4rem] leading-[0.7]" style={{ color: "#8A2B2B", fontFamily: fraunces }}>P</span>
            artner with an AI marketing agency that knows behavioral health.
          </p>
        </div>
      </div>
    );
  if (id === 3)
    return (
      <div className="relative h-full w-full overflow-hidden" style={{ background: "#070711" }}>
        <div className="absolute left-[-20%] top-[-30%] h-40 w-40 rounded-full blur-2xl" style={{ background: "#5B3CFF", opacity: 0.7 }} />
        <div className="absolute right-[-10%] bottom-[-20%] h-40 w-40 rounded-full blur-2xl" style={{ background: "#C04BFF", opacity: 0.6 }} />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="mb-3 rounded-full border border-white/15 px-3 py-1 text-[9px] text-white/70">AI-native · HIPAA-conscious</div>
          <div className="text-[clamp(1.3rem,3vw,2rem)] font-bold leading-[1.05] text-white" style={{ fontFamily: sora }}>
            The AI marketing engine for{" "}
            <span style={{ background: "linear-gradient(110deg,#7C5CFF,#C04BFF,#34E2D6)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              behavioral health
            </span>
          </div>
          <div className="mt-4 rounded-full px-4 py-1.5 text-[10px] font-semibold text-black" style={{ background: "linear-gradient(110deg,#7C5CFF,#C04BFF,#34E2D6)" }}>
            Book a Call
          </div>
        </div>
      </div>
    );
  if (id === 4)
    return (
      <div className="relative h-full w-full overflow-hidden bg-white text-[#0B0B0B]">
        <div className="flex items-stretch justify-between border-b-2 border-black">
          <div className="px-4 py-2 text-[9px] uppercase" style={{ fontFamily: archivoBlack }}>Marketing Powered</div>
          <div className="px-4 py-2 text-[9px] font-bold uppercase text-white" style={{ background: "#E5341E" }}>Book</div>
        </div>
        <div className="px-5 py-6">
          <div className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: "#E5341E" }}>AI Marketing Agency</div>
          <div className="mt-3 text-[clamp(1.8rem,5vw,3rem)] uppercase leading-[0.88]" style={{ fontFamily: archivoBlack }}>
            Knows<br /><span style={{ color: "#E5341E" }}>Behavioral</span><br />Health.
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t-2 border-black px-5 py-2 text-[clamp(1.4rem,4vw,2rem)]" style={{ fontFamily: archivoBlack, color: "#E5341E" }}>
          $50M+
        </div>
      </div>
    );
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#08090C" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(60% 60% at 80% 30%, rgba(198,242,78,0.18), transparent 60%)" }} />
      <div className="absolute left-5 top-5 text-[9px] uppercase tracking-[0.3em]" style={{ color: "#C6F24E" }}>
        Chapter 00
      </div>
      <div className="absolute bottom-7 left-5 right-5">
        <div className="text-[clamp(1.4rem,3.4vw,2.2rem)] leading-[0.95] text-[#F2F2EC]" style={{ fontFamily: bricolage, fontWeight: 700 }}>
          Partner with an AI Marketing Agency That Knows Behavioral Health
        </div>
        <div className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/45">
          <span>↓</span> Scroll to descend
        </div>
      </div>
    </div>
  );
}

export default function DesignGallery() {
  return (
    <div className="min-h-screen bg-[#0C0C0F] text-white" style={{ fontFamily: manrope }}>
      {/* atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(120% 70% at 50% 0%, black, transparent 80%)",
        }}
      />

      <header className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[12px] uppercase tracking-[0.2em] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Five Homepage Concepts
        </div>
        <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02]" style={{ fontFamily: fraunces, fontWeight: 500 }}>
          Marketing Powered,
          <br />
          <span className="italic text-white/70">five ways.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/50">
          The same content — an AI marketing agency for behavioral health — rendered
          through five distinct visual languages. Each is a full, live homepage.
        </p>
      </header>

      <main className="relative mx-auto grid max-w-6xl gap-7 px-6 pb-28 md:grid-cols-2">
        {designs.map((d, i) => (
          <Link
            key={d.id}
            href={`/design-${d.id}`}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 ${
              i === 4 ? "md:col-span-2" : ""
            }`}
          >
            <div className={`relative overflow-hidden ${i === 4 ? "h-72" : "h-64"}`}>
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                <Preview id={d.id} />
              </div>
            </div>
            <div className="flex items-end justify-between gap-4 p-7">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] tabular-nums text-white/30">
                    0{d.id}
                  </span>
                  <h2 className="text-[1.5rem]" style={{ fontFamily: fraunces, fontWeight: 500 }}>
                    {d.name}
                  </h2>
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">
                  {d.tag}
                </div>
                <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-white/55">
                  {d.blurb}
                </p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-white/40 group-hover:bg-white group-hover:text-black">
                →
              </span>
            </div>
          </Link>
        ))}
      </main>

      <footer className="relative border-t border-white/10 px-6 py-10 text-center text-[13px] text-white/35">
        Marketing Powered — Homepage Design Concepts · AI Marketing for Behavioral Health
      </footer>
    </div>
  );
}
