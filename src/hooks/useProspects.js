import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProspects } from "../api/prospectApi";
import { PROSPECT_QUERY_KEY } from "../features/prospects/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useProspects = () =>
    useQuery({
        queryKey: [PROSPECT_QUERY_KEY],
        queryFn: getProspects,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
    });
