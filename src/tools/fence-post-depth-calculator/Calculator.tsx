"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// Actual post sizes (inches): nominal 4x4 = 3.5 in, 6x6 = 5.5 in.
const POSTS: Record<string, { w: number; round: boolean; label: string }> = {
  "4x4": { w: 3.5, round: false, label: "4×4 wood (3½ in)" }, "6x6": { w: 5.5, round: false, label: "6×6 wood (5½ in)" },
  r238: { w: 2.375, round: true, label: "2⅜ in round steel" }, r3: { w: 3, round: true, label: "3 in round" },
};
// Quikrete Concrete Mix yields: 40 lb ≈ 0.30 ft³, 60 lb ≈ 0.45 ft³, 80 lb ≈ 0.60 ft³.
const BAGS = [{ lb: 80, ft3: 0.6 }, { lb: 60, ft3: 0.45 }, { lb: 40, ft3: 0.3 }];
const STOCK = [6, 7, 8, 9, 10, 12, 14, 16];
const ftin = (inches: number) => { const f = Math.floor(inches / 12), i = Math.round(inches - f * 12); return i === 12 ? `${f + 1} ft 0 in` : `${f} ft ${i} in`; };

export default function FencePostDepthCalculator() {
  const [s, set] = useUrlState({ h: "6", rule: "third", frost: "", post: "4x4", gravel: "6", n: "1" });
  const H = Number(s.h) * 12; // above-ground height, inches
  const post = POSTS[s.post] ?? POSTS["4x4"];
  const frost = Number(s.frost) || 0, gravel = Number(s.gravel) || 0, n = Math.max(1, Math.round(Number(s.n) || 1));
  const ruleDepth = s.rule === "half" ? H / 2 : H / 3;
  const depth = Math.max(ruleDepth, frost);
  const hole = 3 * post.w;
  const holeVol = Math.PI * (hole / 2) ** 2 * depth, postVol = (post.round ? Math.PI * (post.w / 2) ** 2 : post.w ** 2) * depth;
  const ft3 = (holeVol - postVol) / 1728;
  const length = (H + depth) / 12, buy = STOCK.find((x) => x >= length - 1e-9);
  const err = !(H > 0 && H <= 16 * 12) ? "Enter a fence height up to 16 ft." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Fence post depth calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="h" label="Fence height above ground" suffix="ft" value={s.h} onChange={(v) => set("h", v)} min={0} />
          <Field id="frost" label="Local frost depth (optional)" suffix="in" value={s.frost} onChange={(v) => set("frost", v)} min={0} hint="Ask your local building department" />
        </div>
        <Segmented label="Burial rule" value={s.rule === "half" ? "half" : "third"} onChange={(v) => set("rule", v)} options={[{ id: "third", label: "⅓ of height (standard)" }, { id: "half", label: "½ of height (gates, wind, tall)" }]} />
        <div><label htmlFor="post" className="label">Post</label>
          <select id="post" className="field" value={s.post in POSTS ? s.post : "4x4"} onChange={(e) => set("post", e.target.value)}>{Object.entries(POSTS).map(([k, p]) => <option key={k} value={k}>{p.label}</option>)}</select></div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="gravel" label="Gravel base" suffix="in" value={s.gravel} onChange={(v) => set("gravel", v)} min={0} hint="3–6 in for drainage" />
          <Field id="n" label="Number of posts" value={s.n} onChange={(v) => set("n", v)} min={1} inputMode="numeric" />
        </div>
      </form>
      <ResultCard label="Bury the post" error={err} value={err ? "–" : ftin(depth)}>
        {!err && <>
          <p className="mt-1 text-sm muted">Dig the hole <strong data-testid="hole-depth">{ftin(depth + gravel)}</strong> deep (incl. {gravel} in gravel) and <strong data-testid="hole-dia">{hole.toFixed(1)} in</strong> wide{frost > ruleDepth ? " · set by your frost depth" : ""}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Post length needed" v={`${ftin(H + depth)}`} />
            <Stat k="Buy posts" v={<span data-testid="buy">{buy ? `${buy} ft` : "custom length"}</span>} />
            <Stat k={`Concrete per post`} v={`${ft3.toFixed(2)} ft³`} />
            {BAGS.slice(0, 2).map((b) => <Stat key={b.lb} k={`${b.lb} lb bags${n > 1 ? ` (${n} posts)` : " per post"}`} v={<span data-testid={`bags${b.lb}`}>{Math.ceil((ft3 * n) / b.ft3 - 1e-9)}</span>} />)}
          </dl>
          <p className="mt-4 text-xs subtle">Rules of thumb; follow your fence manufacturer&apos;s instructions and local code. Call 811 (in the U.S.) before you dig so buried utilities are marked.</p>
        </>}
      </ResultCard>
    </div>
  );
}
