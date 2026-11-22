import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/minecraft-circle/Calculator";
import Content from "@/tools/minecraft-circle/Content";
import meta from "@/tools/minecraft-circle/meta";
import { faq } from "@/tools/minecraft-circle/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Enter a diameter to get a <strong>block-by-block circle</strong> you can copy into your build: thin, thick or filled, with the total block count and a row-by-row guide. Switch to oval for ellipses of any width and height.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
