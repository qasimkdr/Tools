import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/macro-calculator/Calculator";
import Content from "@/tools/macro-calculator/Content";
import meta from "@/tools/macro-calculator/meta";
import { faq } from "@/tools/macro-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Work out your <strong>daily calories and macros</strong>: grams of protein, carbs and fat to lose weight, maintain or build muscle. For example, 2,724 kcal on a balanced split is 170 g protein, 341 g carbs and 76 g fat. Each plan is checked against the official healthy ranges.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
