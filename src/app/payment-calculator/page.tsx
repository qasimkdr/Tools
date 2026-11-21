import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/payment-calculator/Calculator";
import Content from "@/tools/payment-calculator/Content";
import meta from "@/tools/payment-calculator/meta";
import { faq } from "@/tools/payment-calculator/faq";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Work out the <strong>monthly payment on any fixed-rate loan</strong>, or how long a payment you choose takes to clear it. You also get total interest, extra-payment savings and a downloadable schedule.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
