"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import UnitField from "@/components/calc/UnitField";
import { useUrlState } from "@/lib/useUrlState";
import { toFt } from "@/lib/units";
import { ftIn } from "@/lib/feetInches";

// Common US residential limits (IRC R311.7): riser ≤ 7¾ in, tread ≥ 10 in, headroom ≥ 6 ft 8 in, width ≥ 36 in.
const MAX_RISER = 7.75, MIN_TREAD = 10;
const inch = (v: number) => `${+v.toFixed(3)} in (${(v * 2.54).toFixed(1)} cm)`;

export default function StairCalculator() {
  const [s, set] = useUrlState({ rise: "105", ru: "in", mode: "max", max: "7.75", n: "14", tread: "10", tu: "in" });
  const rise = toFt(s.rise, s.ru) * 12, tread = toFt(s.tread, s.tu) * 12;
  const mode = s.mode === "count" ? "count" : "max";
  const n = mode === "count" ? Math.max(1, Math.floor(Number(s.n) || 1)) : Math.ceil(rise / (Number(s.max) || MAX_RISER) - 1e-9);
  const riser = rise / n, treads = n - 1, run = treads * tread;
  const stringer = Math.hypot(rise, run), angle = (Math.atan(riser / tread) * 180) / Math.PI, comfort = 2 * riser + tread;
  const error = !(rise > 0) ? "Enter the total rise (finished floor to finished floor)." : !(tread > 0) ? "Enter a tread depth." : !(n > 0 && Number.isFinite(n)) ? "Enter a maximum riser height above 0." : null;
  const checks = [
    { ok: riser <= MAX_RISER + 1e-9, t: `Riser ${+riser.toFixed(2)} in ${riser <= MAX_RISER + 1e-9 ? "≤" : ">"} 7¾ in maximum` },
    { ok: tread >= MIN_TREAD - 1e-9, t: `Tread ${+tread.toFixed(2)} in ${tread >= MIN_TREAD - 1e-9 ? "≥" : "<"} 10 in minimum` },
    { ok: comfort >= 24 && comfort <= 25.5, t: `Comfort: 2 × riser + tread = ${comfort.toFixed(2)} in (aim for about 24–25)` },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Stair calculator">
        <UnitField id="rise" label="Total rise (finished floor to finished floor)" value={s.rise} unit={s.ru} onValue={(v) => set("rise", v)} onUnit={(u) => set("ru", u)} />
        <Segmented label="Number of steps" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "max", label: "From max riser height" }, { id: "count", label: "I'll choose" }]} />
        {mode === "max"
          ? <Field id="max" label="Maximum riser height" suffix="in" value={s.max} onChange={(v) => set("max", v)} min={0} hint="7.75 in is the common US residential limit (IRC)" />
          : <Field id="n" label="Number of risers" value={s.n} onChange={(v) => set("n", v)} min={1} inputMode="numeric" />}
        <UnitField id="tread" label="Tread depth (run per step, without nosing)" value={s.tread} unit={s.tu} onValue={(v) => set("tread", v)} onUnit={(u) => set("tu", u)} />
      </form>
      <ResultCard error={error} label="Steps" value={`${n} risers · ${treads} treads`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Riser height" v={inch(riser)} />
          <Stat k="Total run" v={`${ftIn(run / 12)} (${(run * 2.54 / 100).toFixed(2)} m)`} />
          <Stat k="Stringer length" v={`${ftIn(stringer / 12)}`} />
          <Stat k="Stair angle" v={`${angle.toFixed(1)}°`} />
        </dl>
        <ul className="mt-4 space-y-1 text-sm" data-testid="checks">
          {checks.map((c) => <li key={c.t} className={c.ok ? "text-[var(--color-brand-600)]" : "text-amber-700"}>{c.ok ? "✓" : "⚠"} {c.t}</li>)}
        </ul>
        <p className="mt-3 text-xs subtle">The top step is the upper floor, so there&apos;s one fewer tread than risers. Stringer length is the straight-line distance; buy a board at least a foot longer, typically a 2×12. Local codes vary; check yours.</p>
      </ResultCard>
    </div>
  );
}
