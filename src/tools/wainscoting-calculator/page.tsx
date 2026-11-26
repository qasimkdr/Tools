import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/wainscoting-calculator/Calculator";
import Content from "@/tools/wainscoting-calculator/Content";
import meta from "@/tools/wainscoting-calculator/meta";
import { faq } from "@/tools/wainscoting-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>To lay out <strong>wainscoting</strong>, subtract the stiles from the wall width and divide by the number of panels. A 12-foot (144-inch) wall with 4 panels and 3½-inch stiles gives panels <strong>31⅝ inches</strong> wide. Picture-frame boxes 23 inches tall then need about 40 feet of moulding, or 6 eight-foot sticks, with 10% waste.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
