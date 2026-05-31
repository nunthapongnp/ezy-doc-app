import { Text, View } from '@react-pdf/renderer';
import { pdfStyles as s } from '@/lib/pdf/PdfStyles';
import type { PartyInfo } from '@/types/document';
import type { PdfLabels } from '@/types/pdfLabels';

interface PdfPartiesProps {
    vendor: PartyInfo;
    customer: PartyInfo;
    labels: PdfLabels;
}

function PartyBlock({
    title,
    party,
    labels,
}: {
    title: string;
    party: PartyInfo;
    labels?: PdfLabels;
}) {
    return (
        <View style={s.partyCol}>
            <Text style={s.partyTitle}>{title}</Text>
            <Text style={s.partyName}>{party.name}</Text>
            <Text style={s.partyText}>
                {party.addressLine1}
                {party.addressLine2 ? `\n${party.addressLine2}` : ''}
                {party.email ? `\n${party.email}` : ''}
                {party.phone ? `\n${party.phone}` : ''}
                {party.taxId ? `\n${labels?.taxId ? labels.taxId : 'Tax ID'}: ${party.taxId}` : ''}
            </Text>
        </View>
    );
}

export function PdfParties({ vendor, customer, labels }: PdfPartiesProps) {
    return (
        <View style={[s.section, s.partiesRow]}>
            <PartyBlock title={labels.vendor} party={vendor} labels={labels} />
            <PartyBlock title={labels.customer} party={customer} />
        </View>
    );
}
