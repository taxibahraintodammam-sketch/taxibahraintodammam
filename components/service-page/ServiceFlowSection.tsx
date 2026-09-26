import type { ServiceFlow } from "@/content/service-flows";

/**
 * Two shapes, because services differ in kind:
 * - "sequence": things happen in a fixed order (a flight, a border round trip),
 *   drawn as a numbered chain on a dark band.
 * - "checklist": considerations rather than steps (what a family van changes,
 *   what an accessible trip needs), drawn as a light two-column list.
 */
export function ServiceFlowSection({ flow, variant }: { flow: ServiceFlow; variant: "sequence" | "checklist" }) {
  if (variant === "sequence") {
    return (
      <section aria-labelledby="service-flow-heading" className="bg-ink py-14 text-white lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-10">
          <p className="eyebrow text-brass-lit">{flow.eyebrow}</p>
          <h2 id="service-flow-heading" className="mt-2 text-2xl font-bold lg:text-3xl">
            {flow.heading}
          </h2>
          <ol
            className={`mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-white/10 sm:grid-cols-2 ${
              flow.steps.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
            }`}
          >
            {flow.steps.map((step, index) => (
              <li key={step.title} className="bg-ink p-5 lg:p-6">
                <span className="font-[family-name:var(--font-mono)] text-xs text-brass-lit">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-bold">{step.title}</h3>
                <p className="mt-1.5 text-sm text-white/65">{step.body}</p>
              </li>
            ))}
          </ol>
          {flow.note && <p className="mt-6 max-w-3xl text-sm text-white/60">{flow.note}</p>}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="service-flow-heading" className="bg-ink/[0.035] py-14 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div>
          <p className="eyebrow text-sea">{flow.eyebrow}</p>
          <h2 id="service-flow-heading" className="mt-2 text-2xl font-bold lg:text-3xl">
            {flow.heading}
          </h2>
          {flow.note && <p className="mt-4 text-sm text-slate">{flow.note}</p>}
        </div>
        <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
          {flow.steps.map((step) => (
            <div key={step.title} className="border-t border-ink/10 py-5">
              <dt className="flex items-center gap-2 font-bold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-sea" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {step.title}
              </dt>
              <dd className="mt-1.5 text-[0.95rem] text-slate">{step.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
