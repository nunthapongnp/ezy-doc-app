'use client';

import { useTranslate } from '@tolgee/react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { getDocNoPrefix, sanitizeSeqNumber } from '@/lib/docNumber';
import { useConfigStore } from '@/stores/configStore';
import { useDocumentStore } from '@/stores/documentStore';
import type { DocLanguage } from '@/types/config';

export function ConfigTab() {
    const { t } = useTranslate();
    const { config, setLanguage, setShowDocNo, setIncludeTax, setTaxRate, setSeqNumber } =
        useConfigStore();
    const docType = useDocumentStore((s) => s.doc.docType);
    const docDate = useDocumentStore((s) => s.doc.docDate) ?? new Date();

    const prefix = docType != null ? getDocNoPrefix(docType, docDate) : '----';

    return (
        <div className="mx-auto max-w-lg space-y-6 p-6 overflow-y-auto h-full">
            <div className="space-y-2">
                <Label>{t('CONFIG.DOC_LANGUAGE')}</Label>
                <Select
                    value={config.language}
                    onValueChange={(v) => setLanguage(v as DocLanguage)}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="th">ภาษาไทย</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">{t('CONFIG.DOC_LANGUAGE_HINT')}</p>
            </div>

            <div className="space-y-2">
                <Label>{t('CONFIG.DOC_NUMBER')}</Label>
                <div className="flex items-center gap-3">
                    <Checkbox
                        checked={config.showDocNo}
                        onCheckedChange={(v) => setShowDocNo(Boolean(v))}
                    />
                    <span className="text-sm">{t('CONFIG.SHOW_DOC_NUMBER')}</span>
                </div>
                {config.showDocNo && (
                    <div className="mt-2 flex items-center gap-2">
                        <span className="font-mono text-sm text-muted-foreground">{prefix}</span>
                        <Input
                            value={config.seqNumber}
                            onChange={(e) => setSeqNumber(sanitizeSeqNumber(e.target.value))}
                            className="w-24 font-mono"
                            placeholder="0001"
                            maxLength={4}
                        />
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label>{t('CONFIG.TAX_RATE_LABEL')}</Label>
                <div className="flex items-center gap-3">
                    <Checkbox
                        checked={config.includeTax}
                        onCheckedChange={(v) => setIncludeTax(Boolean(v))}
                    />
                    <span className="text-sm">{t('CONFIG.INCLUDE_TAX')}</span>
                </div>
                {config.includeTax && (
                    <div className="mt-2 flex items-center gap-2">
                        <Input
                            type="number"
                            min={0}
                            max={100}
                            step={0.01}
                            value={config.taxRate}
                            onChange={(e) => setTaxRate(Number(e.target.value))}
                            className="w-24"
                        />
                        <span className="text-sm">%</span>
                    </div>
                )}
            </div>
        </div>
    );
}
