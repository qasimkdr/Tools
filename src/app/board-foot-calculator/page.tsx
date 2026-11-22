import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/board-foot-calculator/Calculator";
import Content from "@/tools/board-foot-calculator/Content";
import meta from "@/tools/board-foot-calculator/meta";
import { faq } from "@/tools/board-foot-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate <strong>board feet</strong> for a single board or a whole cut list from thickness, width, length and quantity. Hardwood quarters (4/4, 8/4), waste and price per board foot are all supported.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
