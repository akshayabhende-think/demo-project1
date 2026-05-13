export const BILLING_TABS = Object.freeze([
    { key: "encounterForBilling", label: "Encounter for Billing" },
    { key: "superbill", label: "Superbill" },
    { key: "invoices", label: "Invoices" },
    { key: "receipt", label: "Receipt" },
]);

export const BILLING_ENCOUNTER_SUB_TABS = Object.freeze([
    { key: "billable", label: "Billable" },
    { key: "nonBillable", label: "Non-Billable" },
    { key: "selfPay", label: "Self Pay" },
]);

export const BILLING_ENCOUNTERS_QUERY_KEY = "billingEncounters";
export const BILLING_SUPERBILLS_QUERY_KEY = "billingSuperbills";
export const BILLING_INVOICES_QUERY_KEY = "billingInvoices";
export const BILLING_RECEIPTS_QUERY_KEY = "billingReceipts";

export const BILLING_PAGE_SIZE_OPTIONS = [10, 15, 20];
export const BILLING_DEFAULT_PAGE_SIZE = 15;
