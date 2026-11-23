import Link from "next/link";

/** Brief + competitor findings: docs/research/split-calculator.md · research/split-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the split calculator</h2>
      <ol>
        <li>Choose <strong>Evenly</strong> if everyone pays the same, or <strong>By what each person ordered</strong> for an itemized split.</li>
        <li>For an even split, enter the bill before tax and tip and the number of people. For an itemized split, enter each person&apos;s own items and anything the table shared.</li>
        <li>Enter the sales tax and tip percentages, and choose whether the tip is worked out on the bill before or after tax.</li>
        <li>Optionally round each share up to the next $1 or $5 so nobody needs coins; the calculator shows how much extra that collects.</li>
      </ol>

      <h2 id="formulas">Bill split formulas</h2>
      <div className="formula">Tax = subtotal × tax rate<br />Tip = subtotal × tip rate (or (subtotal + tax) × tip rate when tipping after tax)<br />Even split: each share = (subtotal + tax + tip) ÷ people<br />Itemized split: your items = own items + shared items ÷ people<br />Your tax = tax × (your items ÷ subtotal), and the same for the tip when it is shared by amount</div>
      <p>Every share is rounded to the cent with the <strong>largest-remainder method</strong>: shares are rounded down, then the leftover cents go to the people whose shares were rounded down the most. That way the shares always add up to the exact bill, never a cent short or over.</p>

      <h2 id="example">Worked examples</h2>
      <p><strong>Even split.</strong> A $120.00 dinner for 4 with 8% tax and an 18% tip on the pre-tax amount:</p>
      <ul>
        <li>Tax = $120 × 0.08 = <strong>$9.60</strong>. Tip = $120 × 0.18 = <strong>$21.60</strong>.</li>
        <li>Total = $120 + $9.60 + $21.60 = <strong>$151.20</strong>, so each person pays $151.20 ÷ 4 = <strong>$37.80</strong>.</li>
      </ul>
      <p><strong>Itemized split.</strong> Alex ordered $32.50, Sam $18.00 and Jo $24.50, and they shared a $15.00 starter. Tax is 8% and the tip is 18% before tax:</p>
      <ul>
        <li>Items with the shared starter ($5 each): Alex $37.50, Sam $23.00, Jo $29.50, subtotal <strong>$90.00</strong>.</li>
        <li>Tax $7.20 and tip $16.20 are shared by amount. Alex pays $37.50 + $3.00 + $6.75 = <strong>$47.25</strong>, Sam $23.00 + $1.84 + $4.14 = <strong>$28.98</strong>, Jo $29.50 + $2.36 + $5.31 = <strong>$37.17</strong>.</li>
        <li>Check: $47.25 + $28.98 + $37.17 = $113.40 = $90.00 + $7.20 + $16.20.</li>
      </ul>

      <h2 id="fair">Which split is fairest?</h2>
      <ul>
        <li><strong>Even split</strong> is quickest and works when everyone ordered about the same.</li>
        <li><strong>Itemized split</strong> is fairest when orders differ a lot, for example one person had a salad and another a steak and drinks. Tax follows what each person ordered, so it is always shared by amount.</li>
        <li><strong>Tip by amount or equally:</strong> sharing the tip by amount means bigger orders tip more. Sharing it equally treats the tip as a thank-you for the whole table&apos;s service. Choose what your group agrees on.</li>
        <li><strong>Before or after tax:</strong> many people tip on the pre-tax amount. Tipping after tax adds a little more (18% of the tax), so pick whichever your group prefers.</li>
      </ul>
      <p>Work out a tip or tax rate with the <Link href="/percent-calculator/">percent calculator</Link>, check a sale price with the <Link href="/discount-calculator/">discount calculator</Link>, or share a cost by days or usage with the <Link href="/pro-rata-calculator/">pro rata calculator</Link>. Counting the cash at the end? Use the <Link href="/money-counter/">money counter</Link>. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
    </>
  );
}
