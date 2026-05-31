import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LanguageSwitcher } from '@/components/view/core/LanguageSwitcher';
import { TolgeeNextProvider } from '@/lib/tolgee/client';
import { APP_NAME, LOCALES, type AppLocale } from '@/lib/constants';
import { cn } from '@/lib/utils';
import '../globals.css';
import { Toaster } from '@/components/ui/sonner';

const notoSans = Noto_Sans({
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '500', '700'],
    variable: '--font-noto-sans',
});

export const metadata: Metadata = {
    title: `${APP_NAME} — Free Quotation, Invoice & Receipt Generator`,
    description:
        'Create professional business documents instantly. Free PDF export, no sign-up required.',
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
                )}
            >
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
