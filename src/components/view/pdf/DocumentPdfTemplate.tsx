import { Document, Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles as s } from '@/lib/pdf/PdfStyles';
import { PdfHeader } from './shared/PdfHeader';
import { PdfParties } from './shared/PdfParties';
import { PdfLineItems } from './shared/PdfLineItems';
import { PdfTotals } from './shared/PdfTotals';
import type { DocumentState } from '@/types/document';
import type { PdfLabels } from '@/types/pdfLabels';

export interface DocumentPdfTemplateProps {
    data: DocumentState;
    labels: PdfLabels;
}

export function DocumentPdfTemplate({ data, labels }: DocumentPdfTemplateProps) {
    const isQuotation = data.docType === 'QUOTATION';
    const isReceipt = data.docType === 'RECEIPT';

    return (
        <Document>
            <Page size="A4" style={s.page}>
                <PdfHeader
                    title={labels.title}
                    docNo={data.docNo}
                    showDocNo={data.showDocNo}
                    refNo={data.refNo}
                    docDate={data.docDate}
                    expiryDate={data.expiryDate}
                    dueDate={data.dueDate}
                    logoDataUrl={data.vendor.logoDataUrl}
                    labels={labels}
                    showDueDate={!isReceipt}
                    showExpiryDate={isQuotation}
                />
                <PdfParties vendor={data.vendor} customer={data.customer} labels={labels} />
                <PdfLineItems items={data.items} labels={labels} />
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    {data.remark ? (
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 8, fontWeight: 'bold', marginBottom: 4 }}>
                                {labels.remark}
                            </Text>
                            <Text style={{ fontSize: 8, color: '#475569', lineHeight: 1.4 }}>
                                {data.remark}
                            </Text>
                        </View>
                    ) : (
                        <View style={{ flex: 1 }} />
                    )}
                    <PdfTotals
                        subTotal={data.subTotal}
                        taxAmount={data.taxAmount}
                        total={data.total}
                        includeTax={data.includeTax}
                        taxRate={data.taxRate}
                        labels={labels}
                    />
                </View>
                {isReceipt && data.paymentMethod ? (
                    <Text style={[s.footer, { marginTop: 12 }]}>{data.paymentMethod}</Text>
                ) : null}
            </Page>
        </Document>
    );
}
