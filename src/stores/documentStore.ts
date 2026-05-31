import { create } from 'zustand';
import { calcLineTotal, calcTotals } from '@/lib/calculations';
import {
    createEmptyLineItem,
    EMPTY_PARTY,
    type DocType,
    type DocumentState,
    type LineItem,
    type PartyInfo,
} from '@/types/document';

type DocumentPatch = Partial<Omit<DocumentState, 'vendor' | 'customer' | 'items'>>;

interface DocumentStore {
    doc: Partial<DocumentState>;
    setDocType: (docType: DocType) => void;
    setVendor: (vendor: Partial<PartyInfo>) => void;
    setCustomer: (customer: Partial<PartyInfo>) => void;
    addItem: () => void;
    updateItem: (id: string, patch: Partial<LineItem>) => void;
    removeItem: (id: string) => void;
    setField: (key: keyof DocumentPatch, value: unknown) => void;
    recalcTotals: (showTax: boolean, taxRate: number, showWht: boolean, whtRate: number) => void;
    reset: () => void;
}

const defaultDocFields = (): Partial<DocumentState> => ({
    docDate: new Date(),
    vendor: { ...EMPTY_PARTY },
    customer: { ...EMPTY_PARTY },
    items: [createEmptyLineItem()],
    subTotalAmt: 0,
    taxAmt: 0,
    totalAmt: 0,
    whtAmt: 0,
    netTotalAmt: 0,
    remark: '',
});

export const useDocumentStore = create<DocumentStore>((set) => ({
    doc: defaultDocFields(),

    setDocType: (docType) => set((s) => ({ doc: { ...s.doc, docType } })),

    setVendor: (vendor) =>
        set((s) => ({
            doc: {
                ...s.doc,
                vendor: { ...EMPTY_PARTY, ...s.doc.vendor, ...vendor },
            },
        })),

    setCustomer: (customer) =>
        set((s) => ({
            doc: {
                ...s.doc,
                customer: { ...EMPTY_PARTY, ...s.doc.customer, ...customer },
            },
        })),

    setField: (key, value) => set((s) => ({ doc: { ...s.doc, [key]: value } })),

    addItem: () =>
        set((s) => ({
            doc: {
                ...s.doc,
                items: [...(s.doc.items ?? []), createEmptyLineItem()],
            },
        })),

    updateItem: (id, patch) =>
        set((s) => ({
            doc: {
                ...s.doc,
                items: (s.doc.items ?? []).map((item) => {
                    if (item.id !== id) return item;
                    const updated = { ...item, ...patch };
                    return {
                        ...updated,
                        totalAmt: calcLineTotal(updated.qty, updated.unitPrice),
                    };
                }),
            },
        })),

    removeItem: (id) =>
        set((s) => ({
            doc: {
                ...s.doc,
                items: (s.doc.items ?? []).filter((i) => i.id !== id),
            },
        })),

    recalcTotals: (showTax, taxRate, showWht, whtRate) =>
        set((s) => {
            const { subTotalAmt, taxAmt, totalAmt, whtAmt, netTotalAmt } = calcTotals(
                s.doc.items ?? [],
                showTax,
                taxRate,
                showWht,
                whtRate,
            );
            return { doc: { ...s.doc, subTotalAmt, taxAmt, totalAmt, whtAmt, netTotalAmt } };
        }),

    reset: () => set({ doc: defaultDocFields() }),
}));
