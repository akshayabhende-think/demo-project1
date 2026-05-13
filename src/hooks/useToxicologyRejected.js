import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getToxicologyRejected } from "../api/toxicologyApi";
import { TOX_REJECTED_QUERY_KEY } from "../features/toxicology/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useToxicologyRejected = (enabled = true) =>
    useQuery({
        queryKey: [TOX_REJECTED_QUERY_KEY],
        queryFn: getToxicologyRejected,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
