import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/gc-calculator/Calculator";
import Content from "@/tools/gc-calculator/Content";
import meta from "@/tools/gc-calculator/meta";
import { faq } from "@/tools/gc-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the <strong>GC content</strong> of a DNA or RNA sequence: count the G and C bases and divide by all A, T, G and C bases. The primer ATGCGCGATTACGCGTATAGCGC has 13 G or C out of 23 bases, so its GC content is <strong>56.52%</strong>. You also get Tm, GC skew and the reverse complement.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
