import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { LOCALES, type AppLocale } from '@/lib/constants';
import { getBlogPosts } from '@/lib/content';
import {
    buildBreadcrumbJsonLd,
    getOpenGraphImages,
    localeAlternates,
    localizedUrl,
} from '@/lib/seo';

export function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const appLocale = LOCALES.includes(locale as AppLocale) ? (locale as AppLocale) : 'th';

    return {
        title: 'บล็อกเอกสารธุรกิจสำหรับ Freelance | EZY-DOC',
        description:
            'รวมบทความคู่มือใบเสนอราคา ใบแจ้งหนี้ ใบตรวจรับงาน และใบเสร็จรับเงินสำหรับ Freelance และผู้ประกอบการอิสระ',
        alternates: localeAlternates(appLocale, 'blog'),
        openGraph: {
            type: 'website',
            title: 'บล็อกเอกสารธุรกิจสำหรับ Freelance | EZY-DOC',
            description:
                'รวมบทความคู่มือใบเสนอราคา ใบแจ้งหนี้ ใบตรวจรับงาน และใบเสร็จรับเงินสำหรับ Freelance',
            url: localizedUrl(appLocale, 'blog'),
            images: getOpenGraphImages(),
        },
    };
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!LOCALES.includes(locale as AppLocale)) notFound();
    if (locale !== 'th') redirect('/th/blog');

    const posts = getBlogPosts('th');
    const jsonLd = buildBreadcrumbJsonLd('th', [
        { name: 'หน้าหลัก', path: '' },
        { name: 'บล็อก', path: 'blog' },
    ]);

    return (
        <div className="container mx-auto px-4 py-14">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-3xl">
                <p className="text-sm font-semibold text-primary">EZY-DOC Blog</p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
                    คู่มือเอกสารธุรกิจสำหรับ Freelance
                </h1>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                    บทความจากเนื้อหาที่เตรียมไว้สำหรับช่วยให้ Freelance เข้าใจใบเสนอราคา ใบแจ้งหนี้
                    ใบตรวจรับงาน และใบเสร็จรับเงินก่อนเริ่มรับงานจริง
                </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
                {posts.map((post) => (
                    <Link
                        key={post.meta.slug}
                        href={`/th/blog/${post.meta.slug}`}
                        className="rounded-lg border bg-card p-5 transition hover:border-primary"
                    >
                        <p className="text-xs font-semibold text-primary">{post.meta.category}</p>
                        <h2 className="mt-3 text-xl font-bold leading-7">{post.meta.title}</h2>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            {post.meta.description}
                        </p>
                        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>{post.meta.readTime}</span>
                            <span>•</span>
                            <time dateTime={post.meta.publishedAt}>
                                {new Intl.DateTimeFormat('th-TH', {
                                    dateStyle: 'medium',
                                }).format(new Date(post.meta.publishedAt))}
                            </time>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
