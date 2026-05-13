import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPatientFlags } from "../api/providerAccountApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const usePatientFlags = (enabled = true) =>
    useQuery({
        queryKey: ["patientFlags"],
        queryFn: getPatientFlags,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
