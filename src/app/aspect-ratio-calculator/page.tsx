import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/aspect-ratio-calculator/Calculator";
import Content from "@/tools/aspect-ratio-calculator/Content";
import meta from "@/tools/aspect-ratio-calculator/meta";
import { faq } from "@/tools/aspect-ratio-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Get the <strong>aspect ratio of any image, screen or video</strong> (1920 × 1080 is 16:9), resize to a new width or height without stretching, and work out how media fits or crops into a frame.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
