import Link from "next/link";

/** Brief: docs/research/square-footage-calculator.md · research/square-footage-calculator/report.md + research/how-to-calculate-square-footage/ */
export default function Content() {
  return (
    <>
      <h2 id="how-to">How to calculate square footage</h2>
      <ol>
        <li><strong>Measure length and width</strong> of the space in feet. For leftover inches, divide by 12: 10 ft 6 in = 10.5 ft.</li>
        <li><strong>Multiply length × width.</strong> A room 12 ft by 15 ft is 12 × 15 = <strong>180 square feet</strong>.</li>
        <li><strong>Split odd shapes into simple ones</strong> (rectangles, triangles, circles), calculate each, and add them up.</li>
        <li><strong>Add waste</strong> if you&apos;re buying materials: about 5–10% for flooring or tile.</li>
      </ol>
      <p>The calculator does all of this: add as many areas as you need, choose a shape and unit for each, and get the total in square feet, square meters, square yards and acres, plus a cost estimate.</p>

      <h2 id="formulas">Area formulas by shape</h2>
      <table>
        <thead><tr><th>Shape</th><th>Formula</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Rectangle / square</td><td>length × width</td><td>12 × 12 ft = 144 sq ft</td></tr>
          <tr><td>Triangle</td><td>½ × base × height</td><td>½ × 10 × 6 ft = 30 sq ft</td></tr>
          <tr><td>Circle</td><td>π × (diameter ÷ 2)²</td><td>10 ft across ≈ 78.54 sq ft</td></tr>
          <tr><td>Trapezoid</td><td>(side a + side b) ÷ 2 × height</td><td>(8 + 12) ÷ 2 × 5 = 50 sq ft</td></tr>
          <tr><td>L-shape</td><td>two rectangles, added</td><td>12×10 + 8×6 = 168 sq ft</td></tr>
        </tbody>
      </table>

      <h2 id="common">Common room sizes</h2>
      <table>
        <thead><tr><th>Room</th><th>Square feet</th><th>Room</th><th>Square feet</th></tr></thead>
        <tbody>
          <tr><td>10 × 10 ft</td><td>100</td><td>12 × 14 ft</td><td>168</td></tr>
          <tr><td>10 × 12 ft</td><td>120</td><td>12 × 16 ft</td><td>192</td></tr>
          <tr><td>12 × 12 ft</td><td>144</td><td>14 × 16 ft</td><td>224</td></tr>
          <tr><td>11 × 13 ft</td><td>143</td><td>20 × 20 ft</td><td>400</td></tr>
        </tbody>
      </table>

      <h2 id="units">Converting units</h2>
      <div className="formula">1 sq ft = 144 sq in · 1 sq yd = 9 sq ft · 1 sq m ≈ 10.764 sq ft · 1 acre = 43,560 sq ft</div>
      <p>From inches: multiply the two measurements and divide by 144. 120 in × 96 in = 11,520 sq in ÷ 144 = <strong>80 sq ft</strong>.</p>

      <h2 id="tips">Measuring tips</h2>
      <ul>
        <li><strong>Measure wall to wall</strong> at floor level, and round up to the next inch.</li>
        <li><strong>Closets and alcoves</strong> count as separate small rectangles. Add them if the flooring continues into them.</li>
        <li><strong>Need a diagonal?</strong> A room&apos;s diagonal follows the Pythagorean theorem. The <Link href="/hypotenuse-calculator/">hypotenuse calculator</Link> also helps you check that corners are square.</li>
        <li><strong>Walls for paint:</strong> wall height × room perimeter, minus doors and windows.</li>
        <li><strong>Going 3D?</strong> Area × depth gives volume: for concrete, soil or gravel, use the <Link href="/cubic-yard-calculator/">cubic yard calculator</Link> or the <Link href="/gravel-and-stone-calculator/">gravel calculator</Link>.</li>
      </ul>

      <h2 id="home">Square footage of a home</h2>
      <p>Measure each floor&apos;s finished living space and add them together. Real-estate listings typically leave out garages, unfinished basements, attics and porches, but rules vary by market and appraiser, so two &quot;square footage&quot; figures for the same house can differ. Ask how a listing was measured before comparing price per square foot. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
