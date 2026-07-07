"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

const supportedEvents: AnalyticsEventName[] = [
  "official_source_clicked",
  "related_tool_clicked",
];

export function AnalyticsClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) {
        return;
      }

      const trackedElement = event.target.closest("[data-analytics-event]");

      if (!(trackedElement instanceof HTMLElement)) {
        return;
      }

      const eventName = trackedElement.dataset
        .analyticsEvent as AnalyticsEventName;

      if (!supportedEvents.includes(eventName)) {
        return;
      }

      trackEvent(eventName, {
        link_url:
          trackedElement instanceof HTMLAnchorElement
            ? trackedElement.href
            : undefined,
        link_text:
          trackedElement.dataset.analyticsLabel ||
          trackedElement.textContent?.trim() ||
          undefined,
        link_location: trackedElement.dataset.analyticsLocation,
      });
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
