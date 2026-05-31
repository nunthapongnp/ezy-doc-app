'use client';

import { useEffect } from 'react';
import { useTranslate } from '@tolgee/react';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LogoUpload } from '@/components/view/editor/LogoUpload';
import { computeDocNumber } from '@/lib/docNumber';
import { useLayoutStore } from '@/stores/layoutStore';
import { useDocumentStore } from '@/stores/documentStore';
import { useVendorStore } from '@/stores/vendorStore';
import type { DocType } from '@/types/document';
import { InputDate } from '../../../forms/input-date';

interface DataTabProps {
    docType: DocType;
}

export function DataTab({ docType }: DataTabProps) {
    const { t } = useTranslate();
    const { layout } = useLayoutStore();
    const { doc, setField, setVendor, setCustomer, addItem, updateItem, removeItem, recalcTotals } =
        useDocumentStore();
    const { vendor, setVendor: setVendorProfile } = useVendorStore();

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
        doc.items,
        recalcTotals,
    ]);

    const docDate = doc.docDate ?? new Date();
    const computedDocNo = computeDocNumber(docType, docDate, layout.header.docSeqNumber);
    const isReceipt = docType === 'RECEIPT';

    return (
        <div className="mx-auto min-w-3xl max-w-3xl space-y-6 p-6 overflow-y-auto h-full">
            <LogoUpload />

            <div className="grid gap-4 sm:grid-cols-2">
                {layout.header.showDocNo && (
                    <div className="space-y-1">
                        <Label className="text-xs">{t('EDITOR.TAB.DATA.DOC_NO')}</Label>
                        <Input value={computedDocNo} readOnly className="bg-muted font-mono" />
                    </div>
                )}
                <div className="space-y-1">
                    <Label className="text-xs">{t('EDITOR.TAB.DATA.REF_NO')}</Label>
                    <Input
                        value={doc.refNo ?? ''}
                        onChange={(e) => setField('refNo', e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <InputDate
                        label={t('EDITOR.TAB.DATA.DOC_DATE')}
                        value={doc.docDate}
                        onChange={(date) => setField('docDate', date)}
                    />
                </div>
                {!isReceipt && (
                    <div className="space-y-1">
                        <InputDate
                            label={t('EDITOR.TAB.DATA.DUE_DATE')}
                            value={doc.dueDate}
                            onChange={(date) => setField('dueDate', date)}
                        />
                    </div>
                )}
            </div>

            <section className="space-y-3 border-t pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t('EDITOR.TAB.DATA.VENDOR')}
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                    <Input
                        placeholder={t('EDITOR.TAB.DATA.VENDOR_NAME')}
                        value={vendor.businessName}
                        onChange={(e) => {
                            setVendorProfile({ businessName: e.target.value });
                            setVendor({ name: e.target.value });
                        }}
                    />
                    <Input
                        placeholder={t('EDITOR.TAB.DATA.TAX_ID')}
                        value={vendor.taxId}
                        onChange={(e) => {
                            setVendorProfile({ taxId: e.target.value });
                            setVendor({ taxId: e.target.value });
                        }}
                    />
                    <Input
                        placeholder={t('EDITOR.TAB.DATA.ADDRESS_LINE_1')}
                        value={vendor.addressLine1}
                        onChange={(e) => {
                            setVendorProfile({ addressLine1: e.target.value });
                            setVendor({ addressLine1: e.target.value });
                        }}
                        className="sm:col-span-2"
                    />
                    <Input
                        placeholder={t('EDITOR.TAB.DATA.ADDRESS_LINE_2')}
                        value={vendor.addressLine2}
                        onChange={(e) => {
                            setVendorProfile({ addressLine2: e.target.value });
                            setVendor({ addressLine2: e.target.value });
                        }}
                        className="sm:col-span-2"
                    />
                    <Input
                        placeholder={t('EDITOR.TAB.DATA.EMAIL')}
                        value={vendor.email}
                        onChange={(e) => {
                            setVendorProfile({ email: e.target.value });
                            setVendor({ email: e.target.value });
                        }}
                    />
                    <Input
                        placeholder={t('EDITOR.TAB.DATA.PHONE')}
                        value={vendor.phone}
                        onChange={(e) => {
                            setVendorProfile({ phone: e.target.value });
                            setVendor({ phone: e.target.value });
                        }}
                    />
                </div>
            </section>

            <section className="space-y-3 border-t pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t('EDITOR.TAB.DATA.CUSTOMER')}
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                    <Input
                        placeholder={t('EDITOR.TAB.DATA.CUSTOMER_NAME')}
                        value={doc.customer?.name ?? ''}
                        onChange={(e) => setCustomer({ name: e.target.value })}
                        className="sm:col-span-2"
                    />
                    <Input
                        placeholder={t('EDITOR.TAB.DATA.ADDRESS_LINE_1')}
                        value={doc.customer?.addressLine1 ?? ''}
                        onChange={(e) => setCustomer({ addressLine1: e.target.value })}
                        className="sm:col-span-2"
                    />
                    <Input
                        placeholder={t('EDITOR.TAB.DATA.ADDRESS_LINE_2')}
                        value={doc.customer?.addressLine2 ?? ''}
                        onChange={(e) => setCustomer({ addressLine2: e.target.value })}
                        className="sm:col-span-2"
                    />
                    <Input
                        placeholder={t('EDITOR.TAB.DATA.EMAIL')}
                        value={doc.customer?.email ?? ''}
                        onChange={(e) => setCustomer({ email: e.target.value })}
                    />
                    <Input
                        placeholder={t('EDITOR.TAB.DATA.PHONE')}
                        value={doc.customer?.phone ?? ''}
                        onChange={(e) => setCustomer({ phone: e.target.value })}
                    />
                </div>
            </section>

            <section className="space-y-3 border-t pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t('EDITOR.TAB.DATA.ITEM_DESC')}
                </h3>
                {(doc.items ?? []).map((item) => (
                    <div key={item.id} className="space-y-2 rounded-lg border bg-muted/20 p-3">
                        <div className="flex gap-2">
                            <Input
                                placeholder={t('EDITOR.TAB.DATA.ITEM_NAME')}
                                value={item.name}
                                onChange={(e) => updateItem(item.id, { name: e.target.value })}
                                className="flex-1"
                            />
                            <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="rounded p-2 text-destructive hover:bg-destructive/10"
                                aria-label="Remove item"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                        <Input
                            placeholder={t('EDITOR.TAB.DATA.ITEM_DESC')}
                            value={item.desc ?? ''}
                            onChange={(e) => updateItem(item.id, { desc: e.target.value })}
                        />
                        <div className="grid grid-cols-4 gap-2">
                            <Input
                                placeholder={t('EDITOR.TAB.DATA.ITEM_UNIT')}
                                value={item.unit}
                                onChange={(e) => updateItem(item.id, { unit: e.target.value })}
                            />
                            <Input
                                type="number"
                                min={0}
                                placeholder={t('EDITOR.TAB.DATA.ITEM_QTY')}
                                value={item.qty || ''}
                                onChange={(e) =>
                                    updateItem(item.id, { qty: Number(e.target.value) })
                                }
                            />
                            <Input
                                type="number"
                                min={0}
                                placeholder={t('EDITOR.TAB.DATA.ITEM_UNIT_PRICE')}
                                value={item.unitPrice || ''}
                                onChange={(e) =>
                                    updateItem(item.id, { unitPrice: Number(e.target.value) })
                                }
                                className="col-span-2"
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addItem}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed py-2 text-sm hover:border-primary hover:bg-primary/5"
                >
                    <Plus className="size-4" /> {t('EDITOR.TAB.DATA.ADD_ITEM')}
                </button>
            </section>

            {isReceipt && (
                <div className="space-y-1 border-t pt-4">
                    <Label className="text-xs">{t('EDITOR.TAB.DATA.PAYMENT_METHOD')}</Label>
                    <Input
                        value={doc.paymentMethod ?? ''}
                        onChange={(e) => setField('paymentMethod', e.target.value)}
                    />
                </div>
            )}

            <div className="space-y-1 border-t pt-4">
                <Label className="text-xs">{t('EDITOR.TAB.DATA.REMARK')}</Label>
                <Textarea
                    value={doc.remark ?? ''}
                    onChange={(e) => setField('remark', e.target.value)}
                    rows={4}
                />
            </div>
        </div>
    );
}
