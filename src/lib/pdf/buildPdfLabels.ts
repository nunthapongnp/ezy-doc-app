import en from "@/i18n/en.json";
import th from "@/i18n/th.json";
import type { DocLanguage } from "@/types/config";
import type { DocType } from "@/types/document";
import type { PdfLabels } from "@/types/pdfLabels";

const TRANSLATIONS = { en, th } as const;

const PDF_TITLE_KEY: Record<
  DocType,
  keyof (typeof en)["PDF"]
> = {
  QUOTATION: "QUOTATION_TITLE",
  INVOICE: "INVOICE_TITLE",
  ACCEPTANCE_CERT: "ACCEPTANCE_TITLE",
  RECEIPT: "RECEIPT_TITLE",
};

export function buildPdfLabels(
  language: DocLanguage,
  docType: DocType,
  taxRate: number,
): PdfLabels {
  const t = TRANSLATIONS[language];
  const editor = t.EDITOR;
  const pdf = t.PDF;

  return {
    title: pdf[PDF_TITLE_KEY[docType]],
    docNo: editor.DOC_NO,
    refNo: editor.REF_NO,
    date: editor.DOC_DATE,
    expiryDate: editor.EXPIRY_DATE,
    dueDate: editor.DUE_DATE,
    vendor: editor.VENDOR,
    customer: editor.CUSTOMER,
    description: editor.ITEM_DESC,
    qty: editor.ITEM_QTY,
    unit: editor.ITEM_UNIT,
    unitPrice: editor.ITEM_UNIT_PRICE,
    amount: editor.ITEM_AMOUNT,
    subTotal: editor.SUBTOTAL,
    tax: editor.TAX.replace("{rate}", String(taxRate)),
    total: editor.TOTAL,
    remark: editor.REMARK,
  };
}
