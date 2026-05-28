import { describe, expect, it } from "vitest";
import { calcLineTotal, calcTotals, round2 } from "./calculations";
import type { LineItem } from "@/types/document";

const item = (total: number): LineItem => ({
  id: "1",
  name: "A",
  qty: 1,
  unit: "ea",
  unitPrice: total,
  total,
});

describe("round2", () => {
  it("rounds to two decimal places", () => {
    expect(round2(10.555)).toBe(10.56);
    expect(round2(10.994)).toBe(10.99);
  });
});

describe("calcLineTotal", () => {
  it("multiplies qty and unit price", () => {
    expect(calcLineTotal(3, 10.5)).toBe(31.5);
  });
});

describe("calcTotals", () => {
  it("sums items without tax", () => {
    const result = calcTotals([item(100), item(50)], false, 7);
    expect(result).toEqual({ subTotal: 150, taxAmount: 0, total: 150 });
  });

  it("applies tax when enabled", () => {
    const result = calcTotals([item(100)], true, 7);
    expect(result.subTotal).toBe(100);
    expect(result.taxAmount).toBe(7);
    expect(result.total).toBe(107);
  });
});
