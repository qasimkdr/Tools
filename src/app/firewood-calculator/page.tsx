import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/firewood-calculator/Calculator";
import Content from "@/tools/firewood-calculator/Content";
import meta from "@/tools/firewood-calculator/meta";
import { faq } from "@/tools/firewood-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>A <strong>full cord of firewood is 128 cubic feet</strong> (4 × 4 × 8 ft). Enter your stack to see how many full cords and face cords you have, and compare face-cord prices with the price of a full cord.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
