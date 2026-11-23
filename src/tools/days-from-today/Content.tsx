import Link from "next/link";
import LiveTable from "./LiveTable";
import { variantPath } from "./variants";

/** Hub article. Server component: zero JS except the LiveTable island. Written to beat competitor gaps (docs/research/days-from-today.md). */
export default function Content({ buildISO }: { buildISO: string }) {
  return (
    <>
      <h2 id="how-to-use">How to use the days from today calculator</h2>
      <ol>
        <li><strong>Enter the amount</strong>, such as 14, 30 or 90. Use a quick pick for common values.</li>
        <li><strong>Choose a unit</strong>: days, weeks, months, years or business days.</li>
        <li><strong>Pick a direction</strong>: <em>From</em> for a future date or <em>Ago</em> for a past one.</li>
        <li><strong>Change the start date</strong> if you're not counting from today. The result, weekday and calendar update as you type.</li>
      </ol>
      <p>
        You can copy the answer, save it to your calendar as an <code>.ics</code> file, or share the address-bar link.
        The link holds your exact inputs.
      </p>

      <h2 id="how-it-works">How the date is calculated</h2>
      <p>
        Counting forward is simple addition on the calendar, but three rules decide whether the answer is right. Competing
        tools rarely spell them out:
      </p>
      <h3>1. Today is day zero</h3>
      <p>
        &quot;14 days from today&quot; means today plus 14, so counting starts tomorrow as day 1. Excel (<code>=TODAY()+14</code>),
        Google Sheets and most contract and court rules use this same convention. For an <em>inclusive</em> count, add one day.
      </p>
      <div className="formula">result date = start date + N days<br />N weeks = N × 7 days</div>
      <h3>2. Months use end-of-month clamping</h3>
      <p>
        Months aren't a fixed length, so adding months keeps the same day number. If that day doesn't exist in the
        target month, the result moves back to the month's last day. January 31 plus one month is February 28 (29 in a
        leap year), matching the spreadsheet function <code>EDATE</code>.
      </p>
      <h3>3. Business days skip weekends and, optionally, holidays</h3>
      <p>
        Business days count Monday to Friday only. With the holiday option on, the calculator also skips the 11 US
        federal holidays on their <em>observed</em> dates. When a holiday falls on a Saturday it is observed on Friday,
        and when it falls on a Sunday it moves to Monday. That is why 10 business days often comes to 14 calendar days,
        and can be 15 or more around Thanksgiving and Christmas.
      </p>

      <h2 id="common">Common dates from today</h2>
      <p>The most-searched counts, updated to your local date. Select any row for a full page with that date&apos;s details.</p>
      <LiveTable buildISO={buildISO} unit="days" values={[7, 10, 14, 15, 20, 30, 45, 60, 90, 100, 120, 180, 365]} caption="Days from today" />
      <LiveTable buildISO={buildISO} unit="weeks" values={[2, 4, 6, 8, 10, 12, 14, 18, 20, 30, 40, 52]} caption="Weeks from today" />
      <LiveTable buildISO={buildISO} unit="months" values={[1, 2, 3, 4, 6, 9, 12, 18, 24]} caption="Months from today" />

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li>
          <strong>Return window:</strong> you bought something on March 3 with a 30-day return policy. March has 31 days,
          so 30 days later is <strong>April 2</strong>. See <Link href={variantPath("days", 30)}>30 days from today</Link>.
        </li>
        <li>
          <strong>Probation or trial period:</strong> a 90-day period starting January 15 ends on <strong>April 15</strong>,
          or April 14 in a leap year, because February has 29 days. See <Link href={variantPath("days", 90)}>90 days from today</Link>.
        </li>
        <li>
          <strong>Two-week notice:</strong> 14 calendar days from a Monday is the Monday two weeks later. Ten
          <em> business</em> days from a Monday lands on the Friday of the following week. See{" "}
          <Link href={variantPath("days", 14)}>14 days from today</Link>.
        </li>
        <li>
          <strong>Half a year:</strong> 6 months from August 31 is <strong>February 28</strong> (or 29), because of
          end-of-month clamping. That's about 181 days, not 180. See <Link href={variantPath("months", 6)}>6 months from today</Link>.
        </li>
      </ul>

      <h2 id="uses">When people use this calculator</h2>
      <ul>
        <li><strong>Deadlines and notices:</strong> payment terms (Net 30, Net 60), notice periods, warranty and refund windows.</li>
        <li><strong>Travel and visas:</strong> stay limits such as the Schengen 90/180-day rule. Always confirm with the official authority.</li>
        <li><strong>Health and fitness:</strong> 30-, 60- and 90-day challenges, medication supplies, and the 40 weeks used to estimate pregnancy due dates.</li>
        <li><strong>Work and projects:</strong> sprint planning, delivery estimates in business days, and countdowns to launches or events.</li>
        <li><strong>Birthdays and ages:</strong> counting down to a birthday or milestone. To see exactly how old someone is in years, months and days, use the <Link href="/age-calculator/">age calculator</Link>.</li>
      </ul>

      <h2 id="legal-note">A note on legal and official deadlines</h2>
      <p>
        Courts, tax agencies and contracts can define counting rules differently. For example, a rule might exclude the
        trigger day and extend a deadline that lands on a weekend or holiday to the next business day. This calculator
        follows the common convention, but always check the exact wording of the rule that applies to you.
      </p>
      <p>Related: count the <Link href="/date-difference-calculator/">days between two dates</Link>, plan a <Link href="/lead-time-calculator/">delivery date from a lead time</Link> or add up <Link href="/hours-calculator/">hours between two times</Link>.</p>
    </>
  );
}
