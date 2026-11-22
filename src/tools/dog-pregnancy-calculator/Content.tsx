import Link from "next/link";

/** Brief + competitor findings: docs/research/dog-pregnancy-calculator.md · research/dog-pregnancy-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the dog pregnancy calculator</h2>
      <ol>
        <li><strong>Choose what you know</strong>: the breeding (mating) date, or the ovulation or LH-surge date from your vet&apos;s hormone tests.</li>
        <li><strong>Enter the date.</strong></li>
        <li><strong>Read the estimated due date</strong>, the likely whelping window, how far along she is today and a timeline of what to expect.</li>
      </ol>

      <h2 id="formula">How the due date is calculated</h2>
      <div className="formula">From breeding: due date = breeding date + 63 days  (window 58–68 days)<br />From ovulation: due date = ovulation date + 63 days  (±2 days)<br />From LH surge: due date = LH surge + 64–66 days</div>
      <p>Hormone-timed dates are much more precise. The breeding date only tells you when mating happened, not when the eggs were fertilized, which is why the window from breeding is about 10 days wide.</p>

      <h2 id="example">Example</h2>
      <p>A dog bred on <strong>January 10, 2027</strong>:</p>
      <table>
        <thead><tr><th>Milestone</th><th>Day</th><th>Date</th></tr></thead>
        <tbody>
          <tr><td>Pregnancy can be confirmed (palpation)</td><td>~28</td><td>February 7</td></tr>
          <tr><td>X-ray to count puppies</td><td>~45+</td><td>from February 24</td></tr>
          <tr><td>Whelping window opens</td><td>58</td><td>March 9</td></tr>
          <tr><td><strong>Estimated due date</strong></td><td>63</td><td><strong>March 14</strong></td></tr>
          <tr><td>Window closes</td><td>68</td><td>March 19</td></tr>
        </tbody>
      </table>
      <p>If the vet had instead pinpointed ovulation on January 12, the due date would be March 16, give or take two days.</p>

      <h2 id="timeline">Dog pregnancy week by week</h2>
      <table>
        <thead><tr><th>Weeks</th><th>What&apos;s happening</th></tr></thead>
        <tbody>
          <tr><td>1–3</td><td>Fertilization; embryos travel to the uterus and implant around days 18–21. Few visible signs.</td></tr>
          <tr><td>4–5</td><td>A vet can confirm pregnancy by ultrasound or palpation. Some dogs have mild morning sickness or a small appetite dip.</td></tr>
          <tr><td>6–7</td><td>The belly and nipples enlarge, appetite rises and weight gain becomes obvious. An X-ray from about day 45 counts the puppies.</td></tr>
          <tr><td>8–9</td><td>Nesting behavior; set up the whelping box and monitor temperature. Labor usually follows a temperature drop within 24 hours.</td></tr>
        </tbody>
      </table>

      <h2 id="care">Caring for a pregnant dog</h2>
      <ul>
        <li><strong>Vet checks:</strong> confirm the pregnancy, discuss vaccines and parasite control, and plan for the birth.</li>
        <li><strong>Food:</strong> keep her diet steady early on; most dogs need more food in the last third of pregnancy, often switching to a puppy or growth formula on your vet&apos;s advice.</li>
        <li><strong>Exercise:</strong> gentle walks are good; avoid rough play and jumping late in pregnancy.</li>
        <li><strong>Supplies:</strong> whelping box, clean towels, a thermometer, and your vet&apos;s emergency number.</li>
      </ul>

      <h2 id="signs">Signs of labor and when to call the vet</h2>
      <p>Labor often starts with restlessness, panting, nesting and refusing food after the temperature drop. Vets commonly advise calling if sheCall your vet if she&apos;s more than a few days pastapos;s more than a few days past her due date, strains strongly for 30–60 minutes without producing a puppy, goes more than about 2 hours between puppies, or seems weak or in distress. The Cornell Riney Canine Health Center explains the{" "}
        <a href="https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/normal-whelping-process" rel="noopener" target="_blank">normal whelping process</a> in more detail.</p>

      <h2 id="more">Counting the days</h2>
      <p>To count forward from any date, use the <Link href="/days-from-today/">days from today calculator</Link>, for example <Link href="/days-from-today/63/">63 days from today</Link> for a mating that happened today. Celebrating the puppies later? The <Link href="/half-birthday-calculator/">half birthday calculator</Link> finds their six-month milestone. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
      <p className="text-sm">For planning only, not veterinary advice. Always confirm pregnancy and plan the birth with your vet.</p>
    </>
  );
}
