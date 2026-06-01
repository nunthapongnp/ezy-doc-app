'use client';

import { useTranslate } from '@tolgee/react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { getDocNoPrefix } from '@/lib/docNumber';
import { useLayoutStore } from '@/stores/layoutStore';
import { useDocumentStore } from '@/stores/documentStore';
import type { DocLanguage } from '@/types/layout';
import { Separator } from '@/components/ui/separator';
import { LOCALE_LABELS, LOCALES } from '@/lib/constants';

export function LayoutTab() {
    const { t } = useTranslate();
    const layoutStore = useLayoutStore();
    const { layout } = layoutStore;

    const docType = useDocumentStore((s) => s.doc.docType);
    const docDate = useDocumentStore((s) => s.doc.docDate) ?? new Date();

    const prefix = docType != null ? getDocNoPrefix(docType, docDate) : '----';

    return (
        <div className="mx-auto min-w-xl max-w-xl space-y-6 p-6 overflow-y-auto h-full bg-card">
            <Label>{t('EDITOR.TAB.LAYOUT.DOC_LANGUAGE')}</Label>
            <div className="grid gap-4 sm:grid-cols-1">
                <div className="space-y-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-between gap-2 font-normal"
                            >
                                <span>{LOCALE_LABELS[layout.language]}</span>
                                <ChevronDown className="size-4 opacity-50 shrink-0" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full min-w-(--radix-dropdown-menu-trigger-width)">
                            <DropdownMenuRadioGroup
                                value={layout.language}
                                onValueChange={(v) => layoutStore.setLanguage(v as DocLanguage)}
                            >
                                {LOCALES.map((code) => (
                                    <DropdownMenuRadioItem key={code} value={code}>
                                        {LOCALE_LABELS[code]}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Separator />
            <Label>{t('EDITOR.TAB.LAYOUT.DOC_INFO.TITLE')}</Label>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1 flex items-center">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={layout.header.showDocNo}
                            onCheckedChange={(v) => layoutStore.header.setShowDocNo(Boolean(v))}
                        />
                        <span className="text-sm">
                            {t('EDITOR.TAB.LAYOUT.DOC_INFO.SHOW.DOC_NO')}
                        </span>
                    </div>
                </div>
                {layout.header.showDocNo && (
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-muted-foreground">
                                {prefix}
                            </span>
                            <Input
                                value={layout.header.docSeqNumber}
                                onChange={(e) => layoutStore.header.setDocSeqNumber(e.target.value)}
                                className="w-24 font-mono"
                                placeholder="0001"
                                maxLength={4}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="grid gap-4 sm:grid-cols-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={layout.header.showRefNo}
                            onCheckedChange={(v) => layoutStore.header.setShowRefNo(Boolean(v))}
                        />
                        <span className="text-sm">
                            {t('EDITOR.TAB.LAYOUT.DOC_INFO.SHOW.REF_NO')}
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={layout.header.showDocDate}
                            onCheckedChange={(v) => layoutStore.header.setShowDocDate(Boolean(v))}
                        />
                        <span className="text-sm">
                            {t('EDITOR.TAB.LAYOUT.DOC_INFO.SHOW.DOC_DATE')}
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={layout.header.showDueDate}
                            onCheckedChange={(v) => layoutStore.header.setShowDueDate(Boolean(v))}
                        />
                        <span className="text-sm">
                            {t('EDITOR.TAB.LAYOUT.DOC_INFO.SHOW.DOC_DUE_DATE')}
                        </span>
                    </div>
                </div>
            </div>
            <Separator />
            <Label>{t('EDITOR.TAB.LAYOUT.ITEM_DESC.TITLE')}</Label>
            <div className="grid gap-4 sm:grid-cols-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={layout.items.showSeq}
                            onCheckedChange={(v) => layoutStore.items.setShowSeq(Boolean(v))}
                        />
                        <span className="text-sm">
                            {t('EDITOR.TAB.LAYOUT.ITEM_DESC.SHOW.ITEM_SEQ')}
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={layout.items.showDesc}
                            onCheckedChange={(v) => layoutStore.items.setShowDesc(Boolean(v))}
                        />
                        <span className="text-sm">
                            {t('EDITOR.TAB.LAYOUT.ITEM_DESC.SHOW.ITEM_DESC')}
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={layout.items.showUnit}
                            onCheckedChange={(v) => layoutStore.items.setShowUnit(Boolean(v))}
                        />
                        <span className="text-sm">
                            {t('EDITOR.TAB.LAYOUT.ITEM_DESC.SHOW.ITEM_UNIT')}
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={layout.items.showUnitPrice}
                            onCheckedChange={(v) => layoutStore.items.setShowUnitPrice(Boolean(v))}
                        />
                        <span className="text-sm">
                            {t('EDITOR.TAB.LAYOUT.ITEM_DESC.SHOW.ITEM_UNIT_PRICE')}
                        </span>
                    </div>
                </div>
            </div>
            <Separator />
            <Label>{t('EDITOR.TAB.LAYOUT.CALCULATION.TITLE')}</Label>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1 flex items-center">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={layout.footer.showTax}
                            onCheckedChange={(v) => layoutStore.footer.setShowTax(Boolean(v))}
                        />
                        <span className="text-sm">
                            {t('EDITOR.TAB.LAYOUT.CALCULATION.SHOW.TAX')}
                        </span>
                    </div>
                </div>
                {layout.footer.showTax && (
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                min={0}
                                max={100}
                                step={0.01}
                                value={layout.footer.taxRate}
                                onChange={(e) =>
                                    layoutStore.footer.setTaxRate(Number(e.target.value))
                                }
                                className="w-24"
                            />
                            <span>%</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1 flex items-center">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={layout.footer.showWht}
                            onCheckedChange={(v) => layoutStore.footer.setShowWht(Boolean(v))}
                        />
                        <span className="text-sm">
                            {t('EDITOR.TAB.LAYOUT.CALCULATION.SHOW.WHT')}
                        </span>
                    </div>
                </div>
                {layout.footer.showWht && (
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                min={0}
                                max={100}
                                step={0.01}
                                value={layout.footer.whtRate}
                                onChange={(e) =>
                                    layoutStore.footer.setWhtRate(Number(e.target.value))
                                }
                                className="w-24"
                            />
                            <span>%</span>
                        </div>
                    </div>
                )}
            </div>
            <Separator />
            <Label>{t('EDITOR.TAB.LAYOUT.DOC_FOOTER.TITLE')}</Label>
            <div className="grid gap-4 sm:grid-cols-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={layout.showRemark}
                            onCheckedChange={(v) => layoutStore.setShowRemark(Boolean(v))}
                        />
                        <span className="text-sm">
                            {t('EDITOR.TAB.LAYOUT.DOC_FOOTER.SHOW.REMARK')}
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={layout.showPaymentMethod}
                            onCheckedChange={(v) => layoutStore.setShowPaymentMethod(Boolean(v))}
                        />
                        <span className="text-sm">
                            {t('EDITOR.TAB.LAYOUT.DOC_FOOTER.SHOW.PAYMENT_METHOD')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
