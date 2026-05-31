import { StyleSheet } from '@react-pdf/renderer';
import { PDF_FONT_FAMILY } from './fontFamily';

export const pdfStyles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 10,
        fontFamily: PDF_FONT_FAMILY,
        color: '#1f1f1f',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    label: {
        width: 100,
        color: '#64748b',
        fontSize: 9,
    },
    value: {
        flex: 1,
        fontSize: 9,
    },
    section: {
        marginBottom: 20,
    },
    partiesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    partyCol: {
        flex: 1,
    },
    partyTitle: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#64748b',
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    partyName: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    partyText: {
        fontSize: 9,
        color: '#475569',
        lineHeight: 1.4,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#0f172a',
        padding: 6,
        borderRadius: 4,
        marginBottom: 4,
    },
    tableHeaderText: {
        color: '#ffffff',
        fontSize: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 6,
        borderBottom: '1px solid #f1f5f9',
    },
    colSeq: { width: '10%', textAlign: 'center' },
    colDesc: { width: '40%' },
    colUnit: { width: '20%', textAlign: 'center' },
    colQty: { width: '10%', textAlign: 'center' },
    colPrice: { width: '18%', textAlign: 'right' },
    colAmount: { width: '20%', textAlign: 'right' },
    totalsBlock: {
        marginTop: 16,
        marginLeft: 'auto',
        width: '40%',
    },
    totalsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    totalGrand: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTop: '1px solid #f1f5f9',
        paddingTop: 6,
        borderRadius: 4,
        marginTop: 4,
    },
    totalGrandText: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    footer: {
        marginTop: 24,
        fontSize: 8,
        color: '#94a3b8',
    },
    logo: {
        width: 96,
        height: 96,
        objectFit: 'contain',
    },
});
