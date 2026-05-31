import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LanguageSwitcher } from '@/components/view/layout/LanguageSwitcher';
import { TolgeeNextProvider } from '@/lib/tolgee/client';
import { APP_NAME, LOCALES, type AppLocale } from '@/lib/constants';
import { cn } from '@/lib/utils';
import '../globals.css';
import { Toaster } from '@/components/ui/sonner';
import { HOME_SEO, absoluteUrl, getOpenGraphImages, localeAlternates } from '@/lib/seo';
import { GoogleServices } from '@/components/google/GoogleServices';

const notoSans = localFont({
    src: [
        {
            path: '../../../public/fonts/Noto_Sans/static/NotoSans-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/Noto_Sans/static/NotoSans-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-noto-sans',
    display: 'swap',
});

const notoSansThai = localFont({
    src: [
        {
            path: '../../../public/fonts/Noto_Sans_Thai/static/NotoSansThai-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/Noto_Sans_Thai/static/NotoSansThai-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-noto-sans-thai',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL(absoluteUrl()),
    title: {
        default: HOME_SEO.en.title,
        template: `%s | ${APP_NAME}`,
    },
    description: HOME_SEO.en.description,
    applicationName: APP_NAME,
    generator: 'Next.js',
    keywords: HOME_SEO.en.keywords,
    alternates: localeAlternates('en'),
    openGraph: {
        type: 'website',
        siteName: APP_NAME,
        title: HOME_SEO.en.title,
        description: HOME_SEO.en.description,
        url: absoluteUrl('/en'),
        images: getOpenGraphImages(),
    },
    twitter: {
        card: 'summary_large_image',
        title: HOME_SEO.en.title,
        description: HOME_SEO.en.description,
        images: [absoluteUrl('/opengraph-image')],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
};

export function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!LOCALES.includes(locale as AppLocale)) {
        notFound();
    }

    return (
        <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    notoSans.variable,
                    notoSans.className,
                    notoSansThai.variable,
                    notoSansThai.className,
                )}
            >
                <GoogleServices />
                <TolgeeNextProvider locale={locale as AppLocale}>
                    <Toaster />
                    <div className="relative flex min-h-screen flex-col">
                        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
                            <div className="container flex h-16 items-center justify-between px-4">
                                <Link
                                    href={`/${locale}`}
                                    className="text-2xl font-bold text-primary"
                                >
                                    {APP_NAME}
                                </Link>
                                <LanguageSwitcher />
                            </div>
                        </header>
                        <main className="flex-1">{children}</main>
                        <footer className="border-t bg-muted/40 py-4 text-center text-sm text-muted-foreground">
                            © 2026 {APP_NAME}. Session-only — export PDF before leaving.
                        </footer>
                    </div>
                </TolgeeNextProvider>
            </body>
        </html>
    );
}
