import Link from "next/link";

/** Brief + competitor findings: docs/research/stair-calculator.md · research/stair-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the stair calculator</h2>
      <ol>
        <li><strong>Measure the total rise</strong> from finished floor to finished floor and enter it in any unit.</li>
        <li><strong>Let the calculator choose the number of steps</strong> from a maximum riser height (7¾ in by default), or enter your own number of risers.</li>
        <li><strong>Enter the tread depth</strong>, then read the riser height, total run, stringer length, stair angle and code checks.</li>
      </ol>

      <h2 id="formula">Stair formulas</h2>
      <div className="formula">Risers = total rise ÷ maximum riser height (round up)<br />Riser height = total rise ÷ risers  ·  Treads = risers − 1<br />Total run = treads × tread depth<br />Stringer length = √(total rise² + total run²)  ·  Angle = arctan(riser ÷ tread)</div>

      <h2 id="examples">Worked examples</h2>
      <h3>Basement stairs: 105 in (8′ 9″) rise</h3>
      <div className="formula">105 ÷ 7.75 = 13.5 → 14 risers of 7.5 in<br />13 treads × 10 in = 130 in (10′ 10″) total run<br />Stringer = √(105² + 130²) = 167.1 in = 13′ 11 1/8″  ·  angle 36.9°</div>
      <h3>Deck stairs: 36 in rise, 10½ in treads</h3>
      <p>36 ÷ 7.75 = 4.6 → <strong>5 risers of 7.2 in</strong>, 4 treads, 42 in of run and a stringer of about 55.3 in (4′ 7 5/16″).</p>

      <h2 id="code">Common code limits (US residential)</h2>
      <table>
        <thead><tr><th>Item</th><th>IRC requirement</th></tr></thead>
        <tbody>
          <tr><td>Riser height</td><td>7¾ in maximum</td></tr>
          <tr><td>Tread depth</td><td>10 in minimum</td></tr>
          <tr><td>Variation within a flight</td><td>⅜ in maximum between largest and smallest</td></tr>
          <tr><td>Headroom</td><td>6 ft 8 in minimum</td></tr>
          <tr><td>Width</td><td>36 in minimum</td></tr>
          <tr><td>Nosing (treads under 11 in, solid risers)</td><td>¾ – 1¼ in</td></tr>
        </tbody>
      </table>
      <p>These come from the International Residential Code (section R311.7), which most US jurisdictions adopt, sometimes with amendments. Commercial stairs, and codes in other countries, have different limits. Always check with your local building department.</p>

      <h2 id="layout">Laying out a stringer</h2>
      <ol>
        <li>Set a framing square on the board with the riser height on the tongue and the tread depth on the blade, and mark each step.</li>
        <li>Trim the bottom of the stringer by the tread thickness so the first step isn&apos;t taller than the rest.</li>
        <li>Cut one stringer, test it in place, then use it as a pattern for the others (typically one every 16 inches or less, depending on the treads).</li>
      </ol>
      <p>The stringer is the hypotenuse of a right triangle, the same geometry as the <Link href="/right-triangle-calculator/">right triangle calculator</Link> and the <Link href="/rafter-length-calculator/">rafter length calculator</Link>. Pouring concrete steps instead? The <Link href="/concrete-calculator/">concrete calculator</Link> has a steps mode that gives cubic yards and bags.</p>

      <h2 id="tips">Tips</h2>
      <ul>
        <li><strong>Keep every step identical:</strong> uneven risers are a major trip hazard and fail inspection beyond ⅜ inch.</li>
        <li><strong>Check headroom along the whole flight</strong>, measured straight up from the line of the nosings.</li>
        <li><strong>Plan a landing</strong> if the rise is very large; each flight is calculated separately.</li>
      </ul>
      <p className="text-sm">For planning only. Confirm dimensions with your local building code before you cut. More <Link href="/category/construction/">construction calculators</Link>.</p>
    </>
  );
}
