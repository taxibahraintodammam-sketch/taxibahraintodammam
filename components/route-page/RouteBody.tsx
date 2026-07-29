import type { RouteContent } from "@/content/routes";

/** Renders the long-form body: remaining intro paragraphs, then each section. */
export function RouteBody({ route }: { route: RouteContent }) {
  const [, ...restIntro] = route.intro;

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
          {route.sections.map((section) => (
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
      </div>
    </section>
  );
}
