"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Form state mirrored to the query string (shareable results on a static site).
 * Reads the URL once after hydration, then writes changes back with replaceState. Values are strings.
 */
export function useUrlState<T extends Record<string, string>>(defaults: T) {
  const [state, setState] = useState<T>(defaults);
  const ready = useRef(false);
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const next = { ...defaults };
    for (const k of Object.keys(defaults)) { const v = q.get(k); if (v !== null) (next as Record<string, string>)[k] = v; }
    setState(next);
    ready.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!ready.current) return;
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(state)) if (v !== defaults[k]) q.set(k, v);
    const s = q.toString();
    history.replaceState(null, "", s ? `${location.pathname}?${s}` : location.pathname);
  }, [state, defaults]);
  const set = (k: keyof T, v: string) => setState((s) => ({ ...s, [k]: v }));
  return [state, set, setState] as const;
}
