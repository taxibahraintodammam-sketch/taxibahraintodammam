import { QuoteForm } from "@/components/ui/QuoteForm";
import { sarFromBhd } from "@/content/business";
import type { ServiceContent } from "@/content/services";
import { getDictionary, type Dictionary } from "@/content/dictionary";

export function ServiceHero({
  service,
  dict = getDictionary("en"),
}: {
  service: ServiceContent;
  dict?: Dictionary;
}) {
  return (
    <section className="bg-ink pb-16 pt-8 lg:pb-20 lg:pt-12">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="flex flex-col justify-center">
          <p className="eyebrow text-brass-lit">{dict.serviceEyebrow}</p>
          <h1 className="mt-3 text-[2rem] font-bold leading-tight text-white lg:text-[2.75rem]">
            {service.name}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 lg:text-lg">{service.intro[0]}</p>
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="eyebrow text-white/50">{dict.startingFrom}</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              BHD {service.minPriceBhd}{" "}
              <span className="text-base font-normal text-white/60">
                / SAR {sarFromBhd(service.minPriceBhd)}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
