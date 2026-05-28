"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslate } from "@tolgee/react";

export function SessionWarningBanner() {
  const { t } = useTranslate();

  return (
    <div
      role="status"
      className="flex items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
    >
      <AlertTriangle className="size-4 shrink-0" aria-hidden />
      <span>{t("WARNING.SESSION_ONLY")}</span>
    </div>
  );
}
