import Link from "next/link";

/** Brief + competitor findings: docs/research/recessed-light-calculator.md · research/recessed-light-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the recessed light calculator</h2>
      <ol>
        <li>Enter the room&apos;s <strong>length</strong>, <strong>width</strong> and <strong>ceiling height</strong>.</li>
        <li>Leave the spacing blank to use the ceiling height ÷ 2 rule, or enter the maximum spacing from your fixture&apos;s spec sheet.</li>
        <li>Read how many lights you need, the exact spacing in each direction and how far the first light sits from each wall. The diagram shows the layout to scale.</li>
      </ol>

      <h2 id="formula">Recessed lighting layout formulas</h2>
      <div className="formula">Max spacing ≈ ceiling height ÷ 2<br />Lights per side = room dimension ÷ spacing, rounded up<br />Actual spacing = room dimension ÷ lights per side · Wall distance = actual spacing ÷ 2</div>

      <h2 id="example">Worked example</h2>
      <p>A <strong>14 × 12 ft</strong> living room with an <strong>8 ft</strong> ceiling: spacing ≤ 4 ft. Along 14 ft: 14 ÷ 4 = 3.5 → <strong>4 lights</strong>, 3 ft 6 in apart, 1 ft 9 in from the end walls. Along 12 ft: 12 ÷ 4 = <strong>3 lights</strong>, 4 ft apart, 2 ft from the side walls. Total: <strong>12 lights</strong>.</p>

      <h2 id="table">Spacing by ceiling height</h2>
      <table>
        <thead><tr><th>Ceiling height</th><th>Spacing between lights</th><th>Distance from wall</th></tr></thead>
        <tbody>
          {[8, 9, 10, 12].map((h) => <tr key={h}><td>{h} ft</td><td>{h / 2} ft</td><td>{h / 4} ft</td></tr>)}
        </tbody>
      </table>

      <h2 id="tips">Layout tips</h2>
      <ul>
        <li><strong>Layer your lighting</strong>: recessed lights for ambient light, plus task lights over counters and accent lights for art.</li>
        <li><strong>Mind the joists</strong>: shift a row a few inches rather than cut framing, and keep rows parallel to the main wall.</li>
        <li><strong>Use dimmers</strong> so one layout works for both bright tasks and relaxing evenings.</li>
      </ul>
      <p>Measure the room with the <Link href="/square-footage-calculator/">square footage calculator</Link>, check cable sizes with the <Link href="/wire-size-calculator/">wire size calculator</Link>, or size a room air conditioner with the <Link href="/btu-calculator/">BTU calculator</Link>. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
