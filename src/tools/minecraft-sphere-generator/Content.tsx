import Link from "next/link";

/** Brief + competitor findings: docs/research/minecraft-sphere-generator.md · research/minecraft-sphere-generator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the sphere generator</h2>
      <ol>
        <li>Enter the diameter in blocks, or switch to Ellipsoid and give the width, height and length separately.</li>
        <li>Choose thin hollow walls, thick hollow walls or a filled shape, and whether you want the whole shape or just a dome.</li>
        <li>Step through the layers from the bottom up. Each chart is a top-down view; the light squares are the layer you just built.</li>
      </ol>

      <h2 id="how-it-works">How the sphere is worked out</h2>
      <div className="formula">A block at column x, layer y, row z is part of the shape when its centre is inside the ellipsoid:<br />((x + 0.5 − W/2) ÷ (W/2))² + ((y + 0.5 − H/2) ÷ (H/2))² + ((z + 0.5 − L/2) ÷ (L/2))² ≤ 1<br />For a sphere, W = H = L = the diameter. Volume of a sphere ≈ 4/3 × π × r³</div>
      <p>A hollow shell keeps only the blocks that have an empty neighbour. Thin walls check the 6 face neighbours; thick walls check all 26 neighbours, including diagonals, so there are no gaps where blocks touch only at a corner.</p>

      <h2 id="example">Worked example: a 15-block sphere</h2>
      <ul>
        <li>The shape has 15 layers. With thin walls they hold 21, 48, 28, 32, 36, 40, 40, 40, 40, 40, 36, 32, 28, 48 and 21 blocks.</li>
        <li>Total: <strong>530 blocks</strong> (8 stacks + 18). Thick walls need <strong>890</strong>; a filled sphere <strong>1,791</strong>, close to 4/3 × π × 7.5³ ≈ 1,767.</li>
        <li>As a dome (the top 8 layers, starting with the widest ring), thin walls take <strong>285 blocks</strong>.</li>
        <li>The bottom and top layers are flat 21-block discs; the second and second-to-last layers are rings that hold the most blocks of the thin shell.</li>
      </ul>

      <h2 id="sizes">Blocks for common sphere sizes</h2>
      <table>
        <thead><tr><th>Diameter</th><th>Thin hollow</th><th>Thick hollow</th><th>Filled</th></tr></thead>
        <tbody>
          <tr><td>7</td><td>98</td><td>146</td><td>179</td></tr>
          <tr><td>11</td><td>278</td><td>458</td><td>739</td></tr>
          <tr><td>15</td><td>530</td><td>890</td><td>1,791</td></tr>
          <tr><td>21</td><td>1,082</td><td>1,850</td><td>4,945</td></tr>
          <tr><td>31</td><td>2,382</td><td>4,130</td><td>15,515</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Building tips</h2>
      <ul>
        <li>Build a temporary pillar at the centre to measure from; the red lines on each chart mark it.</li>
        <li>Use a cheap scaffold block for the lower half of a hollow sphere, then replace it from the inside.</li>
        <li>For glass domes and aquariums, choose thick walls so water can&apos;t leak through corner gaps.</li>
        <li>Big builds go faster if you place the widest middle ring first and work outwards from it.</li>
      </ul>
      <p>Plan flat rings and floors with the <Link href="/minecraft-circle/">Minecraft circle generator</Link>, size a portal with the <Link href="/nether-portal-calculator/">nether portal calculator</Link>, or work out real-world volumes with the <Link href="/volume-calculator/">volume calculator</Link> and <Link href="/cylinder-volume-calculator/">cylinder volume calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
