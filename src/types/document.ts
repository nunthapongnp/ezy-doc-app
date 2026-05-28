export type DocType =
  | "QUOTATION"
  | "INVOICE"
  | "ACCEPTANCE_CERT"
  | "RECEIPT";

export interface LineItem {
  id: string;
  name: string;
  desc?: string;
  qty: number;
  unit: string;
  unitPrice: number;
  total: number;
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
  expiryDate?: Date;
  dueDate?: Date;
  vendor: PartyInfo & { logoDataUrl?: string };
  customer: PartyInfo;
  items: LineItem[];
  subTotal: number;
  taxAmount: number;
  total: number;
  remark?: string;
  paymentMethod?: string;
  showDocNo: boolean;
  includeTax: boolean;
  taxRate: number;
}

export const EMPTY_PARTY: PartyInfo = {
  name: "",
  addressLine1: "",
  addressLine2: "",
  phone: "",
  email: "",
};

export function createEmptyLineItem(): LineItem {
  return {
    id: crypto.randomUUID(),
    name: "",
    desc: "",
    qty: 1,
    unit: "",
    unitPrice: 0,
    total: 0,
  };
}
