import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getBillingProgramReport } from "../api/reportsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useBillingProgramReport = (enabled = true) =>
    useQuery({
        queryKey: ["billingProgramReport"],
        queryFn: getBillingProgramReport,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
