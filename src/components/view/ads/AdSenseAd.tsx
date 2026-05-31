'use client';

import { type CSSProperties, useEffect, useRef } from 'react';
import { ADSENSE_CLIENT_ID } from '@/lib/google';
import { cn } from '@/lib/utils';

interface AdSenseAdProps {
    slot: string;
    className?: string;
    style?: CSSProperties;
    format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
    fullWidthResponsive?: boolean;
}

export function AdSenseAd({
    slot,
    className,
    style,
    format = 'auto',
    fullWidthResponsive = true,
}: AdSenseAdProps) {
    const pushedRef = useRef(false);
    const canRender = Boolean(ADSENSE_CLIENT_ID && slot);

    useEffect(() => {
        if (!canRender || pushedRef.current) return;

        try {
            window.adsbygoogle = window.adsbygoogle || [];
            window.adsbygoogle.push({});
            pushedRef.current = true;
        } catch {
            // Ad blockers or denied third-party scripts should never affect the app.
        }
    }, [canRender]);

    if (!canRender) return null;

    return (
        <ins
            className={cn('adsbygoogle block', className)}
            style={{ display: 'block', ...style }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
            data-adtest={process.env.NODE_ENV === 'production' ? undefined : 'on'}
        />
    );
}
