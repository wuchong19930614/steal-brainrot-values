export const siteName = "Steal a Brainrot Values";
export const siteDescription =
  "Track official-source Steal a Brainrot items and see which trade values are still unpublished or awaiting verification.";

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.stealbrainrotvalues.com"
  );
}

export function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}
