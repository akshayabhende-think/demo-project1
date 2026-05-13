import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getMacros } from "../api/templatesApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useMacros = (enabled = true) =>
    useQuery({
        queryKey: ["macros"],
        queryFn: getMacros,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
