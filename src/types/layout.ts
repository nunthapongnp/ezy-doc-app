export type DocLanguage = 'en' | 'th';

export interface DocumentLayout {
    language: DocLanguage;
    header: {
        showDocNo: boolean;
        docSeqNumber: string;
        showRefNo: boolean;
        showDocDate: boolean;
        showDueDate: boolean;
    };
    items: {
        showSeq: boolean;
        showDesc: boolean;
        showUnit: boolean;
        showUnitPrice: boolean;
    };
    footer: {
        showTax: boolean;
        taxRate: number;
        showWht: boolean;
        whtRate: number;
    };
    showRemark: boolean;
    showPaymentMethod: boolean;
}

export const DEFAULT_LAYOUT: DocumentLayout = {
    language: 'th',
    header: {
        showDocNo: true,
        docSeqNumber: '0001',
        showRefNo: true,
        showDocDate: true,
        showDueDate: true,
    },
    items: {
        showSeq: true,
        showDesc: true,
        showUnit: true,
        showUnitPrice: true,
    },
    footer: {
        showTax: false,
        taxRate: 7,
        showWht: false,
        whtRate: 3,
    },
    showRemark: true,
    showPaymentMethod: true,
};
