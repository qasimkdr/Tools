import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/timecode-calculator/Calculator";
import Content from "@/tools/timecode-calculator/Content";
import meta from "@/tools/timecode-calculator/meta";
import { faq } from "@/tools/timecode-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>A <strong>timecode calculator</strong> adds, subtracts and converts SMPTE timecode (HH:MM:SS:FF) by turning it into frames first. At 25 fps, 00:10:00:00 + 00:05:30:12 = <strong>00:15:30:12</strong>. It also handles drop-frame: one hour of 29.97 DF is <strong>107,892 frames</strong>.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
