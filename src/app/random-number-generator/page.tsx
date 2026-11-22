import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/random-number-generator/Calculator";
import Content from "@/tools/random-number-generator/Content";
import meta from "@/tools/random-number-generator/meta";
import { faq } from "@/tools/random-number-generator/faq";

import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Generate <strong>fair random numbers in any range</strong>, such as 1–100, 1–16, a 4-digit number or your own limits. Pick one or many, with or without repeats.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
