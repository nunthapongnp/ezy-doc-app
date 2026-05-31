import type { MetadataRoute } from 'next';
import { APP_NAME } from '@/lib/constants';
import { absoluteUrl } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${APP_NAME} - Free Business Document Generator`,
        short_name: APP_NAME,
        description:
            'Create quotations, invoices, acceptance certificates, and receipts online with free PDF export.',
        start_url: absoluteUrl('/en'),
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0f172a',
        lang: 'en',
    };
}
