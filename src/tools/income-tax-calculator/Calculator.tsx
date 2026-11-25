"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { ADDITIONAL_2026, STANDARD_DEDUCTION_2026, STATUS_LABEL, taxFor, type Status } from "@/lib/incomeTax";

const usd = (x: number, d = 0) => (Number.isFinite(x) ? x.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: d, maximumFractionDigits: d }) : "–");
const pct = (x: number) => `${(x * 100).toFixed(2).replace(/\.?0+$/, "")}%`;

export default function IncomeTaxCalculator() {
  const [s, set] = useUrlState({ st: "single", gross: "85000", pre: "5000", ded: "std", item: "", extra: "0", other: "", credits: "", withheld: "" });
  const st = (["single", "mfj", "hoh", "mfs"].includes(s.st) ? s.st : "single") as Status;
  const gross = Number(s.gross), pre = Number(s.pre) || 0, extraN = Math.max(0, Math.min(st === "mfj" ? 4 : 2, Math.floor(Number(s.extra) || 0)));
  const married = st === "mfj" || st === "mfs";
  const std = STANDARD_DEDUCTION_2026[st] + extraN * (married ? ADDITIONAL_2026.married : ADDITIONAL_2026.unmarried);
  const itemized = s.ded === "item";
  const deduction = itemized ? Number(s.item) || 0 : std;
  const other = Number(s.other) || 0, credits = Number(s.credits) || 0, withheld = Number(s.withheld);
  const agi = gross - pre;
  const taxable = Math.max(0, agi - deduction - other);
  const { tax, rows, marginal } = taxFor(taxable, st);
  const after = Math.max(0, tax - credits);
  const err = !(gross > 0) ? "Enter your total income for the year." : pre < 0 || pre > gross ? "Pre-tax deductions must be between $0 and your income." : itemized && !(Number(s.item) >= 0) ? "Enter your itemized deductions." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Income tax calculator">
        <div>
          <label htmlFor="st" className="label">Filing status</label>
          <select id="st" className="field" value={st} onChange={(e) => set("st", e.target.value)}>
            {(Object.keys(STATUS_LABEL) as Status[]).map((k) => <option key={k} value={k}>{STATUS_LABEL[k]}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="gross" label="Total income for 2026" prefix="$" value={s.gross} onChange={(v) => set("gross", v)} min={0} hint="Wages, interest, side income…" />
          <Field id="pre" label="Pre-tax deductions" prefix="$" value={s.pre} onChange={(v) => set("pre", v)} min={0} hint="401(k), HSA, other adjustments" />
        </div>
        <fieldset>
          <legend className="label">Deduction</legend>
          <div className="flex flex-wrap gap-4 text-sm">
            <label className="flex items-center gap-2"><input type="radio" name="ded" checked={!itemized} onChange={() => set("ded", "std")} /> Standard ({usd(std)})</label>
            <label className="flex items-center gap-2"><input type="radio" name="ded" checked={itemized} onChange={() => set("ded", "item")} /> Itemize</label>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {itemized
              ? <Field id="item" label="Itemized deductions" prefix="$" value={s.item} onChange={(v) => set("item", v)} min={0} hint="Mortgage interest, SALT, gifts…" />
              : <Field id="extra" label="Age 65+ or blind (count)" value={s.extra} onChange={(v) => set("extra", v)} min={0} inputMode="numeric" hint={`Each adds ${usd(married ? ADDITIONAL_2026.married : ADDITIONAL_2026.unmarried)}`} />}
            <Field id="other" label="Other deductions (optional)" prefix="$" value={s.other} onChange={(v) => set("other", v)} min={0} hint="Any other deduction you qualify for" />
          </div>
        </fieldset>
        <div className="grid grid-cols-2 gap-3">
          <Field id="credits" label="Tax credits (optional)" prefix="$" value={s.credits} onChange={(v) => set("credits", v)} min={0} hint="Child tax credit etc." />
          <Field id="withheld" label="Tax already withheld (optional)" prefix="$" value={s.withheld} onChange={(v) => set("withheld", v)} min={0} hint="From your pay stubs or W-2" />
        </div>
      </form>
      <ResultCard error={err} label="Estimated 2026 federal income tax" value={err ? "–" : <span data-testid="tax">{usd(after)}</span>}>
        {!err && <>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Taxable income" v={<span data-testid="taxable">{usd(taxable)}</span>} />
            <Stat k="Marginal tax rate" v={<span data-testid="marginal">{pct(marginal)}</span>} />
            <Stat k="Effective rate (of total income)" v={<span data-testid="effective">{pct(after / gross)}</span>} />
            <Stat k="Per month" v={usd(after / 12)} />
            {Number.isFinite(withheld) && s.withheld.trim() !== "" && <Stat k={withheld >= after ? "Estimated refund" : "Estimated amount owed"} v={<span data-testid="refund">{usd(Math.abs(withheld - after))}</span>} />}
          </dl>
          <h2 className="mt-5 text-sm font-semibold">How your taxable income is worked out</h2>
          <table className="mt-2 w-full text-sm" data-testid="steps">
            <tbody>
              <tr className="border-t border-[var(--border)]"><td className="py-1">Total income</td><td className="text-right">{usd(gross)}</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="py-1">− Pre-tax deductions</td><td className="text-right">{usd(pre)}</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="py-1">= Adjusted gross income</td><td className="text-right">{usd(agi)}</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="py-1">− {itemized ? "Itemized" : "Standard"} deduction{other > 0 ? " and other deductions" : ""}</td><td className="text-right">{usd(deduction + other)}</td></tr>
              <tr className="border-t border-[var(--border)] font-semibold"><td className="py-1">= Taxable income</td><td className="text-right">{usd(taxable)}</td></tr>
            </tbody>
          </table>
          <h2 className="mt-5 text-sm font-semibold">Tax by bracket ({STATUS_LABEL[st].toLowerCase()})</h2>
          <div className="overflow-x-auto">
            <table className="mt-2 w-full text-sm" data-testid="brackets">
              <thead><tr className="text-left subtle"><th className="py-1">Rate</th><th>Income in bracket</th><th className="text-right">Tax</th></tr></thead>
              <tbody>
                {rows.map((r) => <tr key={r.rate} className="border-t border-[var(--border)]"><td className="py-1">{pct(r.rate)}</td><td>{usd(r.amount)} <span className="subtle">({usd(r.from)}–{r.to === null ? "" : usd(r.to)})</span></td><td className="text-right">{usd(r.tax, 2)}</td></tr>)}
                <tr className="border-t border-[var(--border)] font-semibold"><td className="py-1" colSpan={2}>Tax before credits</td><td className="text-right">{usd(tax, 2)}</td></tr>
                {credits > 0 && <tr className="border-t border-[var(--border)]"><td className="py-1" colSpan={2}>− Credits</td><td className="text-right">{usd(Math.min(credits, tax), 2)}</td></tr>}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs subtle">Estimate of regular federal income tax only. Not included: Social Security and Medicare (FICA), self-employment tax, state and local tax, capital-gains rates, the alternative minimum tax and phase-outs. Not tax advice.</p>
        </>}
      </ResultCard>
    </div>
  );
}
