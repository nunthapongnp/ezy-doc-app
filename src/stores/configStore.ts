import { create } from 'zustand';
import { DEFAULT_CONFIG, type DocLanguage, type DocumentConfig } from '@/types/config';

interface ConfigStore {
    config: DocumentConfig;
    setLanguage: (lang: DocLanguage) => void;
    setShowDocNo: (v: boolean) => void;
    setIncludeTax: (v: boolean) => void;
    setTaxRate: (rate: number) => void;
    setSeqNumber: (seq: string) => void;
    reset: () => void;
}

export const useConfigStore = create<ConfigStore>((set) => ({
    config: { ...DEFAULT_CONFIG },
    setLanguage: (language) => set((s) => ({ config: { ...s.config, language } })),
    setShowDocNo: (showDocNo) => set((s) => ({ config: { ...s.config, showDocNo } })),
    setIncludeTax: (includeTax) => set((s) => ({ config: { ...s.config, includeTax } })),
    setTaxRate: (taxRate) => set((s) => ({ config: { ...s.config, taxRate } })),
    setSeqNumber: (seqNumber) => set((s) => ({ config: { ...s.config, seqNumber } })),
    reset: () => set({ config: { ...DEFAULT_CONFIG } }),
}));
