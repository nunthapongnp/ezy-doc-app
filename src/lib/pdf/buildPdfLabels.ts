import type { DocType } from '@/types/document';
import type { PdfLabels } from '@/types/pdfLabels';

const PDF_TITLE_KEY: Record<DocType, string> = {
    QUOTATION: 'EDITOR.TAB.PREVIEW.TITLE.QUOTATION',
    INVOICE: 'EDITOR.TAB.PREVIEW.TITLE.INVOICE',
    ACCEPTANCE_CERT: 'EDITOR.TAB.PREVIEW.TITLE.ACCEPTANCE',
    RECEIPT: 'EDITOR.TAB.PREVIEW.TITLE.RECEIPT',
};

export type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

/** Build PDF labels using Tolgee `t` (supports per-language via options in caller). */
export function buildPdfLabels(t: TranslateFn, docType: DocType, taxRate: number): PdfLabels {
    return {
        title: t(PDF_TITLE_KEY[docType]),
        docNo: t('EDITOR.TAB.PREVIEW.DOC_NO'),
        refNo: t('EDITOR.TAB.PREVIEW.REF_NO'),
        date: t('EDITOR.TAB.PREVIEW.DOC_DATE'),
        dueDate: t('EDITOR.TAB.PREVIEW.DUE_DATE'),
        vendor: t('EDITOR.TAB.PREVIEW.VENDOR'),
        customer: t('EDITOR.TAB.PREVIEW.CUSTOMER'),
        itemSeq: t('EDITOR.TAB.PREVIEW.ITEM_SEQ'),
        itemDesc: t('EDITOR.TAB.PREVIEW.ITEM_DESC'),
        itemQty: t('EDITOR.TAB.PREVIEW.ITEM_QTY'),
        itemUnit: t('EDITOR.TAB.PREVIEW.ITEM_UNIT'),
        itemUnitPrice: t('EDITOR.TAB.PREVIEW.ITEM_UNIT_PRICE'),
        itemTotalAmt: t('EDITOR.TAB.PREVIEW.ITEM_TOTAL_AMT'),
        subTotalAmt: t('EDITOR.TAB.PREVIEW.SUB_TOTAL_AMT'),
        taxAmt: t('EDITOR.TAB.PREVIEW.TAX_AMT', { taxRate: taxRate }),
        totalAmt: t('EDITOR.TAB.PREVIEW.TOTAL_AMT'),
        whtAmt: t('EDITOR.TAB.PREVIEW.WHT_AMT'),
        netTotalAmt: t('EDITOR.TAB.PREVIEW.NET_TOTAL_AMT'),
        remark: t('EDITOR.TAB.PREVIEW.REMARK'),
    };
}
