import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getToxicologyPendingResults } from "../api/toxicologyApi";
import { TOX_PENDING_RESULTS_QUERY_KEY } from "../features/toxicology/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useToxicologyPendingResults = (enabled = true) =>
    useQuery({
        queryKey: [TOX_PENDING_RESULTS_QUERY_KEY],
        queryFn: getToxicologyPendingResults,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
