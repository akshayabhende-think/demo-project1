import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getToxicologyExceptions } from "../api/toxicologyApi";
import { TOX_EXCEPTIONS_QUERY_KEY } from "../features/toxicology/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useToxicologyExceptions = (enabled = true) =>
    useQuery({
        queryKey: [TOX_EXCEPTIONS_QUERY_KEY],
        queryFn: getToxicologyExceptions,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
