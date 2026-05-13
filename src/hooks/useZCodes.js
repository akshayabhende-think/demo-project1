import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getZCodes } from "../api/masterSettingsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useZCodes = (enabled = true) =>
    useQuery({
        queryKey: ["masterZCodes"],
        queryFn: getZCodes,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
