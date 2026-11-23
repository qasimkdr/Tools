import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/car-lease-vs-buy-calculator/Calculator";
import Content from "@/tools/car-lease-vs-buy-calculator/Content";
import meta from "@/tools/car-lease-vs-buy-calculator/meta";
import { faq } from "@/tools/car-lease-vs-buy-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>See whether <strong>leasing or buying a car costs less</strong> over the same period. Enter the price, lease terms (residual and money factor) and loan terms to compare payments, equity and the true net cost side by side.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
