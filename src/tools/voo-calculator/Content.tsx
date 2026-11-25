import Link from "next/link";

/** Brief + competitor findings: docs/research/voo-calculator.md · research/voo-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the VOO calculator</h2>
      <ol>
        <li>Enter what you are starting with and how much you will add each month.</li>
        <li>Set how many years you will stay invested and the yearly return you want to assume. The preset buttons include VOO&apos;s own average since it launched in 2010.</li>
        <li>Keep the 0.03% expense ratio (VOO&apos;s fee) or change it to compare another fund, and set an inflation rate to see the result in today&apos;s dollars.</li>
        <li>Read the projected value, how much of it you contributed, the fees paid, and the same plan at other returns.</li>
      </ol>

      <h2 id="voo">What VOO is</h2>
      <p><strong>VOO</strong> is the Vanguard S&amp;P 500 ETF, an exchange-traded fund that tracks the S&amp;P 500 index of large US companies. According to Vanguard, it launched on <strong>September 7, 2010</strong> and charges an expense ratio of <strong>0.03%</strong> a year, or $3 for every $10,000 invested. Its average annual return since inception was <strong>14.89%</strong> (net asset value, data through September 30, 2025, Vanguard fact sheet). That period was strong for US stocks; Vanguard notes that past performance does not guarantee future results.</p>

      <h2 id="formulas">How the projection works</h2>
      <div className="formula">Monthly return = (1 + yearly return)^(1/12) − 1<br />Each month: balance × (1 + monthly return), minus the expense ratio ÷ 12 of the balance, plus your contribution<br />Today&apos;s dollars = future value ÷ (1 + inflation)^years</div>
      <p>The return you enter is a <strong>total return</strong>: it assumes dividends are reinvested, as most long-term investors do. The calculator uses a steady average; real years swing widely, and the S&amp;P 500 has had several years with double-digit losses.</p>

      <h2 id="example">Worked example</h2>
      <p>Start with <strong>$10,000</strong>, add <strong>$500 a month</strong> for <strong>20 years</strong>, with VOO&apos;s 0.03% fee and 3% inflation:</p>
      <div className="overflow-x-auto">
        <table>
          <thead><tr><th>Assumed yearly return</th><th>Value after 20 years</th><th>In today&apos;s dollars</th></tr></thead>
          <tbody>
            <tr><td>6%</td><td>$257,794</td><td>$142,734</td></tr>
            <tr><td>8%</td><td>$329,772</td><td>$182,587</td></tr>
            <tr><td>10%</td><td>$424,609</td><td>$235,096</td></tr>
            <tr><td>14.89% (VOO since 2010)</td><td>$803,942</td><td>$445,123</td></tr>
          </tbody>
        </table>
      </div>
      <p>You contribute $130,000 in every case; the rest is growth. The spread between rows shows why the return assumption matters more than anything else, and why it is wise to plan with a cautious figure.</p>

      <h2 id="fees">Why the expense ratio matters</h2>
      <p>At 10% a year, the plan above ends at $424,609 with VOO&apos;s 0.03% fee, versus $426,405 with no fee at all: a difference of about $1,800 over 20 years. A fund charging 0.50% would end near <strong>$397,585</strong>, about <strong>$27,000 less</strong>, because the fee is taken every year from a growing balance.</p>

      <h2 id="tips">Things to keep in mind</h2>
      <ul>
        <li><strong>Use a range, not one number.</strong> Compare a cautious return (6–8%) with a higher one before relying on a result.</li>
        <li><strong>Time in the market:</strong> regular monthly investing means you buy at both high and low prices, which smooths your average cost.</li>
        <li><strong>Taxes:</strong> in a taxable account you pay tax on dividends each year and on gains when you sell; in a 401(k) or IRA growth is tax-deferred or tax-free.</li>
      </ul>
      <p>Plan workplace retirement savings with the <Link href="/401k-calculator/">401(k) calculator</Link>, compare with steady compound interest in the <Link href="/interest-calculator/">interest calculator</Link>, or see how long savings last in retirement with the <Link href="/how-long-will-retirement-savings-last-calculator/">retirement savings calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
