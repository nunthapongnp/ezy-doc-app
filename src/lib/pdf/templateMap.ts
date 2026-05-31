import { DocumentPdfTemplate } from '@/components/view/pdf/DocumentPdfTemplate';
import type { DocumentPdfTemplateProps } from '@/components/view/pdf/DocumentPdfTemplate';
import type { DocType } from '@/types/document';
import type { ComponentType } from 'react';

export type PdfTemplateComponent = ComponentType<DocumentPdfTemplateProps>;

export const TEMPLATE_MAP: Record<DocType, PdfTemplateComponent> = {
    QUOTATION: DocumentPdfTemplate,
    INVOICE: DocumentPdfTemplate,
    ACCEPTANCE_CERT: DocumentPdfTemplate,
    RECEIPT: DocumentPdfTemplate,
};
