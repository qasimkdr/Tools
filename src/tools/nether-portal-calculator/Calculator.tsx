"use client";
import { ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const int = (v: string) => (/^-?\d+(\.\d+)?$/.test(v.trim()) ? Number(v) : NaN);

export default function NetherPortalCalculator() {
  const [s, set] = useUrlState({ dir: "o2n", x: "1250", y: "70", z: "-340" });
  const toNether = s.dir !== "n2o";
  const x = int(s.x), y = int(s.y), z = int(s.z);
  const err = !Number.isFinite(x) || !Number.isFinite(z) ? "Enter whole-number X and Z coordinates (negative numbers are fine)." : null;
  const cx = toNether ? Math.floor(x / 8) : Math.floor(x) * 8, cz = toNether ? Math.floor(z / 8) : Math.floor(z) * 8;
  const owDist = toNether ? Math.hypot(x, z) : Math.hypot(cx, cz); // straight-line distance from 0,0 in the Overworld
  const coord = (lbl: string, v: string, k: "x" | "y" | "z") => (
    <div><label htmlFor={k} className="label">{lbl}</label><input id={k} inputMode="numeric" className="field tabular-nums" value={v} onChange={(e) => set(k, e.target.value)} /></div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Nether portal calculator">
        <Segmented label="Convert" value={toNether ? "o2n" : "n2o"} onChange={(v) => set("dir", v)} options={[{ id: "o2n", label: "Overworld → Nether" }, { id: "n2o", label: "Nether → Overworld" }]} />
        <div className="grid grid-cols-3 gap-3">
          {coord(`${toNether ? "Overworld" : "Nether"} X`, s.x, "x")}
          {coord("Y (height)", s.y, "y")}
          {coord(`${toNether ? "Overworld" : "Nether"} Z`, s.z, "z")}
        </div>
        <p className="text-xs subtle">Press F3 in Java Edition (or turn on Show Coordinates in Bedrock) to see your position. Stand where you want the portal before reading the numbers.</p>
      </form>
      <ResultCard label={`Build your ${toNether ? "Nether" : "Overworld"} portal at`} error={err} value={err ? "–" : <span data-testid="coords">X {cx}, Z {cz}</span>}>
        {!err && <>
          <p className="mt-1 text-sm muted">Y stays about the same{Number.isFinite(y) ? ` (around Y ${Math.floor(y)})` : ""}; choose a safe spot near that height.</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k={toNether ? "X ÷ 8 (rounded down)" : "X × 8"} v={`${toNether ? x : Math.floor(x)} → ${cx}`} />
            <Stat k={toNether ? "Z ÷ 8 (rounded down)" : "Z × 8"} v={`${toNether ? z : Math.floor(z)} → ${cz}`} />
            <Stat k="Overworld distance from 0, 0" v={`${Math.round(owDist).toLocaleString("en-US")} blocks`} />
            <Stat k="Same trip through the Nether" v={<span data-testid="nether-dist">{Math.round(owDist / 8).toLocaleString("en-US")} blocks</span>} />
          </dl>
          <p className="mt-4 text-xs subtle">Build the second portal as close to these coordinates as you can so the two portals link to each other. Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.</p>
        </>}
      </ResultCard>
    </div>
  );
}
