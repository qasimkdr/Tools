"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { payment } from "@/lib/money";

const usd = (x: number) => (Number.isFinite(x) ? x.toLocaleString("en-US", { style: "currency", currency: "USD" }) : "–");

export default function LeaseVsBuyCalculator() {
  const [s, set] = useUrlState({ price: "35000", down: "3000", tax: "7", term: "36", res: "60", rate: "mf", mf: "0.00125", fees: "0", apr: "6", loan: "60", resale: "" });
  const price = Number(s.price), down = Number(s.down) || 0, tax = (Number(s.tax) || 0) / 100, n = Math.round(Number(s.term) || 0);
  const resVal = price * (Number(s.res) / 100);
  const mf = s.rate === "apr" ? Number(s.mf) / 2400 : Number(s.mf);
  const cap = price - down + (Number(s.fees) || 0);
  const dep = (cap - resVal) / n, fin = (cap + resVal) * mf, leasePay = (dep + fin) * (1 + tax);
  const leaseTotal = down + leasePay * n;
  const loanP = price * (1 + tax) - down, r = Number(s.apr) / 100 / 12, N = Math.round(Number(s.loan) || 0);
  const loanPay = payment(loanP, r, N);
  let bal = loanP; for (let k = 0; k < Math.min(n, N); k++) bal = bal * (1 + r) - loanPay;
  bal = n >= N ? 0 : Math.max(0, bal);
  const resale = Number(s.resale) > 0 ? Number(s.resale) : resVal;
  const equity = resale - bal;
  const buyNet = down + loanPay * Math.min(n, N) - equity;
  const diff = buyNet - leaseTotal;
  const err = !(price > 0) ? "Enter the car's price." : !(n > 0) ? "Enter the lease term." : !(N > 0) ? "Enter the loan term." : !(mf >= 0) ? "Enter the money factor or lease APR." : down >= price ? "The down payment must be less than the price." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Lease vs buy calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="price" label="Car price (negotiated)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
          <Field id="down" label="Down payment / trade-in" prefix="$" value={s.down} onChange={(v) => set("down", v)} min={0} />
          <Field id="tax" label="Sales tax" suffix="%" value={s.tax} onChange={(v) => set("tax", v)} min={0} />
        </div>
        <div>
          <span className="label">Lease</span>
          <div className="grid grid-cols-2 gap-3">
            <Field id="term" label="Lease term" suffix="months" value={s.term} onChange={(v) => set("term", v)} min={1} inputMode="numeric" />
            <Field id="res" label="Residual value" suffix="% of price" value={s.res} onChange={(v) => set("res", v)} min={0} />
            <div className="col-span-2 grid grid-cols-[1fr_auto] items-end gap-2">
              <Field id="mf" label={s.rate === "apr" ? "Lease APR" : "Money factor"} suffix={s.rate === "apr" ? "%" : undefined} value={s.mf} onChange={(v) => set("mf", v)} min={0} hint="Money factor × 2,400 ≈ APR" />
              <Segmented label="Enter as" value={s.rate === "apr" ? "apr" : "mf"} onChange={(v) => set("rate", v)} options={[{ id: "mf", label: "MF" }, { id: "apr", label: "APR" }]} />
            </div>
            <Field id="fees" label="Lease fees rolled in" prefix="$" value={s.fees} onChange={(v) => set("fees", v)} min={0} hint="Acquisition fee etc." />
          </div>
        </div>
        <div>
          <span className="label">Buy with a loan</span>
          <div className="grid grid-cols-2 gap-3">
            <Field id="apr" label="Loan APR" suffix="%" value={s.apr} onChange={(v) => set("apr", v)} min={0} />
            <Field id="loan" label="Loan term" suffix="months" value={s.loan} onChange={(v) => set("loan", v)} min={1} inputMode="numeric" />
            <Field id="resale" label="Car value at lease end" prefix="$" value={s.resale} onChange={(v) => set("resale", v)} min={0} hint="Blank = residual value" />
          </div>
        </div>
      </form>
      <ResultCard label={`Over ${n} months, the cheaper option is`} error={err} value={err ? "–" : <span data-testid="winner">{diff > 0 ? "Leasing" : "Buying"}</span>}>
        {!err && <>
          <p className="mt-1 text-sm muted">by <strong data-testid="diff">{usd(Math.abs(diff))}</strong>, comparing what each costs you over the lease term</p>
          <table className="mt-4 w-full text-sm" data-testid="compare">
            <thead><tr className="text-left subtle"><th className="py-1"></th><th>Lease</th><th>Buy</th></tr></thead>
            <tbody>
              <tr className="border-t border-[var(--border)]"><td className="py-1">Monthly payment</td><td className="font-semibold">{usd(leasePay)}</td><td className="font-semibold">{usd(loanPay)}</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="py-1">Down payment</td><td>{usd(down)}</td><td>{usd(down)}</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="py-1">Paid over {n} months</td><td>{usd(leaseTotal)}</td><td>{usd(down + loanPay * Math.min(n, N))}</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="py-1">Equity at month {n}</td><td>$0.00</td><td>{usd(equity)}</td></tr>
              <tr className="border-t border-[var(--border)] font-semibold"><td className="py-1">Net cost</td><td data-testid="lease-net">{usd(leaseTotal)}</td><td data-testid="buy-net">{usd(buyNet)}</td></tr>
            </tbody>
          </table>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Lease: depreciation part" v={`${usd(dep)}/mo`} />
            <Stat k="Lease: rent charge" v={`${usd(fin)}/mo (≈ ${(mf * 2400).toFixed(2)}% APR)`} />
            <Stat k="Loan balance at lease end" v={usd(bal)} />
            <Stat k="Residual value" v={usd(resVal)} />
          </dl>
          <p className="mt-4 text-xs subtle">Excludes insurance, maintenance, registration and end-of-lease charges for extra miles or wear. Lease tax rules differ by state; this assumes tax on each payment.</p>
        </>}
      </ResultCard>
    </div>
  );
}
