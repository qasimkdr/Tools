import Link from "next/link";

/** Brief + competitor findings: docs/research/wedding-alcohol-calculator.md · research/wedding-alcohol-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the wedding alcohol calculator</h2>
      <ol>
        <li>Enter the number of guests who will drink and how many hours the bar will be open.</li>
        <li>Set drinks per guest per hour. One drink per guest per hour is the usual planning figure; raise it for a party crowd, lower it for a lunch reception.</li>
        <li>Pick the bar type (full bar, beer and wine, wine only or your own mix) and a buffer so you don&apos;t run out.</li>
        <li>Read the bottles of wine, bottles of liquor and cases of beer to buy, plus Champagne for a toast and an optional cost estimate.</li>
      </ol>

      <h2 id="formulas">Wedding alcohol formulas</h2>
      <div className="formula">Total drinks = guests × hours × drinks per guest per hour × (1 + buffer)<br />Wine bottles = wine servings ÷ 5 (a 750 ml bottle holds about five 5 oz glasses)<br />Liquor bottles = liquor drinks ÷ 16.9 (750 ml) or ÷ 39.4 (1.75 L) at 1.5 oz per drink<br />Beer cases = beer servings ÷ 24 · Champagne = guests ÷ 6.3 (4 oz toast pours per bottle)</div>
      <p>Serving sizes follow the US standard drink defined by NIAAA: 12 oz of regular beer, 5 oz of table wine or 1.5 oz of 80-proof spirits each contain about 14 g of pure alcohol.</p>

      <h2 id="example">Worked example</h2>
      <p><strong>100 guests, a 5-hour full bar, 1 drink per guest per hour, 10% buffer:</strong></p>
      <ul>
        <li>Total drinks = 100 × 5 × 1 × 1.1 = <strong>550</strong>.</li>
        <li>Wine (50%): 275 glasses ÷ 5.07 per bottle = <strong>55 bottles</strong>.</li>
        <li>Liquor (30%): 165 drinks ÷ 16.9 per bottle = <strong>10 bottles</strong> (750 ml), or 5 bottles of 1.75 L.</li>
        <li>Beer (20%): 110 beers = <strong>5 cases</strong> of 24.</li>
        <li>Champagne toast: 100 ÷ 6.3 = <strong>16 bottles</strong>.</li>
      </ul>

      <h2 id="tips">Tips for stocking a wedding bar</h2>
      <ul>
        <li><strong>Know your crowd:</strong> a wine-loving family or a beer-drinking group should change the mix. Use Custom to match.</li>
        <li><strong>Count only drinkers:</strong> leave out children and guests who don&apos;t drink.</li>
        <li><strong>Buy returnable:</strong> some stores take back unopened bottles; ask before you buy, and check your state&apos;s rules.</li>
        <li><strong>Don&apos;t forget:</strong> ice, mixers, garnishes, water and non-alcoholic options, and a plan for guests to get home safely.</li>
        <li><strong>Venue rules:</strong> many venues require licensed bartenders or limit self-supplied alcohol; check your contract.</li>
      </ul>
      <p>Share the bar bill among hosts with the <Link href="/split-calculator/">split calculator</Link>, work out the bartender&apos;s tip with the <Link href="/tip-calculator/">tip calculator</Link>, or check a bulk discount with the <Link href="/percent-calculator/">percent calculator</Link>. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
    </>
  );
}
