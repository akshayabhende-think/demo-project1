import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getToxicologyTests } from "../api/toxicologyApi";
import { TOX_QUERY_KEY } from "../features/toxicology/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useToxicologyTests = () =>
    useQuery({
        queryKey: [TOX_QUERY_KEY],
        queryFn: getToxicologyTests,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
    });
