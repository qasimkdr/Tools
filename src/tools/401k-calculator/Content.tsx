import Link from "next/link";

/** Brief + competitor findings: docs/research/401k-calculator.md · research/401k-calculator/report.md (YMYL: finance) */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the 401(k) calculator</h2>
      <ol>
        <li><strong>Enter your age, planned retirement age and current balance.</strong></li>
        <li><strong>Enter your salary and contribution</strong> as a percentage of pay, plus your expected yearly raise.</li>
        <li><strong>Enter your employer match</strong>: the match percentage and the cap. For example, &quot;50% up to 6% of pay&quot; is 50 and 6.</li>
        <li><strong>Choose a return and inflation rate.</strong> Try a cautious and an optimistic return to see a range.</li>
      </ol>
      <p>You&apos;ll see your projected balance, its value in today&apos;s dollars, how much came from you, your employer and growth, and a yearly table you can download as a CSV. If you contribute less than your match cap, the calculator shows how much free money you&apos;re leaving behind.</p>

      <h2 id="how-it-works">How the projection works</h2>
      <div className="formula">Each year: balance = balance × (1 + return) + (your contribution + employer match) × (1 + return ÷ 2)<br />Your contribution = salary × your % (capped at the IRS limit for your age)<br />Employer match = salary × min(your %, match cap %) × match %</div>
      <p>Contributions are assumed to arrive evenly through the year, so they earn about half a year of growth in the year they&apos;re made. Salary rises by your raise percentage each year. The IRS limits are held at 2026 levels, which is slightly conservative because the IRS raises them with inflation.</p>

      <h2 id="limits">2026 contribution limits</h2>
      <table>
        <thead><tr><th>Your age in 2026</th><th>Employee limit</th></tr></thead>
        <tbody>
          <tr><td>Under 50</td><td>$24,500</td></tr>
          <tr><td>50–59 and 64+</td><td>$32,500 ($24,500 + $8,000 catch-up)</td></tr>
          <tr><td>60–63</td><td>$35,750 ($24,500 + $11,250 catch-up)</td></tr>
        </tbody>
      </table>
      <p>Source: IRS, <a href="https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500" rel="noopener" target="_blank">401(k) limit increases to $24,500 for 2026</a>, and <a href="https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions" rel="noopener" target="_blank">catch-up contributions</a>. Employer contributions don&apos;t count toward your employee limit, but there is a separate, higher cap on combined contributions.</p>

      <h2 id="example">Example</h2>
      <p>A <strong>30-year-old earning $60,000</strong> with $20,000 saved contributes <strong>6%</strong>, gets a <strong>50% match up to 6%</strong>, earns 2% raises and averages a 6% return:</p>
      <ul>
        <li>Balance at 67: about <strong>$1,084,000</strong>, roughly <strong>$435,000 in today&apos;s dollars</strong> at 2.5% inflation</li>
        <li>Their own contributions: about $195,000; employer match: about $97,000; the rest, about $772,000, is investment growth</li>
        <li>Contributing only <strong>3%</strong> instead would give about <strong>$628,000</strong>, roughly $456,000 less, partly because half of the match would be lost.</li>
      </ul>
      <p>The biggest driver is time: most of the balance is growth on early contributions. That&apos;s why starting early and always capturing the full match matter so much.</p>

      <h2 id="match">Getting the full employer match</h2>
      <p>The match is part of your pay. If your plan matches 50% up to 6% and you contribute 4%, you miss 2% × 50% = 1% of salary every year, which is $600 a year on $60,000, before any growth. Also check your plan&apos;s <strong>vesting schedule</strong>: some employers require you to stay a few years before matched money is fully yours.</p>

      <h2 id="roth">Traditional vs Roth 401(k)</h2>
      <ul>
        <li><strong>Traditional:</strong> contributions reduce your taxable income now; withdrawals are taxed as income.</li>
        <li><strong>Roth:</strong> contributions are made after tax; qualified withdrawals in retirement are tax-free.</li>
      </ul>
      <p>The projected balance is the same either way. What differs is when you pay tax. If you expect a higher tax rate later, Roth often wins; if lower, traditional. Many people split the difference.</p>

      <h2 id="withdrawals">Withdrawals and the 4% rule</h2>
      <p>Withdrawals before age 59½ generally owe a 10% additional tax on top of income tax, with some exceptions. In retirement, the <strong>4% rule</strong> is a common starting point: withdraw about 4% in year one, then adjust for inflation. The calculator shows that figure, but it&apos;s a rule of thumb, not a guarantee. To see how a rate of return compares with a loan&apos;s cost, try the <Link href="/interest-rate-calculator/">interest rate calculator</Link>.</p>
      <p className="text-sm">Estimates only, not financial advice. Returns aren&apos;t guaranteed and plan rules differ, so check your plan documents or a financial professional. More <Link href="/category/finance/">finance calculators</Link>.</p>
      <p>Related: see your <Link href="/paycheck-calculator/">take-home pay after 401(k) deductions</Link>, model growth with <Link href="/interest-calculator/">compound interest</Link>, or work out your <Link href="/modified-adjusted-gross-income-calculator/">modified adjusted gross income (MAGI)</Link>.</p>
    </>
  );
}
