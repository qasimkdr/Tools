import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/reverse-bmi-calculator/Calculator";
import Content from "@/tools/reverse-bmi-calculator/Content";
import meta from "@/tools/reverse-bmi-calculator/meta";
import { faq } from "@/tools/reverse-bmi-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>A <strong>reverse BMI calculator</strong> turns a target BMI into a weight: weight = BMI × height². For someone 5 ft 9 in tall, a BMI of 22 is <strong>149 lb</strong> (67.6 kg), and the healthy range of 18.5 to 24.9 is about <strong>125 to 169 lb</strong>. Enter your height to see your own numbers.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
