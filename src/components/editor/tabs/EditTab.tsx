"use client";

import { useEffect } from "react";
import { useTranslate } from "@tolgee/react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LogoUpload } from "@/components/logo/LogoUpload";
import { computeDocNumber } from "@/lib/docNumber";
import { useConfigStore } from "@/stores/configStore";
import { useDocumentStore } from "@/stores/documentStore";
import { useVendorStore } from "@/stores/vendorStore";
import type { DocType } from "@/types/document";

function formatDateInput(d: Date | undefined): string {
  if (!d || Number.isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

interface EditTabProps {
  docType: DocType;
}

export function EditTab({ docType }: EditTabProps) {
  const { t } = useTranslate();
  const { config } = useConfigStore();
  const { doc, setField, setVendor, setCustomer, addItem, updateItem, removeItem, recalcTotals } =
    useDocumentStore();
  const { vendor, setVendor: setVendorProfile } = useVendorStore();

  useEffect(() => {
    recalcTotals(config.includeTax, config.taxRate);
  }, [config.includeTax, config.taxRate, doc.items, recalcTotals]);

  const docDate = doc.docDate ?? new Date();
  const computedDocNo = computeDocNumber(docType, docDate, config.seqNumber);
  const isReceipt = docType === "RECEIPT";

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6 overflow-y-auto">
      <LogoUpload />

      <div className="grid gap-4 sm:grid-cols-2">
        {config.showDocNo && (
          <div className="space-y-1">
            <Label className="text-xs">{t("EDITOR.DOC_NO")}</Label>
            <Input value={computedDocNo} readOnly className="bg-muted font-mono" />
          </div>
        )}
        <div className="space-y-1">
          <Label className="text-xs">{t("EDITOR.REF_NO")}</Label>
          <Input
            value={doc.refNo ?? ""}
            onChange={(e) => setField("refNo", e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">{t("EDITOR.DOC_DATE")}</Label>
          <Input
            type="date"
            value={formatDateInput(doc.docDate)}
            onChange={(e) =>
              setField("docDate", e.target.value ? new Date(e.target.value) : new Date())
            }
          />
        </div>
        {!isReceipt && (
          <div className="space-y-1">
            <Label className="text-xs">
              {docType === "QUOTATION"
                ? t("EDITOR.EXPIRY_DATE")
                : t("EDITOR.DUE_DATE")}
            </Label>
            <Input
              type="date"
              value={formatDateInput(
                docType === "QUOTATION" ? doc.expiryDate : doc.dueDate,
              )}
              onChange={(e) => {
                const d = e.target.value ? new Date(e.target.value) : undefined;
                setField(
                  docType === "QUOTATION" ? "expiryDate" : "dueDate",
                  d,
                );
              }}
            />
          </div>
        )}
      </div>

      <section className="space-y-3 border-t pt-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {t("EDITOR.VENDOR")}
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <Input
            placeholder="Business name"
            value={vendor.businessName}
            onChange={(e) => {
              setVendorProfile({ businessName: e.target.value });
              setVendor({ name: e.target.value });
            }}
          />
          <Input
            placeholder="Tax ID"
            value={vendor.taxId}
            onChange={(e) => {
              setVendorProfile({ taxId: e.target.value });
              setVendor({ taxId: e.target.value });
            }}
          />
          <Input
            placeholder="Address line 1"
            value={vendor.addressLine1}
            onChange={(e) => {
              setVendorProfile({ addressLine1: e.target.value });
              setVendor({ addressLine1: e.target.value });
            }}
            className="sm:col-span-2"
          />
          <Input
            placeholder="Address line 2"
            value={vendor.addressLine2}
            onChange={(e) => {
              setVendorProfile({ addressLine2: e.target.value });
              setVendor({ addressLine2: e.target.value });
            }}
            className="sm:col-span-2"
          />
          <Input
            placeholder="Email"
            value={vendor.email}
            onChange={(e) => {
              setVendorProfile({ email: e.target.value });
              setVendor({ email: e.target.value });
            }}
          />
          <Input
            placeholder="Phone"
            value={vendor.phone}
            onChange={(e) => {
              setVendorProfile({ phone: e.target.value });
              setVendor({ phone: e.target.value });
            }}
          />
        </div>
      </section>

      <section className="space-y-3 border-t pt-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {t("EDITOR.CUSTOMER")}
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <Input
            placeholder="Name"
            value={doc.customer?.name ?? ""}
            onChange={(e) => setCustomer({ name: e.target.value })}
            className="sm:col-span-2"
          />
          <Input
            placeholder="Address line 1"
            value={doc.customer?.addressLine1 ?? ""}
            onChange={(e) => setCustomer({ addressLine1: e.target.value })}
            className="sm:col-span-2"
          />
          <Input
            placeholder="Address line 2"
            value={doc.customer?.addressLine2 ?? ""}
            onChange={(e) => setCustomer({ addressLine2: e.target.value })}
            className="sm:col-span-2"
          />
          <Input
            placeholder="Email"
            value={doc.customer?.email ?? ""}
            onChange={(e) => setCustomer({ email: e.target.value })}
          />
          <Input
            placeholder="Phone"
            value={doc.customer?.phone ?? ""}
            onChange={(e) => setCustomer({ phone: e.target.value })}
          />
        </div>
      </section>

      <section className="space-y-3 border-t pt-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {t("EDITOR.ITEM_DESC")}
        </h3>
        {(doc.items ?? []).map((item) => (
          <div
            key={item.id}
            className="space-y-2 rounded-lg border bg-muted/20 p-3"
          >
            <div className="flex gap-2">
              <Input
                placeholder="Item name"
                value={item.name}
                onChange={(e) => updateItem(item.id, { name: e.target.value })}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded p-2 text-destructive hover:bg-destructive/10"
                aria-label="Remove item"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <Input
              placeholder="Description"
              value={item.desc ?? ""}
              onChange={(e) => updateItem(item.id, { desc: e.target.value })}
            />
            <div className="grid grid-cols-4 gap-2">
              <Input
                placeholder={t("EDITOR.ITEM_UNIT")}
                value={item.unit}
                onChange={(e) => updateItem(item.id, { unit: e.target.value })}
              />
              <Input
                type="number"
                min={0}
                placeholder={t("EDITOR.ITEM_QTY")}
                value={item.qty || ""}
                onChange={(e) =>
                  updateItem(item.id, { qty: Number(e.target.value) })
                }
              />
              <Input
                type="number"
                min={0}
                placeholder={t("EDITOR.ITEM_UNIT_PRICE")}
                value={item.unitPrice || ""}
                onChange={(e) =>
                  updateItem(item.id, { unitPrice: Number(e.target.value) })
                }
                className="col-span-2"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed py-2 text-sm hover:border-primary hover:bg-primary/5"
        >
          <Plus className="size-4" /> Add item
        </button>
      </section>

      {isReceipt && (
        <div className="space-y-1 border-t pt-4">
          <Label className="text-xs">{t("EDITOR.PAYMENT_METHOD")}</Label>
          <Input
            value={doc.paymentMethod ?? ""}
            onChange={(e) => setField("paymentMethod", e.target.value)}
          />
        </div>
      )}

      <div className="space-y-1 border-t pt-4">
        <Label className="text-xs">{t("EDITOR.REMARK")}</Label>
        <Textarea
          value={doc.remark ?? ""}
          onChange={(e) => setField("remark", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
}
