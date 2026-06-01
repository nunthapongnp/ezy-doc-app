import Link from 'next/link';
import type { ReactNode } from 'react';

function renderInline(text: string): ReactNode[] {
    const nodes: ReactNode[] = [];
    const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    let lastIndex = 0;

    for (const match of text.matchAll(pattern)) {
        if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

        const token = match[0];
        if (token.startsWith('**')) {
            nodes.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
        } else if (token.startsWith('`')) {
            nodes.push(
                <code key={match.index} className="rounded bg-muted px-1 py-0.5 text-sm">
                    {token.slice(1, -1)}
                </code>,
            );
        } else {
            const link = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (link) {
                nodes.push(
                    <Link
                        key={match.index}
                        href={link[2]}
                        className="font-medium text-primary underline underline-offset-4"
                    >
                        {link[1]}
                    </Link>,
                );
            }
        }

        lastIndex = match.index + token.length;
    }

    if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
    return nodes;
}

function parseTable(lines: string[]) {
    return lines
        .map((line) =>
            line
                .split('|')
                .slice(1, -1)
                .map((cell) => cell.trim()),
        )
        .filter((row) => !row.every((cell) => /^-+$/.test(cell.replace(/\s/g, ''))));
}

export function MarkdownArticle({ markdown }: { markdown: string }) {
    const lines = markdown.split('\n');
    const blocks: ReactNode[] = [];
    let index = 0;
    let key = 0;

    while (index < lines.length) {
        const line = lines[index];
        const trimmed = line.trim();

        if (!trimmed) {
            index += 1;
            continue;
        }

        if (trimmed === '---') {
            blocks.push(<hr key={key++} className="my-8 border-border" />);
            index += 1;
            continue;
        }

        if (trimmed.startsWith('```')) {
            const code: string[] = [];
            index += 1;
            while (index < lines.length && !lines[index].trim().startsWith('```')) {
                code.push(lines[index]);
                index += 1;
            }
            index += 1;
            blocks.push(
                <pre key={key++} className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                    <code>{code.join('\n')}</code>
                </pre>,
            );
            continue;
        }

        if (trimmed.startsWith('|')) {
            const tableLines: string[] = [];
            while (index < lines.length && lines[index].trim().startsWith('|')) {
                tableLines.push(lines[index]);
                index += 1;
            }
            const rows = parseTable(tableLines);
            const [headers, ...bodyRows] = rows;
            blocks.push(
                <div key={key++} className="overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-sm">
                        <thead>
                            <tr className="border-b bg-muted/40">
                                {headers.map((header) => (
                                    <th key={header} className="p-3 text-left font-semibold">
                                        {renderInline(header)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {bodyRows.map((row, rowIndex) => (
                                <tr key={rowIndex} className="border-b">
                                    {row.map((cell, cellIndex) => (
                                        <td key={`${cell}-${cellIndex}`} className="p-3 align-top">
                                            {renderInline(cell)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>,
            );
            continue;
        }

        if (trimmed.startsWith('- ')) {
            const items: string[] = [];
            while (index < lines.length && lines[index].trim().startsWith('- ')) {
                items.push(lines[index].trim().replace(/^- /, ''));
                index += 1;
            }
            blocks.push(
                <ul key={key++} className="list-disc space-y-2 pl-6">
                    {items.map((item) => (
                        <li key={item}>{renderInline(item)}</li>
                    ))}
                </ul>,
            );
            continue;
        }

        if (trimmed.startsWith('>')) {
            const quoteLines: string[] = [];
            while (index < lines.length && lines[index].trim().startsWith('>')) {
                quoteLines.push(lines[index].trim().replace(/^>\s?/, ''));
                index += 1;
            }
            blocks.push(
                <blockquote
                    key={key++}
                    className="border-l-4 border-primary/40 pl-4 text-muted-foreground"
                >
                    {quoteLines.map((quote) => (
                        <p key={quote}>{renderInline(quote)}</p>
                    ))}
                </blockquote>,
            );
            continue;
        }

        if (trimmed.startsWith('### ')) {
            blocks.push(
                <h3 key={key++} className="mt-8 text-xl font-bold tracking-tight">
                    {renderInline(trimmed.replace(/^### /, ''))}
                </h3>,
            );
            index += 1;
            continue;
        }

        if (trimmed.startsWith('## ')) {
            blocks.push(
                <h2 key={key++} className="mt-10 text-2xl font-bold tracking-tight">
                    {renderInline(trimmed.replace(/^## /, ''))}
                </h2>,
            );
            index += 1;
            continue;
        }

        if (trimmed.startsWith('# ')) {
            blocks.push(
                <h1 key={key++} className="text-4xl font-extrabold tracking-tight">
                    {renderInline(trimmed.replace(/^# /, ''))}
                </h1>,
            );
            index += 1;
            continue;
        }

        const paragraph: string[] = [];
        while (
            index < lines.length &&
            lines[index].trim() &&
            !/^(#{1,3} |---|```|>|\||- )/.test(lines[index].trim())
        ) {
            paragraph.push(lines[index].trim());
            index += 1;
        }

        blocks.push(
            <p key={key++} className="leading-8 text-foreground/85">
                {renderInline(paragraph.join(' '))}
            </p>,
        );
    }

    return <div className="space-y-5">{blocks}</div>;
}
