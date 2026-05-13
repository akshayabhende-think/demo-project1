import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProspect, updateProspect } from "../../api/prospectApi";
import { ARCHIVE_STATUS, PROSPECT_QUERY_KEY } from "./constants";

export const useUnarchiveProspect = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) =>
            updateProspect(id, { archiveStatus: ARCHIVE_STATUS.ACTIVE }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROSPECT_QUERY_KEY] });
        },
    });
};

export const useArchiveProspect = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) =>
            updateProspect(id, { archiveStatus: ARCHIVE_STATUS.ARCHIVE }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROSPECT_QUERY_KEY] });
        },
    });
};

export const useUpdateProspect = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }) => updateProspect(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROSPECT_QUERY_KEY] });
        },
    });
};

export const useCreateProspect = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) =>
            createProspect({
                archiveStatus: ARCHIVE_STATUS.ACTIVE,
                status: "Active",
                ...payload,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROSPECT_QUERY_KEY] });
        },
    });
};
