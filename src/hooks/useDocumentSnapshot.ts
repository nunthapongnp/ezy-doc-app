'use client';

import { useTolgee } from '@tolgee/react';
import { useMemo } from 'react';
import { computeDocNumber } from '@/lib/docNumber';
import { buildPdfLabels } from '@/lib/pdf/buildPdfLabels';
import { useLayoutStore } from '@/stores/layoutStore';
import { useDocumentStore } from '@/stores/documentStore';
import { useVendorStore } from '@/stores/vendorStore';
import type { DocumentState, PartyInfo } from '@/types/document';
import type { PdfLabels } from '@/types/pdfLabels';

export function useDocumentSnapshot(): {
    snapshot: DocumentState | null;
    labels: PdfLabels | null;
} {
    const { doc } = useDocumentStore();
    const { layout } = useLayoutStore();
    const { vendor } = useVendorStore();
    const tolgee = useTolgee(['language', 'cache']);

    return useMemo(() => {
        if (!doc.docType) return { snapshot: null, labels: null };

        const docDate = doc.docDate ?? new Date();
        const docNo = layout.header.showDocNo
            ? computeDocNumber(doc.docType, docDate, layout.header.docSeqNumber)
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
            subTotalAmt: doc.subTotalAmt ?? 0,
            taxRate: layout.footer.taxRate,
            taxAmt: doc.taxAmt ?? 0,
            totalAmt: doc.totalAmt ?? 0,
            whtRate: layout.footer.whtRate,
            whtAmt: doc.whtAmt ?? 0,
            netTotalAmt: doc.netTotalAmt ?? 0,
            remark: doc.remark,
            paymentMethod: doc.paymentMethod,
            layout: {
                showDocNo: layout.header.showDocNo,
                showRefNo: layout.header.showRefNo,
                showDocDate: layout.header.showDocDate,
                showDueDate: layout.header.showDueDate,
                showTax: layout.footer.showTax,
                showWht: layout.footer.showWht,
                showRemark: layout.showRemark,
                showPaymentMethod: layout.showPaymentMethod,
                showItemSeq: layout.items.showSeq,
                showItemDesc: layout.items.showDesc,
                showItemUnit: layout.items.showUnit,
                showItemUnitPrice: layout.items.showUnitPrice,
            },
        };

        const pdfLang = layout.language;
        const t = (key: string, params?: Record<string, string | number>) =>
            tolgee.t(key, { language: pdfLang, ...params });

        const labels = buildPdfLabels(t, doc.docType, layout.footer.taxRate);

        return { snapshot, labels };
    }, [doc, layout, vendor, tolgee]);
}
