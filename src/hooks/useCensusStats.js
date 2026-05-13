import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCensusStats } from "../api/reportsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useCensusStats = (enabled = true) =>
    useQuery({
        queryKey: ["censusStats"],
        queryFn: getCensusStats,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
