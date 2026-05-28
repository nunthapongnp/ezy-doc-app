import { Image, Text, View } from "@react-pdf/renderer";
import { pdfStyles as s } from "@/lib/pdf/PdfStyles";
import type { PdfLabels } from "@/types/pdfLabels";

interface PdfHeaderProps {
  title: string;
  docNo: string;
  showDocNo: boolean;
  refNo?: string;
  docDate: Date;
  expiryDate?: Date;
  dueDate?: Date;
  logoDataUrl?: string;
  labels: PdfLabels;
  showDueDate?: boolean;
  showExpiryDate?: boolean;
}

function formatDate(d: Date | undefined, locale: string): string {
  if (!d || Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PdfHeader({
  title,
  docNo,
  showDocNo,
  refNo,
  docDate,
  expiryDate,
  dueDate,
  logoDataUrl,
  labels,
  showDueDate = true,
  showExpiryDate = false,
}: PdfHeaderProps) {
  const locale = "en-US";

  return (
    <View style={[s.section, { flexDirection: "row", justifyContent: "space-between" }]}>
      <View style={{ flex: 1 }}>
        <Text style={s.title}>{title}</Text>
        {showDocNo && docNo ? (
          <View style={s.row}>
            <Text style={s.label}>{labels.docNo}</Text>
            <Text style={[s.value, { fontWeight: "bold" }]}>{docNo}</Text>
          </View>
        ) : null}
        {refNo ? (
          <View style={s.row}>
            <Text style={s.label}>{labels.refNo}</Text>
            <Text style={s.value}>{refNo}</Text>
          </View>
        ) : null}
        <View style={s.row}>
          <Text style={s.label}>{labels.date}</Text>
          <Text style={s.value}>{formatDate(docDate, locale)}</Text>
        </View>
        {showExpiryDate && expiryDate ? (
          <View style={s.row}>
            <Text style={s.label}>{labels.expiryDate}</Text>
            <Text style={s.value}>{formatDate(expiryDate, locale)}</Text>
          </View>
        ) : null}
        {showDueDate && dueDate ? (
          <View style={s.row}>
            <Text style={s.label}>{labels.dueDate}</Text>
            <Text style={s.value}>{formatDate(dueDate, locale)}</Text>
          </View>
        ) : null}
      </View>
      {logoDataUrl ? (
        <Image src={logoDataUrl} style={s.logo} />
      ) : null}
    </View>
  );
}
