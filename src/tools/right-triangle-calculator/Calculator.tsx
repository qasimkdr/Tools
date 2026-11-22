"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { num } from "@/lib/ratio";

type K = "a" | "b" | "c" | "al" | "be";
const rad = (d: number) => (d * Math.PI) / 180, deg = (r: number) => (r * 180) / Math.PI;

/** Solve from exactly two known values (at least one side). α is opposite a, β opposite b, c is the hypotenuse. */
function solve(v: Partial<Record<K, number>>): { a: number; b: number; c: number; steps: string[] } | string {
  const known = (Object.keys(v) as K[]).filter((k) => v[k] !== undefined);
  if (known.length !== 2) return "Enter exactly two values (leave the others blank).";
  const { a, b, c, al, be } = v;
  if (al !== undefined && !(al > 0 && al < 90)) return "Angles must be between 0° and 90°.";
  if (be !== undefined && !(be > 0 && be < 90)) return "Angles must be between 0° and 90°.";
  if ([a, b, c].some((x) => x !== undefined && !(x > 0))) return "Side lengths must be positive.";
  const has = (x: K, y: K) => known.includes(x) && known.includes(y);
  if (has("al", "be")) return "Two angles don't fix the size. Enter at least one side.";
  if (has("a", "b")) return { a: a!, b: b!, c: Math.hypot(a!, b!), steps: [`c = √(a² + b²) = √(${num(a!)}² + ${num(b!)}²)`] };
  if (has("a", "c")) return c! <= a! ? "The hypotenuse must be longer than either leg." : { a: a!, b: Math.sqrt(c! ** 2 - a! ** 2), c: c!, steps: [`b = √(c² − a²) = √(${num(c!)}² − ${num(a!)}²)`] };
  if (has("b", "c")) return c! <= b! ? "The hypotenuse must be longer than either leg." : { a: Math.sqrt(c! ** 2 - b! ** 2), b: b!, c: c!, steps: [`a = √(c² − b²) = √(${num(c!)}² − ${num(b!)}²)`] };
  const A = al !== undefined ? rad(al) : rad(90 - be!); // work with α
  const ang = num(deg(A), 4);
  if (known.includes("a")) return { a: a!, b: a! / Math.tan(A), c: a! / Math.sin(A), steps: [`α = ${ang}°`, `c = a ÷ sin α`, `b = a ÷ tan α`] };
  if (known.includes("b")) return { a: b! * Math.tan(A), b: b!, c: b! / Math.cos(A), steps: [`α = ${ang}°`, `a = b × tan α`, `c = b ÷ cos α`] };
  return { a: c! * Math.sin(A), b: c! * Math.cos(A), c: c!, steps: [`α = ${ang}°`, `a = c × sin α`, `b = c × cos α`] };
}

export default function RightTriangleCalculator() {
  const [s, set] = useUrlState({ a: "6", b: "8", c: "", al: "", be: "" });
  const v: Partial<Record<K, number>> = {};
  (["a", "b", "c", "al", "be"] as K[]).forEach((k) => { if (s[k].trim() !== "") v[k] = Number(s[k]); });
  const r = solve(v);
  const ok = typeof r !== "string" && [r.a, r.b, r.c].every((x) => Number.isFinite(x) && x > 0);
  const res = ok ? (r as Exclude<typeof r, string>) : null;
  const alpha = res ? deg(Math.atan2(res.a, res.b)) : NaN;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Right triangle calculator">
        <p className="text-sm muted">Enter <strong className="text-[var(--text)]">any two values</strong>, at least one of them a side, and leave the rest blank.</p>
        <div className="grid grid-cols-3 gap-3">
          <Field id="a" label="Leg a" value={s.a} onChange={(x) => set("a", x)} min={0} />
          <Field id="b" label="Leg b" value={s.b} onChange={(x) => set("b", x)} min={0} />
          <Field id="c" label="Hypotenuse c" value={s.c} onChange={(x) => set("c", x)} min={0} />
          <Field id="al" label="Angle α" suffix="°" value={s.al} onChange={(x) => set("al", x)} min={0} />
          <Field id="be" label="Angle β" suffix="°" value={s.be} onChange={(x) => set("be", x)} min={0} />
        </div>
        <button type="button" className="btn-ghost" onClick={() => (["a", "b", "c", "al", "be"] as K[]).forEach((k) => set(k, ""))}>Clear all</button>
        <svg viewBox="0 0 240 140" className="w-full max-w-xs" role="img" aria-label="Right triangle: legs a and b, hypotenuse c, angle α opposite a, β opposite b">
          <path d="M20 120 L220 120 L20 20 Z" fill="var(--color-brand-50)" stroke="var(--color-brand-600)" strokeWidth="2" />
          <path d="M20 106 h14 v14" fill="none" stroke="var(--color-brand-600)" strokeWidth="1.5" />
          <text x="6" y="74" fontSize="13">a</text><text x="116" y="136" fontSize="13">b</text>
          <text x="126" y="62" fontSize="13" fontWeight="700" fill="var(--color-brand-700)">c</text>
          <text x="186" y="114" fontSize="12">α</text><text x="26" y="42" fontSize="12">β</text>
        </svg>
      </form>
      <ResultCard error={typeof r === "string" ? r : !ok ? "Those values don't form a valid right triangle." : null} label="Solved triangle"
        value={res ? `${num(res.a, 4)} · ${num(res.b, 4)} · ${num(res.c, 4)}` : ""}>
        {res && (
          <>
            <p className="mt-1 text-xs subtle">sides a · b · c</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <Stat k="Angle α" v={`${num(alpha, 4)}°`} /><Stat k="Angle β" v={`${num(90 - alpha, 4)}°`} /><Stat k="Right angle" v="90°" />
              <Stat k="Area" v={num((res.a * res.b) / 2, 4)} /><Stat k="Perimeter" v={num(res.a + res.b + res.c, 4)} /><Stat k="Altitude to c" v={num((res.a * res.b) / res.c, 4)} />
              <Stat k="Inradius" v={num((res.a + res.b - res.c) / 2, 4)} /><Stat k="Circumradius" v={num(res.c / 2, 4)} />
            </dl>
            <ol className="mt-4 space-y-2 text-sm">{res.steps.map((st, i) => <li key={i} className="rounded-lg bg-[var(--surface-2)] px-3 py-2 font-mono">{st}</li>)}</ol>
          </>
        )}
      </ResultCard>
    </div>
  );
}
