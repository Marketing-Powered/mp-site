/* GA4 custom events.

   gtag.js is loaded lazily by components/Analytics.tsx, so `window.gtag` may
   not exist yet when a visitor acts. Pushing straight onto the dataLayer
   queue works either way: gtag.js drains the queue when it loads.

   gtag only recognises the `arguments` object as a command, not a plain
   array, hence the inner function. */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const queue = window.dataLayer;
  function gtag(...args: unknown[]) {
    void args;
    // eslint-disable-next-line prefer-rest-params
    queue.push(arguments);
  }
  gtag("event", name, params);
}

/** A lead or order form the server has accepted. Call from the success branch
    only, so rejected or failed submissions are never counted as conversions. */
export function trackFormSubmit(formId: string, formName: string) {
  trackEvent("form_submit", { form_id: formId, form_name: formName });
}
