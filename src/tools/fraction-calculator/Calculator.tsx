"use client";
import { ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { type Frac, fracOp, fromMixed, reduce, toMixed } from "@/lib/ratio";

type Op = "+" | "-" | "×" | "÷";
const OPS: Op[] = ["+", "-", "×", "÷"];
const show = (f: Frac) => (f.d === 1 ? `${f.n}` : `${f.n}/${f.d}`);
const mixed = (f: Frac) => { const m = toMixed(f); if (m.n === 0) return `${m.sign * m.whole}`; return `${m.sign < 0 ? "−" : ""}${m.whole ? `${m.whole} ` : ""}${m.n}/${m.d}`; };

function Operand({ p, s, set }: { p: "a" | "b"; s: Record<string, string>; set: (k: string, v: string) => void }) {
  const box = (k: string, label: string, ph: string) => (
    <input aria-label={label} inputMode="numeric" className="field w-full text-center text-lg font-semibold tabular-nums" placeholder={ph} value={s[`${p}${k}`]} onChange={(e) => set(`${p}${k}`, e.target.value)} />
  );
  return (
    <div className="flex items-center gap-2">
      <div className="w-16">{box("w", `${p === "a" ? "First" : "Second"} whole number`, "0")}</div>
      <div className="w-20 space-y-1">{box("n", `${p === "a" ? "First" : "Second"} numerator`, "1")}<div className="h-0.5 bg-[var(--text)] opacity-50" />{box("d", `${p === "a" ? "First" : "Second"} denominator`, "2")}</div>
    </div>
  );
}

export default function FractionCalculator() {
  const [s, set] = useUrlState({ aw: "1", an: "1", ad: "2", op: "+", bw: "2", bn: "3", bd: "4" });
  const N = (k: string) => (s[k as keyof typeof s].trim() === "" ? 0 : Number(s[k as keyof typeof s]));
  const op = (OPS.includes(s.op as Op) ? s.op : "+") as Op;
  const vals = ["aw", "an", "ad", "bw", "bn", "bd"].map(N);
  let error: string | null = null, res: Frac | null = null, A: Frac | null = null, B: Frac | null = null;
  if (vals.some((v) => !Number.isInteger(v))) error = "Use whole numbers in each box (decimals: convert them to fractions first).";
  else if (N("ad") === 0 || N("bd") === 0) error = "A denominator can't be zero.";
  else {
    A = fromMixed(N("aw"), N("an"), N("ad")); B = fromMixed(N("bw"), N("bn"), N("bd"));
    if (op === "÷" && B.n === 0) error = "You can't divide by zero.";
    else res = fracOp(A, B, op);
  }
  const steps = A && B && res ? [
    `Convert to improper fractions: ${show(A)} ${op} ${show(B)}`,
    op === "+" || op === "-" ? `Common denominator ${A.d * B.d}: (${A.n}×${B.d} ${op} ${B.n}×${A.d}) / ${A.d * B.d} = ${A.n * B.d + (op === "+" ? 1 : -1) * B.n * A.d}/${A.d * B.d}`
      : op === "×" ? `Multiply across: (${A.n}×${B.n}) / (${A.d}×${B.d}) = ${A.n * B.n}/${A.d * B.d}` : `Multiply by the reciprocal: ${show(A)} × ${B.d}/${B.n} = ${A.n * B.d}/${A.d * B.n}`,
    `Simplify: ${show(res)}${Math.abs(res.n) > res.d && res.d !== 1 ? ` = ${mixed(res)}` : ""}`,
  ] : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()} aria-label="Fraction calculator">
        <div className="flex flex-wrap items-center gap-3">
          <Operand p="a" s={s} set={(k, v) => set(k as keyof typeof s, v)} />
          <div role="group" aria-label="Operation" className="flex flex-col gap-1">
            {OPS.map((o) => <button key={o} type="button" aria-pressed={op === o} onClick={() => set("op", o)} className={`size-9 rounded-lg text-lg font-bold ${op === o ? "bg-[var(--color-brand-600)] text-white" : "bg-[var(--surface-2)]"}`}>{o === "-" ? "−" : o}</button>)}
          </div>
          <Operand p="b" s={s} set={(k, v) => set(k as keyof typeof s, v)} />
        </div>
        <p className="text-sm muted">Leave the whole-number box at 0 (or empty) for a simple fraction. For a negative mixed number, put the minus on the whole number.</p>
      </form>
      <ResultCard error={error} label="Answer (simplified)" value={res ? mixed(res) : ""}>
        {res && (
          <>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <Stat k="Fraction" v={show(reduce(res))} />
              <Stat k="Mixed number" v={mixed(res)} />
              <Stat k="Decimal" v={Number((res.n / res.d).toFixed(8)).toString()} />
            </dl>
            <ol className="mt-4 space-y-2 text-sm">{steps.map((st, i) => <li key={i} className="rounded-lg bg-[var(--surface-2)] px-3 py-2 font-mono"><span className="mr-2 subtle">{i + 1}.</span>{st}</li>)}</ol>
          </>
        )}
      </ResultCard>
    </div>
  );
}
