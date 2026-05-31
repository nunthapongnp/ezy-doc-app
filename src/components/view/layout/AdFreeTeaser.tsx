'use client';

import { useTranslate } from '@tolgee/react';

export function AdFreeTeaser() {
    const { t } = useTranslate();

    return (
        <div className="border-t py-1 text-center text-xs text-muted-foreground">
            {t('ADS.REMOVE_ADS')}{' '}
            <a href="/pro" className="text-primary underline underline-offset-4">
                {t('ADS.PRO_LINK')}
            </a>
        </div>
    );
}
