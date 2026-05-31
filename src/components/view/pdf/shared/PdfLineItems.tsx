import { Text, View } from '@react-pdf/renderer';
import { formatCurrency, formatInt } from '@/lib/calculations';
import { pdfStyles as s } from '@/lib/pdf/PdfStyles';
import type { LineItem } from '@/types/document';
import type { PdfLabels } from '@/types/pdfLabels';

interface PdfLineItemsProps {
    items: LineItem[];
    labels: PdfLabels;
    layout: {
        showSeq?: boolean;
        showDesc?: boolean;
        showUnit?: boolean;
        showUnitPrice?: boolean;
    };
}

export function PdfLineItems({ items, labels, layout }: PdfLineItemsProps) {
    return (
        <View style={s.section}>
            <View style={s.tableHeader}>
                {layout.showSeq && (
                    <Text style={[s.colSeq, s.tableHeaderText]}>{labels.itemSeq}</Text>
                )}
                <Text style={[s.colDesc, s.tableHeaderText]}>{labels.itemDesc}</Text>
                {layout.showUnit && (
                    <Text style={[s.colUnit, s.tableHeaderText]}>{labels.itemUnit}</Text>
                )}
                <Text style={[s.colQty, s.tableHeaderText]}>{labels.itemQty}</Text>
                {layout.showUnitPrice && (
                    <Text style={[s.colPrice, s.tableHeaderText]}>{labels.itemUnitPrice}</Text>
                )}
                <Text style={[s.colAmount, s.tableHeaderText]}>{labels.itemTotalAmt}</Text>
            </View>
            {items.map((item, index) => (
                <View key={item.id} style={s.tableRow}>
                    {layout.showSeq && <Text style={[s.colSeq, { fontSize: 9 }]}>{index + 1}</Text>}
                    <View style={s.colDesc}>
                        <Text style={{ fontWeight: 'bold', fontSize: 9 }}>{item.name}</Text>
                        {layout.showDesc && item.desc ? (
                            <Text style={{ fontSize: 8, color: '#64748b', marginTop: 2 }}>
                                {item.desc}
                            </Text>
                        ) : null}
                    </View>
                    {layout.showUnit && (
                        <Text style={[s.colUnit, { fontSize: 9 }]}>{item.unit}</Text>
                    )}
                    <Text style={[s.colQty, { fontSize: 9 }]}>{formatInt(item.qty)}</Text>
                    {layout.showUnitPrice && (
                        <Text style={[s.colPrice, { fontSize: 9 }]}>
                            {formatCurrency(item.unitPrice)}
                        </Text>
                    )}
                    <Text style={[s.colAmount, { fontSize: 9, fontWeight: 'bold' }]}>
                        {formatCurrency(item.totalAmt)}
                    </Text>
                </View>
            ))}
        </View>
    );
}
