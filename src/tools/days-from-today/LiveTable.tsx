"use client";
import Link from "next/link";
import { fmtShort, shift, weekday } from "@/lib/date";
import { useToday } from "@/lib/useToday";
import { type VariantUnit, variantPath, VARIANTS } from "./variants";

/** Table of "N <unit> from today" with live dates; every row links to its dedicated page (internal linking). */
export default function LiveTable({ buildISO, unit, values, caption }: { buildISO: string; unit: VariantUnit; values: number[]; caption: string }) {
  const today = useToday(buildISO);
  const has = new Set(VARIANTS[unit]);
  return (
    <div className="overflow-x-auto">
      <table>
        <caption className="mb-2 text-left text-sm subtle">{caption}</caption>
        <thead><tr><th scope="col">From today</th><th scope="col">Date</th><th scope="col">Weekday</th><th scope="col">Ago (past date)</th></tr></thead>
        <tbody>
          {values.map((n) => {
            const f = shift(today, n, unit), a = shift(today, -n, unit);
            return (
              <tr key={n}>
                <td>{has.has(n) ? <Link href={variantPath(unit, n)}>{n} {unit}</Link> : `${n} ${unit}`}</td>
                <td className="font-medium text-[var(--text)]">{fmtShort(f)}</td>
                <td>{weekday(f)}</td>
                <td>{fmtShort(a)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
