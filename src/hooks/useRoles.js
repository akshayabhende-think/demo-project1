import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getRoles } from "../api/practiceSettingsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useRoles = (enabled = true) =>
    useQuery({
        queryKey: ["practiceRoles"],
        queryFn: getRoles,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
