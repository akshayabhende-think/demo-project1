import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getBillingEncounters } from "../api/billingApi";
import { BILLING_ENCOUNTERS_QUERY_KEY } from "../features/billing/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useBillingEncounters = (enabled = true) =>
    useQuery({
        queryKey: [BILLING_ENCOUNTERS_QUERY_KEY],
        queryFn: getBillingEncounters,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
