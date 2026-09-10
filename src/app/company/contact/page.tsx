import MarkdownPage from "@/components/site/MarkdownPage";
import Reveal from "@/components/Reveal";
import MapEmbed from "@/components/site/MapEmbed";
import { LeadForm } from "@/components/site/Forms";
import { pageMetadata } from "@/lib/pages";
import { LEAD_FORMS } from "@/lib/leadForms";
import { siteContent as s } from "@/lib/content";
import { serif, mono } from "@/components/site/theme";

const FILE = "company/contact.md";
export const metadata = pageMetadata(FILE);

const DETAILS = [
  // E.164 with country code — the derived form dropped the +1 and could fail
  // for callers outside the US.
  { label: "Call", value: s.brand.phone, href: `tel:${s.brand.phoneE164}` },
  { label: "Email", value: s.brand.email, href: `mailto:${s.brand.email}` },
  { label: "Visit", value: s.brand.address },
];

function ContactDetails() {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 py-12 lg:px-12">
      <div className="grid gap-4 sm:grid-cols-3">
        {DETAILS.map((d, i) => (
          <Reveal
            key={d.label}
            delay={i * 80}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
          >
            <p
              className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#0090F0]"
              style={{ fontFamily: mono }}
            >
              {d.label}
            </p>
            {d.href ? (
              <a
                href={d.href}
                className="text-[0.98rem] leading-relaxed text-white/75 transition-colors hover:text-[#7FCBFF]"
                style={{ fontFamily: serif }}
              >
                {d.value}
              </a>
            ) : (
              <p className="text-[0.95rem] leading-relaxed text-white/65" style={{ fontFamily: serif }}>
                {d.value}
              </p>
            )}
          </Reveal>
        ))}
      </div>
      <Reveal
        variant="blur"
        className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
      >
        <MapEmbed className="block h-[420px] w-full sm:h-[480px]" />
      </Reveal>
    </section>
  );
}

export default function Page() {
  return (
    <MarkdownPage file={FILE} kicker="Contact" hideCta>
      <ContactDetails />
      {/* shared with the popup lead modal — see src/lib/leadForms.ts */}
      <LeadForm {...LEAD_FORMS.contact} />
    </MarkdownPage>
  );
}
