import Link from "next/link";

/** Brief + competitor findings: docs/research/money-counter.md · research/money-counter/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the money counter</h2>
      <ol>
        <li><strong>Pick the currency</strong>: US dollars, euros or British pounds.</li>
        <li><strong>Type how many of each bill and coin</strong> you have; each line shows its value as you go.</li>
        <li><strong>Read the total</strong> and the bill and coin subtotals. Enter an expected amount to check a cash drawer for over or short.</li>
      </ol>

      <h2 id="formula">How it adds up</h2>
      <div className="formula">Total = Σ (count × face value) for every bill and coin<br />Over / short = counted total − expected total</div>

      <h2 id="example">Example: counting a till</h2>
      <table>
        <thead><tr><th>Item</th><th>Count</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>$100</td><td>1</td><td>$100.00</td></tr>
          <tr><td>$20</td><td>3</td><td>$60.00</td></tr>
          <tr><td>$10</td><td>5</td><td>$50.00</td></tr>
          <tr><td>$5</td><td>4</td><td>$20.00</td></tr>
          <tr><td>$1</td><td>12</td><td>$12.00</td></tr>
          <tr><td>Quarters / dimes / nickels / pennies</td><td>23 / 15 / 6 / 48</td><td>$5.75 + $1.50 + $0.30 + $0.48</td></tr>
          <tr><td><strong>Total</strong></td><td></td><td><strong>$250.03</strong> ($242 in bills, $8.03 in coins)</td></tr>
        </tbody>
      </table>
      <p>If the drawer should hold $250.00, it&apos;s 3 cents over.</p>

      <h2 id="rolls">US coin rolls and bill straps</h2>
      <table>
        <thead><tr><th>Coin roll</th><th>Coins</th><th>Value</th><th>Bill strap (100 notes)</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Pennies</td><td>50</td><td>$0.50</td><td>$1</td><td>$100</td></tr>
          <tr><td>Nickels</td><td>40</td><td>$2.00</td><td>$5</td><td>$500</td></tr>
          <tr><td>Dimes</td><td>50</td><td>$5.00</td><td>$10</td><td>$1,000</td></tr>
          <tr><td>Quarters</td><td>40</td><td>$10.00</td><td>$20</td><td>$2,000</td></tr>
          <tr><td>Half dollars</td><td>20</td><td>$10.00</td><td>$50</td><td>$5,000</td></tr>
          <tr><td>Dollar coins</td><td>25</td><td>$25.00</td><td>$100</td><td>$10,000</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Cash-counting tips</h2>
      <ul>
        <li><strong>Face bills the same way</strong> and count largest to smallest; count twice for large amounts.</li>
        <li><strong>Count coins in stacks of 10</strong> (or use rolls) to avoid miscounts.</li>
        <li><strong>Splitting tips or a pot?</strong> Divide the total fairly with the <Link href="/ratio-calculator/">ratio calculator</Link>.</li>
        <li><strong>Checking pay?</strong> Compare cash wages with your take-home estimate from the <Link href="/paycheck-calculator/">paycheck calculator</Link>, or work out overtime with the <Link href="/overtime-calculator/">overtime calculator</Link>.</li>
      </ul>
      <p>More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
