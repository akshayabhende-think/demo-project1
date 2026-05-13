import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getBillingInvoices } from "../api/billingApi";
import { BILLING_INVOICES_QUERY_KEY } from "../features/billing/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useBillingInvoices = (enabled = true) =>
    useQuery({
        queryKey: [BILLING_INVOICES_QUERY_KEY],
        queryFn: getBillingInvoices,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
