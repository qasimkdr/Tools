import Link from "next/link";

/** Brief + competitor findings: docs/research/rafter-length-calculator.md · research/rafter-length-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the rafter length calculator</h2>
      <ol>
        <li><strong>Enter the building span</strong> (outside wall to outside wall), or the rafter run if you already know it.</li>
        <li><strong>Enter the roof pitch</strong> as rise per 12 (like 6/12) or as an angle in degrees.</li>
        <li><strong>Add the ridge board thickness and the overhang</strong>, then read the rafter length in feet and inches, the cut angles and the lumber length to buy.</li>
      </ol>

      <h2 id="formula">Rafter length formula</h2>
      <div className="formula">Run = span ÷ 2 − ridge thickness ÷ 2<br />Rise = run × pitch ÷ 12<br />Rafter (line) length = √(run² + rise²) = run × √(1 + (pitch/12)²)<br />Overhang length = horizontal overhang × √(1 + (pitch/12)²)</div>
      <p>The rafter is the hypotenuse of a right triangle whose legs are the run and the rise. The same math powers the <Link href="/hypotenuse-calculator/">hypotenuse calculator</Link> and the <Link href="/right-triangle-calculator/">right triangle calculator</Link>.</p>

      <h2 id="example">Example: 24 ft span, 6/12 pitch</h2>
      <div className="formula">Run = 24 ÷ 2 − 1.5 in ÷ 2 = 12 ft − 0.75 in = 11.9375 ft<br />Slope factor = √(1 + 0.5²) = 1.1180<br />Line length = 11.9375 × 1.1180 = 13.347 ft = 13′ 4 3/16″<br />12 in overhang × 1.1180 = 1′ 1 7/16″  →  total 14′ 5 9/16″ (buy 16 ft)</div>
      <p>The rise at the ridge is 5′ 11 5/8″ and the plumb cuts are at 26.6°.</p>

      <h2 id="pitch-table">Roof pitch to angle and slope factor</h2>
      <table>
        <thead><tr><th>Pitch</th><th>Angle</th><th>Slope factor</th><th>Rafter per 10 ft of run</th></tr></thead>
        <tbody>
          {[3, 4, 5, 6, 7, 8, 9, 10, 12].map((p) => { const f = Math.sqrt(1 + (p / 12) ** 2); return (
            <tr key={p}><td>{p}/12</td><td>{((Math.atan(p / 12) * 180) / Math.PI).toFixed(1)}°</td><td>{f.toFixed(3)}</td><td>{(10 * f).toFixed(2)} ft</td></tr>
          ); })}
        </tbody>
      </table>
      <p>Multiply the slope factor by a roof&apos;s footprint area to estimate the actual roof surface for shingles or sheathing. Get the footprint with the <Link href="/square-footage-calculator/">square footage calculator</Link>.</p>

      <h2 id="terms">Rafter terms</h2>
      <ul>
        <li><strong>Span:</strong> the width of the building between the outside of the walls.</li>
        <li><strong>Run:</strong> the horizontal distance a rafter covers, normally half the span.</li>
        <li><strong>Rise:</strong> the vertical height from the top of the wall plate to the ridge.</li>
        <li><strong>Birdsmouth:</strong> the notch where the rafter sits on the wall plate: a level seat cut and a plumb heel cut.</li>
        <li><strong>Tail:</strong> the part that extends past the wall to form the overhang (eave).</li>
      </ul>

      <h2 id="tips">Tips</h2>
      <ul>
        <li><strong>Cut one pattern rafter</strong>, test-fit it at both ends of the building, then use it to mark the rest.</li>
        <li><strong>Check the walls are parallel:</strong> measure the span at each end, since out-of-square walls change rafter lengths.</li>
        <li><strong>Building stairs too?</strong> The <Link href="/stair-calculator/">stair calculator</Link> uses the same rise-and-run geometry for stringers.</li>
      </ul>
      <p className="text-sm">Geometry only, not a structural design. Rafter size, spacing and connections must meet your local building code. More <Link href="/category/construction/">construction calculators</Link>.</p>
    </>
  );
}
