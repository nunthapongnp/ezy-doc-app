import type { MetadataRoute } from 'next';
import { DOCUMENT_ROUTES, LOCALES, type AppLocale } from '@/lib/constants';
import { getBlogPosts } from '@/lib/content';
import { absoluteUrl, localizedUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const tools = Object.keys(DOCUMENT_ROUTES);
    const blogPosts = getBlogPosts('th');

    const localizedRoutes = LOCALES.flatMap((locale) => {
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

    return [
        ...localizedRoutes,
        {
            url: absoluteUrl('/blog'),
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: localizedUrl('th', 'blog'),
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        ...blogPosts.map((post) => ({
            url: localizedUrl(post.meta.locale, `blog/${post.meta.slug}`),
            lastModified: new Date(post.meta.publishedAt),
            changeFrequency: 'monthly' as const,
            priority: 0.75,
        })),
    ];
}
