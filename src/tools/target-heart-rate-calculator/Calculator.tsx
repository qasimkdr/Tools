"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { FORMULAS, ZONES, target, type Formula } from "@/lib/heartRate";

const KEYS = Object.keys(FORMULAS) as Formula[];

export default function TargetHeartRateCalculator() {
  const [s, set] = useUrlState({ age: "40", f: "fox", rest: "", known: "", m: "pct" });
  const age = Number(s.age), rest = Number(s.rest), known = Number(s.known);
  const f = (KEYS.includes(s.f as Formula) ? s.f : "fox") as Formula;
  const useKnown = known >= 100 && known <= 230;
  const karv = s.m === "hrr";
  const err = !useKnown && !(age >= 10 && age <= 100) ? "Enter your age (10 to 100), or a measured maximum heart rate." : karv && !(rest >= 30 && rest <= 120) ? "Enter your resting heart rate (beats per minute, measured on waking) to use the Karvonen method." : null;
  const max = useKnown ? known : FORMULAS[f].f(age);
  const R = karv ? rest : undefined;
  const t = (p: number) => Math.round(target(max, p, R));

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Target heart rate calculator">
          <div className="grid grid-cols-2 gap-3">
            <Field id="age" label="Age" suffix="years" value={s.age} onChange={(v) => set("age", v)} min={0} inputMode="numeric" />
            <Field id="rest" label="Resting heart rate (optional)" suffix="bpm" value={s.rest} onChange={(v) => set("rest", v)} min={0} inputMode="numeric" hint="Count on waking, before getting up" />
          </div>
          <div>
            <label htmlFor="f" className="label">Maximum heart rate formula</label>
            <select id="f" className="field" value={f} onChange={(e) => set("f", e.target.value)} disabled={useKnown}>{KEYS.map((k) => <option key={k} value={k}>{FORMULAS[k].label}</option>)}</select>
          </div>
          <Field id="known" label="Measured max heart rate (optional)" suffix="bpm" value={s.known} onChange={(v) => set("known", v)} min={0} inputMode="numeric" hint="From a supervised test; overrides the formula" />
          <Segmented label="Target method" value={karv ? "hrr" : "pct"} onChange={(v) => set("m", v)} options={[{ id: "pct", label: "% of max (CDC)" }, { id: "hrr", label: "Heart-rate reserve (Karvonen)" }]} />
        </form>
        <ResultCard error={err} label="Moderate-intensity target (64–76%)" value={err ? "–" : <span data-testid="moderate">{t(0.64)}–{t(0.76)} bpm</span>}>
          {!err && <>
            <p className="mt-1 text-sm muted">{karv ? `Karvonen: resting ${rest} + % × (max ${Math.round(max)} − resting ${rest})` : `% of an estimated maximum of ${Math.round(max)} bpm`}</p>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Maximum heart rate" v={<span data-testid="max">{Math.round(max)} bpm</span>} />
              <Stat k="Vigorous target (77–93%)" v={<span data-testid="vigorous">{t(0.77)}–{t(0.93)} bpm</span>} />
              {karv && <Stat k="Heart-rate reserve" v={`${Math.round(max - rest)} bpm`} />}
              <Stat k="Moderate: beats in 30 seconds" v={`${Math.round(t(0.64) / 2)}–${Math.round(t(0.76) / 2)}`} />
              <Stat k="Vigorous: beats in 30 seconds" v={`${Math.round(t(0.77) / 2)}–${Math.round(t(0.93) / 2)}`} />
            </dl>
            <p className="mt-3 text-xs subtle">Age formulas are averages; many people&apos;s true maximum is 10 or more beats higher or lower. Some medicines (such as beta-blockers) lower heart rate; ask your doctor what range is right for you.</p>
          </>}
        </ResultCard>
      </div>
      {!err && <>
        <div>
          <h2 className="text-base font-semibold">Heart rate training zones</h2>
          <div className="mt-3 overflow-x-auto rounded-xl border border-[var(--border)]">
            <table className="w-full text-sm" data-testid="zones">
              <thead className="bg-[var(--surface-2)]"><tr className="text-left"><th className="px-3 py-1.5">Zone</th><th className="px-3">Intensity</th><th className="px-3">Heart rate</th><th className="px-3">How it feels</th></tr></thead>
              <tbody>{ZONES.map((z) => (
                <tr key={z.n} className="border-t border-[var(--border)]"><td className="px-3 py-1">{z.n}. {z.name}</td><td className="px-3">{Math.round(z.lo * 100)}–{Math.round(z.hi * 100)}%</td><td className="px-3 font-semibold" data-testid={`z${z.n}`}>{t(z.lo)}–{t(z.hi)} bpm</td><td className="px-3">{["Easy, can talk in full sentences", "Comfortable, can hold a conversation", "Breathing harder, can talk in short sentences", "Hard, only a few words at a time", "All-out, can't talk"][z.n - 1]}</td></tr>))}</tbody>
            </table>
          </div>
          <svg viewBox="0 0 300 46" className="mt-3 w-full" role="img" aria-label="Heart rate zones as a bar from zone 1 to zone 5" data-testid="zone-chart">
            {ZONES.map((z, i) => <g key={z.n}><rect x={i * 60} y={4} width={59} height={22} rx={3} fill="var(--color-brand-500)" fillOpacity={0.2 + i * 0.18} /><text x={i * 60 + 29.5} y={19} fontSize={9} textAnchor="middle" fill="currentColor">Zone {z.n}</text><text x={i * 60 + 29.5} y={40} fontSize={8} textAnchor="middle" fill="currentColor">{t(z.lo)}–{t(z.hi)}</text></g>)}
          </svg>
          <p className="mt-2 text-xs subtle">A common five-zone model based on {karv ? "heart-rate reserve" : "percent of maximum heart rate"}. The CDC&apos;s moderate (64–76%) and vigorous (77–93%) ranges use percent of maximum.</p>
        </div>
        {!useKnown && <div>
          <h2 className="text-base font-semibold">Maximum heart rate by formula (age {age})</h2>
          <div className="mt-3 overflow-x-auto rounded-xl border border-[var(--border)]">
            <table className="w-full text-sm" data-testid="formulas">
              <thead className="bg-[var(--surface-2)]"><tr className="text-left"><th className="px-3 py-1.5">Formula</th><th className="px-3">Max HR</th><th className="px-3">Moderate (64–76%)</th></tr></thead>
              <tbody>{KEYS.map((k) => { const mx = FORMULAS[k].f(age); return <tr key={k} className={`border-t border-[var(--border)] ${k === f ? "font-semibold" : ""}`}><td className="px-3 py-1">{FORMULAS[k].label}</td><td className="px-3">{Math.round(mx)} bpm</td><td className="px-3">{Math.round(target(mx, 0.64, R))}–{Math.round(target(mx, 0.76, R))} bpm</td></tr>; })}</tbody>
            </table>
          </div>
        </div>}
      </>}
    </div>
  );
}
