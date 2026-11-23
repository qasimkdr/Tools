"use client";
import { Field, ResultCard, Segmented, Stat, downloadCsv } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { payment } from "@/lib/money";

const usd = (x: number) => x.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function SellerFinancingCalculator() {
  const [s, set] = useUrlState({ price: "250000", down: "10", dmode: "pct", rate: "7", amort: "30", balloon: "5" });
  const price = Number(s.price), downAmt = s.dmode === "usd" ? Number(s.down) : (price * Number(s.down)) / 100;
  const loan = price - downAmt, r = Number(s.rate) / 100 / 12, n = Math.round(Number(s.amort) * 12);
  const bYears = Number(s.balloon) || 0, bMonths = Math.round(bYears * 12);
  const err = !(price > 0) ? "Enter the sale price." : !(downAmt >= 0 && downAmt < price) ? "The down payment must be less than the price." : !(n > 0) ? "Enter the amortization period." : Number(s.rate) < 0 ? "The rate can't be negative." : bMonths > n ? "The balloon must come before the end of the amortization period." : null;
  const pmt = err ? NaN : payment(loan, r, n);
  const months = bMonths > 0 ? bMonths : n;
  const rows: { m: number; interest: number; principal: number; balance: number }[] = [];
  let bal = loan, totInt = 0;
  if (!err) for (let m = 1; m <= months; m++) { const i = bal * r; const p = Math.min(pmt - i, bal); bal -= p; totInt += i; rows.push({ m, interest: i, principal: p, balance: Math.max(0, bal) }); }
  const balloonAmt = bMonths > 0 ? Math.max(0, bal) : 0;
  const totalBuyer = downAmt + pmt * months + balloonAmt;
  const years = rows.filter((x) => x.m % 12 === 0 || x.m === months);

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Seller financing calculator">
          <div className="grid grid-cols-2 gap-3">
            <Field id="price" label="Sale price" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
            <div className="grid grid-cols-[1fr_auto] items-end gap-2">
              <Field id="down" label="Down payment" prefix={s.dmode === "usd" ? "$" : undefined} suffix={s.dmode === "usd" ? undefined : "%"} value={s.down} onChange={(v) => set("down", v)} min={0} />
              <Segmented label="Type" value={s.dmode === "usd" ? "usd" : "pct"} onChange={(v) => set("dmode", v)} options={[{ id: "pct", label: "%" }, { id: "usd", label: "$" }]} />
            </div>
            <Field id="rate" label="Interest rate" suffix="%" value={s.rate} onChange={(v) => set("rate", v)} min={0} />
            <Field id="amort" label="Amortization" suffix="years" value={s.amort} onChange={(v) => set("amort", v)} min={0} hint="Sets the monthly payment" />
            <Field id="balloon" label="Balloon due after" suffix="years" value={s.balloon} onChange={(v) => set("balloon", v)} min={0} hint="0 = fully amortizing, no balloon" />
          </div>
        </form>
        <ResultCard label="Monthly payment (principal & interest)" error={err} value={err ? "–" : usd(pmt)}>
          {!err && <>
            <p className="mt-1 text-sm muted">Financed {usd(loan)} at {s.rate}% · {bMonths > 0 ? `balloon after ${bYears} years` : `${s.amort}-year payoff`}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {bMonths > 0 && <Stat k={`Balloon payment (month ${bMonths})`} v={<span data-testid="balloon">{usd(balloonAmt)}</span>} />}
              <Stat k="Interest paid to the seller" v={<span data-testid="interest">{usd(totInt)}</span>} />
              <Stat k="Down payment" v={usd(downAmt)} />
              <Stat k="Total the buyer pays" v={usd(totalBuyer)} />
              <Stat k="Payments before balloon" v={`${months}`} />
            </dl>
            <p className="mt-4 text-xs subtle">Excludes taxes, insurance and fees. Seller-financed loans may have to meet federal and state lending rules; use a real estate attorney or title company to draft the note and mortgage or deed of trust.</p>
          </>}
        </ResultCard>
      </div>
      {!err && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold">Amortization schedule (end of each year)</h3>
            <button type="button" className="btn-ghost text-sm" onClick={() => downloadCsv("seller-financing.csv", ["Month", "Interest", "Principal", "Balance"], rows.map((x) => [x.m, x.interest.toFixed(2), x.principal.toFixed(2), x.balance.toFixed(2)]))}>Download CSV</button>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full max-w-xl text-sm">
              <thead><tr className="text-left subtle"><th className="py-1">Year</th><th>Interest that year</th><th>Principal that year</th><th>Balance</th></tr></thead>
              <tbody>{years.map((y) => { const yr = Math.ceil(y.m / 12); const inYr = rows.filter((x) => Math.ceil(x.m / 12) === yr); return <tr key={y.m} className="border-t border-[var(--border)]"><td className="py-1">{yr}</td><td>{usd(inYr.reduce((t, x) => t + x.interest, 0))}</td><td>{usd(inYr.reduce((t, x) => t + x.principal, 0))}</td><td>{usd(y.balance)}</td></tr>; })}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
