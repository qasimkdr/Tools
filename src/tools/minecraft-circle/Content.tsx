import Link from "next/link";

/** Brief + competitor findings: docs/research/minecraft-circle.md · research/minecraft-circle/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the circle generator</h2>
      <ol>
        <li>Pick <strong>Circle</strong> and enter a diameter in blocks, or pick <strong>Oval</strong> and enter a width and height (up to 256).</li>
        <li>Choose a <strong>thin outline</strong>, a <strong>thick outline</strong> or a <strong>filled</strong> disc.</li>
        <li>Follow the block chart, or open the row-by-row guide, which lists the columns to fill in each row. Download the chart as a PNG to keep it open next to your game.</li>
      </ol>

      <h2 id="how-it-works">How the circle is drawn</h2>
      <p>Every square on the grid is one block. A block belongs to the shape when its centre lies inside the true circle (or ellipse):</p>
      <div className="formula">((x + 0.5 − w/2) ÷ (w/2))² + ((y + 0.5 − h/2) ÷ (h/2))² ≤ 1</div>
      <p>where x and y are the block&apos;s column and row (starting at 0) and w and h are the width and height. Outlines keep only the filled blocks that touch the outside: a <strong>thin</strong> outline checks the four blocks beside each block, a <strong>thick</strong> outline also checks the four diagonals.</p>

      <h2 id="example">Example: a 21-block circle</h2>
      <p>A 21-block thin circle uses <strong>56 blocks</strong>. The top row is 7 blocks long (columns 8–14), the next row has pairs at columns 6–7 and 15–16, and the sides run straight for 7 blocks (rows 8–14). Filled, the same circle takes <strong>349 blocks</strong>, about 5 stacks and 29 blocks.</p>
      <table>
        <thead><tr><th>Diameter</th><th>Thin outline</th><th>Thick outline</th><th>Filled</th></tr></thead>
        <tbody>
          <tr><td>5</td><td>12</td><td>16</td><td>21</td></tr>
          <tr><td>10</td><td>28</td><td>36</td><td>80</td></tr>
          <tr><td>16</td><td>44</td><td>60</td><td>208</td></tr>
          <tr><td>21</td><td>56</td><td>80</td><td>349</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Building tips</h2>
      <ul>
        <li><strong>Mark the axes first.</strong> Lay a line of temporary blocks across the full width and height through the centre, then build one quarter and mirror it.</li>
        <li><strong>Count in runs.</strong> Curves are made of straight runs that get shorter towards the diagonals (for example 7, 2, 1, 1, 1, 2 …). The row guide lists each run.</li>
        <li><strong>Towers and domes.</strong> Stack the same circle for a tower; shrink the diameter layer by layer for a dome or sphere.</li>
      </ul>
      <p>Real-world round projects use the same geometry: the <Link href="/cylinder-volume-calculator/">cylinder volume calculator</Link> and <Link href="/cone-volume-calculator/">cone volume calculator</Link> handle the 3D maths, and the <Link href="/circle-skirt-calculator/">circle skirt calculator</Link> works out a circle from a waist size. More <Link href="/category/math/">math calculators</Link>.</p>
      <p className="text-sm subtle">Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.</p>
    </>
  );
}
