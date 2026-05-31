import { DocumentEditor } from '@/components/view/editor/DocumentEditor';
import { DOCUMENT_ROUTES, LOCALES, isDocumentRoute, type DocumentRoute } from '@/lib/constants';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return LOCALES.flatMap((locale) =>
        Object.keys(DOCUMENT_ROUTES).map((tool) => ({ locale, tool })),
    );
}

export default async function DocumentToolPage({
    params,
}: {
    params: Promise<{ locale: string; tool: string }>;
}) {
    const { tool } = await params;

    if (!isDocumentRoute(tool)) {
        notFound();
    }

    return <DocumentEditor route={tool as DocumentRoute} />;
}
