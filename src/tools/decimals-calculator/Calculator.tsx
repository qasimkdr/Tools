"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { add, div, mul, parseQ, sub, toStr, type Q } from "@/lib/rational";
import { expand, placesOf, roundQ } from "@/lib/decimalExpand";

const OPS = { add: "+", sub: "−", mul: "×", div: "÷" } as const;
type Op = keyof typeof OPS;

function Repeating({ x }: { x: Q }) {
  const e = expand(x);
  return <span data-testid="exact">{e.neg ? "−" : ""}{e.int}{e.fixed || e.rep ? "." : ""}{e.fixed}{e.rep && <span style={{ textDecoration: "overline" }}>{e.rep}</span>}{e.truncated ? "…" : ""}</span>;
}

export default function DecimalsCalculator() {
  const [s, set] = useUrlState({ a: "12.75", b: "3.4", op: "mul", dp: "2" });
  const op = (s.op in OPS ? s.op : "add") as Op;
  const A = parseQ(s.a), B = parseQ(s.b);
  const dp = Math.min(30, Math.max(0, Math.round(Number(s.dp) || 0)));
  const err = !A || !B ? "Enter two decimal numbers, e.g. 12.75 and 3.4." : op === "div" && B.n === 0n ? "You can't divide by zero." : null;
  const r = err ? null : op === "add" ? add(A!, B!) : op === "sub" ? sub(A!, B!) : op === "mul" ? mul(A!, B!) : div(A!, B!);
  const pa = placesOf(s.a), pb = placesOf(s.b);
  const steps: string[] = [];
  if (r) {
    if (op === "add" || op === "sub") { const p = Math.max(pa, pb); steps.push(`Line up the decimal points (pad to ${p} decimal place${p === 1 ? "" : "s"}): ${roundQ(A!, p)} ${OPS[op]} ${roundQ(B!, p)}`, `${op === "add" ? "Add" : "Subtract"} as whole numbers and keep the point in the same place.`); }
    if (op === "mul") { const ia = s.a.replace(/[.\-−]/g, "").replace(/^0+(?=\d)/, ""), ib = s.b.replace(/[.\-−]/g, "").replace(/^0+(?=\d)/, ""); steps.push(`Ignore the points: ${ia} × ${ib} = ${(BigInt(ia || "0") * BigInt(ib || "0")).toString()}`, `Count decimal places: ${pa} + ${pb} = ${pa + pb}, so move the point ${pa + pb} place${pa + pb === 1 ? "" : "s"} left.`); }
    if (op === "div") { const p = pb; steps.push(p ? `Move both points ${p} place${p === 1 ? "" : "s"} right so the divisor is a whole number: ${roundQ(mul(A!, { n: 10n ** BigInt(p), d: 1n }), Math.max(0, pa - p))} ÷ ${roundQ(mul(B!, { n: 10n ** BigInt(p), d: 1n }), 0)}` : "The divisor is already a whole number.", "Divide as usual, putting the point in the answer directly above the point in the dividend."); }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Decimals calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="a" label="First number" value={s.a} onChange={(v) => set("a", v)} />
          <Field id="b" label="Second number" value={s.b} onChange={(v) => set("b", v)} />
        </div>
        <Segmented label="Operation" value={op} onChange={(v) => set("op", v)} options={(Object.keys(OPS) as Op[]).map((k) => ({ id: k, label: `${OPS[k]} ${{ add: "Add", sub: "Subtract", mul: "Multiply", div: "Divide" }[k]}` }))} />
        <Field id="dp" label="Round to" suffix="decimal places" value={s.dp} onChange={(v) => set("dp", v)} min={0} inputMode="numeric" />
      </form>
      <ResultCard label={`${s.a} ${OPS[op]} ${s.b}`} error={err} value={r ? <Repeating x={r} /> : "–"}>
        {r && <>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k={`Rounded to ${dp} place${dp === 1 ? "" : "s"}`} v={<span data-testid="rounded">{roundQ(r, dp)}</span>} />
            <Stat k="As a fraction" v={<span data-testid="frac">{toStr(r)}</span>} />
            <Stat k="As a percent" v={`${roundQ(mul(r, { n: 100n, d: 1n }), Math.max(dp, 2))}%`} />
            <Stat k="Decimal type" v={expand(r).rep ? `Repeating (${expand(r).rep.length}-digit cycle)` : "Terminating"} />
          </dl>
          <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm muted" data-testid="steps">{steps.map((x) => <li key={x}>{x}</li>)}</ol>
          <p className="mt-3 text-xs subtle">Calculated with exact fractions, so 0.1 + 0.2 is exactly 0.3 (ordinary computer math gives 0.30000000000000004).</p>
        </>}
      </ResultCard>
    </div>
  );
}
