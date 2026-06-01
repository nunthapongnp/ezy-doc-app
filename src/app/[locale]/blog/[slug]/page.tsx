import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MarkdownArticle } from '@/components/blog/MarkdownArticle';
import { LOCALES, type AppLocale } from '@/lib/constants';
import { getBlogPost, getBlogPosts } from '@/lib/content';
import {
    absoluteUrl,
    buildBreadcrumbJsonLd,
    getOpenGraphImages,
    localeAlternates,
    localizedUrl,
} from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
    return getBlogPosts('th').map((post) => ({
        locale: post.meta.locale,
        slug: post.meta.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    if (!LOCALES.includes(locale as AppLocale)) return {};

    const post = getBlogPost(locale as AppLocale, decodedSlug);
    if (!post) return {};

    return {
        title: `${post.meta.title} | EZY-DOC Blog`,
        description: post.meta.description,
        keywords: post.meta.tags,
        alternates: localeAlternates(post.meta.locale, `blog/${post.meta.slug}`),
        openGraph: {
            type: 'article',
            title: post.meta.title,
            description: post.meta.description,
            url: localizedUrl(post.meta.locale, `blog/${post.meta.slug}`),
            publishedTime: post.meta.publishedAt,
            authors: ['EZY-DOC'],
            tags: post.meta.tags,
            images: getOpenGraphImages(),
        },
        twitter: {
            card: 'summary_large_image',
            title: post.meta.title,
            description: post.meta.description,
            images: getOpenGraphImages().map((image) => image.url),
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    if (!LOCALES.includes(locale as AppLocale)) notFound();

    const post = getBlogPost(locale as AppLocale, decodedSlug);
    if (!post) notFound();

    const articleUrl = localizedUrl(post.meta.locale, `blog/${post.meta.slug}`);
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.meta.title,
            description: post.meta.description,
            datePublished: post.meta.publishedAt,
            dateModified: post.meta.publishedAt,
            inLanguage: post.meta.locale,
            author: {
                '@type': 'Organization',
                name: 'EZY-DOC',
                url: absoluteUrl(),
            },
            publisher: {
                '@type': 'Organization',
                name: 'EZY-DOC',
                url: absoluteUrl(),
            },
            mainEntityOfPage: articleUrl,
        },
        buildBreadcrumbJsonLd(post.meta.locale, [
            { name: 'หน้าหลัก', path: '' },
            { name: 'บล็อก', path: 'blog' },
            { name: post.meta.title, path: `blog/${post.meta.slug}` },
        ]),
    ];

    return (
        <article className="container mx-auto max-w-3xl px-4 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Link
                href="/th/blog"
                className="text-sm font-semibold text-primary underline underline-offset-4"
            >
                กลับไปหน้าบล็อก
            </Link>
            <div className="mt-8 mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold text-primary">{post.meta.category}</span>
                <span>•</span>
                <time dateTime={post.meta.publishedAt}>
                    {new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium' }).format(
                        new Date(post.meta.publishedAt),
                    )}
                </time>
                <span>•</span>
                <span>{post.meta.readTime}</span>
            </div>
            <MarkdownArticle markdown={post.body} />
            <div className="mt-10 flex flex-wrap gap-2 border-t pt-6">
                {post.meta.tags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </article>
    );
}
