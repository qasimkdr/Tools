import Link from "next/link";

/** Brief + competitor findings: docs/research/ratio-calculator.md · research/ratio-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the ratio calculator</h2>
      <ul>
        <li><strong>Simplify:</strong> type a ratio such as <code>12:18</code> or <code>1.5:2.5:4</code> to get its simplest form, each part&apos;s percentage, and the ratio as a fraction and in 1&nbsp;:&nbsp;n form.</li>
        <li><strong>Solve A:B = C:D:</strong> fill three values and leave the fourth empty to find the missing number.</li>
        <li><strong>Scale:</strong> multiply every term by a factor to make an equivalent ratio, such as doubling a recipe or resizing a drawing.</li>
        <li><strong>Split a total:</strong> share an amount (money, paint, ingredients) between parts in a given ratio.</li>
      </ul>
      <p>Every mode shows the working step by step, and a color bar shows how big each part is.</p>

      <h2 id="formulas">Ratio formulas</h2>
      <div className="formula">Simplify:  a : b  =  (a ÷ g) : (b ÷ g),  g = greatest common factor<br />Solve:  A : B = C : D  ⟹  A × D = B × C<br />Split total T:  part<sub>i</sub> = T × term<sub>i</sub> ÷ (sum of terms)<br />Share of whole:  a ÷ (a + b)</div>

      <h2 id="examples">Worked examples</h2>
      <h3>Simplify 1920:1080 (a screen size)</h3>
      <p>The greatest common factor of 1920 and 1080 is 120. 1920 ÷ 120 = 16 and 1080 ÷ 120 = 9, so the screen is <strong>16:9</strong>.</p>
      <h3>Decimals: 1.5 : 2.5</h3>
      <p>Multiply both terms by 10 to get 15:25, then divide by 5 to get <strong>3:5</strong>.</p>
      <h3>Split $100 in the ratio 2:3</h3>
      <p>There are 2 + 3 = 5 parts, so one part is $100 ÷ 5 = $20. The shares are <strong>$40 and $60</strong>.</p>
      <h3>A three-part mix: 1:2:3</h3>
      <p>For 6 cubic feet of a 1:2:3 mix, there are 6 parts in total, so one part is 1 cubic foot: <strong>1, 2 and 3 cubic feet</strong> of each ingredient.</p>
      <h3>What does a 3:2 ratio mean as a percentage?</h3>
      <p>There are 5 parts in total, so the first part is 3/5 = <strong>60%</strong> and the second is 2/5 = <strong>40%</strong>. As a single number comparing them, 3:2 = 1.5.</p>

      <h2 id="uses">Where ratios show up</h2>
      <ul>
        <li><strong>Cooking and mixing:</strong> water-to-rice, concentrate-to-water, fuel-to-oil mixes for small engines.</li>
        <li><strong>Screens and photos:</strong> aspect ratios such as 16:9, 4:3 and 3:2.</li>
        <li><strong>Money:</strong> sharing costs or profits, and lender ratios such as debt-to-income. Monthly debt of $1,500 against $5,000 income is 3:10, or 30%. To see how a new loan changes that, estimate its payment with the <Link href="/payment-calculator/">payment calculator</Link>.</li>
        <li><strong>Maps and models:</strong> scales such as 1:50,000 or 1:24.</li>
      </ul>

      <h2 id="mistakes">Common mistakes</h2>
      <ul>
        <li><strong>Swapping the order.</strong> 2:3 and 3:2 are different. Keep each term tied to the same thing throughout.</li>
        <li><strong>Mixing units.</strong> Convert first: 30 minutes to 2 hours is 30:120, which is 1:4, not 30:2.</li>
        <li><strong>Treating part-to-part as part-to-whole.</strong> In 2:3, the first part is 2/5 of the total, not 2/3.</li>
      </ul>

      <h2 id="proportions">Ratios and proportions</h2>
      <p>When two ratios are equal, they form a proportion. For inverse relationships, where one quantity goes up as the other goes down, or to see the cross-multiplication laid out as fractions, use the <Link href="/proportion-calculator/">proportion calculator</Link>. Browse more <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
