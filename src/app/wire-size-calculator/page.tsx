import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/wire-size-calculator/Calculator";
import Content from "@/tools/wire-size-calculator/Content";
import meta from "@/tools/wire-size-calculator/meta";
import { faq } from "@/tools/wire-size-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the <strong>wire gauge (AWG)</strong> a circuit needs from its current, voltage and run length. The calculator checks both ampacity (NEC Table 310.16) and voltage drop, and includes a full AWG size and resistance chart.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
