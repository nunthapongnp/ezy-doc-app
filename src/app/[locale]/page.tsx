import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/view/core/HeroSection';
import { ToolsSection } from '@/components/view/core/ToolsSection';
import { LOCALES, type AppLocale } from '@/lib/constants';

export async function generateStaticParams() {
    return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isEn = locale === 'en';
    return {
        title: isEn
            ? 'EZY-Doc — Free Quotation, Invoice & Receipt Generator'
            : 'EZY-Doc — สร้างใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จรับเงิน ฟรี',
        description: isEn
            ? 'Create professional business documents instantly. Free PDF export, no sign-up required.'
            : 'สร้างเอกสารธุรกิจแบบมืออาชีพ ดาวน์โหลด PDF ฟรี ไม่ต้องสมัครสมาชิก',
        alternates: {
            canonical: `https://ezydoc.app/${locale}`,
            languages: {
                en: 'https://ezydoc.app/en',
                th: 'https://ezydoc.app/th',
            },
        },
    };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!LOCALES.includes(locale as AppLocale)) notFound();

    return (
        <div className="flex flex-col">
            <HeroSection locale={locale as AppLocale} />
            <ToolsSection locale={locale as AppLocale} />
            <section className="border-y bg-muted/20 py-16">
                <div className="container mx-auto grid gap-8 px-4 text-center md:grid-cols-3">
                    <div>
                        <h4 className="font-bold">Session-only</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Nothing is saved to disk or cloud. Export PDF before you leave.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold">EN + TH</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                            UI locale and PDF document language are configured independently.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold">Free to use</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Client-side PDF generation with optional ad-supported hosting.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
