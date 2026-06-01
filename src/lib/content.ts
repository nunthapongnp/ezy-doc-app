import type { AppLocale } from '@/lib/constants';
import { landingData } from './landingData';
import { blogData } from './blogData';

export interface BlogPostMeta {
    title: string;
    slug: string;
    description: string;
    publishedAt: string;
    locale: AppLocale;
    category: string;
    tags: string[];
    readTime: string;
    canonical?: string;
    ogImage?: string;
}

export interface BlogPost {
    meta: BlogPostMeta;
    body: string;
}

export interface LandingContent {
    metadata: {
        title: string;
        description: string;
        keywords: string[];
    };
    hero: {
        title: string;
        subtitle: string;
        primaryCta: string;
        secondaryCta: string;
        trustSignals: string[];
    };
    socialProof?: string;
    documentCards: Array<{
        title: string;
        subtitle: string;
        description: string;
        cta: string;
    }>;
    features: Array<{
        eyebrow: string;
        title: string;
        description: string;
    }>;
    steps: Array<{
        title: string;
        description: string;
    }>;
    comparison: {
        title: string;
        headers: string[];
        rows: string[][];
    };
    useCases: Array<{
        title: string;
        description: string;
    }>;
    faq: Array<{
        question: string;
        answer: string;
    }>;
    footerCta: {
        title: string;
        subtitle: string;
        cta: string;
    };
}

export function getLandingContent(locale: AppLocale): LandingContent {
    return landingData[locale];
}

export function getBlogPosts(locale?: AppLocale): BlogPost[] {
    return blogData
        .filter((post) => !locale || post.meta.locale === locale)
        .sort((a, b) => b.meta.publishedAt.localeCompare(a.meta.publishedAt));
}

export function getBlogPost(locale: AppLocale, slug: string): BlogPost | undefined {
    return getBlogPosts(locale).find((post) => post.meta.slug === slug);
}

