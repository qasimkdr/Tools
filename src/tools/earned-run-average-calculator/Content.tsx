import Link from "next/link";

/** Brief + competitor findings: docs/research/earned-run-average-calculator.md · research/earned-run-average-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the ERA calculator</h2>
      <ol>
        <li><strong>Enter earned runs</strong> and <strong>innings pitched</strong> straight from the box score, using .1 for one out and .2 for two.</li>
        <li><strong>Pick the game length</strong>: 9 innings for MLB and college baseball, 7 for softball and most high-school games, or your own.</li>
        <li><strong>Optionally add hits, walks and strikeouts</strong> to get WHIP, strikeouts and walks per game, and the strikeout-to-walk ratio.</li>
      </ol>

      <h2 id="formula">ERA formula</h2>
      <div className="formula">ERA = innings per game × earned runs ÷ innings pitched<br />Innings pitched = full innings + outs ÷ 3   (6.2 → 6⅔ = 6.667)<br />WHIP = (walks + hits) ÷ innings pitched  ·  K/9 = 9 × strikeouts ÷ innings pitched</div>

      <h2 id="examples">Worked examples</h2>
      <table>
        <thead><tr><th>Line</th><th>Calculation</th><th>Result</th></tr></thead>
        <tbody>
          <tr><td>45 ER in 162.1 IP</td><td>9 × 45 ÷ 162.333</td><td><strong>2.49 ERA</strong></td></tr>
          <tr><td>3 ER in 6.2 IP</td><td>9 × 3 ÷ 6.667</td><td><strong>4.05 ERA</strong></td></tr>
          <tr><td>2 ER in 5.0 IP, softball</td><td>7 × 2 ÷ 5</td><td><strong>2.80 ERA</strong> (3.60 on the 9-inning scale)</td></tr>
          <tr><td>130 H + 40 BB in 162.1 IP</td><td>170 ÷ 162.333</td><td><strong>1.05 WHIP</strong></td></tr>
          <tr><td>180 K, 40 BB in 162.1 IP</td><td>9 × 180 ÷ 162.333 · 180 ÷ 40</td><td><strong>9.98 K/9 · 4.50 K/BB</strong></td></tr>
        </tbody>
      </table>
      <p>A common mistake is treating 6.2 innings as 6.2 instead of 6.667: here that would give 4.35 instead of the correct 4.05.</p>

      <h2 id="scale">ERA guide (MLB)</h2>
      <table>
        <thead><tr><th>ERA</th><th>Rough rating</th></tr></thead>
        <tbody>
          <tr><td>Under 2.50</td><td>Elite, award-contending</td></tr>
          <tr><td>2.50 – 3.50</td><td>Very good</td></tr>
          <tr><td>3.50 – 4.50</td><td>Around league average</td></tr>
          <tr><td>Over 5.00</td><td>Below average</td></tr>
        </tbody>
      </table>
      <p>League-wide ERA changes with the era of play, ballparks and rules, so compare pitchers within the same league and season. Youth and softball ERAs run on different scales entirely.</p>

      <h2 id="earned">Earned vs unearned runs</h2>
      <p>A run is unearned if it scores because of a fielding error or passed ball, including runs that score after an error should have ended the inning. ERA counts only earned runs, so it measures the pitcher rather than the defense. Relief pitchers are charged for runners they leave on base who later score.</p>

      <h2 id="more">More game stats</h2>
      <ul>
        <li><strong>Batting averages and win rates</strong> are ratios: hits ÷ at-bats, wins ÷ games. The <Link href="/ratio-calculator/">ratio calculator</Link> handles them.</li>
        <li><strong>Bowling night?</strong> Score a game frame by frame with the <Link href="/bowling-score-calculator/">bowling score calculator</Link>.</li>
        <li><strong>Picking teams or batting order</strong> fairly: use the <Link href="/random-number-generator/">random number generator</Link>.</li>
      </ul>
      <p>More <Link href="/category/education/">education and sports calculators</Link>.</p>
    </>
  );
}
