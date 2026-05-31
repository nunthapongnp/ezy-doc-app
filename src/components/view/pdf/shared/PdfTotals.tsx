import { Text, View } from '@react-pdf/renderer';
import { formatCurrency } from '@/lib/calculations';
import { pdfStyles as s } from '@/lib/pdf/PdfStyles';
import type { PdfLabels } from '@/types/pdfLabels';

interface PdfTotalsProps {
    subTotalAmt: number;
    taxRate: number;
    taxAmt: number;
    totalAmt: number;
    whtRate: number;
    whtAmt: number;
    netTotalAmt: number;
    labels: PdfLabels;
    layout: {
        showTax?: boolean;
        showWht?: boolean;
    };
}

export function PdfTotals({
    subTotalAmt,
    taxRate,
    taxAmt,
    totalAmt,
    whtRate,
    whtAmt,
    netTotalAmt,
    labels,
    layout,
}: PdfTotalsProps) {
    const taxLabel = labels.taxAmt.replace('{taxRate}', String(taxRate));
    const whtLabel = labels.whtAmt.replace('{whtAmt}', String(whtRate));

    return (
        <View style={s.totalsBlock}>
            <View style={s.totalsRow}>
                <Text style={{ fontSize: 9, color: '#64748b' }}>{labels.subTotalAmt}</Text>
                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>
                    {formatCurrency(subTotalAmt)}
                </Text>
            </View>
            {layout.showTax ? (
                <View style={s.totalsRow}>
                    <Text style={{ fontSize: 9, color: '#64748b' }}>{taxLabel}</Text>
                    <Text style={{ fontSize: 9, fontWeight: 'bold' }}>
                        {formatCurrency(taxAmt)}
                    </Text>
                </View>
            ) : null}
            <View style={s.totalsRow}>
                <Text style={{ fontSize: 9, color: '#64748b' }}>{labels.totalAmt}</Text>
                <Text style={{ fontSize: 9, fontWeight: 'bold' }}>{formatCurrency(totalAmt)}</Text>
            </View>
            {layout.showWht ? (
                <View style={s.totalsRow}>
                    <Text style={{ fontSize: 9, color: '#64748b' }}>{whtLabel}</Text>
                    <Text style={{ fontSize: 9, fontWeight: 'bold' }}>
                        {formatCurrency(whtAmt)}
                    </Text>
                </View>
            ) : null}
            <View style={s.totalGrand}>
                <Text style={s.totalGrandText}>{labels.netTotalAmt}</Text>
                <Text style={s.totalGrandText}>{formatCurrency(netTotalAmt)}</Text>
            </View>
        </View>
    );
}
