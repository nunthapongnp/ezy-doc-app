import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/view/layout/HeroSection';
import { ToolsSection } from '@/components/view/layout/ToolsSection';
import { LOCALES, type AppLocale } from '@/lib/constants';
import {
    HOME_SEO,
    buildBreadcrumbJsonLd,
    buildWebAppJsonLd,
    getOpenGraphImages,
    localeAlternates,
    localizedUrl,
} from '@/lib/seo';

export async function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const appLocale = LOCALES.includes(locale as AppLocale) ? (locale as AppLocale) : 'en';
    const seo = HOME_SEO[appLocale];

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        alternates: localeAlternates(appLocale),
        openGraph: {
            type: 'website',
            title: seo.title,
            description: seo.description,
            url: localizedUrl(appLocale),
            locale: appLocale,
            alternateLocale: LOCALES.filter((item) => item !== appLocale),
            images: getOpenGraphImages(),
        },
        twitter: {
            card: 'summary_large_image',
            title: seo.title,
            description: seo.description,
            images: getOpenGraphImages().map((image) => image.url),
        },
    };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!LOCALES.includes(locale as AppLocale)) notFound();
    const appLocale = locale as AppLocale;
    const jsonLd = [
        buildWebAppJsonLd(appLocale),
        buildBreadcrumbJsonLd(appLocale, [{ name: 'Home', path: '' }]),
    ];

    return (
        <div className="flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeroSection locale={locale as AppLocale} />
            <ToolsSection locale={locale as AppLocale} />
            <section className="border-y bg-muted/20 py-16">
                <div className="container mx-auto grid gap-8 px-4 text-center md:grid-cols-3">
                    <div>
                        <h4 className="font-bold">Session-only</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Nothing is saved to disk or cloud. Export PDF before you leave.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold">EN + TH</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                            UI locale and PDF document language are configured independently.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold">Free to use</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Client-side PDF generation with optional ad-supported hosting.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
