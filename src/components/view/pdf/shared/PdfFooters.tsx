import { Text, View } from '@react-pdf/renderer';
import type { PdfLabels } from '@/types/pdfLabels';

interface PdfFooterProps {
    vendorName: string;
    customerName: string;
    labels: PdfLabels;
}

export function PdfFooter({ vendorName, customerName, labels }: PdfFooterProps) {
    return (
        <View
            style={{
                position: 'absolute',
                bottom: 32,
                left: 40,
                right: 40,
            }}
            fixed
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 24,
                }}
            >
                <SignatureBlock partyName={vendorName} />
                <SignatureBlock partyName={customerName} align="right" />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 4,
                    }}
                >
                    <Text style={{ fontSize: 8, color: '#94a3b8' }}>{'Powered by'}</Text>
                    <Text
                        style={{
                            fontSize: 8,
                            fontWeight: 'bold',
                        }}
                    >
                        EZY-DOC
                    </Text>
                </View>
            </View>
        </View>
    );
}

interface SignatureBlockProps {
    partyName: string;
    align?: 'left' | 'right';
}

function SignatureBlock({ partyName }: SignatureBlockProps) {
    const width = 220;

    return (
        <View style={{ width, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 9, color: '#1e293b', marginBottom: 28, textAlign: 'center' }}>
                {partyName}
            </Text>
            <View
                style={{
                    width: '75%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#1e293b',
                    marginTop: 16,
                    marginBottom: 16,
                }}
            />
            <Text
                style={{
                    fontSize: 8,
                    color: '#1e293b',
                    textAlign: 'center',
                    width: '100%',
                }}
            >
                (…………………………………………………………………)
            </Text>
        </View>
    );
}
