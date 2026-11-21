import StaticPage from "@/components/StaticPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Contact SolvePilot", description: "Contact the SolvePilot team to report a calculation error, suggest a new calculator, or ask a question about our tools. We usually reply within two business days.", path: "/contact/" });

export default function Page() {
  return (
    <StaticPage title="Contact us" path="/contact/">
      <p>Found a calculation that looks wrong, want a new calculator, or have a business enquiry? Email us and we&apos;ll usually reply within two business days.</p>
      {/* TODO(owner): use a real, monitored mailbox on your domain. */}
      <p><strong>Email:</strong> <a href="mailto:hello@solvepilot.com">hello@solvepilot.com</a></p>
      <h2>Reporting an error</h2>
      <p>Please include the page address, the values you entered, the result you got and the result you expected. Confirmed errors are fixed and noted in the page&apos;s last-updated date.</p>
    </StaticPage>
  );
}
