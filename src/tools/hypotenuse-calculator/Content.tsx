import Link from "next/link";

/** Brief + competitor findings: docs/research/hypotenuse-calculator.md · research/hypotenuse-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the hypotenuse calculator</h2>
      <ol>
        <li><strong>Pick what you know:</strong> both legs, the hypotenuse and one leg, or one leg and an angle.</li>
        <li><strong>Enter the values</strong> and optionally pick a unit so results are labeled.</li>
        <li><strong>Read the answer and steps.</strong> You also get both acute angles, the area, the perimeter and the altitude to the hypotenuse.</li>
      </ol>

      <h2 id="formula">The Pythagorean theorem</h2>
      <p>In a right triangle, the square of the hypotenuse equals the sum of the squares of the two legs:</p>
      <div className="formula">a² + b² = c²   →   c = √(a² + b²)<br />missing leg:  a = √(c² − b²)<br />with an angle:  c = opposite ÷ sin θ  or  c = adjacent ÷ cos θ</div>
      <p>The hypotenuse (c) is always opposite the 90° angle and is always the longest side. If a calculation gives a leg longer than the hypotenuse, a value was entered in the wrong box.</p>

      <h2 id="examples">Worked examples</h2>
      <h3>Legs 6 and 8</h3>
      <p>6² + 8² = 36 + 64 = 100, and √100 = <strong>10</strong>. Area = 6 × 8 ÷ 2 = 24, perimeter = 24, and the angles are about 36.87° and 53.13°.</p>
      <h3>Missing leg: hypotenuse 13, leg 5</h3>
      <p>13² − 5² = 169 − 25 = 144, and √144 = <strong>12</strong>.</p>
      <h3>A ladder against a wall</h3>
      <p>A ladder&apos;s foot is 4 ft from the wall and its top touches the wall 15 ft up. The ladder length is √(4² + 15²) = √241 ≈ <strong>15.52 ft</strong>.</p>
      <h3>TV screen size</h3>
      <p>Screen sizes are measured on the diagonal. A screen 48 in wide and 27 in tall has a diagonal of √(48² + 27²) = √3033 ≈ <strong>55.07 in</strong>, sold as a 55&quot; TV. Its sides are in a 16:9 ratio. Check any aspect ratio with the <Link href="/ratio-calculator/">ratio calculator</Link>.</p>

      <h2 id="special">Special right triangles</h2>
      <table>
        <thead><tr><th>Triangle</th><th>Side ratio</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>45-45-90</td><td>1 : 1 : √2</td><td>legs 10 → hypotenuse ≈ 14.142</td></tr>
          <tr><td>30-60-90</td><td>1 : √3 : 2</td><td>short leg 5 → long leg ≈ 8.660, hypotenuse 10</td></tr>
        </tbody>
      </table>

      <h2 id="triples">Common Pythagorean triples</h2>
      <p>Whole-number right triangles, handy for checking homework or squaring a corner. Multiply any triple by the same number to get another (3-4-5 → 6-8-10 → 9-12-15).</p>
      <table>
        <thead><tr><th>a</th><th>b</th><th>c</th></tr></thead>
        <tbody>
          <tr><td>3</td><td>4</td><td>5</td></tr>
          <tr><td>5</td><td>12</td><td>13</td></tr>
          <tr><td>8</td><td>15</td><td>17</td></tr>
          <tr><td>7</td><td>24</td><td>25</td></tr>
          <tr><td>20</td><td>21</td><td>29</td></tr>
          <tr><td>9</td><td>40</td><td>41</td></tr>
        </tbody>
      </table>
      <p><strong>Builder&apos;s 3-4-5 rule:</strong> mark 3 ft along one wall and 4 ft along the other. If the diagonal between the marks is exactly 5 ft, the corner is square. For larger spaces use 6-8-10 or 9-12-15.</p>

      <h2 id="mistakes">Common mistakes</h2>
      <ul>
        <li><strong>Adding before squaring:</strong> c ≠ a + b. Square first, add, then take the square root.</li>
        <li><strong>Using it on a non-right triangle:</strong> without a 90° angle, use the law of cosines instead.</li>
        <li><strong>Mixing units:</strong> convert both legs to the same unit first (for example, 2 ft 6 in = 2.5 ft).</li>
        <li><strong>Degrees vs radians:</strong> this calculator uses degrees. Scientific calculators set to radians give different trig results.</li>
      </ul>
      <p>Similar right triangles scale proportionally. To scale a triangle&apos;s sides, use the <Link href="/proportion-calculator/">proportion calculator</Link>. Browse more <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
