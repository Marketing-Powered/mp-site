import Script from "next/script";

/* Tawk.to live chat widget — loaded site-wide from the root layout, so it
   appears on every page. Property/widget ids are public embed values. */
const TAWK_SRC = "https://embed.tawk.to/6af5e9600c67493c4d3a79d0/1k789f82h";

export default function TawkChat() {
  return (
    <Script id="tawk-to" strategy="afterInteractive">
      {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='${TAWK_SRC}';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`}
    </Script>
  );
}
