/* Client-side GA4 event helpers plus the visitor's page journey.

   The journey is the ordered list of pages seen this browser session
   (sessionStorage survives client-side navigations and reloads, and dies with
   the tab). ConversionEvents records every pathname change; gtagEvent stamps
   journey context onto every event it sends:

     page_path      the page the visitor was on when the event fired
     previous_page  the page before it in the journey
     page_journey   recent pages joined with " > ", newest last — trimmed from
                    the front to GA4's 100-character param-value limit, with a
                    leading "…" when older pages were dropped
     pages_viewed   how many pages the session has seen (number)

   Everything is wrapped against sessionStorage being unavailable (private
   windows, blocked site data): tracking then degrades to page_path only. */

const JOURNEY_KEY = "mp_page_journey";
const JOURNEY_MAX_PAGES = 25;
/* GA4 truncates event parameter values past 100 characters; trim ourselves so
   the newest pages survive instead of the oldest. */
const JOURNEY_MAX_CHARS = 100;

function readJourney(): string[] {
  try {
    const raw = window.sessionStorage.getItem(JOURNEY_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((p): p is string => typeof p === "string") : [];
  } catch {
    return [];
  }
}

/** Append a pathname to the session's journey (consecutive repeats collapse). */
export function recordPageVisit(path: string) {
  try {
    const journey = readJourney();
    if (journey[journey.length - 1] === path) return;
    journey.push(path);
    window.sessionStorage.setItem(
      JOURNEY_KEY,
      JSON.stringify(journey.slice(-JOURNEY_MAX_PAGES)),
    );
  } catch {
    /* sessionStorage unavailable — journey params just come back empty. */
  }
}

function journeyParams(): Record<string, string | number> {
  const journey = readJourney();
  if (journey.length === 0) return {};

  /* Keep the newest pages; prepend older ones while they fit. */
  let joined = journey[journey.length - 1];
  let truncated = false;
  for (let i = journey.length - 2; i >= 0; i--) {
    const next = `${journey[i]} > ${joined}`;
    if (next.length > JOURNEY_MAX_CHARS - 2) {
      truncated = true;
      break;
    }
    joined = next;
  }
  if (truncated) joined = `… ${joined}`.slice(0, JOURNEY_MAX_CHARS);

  const params: Record<string, string | number> = {
    page_journey: joined,
    pages_viewed: journey.length,
  };
  const previous = journey[journey.length - 2];
  if (previous) params.previous_page = previous;
  return params;
}

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/** Send a GA4 event, stamped with the current page and the session journey.
    Pushed through the standard gtag stub, so events fired before the delayed
    Google tag has loaded queue on the dataLayer and are sent once it does. */
export function gtagEvent(name: string, params: Record<string, string | number>) {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer ?? [];
  if (typeof w.gtag !== "function") {
    w.gtag = function gtag() {
      /* gtag.js only processes Arguments objects on the dataLayer, so this
         must push `arguments`, never a plain array. */
      // eslint-disable-next-line prefer-rest-params
      (window as GtagWindow).dataLayer!.push(arguments);
    };
  }
  w.gtag("event", name, {
    page_path: window.location.pathname,
    ...journeyParams(),
    ...params,
  });
}
