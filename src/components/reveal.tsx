"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type RevealDirection = "up" | "left" | "right";

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: RevealDirection;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={direction}
      className={cn(className)}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
