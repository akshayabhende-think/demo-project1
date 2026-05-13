import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAvailability } from "../api/appointmentSettingsApi";
import { APPT_AVAILABILITY_QUERY_KEY } from "../features/appointmentSettings/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useAvailability = (enabled = true) =>
    useQuery({
        queryKey: [APPT_AVAILABILITY_QUERY_KEY],
        queryFn: getAvailability,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
