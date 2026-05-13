import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAppointmentCancellation } from "../api/reportsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useAppointmentCancellation = (enabled = true) =>
    useQuery({
        queryKey: ["appointmentCancellation"],
        queryFn: getAppointmentCancellation,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
