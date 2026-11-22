import Link from "next/link";

/** Brief + competitor findings: docs/research/steps-to-miles-calculator.md · research/steps-to-miles-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the steps to miles calculator</h2>
      <ol>
        <li>Choose <strong>steps → distance</strong> (e.g. from your phone or pedometer) or <strong>distance → steps</strong> (e.g. how many steps a 5K takes).</li>
        <li>Enter your <strong>height and sex</strong> to estimate step length, or switch to <strong>measured step</strong> if you know it.</li>
        <li>Read the distance in miles and kilometers, plus your steps per mile and per kilometer.</li>
      </ol>

      <h2 id="formula">Formula</h2>
      <div className="formula">Step length ≈ height × 0.415 (men) or height × 0.413 (women)<br />Miles = steps × step length (in) ÷ 63,360<br />Kilometers = steps × step length (cm) ÷ 100,000<br />Steps = distance ÷ step length</div>
      <p>The height ratios are a long-standing pedometer rule of thumb. They work well for normal walking; your real step length varies with pace, terrain and leg length, so measuring it is more accurate.</p>

      <h2 id="example">Worked example</h2>
      <p>A man 5 ft 9 in (69 in) tall: step length = 69 × 0.415 = <strong>28.6 inches</strong>. Ten thousand steps = 10,000 × 28.6 ÷ 63,360 = <strong>4.52 miles</strong> (7.27 km), and one mile takes 63,360 ÷ 28.6 ≈ <strong>2,213 steps</strong>.</p>

      <h2 id="table">Steps per mile by height (walking)</h2>
      <table>
        <thead><tr><th>Height</th><th>Men: steps/mile</th><th>Women: steps/mile</th></tr></thead>
        <tbody>
          {[60, 63, 66, 69, 72, 75].map((h) => (
            <tr key={h}><td>{Math.floor(h / 12)} ft {h % 12} in</td><td>{Math.round(63360 / (h * 0.415)).toLocaleString("en-US")}</td><td>{Math.round(63360 / (h * 0.413)).toLocaleString("en-US")}</td></tr>
          ))}
        </tbody>
      </table>

      <h2 id="pace">Pace changes the answer</h2>
      <p>Faster movement means longer steps. The American College of Sports Medicine&apos;s exercise guidelines estimate 1,000 steps at about:</p>
      <ul>
        <li><strong>0.4 miles</strong> walking at 3 mph,</li>
        <li><strong>0.5 miles</strong> walking briskly at 4 mph,</li>
        <li><strong>0.6 miles</strong> running at 6 mph.</li>
      </ul>
      <p>The popular &quot;2,000 steps per mile&quot; figure is a convenient round number that fits taller walkers and runners better than shorter walkers.</p>
      <p>Pair this with the <Link href="/water-intake-calculator/">water intake calculator</Link> on active days, check your <Link href="/bmi-women-calculator/">BMI</Link>, or total up time spent walking with the <Link href="/hours-calculator/">hours calculator</Link>. More <Link href="/category/health/">health and fitness calculators</Link>.</p>
    </>
  );
}
