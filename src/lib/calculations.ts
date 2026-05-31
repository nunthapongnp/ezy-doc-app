import type { LineItem } from '@/types/document';

export function round2(n: number): number {
    return Math.round(n * 100) / 100;
}

export function calcLineTotal(qty: number, unitPrice: number): number {
    return round2(qty * unitPrice);
}

export function calcTotals(
    items: LineItem[],
    showTax: boolean,
    taxRate: number,
    showWht: boolean,
    whtRate: number,
) {
    const subTotalAmt = round2(items.reduce((sum, i) => sum + i.totalAmt, 0));
    const taxAmt = showTax ? round2(subTotalAmt * (taxRate / 100)) : 0;
    const totalAmt = round2(subTotalAmt + taxAmt);
    const whtAmt = showWht ? round2(totalAmt * (whtRate / 100)) : 0;
    const netTotalAmt = round2(totalAmt - whtAmt);
    return { subTotalAmt, taxAmt, totalAmt, whtAmt, netTotalAmt };
}

export function formatInt(value: number, locale = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatCurrency(value: number, locale = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}
