import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getToxicologyShipments } from "../api/toxicologyApi";
import { TOX_SHIPMENTS_QUERY_KEY } from "../features/toxicology/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useToxicologyShipments = (enabled = true) =>
    useQuery({
        queryKey: [TOX_SHIPMENTS_QUERY_KEY],
        queryFn: getToxicologyShipments,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
