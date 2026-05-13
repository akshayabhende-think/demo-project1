import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getBillingSuperbills } from "../api/billingApi";
import { BILLING_SUPERBILLS_QUERY_KEY } from "../features/billing/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useBillingSuperbills = (enabled = true) =>
    useQuery({
        queryKey: [BILLING_SUPERBILLS_QUERY_KEY],
        queryFn: getBillingSuperbills,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
