"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/** Scroll-driven fade/slide IN when entering the viewport and fade OUT when leaving. CSS in globals.css (.reveal). */
export default function Reveal({ children, as: Tag = "div", delay, className = "", once = false }: {
  children: ReactNode; as?: ElementType; delay?: 1 | 2 | 3; className?: string; once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { el.classList.add("is-in"); if (once) io.disconnect(); }
        else if (!once) el.classList.remove("is-in");
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return <Tag ref={ref} className={`reveal ${className}`} data-delay={delay}>{children}</Tag>;
}
