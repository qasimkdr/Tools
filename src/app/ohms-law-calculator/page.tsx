import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/ohms-law-calculator/Calculator";
import Content from "@/tools/ohms-law-calculator/Content";
import meta from "@/tools/ohms-law-calculator/meta";
import { faq } from "@/tools/ohms-law-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Ohm&apos;s law: V = I × R.</strong> Enter any two of voltage, current, resistance and power to get the other two instantly, with the formula used and results in convenient units such as mA and kΩ.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
