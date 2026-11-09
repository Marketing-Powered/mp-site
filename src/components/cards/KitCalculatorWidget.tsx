"use client";

import { useState } from "react";
import CalculatorPanel, { DEFAULT_CALCULATOR_STATE } from "./CalculatorPanel";

/* Live plan calculator, loaded on demand by LazyMount. */
export default function KitCalculatorWidget() {
  const [state, setState] = useState(DEFAULT_CALCULATOR_STATE);
  return (
    <CalculatorPanel
      {...state}
      onPlan={(planIndex) => setState((s) => ({ ...s, planIndex }))}
      onStands={(stands) => setState((s) => ({ ...s, stands }))}
      onNfc={(nfcCards) => setState((s) => ({ ...s, nfcCards }))}
    />
  );
}
