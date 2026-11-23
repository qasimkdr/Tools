import Link from "next/link";

/** Brief + competitor findings: docs/research/bench-press-max-calculator.md · research/bench-press-max-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the bench press max calculator</h2>
      <ol>
        <li><strong>Do a hard set</strong> with good form: a weight you can bench for about 3–6 reps gives the most reliable estimate.</li>
        <li><strong>Enter the weight and the reps you completed</strong>, in pounds or kilograms.</li>
        <li><strong>Read your estimated one-rep max (1RM)</strong> from three formulas, a training-percentage table, and the plates to load on each side of the bar.</li>
      </ol>

      <h2 id="formulas">One-rep max formulas</h2>
      <div className="formula">Epley:  1RM = weight × (1 + reps ÷ 30)<br />Brzycki:  1RM = weight × 36 ÷ (37 − reps)<br />Lombardi:  1RM = weight × reps<sup>0.10</sup></div>
      <p>All three agree closely at low reps and spread apart as reps rise, which is why the calculator shows each one and their average. Above about 10 reps, muscular endurance matters more than maximal strength, so the estimates become unreliable. Retest with a heavier weight instead.</p>

      <h2 id="example">Example: 225 lb for 5 reps</h2>
      <ul>
        <li>Epley: 225 × (1 + 5/30) = <strong>262.5 lb</strong></li>
        <li>Brzycki: 225 × 36 ÷ 32 = <strong>253.1 lb</strong></li>
        <li>Lombardi: 225 × 5<sup>0.1</sup> ≈ <strong>264.3 lb</strong></li>
        <li>Average ≈ <strong>260 lb</strong>. To load ~260 lb: (260 − 45) ÷ 2 = 107.5 lb per side = 45 + 45 + 10 + 5 + 2.5.</li>
      </ul>
      <p>Working backwards, Epley says benching 315 lb takes about 12 reps at 225 lb; Brzycki says about 11.</p>

      <h2 id="percentages">Training with percentages</h2>
      <table>
        <thead><tr><th>% of 1RM</th><th>Typical reps</th><th>Common use</th></tr></thead>
        <tbody>
          <tr><td>90–100%</td><td>1–4</td><td>Max strength, peaking</td></tr>
          <tr><td>80–90%</td><td>4–8</td><td>Strength</td></tr>
          <tr><td>70–80%</td><td>8–12</td><td>Muscle growth (hypertrophy)</td></tr>
          <tr><td>60–70%</td><td>12–20</td><td>Technique, endurance, warm-ups</td></tr>
        </tbody>
      </table>
      <p>Rep ranges are typical, not exact. People with more fast-twitch muscle may get fewer reps at a given percentage, and endurance-trained lifters more.</p>

      <h2 id="safety">Testing a true max safely</h2>
      <ul>
        <li><strong>Always use a spotter</strong> or a rack with safety arms set just below chest height.</li>
        <li><strong>Warm up gradually:</strong> for example, bar × 10, 50% × 5, 70% × 3, 80% × 1, 90% × 1, then attempts in small jumps.</li>
        <li><strong>Keep your form:</strong> feet planted, shoulder blades pinched, bar touching the chest under control. A rep with a big bounce or with your hips off the bench doesn&apos;t count.</li>
        <li><strong>Beginners:</strong> estimate from a submaximal set rather than attempting a true max until technique is consistent.</li>
      </ul>

      <h2 id="beyond">Beyond the number</h2>
      <p>A bigger bench usually comes from consistent, progressive training: small weekly increases, enough protein and sleep, and regular deloads. Plan a training block by counting weeks to a test day, such as <Link href="/weeks-from-today/12/">12 weeks from today</Link>. Tracking body composition? Try the <Link href="/army-body-fat-calculator/">waist-to-height checker</Link>. More <Link href="/category/health/">health and fitness calculators</Link>.</p>
      <p className="text-sm">Estimates for training purposes only. Consult a qualified coach or medical professional if you have injuries or health conditions.</p>
      <p>Related: track lean muscle with the <Link href="/ffmi-calculator/">FFMI calculator</Link>, estimate <Link href="/body-fat-calculator/">body fat percentage</Link>, or see how high you need to jump with the <Link href="/dunk-calculator/">dunk calculator</Link>.</p>
    </>
  );
}
