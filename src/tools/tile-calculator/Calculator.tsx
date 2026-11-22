"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const WASTE: Record<string, number> = { straight: 10, diagonal: 15, herringbone: 20 };
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function TileCalculator() {
  const [s, set] = useUrlState({ u: "imp", mode: "dims", l: "12", w: "10", area: "120", minus: "0", tl: "12", tw: "12", g: "0.125", lay: "straight", waste: "10", per: "12", price: "" });
  const metric = s.u === "met";
  // Area in sq ft (imperial) or m² (metric); tile and grout in inches or cm/mm.
  const gross = s.mode === "area" ? Number(s.area) : Number(s.l) * Number(s.w);
  const area = gross - (Number(s.minus) || 0);
  const tl = Number(s.tl), tw = Number(s.tw), g = Number(s.g) || 0;
  const tileArea = metric ? (tl * tw) / 1e4 : (tl * tw) / 144; // face area of one tile (m² or sq ft)
  const gU = metric ? g / 10 : g; // grout in the tile's unit
  const footprint = metric ? ((tl + gU) * (tw + gU)) / 1e4 : ((tl + gU) * (tw + gU)) / 144;
  const waste = Number(s.waste) || 0;
  const net = area / footprint, buyArea = area * (1 + waste / 100);
  const tiles = Math.ceil(area * (1 + waste / 100) / footprint - 1e-9);
  const per = Number(s.per) || 0;
  const boxes = per > 0 ? Math.ceil((tiles * tileArea) / per - 1e-9) : 0;
  const err = !(area > 0) ? "Enter the area to tile." : !(tl > 0 && tw > 0) ? "Enter the tile size." : g < 0 ? "Grout gap can't be negative." : null;
  const au = metric ? "m²" : "sq ft", lu = metric ? "m" : "ft", tu = metric ? "cm" : "in";
  const price = Number(s.price);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Tile calculator">
        <div className="flex flex-wrap gap-4">
          <Segmented label="Units" value={metric ? "met" : "imp"} onChange={(v) => set("u", v)} options={[{ id: "imp", label: "ft / in" }, { id: "met", label: "m / cm" }]} />
          <Segmented label="Area from" value={s.mode === "area" ? "area" : "dims"} onChange={(v) => set("mode", v)} options={[{ id: "dims", label: "Length × width" }, { id: "area", label: "Total area" }]} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {s.mode === "area" ? <Field id="area" label="Area to tile" suffix={au} value={s.area} onChange={(v) => set("area", v)} min={0} /> : <>
            <Field id="l" label="Length" suffix={lu} value={s.l} onChange={(v) => set("l", v)} min={0} />
            <Field id="w" label="Width" suffix={lu} value={s.w} onChange={(v) => set("w", v)} min={0} />
          </>}
          <Field id="minus" label="Minus (cabinets, tub…)" suffix={au} value={s.minus} onChange={(v) => set("minus", v)} min={0} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field id="tl" label="Tile length" suffix={tu} value={s.tl} onChange={(v) => set("tl", v)} min={0} />
          <Field id="tw" label="Tile width" suffix={tu} value={s.tw} onChange={(v) => set("tw", v)} min={0} />
          <Field id="g" label="Grout gap" suffix={metric ? "mm" : "in"} value={s.g} onChange={(v) => set("g", v)} min={0} />
        </div>
        <Segmented label="Layout" value={s.lay in WASTE ? s.lay : "straight"} onChange={(v) => { set("lay", v); set("waste", String(WASTE[v])); }} options={[{ id: "straight", label: "Straight" }, { id: "diagonal", label: "Diagonal" }, { id: "herringbone", label: "Herringbone" }]} />
        <div className="grid grid-cols-3 gap-3">
          <Field id="waste" label="Waste" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} />
          <Field id="per" label="Per box" suffix={au} value={s.per} onChange={(v) => set("per", v)} min={0} hint="Coverage on the label" />
          <Field id="price" label="Price" prefix="$" suffix={`/${au}`} value={s.price} onChange={(v) => set("price", v)} min={0} />
        </div>
      </form>
      <ResultCard label="Tiles to buy" error={err} value={err ? "–" : `${tiles.toLocaleString("en-US")} tiles`}>
        {!err && <>
          <p className="mt-1 text-sm muted">{boxes ? <><strong data-testid="boxes">{boxes} boxes</strong> at {per} {au} each · </> : null}{area.toFixed(2)} {au} + {waste}% waste</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Area to tile" v={`${area.toFixed(2)} ${au}`} />
            <Stat k="Area with waste" v={`${buyArea.toFixed(2)} ${au}`} />
            <Stat k="One tile covers" v={`${tileArea.toFixed(3)} ${au}`} />
            <Stat k="Tiles before waste" v={<span data-testid="net">{net.toFixed(1)}</span>} />
            {boxes > 0 && <Stat k="Tile you'll have" v={`${(boxes * per).toFixed(1)} ${au}`} />}
            {price > 0 && <Stat k="Tile cost" v={<span data-testid="cost">{usd((boxes ? boxes * per : tiles * tileArea) * price)}</span>} />}
          </dl>
          <p className="mt-4 text-xs subtle">Buy from one batch (lot number) so the color matches, and keep a few spare tiles for future repairs.</p>
        </>}
      </ResultCard>
    </div>
  );
}
