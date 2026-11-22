import Link from "next/link";

/** Brief + competitor findings: docs/research/bowling-score-calculator.md · research/bowling-score-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the bowling score calculator</h2>
      <ol>
        <li><strong>Type each frame</strong> using score-sheet marks: <code>X</code> for a strike, <code>/</code> for a spare, <code>-</code> for a miss, or the number of pins.</li>
        <li><strong>Watch the running total</strong> under each frame. Frames show &quot;·&quot; until their bonus balls are known.</li>
        <li><strong>Check the 10th frame:</strong> enter up to three balls after a strike or spare, e.g. <code>XXX</code>, <code>X7/</code> or <code>9/8</code>.</li>
      </ol>
      <p>While a game is in progress, the calculator also shows the best score still possible if every remaining ball were a strike.</p>

      <h2 id="rules">How bowling scoring works</h2>
      <div className="formula">Open frame = pins knocked down (both balls)<br />Spare (/) = 10 + next 1 ball<br />Strike (X) = 10 + next 2 balls<br />10th frame = all pins knocked down in it (up to 3 balls)</div>
      <p>A strike or spare doesn&apos;t get its full value until the bonus balls are thrown, which is why a frame&apos;s score often appears one or two frames later. These are the standard ten-pin rules used in league and open play.</p>

      <h2 id="example">Example game, frame by frame</h2>
      <table>
        <thead><tr><th>Frame</th><th>Marks</th><th>Frame score</th><th>Total</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>X</td><td>10 + 7 + 3 = 20</td><td>20</td></tr>
          <tr><td>2</td><td>7 /</td><td>10 + 9 = 19</td><td>39</td></tr>
          <tr><td>3</td><td>9 -</td><td>9</td><td>48</td></tr>
          <tr><td>4</td><td>X</td><td>10 + 10 + 8 = 28</td><td>76</td></tr>
          <tr><td>5</td><td>X</td><td>10 + 8 + 1 = 19</td><td>95</td></tr>
          <tr><td>6</td><td>8 1</td><td>9</td><td>104</td></tr>
          <tr><td>7</td><td>9 /</td><td>10 + 10 = 20</td><td>124</td></tr>
          <tr><td>8</td><td>X</td><td>10 + 0 + 6 = 16</td><td>140</td></tr>
          <tr><td>9</td><td>- 6</td><td>6</td><td>146</td></tr>
          <tr><td>10</td><td>X 9 /</td><td>10 + 9 + 1 = 20</td><td>166</td></tr>
        </tbody>
      </table>
      <p>Tap &quot;Sample game&quot; above to load this game and change any frame to see how the totals ripple forward.</p>

      <h2 id="benchmarks">Score benchmarks</h2>
      <ul>
        <li><strong>300:</strong> a perfect game, 12 strikes in a row.</li>
        <li><strong>190:</strong> 9 and a spare in every frame, plus a 9 on the bonus ball.</li>
        <li><strong>90:</strong> nine pins in every frame with no spares or strikes. Spares and strikes are where big scores come from.</li>
        <li><strong>Typical:</strong> casual bowlers often score 100–150; consistent league bowlers 180+.</li>
      </ul>

      <h2 id="tips">Tips to score higher</h2>
      <ul>
        <li><strong>Convert spares:</strong> picking up spares consistently adds far more than the occasional strike. Single-pin spares are the first thing to master.</li>
        <li><strong>Strikes in a row pay double:</strong> a &quot;double&quot; (two strikes) followed by 9 pins scores 29 for the first frame alone.</li>
        <li><strong>Keep a consistent approach:</strong> same starting position, same target arrows, same speed.</li>
        <li><strong>Track your average:</strong> your average is the total pins over all games ÷ number of games. Express it as a percentage of 300 with the <Link href="/ratio-calculator/">ratio calculator</Link>.</li>
      </ul>
      <p>Need a fair way to pick lanes or bowling order? Try the <Link href="/random-number-generator/">random number generator</Link>. More <Link href="/category/education/">education and sports calculators</Link>.</p>
    </>
  );
}
