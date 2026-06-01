'use client';

import { LOCALE_LABELS, LOCALES, type AppLocale } from '@/lib/constants';
import { usePathname, useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown } from 'lucide-react';

export function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();

    const segments = pathname.split('/').filter(Boolean);
    const currentLocale = (
        LOCALES.includes(segments[0] as AppLocale) ? segments[0] : 'en'
    ) as AppLocale;

    const handleLanguageChange = (newLocale: string) => {
        const rest = LOCALES.includes(segments[0] as AppLocale) ? segments.slice(1) : segments;
        router.replace(`/${newLocale}/${rest.join('/')}`.replace(/\/$/, '') || `/${newLocale}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-40 justify-between gap-2 px-3 font-normal">
                    <span className="flex items-center gap-2">
                        <Globe className="size-4 text-muted-foreground" />
                        {LOCALE_LABELS[currentLocale]}
                    </span>
                    <ChevronDown className="size-4 opacity-50 shrink-0" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuRadioGroup value={currentLocale} onValueChange={handleLanguageChange}>
                    {LOCALES.map((code) => (
                        <DropdownMenuRadioItem key={code} value={code}>
                            {LOCALE_LABELS[code]}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
