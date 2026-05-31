export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';
export const ADSENSE_CLIENT_ID =
    process.env.NEXT_PUBLIC_ADSENSE_ID ?? process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? '';
export const ADSENSE_BANNER_SLOT = process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT ?? '';
export const ADSENSE_SIDEBAR_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT ?? '';

export const GOOGLE_ANALYTICS_ENABLED = Boolean(GOOGLE_ANALYTICS_ID);
export const ADSENSE_ENABLED = Boolean(ADSENSE_CLIENT_ID);

type GtagParams = Record<string, string | number | boolean | null | undefined>;

declare global {
    interface Window {
        adsbygoogle?: unknown[];
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

export function getAdSensePublisherId(clientId = ADSENSE_CLIENT_ID) {
    return clientId.replace(/^ca-/, '');
}

export function trackPageView(path: string, title?: string) {
    if (!GOOGLE_ANALYTICS_ENABLED || typeof window === 'undefined' || !window.gtag) return;

    window.gtag('config', GOOGLE_ANALYTICS_ID, {
        page_path: path,
        page_location: window.location.href,
        page_title: title ?? document.title,
    });
}

export function trackEvent(name: string, params: GtagParams = {}) {
    if (!GOOGLE_ANALYTICS_ENABLED || typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', name, params);
}
