import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getFeeSchedule } from "../api/feeScheduleApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useFeeSchedule = (enabled = true) =>
    useQuery({
        queryKey: ["feeSchedule"],
        queryFn: getFeeSchedule,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
