import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../../api/appointmentApi";

export const useCreateAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) => createAppointment(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });
};
