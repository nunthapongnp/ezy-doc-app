'use client';

import { useTranslate } from '@tolgee/react';
import Link from 'next/link';

export function AdFreeTeaser() {
    const { t } = useTranslate();

    return (
        <div className="border-t py-1 text-center text-xs text-muted-foreground">
            {t('ADS.REMOVE_ADS')}
            <Link href="/en/pro" className="text-primary underline underline-offset-4">
                {t('ADS.PRO_LINK')}
            </Link>
        </div>
    );
}
