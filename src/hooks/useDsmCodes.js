import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getDsmCodes } from "../api/masterSettingsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useDsmCodes = (enabled = true) =>
    useQuery({
        queryKey: ["masterDsmCodes"],
        queryFn: getDsmCodes,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
