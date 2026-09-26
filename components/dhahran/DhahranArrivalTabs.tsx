"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { whatsappHref } from "@/content/business";
import type { DhahranCopy } from "@/content/dhahran";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/**
 * WAI-ARIA tabs (manual activation is unnecessary here — panels are cheap,
 * so arrows move focus and select together). Every panel is rendered into
 * the HTML with `hidden`, so all five trip types stay crawlable.
 */
export function DhahranArrivalTabs({ copy }: { copy: DhahranCopy["arrivals"] }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const rtl = document.documentElement.dir === "rtl";
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const prev = rtl ? "ArrowRight" : "ArrowLeft";
    const count = copy.types.length;
    let index: number | null = null;
    if (event.key === next) index = (active + 1) % count;
    else if (event.key === prev) index = (active - 1 + count) % count;
    else if (event.key === "Home") index = 0;
    else if (event.key === "End") index = count - 1;
    if (index === null) return;
    event.preventDefault();
    setActive(index);
    tabs.current[index]?.focus();
  }

  return (
    <div>
      <div>
        <div
          role="tablist"
          aria-label={copy.heading}
          onKeyDown={onKeyDown}
          className="flex flex-wrap gap-1 rounded-[18px] bg-white p-1 shadow-sm ring-1 ring-ink/10 sm:inline-flex sm:flex-nowrap sm:rounded-pill"
        >
          {copy.types.map((type, index) => {
            const selected = index === active;
            return (
              <button
                key={type.key}
                ref={(el) => {
                  tabs.current[index] = el;
                }}
                id={`${baseId}-tab-${type.key}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${type.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={`h-11 grow basis-[30%] whitespace-nowrap rounded-pill px-4 sm:grow-0 sm:basis-auto sm:px-5 text-sm font-semibold transition-colors sm:flex-none ${
                  selected ? "bg-ink text-white" : "text-slate hover:text-ink"
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {copy.types.map((type, index) => (
        <div
          key={type.key}
          id={`${baseId}-panel-${type.key}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${type.key}`}
          hidden={index !== active}
          tabIndex={0}
          className="mt-8 grid grid-cols-1 gap-8 rounded-card bg-white p-6 ring-1 ring-ink/10 sm:p-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:p-10"
        >
          <div>
            <h3 className="text-2xl font-bold leading-tight lg:text-[1.9rem]">{type.title}</h3>
            <p className="mt-4 text-slate lg:text-lg">{type.body}</p>
            <p className="mt-6 text-sm">
              <span className="font-semibold text-ink">{copy.vehicleLabel}: </span>
              <span className="text-slate">{type.vehicle}</span>
            </p>
          </div>
          <div className="flex flex-col border-t border-ink/10 pt-6 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0">
            <p className="text-xs font-bold uppercase tracking-wide text-sea">{copy.sendLabel}</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {type.send.map((item) => (
                <li key={item} className="flex gap-3 text-[0.95rem]">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sea" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={whatsappHref(type.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-input border border-ink/20 px-5 text-sm font-semibold hover:border-sea hover:text-sea lg:mt-auto"
              data-analytics="whatsapp_click"
            >
              <WhatsAppIcon className="h-4 w-4" color="currentColor" />
              {copy.cta}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
