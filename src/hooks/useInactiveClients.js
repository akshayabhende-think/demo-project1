import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getInactiveClients } from "../api/reportsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useInactiveClients = (enabled = true) =>
    useQuery({
        queryKey: ["inactiveClients"],
        queryFn: getInactiveClients,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
