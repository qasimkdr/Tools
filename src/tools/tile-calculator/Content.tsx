import Link from "next/link";

/** Brief + competitor findings: docs/research/tile-calculator.md · research/tile-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the tile calculator</h2>
      <ol>
        <li>Enter the room&apos;s <strong>length and width</strong>, or the <strong>total area</strong> if you&apos;ve already added up several sections. Subtract anything you won&apos;t tile.</li>
        <li>Enter the <strong>tile size</strong> and <strong>grout gap</strong>.</li>
        <li>Pick a layout to set the waste allowance (or type your own), then add the box coverage and price from the label to get boxes and cost.</li>
      </ol>

      <h2 id="formula">Tile formula</h2>
      <div className="formula">Tile footprint (sq ft) = (tile length + grout) × (tile width + grout) ÷ 144<br />Tiles = area × (1 + waste %) ÷ tile footprint, rounded up<br />Boxes = tiles × tile area ÷ coverage per box, rounded up</div>

      <h2 id="example">Worked example</h2>
      <p>A <strong>10 × 12 ft</strong> bathroom floor is 120 sq ft. With <strong>12 × 12 in</strong> tiles and a 1/8 in grout joint, each tile occupies 12.125 × 12.125 ÷ 144 = 1.021 sq ft, so the floor takes 117.5 tiles. Adding 10% waste gives 132 sq ft ÷ 1.021 = <strong>130 tiles</strong>. Boxes cover 12 sq ft (12 tiles), so buy <strong>11 boxes</strong>.</p>

      <h2 id="table">Tiles per 100 sq ft (no grout, no waste)</h2>
      <table>
        <thead><tr><th>Tile size</th><th>Sq ft per tile</th><th>Tiles per 100 sq ft</th></tr></thead>
        <tbody>
          {[[4, 4], [6, 6], [3, 12], [12, 12], [12, 24], [18, 18], [24, 24]].map(([a, b]) => (
            <tr key={`${a}x${b}`}><td>{a} × {b} in</td><td>{((a * b) / 144).toFixed(3)}</td><td>{Math.ceil((100 * 144) / (a * b))}</td></tr>
          ))}
        </tbody>
      </table>

      <h2 id="tips">Tips before you buy</h2>
      <ul>
        <li><strong>Check lot numbers</strong>: tiles from different production runs can differ in color.</li>
        <li><strong>Large-format tiles</strong> (any side 15 in or longer) usually need a flatter floor and the right thinset.</li>
        <li><strong>Walls and backsplashes</strong>: measure each wall separately and subtract windows and doors.</li>
      </ul>
      <p>Need the floor area first? Use the <Link href="/square-footage-calculator/">square footage calculator</Link>. For trim and edging, the <Link href="/linear-feet-calculator/">linear feet calculator</Link> adds up lengths, and the <Link href="/concrete-calculator/">concrete calculator</Link> helps if you&apos;re pouring a new slab. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
