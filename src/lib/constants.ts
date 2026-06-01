import type { DocType } from '@/types/document';

export const LOCALE_LABELS: Record<string, string> = {
    en: 'English',
    th: 'ภาษาไทย',
};
export const LOCALES = Object.keys(LOCALE_LABELS);
export type AppLocale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: AppLocale =
    (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as AppLocale) || 'en';

export const DOCUMENT_ROUTES = {
    quotation: 'QUOTATION',
    invoice: 'INVOICE',
    acceptance: 'ACCEPTANCE_CERT',
    receipt: 'RECEIPT',
} as const satisfies Record<string, DocType>;

export type DocumentRoute = keyof typeof DOCUMENT_ROUTES;

export function isDocumentRoute(tool: string): tool is DocumentRoute {
    return tool in DOCUMENT_ROUTES;
}

export function routeToDocType(route: DocumentRoute): DocType {
    return DOCUMENT_ROUTES[route];
}

export const DOC_TYPE_TITLE_KEYS: Record<DocType, string> = {
    QUOTATION: 'PDF.QUOTATION_TITLE',
    INVOICE: 'PDF.INVOICE_TITLE',
    ACCEPTANCE_CERT: 'PDF.ACCEPTANCE_TITLE',
    RECEIPT: 'PDF.RECEIPT_TITLE',
};

export const APP_NAME = 'EZY-DOC';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ezy-doc.com';
