import { DevTools, Tolgee } from "@tolgee/web";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/constants";
import { TOLGEE_API_KEY, TOLGEE_API_URL, USE_TOLGEE_CLOUD } from "./config";

const staticDataFallback = {
  en: () => import("@/i18n/en.json"),
  th: () => import("@/i18n/th.json"),
};

export function TolgeeBase() {
  const tolgee = Tolgee();

  if (process.env.NODE_ENV === "development") {
    tolgee.use(DevTools());
  }

  return tolgee.updateDefaults({
    apiKey: TOLGEE_API_KEY,
    apiUrl: TOLGEE_API_URL,
    defaultLanguage: DEFAULT_LOCALE,
    fallbackLanguage: DEFAULT_LOCALE,
    availableLanguages: [...LOCALES],
    // Online: fetch from Tolgee Cloud. Offline: use bundled JSON.
    ...(USE_TOLGEE_CLOUD ? {} : { staticData: staticDataFallback }),
  });
}
