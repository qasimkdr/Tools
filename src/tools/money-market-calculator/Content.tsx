import Link from "next/link";

/** Brief + competitor findings: docs/research/money-market-calculator.md · research/money-market-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the money market calculator</h2>
      <ol>
        <li><strong>Enter your opening deposit</strong> and how much you&apos;ll add (or withdraw) each month.</li>
        <li><strong>Enter the rate</strong> as APY (the usual way banks advertise it) or APR, plus how often it compounds.</li>
        <li><strong>Choose how long</strong> to keep the money there and, optionally, your tax rate to see interest after tax.</li>
      </ol>

      <h2 id="formula">Money market interest formula</h2>
      <div className="formula">Monthly growth = (1 + APY)^(1/12) − 1<br />APY = (1 + APR ÷ n)ⁿ − 1   (n = 365 for daily, 12 for monthly compounding)<br />Balance after each month = previous balance × (1 + monthly growth) + monthly deposit</div>

      <h2 id="example">Example</h2>
      <p>Open with <strong>$10,000</strong>, add <strong>$200 a month</strong>, earn <strong>4.00% APY</strong> for <strong>5 years</strong>:</p>
      <div className="formula">Total deposited: $10,000 + 60 × $200 = $22,000<br />Balance after 5 years: $25,402.33  ·  interest earned: $3,402.33</div>
      <p>With a 22% tax rate on the interest, you&apos;d keep about $2,654 of it.</p>

      <h2 id="table">What $10,000 earns at different rates</h2>
      <table>
        <thead><tr><th>APY</th><th>After 1 year</th><th>After 5 years</th><th>After 10 years</th></tr></thead>
        <tbody>
          <tr><td>2%</td><td>$10,200</td><td>$11,041</td><td>$12,190</td></tr>
          <tr><td>3%</td><td>$10,300</td><td>$11,593</td><td>$13,439</td></tr>
          <tr><td>4%</td><td>$10,400</td><td>$12,167</td><td>$14,802</td></tr>
          <tr><td>5%</td><td>$10,500</td><td>$12,763</td><td>$16,289</td></tr>
        </tbody>
      </table>

      <h2 id="account-vs-fund">Money market account vs money market fund</h2>
      <table>
        <thead><tr><th></th><th>Money market account</th><th>Money market fund</th></tr></thead>
        <tbody>
          <tr><td>Offered by</td><td>Banks and credit unions</td><td>Brokerages and fund companies</td></tr>
          <tr><td>Insurance</td><td>FDIC or NCUA, up to $250,000 per depositor, per institution, per ownership category</td><td>Not insured; aims for a stable $1 share price</td></tr>
          <tr><td>Return</td><td>Variable APY set by the bank</td><td>Variable yield from short-term debt</td></tr>
          <tr><td>Access</td><td>Debit card or checks at some banks; transfers</td><td>Sell shares, usually settled within a day</td></tr>
        </tbody>
      </table>
      <p>For deposit insurance details, see the FDIC&apos;s{" "}
        <a href="https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" rel="noopener" target="_blank">understanding deposit insurance</a> page.</p>

      <h2 id="compare">Comparing your options</h2>
      <ul>
        <li><strong>Savings vs paying down debt:</strong> if a loan charges more interest than the account pays, extra payments usually win. Check a loan&apos;s rate with the <Link href="/interest-rate-calculator/">interest rate calculator</Link>.</li>
        <li><strong>Long-term goals:</strong> money market accounts suit emergency funds and short-term savings. For retirement, see the <Link href="/401k-calculator/">401(k) calculator</Link>.</li>
        <li><strong>Comparing investments with uneven returns:</strong> discount them to today&apos;s value with the <Link href="/npv-calculator/">NPV calculator</Link>, using the money market rate as your benchmark.</li>
      </ul>
      <p className="text-sm">Estimates for planning only; rates are variable and not guaranteed. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
