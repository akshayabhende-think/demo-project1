import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProblemList } from "../api/masterSettingsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useProblemList = (enabled = true) =>
    useQuery({
        queryKey: ["masterProblemList"],
        queryFn: getProblemList,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
