import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/breastfeeding-calorie-calculator/Calculator";
import Content from "@/tools/breastfeeding-calorie-calculator/Content";
import meta from "@/tools/breastfeeding-calorie-calculator/meta";
import { faq } from "@/tools/breastfeeding-calorie-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate your <strong>daily calories while breastfeeding</strong>: your usual needs plus about 330 kcal a day for exclusive breastfeeding in the first 6 months, or 400 kcal in months 7–12 (Dietary Guidelines for Americans). It also gives a gentle weight-loss target that never drops below 1,800 kcal.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
