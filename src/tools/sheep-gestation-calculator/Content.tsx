import Link from "next/link";

/** Brief + competitor findings: docs/research/sheep-gestation-calculator.md · research/sheep-gestation-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the sheep gestation calculator</h2>
      <ol>
        <li><strong>Date one ewe:</strong> enter the breeding date (from a raddle mark, AI or hand mating) to get her lambing date, likely window and a care timeline.</li>
        <li><strong>Flock:</strong> enter when the ram went in and came out to get the flock&apos;s whole lambing period and a cycle-by-cycle raddle chart.</li>
        <li><strong>Plan backwards:</strong> pick when you want lambing to start, and the calculator tells you when to put the ram in.</li>
      </ol>

      <h2 id="formula">Sheep gestation formulas</h2>
      <div className="formula">Lambing date = breeding date + 147 days (or your breed&apos;s length)<br />Likely window = breeding date + 144 to 151 days<br />Flock lambing period = (ram in + 144 days) to (ram out + 151 days)<br />Ram-in date = target lambing date − 147 days<br />Oestrous cycle ≈ 17 days</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>One ewe:</strong> bred October 1, 2026 → due <strong>February 25, 2027</strong> (147 days), most likely between February 22 and March 1.</li>
        <li><strong>Flock:</strong> ram in October 1 and out November 4, 2026 (34 days, two cycles) → lambing from about <strong>February 22 to April 4, 2027</strong>, with most first-cycle lambs between February 25 and March 14.</li>
        <li><strong>Plan backwards:</strong> to start lambing on March 1, 2027, put the ram in on <strong>October 5, 2026</strong> and take him out about November 8.</li>
      </ul>

      <h2 id="lengths">Gestation length by breed type</h2>
      <table>
        <thead><tr><th>Group</th><th>Typical length</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Average across breeds</td><td>147 days</td><td>Most ewes lamb 144–151 days after mating</td></tr>
          <tr><td>Early-maturing (e.g. Rideau Arcott)</td><td>About 142 days</td><td>Prolific breeds; multiples shorten gestation slightly</td></tr>
          <tr><td>Later-maturing (e.g. Suffolk)</td><td>About 150 days</td><td>Meat breeds tend to run a little longer</td></tr>
          <tr><td>Individual ewes</td><td>138–159 days</td><td>The full range seen within breeds</td></tr>
        </tbody>
      </table>
      <p>Your own flock records are the best guide: average the days from raddle mark to lambing for a season and enter that as a custom length.</p>

      <h2 id="planning">Planning around lambing</h2>
      <ul>
        <li>Flushing (extra feed before and during mating) is usually started 2–3 weeks before the ram goes in.</li>
        <li>Most of the lambs&apos; growth happens in the last 6 weeks of pregnancy, when ewes need better nutrition.</li>
        <li>Pregnancy scanning by ultrasound lets you count lambs and group ewes for feeding; ask your scanner when to book it relative to ram-in.</li>
        <li>Your vet can set pre-lambing vaccinations so lambs get protection through colostrum.</li>
      </ul>
      <p>Raising goats too? Use the <Link href="/goat-gestation-calculator/">goat gestation calculator</Link>. For other animals there&apos;s the <Link href="/horse-gestation-calculator/">horse gestation calculator</Link> and the <Link href="/dog-pregnancy-calculator/">dog pregnancy calculator</Link>, and you can count any span with the <Link href="/days-from-today/">days from today calculator</Link>. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
    </>
  );
}
