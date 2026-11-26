import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/nm-to-ft-lb/Calculator";
import Content from "@/tools/nm-to-ft-lb/Content";
import meta from "@/tools/nm-to-ft-lb/meta";
import { faq } from "@/tools/nm-to-ft-lb/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>To convert <strong>newton-metres to foot-pounds</strong>, multiply by 0.73756 (or divide by 1.35582). So <strong>100 N·m = 73.76 ft·lb</strong>, and 150 ft·lb = 203.37 N·m. The converter also handles inch-pounds, kgf·m, kgf·cm and ozf·in, with a full conversion chart.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
