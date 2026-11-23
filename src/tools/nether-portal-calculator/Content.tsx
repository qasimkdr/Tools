import Link from "next/link";

/** Brief + competitor findings: docs/research/nether-portal-calculator.md · research/nether-portal-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the Nether portal calculator</h2>
      <ol>
        <li>Choose <strong>Overworld → Nether</strong> to place a Nether-side portal, or <strong>Nether → Overworld</strong> for the reverse.</li>
        <li>Enter the X, Y and Z coordinates of the portal you already have (or the spot where you want one).</li>
        <li>Build the other portal at the coordinates shown, as close as you can, so the pair links up.</li>
      </ol>

      <h2 id="formula">Nether coordinate formula</h2>
      <div className="formula">Nether X = floor(Overworld X ÷ 8) · Nether Z = floor(Overworld Z ÷ 8)<br />Overworld X = Nether X × 8 · Overworld Z = Nether Z × 8<br />Y is not scaled</div>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li>Overworld <strong>X 1250, Z −340</strong> → Nether <strong>X 156, Z −43</strong> (1250 ÷ 8 = 156.25 → 156; −340 ÷ 8 = −42.5 → −43).</li>
        <li>Nether <strong>X 200, Z 75</strong> → Overworld <strong>X 1600, Z 600</strong>.</li>
        <li>A base 8,000 blocks away in the Overworld is only <strong>1,000 blocks</strong> away through the Nether.</li>
      </ul>

      <h2 id="table">Quick conversion table</h2>
      <table>
        <thead><tr><th>Overworld</th><th>Nether</th></tr></thead>
        <tbody>{[100, 500, 1000, 2500, 5000, 10000].map((d) => <tr key={d}><td>{d.toLocaleString("en-US")}</td><td>{Math.floor(d / 8).toLocaleString("en-US")}</td></tr>)}</tbody>
      </table>

      <h2 id="tips">Portal tips</h2>
      <ul>
        <li><strong>Mark both sides</strong>: write each portal&apos;s coordinates on a sign next to it.</li>
        <li><strong>Build a highway</strong>: a straight, lit tunnel along one axis in the Nether makes long trips safe and quick.</li>
        <li><strong>Mind the height</strong>: if the matching spot is inside lava or solid rock, clear a safe pocket first.</li>
      </ul>
      <p>Planning round builds too? The <Link href="/minecraft-circle/">Minecraft circle generator</Link> draws circles block by block. The 1:8 scale is just a ratio; see the <Link href="/ratio-calculator/">ratio calculator</Link> and the <Link href="/decimals-calculator/">decimals calculator</Link> for the math. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
      <p className="text-sm subtle">Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.</p>
    </>
  );
}
