import { useMemo } from "react";

const matchesText = (item, query) => {
    if (!query) return true;
    const needle = query.toLowerCase();
    return Object.values(item).some((val) =>
        String(val ?? "").toLowerCase().includes(needle)
    );
};

export const useFilteredTests = (data, searchText, activeTab) =>
    useMemo(() => {
        if (!Array.isArray(data)) return [];
        return data.filter((item) => {
            if (activeTab) {
                const itemTab = item.tab ?? "active";
                if (itemTab !== activeTab) return false;
            }
            return matchesText(item, searchText);
        });
    }, [data, searchText, activeTab]);
