import Link from "next/link";

/** Brief + competitor findings: docs/research/gcf-calculator.md · research/gcf-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the GCF calculator</h2>
      <ol>
        <li><strong>Enter two or more whole numbers</strong>, separated by commas or spaces. Very large numbers work too.</li>
        <li><strong>Read the GCF</strong> and whether the numbers are coprime.</li>
        <li><strong>Check the working</strong>: every common factor, each number&apos;s prime factorization, and the Euclidean algorithm steps.</li>
      </ol>

      <h2 id="methods">Three ways to find the GCF</h2>
      <h3>1. List the factors</h3>
      <p>Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. The largest one in both lists is <strong>6</strong>. This is simple for small numbers but slow for big ones.</p>
      <h3>2. Prime factorization</h3>
      <div className="formula">48 = 2⁴ × 3  ·  180 = 2² × 3² × 5  ·  300 = 2² × 3 × 5²<br />Common primes, lowest powers: 2² × 3 = 12</div>
      <h3>3. Euclidean algorithm</h3>
      <div className="formula">GCF(a, b) = GCF(b, a mod b), until the remainder is 0<br />1071 = 2 × 462 + 147  ·  462 = 3 × 147 + 21  ·  147 = 7 × 21 + 0  →  GCF = 21</div>
      <p>The Euclidean algorithm is the fastest method by far, which is why the calculator can handle numbers dozens of digits long.</p>

      <h2 id="table">Examples</h2>
      <table>
        <thead><tr><th>Numbers</th><th>GCF</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td>12, 18</td><td>6</td><td>12/18 simplifies to 2/3</td></tr>
          <tr><td>48, 180, 300</td><td>12</td><td>Common factors 1, 2, 3, 4, 6, 12</td></tr>
          <tr><td>1071, 462</td><td>21</td><td>Classic Euclid example</td></tr>
          <tr><td>17, 31</td><td>1</td><td>Both prime, so coprime</td></tr>
          <tr><td>8, 15</td><td>1</td><td>Coprime, though neither is prime</td></tr>
        </tbody>
      </table>

      <h2 id="uses">Using the GCF</h2>
      <ul>
        <li><strong>Simplify fractions:</strong> divide the top and bottom by their GCF, so 48/180 = 4/15. The <Link href="/fraction-calculator/">fraction calculator</Link> does this automatically.</li>
        <li><strong>Reduce ratios:</strong> 48:180 simplifies to 4:15. See the <Link href="/ratio-calculator/">ratio calculator</Link>.</li>
        <li><strong>Simplify roots:</strong> pulling perfect squares out of √72 uses the same factoring idea. Try the <Link href="/square-root-calculator/">square root calculator</Link>.</li>
        <li><strong>Equal groups:</strong> 48 red and 180 blue beads make at most 12 identical bags (4 red + 15 blue each).</li>
      </ul>
      <p>More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
