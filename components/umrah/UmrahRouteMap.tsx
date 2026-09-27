import type { UmrahCopy } from "@/content/umrah";

/**
 * The two ways to reach Makkah, drawn on real coordinates (projected
 * x = (lon − 38.5) × 60, y = (27 − lat) × 60) but without coastlines —
 * it's a diagram of the choice, not a map to navigate by. The drawing is forced LTR
 * (geography doesn't mirror in Arabic); the caption follows the page direction.
 */
const P = {
  bahrain: { x: 723, y: 48 },
  riyadh: { x: 492, y: 138 },
  jeddah: { x: 40, y: 328 },
  makkah: { x: 80, y: 335 },
};

export function UmrahRouteMap({ labels, className }: { labels: UmrahCopy["hero"]["map"]; className?: string }) {
  return (
    <figure className={className}>
      <svg style={{ direction: "ltr" }} viewBox="0 0 760 400" role="img" aria-labelledby="umrah-map-title" className="h-auto w-full">
        <title id="umrah-map-title">
          {`${labels.bahrain} → ${labels.makkah}: ${labels.road} (${labels.riyadh}) / ${labels.flight} (${labels.jeddah})`}
        </title>

        {/* Flight option: a light dotted arc to Jeddah */}
        <path d={`M${P.bahrain.x} ${P.bahrain.y} Q 330 -10 ${P.jeddah.x} ${P.jeddah.y}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" className="text-white/45" />
        <path d={`M${P.jeddah.x} ${P.jeddah.y} L ${P.makkah.x} ${P.makkah.y}`} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/45" />

        {/* Road option: the drive across the peninsula */}
        <path
          d={`M${P.bahrain.x} ${P.bahrain.y} Q 640 70 ${P.riyadh.x} ${P.riyadh.y} Q 300 235 ${P.makkah.x} ${P.makkah.y}`}
          fill="none"
          stroke="var(--brass-lit)"
          strokeOpacity="0.25"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d={`M${P.bahrain.x} ${P.bahrain.y} Q 640 70 ${P.riyadh.x} ${P.riyadh.y} Q 300 235 ${P.makkah.x} ${P.makkah.y}`}
          fill="none"
          stroke="var(--brass-lit)"
          strokeWidth="2.5"
          strokeDasharray="8 6"
          strokeLinecap="round"
        />

        <circle cx={P.riyadh.x} cy={P.riyadh.y} r="4" className="fill-white/60" />
        <text x={P.riyadh.x + 12} y={P.riyadh.y + 34} className="fill-white/60 text-[27px]">{labels.riyadh}</text>

        <circle cx={P.jeddah.x} cy={P.jeddah.y} r="4" className="fill-white/60" />
        <text x={P.jeddah.x - 24} y={P.jeddah.y + 48} className="fill-white/60 text-[27px]">{labels.jeddah}</text>

        <circle cx={P.bahrain.x} cy={P.bahrain.y} r="6" fill="white" />
        <text x={P.bahrain.x} y={P.bahrain.y - 18} textAnchor="end" className="fill-white text-[30px] font-bold">{labels.bahrain}</text>

        <circle cx={P.makkah.x} cy={P.makkah.y} r="16" fill="var(--brass-lit)" fillOpacity="0.2" />
        <circle cx={P.makkah.x} cy={P.makkah.y} r="7" fill="var(--brass-lit)" />
        <text x={P.makkah.x + 26} y={P.makkah.y + 9} className="fill-white text-[34px] font-bold">{labels.makkah}</text>

        {/* Legend */}
        <g transform="translate(400 312)">
          <line x1="0" y1="0" x2="34" y2="0" stroke="var(--brass-lit)" strokeWidth="2.5" strokeDasharray="8 6" />
          <text x="46" y="7" className="fill-white/80 text-[24px]">{labels.road}</text>
          <line x1="0" y1="34" x2="34" y2="34" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 7" className="text-white/60" />
          <text x="46" y="42" className="fill-white/80 text-[24px]">{labels.flight}</text>
        </g>
      </svg>
      <figcaption className="mt-2 text-xs text-white/45">{labels.caption}</figcaption>
    </figure>
  );
}
