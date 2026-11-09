import { MailCheck, RefreshCw, Sparkles, UserCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import { CardsSection, SectionIntro } from "./ui";

const features = [
  {
    icon: Sparkles,
    title: "Your card, designed for you",
    body: "Our AI pulls your logo, colors and offer from your website and listings, then drafts on-brand layouts. A designer refines them and you approve the proof.",
  },
  {
    icon: UserCheck,
    title: "A person checks every proof",
    body: "QR codes, links and copy are tested automatically, and nothing prints until a person on our team and you have signed off.",
  },
  {
    icon: MailCheck,
    title: "Review-request emails",
    body: "A follow-up email asks every one of your customers for a review. All of them, never only the happy ones, as Google and the FTC require.",
  },
  {
    icon: RefreshCw,
    title: "Refills before you run out",
    body: "Usage check-ins and reorder reminders mean the next box arrives on time, and we suggest a smaller plan if you need fewer cards.",
  },
];

export default function PoweredSystem() {
  return (
    <CardsSection id="system" labelledBy="system-title">
      <div className="flex flex-col gap-10">
        <Reveal>
          <SectionIntro
            id="system-title"
            kicker="Run by Marketing Powered"
            title="More than a card. A review program that runs itself."
            body="The same AI systems that run our agency work design your cards and follow up with your customers, so you get an agency-grade program at a gadget price."
          />
        </Reveal>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} as="li" delay={i * 60} className="bg-card">
              <div className="flex h-full flex-col gap-3 p-6 md:p-8">
                <Icon className="size-6 text-brand" aria-hidden="true" />
                <h3 className="font-serif text-lg font-medium">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </CardsSection>
  );
}
