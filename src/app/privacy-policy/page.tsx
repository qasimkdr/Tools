import StaticPage from "@/components/StaticPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({ title: "Privacy Policy", description: "How Mathi handles data: calculations run in your browser, and we explain how Google AdSense cookies, analytics and your privacy choices (GDPR, CCPA) work.", path: "/privacy-policy/" });

export default function Page() {
  return (
    <StaticPage title="Privacy policy" path="/privacy-policy/" updated="November 21, 2026">
      <p>This policy explains what information {SITE.name} (&quot;we&quot;) collects when you use {SITE.url} and how it is used.</p>
      <h2>Calculator inputs</h2>
      <p>Calculations run entirely in your browser. The values you type are not sent to or stored on our servers. Some tools put your inputs in the page address so you can share a result. That address stays on your device unless you share it.</p>
      <h2>Cookies and advertising</h2>
      <p>We use Google AdSense to show ads. Third-party vendors, including Google, use cookies to serve ads based on your previous visits to this and other websites. Google&apos;s advertising cookies enable it and its partners to serve ads based on your visits to our site and/or other sites on the Internet.</p>
      <p>You can opt out of personalized advertising by visiting <a href="https://adssettings.google.com" rel="nofollow noopener">Google Ads Settings</a>, or opt out of some third-party vendors&apos; use of cookies at <a href="https://www.aboutads.info/choices/" rel="nofollow noopener">aboutads.info</a>. To learn more, see <a href="https://policies.google.com/technologies/partner-sites" rel="nofollow noopener">How Google uses information from sites that use its services</a>.</p>
      <p>Visitors in the European Economic Area, the UK and Switzerland are shown a consent message, from a Google-certified consent management platform, before personalized ads or non-essential cookies are used.</p>
      <h2>Analytics</h2>
      <p>We may use privacy-respecting analytics to understand which tools are used, so we can improve them. This data is aggregated and does not identify you.</p>
      <h2>Your rights</h2>
      <p>Depending on where you live (for example under the GDPR or the CCPA/CPRA), you may have the right to access, delete or opt out of the &quot;sale&quot; or &quot;sharing&quot; of personal information. Use the privacy choices link shown by our consent tool, or contact us.</p>
      <h2>Children</h2>
      <p>Our site is not directed at children under 13, and we do not knowingly collect their personal information.</p>
      <h2>Contact</h2>
      <p>For privacy questions, email <a href="mailto:privacy@mathi.xyz">privacy@mathi.xyz</a>.</p>
    </StaticPage>
  );
}
