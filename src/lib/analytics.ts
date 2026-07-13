export type AnalyticsEventName =
  | "calculator_used"
  | "filter_used"
  | "item_search_used"
  | "community_source_clicked"
  | "official_source_clicked"
  | "related_tool_clicked";

type AnalyticsEventParams = Record<
  string,
  boolean | number | string | null | undefined
>;

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: AnalyticsEventName,
      params?: AnalyticsEventParams,
    ) => void;
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams = {},
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}
