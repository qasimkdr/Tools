import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/interest-rate-calculator/Calculator";
import Content from "@/tools/interest-rate-calculator/Content";
import meta from "@/tools/interest-rate-calculator/meta";
import { faq } from "@/tools/interest-rate-calculator/faq";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the <strong>real interest rate on a loan</strong> from its amount, payment and term, or the growth rate of your savings. Nominal and effective rates are shown side by side.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
