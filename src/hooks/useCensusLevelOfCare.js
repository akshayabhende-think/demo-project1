import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCensusLevelOfCare } from "../api/reportsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useCensusLevelOfCare = (enabled = true) =>
    useQuery({
        queryKey: ["censusLevelOfCare"],
        queryFn: getCensusLevelOfCare,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
