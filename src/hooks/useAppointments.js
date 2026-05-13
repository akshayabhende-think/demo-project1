import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAppointments } from "../api/appointmentApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useAppointments = () =>
    useQuery({
        queryKey: ["appointments"],
        queryFn: getAppointments,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
    });
