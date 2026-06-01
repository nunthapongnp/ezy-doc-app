import Link from 'next/link';
import { CheckCircle2, Clock3, FileCheck2, ShieldCheck } from 'lucide-react';
import type { AppLocale } from '@/lib/constants';
import type { BlogPostMeta, LandingContent } from '@/lib/content';

const featureIcons = [ShieldCheck, FileCheck2, Clock3, CheckCircle2, ShieldCheck, FileCheck2];

export function LandingSections({
    locale,
    content,
    latestPosts,
}: {
    locale: AppLocale;
    content: LandingContent;
    latestPosts: BlogPostMeta[];
}) {
    const isTh = locale === 'th';

    return (
        <>
            {content.socialProof ? (
                <section className="border-y bg-primary/5 py-6">
                    <div className="container mx-auto px-4 text-center text-sm font-medium text-foreground/80">
                        {content.socialProof}
                    </div>
                </section>
            ) : null}

            <section className="container mx-auto px-4 py-16">
                <div className="mb-10 max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {isTh
                            ? 'มีครบทุกอย่างที่ต้องการ ไม่มีส่วนเกินที่ไม่จำเป็น'
                            : "Everything You Need. Nothing You Don't."}
                    </h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {content.features.map((feature, index) => {
                        const Icon = featureIcons[index % featureIcons.length];
                        return (
                            <div key={feature.title} className="rounded-lg border bg-card p-6">
                                <Icon className="mb-4 size-5 text-primary" />
                                <p className="mb-2 text-xs font-semibold uppercase text-primary">
                                    {feature.eyebrow}
                                </p>
                                <h3 className="text-lg font-bold">{feature.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section id="how-it-works" className="border-y bg-muted/20 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-center text-3xl font-bold tracking-tight">
                        {isTh ? '3 ขั้นตอน ไม่ถึง 3 นาที' : 'Three Steps. Under Three Minutes.'}
                    </h2>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {content.steps.map((step, index) => (
                            <div key={step.title} className="rounded-lg border bg-background p-6">
                                <div className="mb-4 inline-flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                    {index + 1}
                                </div>
                                <h3 className="text-lg font-bold">{step.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold tracking-tight">{content.comparison.title}</h2>
                <div className="mt-8 overflow-x-auto rounded-lg border">
                    <table className="w-full min-w-[720px] border-collapse text-sm">
                        <thead>
                            <tr className="border-b bg-muted/40">
                                {content.comparison.headers.map((header, index) => (
                                    <th
                                        key={`${header}-${index}`}
                                        className="p-4 text-left font-bold"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {content.comparison.rows.map((row) => (
                                <tr key={row.join('-')} className="border-b last:border-0">
                                    {row.map((cell, index) => (
                                        <td key={`${cell}-${index}`} className="p-4 align-top">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="border-y bg-muted/20 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {isTh
                            ? 'สำหรับ Freelance ทุกประเภท'
                            : 'Built for How Freelancers Actually Work'}
                    </h2>
                    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {content.useCases.map((useCase) => (
                            <div
                                key={useCase.title}
                                className="rounded-lg border bg-background p-5"
                            >
                                <h3 className="font-bold">{useCase.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                    {useCase.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {latestPosts.length ? (
                <section className="container mx-auto px-4 py-16">
                    <div className="mb-8 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold text-primary">
                                {isTh ? 'บทความล่าสุด' : 'Latest Articles'}
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight">
                                {isTh
                                    ? 'คู่มือเอกสารธุรกิจสำหรับ Freelance'
                                    : 'Business Document Guides'}
                            </h2>
                        </div>
                        <Link
                            href="/blog"
                            className="text-sm font-semibold text-primary underline underline-offset-4"
                        >
                            {isTh ? 'ดูทั้งหมด' : 'View all'}
                        </Link>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {latestPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/${post.locale}/blog/${post.slug}`}
                                className="rounded-lg border bg-card p-5 transition hover:border-primary"
                            >
                                <p className="text-xs font-semibold text-primary">
                                    {post.category}
                                </p>
                                <h3 className="mt-3 line-clamp-2 font-bold leading-6">
                                    {post.title}
                                </h3>
                                <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                                    {post.description}
                                </p>
                                <p className="mt-4 text-xs text-muted-foreground">
                                    {post.readTime}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            ) : null}

            <section className="border-y bg-muted/20 py-16">
                <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[360px_1fr]">
                    <div>
                        <p className="text-sm font-semibold text-primary">FAQ</p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight">
                            {isTh ? 'คำถามที่พบบ่อย' : 'Frequently Asked Questions'}
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {content.faq.map((item) => (
                            <details
                                key={item.question}
                                className="rounded-lg border bg-background p-5"
                            >
                                <summary className="cursor-pointer font-bold">
                                    {item.question}
                                </summary>
                                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                    {item.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16 text-center">
                <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight">
                    {content.footerCta.title}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                    {content.footerCta.subtitle}
                </p>
                <Link
                    href={`/${locale}/quotation`}
                    className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                >
                    {content.footerCta.cta}
                </Link>
            </section>
        </>
    );
}
