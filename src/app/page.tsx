import Link from "next/link";
import { Logo, brand, brandGradient } from "@/components/brand";

/* ================================================================== */
/*  GALLERY — index of the five homepage concepts.                    */
/*  All directions share the marketingpowered.ai brand palette         */
/*  (blue / cyan / green / navy); each card previews its own layout.   */
/* ================================================================== */

const manrope = "'Manrope', system-ui, sans-serif";
const fraunces = "'Fraunces', Georgia, serif";
const sora = "'Sora', system-ui, sans-serif";
const archivoBlack = "'Archivo Black', sans-serif";
const bricolage = "'Bricolage Grotesque', system-ui, sans-serif";

const designs = [
  {
    id: 1,
    name: "Midnight Atelier",
    tag: "Dark · Premium · Editorial",
    blurb:
      "A precise, high-end dark site. Serif headlines, brand-blue gradient hairlines and a calm, confident tone for a senior AI agency.",
  },
  {
    id: 2,
    name: "Clarity",
    tag: "Light · Trust · Results",
    blurb:
      "A clean, conversion-focused B2B homepage. Healthcare-credible, structured, results-led — the most straightforwardly on-brand direction.",
  },
  {
    id: 3,
    name: "Aurora",
    tag: "SaaS · Gradient · Motion",
    blurb:
      "Tech-forward and product-like. Animated brand-gradient orbs, frosted glass and a live-attribution dashboard. Signals AI sophistication.",
  },
  {
    id: 4,
    name: "Grid System",
    tag: "Swiss · Data · Precision",
    blurb:
      "A rigid editorial grid with oversized numerals and a single brand-blue accent. Data-driven precision, nothing wasted.",
  },
  {
    id: 5,
    name: "The Descent",
    tag: "Immersive · Scroll · Story",
    blurb:
      "Full-viewport chapters that tell the story top to bottom — operators, numbers, system, compliance, evidence. Premium and cinematic.",
  },
  {
    id: 6,
    name: "Console",
    tag: "Terminal · AI-Native · Mono",
    blurb:
      "The whole site as an AI-native command line. It boots up, types its pitch, streams logs and runs compliance checks. For an agency that builds its own systems.",
  },
  {
    id: 7,
    name: "Mission Control",
    tag: "Dashboard · Data-Viz · Live",
    blurb:
      "The agency as a live analytics product. An animated click→admission funnel, count-up KPIs, sparklines and a growth chart. The data is the design.",
  },
];

