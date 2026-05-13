import { useMemo } from "react";

const matchesText = (item, query) => {
    if (!query) return true;
    const needle = query.toLowerCase();
    return Object.values(item).some((val) =>
        String(val ?? "").toLowerCase().includes(needle)
    );
};

export const useFilteredEncounters = (data, searchText, subTab) =>
    useMemo(() => {
        if (!Array.isArray(data)) return [];
        return data.filter((item) => {
            if (subTab && item.tab !== subTab) return false;
            return matchesText(item, searchText);
        });
    }, [data, searchText, subTab]);
