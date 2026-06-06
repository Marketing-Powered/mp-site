import MarkdownPage from "@/components/site/MarkdownPage";
import Reveal from "@/components/Reveal";
import { LeadForm } from "@/components/site/Forms";
import { pageMetadata } from "@/lib/pages";
import { siteContent as s } from "@/lib/content";
import { serif, mono } from "@/components/site/theme";

const FILE = "company/contact.md";
export const metadata = pageMetadata(FILE);

const DETAILS = [
  { label: "Call", value: s.brand.phone, href: `tel:${s.brand.phone.replace(/[^0-9+]/g, "")}` },
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
        className="mt-6 flex min-h-[220px] items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02]"
      >
        <span
          className="text-[11px] uppercase tracking-[0.22em] text-white/35"
          style={{ fontFamily: mono }}
        >
          Image · Map / Palm Beach Gardens, FL
        </span>
      </Reveal>
    </section>
  );
}

export default function Page() {
  return (
    <MarkdownPage file={FILE} kicker="Contact" hideCta>
      <ContactDetails />
      <LeadForm
        title="Start a conversation"
        intro="Tell us about your center and what you're trying to solve. We'll get back to you within one business day."
        submitLabel="Send Message"
        fields={[
          { name: "name", label: "Full Name", required: true },
          { name: "org", label: "Organization", required: true },
          { name: "email", label: "Work Email", type: "email", required: true },
          { name: "phone", label: "Phone", type: "tel" },
          { name: "message", label: "How can we help?", type: "textarea", required: true },
        ]}
      />
    </MarkdownPage>
  );
}
