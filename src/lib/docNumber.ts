import type { DocType } from "@/types/document";

const PREFIX: Record<DocType, string> = {
  QUOTATION: "QO",
  INVOICE: "IV",
  ACCEPTANCE_CERT: "AC",
  RECEIPT: "RC",
};

export function computeDocNumber(
  docType: DocType,
  date: Date,
  seqNumber: string,
): string {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const seq = seqNumber.replace(/\D/g, "").padStart(4, "0").slice(0, 4);
  return `${PREFIX[docType]}${yy}${mm}${seq}`;
}

export function sanitizeSeqNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  return digits.padStart(4, "0");
}

export function getDocNoPrefix(docType: DocType, date: Date): string {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${PREFIX[docType]}${yy}${mm}`;
}
