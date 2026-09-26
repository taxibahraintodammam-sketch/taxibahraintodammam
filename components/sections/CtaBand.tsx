import { BUSINESS, telHref, whatsappHref } from "@/content/business";
import { getDictionary, type Dictionary } from "@/content/dictionary";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/**
 * The closing call to action. It says what happens after the click, rather
 * than just "contact us", and keeps the phone as a quieter second option.
 */
export function CtaBand({ dict = getDictionary("en") }: { dict?: Dictionary }) {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 py-14 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16 lg:px-10 lg:py-16">
        <div>
          <h2 className="max-w-xl text-2xl font-bold leading-tight lg:text-[2rem]">{dict.ctaHeading}</h2>
          <p className="mt-3 max-w-xl text-white/70">{dict.ctaBody}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <a
            href={whatsappHref(dict.whatsappDefaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-input bg-brass px-6 text-base font-semibold text-ink transition-colors hover:bg-brass-lit"
            data-analytics="whatsapp_click"
          >
            <WhatsAppIcon className="h-5 w-5" color="currentColor" />
            {dict.ctaWhatsappButton}
          </a>
          <a
            href={telHref()}
            className="flex h-12 items-center justify-center gap-1.5 rounded-input px-6 text-sm font-semibold text-white/80 transition-colors hover:text-white"
            data-analytics="call_click"
          >
            {dict.callButtonPrefix} <span dir="ltr">{BUSINESS.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
