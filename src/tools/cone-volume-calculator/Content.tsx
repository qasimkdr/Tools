import Link from "next/link";

/** Brief + competitor findings: docs/research/cone-volume-calculator.md · research/cone-volume-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the cone volume calculator</h2>
      <ol>
        <li><strong>Choose a full cone</strong> or a truncated cone (frustum), such as a bucket, lampshade or planter.</li>
        <li><strong>Enter the diameter or radius and the perpendicular height</strong>, each in any unit.</li>
        <li><strong>Read the volume</strong> in cubic feet, gallons, liters, cubic inches and cubic meters, plus the slant height and surface areas.</li>
      </ol>

      <h2 id="formula">Cone volume formulas</h2>
      <div className="formula">Cone: V = ⅓ × π × r² × h<br />Frustum: V = ⅓ × π × h × (R² + R·r + r²)<br />Slant height: l = √(r² + h²)  (frustum: √((R − r)² + h²))<br />Surface area: π r l + π r²</div>

      <h2 id="examples">Worked examples</h2>
      <h3>A cone 2 ft across and 3 ft tall</h3>
      <div className="formula">r = 1 ft  →  V = ⅓ × π × 1² × 3 = 3.142 ft³ = 23.5 US gallons<br />Slant height = √(1² + 3²) = 3.162 ft  ·  surface area = 13.08 ft²</div>
      <h3>A funnel 10 cm across and 10 cm deep</h3>
      <p>r = 5 cm, so V = ⅓ × π × 25 × 10 = 261.8 cm³, or about <strong>0.26 liters</strong>.</p>
      <h3>A bucket (frustum): bottom 2 ft, top 4 ft across, 3 ft tall</h3>
      <p>With radii 1 and 2: V = ⅓ × π × 3 × (4 + 2 + 1) = <strong>21.99 ft³</strong>, about 164.5 gallons.</p>

      <h2 id="compare">Cone vs cylinder vs sphere</h2>
      <table>
        <thead><tr><th>Shape (radius r, height h)</th><th>Volume</th></tr></thead>
        <tbody>
          <tr><td>Cylinder</td><td>π r² h</td></tr>
          <tr><td>Cone</td><td>⅓ π r² h (one third of the cylinder)</td></tr>
          <tr><td>Hemisphere (h = r)</td><td>⅔ π r³</td></tr>
        </tbody>
      </table>
      <p>For tanks and tubes, use the <Link href="/cylinder-volume-calculator/">cylinder volume calculator</Link>. Piles of sand or gravel are roughly cone-shaped, so this formula estimates a pile&apos;s volume; convert it to yards with the <Link href="/cubic-yard-calculator/">cubic yard calculator</Link>.</p>

      <h2 id="slant">Height vs slant height</h2>
      <p>The height in the formula is measured straight up from the center of the base to the tip, not along the sloping side. If you only know the slant height, the height, radius and slant height form a right triangle: h = √(l² − r²). The <Link href="/right-triangle-calculator/">right triangle calculator</Link> or <Link href="/hypotenuse-calculator/">hypotenuse calculator</Link> will solve it.</p>
      <p>More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
