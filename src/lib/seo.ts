import type { Metadata } from 'next';
import {
    APP_NAME,
    DOCUMENT_ROUTES,
    SITE_URL,
    type AppLocale,
    type DocumentRoute,
} from '@/lib/constants';

const SITE_BASE_URL = SITE_URL.replace(/\/$/, '');

export const HOME_SEO: Record<
    AppLocale,
    { title: string; description: string; keywords: string[] }
> = {
    en: {
        title: `${APP_NAME} - Free Quotation, Invoice & Receipt Generator`,
        description:
            'Create professional quotations, invoices, acceptance certificates, and receipts online. Free PDF export, Thai and English support, no sign-up required.',
        keywords: [
            'free invoice generator',
            'quotation generator',
            'receipt generator',
            'acceptance certificate',
            'PDF invoice',
            'Thai invoice generator',
        ],
    },
    th: {
        title: `${APP_NAME} - สร้างใบเสนอราคา ใบแจ้งหนี้ ใบเสร็จรับเงิน ฟรี`,
        description:
            'สร้างใบเสนอราคา ใบแจ้งหนี้ ใบตรวจรับงาน และใบเสร็จรับเงินออนไลน์ ดาวน์โหลด PDF ฟรี รองรับภาษาไทยและอังกฤษ ไม่ต้องสมัครสมาชิก',
        keywords: [
            'สร้างใบเสนอราคา',
            'สร้างใบแจ้งหนี้',
            'สร้างใบเสร็จรับเงิน',
            'ใบตรวจรับงาน',
            'ดาวน์โหลด PDF ฟรี',
            'โปรแกรมออกใบแจ้งหนี้',
        ],
    },
};

export const TOOL_SEO: Record<
    DocumentRoute,
    Record<AppLocale, { name: string; title: string; description: string; keywords: string[] }>
