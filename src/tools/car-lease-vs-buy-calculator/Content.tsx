import Link from "next/link";

/** Brief + competitor findings: docs/research/car-lease-vs-buy-calculator.md · research/car-lease-vs-buy-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the lease vs buy calculator</h2>
      <ol>
        <li>Enter the <strong>negotiated price</strong>, your down payment or trade-in, and your sales tax rate.</li>
        <li>Enter the lease terms from the dealer: term, <strong>residual value</strong> and <strong>money factor</strong> (or lease APR).</li>
        <li>Enter the loan APR and term for buying, and optionally what you think the car will be worth when the lease would end.</li>
        <li>Compare monthly payments, total paid, equity and net cost side by side.</li>
      </ol>

      <h2 id="formulas">Lease vs buy formulas</h2>
      <div className="formula">Lease payment = (cap cost − residual) ÷ months + (cap cost + residual) × money factor, plus tax<br />Loan payment = P × r ÷ (1 − (1 + r)^−n)<br />Net cost of buying (over the lease term) = down + payments made − (car value − loan balance)<br />APR ≈ money factor × 2,400</div>

      <h2 id="example">Worked example</h2>
      <p>A <strong>$35,000</strong> car with <strong>$3,000 down</strong> and <strong>7% sales tax</strong>:</p>
      <ul>
        <li><strong>Lease</strong>, 36 months, 60% residual ($21,000), money factor 0.00125: $305.56 depreciation + $66.25 rent charge = $371.81, or <strong>$397.83</strong> with tax. Total over 36 months: <strong>$17,321.95</strong>.</li>
        <li><strong>Buy</strong>, 60-month loan at 6% on $34,450: <strong>$666.02</strong> a month. After 36 payments you owe $15,027 on a car worth about $21,000, so you have $5,973 of equity. Net cost: <strong>$21,003.75</strong>.</li>
        <li>Over three years, leasing is about <strong>$3,682 cheaper</strong>, but the buyer keeps the car; after the loan ends, there are no more payments.</li>
      </ul>

      <h2 id="checklist">Before you sign</h2>
      <ul>
        <li><strong>Negotiate the price</strong> first; lease payments are based on the capitalized cost.</li>
        <li><strong>Ask for the money factor and residual</strong> in writing, and check the mileage allowance and per-mile overage charge.</li>
        <li><strong>Compare the total cost</strong>, not just the monthly payment, as consumer agencies recommend.</li>
      </ul>
      <p>Check any loan payment with the <Link href="/payment-calculator/">payment calculator</Link>, include fees with the <Link href="/apr-calculator/">APR calculator</Link>, or find a rate from a quoted payment with the <Link href="/interest-rate-calculator/">interest rate calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
