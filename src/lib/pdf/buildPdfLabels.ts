import type { DocType } from '@/types/document';
import type { PdfLabels } from '@/types/pdfLabels';

const PDF_TITLE_KEY: Record<DocType, string> = {
    QUOTATION: 'PDF.QUOTATION_TITLE',
    INVOICE: 'PDF.INVOICE_TITLE',
    ACCEPTANCE_CERT: 'PDF.ACCEPTANCE_TITLE',
    RECEIPT: 'PDF.RECEIPT_TITLE',
};

export type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

/** Build PDF labels using Tolgee `t` (supports per-language via options in caller). */
export function buildPdfLabels(t: TranslateFn, docType: DocType, taxRate: number): PdfLabels {
    return {
        title: t(PDF_TITLE_KEY[docType]),
        docNo: t('EDITOR.DOC_NO'),
        refNo: t('EDITOR.REF_NO'),
        date: t('EDITOR.DOC_DATE'),
        expiryDate: t('EDITOR.EXPIRY_DATE'),
        dueDate: t('EDITOR.DUE_DATE'),
        vendor: t('EDITOR.VENDOR'),
        customer: t('EDITOR.CUSTOMER'),
        description: t('EDITOR.ITEM_DESC'),
        qty: t('EDITOR.ITEM_QTY'),
        unit: t('EDITOR.ITEM_UNIT'),
        unitPrice: t('EDITOR.ITEM_UNIT_PRICE'),
        amount: t('EDITOR.ITEM_AMOUNT'),
        subTotal: t('EDITOR.SUBTOTAL'),
        tax: t('EDITOR.TAX', { rate: taxRate }),
        total: t('EDITOR.TOTAL'),
        remark: t('EDITOR.REMARK'),
    };
}
