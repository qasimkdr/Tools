import Link from "next/link";

/** Brief + competitor findings: docs/research/roofing-calculator.md · research/roofing-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the roofing calculator</h2>
      <ol>
        <li>Choose the roof shape and enter the house length and width, measured along the outside walls.</li>
        <li>Enter the eave overhang and the roof pitch (inches of rise per 12 inches of run, such as 6 for a 6/12 roof).</li>
        <li>Set the waste allowance and the bundles per square from your shingle wrapper. Add a price per square for a cost estimate.</li>
      </ol>

      <h2 id="formulas">Roofing formulas</h2>
      <div className="formula">Pitch factor = √(1 + (pitch ÷ 12)²)<br />Roof area = (length + 2 × overhang) × (width + 2 × overhang) × pitch factor<br />Squares = roof area ÷ 100<br />Bundles = squares × (1 + waste %) × bundles per square, rounded up<br />Hip length = (short side ÷ 2) × √(2 + (pitch ÷ 12)²)</div>
      <p>The pitch factor converts flat footprint area into sloped roof area. It works for gable, hip and shed roofs alike as long as every plane has the same pitch.</p>

      <h2 id="example">Worked example</h2>
      <p>A 40 × 30 ft house with 1 ft overhangs and a 6/12 gable roof:</p>
      <ul>
        <li>Footprint = 42 × 32 = 1,344 sq ft. Pitch factor = √(1 + 0.5²) = 1.118.</li>
        <li>Roof area = 1,344 × 1.118 = <strong>1,503 sq ft</strong>, or 15.03 squares.</li>
        <li>With 10% waste: 16.53 squares × 3 bundles = 49.6, so buy <strong>50 bundles</strong>.</li>
        <li>Ridge = 42 ft. Each rafter runs 16 × 1.118 = 17.9 ft, so the four rakes total 71.6 ft; with 84 ft of eaves, drip edge is about <strong>155.6 ft</strong>.</li>
        <li>As a hip roof, the area is the same, but the ridge shrinks to 10 ft and four 24 ft hips add 96 ft, so you need 106 ft of ridge cap.</li>
      </ul>

      <h2 id="pitch-table">Pitch factors</h2>
      <table>
        <thead><tr><th>Pitch</th><th>Angle</th><th>Factor</th><th>Extra area vs flat</th></tr></thead>
        <tbody>
          <tr><td>3/12</td><td>14.0°</td><td>1.031</td><td>3.1%</td></tr>
          <tr><td>4/12</td><td>18.4°</td><td>1.054</td><td>5.4%</td></tr>
          <tr><td>6/12</td><td>26.6°</td><td>1.118</td><td>11.8%</td></tr>
          <tr><td>8/12</td><td>33.7°</td><td>1.202</td><td>20.2%</td></tr>
          <tr><td>10/12</td><td>39.8°</td><td>1.302</td><td>30.2%</td></tr>
          <tr><td>12/12</td><td>45.0°</td><td>1.414</td><td>41.4%</td></tr>
        </tbody>
      </table>

      <h2 id="angle">Roof pitch in degrees</h2>
      <p>Some plans and phone apps give the roof slope as an angle instead of a ratio. Convert with the tangent: pitch = 12 × tan(angle), and angle = arctan(pitch ÷ 12). A 30° roof is 12 × tan 30° = 6.93/12, and a 6/12 roof is 26.6°. You can enter either in the calculator.</p>
      <div className="formula">Pitch (in per 12) = 12 × tan(angle) · Angle = arctan(pitch ÷ 12)<br />Pitch factor = 1 ÷ cos(angle)</div>

      <h2 id="nails">Roofing nails</h2>
      <p>Shingle makers specify how many nails go in each shingle, and their installation instructions take precedence. Four nails per shingle is the common standard, and six are typical in high-wind areas or for a higher wind warranty (GAF, for example, ties its wind warranty to the nail count for some shingles). Shingles per bundle vary by product, so the calculator uses the count from your wrapper:</p>
      <div className="formula">Nails = bundles × shingles per bundle × nails per shingle</div>
      <p>For 50 bundles of a shingle packed 26 to a bundle, nailed 4 per shingle: 50 × 26 × 4 = <strong>5,200 nails</strong> for the field shingles. Starter strip, hip and ridge caps need extra.</p>

      <h2 id="tips">Tips for an accurate order</h2>
      <ul>
        <li>Measure each roof section with a different pitch on its own and add the results; dormers and porches often have their own pitch.</li>
        <li>Find the pitch with a level: hold it level against a rafter or the roof, measure 12 inches along it, and measure straight down to the roof.</li>
        <li>Buy starter strip for the eaves and rakes and ridge-cap shingles for the ridge and hips; they are usually sold separately from field shingles.</li>
        <li>Bundle counts vary by product. The wrapper or spec sheet lists bundles per square and coverage.</li>
      </ul>
      <p>Work out rafter cuts with the <Link href="/rafter-length-calculator/">rafter length calculator</Link>, size the eave underside with the <Link href="/soffit-calculator/">soffit calculator</Link>, measure the house footprint with the <Link href="/square-footage-calculator/">square footage calculator</Link>, or total gutter and trim runs with the <Link href="/linear-feet-calculator/">linear feet calculator</Link>. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
