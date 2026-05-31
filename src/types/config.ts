export type DocLanguage = 'en' | 'th';

export interface DocumentConfig {
    language: DocLanguage;
    showDocNo: boolean;
    includeTax: boolean;
    taxRate: number;
    seqNumber: string;
}

export const DEFAULT_CONFIG: DocumentConfig = {
    language: 'en',
    showDocNo: true,
    includeTax: false,
    taxRate: 7,
    seqNumber: '0001',
};
