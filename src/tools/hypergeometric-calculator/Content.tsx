import Link from "next/link";

/** Brief + competitor findings: docs/research/hypergeometric-calculator.md · research/hypergeometric-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the hypergeometric calculator</h2>
      <ol>
        <li><strong>Enter the population size (N)</strong> and how many of those count as successes (K).</li>
        <li><strong>Enter the sample size (n)</strong>, how many you draw without putting them back.</li>
        <li><strong>Enter k</strong>, the number of successes you&apos;re asking about, and read the exact, &quot;at most&quot; and &quot;at least&quot; probabilities, plus the mean and a distribution chart.</li>
      </ol>

      <h2 id="formula">Hypergeometric formula</h2>
      <div className="formula">P(X = k) = C(K, k) × C(N − K, n − k) ÷ C(N, n)<br />C(a, b) = a! ÷ (b! × (a − b)!)<br />Mean = nK ÷ N  ·  Variance = n (K/N)(1 − K/N)(N − n) ÷ (N − 1)</div>

      <h2 id="examples">Worked examples</h2>
      <table>
        <thead><tr><th>Question</th><th>N, K, n, k</th><th>Probability</th></tr></thead>
        <tbody>
          <tr><td>Exactly 2 aces in a 5-card poker hand</td><td>52, 4, 5, 2</td><td>0.0399 (about 1 in 25)</td></tr>
          <tr><td>At least 1 of 4 copies in a 7-card hand from 60</td><td>60, 4, 7, ≥1</td><td>0.3995 (40%)</td></tr>
          <tr><td>Match exactly 3 in a 6/49 lottery</td><td>49, 6, 6, 3</td><td>0.0177 (about 1 in 57)</td></tr>
          <tr><td>Jackpot: match all 6</td><td>49, 6, 6, 6</td><td>1 in 13,983,816</td></tr>
          <tr><td>3 red marbles in 5 draws (10 red, 30 blue)</td><td>40, 10, 5, 3</td><td>0.0793</td></tr>
        </tbody>
      </table>

      <h2 id="binomial">Hypergeometric vs binomial</h2>
      <p>Both count successes, but the binomial assumes each trial has the same probability (sampling with replacement, or a huge population). In a 52-card deck, once an ace is drawn the chance of another drops from 4/52 to 3/51, which is exactly what the hypergeometric distribution accounts for. When the population is much larger than the sample, the two give nearly identical results, and for large samples both look like a bell curve; see the <Link href="/normal-cdf-calculator/">normal CDF calculator</Link>.</p>

      <h2 id="uses">Common uses</h2>
      <ul>
        <li><strong>Card games and deck building:</strong> odds of drawing key cards in an opening hand.</li>
        <li><strong>Lotteries and raffles:</strong> the chance of matching some or all numbers.</li>
        <li><strong>Quality control:</strong> the chance of finding defective items when inspecting a sample from a batch.</li>
        <li><strong>Ecology and surveys:</strong> capture-recapture estimates and sampling from small groups. For estimating proportions from a sample, see the <Link href="/confidence-interval-calculator/">confidence interval calculator</Link>.</li>
      </ul>
      <p>Need to draw a fair random sample? The <Link href="/random-number-generator/">random number generator</Link> can pick unique numbers without repeats. Probabilities as fractions? Simplify them with the <Link href="/fraction-calculator/">fraction calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
