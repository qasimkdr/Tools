import Link from "next/link";

/** Brief + competitor findings: docs/research/sand-calculator.md · research/sand-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the sand calculator</h2>
      <ol>
        <li><strong>Measure the area</strong> (rectangle, circle or known square footage) in any unit.</li>
        <li><strong>Enter the depth of sand</strong>: about 1 inch for paver bedding, 6–12 inches for a sandbox.</li>
        <li><strong>Choose dry, damp or wet sand</strong> to set the density, or type your supplier&apos;s figure.</li>
        <li><strong>Add a little extra</strong> (10% is the default) and an optional price per ton or per cubic yard.</li>
      </ol>
      <p>The result shows tons, cubic yards, cubic feet, cubic meters, pounds and the number of 50 lb bags (change the bag size in the page link if you buy 40 or 60 lb bags).</p>

      <h2 id="formula">Sand calculation formula</h2>
      <div className="formula">Volume (yd³) = length (ft) × width (ft) × depth (ft) ÷ 27<br />Weight (tons) = volume × density<br />Bags = weight (lb) ÷ bag weight</div>

      <h2 id="weight">How much does sand weigh?</h2>
      <table>
        <thead><tr><th>Sand</th><th>Per cubic yard</th><th>Per cubic foot</th></tr></thead>
        <tbody>
          <tr><td>Dry</td><td>≈ 1.35 tons (2,700 lb)</td><td>≈ 100 lb</td></tr>
          <tr><td>Damp</td><td>≈ 1.5 tons (3,000 lb)</td><td>≈ 111 lb</td></tr>
          <tr><td>Wet</td><td>≈ 1.62 tons (3,240 lb)</td><td>≈ 120 lb</td></tr>
        </tbody>
      </table>
      <p>Moisture is the biggest variable: water fills the spaces between grains, so stockpiled sand after rain weighs noticeably more than dry bagged sand. Grain size and mineral content matter too, so for big orders ask your supplier for their figure.</p>

      <h2 id="examples">Worked examples</h2>
      <h3>Paver patio bedding: 12 × 12 ft, 1 inch deep</h3>
      <p>12 × 12 × (1 ÷ 12) = 12 cubic feet = <strong>0.44 cubic yards</strong>. Dry sand at 1.35 tons per yard is <strong>0.6 tons</strong> (1,200 lb), about <strong>24 bags</strong> of 50 lb. Add a few more bags for screeding and sweeping into joints.</p>
      <h3>Kids&apos; sandbox: 6 × 6 ft, 12 inches deep</h3>
      <p>6 × 6 × 1 = 36 cubic feet = <strong>1.33 cubic yards</strong> ≈ <strong>1.8 tons</strong> of dry play sand, or 72 bags of 50 lb. At that size, a bulk delivery is usually cheaper than bags.</p>

      <h2 id="types">Which sand for which job?</h2>
      <ul>
        <li><strong>Concrete / coarse sand:</strong> bedding layer under pavers and flagstones, and concrete mixes.</li>
        <li><strong>Masonry sand:</strong> finer and smoother, for mortar, and often used for volleyball courts and sandboxes.</li>
        <li><strong>Play sand:</strong> washed and screened for children&apos;s sandboxes.</li>
        <li><strong>Polymeric sand:</strong> swept into paver joints, then hardens when wetted to lock pavers and resist weeds.</li>
        <li><strong>Leveling / fill sand:</strong> general backfill and leveling under pools or sheds; ask what your installer specifies.</li>
      </ul>

      <h2 id="tips">Tips</h2>
      <ul>
        <li><strong>Pavers need a base:</strong> sand is a thin leveling layer, laid on top of a compacted gravel base. Estimate the base with the <Link href="/gravel-and-stone-calculator/">gravel calculator</Link>.</li>
        <li><strong>Don&apos;t use extra-thick bedding:</strong> more than about 1 inch of sand under pavers can let them shift and sink.</li>
        <li><strong>Volume only?</strong> The <Link href="/cubic-yard-calculator/">cubic yard calculator</Link> works for any loose fill.</li>
        <li><strong>Check your vehicle:</strong> a cubic yard of damp sand can weigh 1.5 tons, more than many pickups can safely carry.</li>
      </ul>
      <p>Weights are typical estimates. Confirm with your supplier before ordering. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
