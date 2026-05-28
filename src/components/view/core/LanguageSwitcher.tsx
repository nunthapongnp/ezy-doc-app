"use client";

import { LOCALES, type AppLocale } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LOCALE_LABELS: Record<AppLocale, string> = {
  en: "English",
  th: "ภาษาไทย",
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = (LOCALES.includes(segments[0] as AppLocale)
    ? segments[0]
    : "en") as AppLocale;

  const handleLanguageChange = (newLocale: string) => {
    const rest = LOCALES.includes(segments[0] as AppLocale)
      ? segments.slice(1)
      : segments;
    router.replace(`/${newLocale}/${rest.join("/")}`.replace(/\/$/, "") || `/${newLocale}`);
  };

  return (
    <Select value={currentLocale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((code) => (
          <SelectItem key={code} value={code}>
            {LOCALE_LABELS[code]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
