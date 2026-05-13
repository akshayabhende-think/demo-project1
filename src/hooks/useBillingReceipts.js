import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getBillingReceipts } from "../api/billingApi";
import { BILLING_RECEIPTS_QUERY_KEY } from "../features/billing/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useBillingReceipts = (enabled = true) =>
    useQuery({
        queryKey: [BILLING_RECEIPTS_QUERY_KEY],
        queryFn: getBillingReceipts,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
