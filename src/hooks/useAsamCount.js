import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAsamCount } from "../api/reportsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useAsamCount = (enabled = true) =>
    useQuery({
        queryKey: ["asamCount"],
        queryFn: getAsamCount,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
