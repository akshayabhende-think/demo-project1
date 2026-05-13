import { useMemo } from "react";

const matchesText = (item, query) => {
    if (!query) return true;
    const needle = query.toLowerCase();
    return Object.values(item).some((val) =>
        String(val ?? "").toLowerCase().includes(needle)
    );
};

const CURRENT_USER = "System Admin";

const toDate = (value) => {
    if (!value) return null;
    if (typeof value.toDate === "function") return value.toDate();
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
};

const parseDueDate = (value) => {
    if (!value) return null;
    const parts = String(value).split("/");
    if (parts.length !== 3) return toDate(value);
    const [m, d, y] = parts.map(Number);
    if (!m || !d || !y) return null;
    return new Date(y, m - 1, d);
};

const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

export const useFilteredTasks = (data, searchText, activeTab, filters = {}) =>
    useMemo(() => {
        if (!Array.isArray(data)) return [];

        const dueDate = toDate(filters.dueDate);

        return data.filter((task) => {
            if (activeTab === "my" && task.assignee !== CURRENT_USER)
                return false;

            if (filters.clientName && task.clientName !== filters.clientName)
                return false;

            if (filters.priority && task.priority !== filters.priority)
                return false;

            if (filters.status && task.status !== filters.status) return false;

            if (dueDate) {
                const taskDate = parseDueDate(task.dueDate);
                if (!taskDate || !sameDay(taskDate, dueDate)) return false;
            }

            return matchesText(task, searchText);
        });
    }, [data, searchText, activeTab, filters]);
