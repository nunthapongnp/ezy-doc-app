import { ADSENSE_CLIENT_ID, getAdSensePublisherId } from '@/lib/google';

export function GET() {
    const publisherId = getAdSensePublisherId(ADSENSE_CLIENT_ID);
    const body = publisherId
        ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
        : '# Configure NEXT_PUBLIC_ADSENSE_ID=ca-pub-... to publish ads.txt\n';

    return new Response(body, {
        headers: {
            'content-type': 'text/plain; charset=utf-8',
            'cache-control': 'public, max-age=3600',
        },
    });
}
