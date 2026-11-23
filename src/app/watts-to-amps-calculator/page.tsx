import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/watts-to-amps-calculator/Calculator";
import Content from "@/tools/watts-to-amps-calculator/Content";
import meta from "@/tools/watts-to-amps-calculator/meta";
import { faq } from "@/tools/watts-to-amps-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Amps = watts ÷ volts</strong> for DC and resistive loads, so 1,500 W at 120 V draws 12.5 A. For AC motors and three-phase power, power factor and √3 come in. Convert either way for any circuit.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
