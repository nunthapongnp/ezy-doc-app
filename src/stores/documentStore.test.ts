import { describe, expect, it, beforeEach } from "vitest";
import { useDocumentStore } from "./documentStore";

describe("documentStore", () => {
  beforeEach(() => {
    useDocumentStore.getState().reset();
  });

  it("recalculates totals when tax enabled", () => {
    const store = useDocumentStore.getState();
    store.updateItem(store.doc.items![0].id, {
      qty: 2,
      unitPrice: 50,
    });
    store.recalcTotals(true, 7);
    const { doc } = useDocumentStore.getState();
    expect(doc.subTotal).toBe(100);
    expect(doc.taxAmount).toBe(7);
    expect(doc.total).toBe(107);
  });
});
