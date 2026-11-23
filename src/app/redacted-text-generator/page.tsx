import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/redacted-text-generator/Calculator";
import Content from "@/tools/redacted-text-generator/Content";
import meta from "@/tools/redacted-text-generator/meta";
import { faq } from "@/tools/redacted-text-generator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Turn any text into <strong>black-bar redacted text</strong> (████) you can copy and paste: hide everything, chosen words, or parts you put in [brackets], in the style of a censored document.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
