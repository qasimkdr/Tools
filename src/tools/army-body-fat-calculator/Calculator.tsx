"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const LIMIT = 0.55; // Army Directive 2026-13: WHtR must be < 0.550
// Legacy (rescinded 7 Jul 2026) one-site tape test, ALARACT 046/2023 — coefficients and Table B-2 retention limits.
const LEGACY_MAX = [{ upTo: 20, m: 20, f: 30 }, { upTo: 27, m: 22, f: 32 }, { upTo: 39, m: 24, f: 34 }, { upTo: 200, m: 26, f: 36 }];
const trunc3 = (x: number) => Math.floor(x * 1000 + 1e-9) / 1000;

export default function ArmyBodyFatCalculator() {
  const [s, set] = useUrlState({ unit: "in", h: "70", w: "36", sex: "m", age: "25", lb: "180", ab: "36" });
  const cm = s.unit === "cm";
  const h = Number(s.h), w = Number(s.w);
  const ratio = h > 0 && w > 0 ? trunc3(w / h) : NaN;
  const pass = ratio < LIMIT;
  const maxWaist = h * LIMIT; // must be strictly below
  const err = !(h > 0 && w > 0) ? "Enter your height and waist measurement." : w >= h ? "Waist can't be larger than height. Check the units." : null;
  const u = cm ? "cm" : "in";

  // Legacy estimate
  const lb = Number(s.lb), ab = Number(s.ab), age = Number(s.age);
  const legacyBf = s.sex === "f" ? -9.15 - 0.015 * lb + 1.27 * ab : -26.97 - 0.12 * lb + 1.99 * ab;
  const legacyMax = (LEGACY_MAX.find((r) => age <= r.upTo) ?? LEGACY_MAX[3])[s.sex === "f" ? "f" : "m"];
  const legacyOk = lb > 0 && ab > 0 && age >= 17;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Army waist-to-height calculator">
          <Segmented label="Units" value={cm ? "cm" : "in"} onChange={(v) => set("unit", v)} options={[{ id: "in", label: "Inches" }, { id: "cm", label: "Centimeters" }]} />
          <div className="grid grid-cols-2 gap-3">
            <Field id="h" label="Height" suffix={u} value={s.h} onChange={(v) => set("h", v)} min={0} />
            <Field id="w" label="Waist (at the navel)" suffix={u} value={s.w} onChange={(v) => set("w", v)} min={0} />
          </div>
          <p className="text-sm muted">Use the same unit for both. The ratio has no units, so inches and centimeters give the same result.</p>
        </form>
        <ResultCard error={err} label="Waist-to-height ratio (WHtR)" value={Number.isFinite(ratio) ? ratio.toFixed(3) : ""}>
          {Number.isFinite(ratio) && (
            <>
              <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${pass ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]" : "bg-amber-100 text-amber-800"}`}>
                {pass ? "Meets the standard (below 0.550)" : "Does not meet the standard (0.550 or higher)"}
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <Stat k="Waist must be under" v={`${maxWaist.toFixed(2)} ${u}`} />
                <Stat k={pass ? "Room to spare" : "Over the limit by"} v={`${Math.abs(maxWaist - w).toFixed(2)} ${u}`} />
              </dl>
              <div className="mt-5" aria-label="Ratio scale">
                <div className="relative h-3 rounded-full bg-gradient-to-r from-[var(--color-brand-100)] via-[var(--color-brand-100)] to-amber-200">
                  <div className="absolute top-[-4px] h-5 w-0.5 bg-amber-600" style={{ left: `${((LIMIT - 0.35) / 0.35) * 100}%` }} title="0.55 limit" />
                  <div className="absolute top-[-3px] size-4 -translate-x-1/2 rounded-full border-2 border-white bg-[var(--color-brand-600)] shadow" style={{ left: `${Math.min(100, Math.max(0, ((ratio - 0.35) / 0.35) * 100))}%` }} />
                </div>
                <p className="mt-1 flex justify-between text-xs subtle"><span>0.35</span><span>limit 0.55</span><span>0.70</span></p>
              </div>
            </>
          )}
        </ResultCard>
      </div>

      <details className="card p-5">
        <summary className="cursor-pointer font-semibold">Legacy: 2023 one-site tape test estimate (rescinded July 7, 2026)</summary>
        <p className="mt-3 text-sm muted">For reference only, such as comparing with older records. The Army no longer uses this method. Formula and limits from ALARACT 046/2023.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-4">
          <Segmented label="Sex" value={s.sex === "f" ? "f" : "m"} onChange={(v) => set("sex", v)} options={[{ id: "m", label: "Male" }, { id: "f", label: "Female" }]} />
          <Field id="age" label="Age" value={s.age} onChange={(v) => set("age", v)} min={17} inputMode="numeric" />
          <Field id="lb" label="Weight" suffix="lb" value={s.lb} onChange={(v) => set("lb", v)} min={0} />
          <Field id="ab" label="Abdomen" suffix="in" value={s.ab} onChange={(v) => set("ab", v)} min={0} />
        </div>
        {legacyOk && (
          <p className="mt-4 text-sm" data-testid="legacy">
            Estimated body fat: <strong>{legacyBf.toFixed(1)}%</strong>. The former retention maximum for your age group was {legacyMax}%
            ({legacyBf <= legacyMax ? "within" : "above"} that limit).
          </p>
        )}
      </details>
    </div>
  );
}
