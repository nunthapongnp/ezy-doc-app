"use client";

import { TolgeeProvider } from "@tolgee/react";
import { useEffect, useMemo } from "react";
import { TolgeeBase } from "./shared";
import type { AppLocale } from "@/lib/constants";

type Props = {
  locale: AppLocale;
  children: React.ReactNode;
};

export function TolgeeAppProvider({ locale, children }: Props) {
  const tolgee = useMemo(
    () =>
      TolgeeBase().init({
        language: locale,
      }),
    [locale],
  );

  useEffect(() => {
    void tolgee.changeLanguage(locale);
  }, [locale, tolgee]);

  return (
    <TolgeeProvider tolgee={tolgee} fallback={null}>
      {children}
    </TolgeeProvider>
  );
}
