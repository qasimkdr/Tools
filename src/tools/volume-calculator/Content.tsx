import Link from "next/link";

/** Brief + competitor findings: docs/research/volume-calculator.md · research/volume-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the volume calculator</h2>
      <ol>
        <li>Choose a shape, from boxes and tanks to spheres, cones, prisms, buckets and oval ponds.</li>
        <li>Pick a unit and enter the measurements. For tanks and ponds, use inside dimensions and the water depth.</li>
        <li>Read the volume in cubic units plus US and imperial gallons, liters, cubic feet, cubic meters and cubic yards.</li>
      </ol>

      <h2 id="formulas">Volume formulas</h2>
      <table>
        <thead><tr><th>Shape</th><th>Volume</th></tr></thead>
        <tbody>
          <tr><td>Rectangular box / tank</td><td>l × w × h</td></tr>
          <tr><td>Cube</td><td>a³</td></tr>
          <tr><td>Cylinder</td><td>π r² h</td></tr>
          <tr><td>Sphere</td><td>(4/3) π r³</td></tr>
          <tr><td>Cone</td><td>(1/3) π r² h</td></tr>
          <tr><td>Pyramid</td><td>(1/3) × base area × h</td></tr>
          <tr><td>Triangular prism</td><td>½ × b × a × l</td></tr>
          <tr><td>Oval tank / pond</td><td>π a b h</td></tr>
          <tr><td>Conical frustum</td><td>(1/3) π h (r² + rR + R²)</td></tr>
        </tbody>
      </table>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>Garden pond</strong> 10 × 6 ft, 3 ft average depth: 180 ft³ × 7.4805 = <strong>1,346 US gallons</strong> (5,097 L).</li>
        <li><strong>Round stock tank</strong> 8 ft across (radius 4 ft), 3 ft deep: π × 16 × 3 = 150.8 ft³ ≈ <strong>1,128 gallons</strong>.</li>
        <li><strong>Ball</strong> with radius 4 in: (4/3) × π × 64 = <strong>268.08 in³</strong>.</li>
      </ul>

      <h2 id="units">Volume conversions</h2>
      <table>
        <thead><tr><th>1 unit</th><th>Liters</th><th>US gallons</th></tr></thead>
        <tbody>
          <tr><td>Cubic inch</td><td>0.016387</td><td>0.004329</td></tr>
          <tr><td>Cubic foot</td><td>28.317</td><td>7.4805</td></tr>
          <tr><td>Cubic yard</td><td>764.55</td><td>201.97</td></tr>
          <tr><td>Cubic meter</td><td>1,000</td><td>264.17</td></tr>
        </tbody>
      </table>
      <p>Dedicated tools add more detail: the <Link href="/cylinder-volume-calculator/">cylinder volume calculator</Link> and <Link href="/cone-volume-calculator/">cone volume calculator</Link> handle partial fills and frustums, and the <Link href="/cubic-yard-calculator/">cubic yard calculator</Link> orders soil, mulch and gravel. For surfaces, use the <Link href="/area-calculator/">area calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
