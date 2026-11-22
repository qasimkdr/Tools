import Link from "next/link";

/** Brief + competitor findings: docs/research/sourdough-calculator.md · research/sourdough-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the sourdough calculator</h2>
      <ol>
        <li>Choose whether to start from the <strong>dough weight</strong> you want (for example a 900 g loaf) or the <strong>total flour</strong>.</li>
        <li>Set the <strong>hydration</strong>, <strong>starter %</strong>, your <strong>starter&apos;s hydration</strong> and <strong>salt %</strong>.</li>
        <li>Weigh out the flour, water, starter and salt shown. Switch to <strong>Starter feeding</strong> to split a feed by ratio.</li>
      </ol>

      <h2 id="formula">Sourdough formulas</h2>
      <div className="formula">Total flour F = dough weight ÷ (1 + hydration + salt %)<br />Starter = starter % × F · flour in starter = starter ÷ (1 + starter hydration)<br />Flour to add = F − flour in starter · Water to add = hydration × F − water in starter · Salt = salt % × F</div>

      <h2 id="example">Worked example: one 900 g loaf at 75%</h2>
      <p>With 20% starter at 100% hydration and 2% salt: total flour = 900 ÷ 1.77 = 508 g. The starter weighs 0.20 × 508 = <strong>102 g</strong> (51 g flour + 51 g water).</p>
      <table>
        <thead><tr><th>Ingredient</th><th>Weigh out</th><th>Baker&apos;s %</th></tr></thead>
        <tbody>
          <tr><td>Flour</td><td>458 g</td><td>90%</td></tr>
          <tr><td>Water</td><td>331 g</td><td>65%</td></tr>
          <tr><td>Starter</td><td>102 g</td><td>20%</td></tr>
          <tr><td>Salt</td><td>10 g</td><td>2%</td></tr>
          <tr><td><strong>Dough</strong></td><td><strong>900 g</strong></td><td>177%</td></tr>
        </tbody>
      </table>
      <p>Counting the starter, the dough has 508 g flour and 381 g water: exactly 75% hydration.</p>

      <h2 id="hydration">Hydration guide</h2>
      <table>
        <thead><tr><th>Hydration</th><th>Dough feel</th><th>Typical use</th></tr></thead>
        <tbody>
          <tr><td>60–65%</td><td>Firm, easy to shape</td><td>Bagels, sandwich loaves</td></tr>
          <tr><td>68–75%</td><td>Soft, slightly tacky</td><td>Everyday country loaves</td></tr>
          <tr><td>76–85%</td><td>Wet, sticky</td><td>Open-crumb loaves, ciabatta</td></tr>
        </tbody>
      </table>
      <p>Baker&apos;s math is all ratios; the <Link href="/ratio-calculator/">ratio calculator</Link> and <Link href="/proportion-calculator/">proportion calculator</Link> scale any recipe. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
    </>
  );
}
