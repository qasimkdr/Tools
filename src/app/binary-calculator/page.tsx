import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/binary-calculator/Calculator";
import Content from "@/tools/binary-calculator/Content";
import meta from "@/tools/binary-calculator/meta";
import { faq } from "@/tools/binary-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Convert binary to decimal, hex and octal</strong>, or back again, for numbers of any size including fractions and negatives. You can also do binary arithmetic and turn text into binary, with the working shown.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
