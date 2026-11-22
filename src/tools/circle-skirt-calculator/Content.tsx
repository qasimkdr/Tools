import Link from "next/link";

/** Brief + competitor findings: docs/research/circle-skirt-calculator.md · research/circle-skirt-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the circle skirt calculator</h2>
      <ol>
        <li><strong>Pick the skirt type</strong>: full, three-quarter, half or quarter circle.</li>
        <li><strong>Enter your waist measurement and the finished length</strong>, in inches or centimeters.</li>
        <li><strong>Add your seam and hem allowances and the fabric width</strong>, then read the cutting radii and how much fabric to buy.</li>
      </ol>

      <h2 id="formula">Circle skirt formulas</h2>
      <div className="formula">Waist radius r = waist ÷ (2π × f)   (f = 1 full, ¾, ½ half, ¼ quarter)<br />Cut waist circle at r − seam allowance<br />Cut hem circle at R = r + skirt length + hem allowance<br />Full circle fabric: a square of 2R × 2R</div>

      <h2 id="example">Example: 28 in waist, 22 in long</h2>
      <table>
        <thead><tr><th>Type</th><th>Waist radius</th><th>Cutting radius (1 in hem)</th><th>Fabric on 60 in width</th></tr></thead>
        <tbody>
          <tr><td>Full circle</td><td>4.46 in</td><td>27.46 in</td><td>54.9 in ≈ 1.53 yd (one piece)</td></tr>
          <tr><td>Half circle</td><td>8.91 in</td><td>31.91 in</td><td>63.8 in ≈ 1.77 yd</td></tr>
          <tr><td>Quarter circle</td><td>17.83 in</td><td>40.83 in</td><td>40.8 in ≈ 1.13 yd</td></tr>
        </tbody>
      </table>
      <p>With a ⅝-inch waist seam allowance, cut the full-circle waist at 3.83 inches instead of 4.46.</p>

      <h2 id="cutting">Cutting a circle skirt</h2>
      <ol>
        <li>Fold the fabric in half, then in half again, so the folded corner is the circle&apos;s center (for a full circle).</li>
        <li>Using a tape measure pinned at the corner, mark an arc at the waist cutting radius and another at the hem cutting radius.</li>
        <li>Cut along both arcs through all layers, unfold, and stay-stitch the waist so the bias doesn&apos;t stretch.</li>
        <li>Add a waistband or facing and a zipper, hang overnight, then level and hem.</li>
      </ol>

      <h2 id="math">The math behind it</h2>
      <p>The waist is the circumference of a small circle, so its radius is circumference ÷ 2π, the same relationship used for any round object, like the <Link href="/cylinder-volume-calculator/">cylinder volume calculator</Link>. A half circle wraps the waist with half a circle, so its radius is twice as large. For exact fractional measurements like ⅝ in, the <Link href="/fraction-calculator/">fraction calculator</Link> adds and subtracts them easily, and the <Link href="/square-footage-calculator/">square footage calculator</Link> helps when estimating fabric area for other projects.</p>
      <p>More <Link href="/category/everyday/">everyday calculators</Link>.</p>
    </>
  );
}
