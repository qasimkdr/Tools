"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const COMMON: [number, number, string][] = [[1, 1, "Square (Instagram)"], [4, 5, "Portrait photo / Instagram"], [2, 3, "Portrait 35 mm"], [9, 16, "Vertical video (Reels, TikTok, Shorts)"], [4, 3, "Classic TV / iPad"], [3, 2, "35 mm photo"], [16, 10, "Laptop (WUXGA)"], [16, 9, "HD / 4K video, YouTube"], [1.85, 1, "Cinema flat"], [21, 9, "Ultrawide"], [2.39, 1, "Cinema scope"]];
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const r2 = (x: number) => Math.round(x * 100) / 100;

export default function AspectRatioCalculator() {
  const [s, set] = useUrlState({ mode: "find", w: "1920", h: "1080", rw: "16", rh: "9", nw: "1280", nh: "", tw: "1920", th: "1080", sw: "4000", sh: "3000" });
  const mode = s.mode === "resize" || s.mode === "fit" ? s.mode : "find";
  const W = Number(s.w), H = Number(s.h);
  const ok = W > 0 && H > 0;
  const g = ok && Number.isInteger(W) && Number.isInteger(H) ? gcd(W, H) : 0;
  const ratio = ok ? W / H : NaN;
  const nearest = ok ? COMMON.map(([a, b, n]) => ({ a, b, n, d: Math.abs(a / b - ratio) / ratio })).sort((x, y) => x.d - y.d)[0] : null;
  // Resize
  const RW = Number(s.rw), RH = Number(s.rh), rr = RW / RH;
  const nw = Number(s.nw), nh = Number(s.nh);
  const outW = nw > 0 ? nw : nh * rr, outH = nw > 0 ? nw / rr : nh;
  // Fit / fill
  const SW = Number(s.sw), SH = Number(s.sh), TW = Number(s.tw), TH = Number(s.th);
  const contain = Math.min(TW / SW, TH / SH), cover = Math.max(TW / SW, TH / SH);
  const fitW = SW * contain, fitH = SH * contain, fillW = SW * cover, fillH = SH * cover;
  const preview = (w: number, h: number, w2?: number, h2?: number) => {
    const m = Math.max(w, h, w2 ?? 0, h2 ?? 0) || 1, k = 180 / m;
    return (
      <svg viewBox={`0 0 ${Math.max(w, w2 ?? 0) * k + 4} ${Math.max(h, h2 ?? 0) * k + 4}`} className="mt-4 max-h-48 w-auto" role="img" aria-label="Aspect ratio preview">
        <rect x={2} y={2} width={w * k} height={h * k} fill="rgba(15,118,110,0.15)" stroke="#0f766e" strokeWidth={2} />
        {w2 != null && h2 != null && <rect x={2 + (w * k - w2 * k) / 2} y={2 + (h * k - h2 * k) / 2} width={w2 * k} height={h2 * k} fill="none" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 3" />}
      </svg>
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Aspect ratio calculator">
        <Segmented label="Calculate" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "find", label: "Ratio from size" }, { id: "resize", label: "Resize" }, { id: "fit", label: "Fit / crop into frame" }]} />
        {mode === "find" && <div className="grid grid-cols-2 gap-3">
          <Field id="w" label="Width" suffix="px" value={s.w} onChange={(v) => set("w", v)} min={0} />
          <Field id="h" label="Height" suffix="px" value={s.h} onChange={(v) => set("h", v)} min={0} />
        </div>}
        {mode === "resize" && <>
          <div className="grid grid-cols-2 gap-3">
            <Field id="rw" label="Ratio width" value={s.rw} onChange={(v) => set("rw", v)} min={0} />
            <Field id="rh" label="Ratio height" value={s.rh} onChange={(v) => set("rh", v)} min={0} />
            <Field id="nw" label="New width" suffix="px" value={s.nw} onChange={(v) => { set("nw", v); if (v) set("nh", ""); }} min={0} hint="Or leave blank and set height" />
            <Field id="nh" label="New height" suffix="px" value={s.nh} onChange={(v) => { set("nh", v); if (v) set("nw", ""); }} min={0} />
          </div>
          <div className="flex flex-wrap gap-2">{COMMON.filter(([a, b]) => Number.isInteger(a) && Number.isInteger(b)).map(([a, b]) => <button key={`${a}:${b}`} type="button" onClick={() => { set("rw", String(a)); set("rh", String(b)); }} className={`rounded-full border px-3 py-1 text-sm ${RW === a && RH === b ? "border-[var(--color-brand-600)] bg-[var(--color-brand-600)] text-white" : "border-[var(--border)]"}`}>{a}:{b}</button>)}</div>
        </>}
        {mode === "fit" && <div className="grid grid-cols-2 gap-3">
          <Field id="sw" label="Image / video width" suffix="px" value={s.sw} onChange={(v) => set("sw", v)} min={0} />
          <Field id="sh" label="Image / video height" suffix="px" value={s.sh} onChange={(v) => set("sh", v)} min={0} />
          <Field id="tw" label="Frame width" suffix="px" value={s.tw} onChange={(v) => set("tw", v)} min={0} />
          <Field id="th" label="Frame height" suffix="px" value={s.th} onChange={(v) => set("th", v)} min={0} />
        </div>}
      </form>
      {mode === "find" && (
        <ResultCard label="Aspect ratio" error={ok ? null : "Enter a width and height."} value={ok ? <span data-testid="ratio">{g ? `${W / g}:${H / g}` : `${r2(ratio)}:1`}</span> : "–"}>
          {ok && <>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Decimal ratio" v={`${ratio.toFixed(4)}:1`} />
              <Stat k="Orientation" v={W > H ? "Landscape" : W < H ? "Portrait" : "Square"} />
              <Stat k="Nearest common format" v={<span data-testid="nearest">{nearest ? `${nearest.a}:${nearest.b}` : "–"}</span>} />
              <Stat k="Megapixels" v={`${r2((W * H) / 1e6)} MP`} />
            </dl>
            {nearest && <p className="mt-3 text-sm muted">{nearest.n}{nearest.d > 0.005 ? ` (${(nearest.d * 100).toFixed(1)}% off)` : ""}</p>}
            {preview(W, H)}
          </>}
        </ResultCard>
      )}
      {mode === "resize" && (
        <ResultCard label="New size" error={RW > 0 && RH > 0 && (nw > 0 || nh > 0) ? null : "Enter a ratio and a new width or height."} value={<span data-testid="resized">{Math.round(outW)} × {Math.round(outH)} px</span>}>
          <p className="mt-1 text-sm muted">Exact: {r2(outW)} × {r2(outH)}. Round to an even number for video encoders.</p>
          {RW > 0 && RH > 0 && <table className="mt-4 w-full text-sm"><thead><tr className="text-left subtle"><th className="py-1">Common widths at {RW}:{RH}</th><th>Height</th></tr></thead>
            <tbody>{[640, 1280, 1920, 2560, 3840].map((w) => <tr key={w} className="border-t border-[var(--border)]"><td className="py-1">{w}</td><td>{r2(w / rr)}</td></tr>)}</tbody></table>}
        </ResultCard>
      )}
      {mode === "fit" && (
        <ResultCard label="Fit inside (letterbox)" error={SW > 0 && SH > 0 && TW > 0 && TH > 0 ? null : "Enter the media and frame sizes."} value={<span data-testid="fit">{Math.round(fitW)} × {Math.round(fitH)} px</span>}>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Bars to add" v={`${Math.round(TW - fitW)} px wide · ${Math.round(TH - fitH)} px tall`} />
            <Stat k="Fill frame (crop) size" v={<span data-testid="fill">{Math.round(fillW)} × {Math.round(fillH)} px</span>} />
            <Stat k="Cropped off" v={`${Math.round(fillW - TW)} px wide · ${Math.round(fillH - TH)} px tall`} />
            <Stat k="Scale" v={`fit ${(contain * 100).toFixed(1)}% · fill ${(cover * 100).toFixed(1)}%`} />
          </dl>
          {preview(TW, TH, fitW, fitH)}
          <p className="text-xs subtle">Green: frame. Dashed: your media scaled to fit.</p>
        </ResultCard>
      )}
    </div>
  );
}
