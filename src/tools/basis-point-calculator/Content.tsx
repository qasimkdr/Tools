import Link from "next/link";

/** Brief + competitor findings: docs/research/basis-point-calculator.md · research/basis-point-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the basis point calculator</h2>
      <ol>
        <li><strong>Convert:</strong> turn basis points into a percent and decimal, or a percent into basis points.</li>
        <li><strong>Rate change:</strong> enter an old and new rate to get the change in basis points.</li>
        <li><strong>Dollar value:</strong> find what a number of basis points is worth on an amount, such as a fee on a fund balance.</li>
        <li><strong>Loan payment:</strong> see how a rate move of so many basis points changes a monthly loan payment.</li>
      </ol>

      <h2 id="formulas">Basis point formulas</h2>
      <div className="formula">1 basis point = 0.01% = 0.0001<br />Percent = bps ÷ 100 · bps = percent × 100 · Decimal = bps ÷ 10,000<br />Rate change (bps) = (new rate % − old rate %) × 100<br />Dollar value = amount × bps ÷ 10,000</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>25 bps</strong> = 25 ÷ 100 = <strong>0.25%</strong> = 0.0025.</li>
        <li>A rate falling from <strong>4.75% to 4.25%</strong> is (4.25 − 4.75) × 100 = <strong>−50 bps</strong>.</li>
        <li><strong>1.5 bps of $65,000</strong> = 65,000 × 1.5 ÷ 10,000 = <strong>$9.75</strong>.</li>
        <li>A <strong>$300,000</strong>, 30-year loan at 6.50% costs $1,896.20 a month. A <strong>25 bp</strong> rise to 6.75% makes it $1,945.79, <strong>$49.59 more</strong> each month.</li>
      </ul>

      <h2 id="why">Why use basis points?</h2>
      <p>Saying &quot;the rate rose 1%&quot; is ambiguous: from 5% it could mean 6% (one percentage point) or 5.05% (one percent of 5%). Basis points remove the doubt: a rise of 100 bps always means one full percentage point. That is why central banks, lenders, bond traders and fund managers quote changes in bps.</p>
      <ul>
        <li><strong>Interest rates:</strong> a 25 bp cut takes a 5.00% rate to 4.75%.</li>
        <li><strong>Fund fees:</strong> an expense ratio of 3 bps (0.03%) costs $3 a year per $10,000 invested.</li>
        <li><strong>Bond spreads and yields</strong> are quoted as so many bps above a benchmark.</li>
      </ul>

      <h2 id="table">Basis points conversion table</h2>
      <div className="overflow-x-auto">
        <table>
          <thead><tr><th>Basis points</th><th>Percent</th><th>Decimal</th></tr></thead>
          <tbody>
            {[1, 5, 10, 25, 50, 75, 100, 150, 200, 500, 1000].map((b) => <tr key={b}><td>{b} bps</td><td>{b / 100}%</td><td>{b / 10000}</td></tr>)}
          </tbody>
        </table>
      </div>
      <p>Compare loan offers with the <Link href="/apr-calculator/">APR calculator</Link>, model a mortgage with the <Link href="/mortgage-calculator/">mortgage calculator</Link>, find a rate from a payment with the <Link href="/interest-rate-calculator/">interest rate calculator</Link>, or work out any percentage with the <Link href="/percent-calculator/">percent calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
