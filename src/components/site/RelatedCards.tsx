import Reveal from "@/components/Reveal";
import ServiceCard from "./ServiceCard";
import { GoldRule } from "./ui";

/* "More …" card row linking a page to its siblings, so every child page is
   reachable from several internal pages, not just its hub. */
export default function RelatedCards({
  kicker,
  items,
}: {
  kicker: string;
  items: { href: string; title: string; description: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-12">
      <Reveal className="mb-8 flex items-center gap-4">
        {/* h2 so the h3 card titles below sit under a heading of their own */}
        <h2
          className="text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
          style={{ fontFamily: "var(--font-space-mono), ui-monospace, monospace" }}
        >
          {kicker}
        </h2>
        <GoldRule className="flex-1" />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((g, i) => (
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
  );
}
