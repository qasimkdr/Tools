import Link from "next/link";

/** Brief + competitor findings: docs/research/aspect-ratio-calculator.md · research/aspect-ratio-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the aspect ratio calculator</h2>
      <ol>
        <li><strong>Ratio from size</strong>: enter a width and height in pixels to get the simplified ratio, the decimal ratio and the nearest standard format.</li>
        <li><strong>Resize</strong>: pick or type a ratio, then enter a new width (or height) to get the other dimension without distortion.</li>
        <li><strong>Fit / crop</strong>: enter your image or video size and the frame size to see the letterboxed size, or the crop needed to fill the frame.</li>
      </ol>

      <h2 id="formula">Aspect ratio formulas</h2>
      <div className="formula">Ratio = (W ÷ g) : (H ÷ g), where g = greatest common divisor of W and H<br />New height = new width × H ÷ W · New width = new height × W ÷ H<br />Fit scale = min(frame W ÷ W, frame H ÷ H) · Fill scale = max(frame W ÷ W, frame H ÷ H)</div>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>1920 × 1080</strong>: gcd 120 → <strong>16:9</strong> (1.78:1).</li>
        <li><strong>Resize 16:9 to 1280 wide</strong>: 1280 × 9 ÷ 16 = <strong>720 px</strong> tall.</li>
        <li><strong>4000 × 3000 photo into a 1920 × 1080 frame</strong>: fit = <strong>1440 × 1080</strong> (240 px bars each side), or fill = 1920 × 1440 with 360 px cropped from height.</li>
      </ul>

      <h2 id="table">Common aspect ratios</h2>
      <table>
        <thead><tr><th>Ratio</th><th>Decimal</th><th>Typical use</th><th>Example size</th></tr></thead>
        <tbody>
          <tr><td>1:1</td><td>1.00</td><td>Square posts</td><td>1080 × 1080</td></tr>
          <tr><td>4:5</td><td>0.80</td><td>Portrait feed posts</td><td>1080 × 1350</td></tr>
          <tr><td>9:16</td><td>0.56</td><td>Vertical video</td><td>1080 × 1920</td></tr>
          <tr><td>4:3</td><td>1.33</td><td>Classic TV, tablets</td><td>1024 × 768</td></tr>
          <tr><td>3:2</td><td>1.50</td><td>35 mm photos, many cameras</td><td>6000 × 4000</td></tr>
          <tr><td>16:9</td><td>1.78</td><td>HD/4K video, monitors</td><td>3840 × 2160</td></tr>
          <tr><td>21:9</td><td>2.33</td><td>Ultrawide monitors</td><td>3440 × 1440</td></tr>
        </tbody>
      </table>
      <h2 id="print">Aspect ratios of photo print sizes</h2>
      <p>Prints don&apos;t all share a camera&apos;s shape, so some cropping is often needed. Most cameras shoot 3:2 (DSLRs and mirrorless) or 4:3 (phones and many compacts). Match the print to your photo, or use the fit / crop mode to see what will be lost.</p>
      <table>
        <thead><tr><th>Print size</th><th>Aspect ratio</th><th>From a 3:2 photo</th></tr></thead>
        <tbody>
          <tr><td>4 × 6 in</td><td>2:3</td><td>No crop</td></tr>
          <tr><td>5 × 7 in</td><td>5:7</td><td>Small crop from the long side</td></tr>
          <tr><td>8 × 10 in</td><td>4:5</td><td>Crops about 17% of the long side</td></tr>
          <tr><td>8 × 12 in</td><td>2:3</td><td>No crop</td></tr>
          <tr><td>11 × 14 in</td><td>11:14</td><td>Crops about 15% of the long side</td></tr>
          <tr><td>16 × 20 in</td><td>4:5</td><td>Crops about 17% of the long side</td></tr>
        </tbody>
      </table>
      <p>Tip: leave space around your subject when you shoot. It gives you room to crop to any print size later without cutting off heads or edges.</p>

      <p>Aspect ratios are ratios in their simplest form: the <Link href="/ratio-calculator/">ratio calculator</Link> simplifies any ratio, the <Link href="/gcf-calculator/">GCF calculator</Link> finds the common divisor, and the <Link href="/proportion-calculator/">proportion calculator</Link> solves for a missing value. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
