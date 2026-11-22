import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/circle-skirt-calculator/Calculator";
import Content from "@/tools/circle-skirt-calculator/Content";
import meta from "@/tools/circle-skirt-calculator/meta";
import { faq } from "@/tools/circle-skirt-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Work out the <strong>circle skirt pattern</strong>: the waist radius, cutting radii and fabric yardage for a full, three-quarter, half or quarter circle skirt, from your waist and skirt length, with seam and hem allowances included.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
