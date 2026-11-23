"use client";
import type { ReactNode } from "react";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { payment } from "@/lib/money";

const fmt = (x: number, d = 6) => (Number.isFinite(x) ? String(Number(x.toFixed(d))) : "–");
const usd = (x: number) => x.toLocaleString("en-US", { style: "currency", currency: "USD" });
const signed = (x: number, unit: string) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${fmt(Math.abs(x), 4)} ${unit}`;

export default function BasisPointCalculator() {
  const [s, set] = useUrlState({ mode: "convert", from: "bps", v: "25", r1: "4.75", r2: "4.25", bps: "1.5", amt: "65000", loan: "300000", rate: "6.5", yrs: "30", chg: "25" });
  const mode = ["convert", "change", "amount", "loan"].includes(s.mode) ? s.mode : "convert";
  let value: ReactNode = "–", label = "", body: ReactNode = null, err: string | null = null;

  if (mode === "convert") {
    const v = Number(s.v);
    const bps = s.from === "pct" ? v * 100 : s.from === "dec" ? v * 10000 : v;
    err = s.v.trim() === "" || !Number.isFinite(v) ? "Enter a number to convert." : null;
    label = s.from === "bps" ? `${fmt(v)} bps is` : s.from === "pct" ? `${fmt(v)}% is` : `${fmt(v)} as a decimal is`;
    value = <span data-testid="conv">{s.from === "bps" ? `${fmt(bps / 100)}%` : `${fmt(bps)} bps`}</span>;
    body = <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
      <Stat k="Basis points" v={<span data-testid="as-bps">{fmt(bps)} bps</span>} />
      <Stat k="Percent" v={<span data-testid="as-pct">{fmt(bps / 100)}%</span>} />
      <Stat k="Decimal" v={<span data-testid="as-dec">{fmt(bps / 10000, 8)}</span>} />
    </dl>;
  } else if (mode === "change") {
    const a = Number(s.r1), b = Number(s.r2);
    err = !Number.isFinite(a) || !Number.isFinite(b) || s.r1.trim() === "" || s.r2.trim() === "" ? "Enter both rates in percent." : null;
    const d = (b - a) * 100;
    label = `From ${fmt(a)}% to ${fmt(b)}%`;
    value = <span data-testid="chg">{signed(Math.round(d * 1e6) / 1e6, "bps")}</span>;
    body = <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
      <Stat k="Change in percentage points" v={signed(b - a, "points")} />
      <Stat k="Relative change" v={a !== 0 ? `${((b - a) / a * 100).toFixed(2)}%` : "–"} />
    </dl>;
  } else if (mode === "amount") {
    const bps = Number(s.bps), amt = Number(s.amt);
    err = !Number.isFinite(bps) || !(amt > 0) ? "Enter the basis points and the amount." : null;
    const val = (amt * bps) / 10000;
    label = `${fmt(bps)} bps of ${usd(amt)}`;
    value = <span data-testid="val">{usd(val)}</span>;
    body = <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
      <Stat k="As a percent" v={`${fmt(bps / 100)}%`} />
      <Stat k="Per month (if annual)" v={usd(val / 12)} />
      <Stat k="1 bp of this amount" v={usd(amt / 10000)} />
      <Stat k="Over 10 years (simple)" v={usd(val * 10)} />
    </dl>;
  } else {
    const P = Number(s.loan), r = Number(s.rate), n = Math.round(Number(s.yrs) * 12), chg = Number(s.chg);
    err = !(P > 0) ? "Enter the loan amount." : !(r >= 0) ? "Enter the interest rate." : !(n > 0) ? "Enter the term in years." : !Number.isFinite(chg) || r + chg / 100 < 0 ? "Enter the rate change in basis points." : null;
    const p1 = payment(P, r / 100 / 12, n), r2 = r + chg / 100, p2 = payment(P, r2 / 100 / 12, n);
    label = `Payment change for ${signed(chg, "bps")}`;
    value = <span data-testid="pmt-chg">{p2 - p1 >= 0 ? "+" : "−"}{usd(Math.abs(p2 - p1))}/mo</span>;
    body = <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
      <Stat k={`Payment at ${fmt(r, 4)}%`} v={<span data-testid="p1">{usd(p1)}</span>} />
      <Stat k={`Payment at ${fmt(r2, 4)}%`} v={<span data-testid="p2">{usd(p2)}</span>} />
      <Stat k="Change over the full term" v={usd((p2 - p1) * n)} />
      <Stat k="Total interest at new rate" v={usd(p2 * n - P)} />
    </dl>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Basis point calculator">
        <Segmented label="Calculate" value={mode as "convert"} onChange={(v) => set("mode", v)} options={[{ id: "convert", label: "Convert" }, { id: "change", label: "Rate change" }, { id: "amount", label: "Dollar value" }, { id: "loan", label: "Loan payment" }]} />
        {mode === "convert" && <>
          <Segmented label="Convert from" value={(["bps", "pct", "dec"].includes(s.from) ? s.from : "bps") as "bps"} onChange={(v) => set("from", v)} options={[{ id: "bps", label: "Basis points" }, { id: "pct", label: "Percent" }, { id: "dec", label: "Decimal" }]} />
          <Field id="v" label="Value" suffix={s.from === "pct" ? "%" : s.from === "dec" ? "" : "bps"} value={s.v} onChange={(v) => set("v", v)} />
        </>}
        {mode === "change" && <div className="grid grid-cols-2 gap-3">
          <Field id="r1" label="Old rate" suffix="%" value={s.r1} onChange={(v) => set("r1", v)} />
          <Field id="r2" label="New rate" suffix="%" value={s.r2} onChange={(v) => set("r2", v)} />
        </div>}
        {mode === "amount" && <div className="grid grid-cols-2 gap-3">
          <Field id="bps" label="Basis points" suffix="bps" value={s.bps} onChange={(v) => set("bps", v)} />
          <Field id="amt" label="Amount" prefix="$" value={s.amt} onChange={(v) => set("amt", v)} min={0} hint="Loan, balance or fund value" />
        </div>}
        {mode === "loan" && <div className="grid grid-cols-2 gap-3">
          <Field id="loan" label="Loan amount" prefix="$" value={s.loan} onChange={(v) => set("loan", v)} min={0} />
          <Field id="rate" label="Current rate" suffix="%" value={s.rate} onChange={(v) => set("rate", v)} min={0} />
          <Field id="yrs" label="Term" suffix="years" value={s.yrs} onChange={(v) => set("yrs", v)} min={1} />
          <Field id="chg" label="Rate change" suffix="bps" value={s.chg} onChange={(v) => set("chg", v)} hint="Negative for a cut" />
        </div>}
      </form>
      <ResultCard error={err} label={label} value={err ? "–" : value}>
        {!err && <>{body}<p className="mt-3 text-xs subtle">1 basis point (bp) = 0.01% = 0.0001. 100 bps = 1 percentage point.</p></>}
      </ResultCard>
    </div>
  );
}
