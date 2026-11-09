import { Briefcase, Car, Dumbbell, Home, Scissors, UtensilsCrossed } from "lucide-react";
import Reveal from "@/components/Reveal";
import { CardsSection, SectionIntro } from "./ui";

const segments = [
  {
    icon: Scissors,
    name: "Salons and personal services",
    use: "Booking, aftercare, referrals and a neutral review invitation.",
    plan: "100 to 250 cards",
  },
  {
    icon: Car,
    name: "Auto services and detailing",
    use: "Service reminders, booking and repeat-visit details.",
    plan: "100 to 500 cards",
  },
  {
    icon: Home,
    name: "Home-service teams",
    use: "Job-completion handouts, maintenance tips and contact links.",
    plan: "100 to 500 cards",
  },
  {
    icon: Dumbbell,
    name: "Fitness and local retail",
    use: "Class schedules, product guidance, memberships and events.",
    plan: "100 to 500 cards",
  },
  {
    icon: UtensilsCrossed,
    name: "Hospitality and events",
    use: "Menus, reservations, event details and follow-up offers.",
    plan: "250 to 1,000 cards",
  },
  {
    icon: Briefcase,
    name: "Agencies and multi-location groups",
    use: "One consistent design with location-specific destinations.",
    plan: "1,000 to 2,500+ cards",
  },
];

export default function WhoItsFor() {
  return (
    <CardsSection id="who" labelledBy="who-title">
      <div className="flex flex-col gap-10">
        <Reveal>
          <SectionIntro
            id="who-title"
            kicker="Who it is for"
            title="Built for businesses that hand something to every customer."
            body="If someone on your team already hands out a receipt, a menu or a business card, a Powered Card can replace it with something people keep and scan."
          />
        </Reveal>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map(({ icon: Icon, name, use, plan }, i) => (
            <Reveal key={name} as="li" delay={i * 50} className="bg-card">
              <div className="flex h-full flex-col gap-3 p-6">
                <Icon className="size-6 text-brand" aria-hidden="true" />
                <h3 className="font-serif font-medium">{name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{use}</p>
                <p className="mt-auto pt-2 text-sm font-medium text-white/80">Typical plan: {plan}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </CardsSection>
  );
}
