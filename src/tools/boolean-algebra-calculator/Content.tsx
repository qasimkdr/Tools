import Link from "next/link";

/** Brief + competitor findings: docs/research/boolean-algebra-calculator.md · research/boolean-algebra-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the Boolean algebra calculator</h2>
      <ol>
        <li>Type a Boolean expression using single-letter variables, such as <code>AB + A&apos;C + BC</code>.</li>
        <li>Read the minimal sum of products (SOP), the minimal product of sums (POS), the minterms and maxterms and the full truth table.</li>
        <li>To check your own answer, put it in the compare box: the calculator tells you whether it is equivalent, and if not, an input where it differs.</li>
      </ol>

      <h2 id="laws">Laws of Boolean algebra</h2>
      <table>
        <thead><tr><th>Law</th><th>AND form</th><th>OR form</th></tr></thead>
        <tbody>
          <tr><td>Identity</td><td>A · 1 = A</td><td>A + 0 = A</td></tr>
          <tr><td>Null</td><td>A · 0 = 0</td><td>A + 1 = 1</td></tr>
          <tr><td>Complement</td><td>A · A&apos; = 0</td><td>A + A&apos; = 1</td></tr>
          <tr><td>Idempotent</td><td>A · A = A</td><td>A + A = A</td></tr>
          <tr><td>Absorption</td><td>A(A + B) = A</td><td>A + AB = A</td></tr>
          <tr><td>Distributive</td><td>A(B + C) = AB + AC</td><td>A + BC = (A + B)(A + C)</td></tr>
          <tr><td>De Morgan</td><td>(AB)&apos; = A&apos; + B&apos;</td><td>(A + B)&apos; = A&apos;B&apos;</td></tr>
          <tr><td>Consensus</td><td>AB + A&apos;C + BC = AB + A&apos;C</td><td>(A + B)(A&apos; + C)(B + C) = (A + B)(A&apos; + C)</td></tr>
        </tbody>
      </table>

      <h2 id="method">How the simplification works (Quine–McCluskey)</h2>
      <div className="formula">1. Build the truth table and list the minterms (rows where the output is 1).<br />2. Repeatedly merge terms that differ in exactly one variable (011 + 111 → −11).<br />3. Terms that can&apos;t be merged any further are the prime implicants.<br />4. Choose the fewest prime implicants that cover every minterm (then the fewest literals).<br />5. For POS, do the same with the rows where the output is 0 and complement each literal.</div>

      <h2 id="example">Worked example</h2>
      <p>Simplify <code>AB + A&apos;C + BC</code>:</p>
      <ul>
        <li>Variables A, B, C. The output is 1 in rows 1 (001), 3 (011), 6 (110) and 7 (111): Σm(1, 3, 6, 7).</li>
        <li>Merging: 001 + 011 → 0−1 (A&apos;C); 110 + 111 → 11− (AB); 011 + 111 → −11 (BC). All three are prime implicants.</li>
        <li>A&apos;C covers rows 1 and 3, AB covers 6 and 7, so BC isn&apos;t needed. Minimal SOP: <strong>AB + A&apos;C</strong>.</li>
        <li>The zeros are rows 0, 2, 4 and 5, which give the minimal POS <strong>(A + C)(A&apos; + B)</strong>.</li>
      </ul>
      <p>Another quick check: <code>(A + B)(A + C)</code> simplifies to <strong>A + BC</strong>, the distributive law in its OR form.</p>

      <h2 id="uses">Where it&apos;s used</h2>
      <ul>
        <li><strong>Digital logic:</strong> fewer terms means fewer gates when you build the circuit.</li>
        <li><strong>Programming:</strong> simplifying a long <code>if</code> condition makes it easier to read and test.</li>
        <li><strong>Discrete math courses:</strong> checking truth tables, tautologies and equivalence proofs.</li>
      </ul>
      <p>Convert between bases with the <Link href="/binary-calculator/">binary calculator</Link>, work with matrices in the <Link href="/matrix-inverse-calculator/">matrix inverse calculator</Link>, or check arithmetic with the <Link href="/fraction-calculator/">fraction calculator</Link> and <Link href="/scientific-notation-calculator/">scientific notation calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
