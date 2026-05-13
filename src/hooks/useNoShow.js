import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getNoShow } from "../api/reportsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useNoShow = (enabled = true) =>
    useQuery({
        queryKey: ["noShow"],
        queryFn: getNoShow,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
