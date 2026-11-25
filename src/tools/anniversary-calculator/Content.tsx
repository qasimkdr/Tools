import Link from "next/link";

/** Brief + competitor findings: docs/research/anniversary-calculator.md · research/anniversary-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the anniversary calculator</h2>
      <ol>
        <li>Choose <strong>Wedding</strong>, <strong>Relationship</strong> or <strong>Work</strong>.</li>
        <li>Enter the date it started: your wedding day, the day you got together, or your first day at the job.</li>
        <li>Read how long it has been in years, months and days, the date and weekday of your next anniversary, and the milestones coming up. Change <strong>Count to</strong> to see the figures on any date.</li>
      </ol>

      <h2 id="formulas">How the time together is counted</h2>
      <div className="formula">Whole years and months are counted from the start date forward (calendar months, not 30-day blocks)<br />Days = days left over after the last whole month<br />Total days = calendar days between the two dates · Total weeks = total days ÷ 7<br />Next anniversary = the start date&apos;s month and day in the coming year</div>
      <p>Counting calendar months means a June 20 start reaches 5 months on November 20, whether the months in between have 30 or 31 days. A February 29 date is counted on February 28 in years without a leap day.</p>

      <h2 id="example">Worked example</h2>
      <p>A couple married on <strong>June 20, 2015</strong>, counting to <strong>November 25, 2026</strong>:</p>
      <ul>
        <li>June 20, 2015 to June 20, 2026 is <strong>11 years</strong>; to November 20, 2026 adds <strong>5 months</strong>; November 25 adds <strong>5 days</strong>.</li>
        <li>That is <strong>4,176 days</strong>, or 596 weeks and 4 days.</li>
        <li>Their <strong>12th anniversary</strong> falls on Sunday, June 20, 2027, 207 days later.</li>
        <li>They passed <strong>4,000 days</strong> together on June 2, 2026, and reach 5,000 days on February 26, 2029.</li>
      </ul>

      <h2 id="milestones">Milestones worth celebrating</h2>
      <ul>
        <li><strong>Day counts:</strong> 100 days, 1,000 days (about 2 years 9 months) and 10,000 days (about 27 years 4 months) are popular milestones for couples.</li>
        <li><strong>Round years:</strong> the 10th, 25th (silver) and 50th anniversaries are the classic big celebrations.</li>
        <li><strong>Work:</strong> many employers mark service at 1, 5, 10, 15, 20 and 25 years.</li>
      </ul>

      <h2 id="gifts">Traditional anniversary themes</h2>
      <p>Gift lists differ between sources and countries, so the calculator shows a theme only for years where the common US lists agree:</p>
      <div className="overflow-x-auto">
        <table>
          <thead><tr><th>Anniversary</th><th>Traditional theme</th></tr></thead>
          <tbody>
            {[[1, "Paper"], [2, "Cotton"], [3, "Leather"], [5, "Wood"], [6, "Iron"], [7, "Wool or copper"], [8, "Bronze or pottery"], [10, "Tin or aluminum"], [15, "Crystal"], [25, "Silver"], [45, "Sapphire"], [60, "Diamond"]].map(([y, g]) => <tr key={y}><td>{y}</td><td>{g}</td></tr>)}
          </tbody>
        </table>
      </div>
      <p>Count the days between any two dates with the <Link href="/date-difference-calculator/">date difference calculator</Link>, find an exact age with the <Link href="/age-calculator/">age calculator</Link>, or plan a surprise for a set number of days ahead with the <Link href="/days-from-today/">days from today calculator</Link>. Celebrating something halfway? Try the <Link href="/half-birthday-calculator/">half birthday calculator</Link>. More <Link href="/category/time-date/">date and time calculators</Link>.</p>
    </>
  );
}
