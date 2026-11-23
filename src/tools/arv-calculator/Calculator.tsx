"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const usd = (x: number) => (Number.isFinite(x) ? x.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : "–");

export default function ArvCalculator() {
  const [s, set] = useUrlState({ src: "comps", arv: "300000", comps: "245000, 1650\n262000, 1780\n255000, 1700", sqft: "1750", rule: "70", repairs: "40000", fee: "0", buy: "", hold: "6", holdm: "1500", sell: "8" });
  const comps = s.comps.split("\n").map((l) => l.split(/[,;\t]/).map((x) => Number(x.replace(/[$\s]/g, "")))).filter((c) => c.length >= 2 && c[0] > 0 && c[1] > 0);
  const pps = comps.map(([p, a]) => p / a), avgPps = pps.length ? pps.reduce((t, x) => t + x, 0) / pps.length : NaN;
  const arv = s.src === "comps" ? avgPps * Number(s.sqft) : Number(s.arv);
  const repairs = Number(s.repairs) || 0, fee = Number(s.fee) || 0, rule = Number(s.rule) / 100;
  const mao = arv * rule - repairs - fee;
  const buy = Number(s.buy) > 0 ? Number(s.buy) : mao;
  const holding = (Number(s.hold) || 0) * (Number(s.holdm) || 0), selling = arv * ((Number(s.sell) || 0) / 100);
  const cost = buy + repairs + holding + selling, profit = arv - cost, roi = profit / (buy + repairs + holding);
  const err = !(arv > 0) ? (s.src === "comps" ? "Enter at least one comparable sale (price, square feet) and the subject's square footage." : "Enter the after-repair value.") : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="ARV calculator">
        <Segmented label="After-repair value" value={s.src === "comps" ? "comps" : "known"} onChange={(v) => set("src", v)} options={[{ id: "comps", label: "Estimate from comps" }, { id: "known", label: "I know the ARV" }]} />
        {s.src === "comps" ? <>
          <div>
            <label htmlFor="comps" className="label">Comparable sales (sale price, square feet), one per line</label>
            <textarea id="comps" rows={4} className="field font-mono" value={s.comps} onChange={(e) => set("comps", e.target.value)} spellCheck={false} />
            <p className="mt-1 text-xs subtle">Use recently sold, renovated homes near the property with similar beds, baths and size.</p>
          </div>
          <Field id="sqft" label="Subject property size" suffix="sq ft" value={s.sqft} onChange={(v) => set("sqft", v)} min={0} />
        </> : <Field id="arv" label="After-repair value" prefix="$" value={s.arv} onChange={(v) => set("arv", v)} min={0} />}
        <div className="grid grid-cols-2 gap-3">
          <Field id="repairs" label="Repair budget" prefix="$" value={s.repairs} onChange={(v) => set("repairs", v)} min={0} />
          <Field id="rule" label="Rule percentage" suffix="%" value={s.rule} onChange={(v) => set("rule", v)} min={0} hint="70% is the classic rule" />
          <Field id="fee" label="Wholesale fee (optional)" prefix="$" value={s.fee} onChange={(v) => set("fee", v)} min={0} />
          <Field id="buy" label="Your purchase price (optional)" prefix="$" value={s.buy} onChange={(v) => set("buy", v)} min={0} hint="Blank = use the max offer" />
          <Field id="hold" label="Holding period" suffix="months" value={s.hold} onChange={(v) => set("hold", v)} min={0} />
          <Field id="holdm" label="Holding costs per month" prefix="$" value={s.holdm} onChange={(v) => set("holdm", v)} min={0} hint="Loan interest, taxes, insurance, utilities" />
          <Field id="sell" label="Selling costs" suffix="% of ARV" value={s.sell} onChange={(v) => set("sell", v)} min={0} hint="Agent commissions, closing costs" />
        </div>
      </form>
      <ResultCard label="Maximum allowable offer" error={err} value={err ? "–" : <span data-testid="mao">{usd(mao)}</span>}>
        {!err && <>
          <p className="mt-1 text-sm muted">{usd(arv)} ARV × {s.rule}% − {usd(repairs)} repairs{fee ? ` − ${usd(fee)} fee` : ""}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="After-repair value" v={<span data-testid="arv">{usd(arv)}</span>} />
            {s.src === "comps" && <Stat k="Average comp price per sq ft" v={`${usd(avgPps)}/sq ft (${comps.length} comps)`} />}
            <Stat k="Holding costs" v={usd(holding)} />
            <Stat k="Selling costs" v={usd(selling)} />
            <Stat k={`Projected profit at ${usd(buy)}`} v={<span data-testid="profit">{usd(profit)}</span>} />
            <Stat k="Return on cash invested" v={`${Number.isFinite(roi) ? (roi * 100).toFixed(1) : "–"}%`} />
          </dl>
          {mao <= 0 && <p className="mt-3 text-sm text-amber-700">Repairs and fees exceed the rule&apos;s limit, so this deal doesn&apos;t pass the 70% rule.</p>}
          <p className="mt-4 text-xs subtle">The 70% rule is a quick screening guideline, not a guarantee. Verify ARV with a local agent or appraiser and get contractor bids before you make an offer.</p>
        </>}
      </ResultCard>
    </div>
  );
}
