import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getStaffSessions } from "../api/reportsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useStaffSessions = (enabled = true) =>
    useQuery({
        queryKey: ["staffSessions"],
        queryFn: getStaffSessions,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
