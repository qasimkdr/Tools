import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/seller-financing-calculator/Calculator";
import Content from "@/tools/seller-financing-calculator/Content";
import meta from "@/tools/seller-financing-calculator/meta";
import { faq } from "@/tools/seller-financing-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Work out an <strong>owner-financed deal</strong>: the buyer&apos;s monthly payment, the balloon payment when it comes due, and how much interest the seller earns. Enter the price, down payment, rate, amortization period and balloon term.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
