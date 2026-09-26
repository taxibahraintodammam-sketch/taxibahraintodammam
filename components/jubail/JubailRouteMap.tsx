/**
 * Simplified map of the Bahrain → Jubail drive. Coordinates are real
 * lon/lat projected with x = (lon − 49.5) × 300, y = (27.15 − lat) × 350,
 * so relative positions (Ras Tanura's peninsula, Jubail well north of
 * Dammam, the causeway's west–east line) are roughly true — just smoothed.
 * Forced LTR: it depicts geography, not text flow.
 */

type Place = { name: string; x: number; y: number; anchor?: "start" | "end"; dx?: number; dy?: number };

// Open path for the drawn shoreline; LAND closes it off-canvas for the fill only.
const SHORE =
  "M66 0 L54 45 L105 88 L150 140 L180 165 L198 178 L174 186 L150 203 L174 238 L195 262 L213 298 L210 350 L186 402 L195 500";
const LAND = `M0 0 ${SHORE.slice(1)} L0 500 Z`;

const BAHRAIN = "M291 315 L336 308 L345 332 L336 385 L330 455 L315 472 L300 420 L288 367 Z";

// Pickup → causeway → Saudi border → up the coastal highway → Jubail.
const ROUTE = "M322 326 L288 340 L249 336 L219 343 L204 312 L180 262 Q150 205 118 132 T50 50";

const PLACES: Place[] = [
  { name: "Ras Tanura", x: 198, y: 178, anchor: "start", dx: 9, dy: 4 },
  { name: "Qatif", x: 150, y: 206, anchor: "end", dx: -9, dy: 4 },
  { name: "Dammam", x: 180, y: 258, anchor: "end", dx: -9, dy: 4 },
  { name: "Khobar", x: 212, y: 302, anchor: "start", dx: 9, dy: 4 },
];

export function JubailRouteMap({ className }: { className?: string }) {
  return (
    <figure dir="ltr" className={className}>
      <svg
        viewBox="0 0 400 500"
        role="img"
        aria-labelledby="jubail-map-title jubail-map-desc"
        className="h-auto w-full"
      >
        <title id="jubail-map-title">Route from Bahrain to Jubail</title>
        <desc id="jubail-map-desc">
          Simplified map. The route leaves Manama, crosses the King Fahd Causeway west into Saudi
          Arabia near Khobar, then runs north past Dammam and Qatif to Jubail.
        </desc>

        <path d={LAND} fill="currentColor" className="text-white/[0.07]" />
        <path d={SHORE} fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
        <path d={BAHRAIN} fill="currentColor" className="text-white/[0.07]" />
        <path d={BAHRAIN} fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />

        <text x="40" y="330" className="fill-white/35 text-[11px] font-bold uppercase tracking-[0.2em]">
          Saudi Arabia
        </text>
        <text x="316" y="492" textAnchor="middle" className="fill-white/35 text-[11px] font-bold uppercase tracking-[0.2em]">
          Bahrain
        </text>
        <text x="250" y="96" className="fill-white/25 text-[11px] italic tracking-[0.15em]">
          Arabian Gulf
        </text>

        {/* The route: a soft glow under a crisp dashed line. */}
        <path d={ROUTE} fill="none" stroke="var(--brass-lit)" strokeOpacity="0.25" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d={ROUTE} fill="none" stroke="var(--brass-lit)" strokeWidth="2.25" strokeDasharray="6 5" strokeLinecap="round" strokeLinejoin="round" />

        {PLACES.map((p) => (
          <g key={p.name}>
            <circle cx={p.x} cy={p.y} r="3" className="fill-white/60" />
            <text
              x={p.x + (p.dx ?? 0)}
              y={p.y + (p.dy ?? 0)}
              textAnchor={p.anchor}
              className="fill-white/60 text-[11px] font-medium"
            >
              {p.name}
            </text>
          </g>
        ))}

        {/* Causeway label */}
        <text x="254" y="362" textAnchor="middle" className="fill-white/70 text-[10px] font-semibold">
          King Fahd Causeway
        </text>

        {/* Origin */}
        <circle cx="322" cy="326" r="5" fill="var(--white)" />
        <text x="332" y="300" className="fill-white text-[12px] font-bold">
          Manama
        </text>

        {/* Destination */}
        <circle cx="50" cy="50" r="14" fill="var(--brass-lit)" fillOpacity="0.2" />
        <circle cx="50" cy="50" r="6" fill="var(--brass-lit)" />
        <text x="72" y="46" className="fill-white text-[15px] font-bold">
          Jubail
        </text>
        <text x="72" y="62" className="fill-white/60 text-[10px]">
          Industrial City · Al Balad
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-white/50">
        Simplified map. Approximate route, not to exact scale.
      </figcaption>
    </figure>
  );
}
