"use client";

import { useEffect, useState } from "react";
import { useTranslate } from "@tolgee/react";
import { Download, RotateCcw } from "lucide-react";
import { BannerAd } from "@/components/ads/BannerAd";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { AdFreeTeaser } from "@/components/layout/AdFreeTeaser";
import { SessionWarningBanner } from "@/components/layout/SessionWarningBanner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { routeToDocType, type DocumentRoute } from "@/lib/constants";
import { resetAllStores } from "@/stores";
import { useConfigStore } from "@/stores/configStore";
import { useDocumentStore } from "@/stores/documentStore";
import { usePDFDownload } from "@/hooks/usePDFDownload";
import { ConfigTab } from "./tabs/ConfigTab";
import { EditTab } from "./tabs/EditTab";
import { PreviewTab } from "./tabs/PreviewTab";

type EditorTab = "config" | "edit" | "preview";

interface DocumentEditorProps {
  route: DocumentRoute;
}

export function DocumentEditor({ route }: DocumentEditorProps) {
  const { t } = useTranslate();
  const [activeTab, setActiveTab] = useState<EditorTab>("config");
  const docType = routeToDocType(route);
  const setDocType = useDocumentStore((s) => s.setDocType);
  const { config } = useConfigStore();
  const recalcTotals = useDocumentStore((s) => s.recalcTotals);
  const { download, canDownload } = usePDFDownload();

  useEffect(() => {
    setDocType(docType);
    return () => resetAllStores();
  }, [docType, setDocType]);

  useEffect(() => {
    recalcTotals(config.includeTax, config.taxRate);
  }, [config.includeTax, config.taxRate, recalcTotals]);

  const tabs: { id: EditorTab; label: string }[] = [
    { id: "config", label: t("EDITOR.TAB_CONFIG") },
    { id: "edit", label: t("EDITOR.TAB_EDIT") },
    { id: "preview", label: t("EDITOR.TAB_PREVIEW") },
  ];

  const handleClear = () => {
    if (confirm("Clear all fields and reset this document?")) {
      resetAllStores();
      setDocType(docType);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <SessionWarningBanner />
      <BannerAd />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden">
          <div
            className="flex border-b bg-card"
            role="tablist"
            aria-label="Document editor"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={cn(
                  "flex-1 px-4 py-3 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-hidden" role="tabpanel">
            {activeTab === "edit" && <EditTab docType={docType} />}
            {activeTab === "config" && <ConfigTab />}
            {activeTab === "preview" && (
              <PreviewTab isActive={activeTab === "preview"} />
            )}
          </div>

          <div className="flex items-center gap-3 border-t bg-card p-4">
            <Button
              className="gap-2"
              onClick={() => void download()}
              disabled={!canDownload}
            >
              <Download className="size-4" />
              {t("EDITOR.EXPORT_PDF")}
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleClear}>
              <RotateCcw className="size-4" />
              {t("EDITOR.CLEAR_FORM")}
            </Button>
          </div>
          <AdFreeTeaser />
        </div>
        <SidebarAd />
      </div>
    </div>
  );
}
