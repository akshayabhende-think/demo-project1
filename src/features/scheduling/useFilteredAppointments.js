import { useMemo } from "react";

export const useFilteredAppointments = (data, filters = {}) =>
    useMemo(() => {
        if (!Array.isArray(data)) return [];
        return data.filter((appt) => {
            if (filters.counselor && appt.counsellorName !== filters.counselor)
                return false;
            if (filters.location && appt.location !== filters.location)
                return false;
            if (filters.status && appt.status !== filters.status) return false;
            return true;
        });
    }, [data, filters]);
