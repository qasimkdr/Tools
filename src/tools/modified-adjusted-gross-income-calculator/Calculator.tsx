"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";

// Roth MAGI: IRS Pub. 590-A Worksheet 2-1. ACA: HealthCare.gov glossary. Medicare IRMAA: SSA (AGI + tax-exempt interest).
// 2026 Roth phase-outs (IRS IR-2025-111): single/HOH $153k–$168k, MFJ $242k–$252k, MFS (lived with spouse) $0–$10k.
// 2026 IRA limit $7,500; catch-up (50+) $1,100.
const PHASE = { single: [153000, 168000], joint: [242000, 252000], mfs: [0, 10000] } as const;
type Purpose = "roth" | "aca" | "irmaa";
type Status = keyof typeof PHASE;
const FIELDS: Record<Purpose, { k: string; label: string; sign: 1 | -1; hint?: string }[]> = {
  roth: [
    { k: "ira", label: "Traditional IRA deduction", sign: 1, hint: "Schedule 1" },
    { k: "sli", label: "Student loan interest deduction", sign: 1, hint: "Schedule 1" },
    { k: "feie", label: "Foreign earned income & housing exclusion", sign: 1, hint: "Form 2555" },
    { k: "bond", label: "Excluded savings bond interest", sign: 1, hint: "Form 8815" },
    { k: "adopt", label: "Excluded employer adoption benefits", sign: 1, hint: "Form 8839" },
    { k: "conv", label: "Roth conversion income included in AGI", sign: -1, hint: "Subtracted" },
  ],
  aca: [
    { k: "foreign", label: "Untaxed foreign income", sign: 1 },
    { k: "ss", label: "Non-taxable Social Security benefits", sign: 1, hint: "Total benefits minus the taxable part (not SSI)" },
    { k: "exempt", label: "Tax-exempt interest", sign: 1, hint: "Form 1040 line 2a" },
  ],
  irmaa: [{ k: "exempt", label: "Tax-exempt interest", sign: 1, hint: "Form 1040 line 2a" }],
};

export function rothAllowed(magi: number, status: Status, limit: number) {
  const [lo, hi] = PHASE[status];
  if (magi < lo) return limit;
  if (magi >= hi) return 0;
  let r = Math.ceil((limit * (hi - magi)) / (hi - lo) / 10) * 10;
  if (r > 0 && r < 200) r = 200;
  return Math.min(r, limit);
}

export default function MagiCalculator() {
  const [s, set] = useUrlState({ p: "roth", agi: "158000", st: "single", age: "under", ira: "0", sli: "2500", feie: "0", bond: "0", adopt: "0", conv: "0", foreign: "0", ss: "0", exempt: "0" });
  const p = (["roth", "aca", "irmaa"].includes(s.p) ? s.p : "roth") as Purpose;
  const st = (s.st in PHASE ? s.st : "single") as Status;
  const agi = Number(s.agi);
  const adds = FIELDS[p].reduce((a, f) => a + f.sign * Math.max(0, Number(s[f.k as "ira"]) || 0), 0);
  const magi = agi + adds;
  const limit = s.age === "50" ? 8600 : 7500;
  const allowed = rothAllowed(magi, st, limit);
  const error = s.agi === "" || !Number.isFinite(agi) ? "Enter your adjusted gross income (Form 1040, line 11)." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="MAGI calculator">
        <Segmented label="MAGI for" value={p} onChange={(v) => set("p", v)} options={[{ id: "roth", label: "Roth IRA" }, { id: "aca", label: "ACA Marketplace" }, { id: "irmaa", label: "Medicare (IRMAA)" }]} />
        <Field id="agi" label="Adjusted gross income (AGI)" prefix="$" value={s.agi} onChange={(v) => set("agi", v)} hint="Form 1040, line 11" />
        <div className="grid gap-3 sm:grid-cols-2">
          {FIELDS[p].map((f) => <Field key={f.k} id={f.k} label={`${f.sign < 0 ? "− " : "+ "}${f.label}`} prefix="$" value={s[f.k as "ira"]} onChange={(v) => set(f.k as "ira", v)} min={0} hint={f.hint} />)}
        </div>
        {p === "roth" && <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="st" className="label">Filing status</label>
            <select id="st" className="field" value={st} onChange={(e) => set("st", e.target.value)}>
              <option value="single">Single or head of household</option>
              <option value="joint">Married filing jointly</option>
              <option value="mfs">Married filing separately (lived together)</option>
            </select>
          </div>
          <Segmented label="Age at year end" value={s.age === "50" ? "50" : "under"} onChange={(v) => set("age", v)} options={[{ id: "under", label: "Under 50" }, { id: "50", label: "50 or older" }]} />
        </div>}
      </form>
      <ResultCard error={error} label={`MAGI for ${p === "roth" ? "Roth IRA purposes" : p === "aca" ? "ACA Marketplace coverage" : "Medicare IRMAA"}`} value={usd(magi)}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="AGI" v={usd(agi)} />
          <Stat k="Net adjustments" v={`${adds >= 0 ? "+" : "−"}${usd(Math.abs(adds))}`} />
          {p === "roth" && <Stat k="2026 Roth IRA contribution allowed" v={usd(allowed)} />}
          {p === "roth" && <Stat k="2026 phase-out range" v={`${usd(PHASE[st][0])} – ${usd(PHASE[st][1])}`} />}
        </dl>
        {p === "roth" && <p className="mt-4 text-sm muted" data-testid="roth">{allowed === limit ? `Below the phase-out: you can contribute the full ${usd(limit)}` : allowed === 0 ? "At or above the top of the range: no direct Roth IRA contribution for 2026" : `Inside the phase-out: your limit is reduced from ${usd(limit)} to ${usd(allowed)}`}, but never more than your taxable compensation.</p>}
        {p === "aca" && <p className="mt-4 text-sm muted">Marketplace savings use your expected household MAGI for the coverage year, including the income of everyone on your tax return.</p>}
        {p === "irmaa" && <p className="mt-4 text-sm muted">Social Security normally uses the tax return from two years earlier (2024 income for 2026 premiums) to decide whether you pay a Medicare income-related adjustment.</p>}
        <p className="mt-3 text-xs subtle">Estimate for planning, not tax advice. Other tax benefits define MAGI differently; check the worksheet for the benefit you&apos;re claiming.</p>
      </ResultCard>
    </div>
  );
}
