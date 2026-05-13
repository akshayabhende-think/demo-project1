import { useMemo } from "react";
import { useProspects } from "../../hooks/useProspects";

export const useProspectById = (id) => {
    const { data, isLoading, isError, error } = useProspects();

    const prospect = useMemo(
        () =>
            Array.isArray(data) ? data.find((item) => item.id === id) : undefined,
        [data, id]
    );

    return { prospect, isLoading, isError, error };
};
