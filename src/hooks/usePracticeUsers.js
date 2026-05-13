import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPracticeUsers } from "../api/practiceSettingsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const usePracticeUsers = (enabled = true) =>
    useQuery({
        queryKey: ["practiceUsers"],
        queryFn: getPracticeUsers,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
