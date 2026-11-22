import Link from "next/link";

/** Brief + competitor findings: docs/research/random-number-generator.md · research/random-number-generator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the random number generator</h2>
      <ol>
        <li><strong>Choose a range:</strong> tap a quick range (1–10, 1–16, 1–100, 1–1000, 4-digit, dice) or type any minimum and maximum, including negatives.</li>
        <li><strong>Choose how many</strong> numbers you want (up to 1,000), whole or decimal.</li>
        <li><strong>Set repeats and sorting:</strong> &quot;No repeats&quot; works like drawing tickets from a hat, and sorting makes long lists easier to read.</li>
        <li><strong>Press Generate.</strong> Copy the result with one tap; your previous draws stay listed until you leave the page.</li>
      </ol>

      <h2 id="how-it-works">How the numbers are generated</h2>
      <p>Many simple generators use a basic pseudo-random function and the remainder (modulo) trick to fit numbers into a range. That can make some numbers slightly more likely than others. This generator does two things differently:</p>
      <ul>
        <li><strong>Secure source:</strong> it draws from your browser&apos;s cryptographically secure generator (<code>crypto.getRandomValues</code>), the same randomness used to create encryption keys.</li>
        <li><strong>No modulo bias:</strong> values that would tilt the odds are thrown away and redrawn (rejection sampling), so every number in your range has exactly the same chance.</li>
      </ul>
      <div className="formula">P(any one number) = 1 ÷ (max − min + 1)<br />1–100 → 1 ÷ 100 = 1% per draw   ·   1–16 → 6.25%   ·   dice 1–6 → 16.67%</div>
      <p>With &quot;No repeats&quot; on, numbers are drawn using a Fisher–Yates shuffle, so every possible set of picks is equally likely.</p>

      <h2 id="uses">Popular uses</h2>
      <ul>
        <li><strong>Giveaways and raffles:</strong> number the entries, set the range to match, turn on No repeats, and draw your winners.</li>
        <li><strong>Classrooms and games:</strong> pick a student, a question number, a team order or a board-game move. 1–16 is popular for tournament seeding and bracket slots.</li>
        <li><strong>Decisions:</strong> assign each option a number and let the generator choose. For yes/no, use 1–2.</li>
        <li><strong>Sampling and testing:</strong> select random rows from a list, random survey participants or test data.</li>
      </ul>

      <h2 id="odds">Understanding the odds</h2>
      <table>
        <thead><tr><th>Range</th><th>Chance of a specific number</th><th>Odds against</th></tr></thead>
        <tbody>
          <tr><td>1–6 (die)</td><td>16.67%</td><td>5 : 1</td></tr>
          <tr><td>1–10</td><td>10%</td><td>9 : 1</td></tr>
          <tr><td>1–16</td><td>6.25%</td><td>15 : 1</td></tr>
          <tr><td>1–100</td><td>1%</td><td>99 : 1</td></tr>
          <tr><td>1000–9999 (4-digit)</td><td>0.0111%</td><td>8,999 : 1</td></tr>
        </tbody>
      </table>
      <p>&quot;Odds against&quot; is a ratio of losing outcomes to winning ones. Read more about ratios with the <Link href="/ratio-calculator/">ratio calculator</Link>.</p>
      <p><strong>Streaks are normal.</strong> With repeats allowed, each draw is independent. Getting the same number twice in a row from 1–10 happens 10% of the time; it doesn&apos;t mean the generator is broken. The idea that a number is &quot;due&quot; is the gambler&apos;s fallacy.</p>

      <h2 id="limits">Good to know</h2>
      <ul>
        <li>Numbers are generated on your device and aren&apos;t stored or sent anywhere.</li>
        <li>For passwords, use a password manager that generates and stores them securely.</li>
        <li>Prize draws and lotteries may have legal requirements where you live. Check before running one.</li>
      </ul>
      <p>Browse more <Link href="/category/math/">math tools</Link> or see <Link href="/tools/">all calculators</Link>.</p>
    </>
  );
}
