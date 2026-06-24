"use client";

import Script from "next/script";
import useDelayedScriptLoad from "@/components/useDelayedScriptLoad";

const PIXEL_DELAY_MS = 7000;

export default function DelayedAdPixels({
  linkedInPartnerId,
  metaPixelId,
}: {
  linkedInPartnerId: string;
  metaPixelId: string;
}) {
  const shouldLoad = useDelayedScriptLoad(PIXEL_DELAY_MS);

  if (!shouldLoad) return null;

  return (
    <>
      <Script id="linkedin-insight-init" strategy="lazyOnload">
        {`_linkedin_partner_id = "${linkedInPartnerId}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
window.lintrk = window.lintrk || function(a,b){(window.lintrk.q=window.lintrk.q||[]).push([a,b])};`}
      </Script>
      <Script
        id="linkedin-insight-loader"
        src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
        strategy="lazyOnload"
      />
      <Script id="meta-pixel" strategy="lazyOnload">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`}
      </Script>
    </>
  );
}
