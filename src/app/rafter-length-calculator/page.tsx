import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/rafter-length-calculator/Calculator";
import Content from "@/tools/rafter-length-calculator/Content";
import meta from "@/tools/rafter-length-calculator/meta";
import { faq } from "@/tools/rafter-length-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate <strong>common rafter length</strong> from the building span and roof pitch. It deducts the ridge board, adds the overhang, and gives the length in feet and inches, plus the rise, cut angles and lumber size to buy.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
