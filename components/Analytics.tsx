import Script from "next/script";

/**
 * Site analytics for the public pages (rendered from app/[locale]/layout.tsx,
 * so /admin and /driver aren't tracked). These IDs are public by design —
 * they ship to every visitor's browser — so they live in code, not .env.
 *
 * Each vendor's domains must also be allowed in the Content-Security-Policy
 * in next.config.ts, or the browser silently blocks them.
 */
const GA4_ID = "G-2NE0YEHYK7";
const CLARITY_ID = "yooesnqt0s";
const AHREFS_KEY = "MMVqqgywNuMGomrHADWqpQ";

export function Analytics() {
  return (
    <>
      {/* Google Analytics 4 */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="clarity-init" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_ID}");`}
      </Script>

      {/* Ahrefs Web Analytics */}
      <Script src="https://analytics.ahrefs.com/analytics.js" data-key={AHREFS_KEY} strategy="afterInteractive" />
    </>
  );
}
