import { BUSINESS, telHref, whatsappHref } from "@/content/business";
import { getDictionary, type Dictionary } from "@/content/dictionary";

export function CtaBand({ dict = getDictionary("en") }: { dict?: Dictionary }) {
  return (
    <section className="bg-ink py-16 lg:py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-5 text-center lg:px-10">
        <h2 className="max-w-2xl text-2xl font-bold text-white lg:text-3xl">{dict.ctaHeading}</h2>
        <p className="text-white/70">{BUSINESS.hours}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center rounded-input bg-brass px-8 text-base font-semibold text-ink hover:bg-brass-lit"
            data-analytics="whatsapp_click"
          >
            {dict.ctaWhatsappButton}
          </a>
          <a
            href={telHref()}
            className="flex h-12 items-center justify-center rounded-input border border-white/30 px-8 text-base font-semibold text-white hover:border-brass-lit hover:text-brass-lit"
            data-analytics="call_click"
          >
            {dict.callButtonPrefix} {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
