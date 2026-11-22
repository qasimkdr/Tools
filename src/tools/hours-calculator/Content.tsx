import Link from "next/link";

/** Brief + competitor findings: docs/research/hours-calculator.md · research/hours-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the hours calculator</h2>
      <ul>
        <li><strong>Between two times:</strong> enter a start time, an end time and any unpaid break to get the hours and minutes worked, plus decimal hours for payroll. Overnight shifts are handled automatically.</li>
        <li><strong>Weekly timesheet:</strong> enter clock-in and clock-out times for each day to total the week. Add your hourly rate to see regular pay, overtime pay and gross pay.</li>
        <li><strong>Hours from now:</strong> add hours and minutes to the current time, or to a time you choose, to find a clock-out time, a deadline or when a timer ends.</li>
      </ul>

      <h2 id="formula">How hours are calculated</h2>
      <div className="formula">Hours worked = end time − start time − unpaid breaks<br />Overnight: if end ≤ start, add 24 hours to the end time<br />Decimal hours = hours + minutes ÷ 60</div>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>Day shift:</strong> 9:00 AM to 5:30 PM with a 30-minute lunch = 8 h 30 min − 30 min = <strong>8 hours</strong> (8.00 decimal).</li>
        <li><strong>Night shift:</strong> 10:00 PM to 6:30 AM = (6:30 + 24:00) − 22:00 = <strong>8 h 30 min</strong> (8.50 decimal).</li>
        <li><strong>Overtime week:</strong> five 9-hour days = 45 hours. At $20/hour that&apos;s 40 × $20 = $800 regular plus 5 × $30 = $150 overtime, so <strong>$950 gross</strong>.</li>
      </ul>

      <h2 id="decimal">Minutes to decimal hours</h2>
      <table>
        <thead><tr><th>Minutes</th><th>Decimal</th><th>Minutes</th><th>Decimal</th></tr></thead>
        <tbody>
          <tr><td>5</td><td>0.08</td><td>35</td><td>0.58</td></tr>
          <tr><td>10</td><td>0.17</td><td>40</td><td>0.67</td></tr>
          <tr><td>15</td><td>0.25</td><td>45</td><td>0.75</td></tr>
          <tr><td>20</td><td>0.33</td><td>50</td><td>0.83</td></tr>
          <tr><td>25</td><td>0.42</td><td>55</td><td>0.92</td></tr>
          <tr><td>30</td><td>0.50</td><td>60</td><td>1.00</td></tr>
        </tbody>
      </table>
      <p>Don&apos;t confuse 7.30 hours with 7 hours 30 minutes: 7 h 30 min is <strong>7.50</strong> decimal hours.</p>

      <h2 id="military">24-hour (military) time</h2>
      <p>Times after noon add 12: 1:00 PM = 13:00, 5:30 PM = 17:30, and midnight = 00:00. Converting to 24-hour time before subtracting avoids AM/PM mistakes, which is what this calculator does behind the scenes.</p>

      <h2 id="overtime">Overtime rules (US)</h2>
      <p>Under the federal Fair Labor Standards Act, covered non-exempt employees must be paid at least <strong>1.5 times</strong> their regular rate for hours over <strong>40 in a workweek</strong> (see the U.S. Department of Labor&apos;s <a href="https://www.dol.gov/agencies/whd/overtime" rel="noopener" target="_blank">overtime guidance</a>). Some states add daily overtime or double time, and salaried exempt roles are treated differently. Change the &quot;Overtime after&quot; box if your rules differ.</p>

      <h2 id="facts">Useful numbers</h2>
      <ul>
        <li>Full-time year: 40 hours × 52 weeks = <strong>2,080 hours</strong> (about 2,000 after two weeks off).</li>
        <li>An 8-hour shift starting at 9:00 AM with a 30-minute unpaid lunch ends at <strong>5:30 PM</strong>.</li>
        <li>Counting days instead of hours? Use the <Link href="/days-from-today/">days from today calculator</Link>; for an age or anniversary, the <Link href="/age-calculator/">age calculator</Link>.</li>
      </ul>
      <p className="text-sm">Pay figures are gross estimates before taxes and deductions. Check your employer&apos;s rounding and break policies. More <Link href="/category/time-date/">date and time calculators</Link>.</p>
    </>
  );
}
