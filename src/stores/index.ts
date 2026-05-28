import { useConfigStore } from "./configStore";
import { useDocumentStore } from "./documentStore";
import { useVendorStore } from "./vendorStore";

export { useConfigStore, useDocumentStore, useVendorStore };

export function resetAllStores() {
  useConfigStore.getState().reset();
  useDocumentStore.getState().reset();
  useVendorStore.getState().reset();
}
