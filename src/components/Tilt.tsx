"use client";
import { useRef, type ReactNode } from "react";

/** Subtle 3D tilt + light sheen following the pointer. Disabled on touch & reduced-motion via CSS/media check. */
export default function Tilt({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const reset = () => { const el = ref.current!; el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); };
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`tilt relative ${className}`}>
      {children}
      <div aria-hidden className="shine pointer-events-none absolute inset-0 rounded-[inherit]" />
    </div>
  );
}
