import Link from "next/link";

/** Brief + competitor findings: docs/research/right-triangle-calculator.md · research/right-triangle-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the right triangle calculator</h2>
      <ol>
        <li><strong>Enter any two values</strong>: two sides, or one side and one acute angle. Leave the other boxes blank.</li>
        <li><strong>Read the solved triangle</strong>: all three sides, both acute angles, area, perimeter, the altitude to the hypotenuse, and the inradius and circumradius.</li>
        <li><strong>Check the steps</strong> to see which formula was used.</li>
      </ol>
      <p>Labels follow the diagram: legs <strong>a</strong> and <strong>b</strong>, hypotenuse <strong>c</strong>, angle <strong>α</strong> opposite leg a and angle <strong>β</strong> opposite leg b. Only need the long side? The <Link href="/hypotenuse-calculator/">hypotenuse calculator</Link> is a quicker, focused version.</p>

      <h2 id="formulas">Right triangle formulas</h2>
      <div className="formula">Pythagorean theorem:  a² + b² = c²<br />SOHCAHTOA:  sin α = a/c ·  cos α = b/c ·  tan α = a/b<br />Angles:  α + β = 90°<br />Area = ½ab ·  Perimeter = a + b + c ·  Altitude to c = ab/c<br />Inradius r = (a + b − c)/2 ·  Circumradius R = c/2</div>

      <h2 id="examples">Worked examples</h2>
      <h3>Two legs: a = 6, b = 8</h3>
      <p>c = √(36 + 64) = <strong>10</strong>; α = arctan(6/8) ≈ 36.87°, β ≈ 53.13°; area 24, perimeter 24, altitude 4.8, inradius 2, circumradius 5.</p>
      <h3>Hypotenuse and an angle: c = 10, α = 30°</h3>
      <p>a = 10 × sin 30° = <strong>5</strong>, b = 10 × cos 30° ≈ <strong>8.660</strong>. This is a 30-60-90 triangle, with sides in the ratio 1 : √3 : 2.</p>
      <h3>A leg and the angle opposite it: a = 7, α = 35°</h3>
      <p>c = 7 ÷ sin 35° ≈ <strong>12.204</strong>, b = 7 ÷ tan 35° ≈ <strong>9.997</strong>.</p>
      <h3>Real life: a wheelchair ramp</h3>
      <p>A ramp rising 2 ft over a 24 ft horizontal run (a common 1:12 slope) has an angle of arctan(2/24) ≈ <strong>4.76°</strong> and a surface length of √(2² + 24²) ≈ <strong>24.08 ft</strong>. Slopes are often written as ratios; see the <Link href="/ratio-calculator/">ratio calculator</Link>.</p>

      <h2 id="special">Special right triangles</h2>
      <table>
        <thead><tr><th>Type</th><th>Angles</th><th>Side ratio</th></tr></thead>
        <tbody>
          <tr><td>Isosceles right</td><td>45° – 45° – 90°</td><td>1 : 1 : √2</td></tr>
          <tr><td>Half-equilateral</td><td>30° – 60° – 90°</td><td>1 : √3 : 2</td></tr>
          <tr><td>3-4-5 triple</td><td>≈ 36.87° – 53.13° – 90°</td><td>3 : 4 : 5</td></tr>
        </tbody>
      </table>
      <p>An <strong>isosceles right triangle</strong> with legs of 5 has a hypotenuse of 5√2 ≈ 7.071 and an area of 12.5.</p>

      <h2 id="which">Which formula do I need?</h2>
      <ul>
        <li><strong>Two sides known:</strong> use a² + b² = c² for the third side, then inverse trig for the angles.</li>
        <li><strong>Hypotenuse + angle:</strong> opposite = c × sin, adjacent = c × cos.</li>
        <li><strong>Leg + angle:</strong> use tan to get the other leg and sin or cos for the hypotenuse, depending on whether the angle is opposite or next to the leg.</li>
        <li><strong>Two angles only:</strong> not solvable for lengths. Similar triangles share angles but differ in size; scale them with the <Link href="/proportion-calculator/">proportion calculator</Link>.</li>
      </ul>

      <h2 id="mistakes">Common mistakes</h2>
      <ul>
        <li><strong>Calculator in radians:</strong> angles here are in degrees. Switch your handheld calculator to DEG mode.</li>
        <li><strong>Mixing up opposite and adjacent:</strong> they depend on which angle you use. Opposite is across from the angle; adjacent touches it (and isn&apos;t the hypotenuse).</li>
        <li><strong>A &quot;leg&quot; longer than the hypotenuse:</strong> impossible. The hypotenuse is always the longest side.</li>
      </ul>
      <p>More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
