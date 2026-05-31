'use client';

import { cn } from '@/lib/utils';
import { ADSENSE_SIDEBAR_SLOT } from '@/lib/google';
import { AdSenseAd } from './AdSenseAd';

interface SidebarAdProps {
    /** Desktop sidebar only — hidden below `lg`. */
    className?: string;
}

export function SidebarAd({ className }: SidebarAdProps) {
    if (!ADSENSE_SIDEBAR_SLOT) return null;

    return (
        <aside
            className={cn(
                'hidden shrink-0 flex-col border-l bg-muted/20 p-3 lg:flex',
                'w-[min(300px,28vw)]',
                className,
            )}
            aria-label="Advertisement"
        >
            <div className="sticky top-20 w-full">
                <div className="relative aspect-6/5 w-full max-w-[300px] overflow-hidden rounded-md bg-muted/30">
                    <AdSenseAd
                        slot={ADSENSE_SIDEBAR_SLOT}
                        className="h-full w-full"
                        style={{ minHeight: 250 }}
                        format="rectangle"
                        fullWidthResponsive={false}
                    />
                </div>
            </div>
        </aside>
    );
}
