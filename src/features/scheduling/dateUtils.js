import { VIEW_TYPE } from "./constants";

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const startOfDay = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

const addDays = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
};

// Monday-first week start
export const startOfWeek = (date) => {
    const d = startOfDay(date);
    const dow = d.getDay(); // 0 = Sun ... 6 = Sat
    const diff = (dow + 6) % 7; // days since Monday
    return addDays(d, -diff);
};

export const endOfWeek = (date) => addDays(startOfWeek(date), 6);

export const startOfMonth = (date) => {
    const d = startOfDay(date);
    d.setDate(1);
    return d;
};

export const endOfMonth = (date) => {
    const d = startOfMonth(date);
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    return d;
};

const formatMonthDay = (date) => `${MONTH_NAMES[date.getMonth()].slice(0, 3)} ${date.getDate()}`;

export const formatRange = (viewType, currentDate) => {
    const date = startOfDay(currentDate);
    const year = date.getFullYear();

    if (viewType === VIEW_TYPE.DAY) {
        return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${year}`;
    }

    if (viewType === VIEW_TYPE.MONTH) {
        return `${MONTH_NAMES[date.getMonth()]} ${year}`;
    }

    // week / workWeek
    const start = startOfWeek(date);
    const end =
        viewType === VIEW_TYPE.WORK_WEEK ? addDays(start, 4) : addDays(start, 6);

    if (start.getMonth() === end.getMonth()) {
        return `${MONTH_NAMES[start.getMonth()]} ${start.getDate()} – ${end.getDate()}, ${year}`;
    }
    return `${formatMonthDay(start)} – ${formatMonthDay(end)}, ${year}`;
};

export const shiftDate = (viewType, currentDate, direction) => {
    const sign = direction === "next" ? 1 : -1;
    if (viewType === VIEW_TYPE.DAY) return addDays(currentDate, 1 * sign);
    if (viewType === VIEW_TYPE.MONTH) {
        const d = new Date(currentDate);
        d.setMonth(d.getMonth() + sign);
        return d;
    }
    return addDays(currentDate, 7 * sign);
};
