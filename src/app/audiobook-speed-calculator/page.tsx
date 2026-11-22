import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/audiobook-speed-calculator/Calculator";
import Content from "@/tools/audiobook-speed-calculator/Content";
import meta from "@/tools/audiobook-speed-calculator/meta";
import { faq } from "@/tools/audiobook-speed-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Listening time = audiobook length ÷ playback speed</strong>. A 10-hour book takes 6 h 40 min at 1.5× and 5 hours at 2×. Enter any length and speed to see your time, the time saved and how many days it will take.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
