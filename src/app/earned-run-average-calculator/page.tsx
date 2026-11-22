import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/earned-run-average-calculator/Calculator";
import Content from "@/tools/earned-run-average-calculator/Content";
import meta from "@/tools/earned-run-average-calculator/meta";
import { faq } from "@/tools/earned-run-average-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate a pitcher&apos;s <strong>earned run average (ERA)</strong> from earned runs and innings pitched, entered just like a box score (6.2 = 6⅔). It works for 9-inning baseball or 7-inning softball, and also gives WHIP, K/9, BB/9 and strikeout-to-walk ratio.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
