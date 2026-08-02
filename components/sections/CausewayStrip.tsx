import type { Locale } from "@/lib/locale";

type Node = {
  label: string;
  meta?: string;
};

const COPY: Record<
  Locale,
  {
    eyebrow: string;
    defaultHeading: string;
    defaultFrom: string;
    defaultTo: string;
    bahrainIsland: string;
    causeway: string;
    saudiIsland: string;
    borderMeta: string;
    bridgeMeta: string;
    ariaLabel: string;
  }
> = {
  en: {
    eyebrow: "The Crossing",
    defaultHeading: "One driver, one fare, both sides of the border",
    defaultFrom: "Pickup, Bahrain",
    defaultTo: "Drop-off, Dammam",
    bahrainIsland: "Bahrain Immigration Island",
    causeway: "King Fahd Causeway",
    saudiIsland: "Saudi Immigration Island",
    borderMeta: "~15–20 min border",
    bridgeMeta: "~25 km · 20–30 min",
    ariaLabel: "How the King Fahd Causeway crossing works",
  },
  ar: {
    eyebrow: "العبور",
    defaultHeading: "سائق واحد، سعر واحد، على جانبي الحدود",
    defaultFrom: "استلام، البحرين",
    defaultTo: "توصيل، الدمام",
    bahrainIsland: "جزيرة الهجرة البحرينية",
    causeway: "جسر الملك فهد",
    saudiIsland: "جزيرة الهجرة السعودية",
    borderMeta: "١٥–٢٠ دقيقة تقريبًا",
    bridgeMeta: "٢٥ كم تقريبًا · ٢٠–٣٠ دقيقة",
    ariaLabel: "كيف يتم العبور عبر جسر الملك فهد",
  },
};

/**
 * The signature "crossing" element: a full-bleed band rendering the real
 * journey (pickup -> Bahrain island -> 25km bridge -> Saudi island ->
 * drop-off) with a slow brass light-trail travelling left to right.
 * Pure CSS animation (see .causeway-trail in globals.css) — no JS, and
 * disabled globally under prefers-reduced-motion. Reused on every route
 * page with the actual pickup/drop-off labels for that route.
 */
export function CausewayStrip({
  fromLabel,
  toLabel,
  heading,
  locale = "en",
}: {
  fromLabel?: string;
  toLabel?: string;
  heading?: string;
  locale?: Locale;
}) {
  const copy = COPY[locale];
  const nodes: Node[] = [
    { label: fromLabel ?? copy.defaultFrom },
    { label: copy.bahrainIsland, meta: copy.borderMeta },
    { label: copy.causeway, meta: copy.bridgeMeta },
    { label: copy.saudiIsland, meta: copy.borderMeta },
    { label: toLabel ?? copy.defaultTo },
  ];

  return (
    <section aria-label={copy.ariaLabel} className="border-y border-ink/10 bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
        <p className="eyebrow text-center text-brass">{copy.eyebrow}</p>
        <h2 className="mt-2 text-center text-2xl font-bold text-ink lg:text-3xl">
          {heading ?? copy.defaultHeading}
        </h2>

        {/*
          Forced LTR: this strip depicts real west-to-east geography
          (Bahrain -> causeway -> Saudi Arabia), not text flow, so it must
          not mirror under the Arabic RTL layout the way flex/grid content
          normally would.
        */}
        <div dir="ltr" className="relative mt-12">
          <div
            className="absolute left-[10%] right-[10%] top-[22px] h-px bg-ink/10 lg:top-[27px]"
            aria-hidden="true"
          />
          <div
            className="causeway-trail absolute top-[19px] left-[10%] h-[7px] w-[7px] rounded-full bg-brass-lit lg:top-[24px]"
            style={{ boxShadow: "0 0 14px 3px rgba(102,157,246,0.65)" }}
            aria-hidden="true"
          />

          <ol className="relative grid grid-cols-5 gap-1 sm:gap-3">
            {nodes.map((node, index) => (
              <li key={`${node.label}-${index}`} className="flex flex-col items-center text-center">
                <span
                  className="z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-brass bg-white"
                  aria-hidden="true"
                >
                  <span className="text-[11px] font-bold text-brass">0{index + 1}</span>
                </span>
                <span className="mt-3 text-[11px] font-semibold leading-tight text-ink sm:text-sm">
                  {node.label}
                </span>
                {node.meta && (
                  <span className="eyebrow mt-1 text-slate hidden sm:block">{node.meta}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
