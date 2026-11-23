import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/split-calculator/Calculator";
import Content from "@/tools/split-calculator/Content";
import meta from "@/tools/split-calculator/meta";
import { faq } from "@/tools/split-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Split a bill</strong> evenly or by what each person ordered. A $120 bill with 8% tax and an 18% tip comes to $151.20, or <strong>$37.80 each</strong> for 4 people. Tax and tip are shared fairly, and the shares always add up to the exact total.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
