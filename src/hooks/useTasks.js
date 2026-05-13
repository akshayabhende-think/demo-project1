import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getTasks } from "../api/taskApi";
import { TASK_QUERY_KEY } from "../features/tasks/constants";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useTasks = () =>
    useQuery({
        queryKey: [TASK_QUERY_KEY],
        queryFn: getTasks,
        placeholderData: keepPreviousData,
        staleTime: FIVE_MINUTES,
    });
