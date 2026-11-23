import Link from "next/link";

/** Brief + competitor findings: docs/research/period-calculator.md · research/period-calculator/report.md (YMYL: health) */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the period calculator</h2>
      <ol>
        <li><strong>Enter the first day of your last period</strong>, the day bleeding started, not the day it ended.</li>
        <li><strong>Choose your average cycle length.</strong> Count from the first day of one period to the day before the next one starts, and average a few months if you can. If you&apos;re not sure, 28 days is the average.</li>
        <li><strong>Choose how many days your period usually lasts.</strong></li>
      </ol>
      <p>You&apos;ll see when your next period is expected, how many days away it is, today&apos;s cycle day, and estimates for the next six cycles. Everything stays in your browser: nothing is saved, and your dates aren&apos;t added to the page address.</p>

      <h2 id="how-it-works">How the dates are estimated</h2>
      <div className="formula">Next period = first day of last period + cycle length<br />Period end ≈ start + period length − 1<br />Estimated ovulation ≈ next period − 14 days<br />Fertile window ≈ 5 days before ovulation through 1 day after</div>
      <p>The 14-day figure is an average. The time from ovulation to the next period, the luteal phase, varies between people and cycles. According to the{" "}
        <a href="https://www.nichd.nih.gov/health/topics/factsheets/menstruation" rel="noopener" target="_blank">NIH&apos;s National Institute of Child Health and Human Development</a>,
        ovulation in an average 28-day cycle happens around days 12 to 14. That&apos;s why ovulation and fertile-window dates are shown as estimates.</p>

      <h2 id="example">Example</h2>
      <p>Your last period started on <strong>November 1, 2026</strong>, your cycle is 28 days and your period lasts 5 days:</p>
      <ul>
        <li>Next period: <strong>November 29</strong> (expected to end about December 3)</li>
        <li>Estimated ovulation: around <strong>November 15</strong></li>
        <li>Estimated fertile window: about <strong>November 10–16</strong></li>
      </ul>
      <p>With a 32-day cycle instead, the next period moves to around December 3 and ovulation to around November 19. To count days forward yourself, try <Link href="/days-from-today/28/">28 days from today</Link>.</p>

      <h2 id="normal">What&apos;s a typical cycle?</h2>
      <ul>
        <li><strong>Cycle length:</strong> the U.S. Office on Women&apos;s Health describes cycles of <strong>24 to 38 days</strong> as regular for adults, with about 28 days as average (<a href="https://womenshealth.gov/menstrual-cycle/your-menstrual-cycle" rel="noopener" target="_blank">womenshealth.gov</a>).</li>
        <li><strong>Teens:</strong> in the first few years after periods start, longer and less regular cycles are common. They usually settle within about three years.</li>
        <li><strong>Period length:</strong> bleeding commonly lasts about 3 to 7 days.</li>
        <li><strong>Natural variation:</strong> a cycle that&apos;s a few days early or late now and then is normal. Stress, illness, travel, sleep changes, intense exercise, weight change and some medicines can shift it.</li>
      </ul>

      <h2 id="see-a-doctor">When to talk to a healthcare provider</h2>
      <ul>
        <li>You haven&apos;t had a period for 3 months or more and you&apos;re not pregnant, breastfeeding or in menopause.</li>
        <li>Your cycles are regularly shorter than 24 days or longer than 38 days.</li>
        <li>Bleeding lasts longer than about 7–8 days, is very heavy, or you bleed between periods.</li>
        <li>You have severe pain, or symptoms that affect daily life.</li>
      </ul>

      <h2 id="limits">Important limits</h2>
      <p><strong>This calculator is not birth control</strong> and can&apos;t tell you which days are &quot;safe&quot;. Ovulation can shift from cycle to cycle, so calendar estimates alone aren&apos;t reliable for preventing pregnancy. If you&apos;re trying to conceive, ovulation tests or a provider can give more precise timing. If you might be pregnant, take a pregnancy test; pregnancy due dates are counted as 40 weeks from the first day of the last period (see <Link href="/weeks-from-today/40/">40 weeks from today</Link>).</p>
      <p>This page is for general information and doesn&apos;t replace medical advice. More <Link href="/category/health/">health calculators</Link>.</p>
      <p>Related health tools: check your <Link href="/bmi-women-calculator/">BMI for women</Link>, plan your <Link href="/water-intake-calculator/">daily water intake</Link>, or estimate <Link href="/body-fat-calculator/">body fat percentage</Link>.</p>
    </>
  );
}
