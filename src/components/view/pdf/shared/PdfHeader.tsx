import { Image, Text, View } from '@react-pdf/renderer';
import { pdfStyles as s } from '@/lib/pdf/PdfStyles';
import type { PdfLabels } from '@/types/pdfLabels';
import { format } from 'date-fns';

interface PdfHeaderProps {
    title: string;
    docNo: string;
    refNo?: string;
    docDate: Date;
    dueDate?: Date;
    logoDataUrl?: string;
    labels: PdfLabels;
    layout: {
        showDocNo?: boolean;
        showRefNo?: boolean;
        showDocDate?: boolean;
        showDueDate?: boolean;
    };
}

function formatDate(d: Date | undefined): string {
    if (!d || Number.isNaN(d.getTime())) return '';
    return format(d, 'dd/MM/yyyy');
}

export function PdfHeader({
    title,
    docNo,
    refNo,
    docDate,
    dueDate,
    logoDataUrl,
    labels,
    layout,
}: PdfHeaderProps) {
    return (
        <View style={[s.section, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <View style={{ flex: 1 }}>
                <Text style={s.title}>{title}</Text>
                {layout.showDocNo && docNo ? (
                    <View style={s.row}>
                        <Text style={s.label}>{labels.docNo}</Text>
                        <Text style={[s.value, { fontWeight: 'bold' }]}>{docNo}</Text>
                    </View>
                ) : null}
                {layout.showRefNo && refNo ? (
                    <View style={s.row}>
                        <Text style={s.label}>{labels.refNo}</Text>
                        <Text style={s.value}>{refNo}</Text>
                    </View>
                ) : null}
                {layout.showDocDate && docDate ? (
                    <View style={s.row}>
                        <Text style={s.label}>{labels.date}</Text>
                        <Text style={s.value}>{formatDate(docDate)}</Text>
                    </View>
                ) : null}
                {layout.showDueDate && dueDate ? (
                    <View style={s.row}>
                        <Text style={s.label}>{labels.dueDate}</Text>
                        <Text style={s.value}>{formatDate(dueDate)}</Text>
                    </View>
                ) : null}
            </View>
            {logoDataUrl ? <Image src={logoDataUrl} style={s.logo} /> : <></>}
        </View>
    );
}