> = {
    quotation: {
        en: {
            name: 'Quotation Generator',
            title: `Free Quotation Generator - Create PDF Quotes Online | ${APP_NAME}`,
            description:
                'Create professional quotations online for free. Add company details, customer information, line items, tax, and export a ready-to-send PDF quote.',
            keywords: [
                'quotation generator',
                'quote PDF',
                'free quotation maker',
                'online quote generator',
            ],
        },
        th: {
            name: 'เครื่องมือสร้างใบเสนอราคา',
            title: `สร้างใบเสนอราคา PDF ฟรี ออนไลน์ | ${APP_NAME}`,
            description:
                'สร้างใบเสนอราคาออนไลน์ฟรี ใส่ข้อมูลบริษัท ลูกค้า รายการสินค้า ภาษี และดาวน์โหลด PDF พร้อมส่งให้ลูกค้าได้ทันที',
            keywords: [
                'สร้างใบเสนอราคา',
                'ใบเสนอราคา PDF',
                'โปรแกรมใบเสนอราคา',
                'ออกใบเสนอราคาออนไลน์',
            ],
        },
    },
    invoice: {
        en: {
            name: 'Invoice Generator',
            title: `Free Invoice Generator - Create PDF Invoices Online | ${APP_NAME}`,
            description:
                'Create clear, professional invoices online for free. Enter billing details, itemized services, tax, and export an invoice PDF instantly.',
            keywords: ['invoice generator', 'free invoice maker', 'PDF invoice', 'online invoice'],
        },
        th: {
            name: 'เครื่องมือสร้างใบแจ้งหนี้',
            title: `สร้างใบแจ้งหนี้ PDF ฟรี ออนไลน์ | ${APP_NAME}`,
            description:
                'สร้างใบแจ้งหนี้ออนไลน์ฟรี ใส่ข้อมูลผู้ขาย ลูกค้า รายการบริการ ภาษี และดาวน์โหลด PDF ได้ทันที',
            keywords: [
                'สร้างใบแจ้งหนี้',
                'ใบแจ้งหนี้ PDF',
                'โปรแกรมออกใบแจ้งหนี้',
                'invoice ภาษาไทย',
            ],
        },
    },
    acceptance: {
        en: {
            name: 'Acceptance Certificate Generator',
            title: `Free Acceptance Certificate Generator - PDF Online | ${APP_NAME}`,
            description:
                'Create a work acceptance certificate online for free. Document delivered work, customer acceptance, totals, and export a professional PDF.',
            keywords: [
                'acceptance certificate',
                'work acceptance form',
                'acceptance certificate PDF',
                'delivery acceptance document',
            ],
        },
        th: {
            name: 'เครื่องมือสร้างใบตรวจรับงาน',
            title: `สร้างใบตรวจรับงาน PDF ฟรี ออนไลน์ | ${APP_NAME}`,
            description:
                'สร้างใบตรวจรับงานออนไลน์ฟรี บันทึกรายละเอียดงาน ผู้รับงาน ยอดรวม และดาวน์โหลด PDF พร้อมใช้งาน',
            keywords: [
                'ใบตรวจรับงาน',
                'สร้างใบตรวจรับงาน',
                'เอกสารตรวจรับงาน PDF',
                'แบบฟอร์มตรวจรับงาน',
            ],
        },
    },
    receipt: {
        en: {
            name: 'Receipt Generator',
            title: `Free Receipt Generator - Create PDF Receipts Online | ${APP_NAME}`,
            description:
                'Create payment receipts online for free. Add payer details, line items, payment method, tax, and export a clean PDF receipt.',
            keywords: ['receipt generator', 'free receipt maker', 'PDF receipt', 'payment receipt'],
        },
        th: {
            name: 'เครื่องมือสร้างใบเสร็จรับเงิน',
            title: `สร้างใบเสร็จรับเงิน PDF ฟรี ออนไลน์ | ${APP_NAME}`,
            description:
                'สร้างใบเสร็จรับเงินออนไลน์ฟรี ใส่รายละเอียดผู้ชำระเงิน รายการ วิธีชำระเงิน ภาษี และดาวน์โหลด PDF ได้ทันที',
            keywords: [
                'สร้างใบเสร็จรับเงิน',
                'ใบเสร็จรับเงิน PDF',
                'โปรแกรมออกใบเสร็จ',
                'receipt ภาษาไทย',
            ],
        },
    },
};

export function absoluteUrl(path = '') {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_BASE_URL}${normalizedPath}`;
}

export function localizedPath(locale: AppLocale, path = '') {
    return `/${locale}${path ? `/${path.replace(/^\/+/, '')}` : ''}`;
}

export function localizedUrl(locale: AppLocale, path = '') {
    return absoluteUrl(localizedPath(locale, path));
}

export function localeAlternates(locale: AppLocale, path = ''): Metadata['alternates'] {
    return {
        canonical: localizedUrl(locale, path),
        languages: {
            en: localizedUrl('en', path),
            th: localizedUrl('th', path),
            'x-default': localizedUrl('en', path),
        },
    };
}

export function getOpenGraphImages() {
    return [{ url: absoluteUrl('/opengraph-image'), width: 1200, height: 630, alt: APP_NAME }];
}

export function buildWebAppJsonLd(locale: AppLocale) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: APP_NAME,
        url: localizedUrl(locale),
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        inLanguage: locale,
        isAccessibleForFree: true,
        description: HOME_SEO[locale].description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        featureList: Object.keys(DOCUMENT_ROUTES).map(
            (tool) => TOOL_SEO[tool as DocumentRoute][locale].name,
        ),
    };
}

export function buildSoftwareJsonLd(locale: AppLocale, tool: DocumentRoute) {
    const seo = TOOL_SEO[tool][locale];

    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: seo.name,
        url: localizedUrl(locale, tool),
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        inLanguage: locale,
        isAccessibleForFree: true,
        description: seo.description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    };
}

export function buildBreadcrumbJsonLd(
    locale: AppLocale,
    entries: { name: string; path: string }[],
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: entries.map((entry, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: entry.name,
            item: localizedUrl(locale, entry.path),
        })),
    };
}

export { SITE_BASE_URL };
