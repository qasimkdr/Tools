import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/discount-calculator/Calculator";
import Content from "@/tools/discount-calculator/Content";
import meta from "@/tools/discount-calculator/meta";
import { faq } from "@/tools/discount-calculator/faq";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the <strong>sale price and how much you save</strong> for any percent or dollar discount. You can also stack two discounts, add sales tax, or work back to the original price.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
