type Faq = {
  question: string;
  answer: string;
};

/**
 * Native <details>/<summary> disclosure — keyboard-operable and exposes
 * correct aria semantics without any client-side JavaScript, and every
 * answer is present in the rendered HTML for search engines.
 */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group rounded-card border border-ink/10 bg-white p-5 open:border-brass"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink marker:content-none">
            {faq.question}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0 text-sea transition-transform group-open:rotate-45"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
