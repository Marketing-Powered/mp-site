import Reveal from "@/components/Reveal";
import type { Node } from "@/lib/pages";
import { serif } from "./theme";
import { RichText, GhostCta, SectionHeading } from "./ui";

/* Renders one content section: a serif heading followed by its
   paragraphs, lists, sub-headings, and inline CTAs. */
export default function Section({
  heading,
  nodes,
}: {
  heading: string;
  nodes: Node[];
}) {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 py-12 lg:px-12">
      {heading && (
        <Reveal>
          <SectionHeading className="mb-7">{heading}</SectionHeading>
        </Reveal>
      )}
      <div className="space-y-6">
        {nodes.map((n, i) => {
          if (n.type === "heading") {
            return (
              <Reveal key={i}>
                <h3
                  className="pt-2 text-[1.25rem] leading-snug text-[#7FCBFF]"
                  style={{ fontFamily: serif, fontWeight: 500 }}
                >
                  {n.text}
                </h3>
              </Reveal>
            );
          }
          if (n.type === "paragraph") {
            return (
              <Reveal key={i}>
                <p className="text-[1.02rem] leading-relaxed text-white/65">
                  <RichText text={n.text} />
                </p>
              </Reveal>
            );
          }
          if (n.type === "list") {
            return (
              <Reveal key={i}>
                <ul className="space-y-3">
                  {n.items.map((it, j) => (
                    <li key={j} className="flex gap-3 text-[1rem] leading-relaxed text-white/65">
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0]" />
                      <span>
                        <RichText text={it} />
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          }
          // cta
          return (
            <Reveal key={i}>
              <div className="pt-1">
                <GhostCta href={n.link || "/get-started/"}>{n.text}</GhostCta>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
