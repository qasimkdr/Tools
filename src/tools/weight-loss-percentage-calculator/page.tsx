import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/weight-loss-percentage-calculator/Calculator";
import Content from "@/tools/weight-loss-percentage-calculator/Content";
import meta from "@/tools/weight-loss-percentage-calculator/meta";
import { faq } from "@/tools/weight-loss-percentage-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Weight loss percentage</strong> = weight lost ÷ starting weight × 100. Going from 160 lb to 145 lb means you have lost 15 lb, or <strong>9.38%</strong> of your body weight. Add a goal weight to see your progress and your 5%, 10% and 15% milestones.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
