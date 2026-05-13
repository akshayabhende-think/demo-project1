import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getBequipCount } from "../api/reportsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useBequipCount = (enabled = true) =>
    useQuery({
        queryKey: ["bequipCount"],
        queryFn: getBequipCount,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
