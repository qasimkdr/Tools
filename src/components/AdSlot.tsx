"use client";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site";

/**
 * Manual ad unit with RESERVED height (prevents CLS). Renders nothing until NEXT_PUBLIC_ADSENSE_CLIENT is set.
 * Placement rules: docs/02-ADSENSE-RULES.md (never inside/adjacent to calculator buttons, max 3 per page, label "Advertisement").
 */
export default function AdSlot({ slot, format = "auto", minH = 280, className = "" }: { slot?: string; format?: string; minH?: number; className?: string }) {
  const ref = useRef<HTMLModElement>(null);
  useEffect(() => {
    if (!SITE.adsenseClient || !slot || !ref.current || ref.current.dataset.loaded) return;
    try {
      ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle ||= []).push({});
      ref.current.dataset.loaded = "1";
    } catch {}
  }, [slot]);
  if (!SITE.adsenseClient || !slot) return null;
  return (
    <aside aria-label="Advertisement" className={`my-10 ${className}`} style={{ minHeight: minH }}>
      <p className="mb-1 text-center text-[11px] uppercase tracking-wider subtle">Advertisement</p>
      <ins ref={ref} className="adsbygoogle block" style={{ display: "block", minHeight: minH - 20 }}
        data-ad-client={SITE.adsenseClient} data-ad-slot={slot} data-ad-format={format} data-full-width-responsive="true" />
    </aside>
  );
}
