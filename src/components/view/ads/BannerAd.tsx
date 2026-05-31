'use client';

import { ADSENSE_BANNER_SLOT } from '@/lib/google';
import { AdSenseAd } from './AdSenseAd';

export function BannerAd() {
    if (!ADSENSE_BANNER_SLOT) return null;

    return (
        <div className="flex min-h-[50px] w-full items-center justify-center border-b bg-muted/30 py-2 md:min-h-[90px]">
            <AdSenseAd
                slot={ADSENSE_BANNER_SLOT}
                className="w-full"
                style={{ minHeight: 50 }}
                format="auto"
            />
        </div>
    );
}
