import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/cross-stitch-calculator/Calculator";
import Content from "@/tools/cross-stitch-calculator/Content";
import meta from "@/tools/cross-stitch-calculator/meta";
import { faq } from "@/tools/cross-stitch-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the <strong>finished size of a cross stitch design</strong> and how much fabric to cut, for any Aida, evenweave or linen count, stitched over one or two threads, with framing margins added.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
