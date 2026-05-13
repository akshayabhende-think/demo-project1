import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getNoteTemplates } from "../api/templatesApi";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useNoteTemplates = (enabled = true) =>
    useQuery({
        queryKey: ["noteTemplates"],
        queryFn: getNoteTemplates,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
        enabled,
    });
