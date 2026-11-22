import Link from "next/link";

/** Brief + competitor findings: docs/research/half-birthday-calculator.md · research/half-birthday-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the half birthday calculator</h2>
      <ol>
        <li><strong>Enter your date of birth</strong> (or your child&apos;s).</li>
        <li><strong>Read your next half birthday</strong>, with the weekday, how many days away it is and the half age you&apos;ll be.</li>
        <li><strong>Compare the two methods</strong>: six calendar months, or the exact midpoint in days between two birthdays.</li>
      </ol>

      <h2 id="formula">How a half birthday is calculated</h2>
      <div className="formula">Half birthday = birthday + 6 months (same day of the month)<br />If that day doesn&apos;t exist → last day of the month<br />Midpoint method = birthday + ⌊days until next birthday ÷ 2⌋  (182 or 183 days)</div>

      <h2 id="examples">Examples</h2>
      <table>
        <thead><tr><th>Birthday</th><th>Half birthday (6 months)</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td>March 15</td><td>September 15</td><td>Same day of the month</td></tr>
          <tr><td>December 25</td><td>June 25</td><td>Popular for holiday birthdays</td></tr>
          <tr><td>July 4</td><td>January 4</td><td>Summer birthday, school-year celebration</td></tr>
          <tr><td>August 31</td><td>February 28 (29 in leap years)</td><td>February is shorter</td></tr>
          <tr><td>March 31</td><td>September 30</td><td>September has 30 days</td></tr>
          <tr><td>February 29</td><td>August 29</td><td>Same date every year</td></tr>
        </tbody>
      </table>
      <p>With the midpoint method, someone born February 12, 2024 counts 366 days to their next birthday (2024 is a leap year), so the midpoint is 183 days later: <strong>August 13</strong> rather than August 12.</p>

      <h2 id="table">Half birthday by birth month</h2>
      <table>
        <thead><tr><th>Born in</th><th>Half birthday in</th><th>Born in</th><th>Half birthday in</th></tr></thead>
        <tbody>
          <tr><td>January</td><td>July</td><td>July</td><td>January</td></tr>
          <tr><td>February</td><td>August</td><td>August</td><td>February</td></tr>
          <tr><td>March</td><td>September</td><td>September</td><td>March</td></tr>
          <tr><td>April</td><td>October</td><td>October</td><td>April</td></tr>
          <tr><td>May</td><td>November</td><td>November</td><td>May</td></tr>
          <tr><td>June</td><td>December</td><td>December</td><td>June</td></tr>
        </tbody>
      </table>

      <h2 id="ideas">Half birthday ideas</h2>
      <ul>
        <li><strong>Half a cake:</strong> bake a round cake, cut it in half and stack or serve one half.</li>
        <li><strong>Half-sized everything:</strong> half a song, half a card, a gift wrapped halfway.</li>
        <li><strong>Baby&apos;s 6 months:</strong> monthly milestone photos make the half birthday a natural moment to celebrate.</li>
        <li><strong>Can&apos;t decide who picks the activity?</strong> Let the <Link href="/random-number-generator/">random number generator</Link> choose.</li>
      </ul>

      <h2 id="more">Related date tools</h2>
      <p>See your exact age in years, months and days with the <Link href="/age-calculator/">age calculator</Link>, or count down to any date with the <Link href="/days-from-today/">days from today calculator</Link>; for example, <Link href="/months-from-today/6/">6 months from today</Link>. More <Link href="/category/time-date/">date and time calculators</Link>.</p>
    </>
  );
}
