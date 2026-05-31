'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/google';

export function GooglePageViewTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const search = window.location.search;
        trackPageView(`${pathname}${search}`);
    }, [pathname]);

    return null;
}
