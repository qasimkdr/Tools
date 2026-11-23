import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/50-to-1-gas-oil-mix-calculator/Calculator";
import Content from "@/tools/50-to-1-gas-oil-mix-calculator/Content";
import meta from "@/tools/50-to-1-gas-oil-mix-calculator/meta";
import { faq } from "@/tools/50-to-1-gas-oil-mix-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>A <strong>50:1 mix needs 2.6 fl oz of 2-stroke oil per gallon of gas</strong> (20 mL per liter). Enter your gas amount and ratio for the exact oil, in ounces or milliliters, or find how much gas goes with an oil bottle.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
