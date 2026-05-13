import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getReminders } from "../api/patientCommunicationsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useReminders = (enabled = true) =>
    useQuery({
        queryKey: ["patientReminders"],
        queryFn: getReminders,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
