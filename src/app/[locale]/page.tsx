import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/view/layout/HeroSection';
import { LandingSections } from '@/components/view/layout/LandingSections';
import { ToolsSection } from '@/components/view/layout/ToolsSection';
import { LOCALES, type AppLocale } from '@/lib/constants';
import { getBlogPosts, getLandingContent } from '@/lib/content';
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
    const landing = getLandingContent(appLocale);
    const seo = landing.metadata.title ? landing.metadata : HOME_SEO[appLocale];

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
    const landing = getLandingContent(appLocale);
    const latestPosts =
        appLocale === 'th'
            ? getBlogPosts('th')
                  .map((post) => post.meta)
                  .slice(0, 3)
            : [];
    const jsonLd = [
        buildWebAppJsonLd(appLocale),
        buildBreadcrumbJsonLd(appLocale, [{ name: 'Home', path: '' }]),
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: landing.faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                },
            })),
        },
    ];

    return (
        <div className="flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeroSection locale={appLocale} content={landing.hero} />
            <ToolsSection locale={appLocale} cards={landing.documentCards} />
            <LandingSections locale={appLocale} content={landing} latestPosts={latestPosts} />
        </div>
    );
}
