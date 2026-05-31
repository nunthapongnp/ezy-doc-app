import type { MetadataRoute } from 'next';
import { DOCUMENT_ROUTES, LOCALES, type AppLocale } from '@/lib/constants';
import { localizedUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const tools = Object.keys(DOCUMENT_ROUTES);

    return LOCALES.flatMap((locale) => {
        const appLocale = locale as AppLocale;
        const alternates = {
            languages: {
                en: localizedUrl('en'),
                th: localizedUrl('th'),
            },
        };

        return [
            {
                url: localizedUrl(appLocale),
                lastModified: now,
                changeFrequency: 'weekly' as const,
                priority: 1,
                alternates,
            },
            ...tools.map((tool) => ({
                url: localizedUrl(appLocale, tool),
                lastModified: now,
                changeFrequency: 'monthly' as const,
                priority: 0.9,
                alternates: {
                    languages: {
                        en: localizedUrl('en', tool),
                        th: localizedUrl('th', tool),
                    },
                },
            })),
        ];
    });
}
