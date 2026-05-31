'use client';

import { TolgeeProvider } from '@tolgee/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TolgeeBase } from './shared';
import type { AppLocale } from '@/lib/constants';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    locale: AppLocale;
    children: React.ReactNode;
};

const tolgee = TolgeeBase().init();

export function TolgeeNextProvider({ locale, children }: Props) {
    const router = useRouter();

    useEffect(() => {
        void tolgee.changeLanguage(locale);
    }, [locale]);

    useEffect(() => {
        const { unsubscribe } = tolgee.on('permanentChange', () => {
            router.refresh();
        });
        return () => unsubscribe();
    }, [router]);

    return (
        <TolgeeProvider
            tolgee={tolgee}
            fallback={
                <div className="flex justify-center items-center h-screen">
                    <Spinner />
                </div>
            }
        >
            {children}
        </TolgeeProvider>
    );
}
