import { useMemo } from "react";
import { ARCHIVE_STATUS } from "./constants";

const matchesText = (item, query) => {
    if (!query) return true;
    const needle = query.toLowerCase();
    return Object.values(item).some((val) =>
        String(val ?? "").toLowerCase().includes(needle)
    );
};

export const useFilteredProspects = (data, searchText, activeTab, filters = {}) => {
    return useMemo(() => {
        if (!Array.isArray(data)) return [];

        return data.filter((item) => {
            const itemTab = item.archiveStatus ?? ARCHIVE_STATUS.ACTIVE;
            const matchesTab = activeTab ? itemTab === activeTab : true;
            const matchesStatus = filters.status
                ? item.status === filters.status
                : true;

            return matchesTab && matchesStatus && matchesText(item, searchText);
        });
    }, [data, searchText, activeTab, filters]);
};

export const useProspectTabCounts = (data) =>
    useMemo(() => {
        const counts = {
            [ARCHIVE_STATUS.ACTIVE]: 0,
            [ARCHIVE_STATUS.ON_HOLD]: 0,
            [ARCHIVE_STATUS.ARCHIVE]: 0,
        };

        if (!Array.isArray(data)) return counts;

        for (const item of data) {
            const key = item.archiveStatus ?? ARCHIVE_STATUS.ACTIVE;
            if (counts[key] !== undefined) counts[key] += 1;
        }
        return counts;
    }, [data]);
