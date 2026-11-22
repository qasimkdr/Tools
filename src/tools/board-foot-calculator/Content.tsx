import Link from "next/link";

/** Brief + competitor findings: docs/research/board-foot-calculator.md · research/board-foot-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the board foot calculator</h2>
      <ol>
        <li><strong>Enter each board or group of boards</strong>: quantity, thickness and width in inches, and length in feet (or inches).</li>
        <li><strong>Add a waste allowance</strong> and, optionally, the price per board foot.</li>
        <li><strong>Read the total board feet</strong>, the volume, the cost and a line-by-line breakdown for your cut list.</li>
      </ol>

      <h2 id="formula">Board foot formula</h2>
      <div className="formula">Board feet = thickness (in) × width (in) × length (ft) ÷ 12<br />= thickness (in) × width (in) × length (in) ÷ 144<br />1 board foot = 144 in³ = 1/12 ft³</div>

      <h2 id="examples">Worked examples</h2>
      <table>
        <thead><tr><th>Lumber</th><th>Calculation</th><th>Board feet</th></tr></thead>
        <tbody>
          <tr><td>One 2×6, 8 ft</td><td>2 × 6 × 8 ÷ 12</td><td>8</td></tr>
          <tr><td>Four 2×6, 8 ft</td><td>4 × 8</td><td>32</td></tr>
          <tr><td>Six 4/4 × 6 in, 10 ft</td><td>6 × (1 × 6 × 10 ÷ 12)</td><td>30</td></tr>
          <tr><td>Both, plus 10% waste</td><td>62 × 1.10</td><td><strong>68.2</strong></td></tr>
          <tr><td>One 8/4 × 8 in, 6 ft</td><td>2 × 8 × 6 ÷ 12</td><td>8</td></tr>
        </tbody>
      </table>

      <h2 id="table">Board feet per linear foot</h2>
      <table>
        <thead><tr><th>Nominal size</th><th>Bd ft per foot</th><th>Nominal size</th><th>Bd ft per foot</th></tr></thead>
        <tbody>
          <tr><td>1×4</td><td>0.333</td><td>2×4</td><td>0.667</td></tr>
          <tr><td>1×6</td><td>0.5</td><td>2×6</td><td>1</td></tr>
          <tr><td>1×8</td><td>0.667</td><td>2×8</td><td>1.333</td></tr>
          <tr><td>1×12</td><td>1</td><td>2×12</td><td>2</td></tr>
        </tbody>
      </table>

      <h2 id="buying">Buying lumber by the board foot</h2>
      <ul>
        <li><strong>Hardwood thickness in quarters:</strong> 4/4 = 1″, 5/4 = 1¼″, 6/4 = 1½″, 8/4 = 2″, measured rough before planing.</li>
        <li><strong>Random widths and lengths:</strong> hardwood dealers often sell random-width boards; the board foot total is what you pay for.</li>
        <li><strong>Nominal vs actual:</strong> a softwood 2×4 is about 1½″ × 3½″ but is counted as 2 × 4.</li>
        <li><strong>Framing a wall?</strong> Count studs and plates first with the <Link href="/stud-calculator/">stud calculator</Link>, then total them here.</li>
      </ul>
      <p>For roof framing lengths, see the <Link href="/rafter-length-calculator/">rafter length calculator</Link>; for floor and wall areas, the <Link href="/square-footage-calculator/">square footage calculator</Link>. Bulk materials such as mulch or soil are sold by volume instead; use the <Link href="/cubic-yard-calculator/">cubic yard calculator</Link>. More <Link href="/category/construction/">construction calculators</Link>.</p>
    </>
  );
}
