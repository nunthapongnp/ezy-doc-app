import { create } from "zustand";
import { DEFAULT_VENDOR, type VendorProfile } from "@/types/vendor";

interface VendorStore {
  vendor: VendorProfile;
  setVendor: (patch: Partial<VendorProfile>) => void;
  setLogo: (logoDataUrl: string | undefined) => void;
  reset: () => void;
}

export const useVendorStore = create<VendorStore>((set) => ({
  vendor: { ...DEFAULT_VENDOR },
  setVendor: (patch) =>
    set((s) => ({ vendor: { ...s.vendor, ...patch } })),
  setLogo: (logoDataUrl) =>
    set((s) => ({ vendor: { ...s.vendor, logoDataUrl } })),
  reset: () => set({ vendor: { ...DEFAULT_VENDOR } }),
}));
