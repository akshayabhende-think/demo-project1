import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../api/taskApi";
import { TASK_QUERY_KEY } from "./constants";

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) =>
            createTask({ status: "Pending", ...payload }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
        },
    });
};
