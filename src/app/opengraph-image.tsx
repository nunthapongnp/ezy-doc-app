import { ImageResponse } from 'next/og';
import { APP_NAME } from '@/lib/constants';

export const runtime = 'edge';
export const alt = `${APP_NAME} - Free business document generator`;
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: '#f8fafc',
                    color: '#0f172a',
                    padding: 72,
                    fontFamily: 'Arial, sans-serif',
                }}
            >
                <div style={{ fontSize: 40, fontWeight: 700, color: '#2563eb' }}>{APP_NAME}</div>
                <div style={{ marginTop: 34, maxWidth: 900, fontSize: 72, fontWeight: 800 }}>
                    Free Quotation, Invoice & Receipt Generator
                </div>
                <div style={{ marginTop: 28, maxWidth: 820, fontSize: 32, color: '#475569' }}>
                    Create professional PDF business documents in English and Thai.
                </div>
            </div>
        ),
        size,
    );
}
