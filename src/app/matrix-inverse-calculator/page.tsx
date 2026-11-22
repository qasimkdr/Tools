import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/matrix-inverse-calculator/Calculator";
import Content from "@/tools/matrix-inverse-calculator/Content";
import meta from "@/tools/matrix-inverse-calculator/meta";
import { faq } from "@/tools/matrix-inverse-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the <strong>inverse of a matrix</strong> from 2×2 up to 6×6, in exact fractions or decimals. You also get the determinant, every Gauss-Jordan row operation and a check that A × A⁻¹ equals the identity matrix.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
