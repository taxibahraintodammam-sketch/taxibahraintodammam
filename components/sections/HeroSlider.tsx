"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/content/hero-slides";

const AUTOPLAY_MS = 5000;

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotion.current || slides.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out",
            i === index ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={i === index ? undefined : true}
        >
          {slide.image ? (
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              quality={85}
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-ink via-ink-soft to-ink">
              <Car className="absolute right-10 top-10 h-16 w-16 text-brass/20 lg:right-24 lg:top-16" aria-hidden="true" />
            </div>
          )}
        </div>
      ))}

      {/* Overlay for text legibility over the photos */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/60" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" aria-hidden="true" />

      {/* Rotating caption + dot navigation */}
      <div className="absolute bottom-6 left-5 right-5 flex items-center gap-3 lg:left-10 lg:right-10">
        <p className="eyebrow text-brass-lit">{slides[index].title}</p>
        <div className="ml-auto flex items-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-current={i === index}
              aria-label={`Show slide ${i + 1}: ${slide.title}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-brass-lit" : "w-1.5 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
