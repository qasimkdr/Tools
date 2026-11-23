import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/bmr-calculator/Calculator";
import Content from "@/tools/bmr-calculator/Content";
import meta from "@/tools/bmr-calculator/meta";
import { faq } from "@/tools/bmr-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate your <strong>basal metabolic rate</strong>, the calories you burn at complete rest, with three equations side by side. A 35-year-old, 5 ft 10 in, 180 lb man has a BMR of about <strong>1,758 kcal a day</strong> (Mifflin–St Jeor). Your daily calories for each activity level are shown too.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
