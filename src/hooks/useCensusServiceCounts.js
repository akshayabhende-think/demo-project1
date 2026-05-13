import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCensusServiceCounts } from "../api/reportsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useCensusServiceCounts = (enabled = true) =>
    useQuery({
        queryKey: ["censusServiceCounts"],
        queryFn: getCensusServiceCounts,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
