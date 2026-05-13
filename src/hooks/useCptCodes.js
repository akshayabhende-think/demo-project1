import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCptCodes } from "../api/masterSettingsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useCptCodes = (enabled = true) =>
    useQuery({
        queryKey: ["masterCptCodes"],
        queryFn: getCptCodes,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
