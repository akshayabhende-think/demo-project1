import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getToxicologyResults } from "../api/toxicologyApi";
import { TOX_RESULTS_QUERY_KEY } from "../features/toxicology/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useToxicologyResults = (enabled = true) =>
    useQuery({
        queryKey: [TOX_RESULTS_QUERY_KEY],
        queryFn: getToxicologyResults,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
