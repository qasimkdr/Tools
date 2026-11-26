"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { capRate, valueAtCap } from "@/lib/capRate";

const usd = (x: number) => (Number.isFinite(x) ? x.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : "–");
const pct = (x: number) => (Number.isFinite(x) ? `${(x * 100).toFixed(2)}%` : "–");

export default function CapRateCalculator() {
  const [s, set] = useUrlState({ mode: "detail", value: "400000", rent: "3200", period: "month", other: "0", vac: "5", tax: "4800", ins: "1800", maint: "2400", mgmt: "8", oexp: "1000", noi: "60000", target: "6.5", cash: "", debt: "" });
  const n = (k: keyof typeof s) => Number(s[k]) || 0;
  const quick = s.mode === "quick";
  const mult = s.period === "month" ? 12 : 1;
  const value = Number(s.value);
  const d = capRate({ value, rent: n("rent") * mult, other: n("other") * mult, vacancyPct: n("vac"), taxes: n("tax"), insurance: n("ins"), maintenance: n("maint"), mgmtPct: n("mgmt"), otherExp: n("oexp") });
  const noi = quick ? Number(s.noi) : d.noi;
  const cap = value > 0 ? noi / value : NaN;
  const target = Number(s.target) / 100;
  const cash = Number(s.cash), debt = Number(s.debt);
  const hasFin = debt > 0 || cash > 0;
  const coc = cash > 0 ? (noi - (debt > 0 ? debt : 0)) / cash : NaN;
  const dscr = debt > 0 ? noi / debt : NaN;
  const err = !(value > 0) ? "Enter the property's value or purchase price." : quick ? (!Number.isFinite(noi) || s.noi === "" ? "Enter the annual net operating income." : null) : !(n("rent") > 0) ? "Enter the rent." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Cap rate calculator">
        <Segmented label="I know" value={quick ? "quick" : "detail"} onChange={(v) => set("mode", v)} options={[{ id: "detail", label: "Rent and expenses" }, { id: "quick", label: "The NOI" }]} />
        <Field id="value" label="Property value or purchase price" prefix="$" value={s.value} onChange={(v) => set("value", v)} min={0} />
        {quick ? <Field id="noi" label="Net operating income (per year)" prefix="$" value={s.noi} onChange={(v) => set("noi", v)} hint="Income after operating expenses, before mortgage payments" /> : <>
          <Segmented label="Rent and other income are" value={s.period === "month" ? "month" : "year"} onChange={(v) => set("period", v)} options={[{ id: "month", label: "Monthly" }, { id: "year", label: "Yearly" }]} />
          <div className="grid grid-cols-2 gap-3">
            <Field id="rent" label="Rent" prefix="$" value={s.rent} onChange={(v) => set("rent", v)} min={0} hint="All units combined" />
            <Field id="other" label="Other income" prefix="$" value={s.other} onChange={(v) => set("other", v)} min={0} hint="Parking, laundry, fees" />
            <Field id="vac" label="Vacancy and credit loss" suffix="%" value={s.vac} onChange={(v) => set("vac", v)} min={0} />
            <Field id="mgmt" label="Property management" suffix="%" value={s.mgmt} onChange={(v) => set("mgmt", v)} min={0} hint="Of collected rent" />
            <Field id="tax" label="Property taxes (per year)" prefix="$" value={s.tax} onChange={(v) => set("tax", v)} min={0} />
            <Field id="ins" label="Insurance (per year)" prefix="$" value={s.ins} onChange={(v) => set("ins", v)} min={0} />
            <Field id="maint" label="Repairs and maintenance (per year)" prefix="$" value={s.maint} onChange={(v) => set("maint", v)} min={0} />
            <Field id="oexp" label="Other expenses (per year)" prefix="$" value={s.oexp} onChange={(v) => set("oexp", v)} min={0} hint="Utilities, HOA, landscaping" />
          </div>
        </>}
        <details className="rounded-xl border border-[var(--border)] p-3" open={hasFin}>
          <summary className="cursor-pointer text-sm font-semibold">Financing (optional): cash-on-cash and DSCR</summary>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field id="cash" label="Cash invested" prefix="$" value={s.cash} onChange={(v) => set("cash", v)} min={0} hint="Down payment + closing + repairs" />
            <Field id="debt" label="Mortgage payments (per year)" prefix="$" value={s.debt} onChange={(v) => set("debt", v)} min={0} hint="Principal + interest × 12" />
          </div>
        </details>
        <Field id="target" label="Target cap rate (for the value check)" suffix="%" value={s.target} onChange={(v) => set("target", v)} min={0} />
      </form>
      <ResultCard error={err} label="Cap rate" value={err ? "–" : <span data-testid="cap">{pct(cap)}</span>}>
        {!err && <>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Net operating income (NOI)" v={<span data-testid="noi">{usd(noi)}</span>} />
            <Stat k="NOI per month" v={usd(noi / 12)} />
            {!quick && <>
              <Stat k="Gross scheduled income" v={usd(d.gross)} />
              <Stat k="Effective gross income" v={usd(d.effective)} />
              <Stat k="Operating expenses" v={<span data-testid="expenses">{usd(d.expenses)}</span>} />
              <Stat k="Expense ratio" v={pct(d.expenseRatio)} />
              <Stat k="Gross rent multiplier" v={Number.isFinite(d.grm) ? d.grm.toFixed(2) : "–"} />
            </>}
            {hasFin && <>
              {cash > 0 && <Stat k="Cash-on-cash return" v={<span data-testid="coc">{pct(coc)}</span>} />}
              {debt > 0 && <Stat k="Debt service coverage (DSCR)" v={<span data-testid="dscr">{dscr.toFixed(2)}×</span>} />}
              {debt > 0 && <Stat k="Cash flow after mortgage (per year)" v={usd(noi - debt)} />}
            </>}
            {target > 0 && <Stat k={`Value at a ${(target * 100).toFixed(2).replace(/\.?0+$/, "")}% cap rate`} v={<span data-testid="target-value">{usd(valueAtCap(noi, target))}</span>} />}
          </dl>
          {noi <= 0 && <p className="mt-2 text-sm">Expenses are higher than income, so the property has no positive cap rate at this price.</p>}
          <h2 className="mt-5 text-sm font-semibold">Value at different cap rates (this NOI)</h2>
          <table className="mt-2 w-full text-sm" data-testid="sens">
            <thead><tr className="text-left subtle"><th className="py-1">Cap rate</th><th>Implied value</th><th>vs your price</th></tr></thead>
            <tbody>{[4, 5, 6, 7, 8, 9, 10].map((c) => { const v = valueAtCap(noi, c / 100); return (
              <tr key={c} className="border-t border-[var(--border)]"><td className="py-1">{c}%</td><td>{usd(v)}</td><td>{Number.isFinite(v) && noi > 0 ? `${v >= value ? "+" : "−"}${usd(Math.abs(v - value))}` : "–"}</td></tr>); })}</tbody>
          </table>
        </>}
      </ResultCard>
    </div>
  );
}
