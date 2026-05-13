import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getClients } from "../api/clientApi";
import { CLIENT_QUERY_KEY } from "../features/clients/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useClients = () =>
    useQuery({
        queryKey: [CLIENT_QUERY_KEY],
        queryFn: getClients,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
    });
