import { useLayoutStore } from './layoutStore';
import { useDocumentStore } from './documentStore';
import { useVendorStore } from './vendorStore';

export { useLayoutStore, useDocumentStore, useVendorStore };

export function resetAllStores() {
    useLayoutStore.getState().reset();
    useDocumentStore.getState().reset();
    // useVendorStore.getState().reset();
}
