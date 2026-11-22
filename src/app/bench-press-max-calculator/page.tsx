import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/bench-press-max-calculator/Calculator";
import Content from "@/tools/bench-press-max-calculator/Content";
import meta from "@/tools/bench-press-max-calculator/meta";
import { faq } from "@/tools/bench-press-max-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate your <strong>bench press one-rep max</strong> from any weight and reps, without maxing out. You get three formulas, training percentages and the plates to load on each side.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
