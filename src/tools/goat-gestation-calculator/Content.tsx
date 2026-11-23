import Link from "next/link";

/** Brief + competitor findings: docs/research/goat-gestation-calculator.md · research/goat-gestation-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the goat gestation calculator</h2>
      <ol>
        <li>Choose <strong>standard</strong> (150 days) or <strong>miniature</strong> (145 days), or type your herd&apos;s own average gestation length.</li>
        <li>For one doe, enter the breeding date to see the kidding date, the likely window, today&apos;s day of pregnancy and a dated care timeline.</li>
        <li>For a whole herd, switch to <strong>Whole herd</strong> and enter one doe per line (name, breeding date). The table sorts by due date, and you can download it as a CSV for your barn calendar.</li>
      </ol>

      <h2 id="formula">Goat gestation formula</h2>
      <div className="formula">Kidding date = breeding date + 150 days (145 for miniature breeds)<br />Likely window ≈ due date ± 5 days</div>

      <h2 id="example">Worked example</h2>
      <p>A Boer doe bred on <strong>March 1, 2025</strong>: + 150 days = <strong>July 29, 2025</strong>, with kids most likely between July 24 and August 3. A Nigerian Dwarf doe bred the same day is due around July 24 (145 days).</p>
      <p>Herd example (standard breeds): Daisy bred September 15, 2026 → due <strong>February 12, 2027</strong>; Hazel bred October 2 → <strong>March 1, 2027</strong>; Pepper bred October 20 → <strong>March 19, 2027</strong>.</p>

      <h2 id="table">Gestation length by breed type</h2>
      <table>
        <thead><tr><th>Breed type</th><th>Examples</th><th>Typical gestation</th></tr></thead>
        <tbody>
          <tr><td>Standard / meat / dairy</td><td>Boer, Nubian, Alpine, Saanen, LaMancha</td><td>About 150 days</td></tr>
          <tr><td>Miniature</td><td>Nigerian Dwarf, Pygmy</td><td>About 145 days</td></tr>
        </tbody>
      </table>

      <h2 id="prepare">Getting ready for kidding</h2>
      <ul>
        <li><strong>Plan with your vet</strong> for pregnancy checks, vaccinations and what to do if a delivery stalls.</li>
        <li><strong>Prepare a kidding pen</strong>: clean, dry, draft-free bedding and a kit with towels, gloves, iodine for navels and a thermometer.</li>
        <li><strong>Watch the window</strong>: check does more often from about five days before the due date.</li>
      </ul>
      <p>Other animal due-date tools: the <Link href="/horse-gestation-calculator/">horse gestation calculator</Link> and the <Link href="/dog-pregnancy-calculator/">dog pregnancy calculator</Link>. Count days to any date with the <Link href="/days-from-today/">days from today calculator</Link>. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
    </>
  );
}
