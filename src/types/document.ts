export type DocType = 'QUOTATION' | 'INVOICE' | 'ACCEPTANCE_CERT' | 'RECEIPT';

export interface LineItem {
    id: string;
    name: string;
    desc?: string;
    qty: number;
    unit: string;
    unitPrice: number;
    totalAmt: number;
}

export interface PartyInfo {
    name: string;
    addressLine1: string;
    addressLine2: string;
    taxId?: string;
    phone: string;
    email: string;
}

export interface DocumentState {
    docType: DocType;
    docNo: string;
    refNo?: string;
    docDate: Date;
    dueDate?: Date;
    vendor: PartyInfo & { logoDataUrl?: string };
    customer: PartyInfo;
    items: LineItem[];
    subTotalAmt: number;
    taxRate: number;
    taxAmt: number;
    totalAmt: number;
    whtRate: number;
    whtAmt: number;
    netTotalAmt: number;
    remark?: string;
    paymentMethod?: string;
    layout: {
        showDocNo: boolean;
        showRefNo: boolean;
        showDocDate: boolean;
        showDueDate: boolean;
        showTax: boolean;
        showWht: boolean;
        showRemark: boolean;
        showPaymentMethod: boolean;
        showItemSeq: boolean;
        showItemDesc: boolean;
        showItemUnit: boolean;
        showItemUnitPrice: boolean;
    };
}

export const EMPTY_PARTY: PartyInfo = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    phone: '',
    email: '',
};

export function createEmptyLineItem(): LineItem {
    return {
        id: crypto.randomUUID(),
        name: '',
        desc: '',
        qty: 1,
        unit: '',
        unitPrice: 0,
        totalAmt: 0,
    };
}
