import Link from "next/link";

/** Brief + competitor findings: docs/research/npv-calculator.md · research/npv-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the NPV calculator</h2>
      <ol>
        <li><strong>Enter the initial investment</strong>, the amount spent today.</li>
        <li><strong>Enter your discount rate</strong>: the yearly return you require, or could earn elsewhere at similar risk.</li>
        <li><strong>Enter the expected cash flow for each year</strong>, adding or removing years as needed (up to 30). Use negative numbers for years with net costs.</li>
      </ol>
      <p>You get the NPV, the internal rate of return, the profitability index, simple and discounted payback periods, and a year-by-year table you can download.</p>

      <h2 id="formula">NPV formula</h2>
      <div className="formula">NPV = CF₁/(1 + r)¹ + CF₂/(1 + r)² + … + CFₙ/(1 + r)ⁿ − initial investment<br />Profitability index = present value of cash flows ÷ initial investment<br />IRR = the rate r at which NPV = 0</div>
      <p>Each future cash flow is divided by (1 + r) once for every year you wait for it, because money received later is worth less than money today.</p>

      <h2 id="example">Worked example</h2>
      <p>You invest <strong>$10,000</strong> and expect $3,000, $4,000, $5,000 and $3,000 over four years. Your required return is <strong>8%</strong>.</p>
      <table>
        <thead><tr><th>Year</th><th>Cash flow</th><th>÷ (1.08)ᵗ</th><th>Present value</th><th>Cumulative</th></tr></thead>
        <tbody>
          <tr><td>0</td><td>−$10,000</td><td>1</td><td>−$10,000.00</td><td>−$10,000.00</td></tr>
          <tr><td>1</td><td>$3,000</td><td>1.0800</td><td>$2,777.78</td><td>−$7,222.22</td></tr>
          <tr><td>2</td><td>$4,000</td><td>1.1664</td><td>$3,429.36</td><td>−$3,792.87</td></tr>
          <tr><td>3</td><td>$5,000</td><td>1.2597</td><td>$3,969.16</td><td>$176.29</td></tr>
          <tr><td>4</td><td>$3,000</td><td>1.3605</td><td>$2,205.09</td><td>$2,381.38</td></tr>
        </tbody>
      </table>
      <p><strong>NPV = $2,381.38</strong>, so the project beats an 8% return. The IRR is 18.03%, the profitability index 1.238, the simple payback 2.6 years and the discounted payback 2.96 years. At 12% the NPV falls to $1,332.80, and at 15% to $636.11, which shows how much the answer depends on the rate you choose.</p>

      <h2 id="decide">How to read the result</h2>
      <ul>
        <li><strong>NPV &gt; 0:</strong> the investment is expected to earn more than your required return and add value.</li>
        <li><strong>NPV &lt; 0:</strong> you&apos;d do better at your required return elsewhere.</li>
        <li><strong>Comparing projects:</strong> prefer the higher NPV. IRR can mislead when projects differ in size or timing, and some cash-flow patterns (costs in later years) have more than one IRR.</li>
        <li><strong>Profitability index above 1</strong> means the same as a positive NPV, and helps rank projects when budget is limited.</li>
      </ul>

      <h2 id="rate">Choosing a discount rate</h2>
      <p>Businesses often use their weighted average cost of capital (WACC). For personal decisions, use the rate on debt you&apos;d otherwise pay down, or the return you&apos;d expect from a comparable investment. If you&apos;re unsure what return a set of cash flows implies, the <Link href="/interest-rate-calculator/">interest rate calculator</Link> works backward from payments, and the IRR here does the same for uneven cash flows.</p>

      <h2 id="uses">Common uses</h2>
      <ul>
        <li><strong>Equipment and business projects:</strong> does the saving or extra income justify the purchase?</li>
        <li><strong>Real estate:</strong> rental income and sale proceeds versus purchase price. For the loan side, see the <Link href="/mortgage-calculator/">mortgage calculator</Link>.</li>
        <li><strong>Loans and leases:</strong> compare paying cash with financing, using the <Link href="/payment-calculator/">payment calculator</Link> for the monthly payments.</li>
      </ul>

      <h2 id="limits">Limitations</h2>
      <ul>
        <li>NPV is only as good as the cash-flow forecasts and the rate you choose.</li>
        <li>The calculator assumes each cash flow arrives at the end of its year, the same convention as Excel&apos;s NPV function.</li>
        <li>Taxes, inflation and risk should be reflected either in the cash flows or in the discount rate, not both.</li>
      </ul>
      <p className="text-sm">For education and planning, not investment advice. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
