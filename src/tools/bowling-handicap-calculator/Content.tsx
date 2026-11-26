import Link from "next/link";

/** Brief + competitor findings: docs/research/bowling-handicap-calculator.md · research/bowling-handicap-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the bowling handicap calculator</h2>
      <ol>
        <li>Enter your average, or switch to &quot;Work it out from pins&quot; and enter your total pins and games bowled.</li>
        <li>Choose your league&apos;s handicap system (such as 90% of 220) or type the basis score and percentage.</li>
        <li>Optionally add tonight&apos;s scores to see handicap totals, and your team&apos;s averages to get the team handicap.</li>
      </ol>

      <h2 id="formula">Bowling handicap formula</h2>
      <div className="formula">Average = total pins ÷ games bowled (drop the fraction)<br />Handicap = (basis score − average) × percentage (drop the fraction)<br />Handicap = 0 if the average is at or above the basis<br />Handicap score = scratch score + handicap</div>

      <h2 id="example">Worked example</h2>
      <ul>
        <li>Average: 2,487 pins ÷ 15 games = 165.8 → <strong>165</strong>.</li>
        <li>League system 90% of 220: (220 − 165) × 0.90 = 49.5 → <strong>49 pins per game</strong>, 147 for a 3-game series.</li>
        <li>Games of 158, 172 and 181 are a 511 scratch series, <strong>658 with handicap</strong>.</li>
        <li>In an 80% of 230 league, the same bowler gets (230 − 165) × 0.80 = <strong>52</strong>.</li>
        <li>A team averaging 165, 182, 140 and 201 at 90% of 220 gets 49 + 34 + 72 + 17 = <strong>172 pins</strong> per game.</li>
      </ul>

      <h2 id="table">Handicap by average (90% of 220)</h2>
      <table>
        <thead><tr><th>Average</th><th>Handicap</th><th>Average</th><th>Handicap</th></tr></thead>
        <tbody>
          <tr><td>100</td><td>108</td><td>160</td><td>54</td></tr>
          <tr><td>120</td><td>90</td><td>180</td><td>36</td></tr>
          <tr><td>140</td><td>72</td><td>200</td><td>18</td></tr>
          <tr><td>150</td><td>63</td><td>220+</td><td>0</td></tr>
        </tbody>
      </table>

      <h2 id="rules">League rules that change the number</h2>
      <ul>
        <li><strong>Basis and percentage:</strong> set by each league. A higher basis or percentage gives larger handicaps.</li>
        <li><strong>Which average:</strong> early in a season many leagues use last season&apos;s book average, or an entering average until you have bowled a set number of games.</li>
        <li><strong>Absent bowlers and maximums:</strong> leagues set the score for a missing bowler and may cap the handicap.</li>
      </ul>
      <p>Score a game frame by frame with the <Link href="/bowling-score-calculator/">bowling score calculator</Link>, average any set of numbers with the <Link href="/average-calculator/">average calculator</Link>, or work out percentages with the <Link href="/percent-calculator/">percent calculator</Link>. Baseball fan? Try the <Link href="/earned-run-average-calculator/">ERA calculator</Link>. More <Link href="/category/education/">education and sports calculators</Link>.</p>
    </>
  );
}
