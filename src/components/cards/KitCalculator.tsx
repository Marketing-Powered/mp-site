import { CardsSection, SectionIntro } from "./ui";
import LazyMount from "./LazyMount";
import CalculatorPanel, { DEFAULT_CALCULATOR_STATE } from "./CalculatorPanel";

/* Plan picker + optional one-time hardware, with a live first-payment
   summary. "Start the plan" hands the selection to the order request form
   on /cards/order. Server component: the default selection is static HTML
   until the widget loads near view. */

export default function KitCalculator() {
  return (
    <CardsSection id="plans" labelledBy="plans-title">
      <div className="flex flex-col gap-10">
        <SectionIntro
          id="plans-title"
          kicker="Plans"
          title="Pick how many cards you hand out each month."
          body="Start with the smallest plan that matches a normal week. Moving up or down later is a quick request, not a new contract."
        />
        <LazyMount widget="calculator">
          <CalculatorPanel {...DEFAULT_CALCULATOR_STATE} />
        </LazyMount>
      </div>
    </CardsSection>
  );
}
