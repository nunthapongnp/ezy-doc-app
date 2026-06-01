import type { AppLocale } from '@/lib/constants';
import type { LandingContent } from '@/lib/content';
import Link from 'next/link';

export function HeroSection({
    locale = 'en',
    content,
}: {
    locale?: AppLocale;
    content?: LandingContent['hero'];
}) {
    const title = content?.title;
    const subtitle = content?.subtitle;

    return (
        <section className="border-b bg-muted/20">
            <div className="container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-[1fr_420px] lg:items-center lg:py-20">
                <div className="max-w-3xl">
                    <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">{subtitle}</p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href={`/${locale}/quotation`}
                            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                        >
                            {content?.primaryCta}
                        </Link>
                        <a
                            href="#how-it-works"
                            className="inline-flex h-11 items-center justify-center rounded-lg border bg-background px-5 text-sm font-semibold transition hover:bg-muted"
                        >
                            {content?.secondaryCta}
                        </a>
                    </div>
                    {content?.trustSignals?.length ? (
                        <ul className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                            {content.trustSignals.map((signal) => (
                                <li key={signal} className="flex items-center gap-2">
                                    <span className="size-1.5 rounded-full bg-primary" />
                                    {signal.replace(/^✓\s*/, '')}
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </div>
                <div className="rounded-lg border bg-background p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between border-b pb-3">
                        <span className="text-sm font-semibold text-primary">EZY-DOC</span>
                        <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                            PDF
                        </span>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="h-4 w-36 rounded bg-foreground/80" />
                            <div className="mt-2 h-3 w-52 rounded bg-muted" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="h-16 rounded border bg-muted/30" />
                            <div className="h-16 rounded border bg-muted/30" />
                        </div>
                        <div className="space-y-2">
                            <div className="grid grid-cols-[1fr_72px_90px] gap-2">
                                <div className="h-8 rounded bg-muted" />
                                <div className="h-8 rounded bg-muted" />
                                <div className="h-8 rounded bg-muted" />
                            </div>
                            <div className="grid grid-cols-[1fr_72px_90px] gap-2">
                                <div className="h-8 rounded bg-muted/70" />
                                <div className="h-8 rounded bg-muted/70" />
                                <div className="h-8 rounded bg-muted/70" />
                            </div>
                        </div>
                        <div className="ml-auto h-10 w-40 rounded bg-primary/15" />
                    </div>
                </div>
            </div>
        </section>
    );
}
