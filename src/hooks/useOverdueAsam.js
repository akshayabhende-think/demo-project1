import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getOverdueAsam } from "../api/reportsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useOverdueAsam = (enabled = true) =>
    useQuery({
        queryKey: ["overdueAsam"],
        queryFn: getOverdueAsam,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
