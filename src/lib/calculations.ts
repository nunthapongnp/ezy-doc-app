import type { LineItem } from '@/types/document';

export function round2(n: number): number {
    return Math.round(n * 100) / 100;
}

export function calcLineTotal(qty: number, unitPrice: number): number {
    return round2(qty * unitPrice);
}

export function calcTotals(items: LineItem[], includeTax: boolean, taxRate: number) {
    const subTotal = round2(items.reduce((sum, i) => sum + i.total, 0));
    const taxAmount = includeTax ? round2(subTotal * (taxRate / 100)) : 0;
    const total = round2(subTotal + taxAmount);
    return { subTotal, taxAmount, total };
}

export function formatCurrency(value: number, locale = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}
