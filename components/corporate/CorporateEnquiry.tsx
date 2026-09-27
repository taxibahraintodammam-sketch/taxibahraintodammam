"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { whatsappHref } from "@/content/business";
import type { CorporateCopy } from "@/content/corporate";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/** Corporate enquiry: collects the account basics and writes the WhatsApp message. */
export function CorporateEnquiry({ copy }: { copy: CorporateCopy["enquiry"] }) {
  const id = useId();
  const f = copy.fields;
  const [v, setV] = useState({ company: "", contact: "", routes: "", people: "", vehicles: "" });
  const [frequency, setFrequency] = useState(f.frequencies[0]);
  const [billing, setBilling] = useState(f.billingOptions[0]);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));
  const or = (x: string) => x.trim() || copy.notSet;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const lines = [
      copy.messageIntro,
      `${f.company}: ${or(v.company)}`,
      `${f.contact}: ${or(v.contact)}`,
      `${f.routes}: ${or(v.routes)}`,
      `${f.people}: ${or(v.people)}`,
      `${f.frequency}: ${frequency}`,
      `${f.vehicles}: ${or(v.vehicles)}`,
      `${f.billing}: ${billing}`,
    ];
    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const field =
    "h-12 w-full rounded-md border border-white/15 bg-white/[0.06] px-3 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-brass-lit sm:text-sm";

  return (
    <form onSubmit={submit} aria-label={copy.heading} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field label={f.company} htmlFor={`${id}-company`}>
        <input id={`${id}-company`} value={v.company} onChange={set("company")} autoComplete="organization" className={field} />
      </Field>
      <Field label={f.contact} htmlFor={`${id}-contact`}>
        <input id={`${id}-contact`} value={v.contact} onChange={set("contact")} placeholder={f.contactPlaceholder} className={field} />
      </Field>
      <Field label={f.routes} htmlFor={`${id}-routes`} wide>
        <input id={`${id}-routes`} value={v.routes} onChange={set("routes")} placeholder={f.routesPlaceholder} className={field} />
      </Field>
      <Field label={f.people} htmlFor={`${id}-people`}>
        <input id={`${id}-people`} inputMode="numeric" value={v.people} onChange={set("people")} className={field} />
      </Field>
      <Field label={f.frequency} htmlFor={`${id}-frequency`}>
        <select id={`${id}-frequency`} value={frequency} onChange={(e) => setFrequency(e.target.value)} className={`${field} [&>option]:text-ink`}>
          {f.frequencies.map((x) => <option key={x}>{x}</option>)}
        </select>
      </Field>
      <Field label={f.vehicles} htmlFor={`${id}-vehicles`}>
        <input id={`${id}-vehicles`} value={v.vehicles} onChange={set("vehicles")} placeholder={f.vehiclesPlaceholder} className={field} />
      </Field>
      <Field label={f.billing} htmlFor={`${id}-billing`}>
        <select id={`${id}-billing`} value={billing} onChange={(e) => setBilling(e.target.value)} className={`${field} [&>option]:text-ink`}>
          {f.billingOptions.map((x) => <option key={x}>{x}</option>)}
        </select>
      </Field>
      <button
        type="submit"
        className="mt-2 flex h-[52px] items-center justify-center gap-2 rounded-md bg-brass px-6 text-base font-bold text-ink transition-colors hover:bg-brass-lit sm:col-span-2"
        data-analytics="whatsapp_click"
      >
        <WhatsAppIcon className="h-5 w-5" color="currentColor" />
        {copy.submit}
      </button>
    </form>
  );
}

function Field({ label, htmlFor, wide, children }: { label: string; htmlFor: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-white/80">
        {label}
      </label>
      {children}
    </div>
  );
}
