import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/tip-calculator/Calculator";
import Content from "@/tools/tip-calculator/Content";
import meta from "@/tools/tip-calculator/meta";
import { faq } from "@/tools/tip-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Work out the <strong>tip and total</strong> for any bill. A 15% tip on $80 is <strong>$12</strong> (total $92), and an 18% tip is $14.40. Tip before or after tax, split between people, round up, or find the percentage you already tipped.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
