import { create } from 'zustand';
import { DEFAULT_LAYOUT, type DocLanguage, type DocumentLayout } from '@/types/layout';

interface LayoutStore {
    layout: DocumentLayout;
    setLanguage: (language: DocLanguage) => void;
    header: {
        setShowDocNo: (showDocNo: boolean) => void;
        setDocSeqNumber: (docSeqNumber: string) => void;
        setShowRefNo: (showRefNo: boolean) => void;
        setShowDocDate: (showDocDate: boolean) => void;
        setShowDueDate: (showDueDate: boolean) => void;
    };
    items: {
        setShowSeq: (showSeq: boolean) => void;
        setShowDesc: (showDesc: boolean) => void;
        setShowUnit: (showUnit: boolean) => void;
        setShowUnitPrice: (showUnitPrice: boolean) => void;
    };
    footer: {
        setShowTax: (showTax: boolean) => void;
        setTaxRate: (taxRate: number) => void;
        setShowWht: (showWht: boolean) => void;
        setWhtRate: (whtRate: number) => void;
    };
    setShowRemark: (showRemark: boolean) => void;
    setShowPaymentMethod: (showPaymentMethod: boolean) => void;
    reset: () => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
    layout: { ...DEFAULT_LAYOUT },
    setLanguage: (language) => set((s) => ({ layout: { ...s.layout, language } })),
    header: {
        setShowDocNo: (showDocNo: boolean) =>
            set((s) => ({ layout: { ...s.layout, header: { ...s.layout.header, showDocNo } } })),
        setDocSeqNumber: (docSeqNumber) =>
            set((s) => ({ layout: { ...s.layout, header: { ...s.layout.header, docSeqNumber } } })),
        setShowDocDate: (showDocDate) =>
            set((s) => ({ layout: { ...s.layout, header: { ...s.layout.header, showDocDate } } })),
        setShowRefNo: (showRefNo: boolean) =>
            set((s) => ({ layout: { ...s.layout, header: { ...s.layout.header, showRefNo } } })),
        setShowDueDate: (showDueDate: boolean) =>
            set((s) => ({ layout: { ...s.layout, header: { ...s.layout.header, showDueDate } } })),
    },
    items: {
        setShowSeq: (showSeq: boolean) =>
            set((s) => ({ layout: { ...s.layout, items: { ...s.layout.items, showSeq } } })),
        setShowDesc: (showDesc: boolean) =>
            set((s) => ({ layout: { ...s.layout, items: { ...s.layout.items, showDesc } } })),
        setShowUnit: (showUnit: boolean) =>
            set((s) => ({ layout: { ...s.layout, items: { ...s.layout.items, showUnit } } })),
        setShowUnitPrice: (showUnitPrice: boolean) =>
            set((s) => ({ layout: { ...s.layout, items: { ...s.layout.items, showUnitPrice } } })),
    },
    footer: {
        setShowTax: (showTax: boolean) =>
            set((s) => ({ layout: { ...s.layout, footer: { ...s.layout.footer, showTax } } })),
        setTaxRate: (taxRate: number) =>
            set((s) => ({ layout: { ...s.layout, footer: { ...s.layout.footer, taxRate } } })),
        setShowWht: (showWht: boolean) =>
            set((s) => ({ layout: { ...s.layout, footer: { ...s.layout.footer, showWht } } })),
        setWhtRate: (whtRate: number) =>
            set((s) => ({ layout: { ...s.layout, footer: { ...s.layout.footer, whtRate } } })),
    },
    setShowRemark: (showRemark) => set((s) => ({ layout: { ...s.layout, showRemark } })),
    setShowPaymentMethod: (showPaymentMethod) =>
        set((s) => ({ layout: { ...s.layout, showPaymentMethod } })),
    reset: () => set({ layout: { ...DEFAULT_LAYOUT } }),
}));
