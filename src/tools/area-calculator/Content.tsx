import Link from "next/link";

/** Brief + competitor findings: docs/research/area-calculator.md · research/area-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the area calculator</h2>
      <ol>
        <li>Choose <strong>Area</strong> for a flat shape or <strong>Surface area</strong> for a 3D solid.</li>
        <li>Pick the shape and a unit, then enter the measurements shown. The formula appears under the inputs.</li>
        <li>Read the area in square units, plus perimeter, volume, slant height or other useful values, and unit conversions for feet, meters, inches and centimeters.</li>
      </ol>

      <h2 id="formulas">Area formulas</h2>
      <table>
        <thead><tr><th>Shape</th><th>Area</th></tr></thead>
        <tbody>
          <tr><td>Rectangle</td><td>l × w</td></tr>
          <tr><td>Square</td><td>a²</td></tr>
          <tr><td>Triangle</td><td>½ × b × h (or Heron&apos;s formula)</td></tr>
          <tr><td>Circle</td><td>π r²</td></tr>
          <tr><td>Ellipse</td><td>π a b</td></tr>
          <tr><td>Trapezoid</td><td>½ (a + b) h</td></tr>
          <tr><td>Parallelogram</td><td>b × h</td></tr>
          <tr><td>Sector</td><td>(θ ÷ 360) π r²</td></tr>
        </tbody>
      </table>

      <h2 id="surface">Surface area formulas</h2>
      <table>
        <thead><tr><th>Solid</th><th>Surface area</th></tr></thead>
        <tbody>
          <tr><td>Cube</td><td>6a²</td></tr>
          <tr><td>Rectangular box</td><td>2(lw + lh + wh)</td></tr>
          <tr><td>Sphere</td><td>4π r²</td></tr>
          <tr><td>Cylinder</td><td>2π r² + 2π r h</td></tr>
          <tr><td>Cone</td><td>π r² + π r √(r² + h²)</td></tr>
          <tr><td>Square pyramid</td><td>a² + 2a √((a/2)² + h²)</td></tr>
          <tr><td>Capsule</td><td>2π r (2r + h)</td></tr>
        </tbody>
      </table>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>Room floor</strong>, 12 × 10 ft rectangle: 120 ft² (13.33 sq yd, 11.15 m²).</li>
        <li><strong>Circle</strong> with radius 5 cm: π × 25 = <strong>78.54 cm²</strong>; circumference 31.42 cm.</li>
        <li><strong>Box</strong> 12 × 10 × 6 in: 2(120 + 72 + 60) = <strong>504 in²</strong> of cardboard; volume 720 in³.</li>
        <li><strong>Cone</strong> with radius 5 and height 6: slant height √61 ≈ 7.81, so SA = 25π + 5π × 7.81 ≈ <strong>201.22</strong> square units.</li>
      </ul>
      <p>For floors and rooms with several sections and costs, use the <Link href="/square-footage-calculator/">square footage calculator</Link>. Need the space inside a solid? Try the <Link href="/cylinder-volume-calculator/">cylinder volume calculator</Link> or the <Link href="/cone-volume-calculator/">cone volume calculator</Link>. To find a missing side of a right triangle first, use the <Link href="/hypotenuse-calculator/">hypotenuse calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
