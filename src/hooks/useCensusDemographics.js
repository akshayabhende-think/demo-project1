import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCensusDemographics } from "../api/reportsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useCensusDemographics = (enabled = true) =>
    useQuery({
        queryKey: ["censusDemographics"],
        queryFn: getCensusDemographics,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
