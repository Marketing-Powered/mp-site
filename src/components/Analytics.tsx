import Script from "next/script";

/* Analytics / tracking pixels.
   Each loads only when its ID is configured, so the site no-ops cleanly
   until Jason supplies the values:
     - NEXT_PUBLIC_GA4_ID         e.g. G-XXXXXXXXXX  (Google Analytics 4)
     - NEXT_PUBLIC_META_PIXEL_ID  e.g. 123456789012345 (Meta / Facebook Pixel)
   These are NEXT_PUBLIC_* so they're inlined at build time. */
export default function Analytics() {
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;
  const metaPixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {ga4 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4}');`}
          </Script>
        </>
      )}

      {metaPixel && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixel}');
fbq('track', 'PageView');`}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${metaPixel}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* "Mia" — GoHighLevel (LeadConnector) web chat widget. Loads site-wide. */}
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="69eafedccbb9f443ce9942a0"
        strategy="afterInteractive"
      />
    </>
  );
}