/* design-accurate mini previews, all on brand */
function Preview({ id }: { id: number }) {
  if (id === 1)
    return (
      <div className="relative h-full w-full overflow-hidden" style={{ background: "#050B16" }}>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(80% 60% at 50% -10%, rgba(0,144,240,0.20), transparent 60%)" }}
        />
        <div className="absolute left-6 top-6 text-[10px] uppercase tracking-[0.3em]" style={{ color: brand.blue, fontFamily: "'Space Mono',monospace" }}>
          AI-Native Since 2022
        </div>
        <div className="absolute bottom-7 left-6 right-6">
          <div className="text-[clamp(1.3rem,3vw,1.9rem)] leading-[0.98] text-[#EDEAE3]" style={{ fontFamily: fraunces }}>
            Partner with an AI agency that{" "}
            <span className="italic" style={{ color: "#7FCBFF" }}>knows</span> behavioral health
          </div>
          <div className="mt-4 inline-block rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black" style={{ background: "linear-gradient(90deg,#7FCBFF,#0090F0)" }}>
            Book a Discovery Call
          </div>
        </div>
      </div>
    );
  if (id === 2)
    return (
      <div className="relative h-full w-full overflow-hidden bg-white p-6" style={{ color: brand.navy }}>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(60% 50% at 90% 5%, rgba(0,144,240,0.10), transparent 60%)" }}
        />
        <div className="relative inline-flex items-center gap-2 rounded-full border border-[#CDE6FA] bg-[#EAF5FE] px-3 py-1 text-[9px] font-semibold text-[#0072D8]">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: brand.green }} /> AI-native · HIPAA-conscious
        </div>
        <div className="relative mt-3 text-[clamp(1.3rem,3vw,1.9rem)] font-extrabold leading-[1.05]" style={{ fontFamily: manrope }}>
          AI marketing that knows behavioral health
        </div>
        <div className="relative mt-4 inline-block rounded-full px-4 py-1.5 text-[10px] font-bold text-white" style={{ background: brand.blue }}>
          Book a Discovery Call
        </div>
        <div className="relative mt-5 flex gap-5">
          {[["$50M+", brand.blue], ["0", brand.green], ["847%", brand.blue]].map(([v, c]) => (
            <div key={v as string}>
              <div className="text-[1.1rem] font-extrabold" style={{ color: c as string }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    );
  if (id === 3)
    return (
      <div className="relative h-full w-full overflow-hidden" style={{ background: "#04070F" }}>
        <div className="absolute left-[-20%] top-[-30%] h-40 w-40 rounded-full blur-2xl" style={{ background: brand.blue, opacity: 0.6 }} />
        <div className="absolute right-[-10%] bottom-[-20%] h-40 w-40 rounded-full blur-2xl" style={{ background: brand.green, opacity: 0.5 }} />
        <div className="absolute left-[40%] top-[30%] h-32 w-32 rounded-full blur-2xl" style={{ background: brand.cyan, opacity: 0.4 }} />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="mb-3 rounded-full border border-white/15 px-3 py-1 text-[9px] text-white/70">AI-native · HIPAA-conscious</div>
          <div className="text-[clamp(1.3rem,3vw,2rem)] font-bold leading-[1.05] text-white" style={{ fontFamily: sora }}>
            The AI marketing engine for{" "}
            <span style={{ background: brandGradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              behavioral health
            </span>
          </div>
          <div className="mt-4 rounded-full px-4 py-1.5 text-[10px] font-semibold text-black" style={{ background: brandGradient }}>
            Book a Call
          </div>
        </div>
      </div>
    );
  if (id === 4)
    return (
      <div className="relative h-full w-full overflow-hidden bg-white" style={{ color: "#0B0B0B" }}>
        <div className="flex items-stretch justify-between border-b-2 border-black">
          <div className="px-4 py-2 text-[9px] uppercase" style={{ fontFamily: archivoBlack }}>Marketing Powered</div>
          <div className="px-4 py-2 text-[9px] font-bold uppercase text-white" style={{ background: brand.blue }}>Book</div>
        </div>
        <div className="px-5 py-6">
          <div className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: brand.blue }}>AI Marketing Agency</div>
          <div className="mt-3 text-[clamp(1.8rem,5vw,3rem)] uppercase leading-[0.88]" style={{ fontFamily: archivoBlack }}>
            Knows<br /><span style={{ color: brand.blue }}>Behavioral</span><br />Health.
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t-2 border-black px-5 py-2 text-[clamp(1.4rem,4vw,2rem)]" style={{ fontFamily: archivoBlack, color: brand.blue }}>
          $50M+
        </div>
      </div>
    );
  if (id === 5)
    return (
      <div className="relative h-full w-full overflow-hidden" style={{ background: "#03060E" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 60% at 82% 25%, rgba(0,144,240,0.20), transparent 55%), radial-gradient(50% 50% at 0% 100%, rgba(0,168,96,0.14), transparent 55%)" }} />
        <div className="absolute left-5 top-5 text-[9px] uppercase tracking-[0.3em]" style={{ color: brand.blue }}>
          Chapter 00
        </div>
        <div className="absolute bottom-7 left-5 right-5">
          <div className="text-[clamp(1.4rem,3.4vw,2.2rem)] leading-[0.95] text-[#F2F2EC]" style={{ fontFamily: bricolage, fontWeight: 700 }}>
            Partner with an AI Marketing Agency That Knows Behavioral Health
          </div>
          <div className="mt-4 inline-block rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black" style={{ background: brand.blue }}>
            Book a Discovery Call
          </div>
        </div>
      </div>
    );
  if (id === 6)
    return (
      <div className="relative h-full w-full overflow-hidden p-4" style={{ background: "#05080E", fontFamily: "'Space Mono',monospace" }}>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: brand.green }} />
          <span className="ml-2 text-[9px] text-white/35">marketing-powered — zsh</span>
        </div>
        <div className="mt-4 text-[11px] leading-6">
          <div>
            <span style={{ color: brand.green }}>mp@marketingpowered</span>
            <span className="text-white/35">:~$ </span>
            <span className="text-white">mp init --vertical behavioral-health</span>
          </div>
          <div style={{ color: brand.blue }}>[ ok ] loading inference cluster · $50M+ models</div>
          <div style={{ color: brand.green }}>[ ok ] legitscript compliance verified</div>
          <div className="mt-2 text-[clamp(1rem,2.6vw,1.5rem)] font-bold leading-tight text-white">
            AI agency that <span style={{ color: brand.green }}>knows</span>{" "}
            <span style={{ color: brand.blue }}>behavioral health</span>.
          </div>
          <div className="mt-2 text-white">
            <span style={{ color: brand.blue }}>▸ ./book-discovery-call.sh</span>
            <span className="mp-caret-g" style={{ color: brand.blue }}>▋</span>
          </div>
        </div>
      </div>
    );
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#EEF4FB] p-4" style={{ color: brand.navy }}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold">Attribution Overview</span>
        <span className="flex items-center gap-1 text-[9px] font-bold text-[#00854C]">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: brand.green }} /> LIVE
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[["ROAS", "847%", brand.blue], ["Cost / Adm.", "$42", brand.green]].map(([l, v, c]) => (
          <div key={l as string} className="rounded-lg bg-white p-2.5">
            <div className="text-[8px] font-bold uppercase tracking-wider" style={{ color: "#5A6B82" }}>{l}</div>
            <div className="text-[1.1rem] font-extrabold" style={{ color: c as string }}>{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg bg-white p-3">
        <div className="space-y-1.5">
          {[["Click", 100], ["Form / Call", 68], ["Qualified", 41], ["Admission", 23]].map(([l, p], i) => (
            <div key={l as string} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-[8px] font-semibold">{l}</span>
              <div className="h-3 flex-1 overflow-hidden rounded bg-[#E5EEF8]">
                <div
                  className="h-full rounded"
                  style={{
                    width: `${p}%`,
                    background: `linear-gradient(90deg, ${brand.blue}, ${i === 3 ? brand.green : brand.cyan})`,
                  }}
                />
              </div>
              <span className="w-7 text-right text-[8px] font-bold" style={{ color: brand.navy }}>{p}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DesignGallery() {
  return (
    <div className="min-h-screen text-white" style={{ background: "#040910", fontFamily: manrope }}>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(0,144,240,0.12), transparent 70%)",
        }}
      />

      <header className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 text-center">
        <div className="mb-10 flex justify-center">
          <Logo tone="light" />
        </div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[12px] uppercase tracking-[0.2em] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: brand.green }} />
          Seven Homepage Concepts
        </div>
        <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-extrabold leading-[1.04]" style={{ color: "#FFFFFF" }}>
          One agency.{" "}
          <span style={{ background: brandGradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
            Seven directions.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/55">
          The same story — an AI-native marketing agency for behavioral health —
          explored through seven on-brand homepage designs. Each is a full, live page.
        </p>
      </header>

      <main className="relative mx-auto grid max-w-6xl gap-7 px-6 pb-28 md:grid-cols-2">
        {designs.map((d, i) => (
          <Link
            key={d.id}
            href={`/design-${d.id}`}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-[#0090F0]/50 ${
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
                  <span className="text-[12px] tabular-nums text-white/30">0{d.id}</span>
                  <h2 className="text-[1.4rem] font-extrabold">{d.name}</h2>
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em]" style={{ color: brand.blue }}>
                  {d.tag}
                </div>
                <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-white/55">
                  {d.blurb}
                </p>
              </div>
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-transparent group-hover:text-white"
                style={{ ["--g" as string]: brand.blue }}
              >
                <span className="transition-colors group-hover:[&]:text-white">→</span>
              </span>
            </div>
          </Link>
        ))}
      </main>

      <footer className="relative border-t border-white/10 px-6 py-10 text-center text-[13px] text-white/35">
        Marketing Powered — AI-Native Marketing for Behavioral Health &amp; Mental Health
      </footer>
    </div>
  );
}
