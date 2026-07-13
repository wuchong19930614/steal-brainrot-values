import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, createPageMetadata, siteName } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Notice - Steal a Brainrot Values",
  description:
    "Read what Steal a Brainrot Values measures with Google Analytics and Microsoft Clarity, what the site does not collect directly, and your choices.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Steal a Brainrot Values privacy notice",
          url: absoluteUrl("/privacy/"),
          description: metadata.description,
          dateModified: "2026-07-13",
          isPartOf: {
            "@type": "WebSite",
            name: siteName,
            url: absoluteUrl("/"),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Values",
              item: absoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Privacy",
              item: absoluteUrl("/privacy/"),
            },
          ],
        }}
      />

      <section className="page-intro">
        <div>
          <p className="eyebrow">Effective July 13, 2026</p>
          <h1>Privacy notice</h1>
          <p>
            This notice explains the limited analytics used to understand site
            performance and improve the value tracker.
          </p>
        </div>
        <div className="intro-link-stack">
          <Link href="/methodology/">Methodology</Link>
          <Link href="/">Return to values</Link>
        </div>
      </section>

      <section className="content-band">
        <div>
          <h2>Information measured</h2>
          <p>
            The site uses Google Analytics 4 and Microsoft Clarity to measure
            visits, viewed pages, device and browser categories, approximate
            traffic source, interactions, and technical performance. These
            services may use cookies or similar browser technologies and
            process information such as IP-derived location and device data
            under their own privacy terms.
          </p>
        </div>
        <div>
          <h2>What this site does not collect directly</h2>
          <p>
            The site has no user accounts, payment form, newsletter signup, or
            public comment form. It does not ask visitors to submit names,
            passwords, payment details, Roblox credentials, or private trade
            information. Do not send sensitive personal information through a
            public correction report.
          </p>
        </div>
      </section>

      <section className="content-band">
        <div>
          <h2>Analytics providers</h2>
          <p>
            Google and Microsoft operate the analytics services used here.
            Their documentation explains how they process data and what
            controls they provide.
          </p>
          <div className="link-grid">
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Privacy Policy
            </a>
            <a
              href="https://privacy.microsoft.com/privacystatement"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Privacy Statement
            </a>
          </div>
        </div>
        <div>
          <h2>Your choices</h2>
          <p>
            Browser settings and privacy extensions can restrict cookies and
            tracking technologies. Blocking analytics may reduce measurement
            accuracy but does not prevent access to the public value pages.
            This notice will be updated when the site&apos;s data practices
            materially change.
          </p>
        </div>
      </section>
    </>
  );
}
