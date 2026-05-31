'use client';

import { useEffect, useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { Download, RotateCcw } from 'lucide-react';
import { BannerAd } from '@/components/view/ads/BannerAd';
import { SidebarAd } from '@/components/view/ads/SidebarAd';
import { AdFreeTeaser } from '@/components/view/layout/AdFreeTeaser';
import { SessionWarningBanner } from '@/components/view/layout/SessionWarningBanner';
import { Button } from '@/components/ui/button';
import { routeToDocType, type DocumentRoute } from '@/lib/constants';
import { resetAllStores } from '@/stores';
import { useLayoutStore } from '@/stores/layoutStore';
import { useDocumentStore } from '@/stores/documentStore';
import { usePDFDownload } from '@/hooks/usePDFDownload';
import { LayoutTab } from './tabs/LayoutTab';
import { DataTab } from './tabs/DataTab';
import { PreviewTab } from './tabs/PreviewTab';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type EditorTab = 'layout' | 'data' | 'preview';

interface DocumentEditorProps {
    route: DocumentRoute;
}

const ClearFormAlert = ({ t, open, onOpenChange, clear }) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t('EDITOR.CLEAR_FORM.ALERT.TITLE')}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t('EDITOR.CLEAR_FORM.ALERT.DESC')}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => clear(false)}>
                        {t('ALL.CANCEL')}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => clear(true)}>
                        {t('ALL.CONTINUE')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export function DocumentEditor({ route }: DocumentEditorProps) {
    const { t } = useTranslate();
    const docType = routeToDocType(route);
    const setDocType = useDocumentStore((s) => s.setDocType);
    const { layout } = useLayoutStore();
    const recalcTotals = useDocumentStore((s) => s.recalcTotals);
    const { download, canDownload } = usePDFDownload();
    const [claerFormAlertIsOpen, setClaerFormAlertIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setDocType(docType);
        return () => resetAllStores();
    }, [docType, setDocType]);

    useEffect(() => {
        recalcTotals(
            layout.footer.showTax,
            layout.footer.taxRate,
            layout.footer.showWht,
            layout.footer.whtRate,
        );
    }, [
        layout.footer.showTax,
        layout.footer.taxRate,
        layout.footer.showWht,
        layout.footer.whtRate,
        recalcTotals,
    ]);

    const tabs: { id: EditorTab; label: string }[] = [
        { id: 'layout', label: t('EDITOR.TAB.LAYOUT.TITLE') },
        { id: 'data', label: t('EDITOR.TAB.DATA.TITLE') },
        { id: 'preview', label: t('EDITOR.TAB.PREVIEW.TITLE') },
    ];

    const handleClear = (confirm = false) => {
        setClaerFormAlertIsOpen(false);
        if (confirm) {
            resetAllStores();
            setDocType(docType);
        }
    };

    return (
        <>
            <div className="flex h-[calc(100vh-4rem)] flex-col">
                <SessionWarningBanner />
                <BannerAd />
                <div className="flex min-h-0 flex-1 overflow-hidden">
                    {/* <SidebarAd /> */}
                    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                        <Tabs defaultValue="layout" className="h-full overflow-scroll">
                            <TabsList
                                variant="line"
                                className="mt-2 w-full justify-between border-b-2"
                            >
                                {tabs.map((tab) => (
                                    <TabsTrigger value={tab.id} key={tab.id}>
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <TabsContent value="layout" className="">
                                <LayoutTab />
                            </TabsContent>
                            <TabsContent value="data">
                                <DataTab docType={docType} />
                            </TabsContent>
                            <TabsContent value="preview">
                                <PreviewTab isActive />
                            </TabsContent>
                        </Tabs>
                        <div className="flex justify-end items-center gap-3 border-t bg-card p-4">
                            <Button
                                variant="outline"
                                className="gap-2"
                                onClick={() => setClaerFormAlertIsOpen(true)}
                            >
                                <RotateCcw className="size-4" />
                                {t('EDITOR.CLEAR_FORM')}
                            </Button>
                            <Button
                                className="gap-2"
                                onClick={() => void download()}
                                disabled={!canDownload}
                            >
                                <Download className="size-4" />
                                {t('EDITOR.EXPORT_PDF')}
                            </Button>
                        </div>
                        {/* <AdFreeTeaser /> */}
                    </div>
                    {/* <SidebarAd /> */}
                </div>
            </div>
            <ClearFormAlert
                t={t}
                open={claerFormAlertIsOpen}
                onOpenChange={setClaerFormAlertIsOpen}
                clear={handleClear}
            />
        </>
    );
}
