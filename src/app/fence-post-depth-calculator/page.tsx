import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/fence-post-depth-calculator/Calculator";
import Content from "@/tools/fence-post-depth-calculator/Content";
import meta from "@/tools/fence-post-depth-calculator/meta";
import { faq } from "@/tools/fence-post-depth-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Bury fence posts about <strong>one-third of the fence&apos;s above-ground height</strong> (24 in for a 6 ft fence), deeper for gates and below the frost line in cold climates. Get the hole depth and width, post length and concrete needed.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
