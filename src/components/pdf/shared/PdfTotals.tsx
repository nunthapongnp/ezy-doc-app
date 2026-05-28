import { Text, View } from "@react-pdf/renderer";
import { formatCurrency } from "@/lib/calculations";
import { pdfStyles as s } from "@/lib/pdf/PdfStyles";
import type { PdfLabels } from "@/types/pdfLabels";

interface PdfTotalsProps {
  subTotal: number;
  taxAmount: number;
  total: number;
  includeTax: boolean;
  taxRate: number;
  labels: PdfLabels;
}

export function PdfTotals({
  subTotal,
  taxAmount,
  total,
  includeTax,
  taxRate,
  labels,
}: PdfTotalsProps) {
  const taxLabel = labels.tax.replace("{rate}", String(taxRate));

  return (
    <View style={s.totalsBlock}>
      <View style={s.totalsRow}>
        <Text style={{ fontSize: 9, color: "#64748b" }}>{labels.subTotal}</Text>
        <Text style={{ fontSize: 9, fontWeight: "bold" }}>
          {formatCurrency(subTotal)}
        </Text>
      </View>
      {includeTax ? (
        <View style={s.totalsRow}>
          <Text style={{ fontSize: 9, color: "#64748b" }}>{taxLabel}</Text>
          <Text style={{ fontSize: 9, fontWeight: "bold" }}>
            {formatCurrency(taxAmount)}
          </Text>
        </View>
      ) : null}
      <View style={s.totalGrand}>
        <Text style={s.totalGrandText}>{labels.total}</Text>
        <Text style={s.totalGrandText}>{formatCurrency(total)}</Text>
      </View>
    </View>
  );
}
