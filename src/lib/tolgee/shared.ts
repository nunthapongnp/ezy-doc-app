import { DevTools, Tolgee } from "@tolgee/web";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/constants";

export function TolgeeBase() {
  const tolgee = Tolgee();

  if (process.env.NODE_ENV === "development") {
    tolgee.use(DevTools());
  }

  return tolgee.updateDefaults({
    defaultLanguage: DEFAULT_LOCALE,
    fallbackLanguage: DEFAULT_LOCALE,
    availableLanguages: [...LOCALES],
    apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
    apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
    // staticData: {
    //   en: () => import("@/i18n/en.json"),
    //   th: () => import("@/i18n/th.json"),
    // },
  });
}
