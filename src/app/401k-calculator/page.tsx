import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/401k-calculator/Calculator";
import Content from "@/tools/401k-calculator/Content";
import meta from "@/tools/401k-calculator/meta";
import { faq } from "@/tools/401k-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Project your <strong>401(k) balance at retirement</strong> with your contributions, employer match, raises and 2026 IRS limits. See it in today&apos;s dollars, year by year.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
