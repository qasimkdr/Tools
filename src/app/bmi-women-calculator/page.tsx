import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/bmi-women-calculator/Calculator";
import Content from "@/tools/bmi-women-calculator/Content";
import meta from "@/tools/bmi-women-calculator/meta";
import { faq } from "@/tools/bmi-women-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate your <strong>BMI as a woman</strong> in pounds and inches or kilograms and centimeters. See your category, the healthy weight range for your height, a waist check and the recommended pregnancy weight gain for your BMI.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
