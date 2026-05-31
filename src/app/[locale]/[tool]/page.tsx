import { DocumentEditor } from '@/components/view/editor/DocumentEditor';
import {
    DOCUMENT_ROUTES,
    LOCALES,
    isDocumentRoute,
    type AppLocale,
    type DocumentRoute,
} from '@/lib/constants';
import {
    HOME_SEO,
    TOOL_SEO,
    buildBreadcrumbJsonLd,
    buildSoftwareJsonLd,
    getOpenGraphImages,
    localeAlternates,
    localizedUrl,
} from '@/lib/seo';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return LOCALES.flatMap((locale) =>
        Object.keys(DOCUMENT_ROUTES).map((tool) => ({ locale, tool })),
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; tool: string }>;
}): Promise<Metadata> {
    const { locale, tool } = await params;

    if (!LOCALES.includes(locale as AppLocale) || !isDocumentRoute(tool)) {
        return {};
    }

    const appLocale = locale as AppLocale;
    const route = tool as DocumentRoute;
    const seo = TOOL_SEO[route][appLocale];

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        alternates: localeAlternates(appLocale, route),
        openGraph: {
            type: 'website',
            title: seo.title,
            description: seo.description,
            url: localizedUrl(appLocale, route),
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

export default async function DocumentToolPage({
    params,
}: {
    params: Promise<{ locale: string; tool: string }>;
}) {
    const { locale, tool } = await params;

    if (!LOCALES.includes(locale as AppLocale) || !isDocumentRoute(tool)) {
        notFound();
    }

    const appLocale = locale as AppLocale;
    const route = tool as DocumentRoute;
    const jsonLd = [
        buildSoftwareJsonLd(appLocale, route),
        buildBreadcrumbJsonLd(appLocale, [
            { name: HOME_SEO[appLocale].title, path: '' },
            { name: TOOL_SEO[route][appLocale].name, path: route },
        ]),
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="sr-only">
                <h1>{TOOL_SEO[route][appLocale].name}</h1>
                <p>{TOOL_SEO[route][appLocale].description}</p>
            </div>
            <DocumentEditor route={route} />
        </>
    );
}
