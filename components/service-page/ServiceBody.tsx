import type { ServiceContent } from "@/content/services";
import { getDictionary, type Dictionary } from "@/content/dictionary";

export function ServiceBody({
  service,
  dict = getDictionary("en"),
}: {
  service: ServiceContent;
  dict?: Dictionary;
}) {
  const [, ...restIntro] = service.intro;

  return (
    <section className="bg-sand py-16 lg:py-20">
      <div className="mx-auto max-w-[820px] px-5 lg:px-10">
        {restIntro.length > 0 && (
          <div className="flex flex-col gap-4">
            {restIntro.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-ink/85">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-col gap-10">
          {service.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold text-ink lg:text-2xl">{section.heading}</h2>
              <div className="mt-3 flex flex-col gap-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed text-ink/85">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-slate">{dict.fareDisclaimer}</p>
      </div>
    </section>
  );
}
