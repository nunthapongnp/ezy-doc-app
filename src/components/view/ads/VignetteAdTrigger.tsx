"use client";

import { useCallback, useRef } from "react";

export type VignetteTriggerEvent = "preview_tab_open" | "export_pdf_click";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const firedEvents = new Set<VignetteTriggerEvent>();

export function useVignetteAd() {
  const firedRef = useRef(firedEvents);

  const triggerVignette = useCallback((event: VignetteTriggerEvent) => {
    if (firedRef.current.has(event)) return;
    firedRef.current.add(event);

    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        const payload: Record<string, unknown> = {};
        if (process.env.NODE_ENV === "development") {
          payload.google_adtest = "on";
        }
        window.adsbygoogle.push(payload);
      }
    } catch {
      // Never block user action because of ad errors
    }
  }, []);

  return { triggerVignette };
}
