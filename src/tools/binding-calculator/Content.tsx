import Link from "next/link";

/** Brief + competitor findings: docs/research/binding-calculator.md · research/binding-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the quilt binding calculator</h2>
      <ol>
        <li>Enter the finished quilt&apos;s width and length, or pick a common size and adjust it.</li>
        <li>Enter the strip width you cut (2½″ is typical), the usable width of your fabric and the extra length for joins.</li>
        <li>Choose straight-grain strips or continuous bias to get the number of strips or the square to cut, and the yardage to buy.</li>
      </ol>

      <h2 id="formulas">Quilt binding formulas</h2>
      <div className="formula">Perimeter = 2 × (width + length)<br />Binding length = perimeter + extra for joins (10–20″)<br />Strips = binding length ÷ usable fabric width, rounded up<br />Fabric for strips = strips × strip width (÷ 36 for yards)<br />Continuous bias square = √(binding length × strip width), rounded up</div>

      <h2 id="example">Worked example</h2>
      <p>A 60 × 72 inch quilt with 2½ inch strips cut from 42 inch fabric:</p>
      <ul>
        <li>Perimeter = 2 × (60 + 72) = 264″. Add 10″ for joins: <strong>274″</strong> of binding (about 7.6 yards).</li>
        <li>Strips = 274 ÷ 42 = 6.5, so cut <strong>7 strips</strong>, joined with 6 seams. You&apos;ll have about 20″ left over.</li>
        <li>Fabric = 7 × 2.5 = 17.5″ = 0.49 yard, so buy <strong>½ yard</strong>.</li>
        <li>For continuous bias: 274 × 2.5 = 685 sq in, so cut a <strong>27″ square</strong>, which needs ¾ yard.</li>
      </ul>

      <h2 id="table">Binding for common quilt sizes (2½″ strips, 42″ fabric, 10″ extra)</h2>
      <table>
        <thead><tr><th>Quilt size</th><th>Binding length</th><th>Strips</th><th>Fabric</th></tr></thead>
        <tbody>
          <tr><td>36 × 52″ (baby)</td><td>186″</td><td>5</td><td>⅜ yd</td></tr>
          <tr><td>50 × 65″ (throw)</td><td>240″</td><td>6</td><td>½ yd</td></tr>
          <tr><td>70 × 90″ (twin)</td><td>330″</td><td>8</td><td>⅝ yd</td></tr>
          <tr><td>90 × 108″ (queen)</td><td>406″</td><td>10</td><td>¾ yd</td></tr>
          <tr><td>108 × 108″ (king)</td><td>442″</td><td>11</td><td>⅞ yd</td></tr>
        </tbody>
      </table>
      <p>Quilt sizes vary by pattern and mattress, so measure your finished, squared-up quilt before cutting.</p>

      <h2 id="tips">Binding tips</h2>
      <ul>
        <li>Square up the quilt and trim the batting and backing before you measure.</li>
        <li>Join strips with a diagonal seam; it spreads the bulk and is almost invisible once folded.</li>
        <li>Fold double-fold binding in half lengthwise, wrong sides together, and press before sewing.</li>
        <li>Leave a tail of about 8–10″ at the start so there&apos;s room to join the ends neatly.</li>
      </ul>
      <p>Plan stitch counts and fabric for embroidery with the <Link href="/cross-stitch-calculator/">cross stitch calculator</Link>, cut a skirt with the <Link href="/circle-skirt-calculator/">circle skirt calculator</Link>, or measure areas and trim with the <Link href="/square-footage-calculator/">square footage calculator</Link> and <Link href="/linear-feet-calculator/">linear feet calculator</Link>. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
    </>
  );
}
