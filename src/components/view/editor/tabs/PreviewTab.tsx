'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { registerPdfFonts } from '@/lib/pdf/fontFamily';
import { TEMPLATE_MAP } from '@/lib/pdf/templateMap';
import { useVignetteAd } from '@/components/view/ads/VignetteAdTrigger';
import { useDocumentSnapshot } from '@/hooks/useDocumentSnapshot';

registerPdfFonts();

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((m) => m.PDFViewer), {
    ssr: false,
});

interface PreviewTabProps {
    isActive: boolean;
}

export function PreviewTab({ isActive }: PreviewTabProps) {
    const { snapshot, labels } = useDocumentSnapshot();
    const { triggerVignette } = useVignetteAd();

    useEffect(() => {
        console.log(isActive);

        if (isActive) triggerVignette('preview_tab_open');
    }, [isActive, triggerVignette]);

    if (!snapshot || !labels) {
        return (
            <div className="flex h-full items-center justify-center text-muted-foreground">
                Complete document setup to preview.
            </div>
        );
    }

    const Template = TEMPLATE_MAP[snapshot.docType];

    return (
        <div className="h-full w-full bg-muted/30 p-4">
            <PDFViewer style={{ width: '100%', height: '100%' }} showToolbar={false}>
                <Template data={snapshot} labels={labels} />
            </PDFViewer>
        </div>
    );
}
