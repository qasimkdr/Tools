import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/dunk-calculator/Calculator";
import Content from "@/tools/dunk-calculator/Content";
import meta from "@/tools/dunk-calculator/meta";
import { faq } from "@/tools/dunk-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find out <strong>how high you need to jump to dunk</strong>: the vertical needed to touch the rim and to dunk, from your height or measured standing reach, on a regulation 10-foot or lower hoop, and how close you are now.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
