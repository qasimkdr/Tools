import Link from "next/link";

/** Brief + competitor findings: docs/research/age-calculator.md · research/age-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the age calculator</h2>
      <ol>
        <li><strong>Enter a date of birth.</strong></li>
        <li><strong>Leave &quot;Age on&quot; as today</strong>, or change it to any past or future date: a school cut-off, a retirement date or the day of an event.</li>
        <li><strong>Read the exact age</strong> in years, months and days, plus totals in months, weeks, days and hours, the weekday you were born, and a countdown to the next birthday.</li>
      </ol>
      <p>The address bar keeps your dates, so you can bookmark the result or share it.</p>

      <h2 id="how-it-works">How exact age is calculated</h2>
      <p>The calculator uses real calendar months rather than averages, in three steps:</p>
      <ol>
        <li><strong>Whole years:</strong> how many birthdays have passed.</li>
        <li><strong>Whole months:</strong> how many monthly anniversaries since the last birthday.</li>
        <li><strong>Days:</strong> the remaining days since that monthly anniversary.</li>
      </ol>
      <div className="formula">age = whole years + whole months + remaining days<br />total days = date − date of birth (every calendar day, leap days included)</div>
      <p>Some calculators divide by 365 days per year or 30.4 days per month, which can put the breakdown a day or two off. Counting real months keeps the answer matching the calendar.</p>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>Born May 15, 1990 (a Tuesday):</strong> on November 21, 2026 that&apos;s <strong>36 years, 6 months and 6 days</strong>, or 13,339 days (1,905 weeks and 4 days). The next birthday, the 37th, is May 15, 2027.</li>
        <li><strong>School cut-offs:</strong> a child born September 2, 2019 is 5 years, 11 months and 30 days old on September 1, 2025. That&apos;s one day short of 6, which matters for a &quot;must be 6 by September 1&quot; rule.</li>
        <li><strong>A 10,000-day milestone:</strong> someone born May 15, 1990 turned 10,000 days old on September 30, 2017. To find a date like that for yourself, add days to your birth date with the <Link href="/days-from-today/">days from today calculator</Link> and change its start date to your birthday.</li>
      </ul>

      <h2 id="leap-day">Born on February 29?</h2>
      <p>In years without a February 29, this calculator counts the birthday on <strong>February 28</strong>. For example, someone born February 29, 2000 turns 27 on February 28, 2027. Some laws and organizations use March 1 instead, so if an exact legal age matters, such as for a license, benefits or a contract, check which rule applies where you live.</p>

      <h2 id="uses">Common reasons to calculate age</h2>
      <ul>
        <li><strong>Forms and eligibility:</strong> school entry, sports age groups, insurance, retirement and benefit ages.</li>
        <li><strong>Milestones:</strong> 10,000 days, 1,000 weeks or a half birthday. Count forward with <Link href="/weeks-from-today/52/">52 weeks from today</Link> or <Link href="/days-from-today/365/">365 days from today</Link>.</li>
        <li><strong>Family history:</strong> working out how old a relative was on a historic date.</li>
        <li><strong>Health:</strong> chronological age is the starting point for growth charts and age-based screening schedules.</li>
      </ul>

      <h2 id="chronological">Chronological age vs other &quot;ages&quot;</h2>
      <p><strong>Chronological age</strong>, the calendar time since birth, is what this calculator gives and what forms ask for. It&apos;s different from estimates such as biological age or a child&apos;s developmental age, which are assessed by professionals and can differ from the calendar. See more <Link href="/category/time-date/">date and time calculators</Link>.</p>
      <p>Related: measure the <Link href="/date-difference-calculator/">time between any two dates</Link>, find your <Link href="/half-birthday-calculator/">half birthday</Link>, or estimate a <Link href="/height-calculator/">child&apos;s adult height</Link>.</p>
    </>
  );
}
