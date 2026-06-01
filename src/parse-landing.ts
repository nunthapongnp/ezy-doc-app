import fs from 'node:fs';
import path from 'node:path';

const CONTENT_DIR = path.join(process.cwd(), 'public', 'contents');

function readContentFile(fileName: string) {
    return fs.readFileSync(path.join(CONTENT_DIR, fileName), 'utf8');
}

function stripQuotes(value: string) {
    return value.trim().replace(/^["']|["']$/g, '');
}

function clean(value: string) {
    return value
        .replace(/\*\*/g, '')
        .replace(/^>\s?/gm, '')
        .replace(/^\*\s?|\s?\*$/g, '')
        .trim();
}

function escapeRegex(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSection(markdown: string, heading: string) {
    const start = markdown.indexOf(`## ${heading}`);
    if (start === -1) return '';
    const rest = markdown.slice(start);
    const next = rest.slice(1).search(/\n## /);
    return next === -1 ? rest : rest.slice(0, next + 1);
}

function getSubsection(section: string, heading: string) {
    const pattern = new RegExp(
        `### ${escapeRegex(heading)}[^\\n]*\\n([\\s\\S]*?)(?=\\n### |\\n---|$)`,
    );
    return section.match(pattern)?.[1]?.trim() ?? '';
}

function getSectionHeader(section: string) {
    return clean(getSubsection(section, 'Section Header'));
}

function parseMetadata(markdown: string) {
    const codeBlock = getSection(markdown, 'SEO Metadata').match(/```([\s\S]*?)```/)?.[1] ?? '';
    const metadata = {
        title: '',
        description: '',
        keywords: [] as string[],
    };

    for (const line of codeBlock.split('\n')) {
        const [rawKey, ...rawValueParts] = line.split(':');
        if (!rawKey || rawValueParts.length === 0) continue;
        const key = rawKey.trim();
        const value = stripQuotes(rawValueParts.join(':').trim());

        if (key === 'title') metadata.title = value;
        if (key === 'description') metadata.description = value;
        if (key === 'keywords') metadata.keywords = value.split(',').map((item) => item.trim());
    }

    return metadata;
}

function parseHero(markdown: string) {
    const section = getSection(markdown, 'HERO SECTION');
    const ctas = getSubsection(section, 'CTA Buttons');
    const trustSignals = getSubsection(section, 'Trust Signals')
        .split('\n')
        .map((item) => clean(item.replace(/^-\s*/, '')))
        .filter(Boolean);

    return {
        title: clean(getSubsection(section, 'H1')),
        subtitle: clean(getSubsection(section, 'Subheadline')),
        primaryCta: clean(ctas.match(/\*\*Primary:\*\*\s*(.*)/)?.[1] ?? ''),
        secondaryCta: clean(ctas.match(/\*\*Secondary:\*\*\s*(.*)/)?.[1] ?? ''),
        trustSignals,
    };
}

function parseSocialProof(markdown: string) {
    const section = getSection(markdown, 'SOCIAL PROOF BANNER');
    const quote = section
        .split('\n')
        .find((line) => line.startsWith('>') && !line.includes('Placeholder'));

    return quote ? clean(quote) : undefined;
}

function parseDocumentCards(markdown: string) {
    const section = getSection(markdown, 'DOCUMENT TYPE CARDS SECTION');
    const cards = [] as Array<{
        title: string;
        subtitle: string;
        description: string;
        cta: string;
    }>;
    const pattern =
        /### Card \d+ [—-] [^\n]+\s*\*\*([^*]+)\*\*\s*\(([^)]+)\)\s*([\s\S]*?)\n→\s*\*\*([^*]+)\*\*/g;

    for (const match of section.matchAll(pattern)) {
        cards.push({
            title: clean(match[1]),
            subtitle: clean(match[2]),
            description: clean(match[3]),
            cta: clean(match[4]),
        });
    }

    return cards;
}

function parseFeatures(markdown: string) {
    const section = getSection(markdown, 'FEATURES SECTION');
    const features = [] as Array<{ eyebrow: string; title: string; description: string }>;
    const pattern =
        /### Feature \d+ [—-] ([^\n]+)\s*\*\*([^*]+)\*\*\s*([\s\S]*?)(?=\n### Feature \d+|\n---|$)/g;

    for (const match of section.matchAll(pattern)) {
        features.push({
            eyebrow: clean(match[1]),
            title: clean(match[2]),
            description: clean(match[3]),
        });
    }

    return features;
}

function parseSteps(markdown: string) {
    const section = getSection(markdown, 'HOW IT WORKS SECTION');
    const steps = [] as Array<{ title: string; description: string }>;
    const pattern = /### Step \d+\s*\*\*([^*]+)\*\*\s*([\s\S]*?)(?=\n### Step \d+|\n---|$)/g;

    for (const match of section.matchAll(pattern)) {
        steps.push({
            title: clean(match[1]),
            description: clean(match[2]),
        });
    }

    return steps;
}

function parseComparison(markdown: string) {
    const section = getSection(markdown, 'COMPARISON SECTION');
    const rows = section
        .split('\n')
        .filter((line) => line.trim().startsWith('|'))
        .map((line) =>
            line
                .split('|')
                .slice(1, -1)
                .map((cell) => clean(cell)),
        )
        .filter((row) => !row.every((cell) => /^-+$/.test(cell)));

    return {
        title: getSectionHeader(section),
        headers: rows[0] ?? [],
        rows: rows.slice(1),
    };
}

function parseBoldBlocks(
    markdown: string,
    sectionName: string,
): Array<{ title: string; description: string }> {
    const section = getSection(markdown, sectionName);
    const afterHeader = section.replace(/[\s\S]*?### [^\n]+\n/, '');
    const blocks: Array<{ title: string; description: string }> = [];
    const pattern = /\*\*([^*]+)\*\*\n([\s\S]*?)(?=\n\n\*\*|\n---|$)/g;

    for (const match of afterHeader.matchAll(pattern)) {
        blocks.push({
            title: clean(match[1]),
            description: clean(match[2]),
        });
    }

    return blocks;
}

function parseFooterCta(markdown: string) {
    const section = getSection(markdown, 'FOOTER CTA SECTION');

    return {
        title: clean(getSubsection(section, 'Headline')),
        subtitle: clean(getSubsection(section, 'Subtext')),
        cta: clean(getSubsection(section, 'CTA')),
    };
}

function getLandingContent(locale: 'en' | 'th') {
    const markdown = readContentFile(`landing-${locale}.md`);

    return {
        metadata: parseMetadata(markdown),
        hero: parseHero(markdown),
        socialProof: parseSocialProof(markdown),
        documentCards: parseDocumentCards(markdown),
        features: parseFeatures(markdown),
        steps: parseSteps(markdown),
        comparison: parseComparison(markdown),
        useCases: parseBoldBlocks(markdown, 'USE CASES SECTION'),
        faq: parseBoldBlocks(markdown, 'FAQ SECTION').map((item) => ({
            question: item.title,
            answer: item.description,
        })),
        footerCta: parseFooterCta(markdown),
    };
}

const en = getLandingContent('en');
const th = getLandingContent('th');

fs.writeFileSync(
    path.join(process.cwd(), 'src', 'landing-data.json'),
    JSON.stringify({ en, th }, null, 4),
    'utf8',
);
