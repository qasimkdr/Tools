import Link from "next/link";

/** Brief + competitor findings: docs/research/binary-calculator.md · research/binary-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the binary converter</h2>
      <ul>
        <li><strong>Convert numbers:</strong> pick the base you&apos;re typing in (binary, decimal, hex or octal) and enter a number of any size, including fractions and negatives. You&apos;ll get every other base, the two&apos;s complement pattern and the place-value breakdown.</li>
        <li><strong>Binary math:</strong> add, subtract, multiply or divide two binary numbers (with remainder), or combine them with AND, OR and XOR.</li>
        <li><strong>Text ↔ binary:</strong> turn words into 8-bit bytes or decode bytes back into text.</li>
      </ul>

      <h2 id="formula">How binary works</h2>
      <div className="formula">Binary place values: … 128  64  32  16  8  4  2  1 . ½  ¼  ⅛ …<br />Value = Σ digit × 2^position<br />10011100₂ = 128 + 16 + 8 + 4 = 156₁₀  ·  1010.101₂ = 8 + 2 + ½ + ⅛ = 10.625₁₀</div>

      <h2 id="examples">Worked examples</h2>
      <h3>Decimal 156 to binary, hex and octal</h3>
      <p>156 = 128 + 16 + 8 + 4, so the binary is <strong>1001 1100</strong>. Grouping four bits at a time gives hex <strong>9C</strong> (1001 = 9, 1100 = C), and grouping three bits gives octal <strong>234</strong>.</p>
      <h3>Binary arithmetic</h3>
      <table>
        <thead><tr><th>Problem</th><th>Binary result</th><th>Decimal check</th></tr></thead>
        <tbody>
          <tr><td>1011 + 110</td><td>10001</td><td>11 + 6 = 17</td></tr>
          <tr><td>11001 − 1010</td><td>1111</td><td>25 − 10 = 15</td></tr>
          <tr><td>1101 × 101</td><td>1000001</td><td>13 × 5 = 65</td></tr>
          <tr><td>1100 AND 1010</td><td>1000</td><td>12 AND 10 = 8</td></tr>
          <tr><td>1100 XOR 1010</td><td>110</td><td>12 XOR 10 = 6</td></tr>
        </tbody>
      </table>
      <h3>Negative numbers: −5 in 8 bits</h3>
      <p>5 = 00000101 → flip the bits → 11111010 → add 1 → <strong>11111011</strong>. An 8-bit signed value ranges from −128 to 127.</p>

      <h2 id="table">Decimal, binary and hex from 0 to 15</h2>
      <table>
        <thead><tr><th>Dec</th><th>Binary</th><th>Hex</th><th>Dec</th><th>Binary</th><th>Hex</th></tr></thead>
        <tbody>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
            <tr key={n}><td>{n}</td><td>{n.toString(2).padStart(4, "0")}</td><td>{n.toString(16).toUpperCase()}</td><td>{n + 8}</td><td>{(n + 8).toString(2)}</td><td>{(n + 8).toString(16).toUpperCase()}</td></tr>
          ))}
        </tbody>
      </table>
      <p>Useful landmarks: 255 = 1111 1111 = FF (the largest byte), 1,024 = 2¹⁰ and 65,535 = FFFF (the largest 16-bit unsigned number).</p>

      <h2 id="uses">Where you&apos;ll use binary</h2>
      <ul>
        <li><strong>Programming:</strong> bit flags, masks and permissions use AND, OR and XOR.</li>
        <li><strong>Networking:</strong> IP addresses and subnet masks are 32-bit binary numbers.</li>
        <li><strong>Colors:</strong> a web color like #FF8800 is three hex bytes: red 255, green 136, blue 0.</li>
        <li><strong>Very large or small numbers:</strong> computers store them as binary floating point, a binary version of scientific notation. See the <Link href="/scientific-notation-calculator/">scientific notation converter</Link> for the decimal side.</li>
      </ul>

      <h2 id="tips">Tips</h2>
      <ul>
        <li><strong>Powers of two:</strong> a 1 followed by n zeros is 2ⁿ, and n ones in a row is 2ⁿ − 1.</li>
        <li><strong>Fractions:</strong> only fractions with a power-of-2 denominator terminate. Work with exact fractions in the <Link href="/fraction-calculator/">fraction calculator</Link> first, then convert.</li>
        <li><strong>Random bits:</strong> need test data? The <Link href="/random-number-generator/">random number generator</Link> makes integers you can convert here.</li>
      </ul>
      <p>More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
