"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

/**
 * Fades its content up as it scrolls into view. Server HTML is fully
 * visible; only after hydration, and only for elements still below the
 * fold, does it "arm" the hidden state (see .reveal in globals.css). So
 * no-JS visitors and crawlers always see the content, and reduced-motion
 * users get it instantly.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible: leave it alone
    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties | undefined = armed && delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag ref={ref} className={`reveal ${className}`} data-armed={armed || undefined} data-shown={shown || undefined} style={style}>
      {children}
    </Tag>
  );
}
