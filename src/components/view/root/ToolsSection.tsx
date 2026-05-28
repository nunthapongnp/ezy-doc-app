import Link from "next/link";
import { FileText, Receipt, ClipboardCheck } from "lucide-react";
import type { AppLocale } from "@/lib/constants";

const TOOLS = [
  {
    nameKey: "NAV.QUOTATION",
    slug: "quotation",
    icon: FileText,
    descEn: "Draft quotes that win clients.",
    descTh: "สร้างใบเสนอราคาอย่างมืออาชีพ",
  },
  {
    nameKey: "NAV.INVOICE",
    slug: "invoice",
    icon: Receipt,
    descEn: "Simple billing, faster payments.",
    descTh: "ออกใบแจ้งหนี้ได้ทันที",
  },
  {
    nameKey: "NAV.ACCEPTANCE",
    slug: "acceptance",
    icon: ClipboardCheck,
    descEn: "Document work acceptance clearly.",
    descTh: "บันทึกการตรวจรับงาน",
  },
  {
    nameKey: "NAV.RECEIPT",
    slug: "receipt",
    icon: Receipt,
    descEn: "Issue payment proof instantly.",
    descTh: "ออกใบเสร็จรับเงินทันที",
  },
] as const;

export function ToolsSection({ locale = "en" }: { locale?: AppLocale }) {
  const isTh = locale === "th";

  return (
    <section id="tools" className="container mx-auto px-4 py-24">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          {isTh ? "เลือกประเภทเอกสาร" : "Choose a document type"}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          const labels: Record<string, string> = {
            "NAV.QUOTATION": isTh ? "ใบเสนอราคา" : "Quotation",
            "NAV.INVOICE": isTh ? "ใบแจ้งหนี้" : "Invoice",
            "NAV.ACCEPTANCE": isTh ? "ใบตรวจรับงาน" : "Acceptance Certificate",
            "NAV.RECEIPT": isTh ? "ใบเสร็จรับเงิน" : "Receipt",
          };
          return (
            <Link
              key={tool.slug}
              href={`/${locale}/${tool.slug}`}
              className="group rounded-xl border bg-card p-8 transition-all hover:border-primary hover:shadow-sm"
            >
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{labels[tool.nameKey]}</h3>
              <p className="text-sm text-muted-foreground">
                {isTh ? tool.descTh : tool.descEn}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
