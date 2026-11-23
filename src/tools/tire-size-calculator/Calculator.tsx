"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { compareTires, parseTire, type Tire } from "@/lib/tire";

const f1 = (x: number) => x.toFixed(1), f2 = (x: number) => x.toFixed(2);
function tryParse(s: string): { t: Tire | null; e: string | null } {
  if (!s.trim()) return { t: null, e: null };
  try { return { t: parseTire(s), e: null }; } catch (e) { return { t: null, e: (e as Error).message }; }
}

export default function TireSizeCalculator() {
  const [s, set] = useUrlState({ a: "225/65R17", b: "235/65R17", mph: "60" });
  const A = tryParse(s.a), B = tryParse(s.b);
  const mph = Number(s.mph) > 0 ? Number(s.mph) : 60;
  const err = !s.a.trim() ? "Enter your current tire size, e.g. 225/65R17." : A.e ?? (B.e ? `New size: ${B.e}` : null);
  const a = A.t, b = B.t, c = a && b ? compareTires(a, b, mph) : null;
  const within = c ? Math.abs(c.diaPct) <= 3 : false;
  const rows: [string, (t: Tire) => string, ((t: Tire) => number) | null][] = [
    ["Overall diameter", (t) => `${f2(t.diaIn)} in (${t.diaMm.toFixed(0)} mm)`, (t) => t.diaIn],
    ["Section width", (t) => `${f2(t.widthIn)} in (${t.widthMm.toFixed(0)} mm)`, (t) => t.widthIn],
    ["Sidewall height", (t) => `${f2(t.sidewallIn)} in (${t.sidewallMm.toFixed(1)} mm)`, (t) => t.sidewallIn],
    ["Wheel diameter", (t) => `${t.rimIn} in`, null],
    ["Circumference", (t) => `${f2(t.circIn)} in`, (t) => t.circIn],
    ["Revolutions per mile", (t) => t.revsPerMile.toFixed(0), (t) => t.revsPerMile],
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Tire size calculator">
        <div>
          <label htmlFor="a" className="label">Current tire size</label>
          <input id="a" className="field font-mono uppercase" value={s.a} onChange={(e) => set("a", e.target.value)} placeholder="225/65R17" autoComplete="off" spellCheck={false} maxLength={30} />
        </div>
        <div>
          <label htmlFor="b" className="label">New tire size (optional, to compare)</label>
          <input id="b" className="field font-mono uppercase" value={s.b} onChange={(e) => set("b", e.target.value)} placeholder="235/65R17" autoComplete="off" spellCheck={false} maxLength={30} />
          <p className="mt-1 text-xs subtle">Find the size on the tire sidewall or the sticker in the driver&apos;s door jamb. Metric (P225/65R17, LT265/70R17) and flotation sizes (33x12.50R15) both work.</p>
        </div>
        <Field id="mph" label="Speedometer reading to check" suffix="mph" value={s.mph} onChange={(v) => set("mph", v)} min={1} inputMode="numeric" />
      </form>
      <ResultCard error={err} label={c ? "Diameter difference" : "Overall diameter"} value={err ? "–" : c ? <span data-testid="dia-pct">{c.diaPct >= 0 ? "+" : "−"}{f2(Math.abs(c.diaPct))}%</span> : <span data-testid="dia">{f2(a!.diaIn)} in</span>}>
        {!err && a && <>
          {c && b && <>
            <p className={`mt-1 text-sm font-semibold ${within ? "text-[var(--color-brand-600)]" : "text-amber-700"}`} data-testid="verdict">{within ? "Within the common 3% guideline" : "More than 3% different: check fitment and speedometer"}</p>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Stat k={`When the speedometer shows ${mph} mph`} v={<span data-testid="actual">you are doing {f1(c.actualAt)} mph</span>} />
              <Stat k="Ride height change" v={`${c.rideHeightIn >= 0 ? "+" : "−"}${f2(Math.abs(c.rideHeightIn))} in`} />
            </dl>
          </>}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm" data-testid="specs">
              <thead><tr className="text-left subtle"><th className="py-1"></th><th>{a.label}</th>{b && <th>{b.label}</th>}{b && <th className="text-right">Change</th>}</tr></thead>
              <tbody>
                {rows.map(([k, show, num]) => (
                  <tr key={k} className="border-t border-[var(--border)]">
                    <td className="py-1 pr-2">{k}</td><td data-testid={k === "Overall diameter" ? "dia-a" : undefined}>{show(a)}</td>
                    {b && <td>{show(b)}</td>}
                    {b && <td className="text-right">{num ? `${num(b) - num(a) >= 0 ? "+" : "−"}${(Math.abs(num(b) - num(a))).toFixed(k === "Revolutions per mile" ? 0 : 2)}` : b.rimIn === a.rimIn ? "same" : `${b.rimIn - a.rimIn > 0 ? "+" : "−"}${Math.abs(b.rimIn - a.rimIn)} in`}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs subtle">Calculated from the nominal size. Real dimensions vary by brand, tread depth and rim width, and loaded tires roll slightly smaller. Always match or exceed the original load index and speed rating.</p>
        </>}
      </ResultCard>
    </div>
  );
}
