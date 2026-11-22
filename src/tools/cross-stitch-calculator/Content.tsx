import Link from "next/link";

/** Brief + competitor findings: docs/research/cross-stitch-calculator.md · research/cross-stitch-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the cross stitch calculator</h2>
      <ol>
        <li><strong>Enter the design size in stitches</strong> from your pattern (width × height).</li>
        <li><strong>Choose the fabric count</strong> and whether you stitch over one or two threads.</li>
        <li><strong>Set the margin</strong> you want around the design, then read the finished size and fabric to cut, with a comparison across common counts.</li>
      </ol>

      <h2 id="formula">Cross stitch size formula</h2>
      <div className="formula">Stitches per inch = fabric count ÷ (1 or 2 for over-two)<br />Design size (in) = stitches ÷ stitches per inch<br />Fabric to cut = design size + 2 × margin   (cm = inches × 2.54)</div>

      <h2 id="example">Example: 140 × 100 stitches</h2>
      <table>
        <thead><tr><th>Fabric</th><th>Design size</th><th>With 3 in margins</th></tr></thead>
        <tbody>
          <tr><td>11-count Aida</td><td>12.73 × 9.09 in</td><td>18.73 × 15.09 in</td></tr>
          <tr><td>14-count Aida</td><td>10 × 7.14 in</td><td>16 × 13.14 in</td></tr>
          <tr><td>18-count Aida</td><td>7.78 × 5.56 in</td><td>13.78 × 11.56 in</td></tr>
          <tr><td>28-count linen, over two</td><td>10 × 7.14 in</td><td>16 × 13.14 in</td></tr>
        </tbody>
      </table>

      <h2 id="fabrics">Choosing a fabric</h2>
      <ul>
        <li><strong>Aida</strong> has a clear grid of holes, making it the easiest to start with; 14-count is the classic choice.</li>
        <li><strong>Evenweave and linen</strong> (25–36 count) are usually stitched over two threads, giving a softer look and allowing fractional stitches.</li>
        <li><strong>Higher counts</strong> shrink the finished piece and show more detail, but are harder on the eyes.</li>
      </ul>

      <h2 id="tips">Tips</h2>
      <ul>
        <li><strong>Cut generously:</strong> it&apos;s easy to trim extra fabric and impossible to add it back.</li>
        <li><strong>Check the frame first:</strong> pick fabric so the design plus mat fits a standard frame size.</li>
        <li><strong>Resizing a design?</strong> Changing the count scales width and height by the same ratio; the <Link href="/ratio-calculator/">ratio calculator</Link> shows the new proportions.</li>
        <li><strong>Fractional inches</strong> like 7⅛ are easy to add up with the <Link href="/fraction-calculator/">fraction calculator</Link>.</li>
      </ul>
      <p>Sewing something to wear instead? Try the <Link href="/circle-skirt-calculator/">circle skirt calculator</Link>, and for larger fabric areas the <Link href="/square-footage-calculator/">square footage calculator</Link>. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
    </>
  );
}
