import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/five-number-summary-calculator/Calculator";
import Content from "@/tools/five-number-summary-calculator/Content";
import meta from "@/tools/five-number-summary-calculator/meta";
import { faq } from "@/tools/five-number-summary-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>The <strong>five number summary</strong> is the minimum, first quartile (Q1), median, third quartile (Q3) and maximum of a data set. For 3, 5, 7, 8, 12, 13, 14, 18, 21 it is <strong>3, 6, 12, 16, 21</strong> using the textbook method. Paste your numbers to get the summary, IQR, outliers and a box plot.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
