import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/how-long-will-retirement-savings-last-calculator/Calculator";
import Content from "@/tools/how-long-will-retirement-savings-last-calculator/Content";
import meta from "@/tools/how-long-will-retirement-savings-last-calculator/meta";
import { faq } from "@/tools/how-long-will-retirement-savings-last-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find out <strong>how many years your retirement savings will last</strong> with monthly withdrawals that keep pace with inflation, and how much you can withdraw so the money lasts as long as you need it.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
