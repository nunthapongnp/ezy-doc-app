import { Document, Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles as s } from '@/lib/pdf/PdfStyles';
import { PdfHeader } from './shared/PdfHeader';
import { PdfParties } from './shared/PdfParties';
import { PdfLineItems } from './shared/PdfLineItems';
import { PdfTotals } from './shared/PdfTotals';
import type { DocumentState } from '@/types/document';
import type { PdfLabels } from '@/types/pdfLabels';
import { PdfFooter } from './shared/PdfFooters';

export interface DocumentPdfTemplateProps {
    data: DocumentState;
    labels: PdfLabels;
}

export function DocumentPdfTemplate({ data, labels }: DocumentPdfTemplateProps) {
    const isReceipt = data.docType === 'RECEIPT';

    return (
        <Document>
            <Page size="A4" style={s.page}>
                <PdfHeader
                    title={labels.title}
                    docNo={data.docNo}
                    refNo={data.refNo}
                    docDate={data.docDate}
                    dueDate={data.dueDate}
                    logoDataUrl={data.vendor.logoDataUrl}
                    labels={labels}
                    layout={{
                        showDocNo: data.layout.showDocNo,
                        showRefNo: data.layout.showRefNo,
                        showDocDate: data.layout.showDocDate,
                        showDueDate: data.layout.showDueDate,
                    }}
                />
                <PdfParties vendor={data.vendor} customer={data.customer} labels={labels} />
                <PdfLineItems
                    items={data.items}
                    labels={labels}
                    layout={{
                        showSeq: data.layout.showItemSeq,
                        showDesc: data.layout.showItemDesc,
                        showUnit: data.layout.showItemUnit,
                        showUnitPrice: data.layout.showItemUnitPrice,
                    }}
                />
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
                        subTotalAmt={data.subTotalAmt}
                        taxRate={data.taxRate}
                        taxAmt={data.taxAmt}
                        totalAmt={data.totalAmt}
                        whtRate={data.whtRate}
                        whtAmt={data.whtAmt}
                        netTotalAmt={data.netTotalAmt}
                        labels={labels}
                        layout={{
                            showTax: data.layout.showTax,
                            showWht: data.layout.showWht,
                        }}
                    />
                </View>
                {isReceipt && data.paymentMethod ? (
                    <Text style={[s.footer, { marginTop: 12 }]}>{data.paymentMethod}</Text>
                ) : null}
                <PdfFooter
                    vendorName={data.vendor.name}
                    customerName={data.customer.name}
                    labels={labels}
                />
            </Page>
        </Document>
    );
}
