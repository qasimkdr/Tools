import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/bowling-handicap-calculator/Calculator";
import Content from "@/tools/bowling-handicap-calculator/Content";
import meta from "@/tools/bowling-handicap-calculator/meta";
import { faq } from "@/tools/bowling-handicap-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>A league <strong>bowling handicap</strong> is a percentage of the difference between a basis score and your average, with fractions dropped. A bowler averaging 165 in a league using 90% of 220 gets (220 − 165) × 0.9 = 49.5, so a handicap of <strong>49 pins</strong> per game. A bowler at or above the basis gets 0.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
