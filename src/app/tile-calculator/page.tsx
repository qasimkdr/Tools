import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/tile-calculator/Calculator";
import Content from "@/tools/tile-calculator/Content";
import meta from "@/tools/tile-calculator/meta";
import { faq } from "@/tools/tile-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find <strong>how many tiles and boxes to buy</strong>: divide the area by the space each tile covers (including its grout line) and add 10–20% for cuts and breakage. Enter your room and tile size for an exact count and cost.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
