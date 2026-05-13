import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getGroups } from "../api/groupApi";
import { GROUP_QUERY_KEY } from "../features/groups/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useGroups = () =>
    useQuery({
        queryKey: [GROUP_QUERY_KEY],
        queryFn: getGroups,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
    });
