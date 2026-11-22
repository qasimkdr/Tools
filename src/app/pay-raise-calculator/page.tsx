import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/pay-raise-calculator/Calculator";
import Content from "@/tools/pay-raise-calculator/Content";
import meta from "@/tools/pay-raise-calculator/meta";
import { faq } from "@/tools/pay-raise-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Your <strong>new pay = current pay × (1 + raise %)</strong>. Enter a percentage or dollar raise to see your new salary or hourly wage by year, month and paycheck, or enter your new pay to find the raise percentage, adjusted for inflation if you like.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
