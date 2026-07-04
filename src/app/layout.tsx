import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, siteDescription, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: "Steal a Brainrot Values - Value List, Demand & Trade Prices",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    title: "Steal a Brainrot Values",
    description: siteDescription,
    url: absoluteUrl("/"),
    siteName,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteName,
            url: absoluteUrl("/"),
            description: siteDescription,
          }}
        />
        <div className="app-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
