'use client';

import { cn } from '@/lib/utils';

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_ID;

interface SidebarAdProps {
    /** Desktop sidebar only — hidden below `lg`. */
    className?: string;
}

export function SidebarAd({ className }: SidebarAdProps) {
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
                <div className="relative aspect-[6/5] w-full max-w-[300px] overflow-hidden rounded-md border border-dashed border-muted-foreground/25 bg-muted/30">
                    {ADSENSE_CLIENT ? (
                        <ins
                            className="adsbygoogle block h-full w-full"
                            style={{ display: 'block' }}
                            data-ad-client={ADSENSE_CLIENT}
                            data-ad-slot=""
                            data-ad-format="auto"
                            data-full-width-responsive="true"
                        />
                    ) : (
                        <div className="flex h-full min-h-[200px] items-center justify-center px-2 text-center text-xs text-muted-foreground">
                            Ad space (300×250)
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
