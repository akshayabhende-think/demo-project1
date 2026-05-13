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

const parseStartDate = (value) => {
    if (!value) return null;
    const parts = String(value).split("/");
    if (parts.length !== 3) return toDate(value);
    const [day, month, year] = parts.map(Number);
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
};

export const useFilteredGroups = (data, searchText, filters = {}) =>
    useMemo(() => {
        if (!Array.isArray(data)) return [];

        const start = toDate(filters.startDate);
        const end = toDate(filters.endDate);

        return data.filter((item) => {
            if (!matchesText(item, searchText)) return false;

            if (filters.status && item.status !== filters.status) return false;

            if (start || end) {
                const itemDate = parseStartDate(item.startDate);
                if (start && (!itemDate || itemDate < start)) return false;
                if (end && (!itemDate || itemDate > end)) return false;
            }

            return true;
        });
    }, [data, searchText, filters]);
