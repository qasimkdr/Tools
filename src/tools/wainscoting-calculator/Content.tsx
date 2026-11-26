import Link from "next/link";

/** Brief + competitor findings: docs/research/wainscoting-calculator.md · research/wainscoting-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the wainscoting calculator</h2>
      <ol>
        <li>Measure the wall width and choose the wainscoting height (floor to the underside of the chair rail cap).</li>
        <li>Enter the number of panels, the stile width between them, and the top and bottom rails. The bottom rail includes the baseboard.</li>
        <li>Read the panel size, then use the marking list to snap a line for each box. The moulding total and sticks to buy go on your shopping list.</li>
      </ol>

      <h2 id="formulas">Wainscoting layout formulas</h2>
      <div className="formula">Panel width = (wall width − stile width × (panels + 1)) ÷ panels<br />Panel height = wainscoting height − top rail − bottom rail<br />Moulding per box = 2 × (panel width + panel height)<br />Total moulding = moulding per box × panels × (1 + waste %)<br />Sticks = total moulding ÷ stick length, rounded up</div>
      <p>The calculator assumes a stile at both ends of the wall, so a wall with 4 panels has 5 stiles. For board and batten, the stiles are the battens and the panel width is the gap between them.</p>

      <h2 id="example">Worked example</h2>
      <p>A 12-foot wall (144 inches), 32-inch wainscoting, 4 panels, 3½-inch stiles and top rail, and a 5½-inch bottom rail:</p>
      <ul>
        <li>Panel width = (144 − 3.5 × 5) ÷ 4 = 126.5 ÷ 4 = <strong>31⅝ inches</strong>.</li>
        <li>Panel height = 32 − 3.5 − 5.5 = <strong>23 inches</strong>.</li>
        <li>Moulding per box = 2 × (31.625 + 23) = 109.25 inches; for 4 boxes, 437 inches, or <strong>36.4 feet</strong>.</li>
        <li>With 10% waste: 480.7 inches = 40.1 feet, so buy <strong>6 eight-foot sticks</strong> (480.7 ÷ 96 = 5.01, rounded up).</li>
        <li>The first box starts 3½ inches from the corner, and box centers fall at about 19⁵⁄₁₆, 54⁷⁄₁₆, 89⁹⁄₁₆ and 124¹¹⁄₁₆ inches.</li>
      </ul>

      <h2 id="choosing">Choosing height, panel count and spacing</h2>
      <table>
        <thead><tr><th>Decision</th><th>Common choice</th><th>Why</th></tr></thead>
        <tbody>
          <tr><td>Height</td><td>About ⅓ of the wall (32–36 in on an 8 ft wall)</td><td>Classic proportion; taller (48–60 in) for high ceilings</td></tr>
          <tr><td>Box width</td><td>Roughly 20–36 in</td><td>Wide enough to read as panels, narrow enough to repeat</td></tr>
          <tr><td>Stile and rail width</td><td>3–4 in, the same everywhere</td><td>Even margins make the frames look deliberate</td></tr>
          <tr><td>Waste</td><td>10–15%</td><td>Each box has 8 miter cuts; short offcuts are hard to reuse</td></tr>
        </tbody>
      </table>
      <h2 id="tips">Tips before you cut</h2>
      <ul>
        <li>Check that the floor and chair rail are level; measure the rail height from a level line, not the floor.</li>
        <li>Lay out each wall separately and aim for similar box widths around the room.</li>
        <li>Mark outlets and switches first. Changing the panel count by one often moves a box edge off an outlet.</li>
        <li>Cut one box, dry-fit it, and confirm the size before cutting the rest.</li>
      </ul>
      <p>Measure the chair rail and baseboard run with the <Link href="/linear-feet-calculator/">linear feet calculator</Link>, price solid wood panels with the <Link href="/board-foot-calculator/">board foot calculator</Link>, or work out wall area for paint with the <Link href="/square-footage-calculator/">square footage calculator</Link>. Building a new wall first? Use the <Link href="/stud-calculator/">stud calculator</Link>. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
