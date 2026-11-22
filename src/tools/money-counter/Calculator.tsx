"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

type Cur = "usd" | "eur" | "gbp";
const CUR: Record<Cur, { sym: string; locale: string; code: string; bills: number[]; coins: number[] }> = {
  usd: { sym: "$", locale: "en-US", code: "USD", bills: [100, 50, 20, 10, 5, 2, 1], coins: [1, 0.5, 0.25, 0.1, 0.05, 0.01] },
  eur: { sym: "€", locale: "en-IE", code: "EUR", bills: [500, 200, 100, 50, 20, 10, 5], coins: [2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01] },
  gbp: { sym: "£", locale: "en-GB", code: "GBP", bills: [50, 20, 10, 5], coins: [2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01] },
};
const label = (v: number, c: Cur, coin: boolean) => (v >= 1 ? `${CUR[c].sym}${v}${coin ? " coin" : ""}` : c === "usd" ? `${Math.round(v * 100)}¢` : `${Math.round(v * 100)}${c === "gbp" ? "p" : "c"}`);

export default function MoneyCounter() {
  const [s, set] = useUrlState({ cur: "usd", b: "1,0,3,5,4,0,12", c: "0,0,23,15,6,48", exp: "" });
  const cur = (["usd", "eur", "gbp"].includes(s.cur) ? s.cur : "usd") as Cur, C = CUR[cur];
  const parse = (str: string, n: number) => { const a = str.split(","); return Array.from({ length: n }, (_, i) => a[i] ?? "0"); };
  const bills = parse(s.b, C.bills.length), coins = parse(s.c, C.coins.length);
  const cents = (vals: number[], counts: string[]) => vals.reduce((t, v, i) => t + Math.round(v * 100) * Math.max(0, Math.floor(Number(counts[i]) || 0)), 0);
  const billC = cents(C.bills, bills), coinC = cents(C.coins, coins), total = billC + coinC;
  const fmt = (c: number) => (c / 100).toLocaleString(C.locale, { style: "currency", currency: C.code });
  const pieces = [...bills, ...coins].reduce((a, x) => a + Math.max(0, Math.floor(Number(x) || 0)), 0);
  const exp = s.exp === "" ? NaN : Math.round(Number(s.exp) * 100), diff = total - exp;
  const switchCur = (v: string) => { set("cur", v); set("b", ""); set("c", ""); };
  const row = (vals: number[], counts: string[], key: "b" | "c", coin: boolean) => vals.map((v, i) => (
    <div key={v} className="grid grid-cols-[5rem_1fr_6rem] items-center gap-2">
      <span className="text-sm font-medium">{label(v, cur, coin)}</span>
      <input aria-label={`Number of ${label(v, cur, coin)}`} type="number" min={0} inputMode="numeric" className="field !py-2 tabular-nums" value={counts[i] === "0" ? "" : counts[i]} placeholder="0"
        onChange={(e) => set(key, counts.map((x, j) => (j === i ? e.target.value.replace(/,/g, "") || "0" : x)).join(","))} />
      <span className="text-right text-sm tabular-nums muted">{fmt(Math.round(v * 100) * Math.max(0, Math.floor(Number(counts[i]) || 0)))}</span>
    </div>
  ));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Money counter">
        <Segmented label="Currency" value={cur} onChange={switchCur} options={[{ id: "usd", label: "US dollar" }, { id: "eur", label: "Euro" }, { id: "gbp", label: "Pound" }]} />
        <div className="space-y-2"><span className="label">Bills / notes</span>{row(C.bills, bills, "b", false)}</div>
        <div className="space-y-2"><span className="label">Coins</span>{row(C.coins, coins, "c", true)}</div>
        <Field id="exp" label="Expected total (optional, for a cash drawer)" prefix={C.sym} value={s.exp} onChange={(v) => set("exp", v)} min={0} />
        <button type="button" className="btn-ghost !py-2" onClick={() => { set("b", ""); set("c", ""); }}>Clear all</button>
      </form>
      <ResultCard label="Total" value={fmt(total)}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Bills / notes" v={fmt(billC)} />
          <Stat k="Coins" v={fmt(coinC)} />
          <Stat k="Pieces counted" v={pieces.toLocaleString()} />
          {Number.isFinite(exp) && <Stat k={diff === 0 ? "Drawer balances" : diff > 0 ? "Over by" : "Short by"} v={<span data-testid="diff" className={diff === 0 ? "text-[var(--color-brand-600)]" : "text-amber-700"}>{diff === 0 ? "✓" : fmt(Math.abs(diff))}</span>} />}
        </dl>
        <p className="mt-4 text-xs subtle">Amounts are added in whole cents, so there&apos;s no rounding error. Nothing you enter leaves your browser.</p>
      </ResultCard>
    </div>
  );
}
