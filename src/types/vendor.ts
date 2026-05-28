export interface VendorProfile {
  businessName: string;
  addressLine1: string;
  addressLine2: string;
  taxId: string;
  phone: string;
  email: string;
  logoDataUrl?: string;
  bankName: string;
  bankAccountNo: string;
  bankAccountName: string;
}

export const DEFAULT_VENDOR: VendorProfile = {
  businessName: "",
  addressLine1: "",
  addressLine2: "",
  taxId: "",
  phone: "",
  email: "",
  bankName: "",
  bankAccountNo: "",
  bankAccountName: "",
};
