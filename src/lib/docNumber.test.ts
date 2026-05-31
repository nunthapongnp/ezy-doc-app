import { describe, expect, it } from 'vitest';
import { computeDocNumber, getDocNoPrefix, sanitizeSeqNumber } from './docNumber';

describe('computeDocNumber', () => {
    it('formats PREFIX+YY+MM+XXXX', () => {
        const date = new Date(2026, 4, 15);
        expect(computeDocNumber('QUOTATION', date, '1')).toBe('QO26050001');
    });

    it('uses correct prefix per type', () => {
        const date = new Date(2026, 0, 1);
        expect(computeDocNumber('INVOICE', date, '42')).toBe('IV26010042');
        expect(computeDocNumber('ACCEPTANCE_CERT', date, '1')).toBe('AC26010001');
        expect(computeDocNumber('RECEIPT', date, '7')).toBe('RC26010007');
    });
});

describe('sanitizeSeqNumber', () => {
    it('pads to four digits', () => {
        expect(sanitizeSeqNumber('1')).toBe('0001');
        expect(sanitizeSeqNumber('12345')).toBe('1234');
        expect(sanitizeSeqNumber('ab12')).toBe('0012');
    });
});

describe('getDocNoPrefix', () => {
    it('returns prefix without sequence', () => {
        const date = new Date(2026, 4, 1);
        expect(getDocNoPrefix('QUOTATION', date)).toBe('QO2605');
    });
});
