import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getBillingReport } from "../api/reportsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useBillingReport = (enabled = true) =>
    useQuery({
        queryKey: ["billingReport"],
        queryFn: getBillingReport,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
