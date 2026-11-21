"use client";
import { useEffect, useState } from "react";
import { parseISO, startOfDay, toISO } from "./date";

/**
 * Static HTML is rendered with the BUILD date (rebuilt daily by CI, see docs/03-TOOL-BUILD-WORKFLOW.md),
 * then hydrates to the visitor's real local date. Keeps crawlers and users in sync without a server.
 */
export function useToday(buildISO: string) {
  const [today, setToday] = useState(() => parseISO(buildISO));
  useEffect(() => {
    const now = startOfDay(new Date());
    if (toISO(now) !== buildISO) setToday(now);
  }, [buildISO]);
  return today;
}
