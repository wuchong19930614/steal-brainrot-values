import type { Metadata } from "next";

export const siteName = "Steal a Brainrot Values";
export const siteDescription =
  "Track source-labeled Steal a Brainrot items and see which trade values are still unpublished or awaiting verification.";

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.stealbrainrotvalues.com"
  );
}

export function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const image = absoluteUrl("/opengraph-image/");

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
