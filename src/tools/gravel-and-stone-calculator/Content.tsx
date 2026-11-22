import Link from "next/link";

/** Brief + competitor findings: docs/research/gravel-and-stone-calculator.md · research/gravel-and-stone-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the gravel calculator</h2>
      <ol>
        <li><strong>Choose the area&apos;s shape</strong> (rectangle, circle or known square footage) and enter the measurements in any unit.</li>
        <li><strong>Enter the depth.</strong> Inches are usually easiest; see the depth guide below.</li>
        <li><strong>Pick a material</strong> to set a typical density, or type your supplier&apos;s exact tons-per-yard figure.</li>
        <li><strong>Add extra for compaction and waste</strong> (10% is a sensible default) and, optionally, a price per ton or per cubic yard.</li>
      </ol>
      <p>You get the total in tons, cubic yards, cubic feet, cubic meters, pounds and 50 lb bags, plus an estimated cost.</p>

      <h2 id="formula">How gravel is calculated</h2>
      <div className="formula">Volume (yd³) = length (ft) × width (ft) × depth (ft) ÷ 27<br />Weight (tons) = volume (yd³) × density (tons per yd³)<br />Order amount = weight × (1 + extra %)</div>
      <p>Gravel is sold by volume (cubic yards) or weight (tons), so you need both. A typical crushed stone or gravel weighs <strong>about 1.4 tons per cubic yard</strong>, and denser mixes with fines, such as road base and crusher run, weigh more. Density changes with stone type, size and moisture, so if your supplier quotes a figure, enter it in the density box for the most accurate order.</p>

      <h2 id="examples">Worked examples</h2>
      <h3>Gravel driveway: 50 ft × 10 ft, 4 inches deep</h3>
      <p>50 × 10 × (4 ÷ 12) = 166.7 cubic feet = <strong>6.17 cubic yards</strong>. At 1.4 tons per yard that&apos;s <strong>8.64 tons</strong>; with 10% extra for compaction, order about <strong>9.5 tons</strong>.</p>
      <h3>Garden path: 30 ft × 3 ft, 2 inches deep</h3>
      <p>30 × 3 × (2 ÷ 12) = 15 cubic feet = 0.56 cubic yards ≈ <strong>0.78 tons</strong>, about 32 bags of 50 lb. At that size, compare bag prices with a bulk delivery fee.</p>

      <h2 id="depth">How deep should gravel be?</h2>
      <table>
        <thead><tr><th>Project</th><th>Typical depth</th></tr></thead>
        <tbody>
          <tr><td>Decorative beds and borders</td><td>2–3 in</td></tr>
          <tr><td>Walkways and garden paths</td><td>2–4 in over a compacted base</td></tr>
          <tr><td>Patio or paver base</td><td>4–6 in of compacted base</td></tr>
          <tr><td>Driveway (total, in layers)</td><td>6–10+ in (base + top layer)</td></tr>
        </tbody>
      </table>
      <p>Thicker bases are needed on clay or soft soil and where heavy vehicles drive. Local practice varies, so ask your supplier or contractor what works for your ground.</p>

      <h2 id="coverage">How far does a ton go?</h2>
      <p>At about 1.4 tons per cubic yard, 1 ton of gravel is roughly 0.71 cubic yards and covers about:</p>
      <ul>
        <li><strong>116 sq ft</strong> at 2 inches deep</li>
        <li><strong>77 sq ft</strong> at 3 inches deep</li>
        <li><strong>58 sq ft</strong> at 4 inches deep</li>
      </ul>

      <h2 id="tips">Buying tips</h2>
      <ul>
        <li><strong>Choose the right stone:</strong> angular crushed stone locks together for driveways and bases; rounded pea gravel is comfortable underfoot but shifts, so it suits paths and play areas with edging.</li>
        <li><strong>Lay landscape fabric</strong> under decorative gravel to slow weeds and stop the stone sinking into the soil.</li>
        <li><strong>Check delivery minimums</strong>: many yards have a minimum load or a flat fee, which can make a slightly bigger order cheaper per ton.</li>
        <li><strong>Need only the volume?</strong> The <Link href="/cubic-yard-calculator/">cubic yard calculator</Link> handles any loose material. Leveling sand under pavers is covered by the <Link href="/sand-calculator/">sand calculator</Link>.</li>
      </ul>
      <p>Densities shown are typical values for estimating. Confirm quantities and weights with your supplier before ordering. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
