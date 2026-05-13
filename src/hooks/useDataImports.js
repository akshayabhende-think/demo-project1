import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getDataImports } from "../api/masterSettingsApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useDataImports = (enabled = true) =>
    useQuery({
        queryKey: ["masterDataImports"],
        queryFn: getDataImports,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
