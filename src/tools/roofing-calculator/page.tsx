import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/roofing-calculator/Calculator";
import Content from "@/tools/roofing-calculator/Content";
import meta from "@/tools/roofing-calculator/meta";
import { faq } from "@/tools/roofing-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>To find <strong>roof area</strong>, multiply the footprint (including overhangs) by the pitch factor, then divide by 100 to get roofing squares. A 40 × 30 ft house with 1 ft overhangs and a 6/12 pitch has about <strong>1,503 sq ft</strong> of roof, or 15 squares. With 10% waste that is <strong>50 bundles</strong> of standard shingles.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
