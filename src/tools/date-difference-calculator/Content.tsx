import Link from "next/link";

/** Brief + competitor findings: docs/research/date-difference-calculator.md · research/date-difference-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the date difference calculator</h2>
      <ol>
        <li>Pick a <strong>start date</strong> and an <strong>end date</strong>. Add times if you need exact hours and minutes.</li>
        <li>Tick <strong>Include the end date</strong> if both the first and last day should count.</li>
        <li>Read the difference in years, months and days, plus total days, weeks, months, business days (with or without federal holidays), hours, minutes and seconds.</li>
      </ol>

      <h2 id="formula">How the difference is calculated</h2>
      <div className="formula">Days = end date − start date (+1 if the end date is included)<br />Weeks = days ÷ 7 · Hours = days × 24<br />Years, months, days: count whole calendar years, then whole months, then remaining days</div>

      <h2 id="example">Worked example</h2>
      <p>From <strong>Thursday, January 1, 2026</strong> to <strong>Friday, December 25, 2026</strong>:</p>
      <ul>
        <li><strong>11 months, 24 days</strong>, or <strong>358 days</strong> (51 weeks and 1 day)</li>
        <li>359 days if you include December 25</li>
        <li><strong>256 business days</strong>, or 246 after subtracting the 10 weekday federal holidays from New Year&apos;s Day to Thanksgiving</li>
        <li>8,592 hours or 515,520 minutes</li>
      </ul>

      <h2 id="uses">Common uses</h2>
      <ul>
        <li><strong>Deadlines and notice periods</strong>: count calendar or business days to a due date.</li>
        <li><strong>Trips and rentals</strong>: count inclusive days.</li>
        <li><strong>Anniversaries and milestones</strong>: see exactly how long it&apos;s been in years, months and days.</li>
      </ul>
      <p>Need a date a set number of days away instead? Use the <Link href="/days-from-today/">days from today calculator</Link>. For exact ages, use the <Link href="/age-calculator/">age calculator</Link>, and for hours between clock times, the <Link href="/hours-calculator/">hours calculator</Link>. More <Link href="/category/time-date/">date and time calculators</Link>.</p>
    </>
  );
}
