import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "../../api/groupApi";
import { GROUP_QUERY_KEY } from "./constants";

export const useCreateGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) => createGroup(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [GROUP_QUERY_KEY] });
        },
    });
};
