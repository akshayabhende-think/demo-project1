import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getLocations } from "../api/practiceSettingsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useLocations = (enabled = true) =>
    useQuery({
        queryKey: ["practiceLocations"],
        queryFn: getLocations,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
