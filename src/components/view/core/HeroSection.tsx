import type { AppLocale } from '@/lib/constants';

export function HeroSection({ locale = 'en' }: { locale?: AppLocale }) {
    const isTh = locale === 'th';

    return (
        <section className="container mx-auto flex flex-col items-center px-4 py-24 text-center">
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
                {isTh
                    ? 'สร้างใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จรับเงิน ฟรี ไม่ต้องสมัคร'
                    : 'Create Quotations, Invoices & Receipts — Free, Instant PDF'}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                {isTh
                    ? 'สร้างเอกสารธุรกิจในเบราว์เซอร์ ไม่เก็บข้อมูลบนเซิร์ฟเวอร์ ดาวน์โหลด PDF ได้ทันที'
                    : 'Professional documents in your browser. No sign-up. Session-only — export PDF before you leave.'}
            </p>
        </section>
    );
}
