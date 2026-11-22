import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/credit-card-payoff-calculator/Calculator";
import Content from "@/tools/credit-card-payoff-calculator/Content";
import meta from "@/tools/credit-card-payoff-calculator/meta";
import { faq } from "@/tools/credit-card-payoff-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find out <strong>how long it will take to pay off your credit card</strong> and how much interest it will cost. Try a fixed monthly payment, a target payoff date or minimum payments only, and compare them side by side.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
