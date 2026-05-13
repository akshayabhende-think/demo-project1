export const VIEW_TYPE = Object.freeze({
    DAY: "day",
    WEEK: "week",
    WORK_WEEK: "workWeek",
    MONTH: "month",
});

export const VIEW_TABS = Object.freeze([
    { key: VIEW_TYPE.DAY, label: "Day" },
    { key: VIEW_TYPE.WEEK, label: "Week" },
    { key: VIEW_TYPE.WORK_WEEK, label: "Work Week" },
    { key: VIEW_TYPE.MONTH, label: "Month" },
]);
