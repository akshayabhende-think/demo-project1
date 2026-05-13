import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAppointmentTypes } from "../api/appointmentSettingsApi";
import { APPT_TYPES_QUERY_KEY } from "../features/appointmentSettings/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useAppointmentTypes = (enabled = true) =>
    useQuery({
        queryKey: [APPT_TYPES_QUERY_KEY],
        queryFn: getAppointmentTypes,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
