'use client';

import { useTolgee } from '@tolgee/react';
import { useMemo } from 'react';
import { computeDocNumber } from '@/lib/docNumber';
import { buildPdfLabels } from '@/lib/pdf/buildPdfLabels';
import { useConfigStore } from '@/stores/configStore';
import { useDocumentStore } from '@/stores/documentStore';
import { useVendorStore } from '@/stores/vendorStore';
import type { DocumentState, PartyInfo } from '@/types/document';
import type { PdfLabels } from '@/types/pdfLabels';

export function useDocumentSnapshot(): {
    snapshot: DocumentState | null;
    labels: PdfLabels | null;
} {
    const { doc } = useDocumentStore();
    const { config } = useConfigStore();
    const { vendor } = useVendorStore();
    const tolgee = useTolgee(['language', 'cache']);

    return useMemo(() => {
        if (!doc.docType) return { snapshot: null, labels: null };

        const docDate = doc.docDate ?? new Date();
        const docNo = config.showDocNo
            ? computeDocNumber(doc.docType, docDate, config.seqNumber)
            : '';

        const vendorParty: PartyInfo & { logoDataUrl?: string } = {
            name: vendor.businessName || doc.vendor?.name || '',
            addressLine1: vendor.addressLine1 || doc.vendor?.addressLine1 || '',
            addressLine2: vendor.addressLine2 || doc.vendor?.addressLine2 || '',
            taxId: vendor.taxId || doc.vendor?.taxId,
            phone: vendor.phone || doc.vendor?.phone || '',
            email: vendor.email || doc.vendor?.email || '',
            logoDataUrl: vendor.logoDataUrl,
        };

        const snapshot: DocumentState = {
            docType: doc.docType,
            docNo,
            refNo: doc.refNo,
            docDate,
            expiryDate: doc.expiryDate,
            dueDate: doc.dueDate,
            vendor: vendorParty,
            customer: doc.customer ?? {
                name: '',
                addressLine1: '',
                addressLine2: '',
                phone: '',
                email: '',
            },
            items: doc.items ?? [],
            subTotal: doc.subTotal ?? 0,
            taxAmount: doc.taxAmount ?? 0,
            total: doc.total ?? 0,
            remark: doc.remark,
            paymentMethod: doc.paymentMethod,
            showDocNo: config.showDocNo,
            includeTax: config.includeTax,
            taxRate: config.taxRate,
        };

        const pdfLang = config.language;
        const t = (key: string, params?: Record<string, string | number>) =>
            tolgee.t(key, { language: pdfLang, ...params });

        const labels = buildPdfLabels(t, doc.docType, config.taxRate);

        return { snapshot, labels };
    }, [doc, config, vendor, tolgee]);
}
