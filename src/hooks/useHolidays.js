import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getHolidays } from "../api/appointmentSettingsApi";
import { APPT_HOLIDAYS_QUERY_KEY } from "../features/appointmentSettings/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useHolidays = (enabled = true) =>
    useQuery({
        queryKey: [APPT_HOLIDAYS_QUERY_KEY],
        queryFn: getHolidays,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
