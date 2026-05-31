import Script from 'next/script';
import { ADSENSE_CLIENT_ID, GOOGLE_ANALYTICS_ID } from '@/lib/google';
import { GooglePageViewTracker } from './GooglePageViewTracker';

export function GoogleServices() {
    return (
        <>
            {ADSENSE_CLIENT_ID && (
                <Script
                    id="google-adsense"
                    async
                    strategy="afterInteractive"
                    crossOrigin="anonymous"
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
                />
            )}

            {GOOGLE_ANALYTICS_ID && (
                <>
                    <Script
                        id="google-analytics-src"
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
                    />
                    <Script
                        id="google-analytics"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ANALYTICS_ID}', { send_page_view: false });
`,
                        }}
                    />
                    <GooglePageViewTracker />
                </>
            )}
        </>
    );
}
