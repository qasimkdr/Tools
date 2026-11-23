import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/molarity-calculator/Calculator";
import Content from "@/tools/molarity-calculator/Content";
import meta from "@/tools/molarity-calculator/meta";
import { faq } from "@/tools/molarity-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Molarity = moles of solute ÷ liters of solution.</strong> Type a formula like NaCl or a molar mass to find the grams to weigh, a solution&apos;s concentration or the volume to make, or plan a dilution with M₁V₁ = M₂V₂.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
