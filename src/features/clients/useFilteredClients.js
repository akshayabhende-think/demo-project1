import { useMemo } from "react";

const matchesText = (item, query) => {
    if (!query) return true;
    const needle = query.toLowerCase();
    return Object.values(item).some((val) =>
        String(val ?? "").toLowerCase().includes(needle)
    );
};

const toDate = (value) => {
    if (!value) return null;
    if (typeof value.toDate === "function") return value.toDate();
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
};

export const useFilteredClients = (data, searchText, filters = {}) =>
    useMemo(() => {
        if (!Array.isArray(data)) return [];

        const start = toDate(filters.startDate);
        const end = toDate(filters.endDate);

        return data.filter((item) => {
            if (!matchesText(item, searchText)) return false;

            if (filters.status && item.status !== filters.status) return false;

            if (start || end) {
                const itemDate = toDate(item.createdAt ?? item.date);
                if (start && (!itemDate || itemDate < start)) return false;
                if (end && (!itemDate || itemDate > end)) return false;
            }

            return true;
        });
    }, [data, searchText, filters]);
