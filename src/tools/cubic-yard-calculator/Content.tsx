import Link from "next/link";

/** Brief + competitor findings: docs/research/cubic-yard-calculator.md · research/cubic-yard-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="cubic-feet">How many cubic feet are in a cubic yard?</h2>
      <p><strong>27.</strong> A yard is 3 feet, so a cube one yard long, wide and deep holds 3 × 3 × 3 = 27 cubic feet. Divide cubic feet by 27 to get cubic yards, or multiply cubic yards by 27 to get cubic feet.</p>

      <h2 id="how-to-use">How to use the cubic yard calculator</h2>
      <ol>
        <li><strong>Pick a shape:</strong> rectangle (beds, slabs, driveways), circle (tree rings, round pads, fire pits), or known area if you already have the square footage.</li>
        <li><strong>Enter the measurements in any unit.</strong> Mix feet, inches, yards, meters and centimeters; depth is usually easiest in inches.</li>
        <li><strong>Add an extra percentage</strong> for waste and settling (5–10% is typical), an optional price per cubic yard for a cost estimate, and a quantity if you have several identical areas.</li>
      </ol>

      <h2 id="formula">Cubic yard formulas</h2>
      <div className="formula">Rectangle: yd³ = length (ft) × width (ft) × depth (ft) ÷ 27<br />Circle: yd³ = π × (diameter ÷ 2)² × depth (ft) ÷ 27<br />Known area: yd³ = area (sq ft) × depth (ft) ÷ 27<br />Depth in inches → feet: inches ÷ 12</div>

      <h2 id="examples">Worked examples</h2>
      <h3>A garden bed: 12 ft × 14 ft, 9 inches deep</h3>
      <p>9 in = 0.75 ft, and 12 × 14 × 0.75 = 126 cubic feet. 126 ÷ 27 = <strong>4.67 cubic yards</strong>. With 5% extra that&apos;s about 4.9 yd³, so order 5 yards.</p>
      <h3>Mulch for a round bed: 10 ft across, 4 inches deep</h3>
      <p>π × 5² × (4 ÷ 12) ≈ 26.18 cubic feet ≈ <strong>0.97 cubic yards</strong>, almost exactly one yard.</p>
      <h3>Topsoil over 200 sq ft at 3 inches</h3>
      <p>200 × 0.25 ÷ 27 ≈ <strong>1.85 cubic yards</strong>.</p>

      <h2 id="coverage">How much does one cubic yard cover?</h2>
      <table>
        <thead><tr><th>Depth</th><th>Coverage per cubic yard</th><th>Typical use</th></tr></thead>
        <tbody>
          <tr><td>1 inch</td><td>324 sq ft</td><td>Top-dressing a lawn</td></tr>
          <tr><td>2 inches</td><td>162 sq ft</td><td>Refreshing mulch</td></tr>
          <tr><td>3 inches</td><td>108 sq ft</td><td>New mulch beds, gravel paths</td></tr>
          <tr><td>4 inches</td><td>81 sq ft</td><td>Concrete slabs, driveway gravel</td></tr>
          <tr><td>6 inches</td><td>54 sq ft</td><td>Raised beds, gravel base</td></tr>
        </tbody>
      </table>

      <h2 id="materials">Material tips</h2>
      <ul>
        <li><strong>Mulch:</strong> 2–3 inches is common for beds; deeper can smother roots. Bags are usually 2 cubic feet, so 13.5 bags make one cubic yard.</li>
        <li><strong>Topsoil and garden soil:</strong> it settles after watering, so add 10% or more for raised beds.</li>
        <li><strong>Gravel and stone:</strong> often sold by the ton, and typically 1.4–1.7 tons per cubic yard depending on the stone, so ask your supplier for their weight per yard.</li>
        <li><strong>Concrete:</strong> ready-mix is ordered in cubic yards. Concrete mixes are written as ratios such as 1:2:3 (cement:sand:gravel); work out each part with the <Link href="/ratio-calculator/">ratio calculator</Link>.</li>
        <li><strong>Hauling it yourself:</strong> a cubic yard of soil or gravel can weigh a ton or more, well over many pickups&apos; payload. Check before you load.</li>
      </ul>

      <h2 id="mistakes">Common mistakes</h2>
      <ul>
        <li><strong>Forgetting to convert inches:</strong> 4 inches is 0.333 ft, not 4. Mixing units is the most common error, which is why the calculator converts each dimension for you.</li>
        <li><strong>Confusing square and cubic yards:</strong> square yards measure area (for sod or carpet); cubic yards measure volume (for loose fill).</li>
        <li><strong>Not allowing for settling:</strong> loose material compacts, so a little extra saves a second delivery fee.</li>
      </ul>
      <p>Browse more <Link href="/category/construction/">home and construction calculators</Link>, or see <Link href="/tools/">all calculators</Link>.</p>
    </>
  );
}
