import { Text, View } from "@react-pdf/renderer";
import { formatCurrency } from "@/lib/calculations";
import { pdfStyles as s } from "@/lib/pdf/PdfStyles";
import type { LineItem } from "@/types/document";
import type { PdfLabels } from "@/types/pdfLabels";

interface PdfLineItemsProps {
  items: LineItem[];
  labels: PdfLabels;
}

export function PdfLineItems({ items, labels }: PdfLineItemsProps) {
  return (
    <View style={s.section}>
      <View style={s.tableHeader}>
        <Text style={[s.colDesc, s.tableHeaderText]}>{labels.description}</Text>
        <Text style={[s.colUnit, s.tableHeaderText]}>{labels.unit}</Text>
        <Text style={[s.colQty, s.tableHeaderText]}>{labels.qty}</Text>
        <Text style={[s.colPrice, s.tableHeaderText]}>{labels.unitPrice}</Text>
        <Text style={[s.colAmount, s.tableHeaderText]}>{labels.amount}</Text>
      </View>
      {items.map((item) => (
        <View key={item.id} style={s.tableRow}>
          <View style={s.colDesc}>
            <Text style={{ fontWeight: "bold", fontSize: 9 }}>{item.name}</Text>
            {item.desc ? (
              <Text style={{ fontSize: 8, color: "#64748b", marginTop: 2 }}>
                {item.desc}
              </Text>
            ) : null}
          </View>
          <Text style={[s.colUnit, { fontSize: 9 }]}>{item.unit}</Text>
          <Text style={[s.colQty, { fontSize: 9 }]}>{item.qty}</Text>
          <Text style={[s.colPrice, { fontSize: 9 }]}>
            {formatCurrency(item.unitPrice)}
          </Text>
          <Text style={[s.colAmount, { fontSize: 9, fontWeight: "bold" }]}>
            {formatCurrency(item.total)}
          </Text>
        </View>
      ))}
    </View>
  );
}
