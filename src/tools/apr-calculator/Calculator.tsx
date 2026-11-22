"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { payment, rateFor, usd } from "@/lib/money";

export default function AprCalculator() {
  const [s, set] = useUrlState({ amt: "20000", rate: "7", term: "5", tu: "y", fees: "800", how: "fin" });
  const L = Number(s.amt), r = Number(s.rate) / 100 / 12, n = Math.round(Number(s.term) * (s.tu === "m" ? 1 : 12)), F = Math.max(0, Number(s.fees) || 0);
  const financed = s.how === "fin";
  const pmt = payment(financed ? L + F : L, r, n);
  const received = financed ? L : L - F;
  const apr = rateFor(received, pmt, n) * 12;
  const totalPaid = pmt * n + (financed ? 0 : F);
  const finance = totalPaid - L;
  const error = !(L > 0) ? "Enter the loan amount." : !(n > 0 && n <= 600) ? "Enter a term between 1 month and 50 years." : !(Number(s.rate) >= 0) || s.rate === "" ? "Enter the interest rate." : !(received > 0) ? "Fees can't be larger than the loan." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="APR calculator">
        <Field id="amt" label="Loan amount (before fees)" prefix="$" value={s.amt} onChange={(v) => set("amt", v)} min={0} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="rate" label="Interest rate (note rate)" suffix="%" value={s.rate} onChange={(v) => set("rate", v)} min={0} />
          <div className="grid grid-cols-[1fr_auto] items-end gap-2">
            <Field id="term" label="Term" value={s.term} onChange={(v) => set("term", v)} min={0} />
            <Segmented label=" " value={s.tu === "m" ? "m" : "y"} onChange={(v) => set("tu", v)} options={[{ id: "y", label: "yrs" }, { id: "m", label: "mos" }]} />
          </div>
        </div>
        <Field id="fees" label="Fees and finance charges" prefix="$" value={s.fees} onChange={(v) => set("fees", v)} min={0} hint="Origination fee, points, application or underwriting fees: charges for getting the loan" />
        <Segmented label="Fees are" value={financed ? "fin" : "up"} onChange={(v) => set("how", v)} options={[{ id: "fin", label: "Added to the loan" }, { id: "up", label: "Paid upfront / deducted" }]} />
      </form>
      <ResultCard error={error} label="APR (annual percentage rate)" value={Number.isFinite(apr) ? `${(apr * 100).toFixed(3)}%` : "—"}>
        <p className="mt-1 text-sm muted">vs. {Number(s.rate).toFixed(3)}% interest rate: fees add <strong className="text-[var(--text)]">{((apr - Number(s.rate) / 100) * 100).toFixed(3)} points</strong>.</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Monthly payment" v={usd(pmt)} />
          <Stat k="Amount you actually receive" v={usd(received)} />
          <Stat k="Total finance charge" v={usd(finance)} />
          <Stat k="Total of payments + fees" v={usd(totalPaid)} />
        </dl>
        <p className="mt-4 text-xs subtle">Assumes a fixed-rate loan with equal monthly payments. Lenders follow federal Truth in Lending rules for which fees count; your Loan Estimate or disclosure shows the official APR.</p>
      </ResultCard>
    </div>
  );
}
