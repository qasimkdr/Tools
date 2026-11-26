import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/minecraft-sphere-generator/Calculator";
import Content from "@/tools/minecraft-sphere-generator/Content";
import meta from "@/tools/minecraft-sphere-generator/meta";
import { faq } from "@/tools/minecraft-sphere-generator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Build a <strong>sphere in Minecraft</strong> one horizontal layer at a time: each layer is a circle whose size follows the sphere&apos;s curve. A 15-block hollow sphere takes <strong>530 blocks</strong> over 15 layers. Pick a size and wall style to get every layer as a block chart, plus the total and stacks.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
