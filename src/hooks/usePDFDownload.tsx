'use client';

import { pdf } from '@react-pdf/renderer';
import { useVignetteAd } from '@/components/view/ads/VignetteAdTrigger';
import { TEMPLATE_MAP } from '@/lib/pdf/templateMap';
import { useDocumentSnapshot } from './useDocumentSnapshot';
import { APP_NAME } from '@/lib/constants';

export function usePDFDownload() {
    const { snapshot, labels } = useDocumentSnapshot();
    const { triggerVignette } = useVignetteAd();

    const download = async () => {
        if (!snapshot || !labels) return;

        triggerVignette('export_pdf_click');

        const Template = TEMPLATE_MAP[snapshot.docType];
        const blob = await pdf(<Template data={snapshot} labels={labels} />).toBlob();

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${APP_NAME}-${snapshot.docNo || snapshot.docType}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return { download, canDownload: Boolean(snapshot && labels) };
}
