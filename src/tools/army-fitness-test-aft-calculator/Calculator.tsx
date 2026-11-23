"use client";
import { Field, ResultCard, Segmented } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { AGE_GROUPS, ageIndex, column, EVENTS, mmss, needed, parseMmss, scoreEvent, STANDARDS, type AftEvent } from "@/lib/aft";

function TimeField({ id, label, value, onChange, hint }: { id: string; label: string; value: string; onChange: (v: string) => void; hint: string }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <div className="relative">
        <input id={id} type="text" inputMode="numeric" pattern="[0-9]{1,2}:[0-5][0-9]" placeholder={hint} value={value} onChange={(e) => onChange(e.target.value)} className="field tabular-nums pr-14" autoComplete="off" />
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm subtle">m:ss</span>
      </div>
    </div>
  );
}

const KEYS: Record<AftEvent, "mdl" | "hrp" | "sdc" | "plk" | "run"> = { MDL: "mdl", HRP: "hrp", SDC: "sdc", PLK: "plk", "2MR": "run" };

export default function AftCalculator() {
  const [s, set] = useUrlState({ age: "25", sex: "male", std: "general", mdl: "250", hrp: "40", sdc: "1:55", plk: "2:30", run: "16:00" });
  const age = Math.floor(Number(s.age));
  const ai = ageIndex(age), female = s.sex === "female", combat = s.std === "combat";
  const col = ai >= 0 ? column(ai, female, combat) : 0;
  const std = combat ? STANDARDS.combat : STANDARDS.general;
  const raw = (ev: AftEvent) => { const v = s[KEYS[ev]]; return EVENTS.find((e) => e.id === ev)!.unit === "time" ? parseMmss(v) : Number(v); };
  const bad = EVENTS.filter((e) => !(raw(e.id) >= 0));
  const err = !(age >= 17 && age <= 80) ? "Enter an age of 17 or older." : bad.length ? `Check ${bad.map((e) => e.name.toLowerCase()).join(", ")}${bad.some((e) => e.unit === "time") ? " (times as m:ss)" : ""}.` : null;
  const scores = EVENTS.map((e) => ({ ...e, pts: err ? 0 : scoreEvent(e.id, col, raw(e.id)) }));
  const total = scores.reduce((a, e) => a + e.pts, 0);
  const pass = scores.every((e) => e.pts >= std.event) && total >= std.total;
  const show = (ev: (typeof EVENTS)[number], v: number | null) => (v === null ? "–" : ev.unit === "time" ? mmss(v) : `${v}${ev.unit === "lb" ? " lb" : ""}`);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Army Fitness Test calculator">
        <div className="grid grid-cols-[6rem_1fr] items-end gap-3">
          <Field id="age" label="Age" value={s.age} onChange={(v) => set("age", v)} min={17} inputMode="numeric" />
          <Segmented label="Sex" value={female ? "female" : "male"} onChange={(v) => set("sex", v)} options={[{ id: "male", label: "Male" }, { id: "female", label: "Female" }]} />
        </div>
        <Segmented label="Standard" value={combat ? "combat" : "general"} onChange={(v) => set("std", v)} options={[{ id: "general", label: "General (300 pts)" }, { id: "combat", label: "Combat MOS (350 pts)" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="mdl" label="Deadlift, 3 reps" suffix="lb" value={s.mdl} onChange={(v) => set("mdl", v)} min={0} inputMode="numeric" />
          <Field id="hrp" label="Hand-release push-ups" suffix="reps" value={s.hrp} onChange={(v) => set("hrp", v)} min={0} inputMode="numeric" />
          <TimeField id="sdc" label="Sprint-drag-carry" value={s.sdc} onChange={(v) => set("sdc", v)} hint="1:55" />
          <TimeField id="plk" label="Plank" value={s.plk} onChange={(v) => set("plk", v)} hint="2:30" />
          <TimeField id="run" label="2-mile run" value={s.run} onChange={(v) => set("run", v)} hint="16:00" />
        </div>
      </form>
      <ResultCard error={err} label="AFT total score" value={err ? "–" : <span data-testid="total">{total}</span>}>
        {!err && <>
          <p className={`mt-1 text-lg font-bold ${pass ? "text-[var(--color-brand-600)]" : "text-red-700"}`} data-testid="verdict">{pass ? "Pass" : "Does not meet the standard"}</p>
          <p className="text-sm muted">{combat ? "Combat standard (sex-neutral)" : `General standard, ${female ? "female" : "male"}`} · age group {AGE_GROUPS[ai]} · needs {std.event}+ in every event and {std.total}+ total</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm" data-testid="events">
              <thead><tr className="text-left subtle"><th className="py-1">Event</th><th>Points</th><th>For 60</th><th>For 100</th></tr></thead>
              <tbody>
                {scores.map((e) => (
                  <tr key={e.id} className="border-t border-[var(--border)]">
                    <td className="py-1 pr-2">{e.name}</td>
                    <td className={`font-semibold ${e.pts < std.event ? "text-red-700" : ""}`} data-testid={`pts-${e.id}`}>{e.pts}</td>
                    <td>{show(e, needed(e.id, col, 60))}</td>
                    <td>{show(e, needed(e.id, col, 100))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--surface-2)]" aria-hidden><div className={`h-2.5 ${pass ? "bg-[var(--color-brand-600)]" : "bg-red-600"}`} style={{ width: `${total / 5}%` }} /></div>
          <p className="mt-1 text-xs subtle">{total} of 500 possible points.</p>
          <p className="mt-3 text-xs subtle">Scored with the official AFT score tables effective 1 June 2025. Between listed values, you earn the highest score you fully meet. Your unit&apos;s official scorecard is final.</p>
        </>}
      </ResultCard>
    </div>
  );
}
