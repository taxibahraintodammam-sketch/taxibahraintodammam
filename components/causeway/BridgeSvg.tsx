/**
 * The causeway, drawn simply: two shores, the bridge between them, and the
 * border island roughly midway holding both posts (as described in the hub
 * copy). Geography always runs Bahrain (left) → Saudi Arabia (right).
 *
 * Positions are in SVG user units on a 1000-wide canvas. `markerX` places
 * the car marker; `animate` makes it cross once instead (CSS, see
 * .bridge-marker in globals.css).
 */
export const BRIDGE_X = { shoreA: 60, postA: 470, postB: 530, shoreB: 940, midA: 300, midB: 700 };

export function BridgeSvg({
  labels,
  markerX,
  animate = false,
  glow = false,
  className = "",
}: {
  labels: { shoreA: string; shoreB: string; island: string; postA: string; postB: string };
  markerX?: number;
  animate?: boolean;
  glow?: boolean;
  className?: string;
}) {
  const pillars = Array.from({ length: 19 }, (_, i) => 150 + i * 40).filter((x) => x < 430 || x > 570);
  return (
    <svg viewBox="0 0 1000 210" className={`w-full ${className}`} style={{ direction: "ltr" }} aria-hidden="true">
      {/* Water */}
      <rect x="0" y="118" width="1000" height="92" fill="var(--color-sea)" opacity="0.14" />
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={i} d={`M ${140 + i * 130} ${150 + (i % 2) * 22} q 18 -6 36 0 t 36 0`} stroke="var(--color-sea)" strokeOpacity="0.35" fill="none" strokeWidth="1.5" />
      ))}
      {/* Shores */}
      <path d="M0 96 H 125 L 150 118 V 210 H 0 Z" fill="currentColor" opacity="0.14" />
      <path d="M1000 96 H 875 L 850 118 V 210 H 1000 Z" fill="currentColor" opacity="0.14" />
      {/* Pillars and deck */}
      {pillars.map((x) => <rect key={x} x={x - 2} y="104" width="4" height="30" fill="currentColor" opacity="0.3" />)}
      <rect x="120" y="96" width="760" height="8" rx="2" fill="currentColor" opacity={glow ? 0.9 : 0.55} className="transition-opacity duration-500" />
      {/* Border island with the two posts */}
      <path d="M 425 104 Q 500 88 575 104 L 590 128 H 410 Z" fill="currentColor" opacity="0.22" />
      <rect x={BRIDGE_X.postA - 10} y="70" width="20" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x={BRIDGE_X.postB - 10} y="70" width="20" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5" />
      {/* Labels */}
      <text x="20" y="80" className="fill-current text-[17px] font-bold">{labels.shoreA}</text>
      <text x="980" y="80" textAnchor="end" className="fill-current text-[17px] font-bold">{labels.shoreB}</text>
      <text x={BRIDGE_X.postA - 16} y="58" textAnchor="end" className="fill-current text-[13px] opacity-75">{labels.postA}</text>
      <text x={BRIDGE_X.postB + 16} y="58" textAnchor="start" className="fill-current text-[13px] opacity-75">{labels.postB}</text>
      <text x="500" y="152" textAnchor="middle" className="fill-current text-[12px] uppercase tracking-widest opacity-50">{labels.island}</text>
      {/* The car */}
      {animate ? (
        <g className="bridge-marker">
          <circle cx={BRIDGE_X.shoreA} cy="100" r="11" fill="var(--color-brass-lit)" />
          <circle cx={BRIDGE_X.shoreA} cy="100" r="18" fill="var(--color-brass-lit)" opacity="0.25" />
        </g>
      ) : markerX !== undefined ? (
        <g style={{ transform: `translateX(${markerX}px)`, transition: "transform 0.7s cubic-bezier(0.45, 0, 0.25, 1)" }}>
          <circle cx="0" cy="100" r="11" fill="var(--color-brass-lit)" />
          <circle cx="0" cy="100" r="18" fill="var(--color-brass-lit)" opacity="0.25" />
        </g>
      ) : null}
    </svg>
  );
}
