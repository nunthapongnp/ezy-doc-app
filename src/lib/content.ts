import fs from 'node:fs';
import path from 'node:path';
import type { AppLocale } from '@/lib/constants';
import { landingData } from './landingData';

const CONTENT_DIR = path.join(process.cwd(), 'public', 'contents');

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

function readContentFile(fileName: string) {
    return fs.readFileSync(path.join(CONTENT_DIR, fileName), 'utf8');
}

function stripQuotes(value: string) {
    return value.trim().replace(/^["']|["']$/g, '');
}

function parseFrontmatter(raw: string): BlogPost {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) {
        throw new Error('Missing frontmatter in blog content');
    }

    const [, frontmatter, body] = match;
    const data: Record<string, string | string[]> = {};

    for (const line of frontmatter.split('\n')) {
        const separatorIndex = line.indexOf(':');
        if (separatorIndex === -1) continue;

        const key = line.slice(0, separatorIndex).trim();
        const rawValue = line.slice(separatorIndex + 1).trim();
        data[key] = rawValue.startsWith('[') ? JSON.parse(rawValue) : stripQuotes(rawValue);
    }

    return {
        meta: {
            title: String(data.title),
            slug: String(data.slug),
            description: String(data.description),
            publishedAt: String(data.publishedAt),
            locale: data.locale as AppLocale,
            category: String(data.category),
            tags: Array.isArray(data.tags) ? data.tags : [],
            readTime: String(data.readTime),
            canonical: data.canonical ? String(data.canonical) : undefined,
            ogImage: data.ogImage ? String(data.ogImage) : undefined,
        },
        body: body.trim(),
    };
}

export function getLandingContent(locale: AppLocale): LandingContent {
    return landingData[locale];
}

export function getBlogPosts(locale?: AppLocale): BlogPost[] {
    return fs
        .readdirSync(CONTENT_DIR)
        .filter((fileName) => fileName.startsWith('blog-') && fileName.endsWith('.md'))
        .map((fileName) => parseFrontmatter(readContentFile(fileName)))
        .filter((post) => !locale || post.meta.locale === locale)
        .sort((a, b) => b.meta.publishedAt.localeCompare(a.meta.publishedAt));
}

export function getBlogPost(locale: AppLocale, slug: string): BlogPost | undefined {
    return getBlogPosts(locale).find((post) => post.meta.slug === slug);
}
